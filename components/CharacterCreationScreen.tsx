import React, { useState } from 'react';
import { PlayerClass, Language, Gender } from '../types';
import { t } from '../constants';

const iconProps = { className: "h-16 w-16 mb-4 text-cyan-400", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round"} as const;
const KnightIcon = () => <svg {...iconProps} viewBox="0 0 24 24" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const RogueIcon = () => <svg {...iconProps} viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3l7 7-7 7 7-7-7-7z"></path><path d="M21 21l-7-7 7-7-7 7 7 7z"></path></svg>;
const ScholarIcon = () => <svg {...iconProps} viewBox="0 0 24 24" stroke="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const TricksterIcon = () => <svg {...iconProps} viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path></svg>;
const DarkFeyIcon = () => <svg {...iconProps} viewBox="0 0 24 24" stroke="currentColor"><path d="M22 12c-2-2-2-6-4-7s-5 1-7 1-5-2-7-1-2 5-4 7 1 6 1 6-2 4 5 4 5-3 7-3 5 5 5 5-2-4 1-6-1-4-1-4z" /></svg>;


const classIcons: { [key: string]: React.ReactElement } = {
  'Knight': <KnightIcon />, 'Rogue': <RogueIcon />, 'Scholar': <ScholarIcon />, 'Trickster': <TricksterIcon />, 'Dark Master': <DarkFeyIcon />,
  '騎士': <KnightIcon />, '盜賊': <RogueIcon />, '學者': <ScholarIcon />, '詐欺師': <TricksterIcon />, '暗魔獸': <DarkFeyIcon />,
  '骑士': <KnightIcon />, '盗贼': <RogueIcon />, '学者': <ScholarIcon />, '欺诈师': <TricksterIcon />, '暗魔兽': <DarkFeyIcon />,
  'ナイト': <KnightIcon />, '盗賊': <RogueIcon />, 'トリックスター': <TricksterIcon />, '暗魔獣': <DarkFeyIcon />,
  'Caballero': <KnightIcon />, 'Pícaro': <RogueIcon />, 'Erudito': <ScholarIcon />, 'Embaucador': <TricksterIcon />, 'Maestro Oscuro': <DarkFeyIcon />,
  '기사': <KnightIcon />, '도적': <RogueIcon />, '학자': <ScholarIcon />, '사기꾼': <TricksterIcon />, '암흑 마수': <DarkFeyIcon />,
};

interface CharacterCreationScreenProps {
  classes: PlayerClass[];
  onSelectClass: (playerClass: PlayerClass, gender: Gender) => void;
  language: Language;
  onUnlockTrickster: () => void;
  onUnlockDarkMaster: () => void;
}

const CharacterCreationScreen: React.FC<CharacterCreationScreenProps> = ({ classes, onSelectClass, language, onUnlockTrickster, onUnlockDarkMaster }) => {
  const [selectedClass, setSelectedClass] = useState<PlayerClass | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const UNLOCK_TRICKSTER_THRESHOLD = 6;
  const UNLOCK_DARK_FEY_THRESHOLD = 12;

  const handleSelect = (playerClass: PlayerClass) => {
    setSelectedClass(playerClass);
    
    const now = Date.now();
    // Reset count if clicks are too far apart
    if (now - lastClickTime > 1000) {
        setClickCount(1);
    } else {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount > UNLOCK_TRICKSTER_THRESHOLD) {
          onUnlockTrickster();
        }
        if (newCount > UNLOCK_DARK_FEY_THRESHOLD) {
          onUnlockDarkMaster();
        }
    }
    setLastClickTime(now);
  };

  const handleConfirm = () => {
    if (selectedClass) {
      onSelectClass(selectedClass, selectedGender);
    }
  };
  
  const getStartingItems = (playerClass: PlayerClass) => {
    const equipmentItems = Object.values(playerClass.initialEquipment).filter(Boolean).map(item => item!.name);
    const inventoryItems = playerClass.initialInventory.map(item => `${item.name}${item.quantity && item.quantity > 1 ? ` (x${item.quantity})` : ''}`);
    const separator = language === 'ja' ? '、' : ', ';
    return [...equipmentItems, ...inventoryItems].join(separator) || 'None';
  };

  // FIX: Changed 'const' to 'let' to allow reassignment for dynamic grid layouts.
  let gridColsClass = classes.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';
  if (classes.length === 5) { // Handle 5 classes specifically for better layout
      // This will result in a 3-2 layout on large screens, which is better than 5-in-a-row or 4-1.
      gridColsClass = 'md:grid-cols-3 lg:grid-cols-5';
  }


  return (
    <div className="ornate-box max-w-6xl mx-auto">
        <div className="ornate-box-inner p-6 md:p-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-2 tracking-wider text-glow">{t(language, 'chooseOrigin')}</h1>
                <p className="text-slate-400 max-w-3xl mx-auto mb-8">
                    {t(language, 'originDescription')}
                </p>
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6 mb-6`}>
                    {classes.map((playerClass) => (
                    <div
                        key={playerClass.id}
                        onClick={() => handleSelect(playerClass)}
                        className={`p-6 bg-slate-800/50 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-slate-700/70 hover:shadow-cyan-500/20 hover:border-cyan-600 ${selectedClass?.id === playerClass.id ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-slate-700'}`}
                    >
                        <div className="flex flex-col items-center">
                            {classIcons[playerClass.name] || <KnightIcon />}
                            <h2 className="text-2xl font-bold text-slate-200 mb-2">{playerClass.name}</h2>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 min-h-[7rem]">{playerClass.description}</p>
                        <div className="text-left text-xs text-slate-300 bg-slate-900/60 p-3 rounded-md h-24">
                            <h4 className="font-bold text-cyan-400 mb-1">{t(language, 'startingEquipment')}</h4>
                            <p>{getStartingItems(playerClass)}</p>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="my-8">
                    <h3 className="text-xl font-bold text-cyan-400 mb-3">{t(language, 'chooseGender')}</h3>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setSelectedGender('male')}
                            className={`px-8 py-3 rounded-lg border-2 text-lg font-bold transition-all ${selectedGender === 'male' ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-cyan-700'}`}
                        >
                            {t(language, 'male')} ♂
                        </button>
                        <button
                            onClick={() => setSelectedGender('female')}
                            className={`px-8 py-3 rounded-lg border-2 text-lg font-bold transition-all ${selectedGender === 'female' ? 'bg-pink-600 border-pink-500 text-white' : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-pink-700'}`}
                        >
                            {t(language, 'female')} ♀
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleConfirm}
                    disabled={!selectedClass}
                    className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 text-xl disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none button-glow"
                >
                    {t(language, 'embarkJourney')}
                </button>
            </div>
        </div>
    </div>
  );
};

export default CharacterCreationScreen;