import React, { useState, useEffect, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import CharacterCreationScreen from './components/CharacterCreationScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameState, PlayerClass, SaveData, Language, Item, AIModel, Gender, EquipmentSlots } from './types';
import { startNewGame, processPlayerAction, generateIllustration as generateIllustrationApi, getSuggestedItemAction } from './services/aiService';
import { ALL_PLAYER_CLASSES, TRICKSTER_CLASS, DARK_MASTER_CLASS, INITIAL_GAME_STATE, t } from './constants';

type Screen = 'start' | 'character' | 'game' | 'gameover';

/**
 * Gets the initial language based on the user's browser settings.
 * Defaults to 'en' if the browser language is not supported.
 */
const getInitialLanguage = (): Language => {
    const supportedLanguages: Language[] = ['zh-TW', 'zh-CN', 'en', 'ja', 'es', 'ko'];
    const browserLang = navigator.language;

    // 1. Check for an exact match among supported languages.
    if (supportedLanguages.includes(browserLang as Language)) {
        return browserLang as Language;
    }

    // 2. Check for a primary language match (e.g., 'en' from 'en-US').
    const primaryLang = browserLang.split('-')[0];
    if (supportedLanguages.includes(primaryLang as Language)) {
        return primaryLang as Language;
    }

    // 3. Handle special cases for Chinese variants.
    if (primaryLang === 'zh') {
        const region = browserLang.split('-')[1]?.toUpperCase();
        if (region === 'CN' || region === 'SG') {
            return 'zh-CN';
        }
        // Default other Chinese variants (e.g., HK, MO) to Traditional Chinese.
        return 'zh-TW';
    }

    // 4. Default to English if no match is found.
    return 'en';
};


/**
 * Cleans the equipment data from the AI, converting placeholder "Empty" items back to null.
 * This is necessary because the AI is instructed to return a placeholder object instead of null
 * to conform to a stricter API schema, preventing API errors.
 */
const cleanEquipment = (equipment: EquipmentSlots): EquipmentSlots => {
    const cleaned = { ...equipment };
    for (const key in cleaned) {
        const slot = key as keyof EquipmentSlots;
        const item = cleaned[slot];
        if (item && item.name === 'Empty') {
            cleaned[slot] = null;
        }
    }
    return cleaned;
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [playerClass, setPlayerClass] = useState<PlayerClass | null>(null);
  const [playerGender, setPlayerGender] = useState<Gender>('male');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isVoiceoverEnabled, setIsVoiceoverEnabled] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [aiModel, setAiModel] = useState<AIModel>('gemini');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  
  // Use localStorage to track unlocks for secret classes
  const isTricksterUnlocked = () => localStorage.getItem('isTricksterUnlocked') === 'true';
  const setTricksterUnlocked = () => localStorage.setItem('isTricksterUnlocked', 'true');
  const isDarkMasterUnlocked = () => localStorage.getItem('isDarkMasterUnlocked') === 'true';
  const setDarkMasterUnlocked = () => localStorage.setItem('isDarkMasterUnlocked', 'true');


  const getInitialClasses = useCallback((lang: Language): PlayerClass[] => {
      const availableClasses = [...ALL_PLAYER_CLASSES[lang]];
      if (isTricksterUnlocked()) {
          availableClasses.push(TRICKSTER_CLASS[lang]);
      }
      if (isDarkMasterUnlocked()){
          availableClasses.push(DARK_MASTER_CLASS[lang]);
      }
      return availableClasses;
  }, []);
  
  const [classes, setClasses] = useState<PlayerClass[]>(() => getInitialClasses(language));
  
  useEffect(() => {
    setClasses(getInitialClasses(language));
  }, [language, getInitialClasses]);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window && isVoiceoverEnabled) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
          window.speechSynthesis.onvoiceschanged = () => speak(text);
          return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      let voiceToUse: SpeechSynthesisVoice | null = null;
      // Prefer the user's selected voice
      if (selectedVoiceURI) {
        voiceToUse = voices.find(v => v.voiceURI === selectedVoiceURI) || null;
      }
      // Fallback to finding a voice by language
      if (!voiceToUse) {
        voiceToUse = voices.find(v => v.lang.startsWith(language)) || voices.find(v => v.lang.startsWith(language.split('-')[0])) || null;
      }

      if (voiceToUse) {
        utterance.voice = voiceToUse;
      }
      
      utterance.rate = speechRate;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  }, [isVoiceoverEnabled, language, speechRate, selectedVoiceURI]);

  useEffect(() => {
    if (gameState.story) {
      const storyTurns = gameState.story.split('\n\n>');
      const latestTurnContent = storyTurns[storyTurns.length - 1];

      if (storyTurns.length === 1) {
        // This is the initial story load, which has no player action prefix. Read the whole thing.
        speak(latestTurnContent);
      } else {
        // This is a subsequent turn. The content will be "Player Action\n\nStory from AI...".
        // We want to read everything after the first paragraph (the action).
        const contentParts = latestTurnContent.split('\n\n');
        const storyToRead = contentParts.slice(1).join('\n\n');
        if (storyToRead) {
          speak(storyToRead);
        }
      }
    }
  }, [gameState.story, speak]);

  // Automatically generate illustration for the first turn
  useEffect(() => {
    // Only run on the game screen, for the very first turn, if no image exists or is being generated, and the main AI call isn't running.
    if (currentScreen === 'game' && gameState.turnCount === 1 && !gameState.illustrations[1] && !isGeneratingImage && !isLoading) {
      handleGenerateIllustration();
    }
  }, [currentScreen, gameState.turnCount, gameState.illustrations, isGeneratingImage, isLoading]);

  // Automatically generate illustration for the final turn
  useEffect(() => {
    // Only run when we switch to the game over screen, if no image for the final turn exists or is being generated.
    if (currentScreen === 'gameover' && !gameState.illustrations[gameState.turnCount] && !isGeneratingImage && !isLoading) {
      handleGenerateIllustration();
    }
  }, [currentScreen, gameState.turnCount, gameState.illustrations, isGeneratingImage, isLoading]);


  /**
   * Primes the speech synthesis engine on iOS by speaking a silent utterance.
   * This must be called from within a user-initiated event handler (e.g., a click).
   */
  const primeSpeechSynthesis = (voiceEnabled: boolean) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(' '); // A space is more reliable than an empty string
      utterance.volume = 0; // Make it silent
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStart = (voiceEnabled: boolean, lang: Language, rate: number, model: AIModel, voiceURI: string) => {
    setLanguage(lang);
    setIsVoiceoverEnabled(voiceEnabled);
    setSpeechRate(rate);
    setAiModel(model);
    setSelectedVoiceURI(voiceURI);
    setCurrentScreen('character');
    setError(null);
  };

  const handleClassSelect = async (selectedClass: PlayerClass, gender: Gender) => {
    // Prime the speech engine on user click to enable autoplay on iOS
    primeSpeechSynthesis(isVoiceoverEnabled);

    setIsLoading(true);
    setPlayerClass(selectedClass);
    setPlayerGender(gender);
    setCurrentScreen('game');
    try {
      // AI generates the initial story and suggested actions.
      const response = await startNewGame(selectedClass, language, aiModel, gender);
      
      // Construct the initial game state.
      // We trust the AI for the story, but use the class definition for stats and equipment
      // to ensure the starting state is exactly as designed.
      const newGameState: GameState = {
        // Use PlayerClass definition for the character's core stats
        health: selectedClass.initialHealth,
        luck: selectedClass.initialLuck,
        inventory: selectedClass.initialInventory,
        equipment: selectedClass.initialEquipment, // This overrides any incorrect equipment from the AI
        blessings: selectedClass.initialBlessings,
        
        // Use the AI's response for narrative and dynamic elements
        story: response.story,
        suggestedActions: response.suggested_actions,
        gameOver: response.game_over,
        win: response.win,
        mood: response.mood,
        actionResult: response.action_result,
        chapterTitle: response.chapter_title,
        strongEnemiesDefeated: response.strong_enemies_defeated,
        alignment: response.alignment || 0,

        // Set initial turn values
        turnCount: 1,
        illustrations: {},
      };
      setGameState(newGameState);

    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const processAction = async (action: string, selectedItems: Item[]) => {
    if (!playerClass || isLoading) return;

    let effectiveAction = action;
    let effectiveGameState = gameState;
    let effectiveSelectedItems = selectedItems;
    const isBossCommand = action.trim() === 'Command:Boss';

    if (isBossCommand) {
        effectiveGameState = {
            ...gameState,
            strongEnemiesDefeated: 3,
            turnCount: 39, // Ensure boss logic triggers
        };
        // A direct prompt for the AI to ensure it generates the boss fight.
        effectiveAction = "With a surge of power, I arrive at the final chamber and challenge the Crypt Lord to a final battle.";
        effectiveSelectedItems = []; // Clear selected items for the boss command
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await processPlayerAction(effectiveGameState, playerClass, effectiveAction, effectiveSelectedItems, language, aiModel, playerGender);
      
      // Log the original user action and selected items
      const itemLog = selectedItems.length > 0 ? ` (${selectedItems.map(i => i.name).join(', ')})` : '';

      let blessingLog = '';
      if (response.triggered_blessings && response.triggered_blessings.length > 0) {
          const blessingEffects = response.triggered_blessings
              .map(b => `${b.name}: ${b.effect}`)
              .join(', ');
          blessingLog = ` (${blessingEffects})`;
      }

      const actionLog = `\n\n> ${action}${itemLog}${blessingLog}\n\n`;
      const newStory = `${gameState.story}${actionLog}${response.story}`;

      // Continuously increment turn count from the original state's turn count.
      const newTurnCount = gameState.turnCount + 1;
      
      const cleanedEquipment = cleanEquipment(response.equipment);

      const newGameState: GameState = {
        ...response,
        story: newStory,
        equipment: cleanedEquipment,
        suggestedActions: response.suggested_actions,
        gameOver: response.game_over,
        actionResult: response.action_result,
        chapterTitle: response.chapter_title,
        strongEnemiesDefeated: response.strong_enemies_defeated,
        turnCount: newTurnCount,
        illustrations: gameState.illustrations, // Carry over existing illustrations
        blessings: response.blessings || [],
        alignment: response.alignment,
      };
      setGameState(newGameState);

      if (response.win) {
        // Winning with any class unlocks the Trickster
        setTricksterUnlocked();
        // Winning with the Trickster unlocks the Dark Master
        if (playerClass.id === 'trickster') {
            setDarkMasterUnlocked();
        }
      }

      // Only transition on explicit game_over flag (for losses).
      // The win state is handled on the GameScreen itself.
      if (response.game_over) {
        setCurrentScreen('gameover');
      }
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerateIllustration = async () => {
    if (isGeneratingImage || isLoading || !playerClass) return;
    setIsGeneratingImage(true);
    setError(null);
    
    try {
        const latestStoryChunk = gameState.story.split('>').pop() || gameState.story;

        // Build a detailed description of the character for the illustration prompt
        // by using the item descriptions instead of their names.
        // FIX: The type of `item` is inferred as `unknown` from `Object.values`.
        // We cast it to `Item` to safely access the `.slot` property after checking for null.
        const equipmentItems = Object.values(gameState.equipment)
            .filter((item): item is Item => !!item && (item as Item).slot !== 'companion');
        
        const equipmentDetails = equipmentItems.map(item => item.description).join('. ');

        const companion = gameState.equipment.companion;
        const companionDetails = companion ? `They are accompanied by a companion: ${companion.description}` : '';

        // Start with a base description including gender.
        // FIX: Corrected a ReferenceError. The variable `gender` was undefined; it should be `playerGender` from the component's state.
        let characterDescription = `A ${playerGender} ${playerClass.name}.`;
        
        // Add special visual cues for the Trickster to ensure the AI gets their appearance right.
        if (playerClass.id === 'trickster') {
             characterDescription = `A frail but cunning-looking ${playerGender} ${playerClass.name} with no visible armor or weapons.`;
        }
        
        // Combine all details into a cohesive prompt.
        const fullCharacterDetails = `${characterDescription} ${equipmentDetails} ${companionDetails}`.trim().replace(/\s+/g, ' ');

        const prompt = `${t(language, 'illustrationPromptStyle')} ${fullCharacterDetails}. Scene: ${latestStoryChunk}. ${t(language, 'illustrationPromptNegative')}`;
        
        const imageUrl = await generateIllustrationApi(prompt, language, aiModel);
        
        setGameState(prevState => ({
          ...prevState,
          illustrations: {
            ...prevState.illustrations,
            [prevState.turnCount]: imageUrl, // Associate with current turn
          }
        }));
    } catch (e: any) {
        setError(e.message || t(language, 'illustrationError'));
    } finally {
        setIsGeneratingImage(false);
    }
  };

  const handleGetItemUsageSuggestion = async (selectedItems: Item[]): Promise<string> => {
    if (!playerClass || selectedItems.length === 0) return '';
    try {
        const suggestion = await getSuggestedItemAction(
            gameState,
            playerClass,
            selectedItems,
            language,
            aiModel,
            playerGender
        );
        return suggestion;
    } catch (e: any) {
        console.error("Failed to get item usage suggestion:", e);
        return ''; // Fail silently
    }
  };

  const handleSave = () => {
    if (!playerClass) return;
    const saveData: SaveData = {
      gameState,
      playerClass,
      language,
      isVoiceoverEnabled,
      speechRate,
      aiModel,
      playerGender,
      selectedVoiceURI,
    };

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}h${String(now.getMinutes()).padStart(2, '0')}m`;
    
    // Sanitize parts of the filename to remove characters that are invalid in filenames and replace spaces with underscores.
    const sanitize = (str: string) => str.replace(/[\\?%*:|"<>]/g, '').replace(/\s+/g, '_');

    const filename = `${sanitize(gameState.chapterTitle)}-${sanitize(playerClass.name)}-${playerGender}-Turn${gameState.turnCount}-${timestamp}.json`;

    const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAdventure = () => {
    if (!playerClass) return;
    const saveData: SaveData = {
      gameState,
      playerClass,
      language,
      isVoiceoverEnabled,
      speechRate,
      aiModel,
      playerGender,
      selectedVoiceURI,
    };

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}h${String(now.getMinutes()).padStart(2, '0')}m`;
    
    const sanitize = (str: string) => str.replace(/[\\?%*:|"<>]/g, '').replace(/\s+/g, '_');

    const filename = `AdventureLog-${sanitize(playerClass.name)}-${timestamp}.json`;

    const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (saveData: SaveData) => {
    // Prime the speech engine on user click to enable autoplay on iOS
    primeSpeechSynthesis(saveData.isVoiceoverEnabled);

    setGameState({
        ...saveData.gameState,
        illustrations: saveData.gameState.illustrations || {}, // Ensure illustrations object exists
        blessings: saveData.gameState.blessings || [], // Ensure blessings object exists for older saves
        alignment: saveData.gameState.alignment || 0, // Handle older saves without alignment
    });
    setPlayerClass(saveData.playerClass);
    setLanguage(saveData.language);
    setIsVoiceoverEnabled(saveData.isVoiceoverEnabled);
    setSpeechRate(saveData.speechRate);
    setAiModel(saveData.aiModel || 'gemini');
    setPlayerGender(saveData.playerGender || 'male'); // Handle older saves
    setSelectedVoiceURI(saveData.selectedVoiceURI || '');
    setClasses(getInitialClasses(saveData.language)); // Make sure to update classes on load
    setCurrentScreen('game');
    setError(null);
  };

  const handleRestart = () => {
    setGameState(INITIAL_GAME_STATE);
    setPlayerClass(null);
    setCurrentScreen('start');
    setError(null);
    setIsLoading(false);
  };
  
  const handleUnlockTrickster = () => {
    if (!isTricksterUnlocked()) {
      setTricksterUnlocked();
      setClasses(getInitialClasses(language));
    }
  };
  
  const handleUnlockDarkMaster = () => {
    if (!isDarkMasterUnlocked()) {
      setDarkMasterUnlocked();
      setClasses(getInitialClasses(language));
    }
  };

  const handleProceedToGameOver = () => {
    setCurrentScreen('gameover');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'character':
        return <CharacterCreationScreen classes={classes} onSelectClass={handleClassSelect} language={language} onUnlockTrickster={handleUnlockTrickster} onUnlockDarkMaster={handleUnlockDarkMaster} />;
      case 'game':
        if (!playerClass) {
          handleRestart();
          return null;
        }
        return (
          <GameScreen
            gameState={gameState}
            isLoading={isLoading}
            error={error}
            onSubmitAction={processAction}
            onSave={handleSave}
            language={language}
            playerClassName={playerClass.name}
            playerGender={playerGender}
            chapterTitle={gameState.chapterTitle}
            isGeneratingImage={isGeneratingImage}
            onGenerateIllustration={handleGenerateIllustration}
            onGetSuggestion={handleGetItemUsageSuggestion}
            onProceedToGameOver={handleProceedToGameOver}
          />
        );
      case 'gameover':
        return <GameOverScreen
          win={gameState.win}
          onRestart={handleRestart}
          language={language}
          story={gameState.story}
          illustration={gameState.illustrations[gameState.turnCount]}
          isGeneratingIllustration={isGeneratingImage}
          onDownloadAdventure={handleDownloadAdventure}
        />;
      case 'start':
      default:
        return <StartScreen onStart={handleStart} onLoad={handleLoad} />;
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center font-sans p-4">
      <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      <main className="z-10 w-full max-w-7xl mx-auto">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;