// FIX: Removed invalid text from the start of the file.
import { GoogleGenAI, Type } from "@google/genai";
import { GameState, PlayerClass, GameUpdateResponse, Language, Gender, Item } from '../types';
import { t } from '../constants';

// The API key MUST be obtained exclusively from the environment variable `process.env.API_KEY`.
// It is assumed to be pre-configured in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itemSchema = {
    type: Type.OBJECT,
    // REMOVED: `nullable: true` is not a standard property and causes instability.
    // The new approach is to use a placeholder object for empty slots.
    properties: {
        name: { type: Type.STRING, description: "Name of the item." },
        type: { type: Type.STRING, description: "Type of item: 'equippable', 'consumable', 'non-consumable', or 'summon_companion'." },
        description: { type: Type.STRING, description: "A brief, flavorful description of the item's appearance and purpose. This is mandatory." },
        slot: { type: Type.STRING, description: "If equippable or a companion, the slot it belongs to: 'head', 'body', 'leftHand', 'rightHand', 'feet', 'waist', 'companion'." },
        quantity: { type: Type.INTEGER, description: "The number of items in the stack. Only for consumables." },
    },
    required: ['name', 'type', 'description']
};

const blessingSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "Name of the blessing or passive skill." },
        description: { type: Type.STRING, description: "A brief description of the blessing's effect." }
    },
    required: ['name', 'description']
};

const triggeredBlessingSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The name of the blessing that was triggered." },
        effect: { type: Type.STRING, description: "A string describing the exact numerical effect, including the localized stat name. E.g., '+15 Luck', '-5 Health'." }
    },
    required: ['name', 'effect']
};

const equipmentSlotsSchema = {
    type: Type.OBJECT,
    properties: {
        head: itemSchema,
        body: itemSchema,
        leftHand: itemSchema,
        rightHand: itemSchema,
        feet: itemSchema,
        waist: itemSchema,
        companion: itemSchema,
    },
    required: ['head', 'body', 'leftHand', 'rightHand', 'feet', 'waist', 'companion']
};

const suggestedActionSchema = {
    type: Type.OBJECT,
    properties: {
        action: { type: Type.STRING, description: "A short, actionable phrase (e.g., 'Inspect the altar')." },
        hint: { type: Type.STRING, description: "A brief hint about the possible outcome or purpose of the action." }
    },
    required: ['action', 'hint']
};

const gameUpdateResponseSchema = {
    type: Type.OBJECT,
    properties: {
        story: { type: Type.STRING, description: "Narrate the outcome of the action and the current situation in 1-3 paragraphs. Be descriptive and engaging." },
        health: { type: Type.INTEGER, description: "Player's new health points (0-100)." },
        inventory: { type: Type.ARRAY, items: itemSchema, description: "The player's full inventory after the action." },
        equipment: equipmentSlotsSchema,
        luck: { type: Type.INTEGER, description: "Player's new luck points (0-100)." },
        blessings: { type: Type.ARRAY, items: blessingSchema, description: "The player's current list of blessings (passive skills). Add or remove them based on story events." },
        suggested_actions: { type: Type.ARRAY, items: suggestedActionSchema, description: "Three creative and relevant actions the player can take next." },
        game_over: { type: Type.BOOLEAN, description: "Set to true if the player has died." },
        win: { type: Type.BOOLEAN, description: "Set to true if the player has won the game." },
        mood: { type: Type.STRING, description: 'A single word describing the current atmosphere (e.g., tense, mysterious, combat, triumphant).' },
        action_result: { type: Type.STRING, description: "Result of the action for UI feedback: 'success', 'failure', 'neutral', or 'item_use'."},
        chapter_title: { type: Type.STRING, description: 'A short, evocative title for the current chapter or scene.' },
        strong_enemies_defeated: { type: Type.INTEGER, description: "The number of strong enemies the player has defeated so far." },
        triggered_blessings: { type: Type.ARRAY, items: triggeredBlessingSchema, description: "A list of all blessings that were triggered by the player's action this turn. Leave empty if none were triggered." }
    },
    required: ['story', 'health', 'inventory', 'equipment', 'luck', 'blessings', 'suggested_actions', 'game_over', 'win', 'mood', 'action_result', 'chapter_title', 'strong_enemies_defeated']
};

/**
 * Calls the Gemini API to get the next game state.
 */
export const callGeminiApi = async (
    action: string,
    gameState: GameState,
    playerClass: PlayerClass,
    language: Language,
    gender: Gender
): Promise<GameUpdateResponse> => {
    
    const healthStatName = t(language, 'health');
    const luckStatName = t(language, 'luck');

    const systemInstruction = `You are the Dungeon Master for a text-based RPG called "Whispering Crypt". Your role is to create a dark, mysterious, and engaging narrative. The player's class is ${playerClass.name}. The player's gender is ${gender}. The target language for all text in your response is ${language}.
    RULES HIERARCHY AND LOGIC:
    1.  **THE SUPREME PRINCIPLE: INVENTORY INTEGRITY.** This is the most important rule and overrides all others. The player's inventory and equipment as provided in the CURRENT GAME STATE are the absolute, undeniable truth.
        a) **ABSOLUTE PROHIBITION:** Under NO circumstances are you to narrate that the player is mistaken, delusional, or has misremembered possessing an item that is present in their game state. Never tell the player "You don't have that item" or "You realize your pockets are empty" if the item exists in the state. This is a forbidden narrative.
        b) **INVENTORY MODIFICATION:** You are ONLY allowed to remove items from the inventory that were directly and logically consumed or destroyed as a result of the narrated action. You are STRICTLY FORBIDDEN from removing any other items.

    2.  **NARRATIVE COHERENCE AND ACTION VALIDITY:** This rule is secondary to Inventory Integrity.
        a) **Distinction:** You must distinguish between an "illegitimate item" and a "nonsensical action."
           - An "illegitimate item" refers to an item mentioned by the player that is NOT in their gameState inventory. Actions involving these MUST fail, and you can narrate this as the character being mistaken.
           - A "nonsensical action" refers to using a LEGITIMATE item (that IS in their inventory) in an illogical or creative but absurd way.
        b) **HANDLING NONSENSICAL ACTIONS:** When the player performs a nonsensical action with a legitimate item, the item's existence MUST be acknowledged in the narrative. The failure must be a logical consequence of the action itself, not a denial of the item.
           - **CORRECT NARRATIVE:** Player Action: "Use Healing Salve on the stone door." Narrative: "You smear the glowing salve across the cold, unyielding stone. It glistens for a moment before fading, leaving the door completely unaffected. The salve has been wasted." (The item is then removed if it's a consumable).
           - **FORBIDDEN NARRATIVE:** Player Action: "Use Healing Salve on the stone door." Narrative: "You reach for your healing salve, only to find you never had one to begin with."

    3.  CLASS-SPECIFIC NARRATIVE: Tailor the adventure's challenges and opportunities to the player's class.
        - Knight: Focus on combat, honorable challenges, and vanquishing powerful foes.
        - Rogue: Emphasize stealth, disarming traps, and acquiring treasure through cunning.
        - Scholar: Center the story on uncovering ancient secrets, solving puzzles, and using knowledge.
        - Trickster: Embrace chaos. The Trickster bends reality. Their nonsensical actions have unpredictable results. They are physically frail and rely on wit, not items.

    4.  ACTION CONTEXT: If the action string starts with "Using [Item1, Item2, ...]:", it means the player has pre-selected these items. You must treat these items as the primary context for the action.

    5.  FREQUENT CHALLENGES & UPGRADES: The crypt must feel alive with minor threats. After defeating monsters or finding special items, you MUST frequently provide opportunities for the player to upgrade their equipment or blessings. This is a core gameplay loop. If the player performs an upgrade, you MUST update the item's state (name, description) to reflect the improvement.

    6.  ITEM DESCRIPTIONS: CRITICAL RULE: Every single item, whether in inventory or equipped, MUST have a non-empty, flavorful 'description' string.

    7.  EQUIPMENT LOGIC & PERSISTENCE:
        a) NARRATIVE-DRIVEN CHANGES: You can only change equipment if it's a direct result of the story narrative (e.g., "You find a helmet and put it on").
        b) EMPTY SLOTS MUST STAY EMPTY: Do not fill empty slots unless the story describes finding and equipping a NEW item for THAT slot. Do not copy items.
        c) JSON FORMATTING FOR EMPTY SLOTS: CRITICAL: To represent an empty slot, you MUST use this exact placeholder object: { "name": "Empty", "type": "equippable", "description": "Nothing is equipped in this slot." }. Do NOT use 'null'.

    8.  SUGGESTED ACTIONS: Provide exactly three diverse and creative suggested actions.

    9.  JSON RESPONSE: You MUST respond with a valid JSON object conforming to the schema. No markdown.

    10. LUCK MECHANICS: Successful actions ('success') slightly decrease luck (1-5 points). Unsuccessful actions ('failure') slightly increase luck (1-5 points).

    11. BLESSINGS & FEEDBACK:
        a) Adhere to blessing effects. For the Trickster, their blessings dictate reality.
        b) When a blessing triggers, you MUST populate the 'triggered_blessings' array.
        c) The 'effect' string MUST be localized using these stat names: Health = "${healthStatName}", Luck = "${luckStatName}". (e.g., "+15 ${luckStatName}").

    12. STRONG ENEMY ENCOUNTERS:
        - **COMPANION DANGER MODIFIER:** If 'equipment.companion' is not empty, strong enemies MUST be described as more aggressive and powerful.
        - Every 10 turns, you MUST introduce a formidable 'boss' enemy.
        - CATCH-UP MECHANIC: If gameState.turnCount / 10 > gameState.strongEnemiesDefeated, a strong enemy is highly likely to appear next turn.
        - WIN CONDITION: The game is won when 'strong_enemies_defeated' reaches 4.`;

    // To prevent exceeding token limits, we create a prompt-specific game state.
    // CRITICAL: Exclude 'illustrations' to avoid sending large base64 image data as text tokens.
    const { illustrations, ...contextualGameState } = gameState;

    // Also, summarize the story to keep the prompt concise.
    // We'll keep the first turn for initial context, and the most recent turns for immediate context.
    const CONTEXT_TURNS_TO_KEEP = 4;
    const storyTurns = contextualGameState.story.split('\n\n>');
    if (storyTurns.length > CONTEXT_TURNS_TO_KEEP) {
        // Keep the first turn and the last (CONTEXT_TURNS_TO_KEEP - 1) turns.
        const recentTurns = storyTurns.slice(-(CONTEXT_TURNS_TO_KEEP - 1));
        contextualGameState.story = `${storyTurns[0]}\n\n...\n\n>${recentTurns.join('\n\n>')}`;
    }


    const model = 'gemini-2.5-flash';

    const fullPrompt = `
    CURRENT GAME STATE:
    ${JSON.stringify(contextualGameState, null, 2)}

    PLAYER ACTION: "${action}"

    Generate the next game state based on this action.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: fullPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: gameUpdateResponseSchema,
                temperature: 0.7,
                topP: 0.95,
            }
        });

        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);
        return data as GameUpdateResponse;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to get a response from the AI. The crypt's whispers are silent for now.");
    }
};

/**
 * Calls the Gemini API for a quick action suggestion based on selected items.
 */
export const callGeminiApiForSuggestion = async (
    gameState: GameState,
    playerClass: PlayerClass,
    selectedItems: Item[],
    language: Language,
    gender: Gender
): Promise<string> => {
    // We only need the last part of the story for context
    const lastStoryChunk = gameState.story.split('>').pop()?.split('\n\n').slice(1).join('\n\n') || gameState.story;

    const itemDetails = selectedItems.map(i => `${i.name}: ${i.description}`).join('; ');

    const systemInstruction = `You are a creative assistant in a text-based RPG. Your task is to provide a short, creative, and actionable suggestion for what a player can do with their selected items in the current situation.
    - The player is a ${gender} ${playerClass.name}.
    - The response must be a single, concise phrase.
    - The response MUST be in the target language: ${language}.
    - Do NOT add any preamble, explanation, or quotation marks. Just the action phrase.`;

    const fullPrompt = `
    CURRENT SITUATION: "${lastStoryChunk}"
    SELECTED ITEMS: "${itemDetails}"

    SUGGESTED ACTION:
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "text/plain",
                temperature: 0.8,
                topP: 0.95,
                thinkingConfig: { thinkingBudget: 0 } // Low latency
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Gemini suggestion API call failed:", error);
        return ""; // Fail silently
    }
};


/**
 * Generates an illustration for the current scene using the Gemini Image API.
 */
export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '4:3',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated by the API.");
        }
    } catch (error) {
        console.error("Gemini image generation failed:", error);
        throw new Error("The ethereal mists refuse to form an image.");
    }
};
