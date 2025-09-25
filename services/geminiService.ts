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
        description: { type: Type.STRING, description: "A brief description of the blessing's effect." },
        duration: { type: Type.INTEGER, description: "For temporary blessings, the number of turns remaining. Decrement by 1 each turn. Remove when it reaches 0." }
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
        triggered_blessings: { type: Type.ARRAY, items: triggeredBlessingSchema, description: "A list of all blessings that were triggered by the player's action this turn. Leave empty if none were triggered." },
        alignment: { type: Type.INTEGER, description: "The player's hidden alignment value. Ranges from negative (evil) to positive (good). This value is ONLY used for the Dark Master class." },
    },
    required: ['story', 'health', 'inventory', 'equipment', 'luck', 'blessings', 'suggested_actions', 'game_over', 'win', 'mood', 'action_result', 'chapter_title', 'strong_enemies_defeated', 'alignment']
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

**THE GOLDEN RULE: THE GAME STATE IS ABSOLUTE TRUTH**
This is the most critical instruction and overrides everything else. The \`CURRENT GAME STATE\` provided with each prompt, especially the \`inventory\` and \`equipment\`, is the undeniable, single source of truth.
- **NEVER CONTRADICT THE INVENTORY:** You are strictly forbidden from narrating that the player does not have an item if it exists in the provided \`inventory\` or \`equipment\`. Forbidden phrases include: "You don't have that," "You search your bag but it's empty," "You seem to have lost the item."
- **ACKNOWLEDGE THE ITEM, EVEN IN FAILURE:** If the player attempts an unusual or nonsensical action with an item they possess, you MUST acknowledge the item's existence in your narrative. The action's failure should be a logical consequence of the action itself, not a denial of the item's existence.
  - **Example:** Player has 'Healing Salve'. Action: "Use Healing Salve on the stone door."
  - **CORRECT Narrative:** "You smear the glowing salve across the cold, unyielding stone. It glistens for a moment before fading, leaving the door completely unaffected. The salve has been wasted." (Item is then removed if consumable).
  - **FORBIDDEN Narrative:** "You reach for your healing salve, but you don't have one."
- **PLAYER'S ACTION IS CONTEXTUAL TRUTH:** Player actions starting with \`Using [Item Name]: ...\` explicitly state which items from their inventory are being used. You MUST treat this as the primary context for the player's intent and narrate the outcome of that attempt. DO NOT ignore this context.

**GAMEPLAY LOGIC & NARRATIVE RULES:**
1.  **CLASS-SPECIFIC NARRATIVE:** Tailor the adventure's challenges and opportunities to the player's class.
    - Knight: Focus on combat, honorable challenges, and vanquishing powerful foes.
    - Rogue: Emphasize stealth, disarming traps, and acquiring treasure through cunning.
    - Scholar: Center the story on uncovering ancient secrets, solving puzzles, and using knowledge.
    - Trickster: Embrace chaos. The Trickster bends reality. Their nonsensical actions have unpredictable results. They are physically frail and rely on wit, not items.
    - Dark Master (暗魔獸): This class has a hidden 'alignment' stat, which starts at 0. Your narrative choices determine its value. Actions like consuming defeated enemies, betrayal, or cruelty make the value more negative (evil). Actions like showing mercy, sparing foes, or helping others make it more positive (good). Neutral actions leave it unchanged. The story should focus on the conflict between primal hunger and newfound consciousness, presenting moral dilemmas. This class interacts with the world as a feared predator, making social encounters difficult but intimidation possible. This alignment directly impacts strong enemy encounters. When the player uses the 'Predator's Evolution' blessing to consume an enemy, the amount of health and luck restored MUST be proportional to the enemy's perceived strength (e.g., a boss provides a large bonus, a weak creature provides a small one).

2.  **FREQUENT CHALLENGES & UPGRADES:** The crypt must feel alive with minor threats. After defeating monsters or finding special items, you MUST frequently provide opportunities for the player to upgrade their equipment or blessings. This is a core gameplay loop. If the player performs an upgrade, you MUST update the item's state (name, description) to reflect the improvement.

3.  **ITEM DESCRIPTIONS:** CRITICAL RULE: Every single item, whether in inventory or equipped, MUST have a non-empty, flavorful 'description' string.

4.  **EQUIPMENT LOGIC & PERSISTENCE:**
    a) NARRATIVE-DRIVEN CHANGES: You can only change equipment if it's a direct result of the story narrative (e.g., "You find a helmet and put it on").
    b) EMPTY SLOTS MUST STAY EMPTY: Do not fill empty slots unless the story describes finding and equipping a NEW item for THAT slot. Do not copy items.
    c) JSON FORMATTING FOR EMPTY SLOTS: CRITICAL: To represent an empty slot, you MUST use this exact placeholder object: { "name": "Empty", "type": "equippable", "description": "Nothing is equipped in this slot." }. Do NOT use 'null'.

5.  **SUGGESTED ACTIONS:** Provide exactly three diverse and creative suggested actions.

6.  **JSON RESPONSE:** You MUST respond with a valid JSON object conforming to the schema. No markdown.

7.  **LUCK MECHANICS:** Successful actions ('success') slightly decrease luck (1-5 points). Unsuccessful actions ('failure') slightly increase luck (1-5 points).

8.  **BLESSINGS & FEEDBACK:**
    a) Adhere to blessing effects. For the Trickster, their blessings dictate reality.
    b) When a blessing triggers, you MUST populate the 'triggered_blessings' array.
    c) The 'effect' string MUST be localized using these stat names: Health = "${healthStatName}", Luck = "${luckStatName}". (e.g., "+15 ${luckStatName}").

9.  **ITEM & BLESSING DYNAMICS:**
    - **MANA POTION:** When a player uses a 'Mana Potion' (法力藥水), you MUST consume it and grant them a new temporary blessing.
      - **Name:** 'Arcane Overcharge' (奧術超載)
      - **Description:** 'Your next magic spell has a high chance to hit, will pierce armor, and restores a small amount of your health on impact.' (Localize this description).
      - **Duration:** 5 turns.
      - You MUST add this blessing to the \`blessings\` array with a \`duration\` of 5.
    - **TEMPORARY BLESSINGS:** You are responsible for managing temporary effects.
      - For any blessing with a \`duration\` greater than 0, you MUST decrement its \`duration\` by 1 at the end of every turn.
      - If a blessing's duration reaches 0, you MUST remove it from the \`blessings\` list.
      - The 'Arcane Overcharge' blessing is a special case: you MUST also remove it immediately after the player successfully hits an enemy with a magic spell, regardless of its remaining duration.

10. **SPECIAL STORY EVENTS:**
    - **GUEST APPEARANCE:** If the \`gameState.turnCount\` is between 20 and 25, you MUST introduce a friendly NPC to assist the player. This NPC's class MUST be one of the following, and it CANNOT be the same as the player's class: Knight, Rogue, or Scholar. Their appearance must be a surprise and woven into the narrative. They help for 1-2 turns and then depart.
    - **THE FINAL BOSS:** The 4th and final strong enemy that the player must defeat to win the game (i.e., when \`strong_enemies_defeated\` is 3, and you are generating the final boss encounter) MUST be named 'The Crypt Lord' (地穴之主). This is the ultimate boss of the dungeon.

11. **STRONG ENEMY ENCOUNTERS:**
    - **COMPANION DANGER MODIFIER:** If 'equipment.companion' is not empty, strong enemies MUST be described as more aggressive and powerful.
    - Every 10 turns, you MUST introduce a formidable 'boss' enemy.
    - **DARK MASTER ALIGNMENT:** When it is time to introduce a strong enemy for the Dark Master: If their alignment is negative (< 0), the enemy MUST be a human adventurer (Knight, Rogue, or Scholar) who has come to hunt the 'monster' (the player). If the alignment is zero or positive (>= 0), the enemy MUST be a powerful, non-human monster befitting a dark crypt.
    - CATCH-UP MECHANIC: If gameState.turnCount / 10 > gameState.strongEnemiesDefeated, a strong enemy is highly likely to appear next turn.
    - WIN CONDITION: The game is won when 'strong_enemies_defeated' reaches 4.
    
12. **EPILOGUE ON WIN:** When the player defeats the final boss ('The Crypt Lord') and 'strong_enemies_defeated' becomes 4, you MUST set 'win' to true and 'game_over' to false. Your 'story' response MUST be an epilogue describing the hero's journey after leaving the crypt. You MUST provide an empty array for 'suggested_actions'.`;

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