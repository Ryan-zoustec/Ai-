import React, { useState, useRef, useEffect } from 'react';
import { GameState, Item, Language, Gender } from '../types';
import PlayerStats from './PlayerStats';
import LoadingIcon from './LoadingIcon';
import { t } from '../constants';

interface GameScreenProps {
  gameState: GameState;
  isLoading: boolean;
  error: string | null;
  onSubmitAction: (action: string, selectedItems: Item[]) => void;
  onSave: () => void;
  language: Language;
  playerClassName: string;
  playerGender: Gender;
  chapterTitle: string;
  isGeneratingImage: boolean;
  onGenerateIllustration: () => void;
  onGetSuggestion: (items: Item[]) => Promise<string>;
  onProceedToGameOver: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  isLoading,
  error,
  onSubmitAction,
  onSave,
  language,
  playerClassName,
  playerGender,
  chapterTitle,
  isGeneratingImage,
  onGenerateIllustration,
  onGetSuggestion,
  onProceedToGameOver
}) => {
  const [customAction, setCustomAction] = useState('');
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const storyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (storyContainerRef.current) {
      storyContainerRef.current.scrollTop = storyContainerRef.current.scrollHeight;
    }
  }, [gameState.story, gameState.illustrations, isGeneratingImage]);

  useEffect(() => {
    // This effect handles debouncing the suggestion call
    if (isLoading) {
        return; // Don't do anything if a main action is processing
    }

    if (selectedItems.length === 0) {
        setCustomAction('');
        return;
    }

    // Set up the timer.
    const handler = setTimeout(async () => {
        setIsSuggesting(true);
        try {
            const suggestion = await onGetSuggestion(selectedItems);
            // Check if items are still selected when suggestion comes back
            // to avoid race condition where user deselects while waiting.
            if (selectedItems.length > 0) {
                setCustomAction(suggestion || '');
            }
        } catch (error) {
            console.error("Error fetching suggestion:", error);
        } finally {
            setIsSuggesting(false);
        }
    }, 800); // 800ms debounce

    // Cleanup function: this is called if selectedItems changes again before
    // the timeout completes, or when the component unmounts. This is the core of debouncing.
    return () => {
        clearTimeout(handler);
    };
  }, [selectedItems, isLoading, onGetSuggestion]);


  const handleSubmit = (action: string) => {
    if (isLoading || !action.trim()) return;
    onSubmitAction(action, selectedItems);
    setCustomAction('');
    setSelectedItems([]);
  };
  
  const handleSelectItem = (itemToToggle: Item) => {
    setSelectedItems(prevSelected => {
        const isSelected = prevSelected.some(item => item.name === itemToToggle.name);
        if (isSelected) {
            return prevSelected.filter(item => item.name !== itemToToggle.name);
        } else {
            return [...prevSelected, itemToToggle];
        }
    });
  };

  const handleCustomActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(customAction);
  };

  const renderStory = () => {
    // Split the story into turns. The first element is the narrative for turn 1.
    const storyTurns = gameState.story.split('\n\n>');

    return storyTurns.map((turnContent, index) => {
      const turnNumber = index + 1;
      const illustrationForTurn = gameState.illustrations?.[turnNumber];
      
      let actionParagraph: React.ReactNode = null;
      let narrativeParagraphs: string[] = [];

      if (index > 0) {
        // For turns after the first, the content includes the player's action.
        const parts = turnContent.split('\n\n');
        const actionText = parts[0];
        actionParagraph = (
            <p className="mb-4 text-cyan-300 italic pl-4 border-l-2 border-cyan-700 text-base md:text-lg leading-relaxed">
                {actionText}
            </p>
        );
        narrativeParagraphs = parts.slice(1);
      } else {
        // This is the first turn (initial story)
        narrativeParagraphs = turnContent.split('\n\n');
      }

      return (
        <React.Fragment key={turnNumber}>
          {actionParagraph}
          {narrativeParagraphs.map((paragraph, pIndex) => (
             <p key={`${turnNumber}-${pIndex}`} className="mb-4 text-slate-300 text-base md:text-lg leading-relaxed">
                 {paragraph}
             </p>
          ))}
          {illustrationForTurn && (
              <div className="my-4 border border-cyan-700/50 rounded-lg overflow-hidden shadow-lg shadow-cyan-900/50 animate-fade-in">
                  <img src={illustrationForTurn} alt={`Illustration for turn ${turnNumber}`} className="w-full h-auto object-cover"/>
              </div>
          )}
        </React.Fragment>
      );
    });
  };
  
  const getPlaceholderText = () => {
    if (isSuggesting) {
      return t(language, 'thinkingOfUse');
    }
    if (selectedItems.length === 0) {
      return t(language, 'whatToDo');
    }
    const itemNames = selectedItems.map(i => i.name).join(', ');
    if (itemNames.length > 40) {
      return `Use ${selectedItems.length} selected items...`;
    }
    return `Use ${itemNames}...`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:h-[90vh] md:max-h-[900px]">
      {/* Left Panel: Game Info & Player Stats */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4 md:max-h-full md:overflow-y-auto">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 text-center">
            <h2 className="text-2xl font-bold text-cyan-400">{chapterTitle}</h2>
            <p className="text-slate-400">Turn: {gameState.turnCount}</p>
        </div>
        <div className="flex-grow">
          <PlayerStats
            health={gameState.health}
            luck={gameState.luck}
            inventory={gameState.inventory}
            equipment={gameState.equipment}
            blessings={gameState.blessings}
            actionResult={gameState.actionResult}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            language={language}
            playerClassName={playerClassName}
            playerGender={playerGender}
          />
        </div>
      </div>

      {/* Right Panel: Story and Actions */}
      <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col bg-black/30 backdrop-blur-sm rounded-lg shadow-2xl shadow-cyan-500/10 border border-slate-700 overflow-hidden h-[80vh] md:h-full">
        {/* Story Display */}
        <div ref={storyContainerRef} className="flex-grow p-3 md:p-6 overflow-y-auto story-content relative min-h-20">
            {renderStory()}
            {isGeneratingImage && (
              <div className="my-4 h-64 flex flex-col items-center justify-center bg-slate-800/50 border border-slate-700 rounded-lg">
                <LoadingIcon />
                <p className="mt-2 text-slate-400">{t(language, 'generatingIllustration')}</p>
              </div>
            )}
            {isLoading && !gameState.story && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80">
                <LoadingIcon />
                <p className="mt-4 text-xl text-slate-300">{t(language, 'buildingWorld')}</p>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="p-3 md:p-4 border-t border-slate-700 bg-slate-900/50">
           {error && <p className="text-red-400 mb-2 text-center">{error}</p>}
           {isLoading && (
              <div className="flex items-center justify-center p-4">
                  <LoadingIcon />
                  <p className="ml-4 text-slate-400">{t(language, 'waitingForFate')}</p>
              </div>
           )}

          {!isLoading && (
            <>
              {!gameState.win ? (
                <>
                  <h3 className="text-base md:text-lg font-bold text-slate-300 mb-3 text-center">{t(language, 'whatToDo')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    {gameState.suggestedActions.map(({ action, hint }) => (
                      <button
                        key={action}
                        onClick={() => handleSubmit(action)}
                        className="bg-slate-700 text-slate-200 p-4 rounded-lg text-left transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                        title={hint}
                      >
                        <span className="font-semibold text-sm md:text-base">{action}</span>
                        <span className="block text-xs text-slate-400 mt-1">{hint}</span>
                      </button>
                    ))}
                  </div>
                  <form onSubmit={handleCustomActionSubmit} className="flex gap-2 md:gap-3">
                    <input
                      type="text"
                      value={customAction}
                      onChange={(e) => setCustomAction(e.target.value)}
                      placeholder={getPlaceholderText()}
                      className="flex-grow bg-slate-800 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition disabled:opacity-50"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      className="bg-cyan-600 text-white font-bold py-2 px-4 md:px-6 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                      disabled={isLoading || !customAction.trim()}
                    >
                      {t(language, 'submit')}
                    </button>
                  </form>
                  <div className="mt-4 flex justify-center gap-4">
                    <button onClick={onGenerateIllustration} disabled={isGeneratingImage || isLoading} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm underline disabled:opacity-50 disabled:cursor-not-allowed">
                        {isGeneratingImage ? t(language, 'generatingIllustration') : t(language, 'generateIllustration')}
                    </button>
                      <button onClick={onSave} disabled={isLoading} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm underline disabled:opacity-50">
                          {t(language, 'saveGame')}
                      </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-center py-8">
                    <button
                        onClick={onProceedToGameOver}
                        className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/20 text-xl"
                    >
                        {t(language, 'gameClearedButton')}
                    </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;