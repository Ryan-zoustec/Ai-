import { PlayerClass, GameState, Language, Blessing } from './types';

export const INITIAL_GAME_STATE: GameState = {
  story: '',
  health: 100,
  inventory: [],
  equipment: {
    head: null,
    body: null,
    leftHand: null,
    rightHand: null,
    feet: null,
    waist: null,
    companion: null,
  },
  luck: 50,
  suggestedActions: [],
  gameOver: false,
  win: false,
  mood: 'neutral',
  actionResult: 'neutral',
  turnCount: 0,
  chapterTitle: '',
  illustrations: {},
  strongEnemiesDefeated: 0,
  blessings: [],
  alignment: 0,
};

// --- BLESSINGS ---
const KNIGHT_BLESSINGS_EN: Blessing[] = [
  { name: "Sacred Resilience", description: "When health is restored, luck is restored by the same amount." },
  { name: "Vanquisher's Fortune", description: "When an enemy is defeated, a large amount of luck is restored." },
  { name: "Boon of Reinforcement", description: "When equipment or a companion is enhanced, luck is restored." }
];
const ROGUE_BLESSINGS_EN: Blessing[] = [
  { name: "Gambler's Pact", description: "When health is lost from damage, luck is lost by the same amount." },
  { name: "Finder's Fortune", description: "When a new item is discovered, a large amount of luck is restored." },
  { name: "Vampiric Strikes", description: "Restore a small amount of health when successfully damaging an enemy with a weapon." }
];
const SCHOLAR_BLESSINGS_EN: Blessing[] = [
  { name: "Pioneer's Insight", description: "When unlocking new areas, knowledge documents, or runic seals, a small amount of luck is restored." },
  { name: "Pacifist's Burden", description: "Each time an enemy is defeated or a healing spell is cast, a corresponding amount of luck is lost." },
  { name: "Arcane Feedback", description: "When casting destructive magic, restore a small amount of luck and lose a small amount of health." }
];
const TRICKSTER_BLESSINGS_EN: Blessing[] = [
  { name: "Twisted Words", description: "Words spoken have a 50% chance to backfire, causing an unintended, often negative, consequence." },
  { name: "Fabricated Fate", description: "Lies told have a high chance of coming true in an unexpected way." },
  { name: "Fragile Favor", description: "Luck is permanently fixed at 100, but health cannot exceed 1." }
];
const DARK_MASTER_BLESSINGS_EN: Blessing[] = [
    { name: "Predator's Evolution", description: "Upon defeating an enemy, you may consume it to permanently gain health and luck. The amount of health and luck restored is directly proportional to the enemy's strength, but the moral toll is heavy." },
    { name: "Echoes of Knowledge", description: "When consuming a 'Faint Memory' or a knowledgeable entity, you have a chance to gain a new, temporary blessing based on their skills." },
    { name: "Primal Fear", description: "Your terrifying presence has a chance to stun weaker enemies at the start of combat, but also makes peaceful interactions nearly impossible." }
];
const KNIGHT_BLESSINGS_ZH_TW: Blessing[] = [
    { name: "神聖韌性", description: "在恢復生命值的同時，會恢復等量的幸運值。" },
    { name: "征服者之運", description: "在擊敗敵人的同時，會恢復大量的幸運值。" },
    { name: "強化之恩", description: "當裝備或夥伴被強化時，會恢復幸運值。" }
];
const ROGUE_BLESSINGS_ZH_TW: Blessing[] = [
    { name: "賭徒契約", description: "在減損生命值的同時，會減損等量的幸運值。" },
    { name: "尋寶者之運", description: "在發現道具的同時，會恢復大量的幸運值。" },
    { name: "吸血打擊", description: "在直接以武器傷害敵人奏效時，恢復微量的生命。" }
];
const SCHOLAR_BLESSINGS_ZH_TW: Blessing[] = [
    { name: "先驅之識", description: "在解鎖新的場所、知識文獻、符文印記時，會恢復微量的幸運值。" },
    { name: "和平主義者之負", description: "每次打倒敵人或是施放恢復法術時，會減損相應強度的幸運值。" },
    { name: "奧術回饋", description: "在自身施展具破壞性的魔法時，恢復微量的幸運值，並減損微量的生命值。" }
];
const TRICKSTER_BLESSINGS_ZH_TW: Blessing[] = [
    { name: "扭曲之言", description: "所述說的話語，有五成機率產生反噬，造成意想不到的負面後果。" },
    { name: "虛構之運", description: "所述說的謊言，有高機率以意外的情況成真。" },
    { name: "脆弱恩典", description: "幸運值永遠為100，但生命值最高只能為1。" }
];
const DARK_MASTER_BLESSINGS_ZH_TW: Blessing[] = [
    { name: "掠食進化", description: "擊敗敵人後，你可以選擇吞噬它，永久獲得生命值和幸運值。恢復的生命值和幸運值與吞噬的目標強度成正比，但道德的代價是沉重的。" },
    { name: "知識迴響", description: "吞噬「模糊的記憶」或有知識的實體時，你有機會根據他們的技能獲得一個新的、暫時的祝福。" },
    { name: "原始恐懼", description: "你可怕的存在有機會在戰鬥開始時震懾較弱的敵人，但這也使得和平的互動幾乎不可能。" }
];
const KNIGHT_BLESSINGS_ZH_CN: Blessing[] = [
    { name: "神圣韧性", description: "在恢复生命值的同时，会恢复等量的幸运值。" },
    { name: "征服者之运", description: "在击败敌人的同时，会恢复大量的幸运值。" },
    { name: "强化之恩", description: "当装备或伙伴被强化时，会恢复幸运值。" }
];
const ROGUE_BLESSINGS_ZH_CN: Blessing[] = [
    { name: "赌徒契约", description: "在减损生命值的同时，会减损等量的幸运值。" },
    { name: "寻宝者之运", description: "在发现道具的同时，会恢复大量的幸运值。" },
    { name: "吸血打击", description: "在直接以武器伤害敌人奏效时，恢复微量的生命。" }
];
const SCHOLAR_BLESSINGS_ZH_CN: Blessing[] = [
    { name: "先驱之识", description: "在解锁新的场所、知识文献、符文印记时，会恢复微量的幸运值。" },
    { name: "和平主义者之负", description: "每次打倒敌人或是施放恢复法术时，会减损相应强度的幸运值。" },
    { name: "奥术回馈", description: "在自身施展具破坏性的魔法时，恢复微量的幸运值，并减损微量的生命值。" }
];
const TRICKSTER_BLESSINGS_ZH_CN: Blessing[] = [
    { name: "扭曲之言", description: "所述说的话语，有五成机率产生反噬，造成意想不到的负面后果。" },
    { name: "虚构之运", description: "所述说的谎言，有高机率以意外的情况成真。" },
    { name: "脆弱恩典", description: "幸运值永远为100，但生命值最高只能为1。" }
];
const DARK_MASTER_BLESSINGS_ZH_CN: Blessing[] = [
    { name: "掠食进化", description: "击败敌人后，你可以选择吞噬它，永久获得生命值和幸运值。恢复的生命值和幸运值与吞噬的目标强度成正比，但道德的代价是沉重的。" },
    { name: "知识回响", description: "吞噬“模糊的记忆”或有知识的实体时，你有机会根据他们的技能获得一个新的、暂时的祝福。" },
    { name: "原始恐惧", description: "你可怕的存在有机会在战斗开始时震慑较弱的敌人，但这也使得和平的互动几乎不可能。" }
];
const KNIGHT_BLESSINGS_JA: Blessing[] = [
    { name: "聖なる回復力", description: "体力を回復すると、同量の幸運も回復する。" },
    { name: "征服者の幸運", description: "敵を倒すと、大量の幸運が回復する。" },
    { name: "強化の恩恵", description: "装備や相棒が強化されると、幸運が回復する。" }
];
const ROGUE_BLESSINGS_JA: Blessing[] = [
    { name: "ギャンブラーの契約", description: "ダメージで体力が失われると、同量の幸運も失われる。" },
    { name: "発見者の幸運", description: "新しいアイテムを発見すると、大量の幸運が回復する。" },
    { name: "吸血の一撃", description: "武器で敵にダメージを与えることに成功すると、少量の体力を回復する。" }
];
const SCHOLAR_BLESSINGS_JA: Blessing[] = [
    { name: "開拓者の洞察", description: "新しい場所、知識の文献、ルーンの印を解き明かすと、少量の幸運が回復する。" },
    { name: "平和主義者の負担", description: "敵を倒すか、回復魔法を唱えるたびに、それに応じた量の幸運が失われる。" },
    { name: "秘術の反響", description: "破壊的な魔法を詠唱する際、微量の幸運を回復するが、微量の体力を失う。" }
];
const TRICKSTER_BLESSINGS_JA: Blessing[] = [
    { name: "ねじれた言葉", description: "話した言葉が、50%の確率で裏目に出て、意図しない、しばしば否定的な結果を引き起こす。" },
    { name: "作り上げられた運命", description: "ついた嘘が、高い確率で予期せぬ形で現実になる。" },
    { name: "脆い恩恵", description: "幸運は常に100に固定されるが、体力は1を超えることはできない。" }
];
const DARK_MASTER_BLESSINGS_JA: Blessing[] = [
    { name: "捕食者の進化", description: "敵を倒した後、それを消費して体力和幸運を永久に得ることができる。回復する体力と幸運は敵の強さに正比例するが、道徳的な代償は大きい。" },
    { name: "知識の残響", description: "「かすかな記憶」や知識豊富な存在を消費すると、彼らのスキルに基づいて新しい一時的な祝福を得るチャンスがある。" },
    { name: "原初の恐怖", description: "あなたの恐ろしい存在は、戦闘開始時に弱い敵を気絶させる可能性があるが、平和的な対話もほぼ不可能にする。" }
];
const KNIGHT_BLESSINGS_ES: Blessing[] = [
    { name: "Resiliencia Sagrada", description: "Cuando se restaura la salud, la suerte se restaura en la misma cantidad." },
    { name: "Fortuna del Vencedor", description: "Cuando se derrota a un enemigo, se restaura una gran cantidad de suerte." },
    { name: "Bendición del Refuerzo", description: "Cuando se mejora el equipo o un compañero, se restaura la suerte." }
];
const ROGUE_BLESSINGS_ES: Blessing[] = [
    { name: "Pacto del Jugador", description: "Cuando se pierde salud por daño, se pierde la misma cantidad de suerte." },
    { name: "Fortuna del Descubridor", description: "Cuando se descubre un nuevo objeto, se restaura una gran cantidad de suerte." },
    { name: "Golpes Vampíricos", description: "Restaura una pequeña cantidad de salud al dañar con éxito a un enemigo con un arma." }
];
const SCHOLAR_BLESSINGS_ES: Blessing[] = [
    { name: "Perspicacia del Pionero", description: "Al desbloquear nuevas áreas, documentos de conocimiento o sellos rúnicos, se restaura una pequeña cantidad de suerte." },
    { name: "Carga del Pacifista", description: "Cada vez que se derrota a un enemigo o se lanza un hechizo de curación, se pierde una cantidad de suerte correspondiente." },
    { name: "Reacción Arcana", description: "Al lanzar magia destructiva, restauras una pequeña cantidad de suerte, pero pierdes una pequeña cantidad de salud." }
];
const TRICKSTER_BLESSINGS_ES: Blessing[] = [
    { name: "Palabras Retorcidas", description: "Las palabras pronunciadas tienen un 50% de probabilidad de ser contraproducentes, causando una consecuencia no deseada y a menudo negativa." },
    { name: "Destino Fabricado", description: "Las mentiras contadas tienen una alta probabilidad de hacerse realidad de una manera inesperada." },
    { name: "Favor Frágil", description: "La suerte se fija permanentemente en 100, pero la salud no puede exceder 1." }
];
const DARK_MASTER_BLESSINGS_ES: Blessing[] = [
    { name: "Evolución del Depredador", description: "Al derrotar a un enemigo, puedes consumirlo para ganar permanentemente salud y suerte. La cantidad de salud y suerte restaurada es directamente proporcional a la fuerza del enemigo, pero el costo moral es alto." },
    { name: "Ecos del Conocimiento", description: "Al consumir un 'Recuerdo Vago' o una entidad con conocimientos, tienes la oportunidad de obtener una nueva bendición temporal basada en sus habilidades." },
    { name: "Miedo Primordial", description: "Tu aterradora presencia tiene la posibilidad de aturdir a los enemigos más débiles al comienzo del combate, pero también hace que las interacciones pacíficas sean casi imposibles." }
];
const KNIGHT_BLESSINGS_KO: Blessing[] = [
    { name: "신성한 회복력", description: "체력을 회복하면 같은 양의 행운도 회복됩니다." },
    { name: "정복자의 행운", description: "적을 물리치면 대량의 행운이 회복됩니다." },
    { name: "강화의 축복", description: "장비나 동료가 강화될 때, 행운이 회복됩니다." }
];
const ROGUE_BLESSINGS_KO: Blessing[] = [
    { name: "도박사의 계약", description: "피해로 체력을 잃으면 같은 양의 행운도 잃습니다." },
    { name: "발견자의 행운", description: "새로운 아이템을 발견하면 대량의 행운이 회복됩니다." },
    { name: "흡혈격", description: "무기로 적에게 성공적으로 피해를 입혔을 때 소량의 체력을 회복합니다." }
];
const SCHOLAR_BLESSINGS_KO: Blessing[] = [
    { name: "개척자의 통찰력", description: "새로운 장소, 지식 문헌, 룬 인장을 해제할 때 소량의 행운이 회복됩니다." },
    { name: "평화주의자의 짐", description: "적을 물리치거나 치유 마법을 시전할 때마다, 그에 상응하는 양의 행운을 잃습니다." },
    { name: "비전 반향", description: "파괴적인 마법을 시전하면 소량의 행운을 회복하지만, 소량의 체력을 잃습니다." }
];
const TRICKSTER_BLESSINGS_KO: Blessing[] = [
    { name: "뒤틀린 말", description: "한 말이 50% 확률로 역효과를 낳아, 의도치 않은 부정적인 결과를 초래합니다。" },
    { name: "조작된 운명", description: "한 거짓말이 높은 확률로 예상치 못한 방식으로 실현됩니다." },
    { name: "취약한 은총", description: "행운은 영구적으로 100으로 고정되지만 체력은 1을 초과할 수 없습니다." }
];
const DARK_MASTER_BLESSINGS_KO: Blessing[] = [
    { name: "포식자의 진화", description: "적을 물리친 후, 그것을 소비하여 체력과 행운을 영구적으로 얻을 수 있습니다. 회복되는 체력과 행운의 양은 적의 힘에 정비례하지만, 도덕적 대가가 큽니다." },
    { name: "지식의 메아리", description: "'희미한 기억'이나 지식이 있는 존재를 소비할 때, 그들의 기술에 기반한 새로운 일시적인 축복을 얻을 기회가 있습니다." },
    { name: "원초적 공포", description: "당신의 끔찍한 존재는 전투 시작 시 약한 적을 기절시킬 수 있지만, 평화로운 상호작용 또한 거의 불가능하게 만듭니다." }
];


// --- ENGLISH PLAYER CLASSES ---
const KNIGHT_CLASS_EN: PlayerClass = {
  id: 'knight',
  name: 'Knight',
  description: 'A bastion of honor and martial prowess. Knights begin their journey with sturdy armor and a reliable sword, ready to face any foe head-on.',
  initialHealth: 100,
  initialLuck: 60,
  initialEquipment: {
    head: { name: 'Old Helm', type: 'equippable', slot: 'head', description: 'A simple, functional helmet that has protected its wearer from more than one fateful blow. It obstructs peripheral vision.' },
    body: { name: 'Old Knight\'s Armor', type: 'equippable', slot: 'body', description: 'Heavy plate armor, dented and scarred from countless battles. It offers substantial protection at the cost of mobility.' },
    rightHand: { name: 'Battle-Worn Shortsword', type: 'equippable', slot: 'rightHand', description: 'A reliable blade that has seen its share of conflict. Its edge is chipped, but its spirit is unbroken.' },
    companion: { name: 'Royal Guardian Hound', type: 'summon_companion', slot: 'companion', description: 'A loyal and battle-trained canine companion. Its senses are sharp, and its bite is fierce.' },
    leftHand: { name: 'Old Knight\'s Shield', type: 'equippable', slot: 'leftHand', description: 'A heavy wooden shield banded with iron, bearing a faded crest. It has deflected countless blows and is a testament to resilience.' },
    feet: { name: 'Noisy Metal Greaves', type: 'equippable', slot: 'feet', description: 'Sturdy but ill-fitting greaves. They offer good protection for the shins but clang loudly with every step, making stealth impossible.' },
    waist: { name: 'Flammable Torch', type: 'equippable', slot: 'waist', description: 'A sturdy wooden torch wrapped in oil-soaked rags. Provides light, but might attract unwanted attention. Smells faintly of pine and desperation.' },
  },
  initialInventory: [
    { name: 'King\'s Secret Order', type: 'non-consumable', description: 'A sealed scroll bearing the royal crest. Its contents are for your eyes only, detailing a mission of grave importance.' },
    { name: 'Healing Salve', type: 'consumable', quantity: 1, description: 'A thick, herbal paste that can be applied to wounds to promote rapid healing.' }
  ],
  startingPrompt: 'Clad in iron and sworn to an ancient oath, you stand before the moss-covered maw of the Whispering Crypt. An unsettling chill, colder than the night air, seeps from the stone archway, carrying faint, indecipherable whispers. Your King\'s secret order feels heavy in your pouch, a stark reminder of the encroaching darkness you must vanquish. This is more than a treasure hunt; it is a grim duty. Describe the scene and your first resolute action against the encroaching dread.',
  initialBlessings: KNIGHT_BLESSINGS_EN,
};
const ROGUE_CLASS_EN: PlayerClass = {
  id: 'rogue',
  name: 'Rogue',
  description: 'A master of shadows and subtlety. Rogues rely on wit and agility, preferring to strike from the darkness and disappear before the enemy can react.',
  initialHealth: 30,
  initialLuck: 90,
  initialEquipment: {
    head: { name: 'Rogue\'s Cowl', type: 'equippable', slot: 'head', description: 'A deep hood that conceals the face in shadow, perfect for remaining unseen.' },
    body: { name: 'Cloth Armor', type: 'equippable', slot: 'body', description: 'A set of dark, layered fabrics that offer minimal protection but allow for silent, fluid movement.' },
    rightHand: { name: 'Rusted Dagger', type: 'equippable', slot: 'rightHand', description: 'A pitted and corroded blade, but its edge is still sharp enough for a silent takedown.' },
    feet: { name: 'Soft-soled Shoes', type: 'equippable', slot: 'feet', description: 'Lightweight footwear designed to muffle footsteps on stone floors.' },
    companion: { name: 'Dark Moon Owl', type: 'summon_companion', slot: 'companion', description: 'A nocturnal bird of prey with unnervingly intelligent eyes. It sees what others miss in the darkness.' },
    leftHand: null, waist: null,
  },
  initialInventory: [
    { name: 'Smoke Bomb', type: 'consumable', quantity: 1, description: 'A small, clay sphere that releases a thick cloud of disorienting smoke when shattered.' },
    { name: 'Lockpick', type: 'consumable', description: 'A slender piece of metal, essential for bypassing simple locks. It looks fragile and might only work once.' }
  ],
  startingPrompt: 'You are a shadow that moves unseen. Under the cloak of a moonless night, you arrive at the Whispering Crypt, drawn by rumors of a priceless artifact. The heavy stone door is slightly ajar, a silent invitation into suffocating blackness. A cool draft carries the scent of dust and something metallic, like old blood. This is your element. Describe how you slip inside, embracing the palpable danger that awaits.',
  initialBlessings: ROGUE_BLESSINGS_EN,
};
const SCHOLAR_CLASS_EN: PlayerClass = {
  id: 'scholar',
  name: 'Scholar',
  description: 'A seeker of forgotten knowledge and arcane secrets. The Scholar uses intellect to overcome obstacles, wielding ancient lore as a potent weapon.',
  initialHealth: 70,
  initialLuck: 75,
  initialEquipment: {
    head: { name: 'Monocle', type: 'equippable', slot: 'head', description: 'A lens of finely ground crystal that reveals details invisible to the naked eye.' },
    body: { name: 'Scholar\'s Robe', type: 'equippable', slot: 'body', description: 'Flowing robes embroidered with arcane symbols that offer minor protection against magical energies.' },
    rightHand: { name: 'Withered Branch Staff', type: 'equippable', slot: 'rightHand', description: 'A twisted piece of ancient wood that hums with latent magical power. It feels strangely warm to the touch.' },
    companion: { name: 'Elemental Sprite', type: 'summon_companion', slot: 'companion', description: 'A flickering mote of pure energy that darts through the air, drawn to sources of magic.' },
    leftHand: null, feet: null, waist: null,
  },
  initialInventory: [
    { name: 'Ancient Arcane Codex', type: 'non-consumable', description: 'A heavy tome bound in strange leather, filled with cryptic lore and forbidden rituals.' },
    { name: 'Mana Potion', type: 'consumable', quantity: 1, description: 'A swirling, luminous blue liquid that temporarily overcharges your magical abilities, making your next spell incredibly potent.' }
  ],
  startingPrompt: 'Driven by a thirst for lost knowledge, your research has led you to the Whispering Crypt, a site rumored to hold secrets of a bygone, powerful era. You stand at the entrance, your old staff in hand. The very air crackles with a latent energy you can feel on your skin, a dangerous symphony of forgotten power. This place is not merely a tomb; it is a library of the forbidden. Describe the first forgotten secret you seek to unveil amidst the ominous silence.',
  initialBlessings: SCHOLAR_BLESSINGS_EN,
};
const TRICKSTER_CLASS_EN: PlayerClass = {
  id: 'trickster',
  name: 'Trickster',
  description: "A frail but cunning individual who wields the power of 'Kotodama'—the spirit of words. They treat reality as a canvas for their spoken truths and well-crafted lies, outsmarting foes far stronger than themselves. Their path is one of wit over might, walking a fine line between good and evil.",
  initialHealth: 1,
  initialLuck: 100,
  initialEquipment: {
    head: { name: 'Hat of Narrated Lies', type: 'equippable', slot: 'head', description: "A seemingly ordinary hat with a peculiar habit: the 'words' it speaks are always lies. The catch is, only the wearer knows this." },
    companion: { name: 'Bluffing Phantom', type: 'summon_companion', slot: 'companion', description: "An ethereal, translucent entity that mirrors your actions, creating a convincing diversion or the illusion of a partner. It offers no physical aid but is a master of misdirection." },
    waist: { name: 'Pouch of Unknown Contents', type: 'equippable', slot: 'waist', description: "A simple leather pouch. Whenever you reach inside, you seem to feel something, but what you pull out is never what you expect." },
    body: null, leftHand: null, rightHand: null, feet: null,
  },
  initialInventory: [
    { name: 'Shiny but Cheap Coin', type: 'consumable', description: "A glittering coin that looks priceless, but any expert can see it's just a gilded piece of iron. Perfect for creating a distraction or engaging in a bet you're destined to lose." },
    { name: 'Blank Scroll', type: 'consumable', description: "A clean roll of parchment with nothing written on it. It can be used to record anything, or to make others believe it contains whatever they most desire (or fear) to see." },
  ],
  startingPrompt: "You are a wielder of Kotodama, the power to shape reality with words. Your body is frail, but your will is iron. You have come to the Whispering Crypt not for gold, but to temper your abilities in a place where the veil between worlds is thin. The whispers of the crypt are not just threats; they are echoes of power, a symphony you intend to conduct. As the stone door grinds shut, sealing you in darkness, you feel a thrill not of amusement, but of challenge. Describe the first 'truth' you speak into existence to test the crypt's response to your power.",
  initialBlessings: TRICKSTER_BLESSINGS_EN,
};
const DARK_MASTER_CLASS_EN: PlayerClass = {
  id: 'dark_master',
  name: 'Dark Master',
  description: "A demonic beast from an ancient saga, it awoke to human intellect after its first taste of man. Now a 'Dark Master', it struggles between primal hunger and a stolen conscience. It devours its victims not just for sustenance, but to assimilate their very abilities and knowledge, growing ever more powerful and conflicted.",
  initialHealth: 40,
  initialLuck: 80,
  initialEquipment: {
    head: { name: 'Crimson Mane', type: 'equippable', slot: 'head', description: "Not an item, but the beast's own fiery red fur, stiff as bristles. It offers some protection and glows faintly in the dark." },
    body: { name: 'Tattered Scholar\'s Robe', type: 'equippable', slot: 'body', description: "The tattered remains of its first human meal. The lingering scent of paper and ink is a constant, unsettling reminder of its newfound consciousness." },
    rightHand: { name: 'Voracious Claws', type: 'equippable', slot: 'rightHand', description: "The beast's natural weapons. They can tear through flesh and, it is said, consume the very essence of its victims." },
    feet: { name: 'Shadow-Padded Paws', type: 'equippable', slot: 'feet', description: "Its paws are naturally silent, allowing it to move without a sound, a remnant of its predatory nature." },
    leftHand: null, waist: null, companion: null,
  },
  initialInventory: [
    { name: 'Essence of the Consumed', type: 'non-consumable', description: "A swirling, ethereal core within the beast. It holds the memories and knowledge of those it has devoured. It hums with a sorrowful energy." },
    { name: 'Faint Memory', type: 'consumable', quantity: 1, description: "A fleeting memory from a past victim. Consuming it might reveal a forgotten secret or a useful skill, but the psychic backlash is unpredictable." },
  ],
  startingPrompt: "The transformation was recent. The man's memories—his fear, his life, his knowledge—still scream within you. You are no longer just a beast. You are... something else. The Whispering Crypt calls, not with promises of treasure, but with the scent of power and forgotten essences. You are hungry, not just for flesh, but for answers. As you stand before the entrance, a primal instinct wars with a newfound consciousness. Describe your first step, beast or man?",
  initialBlessings: DARK_MASTER_BLESSINGS_EN,
};

// --- TRADITIONAL CHINESE PLAYER CLASSES ---
const KNIGHT_CLASS_ZH_TW: PlayerClass = {
  id: 'knight',
  name: '騎士',
  description: '榮譽與武力的堡壘。騎士以堅固的盔甲和可靠的劍展開他們的旅程，準備好正面迎戰任何敵人。',
  initialHealth: 100,
  initialLuck: 60,
  initialEquipment: {
    head: { name: '老舊的頭盔', type: 'equippable', slot: 'head', description: '一頂簡單但實用的頭盔，曾不只一次保護佩戴者免受致命打擊。它會阻礙周邊視野。' },
    body: { name: '老舊的騎士鎧甲', type: 'equippable', slot: 'body', description: '厚重的板甲，上面佈滿了無數戰鬥留下的凹痕和疤痕。它以犧牲機動性為代价，提供堅實的保護。' },
    rightHand: { name: '戰損短劍', type: 'equippable', slot: 'rightHand', description: '一把見證了無數衝突的可靠刀刃。雖然劍鋒有缺口，但其鬥志未曾磨損。' },
    companion: { name: '王國守護犬', type: 'summon_companion', slot: 'companion', description: '一隻忠誠且受過戰鬥訓練的犬類夥伴。牠的感官敏銳，咬合力驚人。' },
    leftHand: { name: '老舊的騎士盾', type: 'equippable', slot: 'leftHand', description: '一面用鐵條加固的沉重木盾，上面帶有褪色的紋章。它曾抵擋無數次攻擊，是韌性的證明。' },
    feet: { name: '吵雜的金屬護腳', type: 'equippable', slot: 'feet', description: '堅固但不太合腳的護脛。為小腿提供良好保護，但每走一步都會發出響亮的鏗鏘聲，使潛行成為不可能。' },
    waist: { name: '易燃的火把', type: 'equippable', slot: 'waist', description: '一根用浸油破布包裹的堅固木製火把。能提供光明，但也可能引來不必要的注意。散發著淡淡的松木與絕望的氣味。' },
  },
  initialInventory: [
    { name: '國王的密令', type: 'non-consumable', description: '一封蓋有皇家蠟印的捲軸。其內容僅限你親閱，詳述了一項極其重要的任務。' },
    { name: '治療藥膏', type: 'consumable', quantity: 1, description: '一種厚實的草藥膏，塗抹在傷口上可以促進快速癒合。' }
  ],
  startingPrompt: '身披鋼鐵，曾立下古老誓言，你站在長滿青苔的低語地穴入口前。一股比夜色更冷的寒氣從石拱門中滲出，帶來微弱而難以辨識的呢喃。國王的密令在你袋中沉甸甸的，提醒著你必須剷除那侵蝕土地的黑暗。這不僅是尋寶，而是一項嚴峻的職責。描述眼前的景象，以及你對抗那逼近的恐懼所採取的第一个堅決行動。',
  initialBlessings: KNIGHT_BLESSINGS_ZH_TW,
};
const ROGUE_CLASS_ZH_TW: PlayerClass = {
  id: 'rogue',
  name: '盜賊',
  description: '暗影與詭計的大師。盜賊依靠智慧和敏捷，偏好從黑暗中發動攻擊，並在敵人反應過來前消失無蹤。',
  initialHealth: 30,
  initialLuck: 90,
  initialEquipment: {
    head: { name: '盜賊頭巾', type: 'equippable', slot: 'head', description: '一頂能將臉部隱藏在陰影中的深色頭巾，非常適合保持隱蔽。' },
    body: { name: '布甲', type: 'equippable', slot: 'body', description: '一套深色的多層織物，保護性極低，但能讓穿著者無聲、流暢地移動。' },
    rightHand: { name: '生鏽匕首', type: 'equippable', slot: 'rightHand', description: '一把佈滿坑洞和腐蝕的刀刃，但其鋒利程度仍足以進行一次無聲的偷襲。' },
    feet: { name: '軟底鞋', type: 'equippable', slot: 'feet', description: '專為在石地上消音而設計的輕便鞋履。' },
    companion: { name: '暗月夜梟', type: 'summon_companion', slot: 'companion', description: '一隻擁有智慧到令人不安的雙眼的夜行性猛禽。牠能看見他人在黑暗中所忽略的事物。' },
    leftHand: null, waist: null,
  },
  initialInventory: [
    { name: '煙霧彈', type: 'consumable', quantity: 1, description: '一個小巧的陶土球，擊碎時會釋放出一團濃厚的、令人迷失方向的煙霧。' },
    { name: '開鎖器', type: 'consumable', description: '一根細長的金屬絲，是繞過簡易鎖具的必備品。它看起來很脆弱，可能只能使用一次。' }
  ],
  startingPrompt: '你是潛影無蹤的暗影行者。在無月之夜的掩護下，你循著一件稀世珍寶的傳聞來到低語地穴。厚重的石門微敞，像是一道通往窒息黑暗的無聲邀請。一陣冷風帶來塵埃與金屬的氣味，宛如陳舊的血跡。這裡是你的領域。描述你如何溜進去，擁抱那等待著你的、清晰可感的危險。',
  initialBlessings: ROGUE_BLESSINGS_ZH_TW,
};
const SCHOLAR_CLASS_ZH_TW: PlayerClass = {
  id: 'scholar',
  name: '學者',
  description: '被遺忘知識與奧術秘密的探求者。學者運用智慧克服障礙，將古老的學問作為強大的武器。',
  initialHealth: 70,
  initialLuck: 75,
  initialEquipment: {
    head: { name: '單片眼鏡', type: 'equippable', slot: 'head', description: '一片由精細研磨水晶製成的鏡片，能揭示肉眼看不見的細節。' },
    body: { name: '學者長袍', type: 'equippable', slot: 'body', description: '飄逸的長袍，上面繡有能提供微弱魔法能量保護的奧術符文。' },
    rightHand: { name: '枯枝法杖', type: 'equippable', slot: 'rightHand', description: '一根扭曲的古老木杖，散發著潛在的魔法力量。觸感異常溫暖。' },
    companion: { name: '元素精靈', type: 'summon_companion', slot: 'companion', description: '一團閃爍的純粹能量微粒，在空中飛舞，會被魔法源所吸引。' },
    leftHand: null, feet: null, waist: null,
  },
  initialInventory: [
    { name: '古老的神秘法典', type: 'non-consumable', description: '一本用奇特皮革裝訂的厚重典籍，裡面充滿了神秘的知識和禁忌的儀式。' },
    { name: '法力藥水', type: 'consumable', quantity: 1, description: '一種旋轉發光的藍色液體，能短暫地讓你的魔法能力超載，使你的下一個法術變得異常強大。' }
  ],
  startingPrompt: '在對失落知識的渴求驅使下，你的研究將你引至低語地穴，一個據說藏有遠古強大時代秘密的地點。你手持舊杖，站在入口處。空氣中充滿著潛在的能量，在你的皮膚上噼啪作響，宛如一曲由被遺忘的力量譜寫的危險交響樂。這裡不僅是墳墓，更是一座禁忌的圖書館。描述你在不祥的寂靜中，試圖揭開的第一個被遺忘的秘密。',
  initialBlessings: SCHOLAR_BLESSINGS_ZH_TW,
};
const TRICKSTER_CLASS_ZH_TW: PlayerClass = {
  id: 'trickster',
  name: '詐欺師',
  description: '一名肉體脆弱但思想狡詐的言靈使用者。他們將現實視為畫布，用言語編織真實與謊言，智取遠比自身強大的敵人。這是一條以智取勝、亦正亦邪的道路。',
  initialHealth: 1,
  initialLuck: 100,
  initialEquipment: {
    head: { name: '敘述謊言的帽子', type: 'equippable', slot: 'head', description: '一頂看起來很普通的帽子，但它有個奇特的習慣：它所「說」的話永遠是謊言。問題是，只有穿戴者知道這一點。' },
    companion: { name: '虛張聲勢的幻影', type: 'summon_companion', slot: 'companion', description: '一個飄渺的半透明實體，會鏡像你的行動，製造出一個足以亂真的誘餌或夥伴的幻象。它不提供任何物理援助，卻是聲東擊西的大師。' },
    waist: { name: '內容物未知的腰包', type: 'equippable', slot: 'waist', description: '一個樸實無華的皮製腰包。每當你伸手進去時，似乎總能摸到點什麼，但拿出來的東西卻從來不是你所預期的。' },
    body: null, leftHand: null, rightHand: null, feet: null,
  },
  initialInventory: [
    { name: '閃亮亮但廉價的硬幣', type: 'consumable', description: '一枚閃閃發光的硬幣，看起來價值連城，但任何專家都能看出這只是一塊鍍金的鐵片。非常適合用來製造聲響、轉移注意力，或是在一场注定會輸的賭局中派上用場。' },
    { name: '空白的卷軸', type: 'consumable', description: '一卷乾淨的羊皮紙，上面什麼也沒寫。可以用來記錄任何事情，或是讓別人相信上面寫著他們最渴望（或最恐懼）看到的內容。' },
  ],
  startingPrompt: '你是言靈的操縱者，能用話語塑造現實。你的肉體雖弱，意志卻如鋼鐵。你來到低語地穴並非為了黃金，而是為了一個能磨練你能力的場所，一個現實與異界帷幕稀薄之地。地穴的呢喃不僅是威脅，更是力量的回響，一首你打算親自指揮的交響樂。當石門轟然關上，將你封入黑暗時，你感到的不是戲謔的快感，而是挑戰的興奮。描述你為了測試地穴對你力量的回應，所說出的第一個「真實」。',
  initialBlessings: TRICKSTER_BLESSINGS_ZH_TW,
};
const DARK_MASTER_CLASS_ZH_TW: PlayerClass = {
  id: 'dark_master',
  name: '暗魔獸',
  description: "源自東方奇書的魔獸，在初嚐人肉後覺醒了人類的智慧。如今，作為一頭『暗魔獸』，牠在原始的飢餓與竊來的良知之間掙扎。牠吞噬獵物不僅是為了生存，更是為了吸收其能力與知識，使自身變得更強大，內心也更加矛盾。",
  initialHealth: 40,
  initialLuck: 80,
  initialEquipment: {
    head: { name: '赤紅之鬃', type: 'equippable', slot: 'head', description: "並非外物，而是自身鮮紅如火的鬃毛，堅硬如刺。它能提供些許保護，並在黑暗中發出微光。" },
    body: { name: '破碎的學者長袍', type: 'equippable', slot: 'body', description: "第一個被吞噬的人類的衣物殘骸。紙張與墨水的氣味縈繞不去，是你新獲得的意識一個持續且不安的提醒。" },
    rightHand: { name: '噬魂之爪', type: 'equippable', slot: 'rightHand', description: "這頭野獸的天生武器。它們能撕裂血肉，據說還能吞噬受害者的精華。" },
    feet: { name: '踏影之足', type: 'equippable', slot: 'feet', description: "牠的腳掌天生無聲，讓牠能悄然移動，這是其掠食者本性的殘留。" },
    leftHand: null, waist: null, companion: null,
  },
  initialInventory: [
    { name: '噬者精華', type: 'non-consumable', description: "野獸體內一個旋轉的、飄渺的核心。它承載著被吞噬者的記憶和知識。它以一股悲傷的能量嗡嗡作響。" },
    { name: '模糊的記憶', type: 'consumable', quantity: 1, description: "來自過去受害者的短暫記憶。吞噬它可能會揭示一個被遺忘的秘密或一項有用的技能，但心靈上的反噬是不可預測的。" },
  ],
  startingPrompt: "轉化才剛發生。那個男人的記憶——他的恐懼、他的人生、他的知識——仍在你的體内尖叫。你不再只是野獸。你是……別的東西。低語地穴在呼喚你，不是因為寶藏，而是因為力量和被遺忘精華的氣味。你感到飢餓，不僅是對血肉，也是對答案。當你站在入口前，原始的本能與新生的意識交戰。描述你的第一步，選擇作為野獸，還是作為人？",
  initialBlessings: DARK_MASTER_BLESSINGS_ZH_TW,
};

// --- SIMPLIFIED CHINESE PLAYER CLASSES ---
const KNIGHT_CLASS_ZH_CN: PlayerClass = {
  id: 'knight',
  name: '骑士',
  description: '荣誉与武力的堡垒。骑士以坚固的盔甲和可靠的剑展开他们的旅程，准备好正面迎战任何敌人。',
  initialHealth: 100,
  initialLuck: 60,
  initialEquipment: {
    head: { name: '老旧的头盔', type: 'equippable', slot: 'head', description: '一顶简单但实用的头盔，曾不只一次保护佩戴者免受致命打击。它会阻碍周边视野。' },
    body: { name: '老旧的骑士铠甲', type: 'equippable', slot: 'body', description: '厚重的板甲，上面布满了无数战斗留下的凹痕和疤痕。它以牺牲机动性为代价，提供坚实的保护。' },
    rightHand: { name: '战损短剑', type: 'equippable', slot: 'rightHand', description: '一把见证了无数冲突的可靠刀刃。虽然剑锋有缺口，但其斗志未曾磨损。' },
    companion: { name: '王国守护犬', type: 'summon_companion', slot: 'companion', description: '一只忠诚且受过战斗训练的犬类伙伴。它的感官敏锐，咬合力惊人。' },
    leftHand: { name: '老旧的骑士盾', type: 'equippable', slot: 'leftHand', description: '一面用铁条加固的沉重木盾，上面带有褪色的纹章。它曾抵挡无数次攻击，是韧性的证明。' },
    feet: { name: '吵杂的金属护脚', type: 'equippable', slot: 'feet', description: '坚固但不太合脚的护胫。为小腿提供良好保护，但每走一步都会发出响亮的铿锵声，使潜行成为不可能。' },
    waist: { name: '易燃的火把', type: 'equippable', slot: 'waist', description: '一根用浸油破布包裹的坚固木制火把。能提供光明，但也可能引来不必要的注意。散发着淡淡的松木与绝望的气味。' },
  },
  initialInventory: [
    { name: '国王的密令', type: 'non-consumable', description: '一封盖有皇家蜡印的卷轴。其内容仅限你亲阅，详述了一项极其重要的任务。' },
    { name: '治疗药膏', type: 'consumable', quantity: 1, description: '一种厚实的草药膏，涂抹在伤口上可以促进快速愈合。' }
  ],
  startingPrompt: '身披钢铁，曾立下古老誓言，你站在长满青苔的低语地穴入口前。一股比夜色更冷的寒气从石拱门中渗出，带来微弱而难以辨识的呢喃。国王的密令在你袋中沉甸甸的，提醒着你必须铲除那侵蚀土地的黑暗。这不仅是寻宝，而是一项严峻的职责。描述眼前的景象，以及你对抗那逼近的恐惧所采取的第一个坚决行动。',
  initialBlessings: KNIGHT_BLESSINGS_ZH_CN,
};
const ROGUE_CLASS_ZH_CN: PlayerClass = {
  id: 'rogue',
  name: '盗贼',
  description: '暗影与诡计的大师。盗贼依靠智慧和敏捷，偏好从黑暗中发动攻击，并在敌人反应过来前消失无踪。',
  initialHealth: 30,
  initialLuck: 90,
  initialEquipment: {
    head: { name: '盗贼头巾', type: 'equippable', slot: 'head', description: '一顶能将脸部隐藏在阴影中的深色头巾，非常适合保持隐蔽。' },
    body: { name: '布甲', type: 'equippable', slot: 'body', description: '一套深色的多层织物，保护性极低，但能让穿著者无声、流畅地移动。' },
    rightHand: { name: '生锈匕首', type: 'equippable', slot: 'rightHand', description: '一把布满坑洞和腐蚀的刀刃，但其锋利程度仍足以进行一次无声的偷袭。' },
    feet: { name: '软底鞋', type: 'equippable', slot: 'feet', description: '专为在石地上消音而设计的轻便鞋履。' },
    companion: { name: '暗月夜枭', type: 'summon_companion', slot: 'companion', description: '一只拥有智慧到令人不安的双眼的夜行性猛禽。它能看见他人在黑暗中所忽略的事物。' },
    leftHand: null, waist: null,
  },
  initialInventory: [
    { name: '烟雾弹', type: 'consumable', quantity: 1, description: '一个小巧的陶土球，击碎时会释放出一团浓厚的、令人迷失方向的烟雾。' },
    { name: '开锁器', type: 'consumable', description: '一根细长的金属丝，是绕过简易锁具的必备品。它看起来很脆弱，可能只能使用一次。' }
  ],
  startingPrompt: '你是潜影无踪的暗影行者。在无月之夜的掩护下，你循着一件稀世珍宝的传闻来到低语地穴。厚重的石门微敞，像是一道通往窒息黑暗的无声邀请。一阵冷风带来尘埃与金属的气味，宛如陈旧的血迹。这里是你的领域。描述你如何溜进去，拥抱那等待着你的、清晰可感的危险。',
  initialBlessings: ROGUE_BLESSINGS_ZH_CN,
};
const SCHOLAR_CLASS_ZH_CN: PlayerClass = {
  id: 'scholar',
  name: '学者',
  description: '被遗忘知识与奥术秘密的探求者。学者运用智慧克服障碍，将古老的学问作为强大的武器。',
  initialHealth: 70,
  initialLuck: 75,
  initialEquipment: {
    head: { name: '单片眼镜', type: 'equippable', slot: 'head', description: '一片由精细研磨水晶制成的镜片，能揭示肉眼看不见的细节。' },
    body: { name: '学者长袍', type: 'equippable', slot: 'body', description: '飘逸的长袍，上面绣有能提供微弱魔法能量保护的奥术符文。' },
    rightHand: { name: '枯枝法杖', type: 'equippable', slot: 'rightHand', description: '一根扭曲的古老木杖，散发着潜在的魔法力量。触感异常温暖。' },
    companion: { name: '元素精灵', type: 'summon_companion', slot: 'companion', description: '一团闪烁的纯粹能量微粒，在空中飞舞，会被魔法源所吸引。' },
    leftHand: null, feet: null, waist: null,
  },
  initialInventory: [
    { name: '古老的神秘法典', type: 'non-consumable', description: '一本用奇特皮革装订的厚重典籍，里面充满了神秘的知识和禁忌的仪式。' },
    { name: '法力药水', type: 'consumable', quantity: 1, description: '一种旋转发光的蓝色液体，能短暂地让你的魔法能力超载，使你的下一个法术变得异常强大。' }
  ],
  startingPrompt: '在对失落知识的渴求驱使下，你的研究将你引至低语地穴，一个据说藏有远古强大时代秘密的地点。你手持旧杖，站在入口处。空气中充满着潜在的能量，在你的皮肤上噼啪作响，宛如一曲由被遗忘的力量谱写的危险交响乐。这里不仅是坟墓，更是一座禁忌的图书馆。描述你在不祥的寂静中，试图揭开的第一个被遗忘的秘密。',
  initialBlessings: SCHOLAR_BLESSINGS_ZH_CN,
};
const TRICKSTER_CLASS_ZH_CN: PlayerClass = {
  id: 'trickster',
  name: '欺诈师',
  description: '一名肉体脆弱但思想狡诈的言灵使用者。他们将现实视为画布，用言语编织真实与谎言，智取远比自身强大的敌人。这是一条以智取胜、亦正亦邪的道路。',
  initialHealth: 1,
  initialLuck: 100,
  initialEquipment: {
    head: { name: '叙述谎言的帽子', type: 'equippable', slot: 'head', description: '一顶看起来很普通的帽子，但它有个奇特的习惯：它所「说」的话永远是谎言。问题是，只有穿戴者知道这一点。' },
    companion: { name: '虚张声势的幻影', type: 'summon_companion', slot: 'companion', description: '一个飘渺的半透明实体，会镜像你的行动，制造出一个足以乱真的诱饵或伙伴的幻象。它不提供任何物理援助，却是声东击西的大师。' },
    waist: { name: '内容物未知的腰包', type: 'equippable', slot: 'waist', description: '一个朴实无华的皮制腰包。每当你伸手进去时，似乎总能摸到点什么，但拿出来的东西却从来不是你所预期的。' },
    body: null, leftHand: null, rightHand: null, feet: null,
  },
  initialInventory: [
    { name: '闪亮亮但廉价的硬币', type: 'consumable', description: '一枚闪闪发光的硬币，看起来价值连城，但任何专家都能看出这只是一块镀金的铁片。非常适合用来制造声响、转移注意力，或是在一场注定会输的赌局中派上用场。' },
    { name: '空白的卷轴', type: 'consumable', description: '一卷干净的羊皮纸，上面什么也没写。可以用來记录任何事情，或是让别人相信上面写着他们最渴望（或最恐惧）看到的内容。' },
  ],
  startingPrompt: '你是言灵的操纵者，能用话语塑造现实。你的肉体虽弱，意志却如钢铁。你来到低语地穴并非为了黄金，而是为了一个能磨练你能力的场所，一个现实与异界帷幕稀薄之地。地穴的呢喃不仅是威胁，更是力量的回响，一首你打算亲自指挥的交响乐。当石门轰然关上，将你封入黑暗时，你感到的不是戏谑的快感，而是挑战的兴奋。描述你为了测试地穴对你力量的回应，所说出的第一个「真实」。',
  initialBlessings: TRICKSTER_BLESSINGS_ZH_CN,
};
const DARK_MASTER_CLASS_ZH_CN: PlayerClass = {
  id: 'dark_master',
  name: '暗魔兽',
  description: "源自东方奇书的魔兽，在初尝人肉后觉醒了人类的智慧。如今，作为一头‘暗魔兽’，它在原始的饥饿与窃来的良知之间挣扎。它吞噬猎物不仅是为了生存，更是为了吸收其能力与知识，使自身变得更强大，内心也更加矛盾。",
  initialHealth: 40,
  initialLuck: 80,
  initialEquipment: {
    head: { name: '赤红之鬃', type: 'equippable', slot: 'head', description: "并非外物，而是自身鲜红如火的鬃毛，坚硬如刺。它能提供些许保护，并在黑暗中发出微光。" },
    body: { name: '破碎的学者长袍', type: 'equippable', slot: 'body', description: "第一个被吞噬的人类的衣物残骸。纸张与墨水的​​气味萦绕不去，是你新获得的意识一个持续且不安的提醒。" },
    rightHand: { name: '噬魂之爪', type: 'equippable', slot: 'rightHand', description: "这头野兽的天生武器。它们能撕裂血肉，据说还能吞噬受害者的精华。" },
    feet: { name: '踏影之足', type: 'equippable', slot: 'feet', description: "它的脚掌天生无声，让它能悄然移动，这是其掠食者本性的残留。" },
    leftHand: null, waist: null, companion: null,
  },
  initialInventory: [
    { name: '噬者精华', type: 'non-consumable', description: "野兽体内一个旋转的、飘渺的核心。它承载着被吞噬者的记忆和知识。它以一股悲伤的能量嗡嗡作响。" },
    { name: '模糊的记忆', type: 'consumable', quantity: 1, description: "来自过去受害者的短暂记忆。吞噬它可能会揭示一个被遗忘的秘密或一项有用的技能，但心灵上的反噬是不可预测的。" },
  ],
  startingPrompt: "转化才刚发生。那个男人的记忆——他的恐惧、他的人生、他的知识——仍在你的体内尖叫。你不再只是野兽。你是……别的东西。低语地穴在呼唤你，不是因为宝藏，而是因为力量和被遗忘精华的气味。你感到饥饿，不仅是对血肉，也是对答案。当你站在入口前，原始的本能与新生的意识交战。描述你的第一步，选择作为野兽，还是作为人？",
  initialBlessings: DARK_MASTER_BLESSINGS_ZH_CN,
};


// --- JAPANESE PLAYER CLASSES ---
const KNIGHT_CLASS_JA: PlayerClass = {
  id: 'knight',
  name: 'ナイト',
  description: '名誉と武勇の砦。騎士は頑丈な鎧と信頼できる剣で旅を始め、どんな敵にも真っ向から立ち向かう準備ができています。',
  initialHealth: 100,
  initialLuck: 60,
  initialEquipment: {
    head: { name: '古い兜', type: 'equippable', slot: 'head', description: 'シンプルで機能的な兜。着用者を一度ならず致命的な一撃から守ってきた。周辺視野を妨げる。' },
    body: { name: '古い騎士の鎧', type: 'equippable', slot: 'body', description: '重厚なプレートアーマーで、数え切れないほどの戦闘でへこみや傷がついている。機動性を犠牲にして、相当な保護を提供する。' },
    rightHand: { name: '使い古されたショートソード', type: 'equippable', slot: 'rightHand', description: '数々の戦いを経てきた信頼できる刃。刃は欠けているが、その精神は折れていない。' },
    companion: { name: '王家の守護犬', type: 'summon_companion', slot: 'companion', description: '忠実で戦闘訓練を受けた犬の仲間。感覚は鋭く、その噛みつきは獰猛だ。' },
    leftHand: { name: '古い騎士の盾', type: 'equippable', slot: 'leftHand', description: '鉄で補強された重い木製の盾で、色あせた紋章が描かれている。数え切れないほどの攻撃を弾き、回復力の証となっている。' },
    feet: { name: '騒々しい金属のすね当て', type: 'equippable', slot: 'feet', description: '頑丈だがフィット感の悪いすね当て。すねをしっかり保護するが、一歩ごとに大きな音を立てるため、隠密行動は不可能だ。' },
    waist: { name: '燃えやすい松明', type: 'equippable', slot: 'waist', description: '油を染み込ませたぼろ布を巻いた頑丈な木製の松明。光を供給するが、望まない注目を集める可能性もある。松と絶望のかすかな匂いがする。' },
  },
  initialInventory: [
    { name: '王の密令', type: 'non-consumable', description: '王家の紋章が入った封印された巻物。その内容は、重大な任務の詳細が記されており、あなただけが見ることができる。' },
    { name: '治癒の軟膏', type: 'consumable', quantity: 1, description: '傷に塗ると急速な治癒を促進する、濃厚なハーブのペースト。' }
  ],
  startingPrompt: '鉄に身を包み、古の誓いを立てたあなたは、苔むした囁きの地下聖堂の入り口に立つ。夜気よりも冷たい不穏な冷気が石のアーチから染み出し、かすかで解読不能な囁きを運んでくる。王の密令がポーチの中で重く感じられ、あなたが打ち破らなければならない迫り来る闇をはっきりと思い出させる。これは単なる宝探しではなく、厳しい義務なのだ。目の前の光景と、迫り来る恐怖に対してあなたが取る最初の断固たる行動を説明せよ。',
  initialBlessings: KNIGHT_BLESSINGS_JA,
};
const ROGUE_CLASS_JA: PlayerClass = {
  id: 'rogue',
  name: '盗賊',
  description: '影と策略の達人。盗賊は機知と敏捷性を頼りにし、闇から攻撃を仕掛け、敵が反応する前に姿を消すことを好む。',
  initialHealth: 30,
  initialLuck: 90,
  initialEquipment: {
    head: { name: '盗賊の頭巾', type: 'equippable', slot: 'head', description: '顔を影で隠す深い頭巾で、姿を隠すのに最適だ。' },
    body: { name: '布の鎧', type: 'equippable', slot: 'body', description: '最小限の保護しか提供しないが、静かで流れるような動きを可能にする、暗い色の重ね着の布。' },
    rightHand: { name: '錆びた短剣', type: 'equippable', slot: 'rightHand', description: '穴だらけで腐食した刃だが、その切れ味はまだ静かな一撃には十分だ。' },
    feet: { name: '柔らかい底の靴', type: 'equippable', slot: 'feet', description: '石の床での足音を消すために設計された軽量の履物。' },
    companion: { name: '暗月のフクロウ', type: 'summon_companion', slot: 'companion', description: '不気味なほど知的な目を持つ夜行性の猛禽類。暗闇の中で他の者が見逃すものを見ることができる。' },
    leftHand: null, waist: null,
  },
  initialInventory: [
    { name: '煙玉', type: 'consumable', quantity: 1, description: '割れると方向感覚を失わせる濃い煙を放出する小さな粘土の球。' },
    { name: '鍵開け', type: 'consumable', description: '簡単な錠前を迂回するために不可欠な細い金属片。壊れやすく、一度しか使えないかもしれない。' }
  ],
  startingPrompt: 'あなたは姿を見せない影だ。月明かりのない夜の闇に紛れて、あなたは貴重なアーティファクトの噂に引かれて囁きの地下聖堂に到着した。重い石の扉はわずかに開いており、息詰まるような暗闇への静かな誘いだ。冷たい隙間風が、古い血のような埃と金属の匂いを運んでくる。ここはあなたの領域だ。待ち受ける明白な危険を受け入れながら、どのように中に忍び込むかを説明せよ。',
  initialBlessings: ROGUE_BLESSINGS_JA,
};
const SCHOLAR_CLASS_JA: PlayerClass = {
  id: 'scholar',
  name: '学者',
  description: '忘れ去られた知識と秘術の秘密の探求者。学者は知性を使って障害を克服し、古代の伝承を強力な武器として振るう。',
  initialHealth: 70,
  initialLuck: 75,
  initialEquipment: {
    head: { name: '片眼鏡', type: 'equippable', slot: 'head', description: '肉眼では見えない細部を明らかにする、細かく研磨された水晶のレンズ。' },
    body: { name: '学者のローブ', type: 'equippable', slot: 'body', description: '魔法のエネルギーに対するわずかな保護を提供する秘術のシンボルが刺繍された流れるようなローブ。' },
    rightHand: { name: '枯れ枝の杖', type: 'equippable', slot: 'rightHand', description: '潜在的な魔法の力でうなる、ねじれた古代の木片。触れると奇妙に暖かい。' },
    companion: { name: 'エレメンタル・スプライト', type: 'summon_companion', slot: 'companion', description: '魔法の源に引き寄せられて空中を飛び交う、純粋なエネルギーのきらめく微粒子。' },
    leftHand: null, feet: null, waist: null,
  },
  initialInventory: [
    { name: '古代の秘術の法典', type: 'non-consumable', description: '奇妙な革で装丁された重い書物で、謎めいた伝承と禁じられた儀式が満載だ。' },
    { name: 'マナポーション', type: 'consumable', quantity: 1, description: '渦巻く発光する青い液体で、一時的に魔法能力を過充電させ、次の呪文を信じられないほど強力にする。' }
  ],
  startingPrompt: '失われた知識への渇望に駆られ、あなたの研究は、過ぎ去った強力な時代の秘密を保持していると噂される場所、囁きの地下聖堂へとあなたを導いた。あなたは古い杖を手に、入り口に立つ。空気そのものが、あなたの肌で感じることができる潜在的なエネルギーでパチパチと音を立てており、忘れ去られた力の危険な交響曲だ。この場所は単なる墓ではなく、禁断の図書館なのだ。不吉な沈黙の中で、あなたが最初に明らかにしようとする忘れ去られた秘密を説明せよ。',
  initialBlessings: SCHOLAR_BLESSINGS_JA,
};
const TRICKSTER_CLASS_JA: PlayerClass = {
  id: 'trickster',
  name: 'トリックスター',
  description: '肉体は脆弱だが狡猾な「言霊」の使い手。現実は彼らが話す真実と巧みに作られた嘘のキャンバスであり、自分よりはるかに強い敵を出し抜く。彼らの道は力よりも知恵であり、善と悪の微妙な境界線を歩む。',
  initialHealth: 1,
  initialLuck: 100,
  initialEquipment: {
    head: { name: '嘘を語る帽子', type: 'equippable', slot: 'head', description: '一見普通の帽子だが、奇妙な癖がある。それが「話す」言葉は常に嘘なのだ。問題は、それを知っているのが着用者だけであることだ。' },
    companion: { name: '虚勢の幻影', type: 'summon_companion', slot: 'companion', description: 'あなたの行動を映し出し、説得力のある陽動やパートナーの幻影を作り出す、 ethereal で半透明な存在。物理的な助けは提供しないが、陽動作戦の達人だ。' },
    waist: { name: '中身のわからないポーチ', type: 'equippable', slot: 'waist', description: 'シンプルな革のポーチ。中に手を入れると、いつも何かが感じられるが、取り出すものは決して期待したものではない。' },
    body: null, leftHand: null, rightHand: null, feet: null,
  },
  initialInventory: [
    { name: '光るが安いコイン', type: 'consumable', description: 'きらきらと輝くコインで、非常に価値があるように見えるが、専門家なら誰でもそれがただの金メッキの鉄片だとわかる。注意を引いたり、負ける運命にある賭けに参加したりするのに最適だ。' },
    { name: '白紙の巻物', type: 'consumable', description: '何も書かれていないきれいな羊皮紙の巻物。何かを記録したり、他の人にそれが最も望む（または恐れる）ものが含まれていると信じさせたりするために使用できる。' },
  ],
  startingPrompt: 'あなたは言霊の使い手であり、言葉で現実を形作る力を持っている。あなたの体は弱いが、意志は鉄だ。あなたは金のためではなく、世界の間のベールが薄い場所であなたの能力を鍛えるために囁きの地下聖堂に来た。地下聖堂の囁きは単なる脅威ではなく、力の響きであり、あなたが指揮するつもりの交響曲だ。石の扉が閉まり、あなたを暗闇に閉じ込めると、あなたは娯楽のスリルではなく、挑戦のスリルを感じる。地下聖堂のあなたの力への反応を試すために、あなたが最初に存在させた「真実」を説明せよ。',
  initialBlessings: TRICKSTER_BLESSINGS_JA,
};
const DARK_MASTER_CLASS_JA: PlayerClass = {
  id: 'dark_master',
  name: '暗魔獣',
  description: "古代東方の書物から現れた魔獣。初めて人を食らったことで人の知性に目覚めた。今や『暗魔獣』として、原始的な飢えと盗んだ良心との間で葛藤している。獲物を食らうのは生存のためだけでなく、その能力と知識を吸収し、より強力で、より葛藤を深める存在となるためである。",
  initialHealth: 40,
  initialLuck: 80,
  initialEquipment: {
    head: { name: 'クリムゾンメイン', type: 'equippable', slot: 'head', description: "アイテムではなく、獣自身の燃えるような赤い毛皮で、剛毛のように硬い。多少の防御となり、暗闇でかすかに光る。" },
    body: { name: 'ぼろぼろの学者のローブ', type: 'equippable', slot: 'body', description: "最初に食らった人間の衣服のなれの果て。紙とインクの残り香が、新たに得た意識を絶えず不安にさせる。" },
    rightHand: { name: '貪欲な爪', type: 'equippable', slot: 'rightHand', description: "この獣が生まれ持った武器。肉を引き裂き、犠牲者の本質そのものを消費すると言われている。" },
    feet: { name: '影踏みの足', type: 'equippable', slot: 'feet', description: "その足は生まれつき音を立てず、捕食者としての性質の名残として、音もなく移動することができる。" },
    leftHand: null, waist: null, companion: null,
  },
  initialInventory: [
    { name: '消費されし者のエッセンス', type: 'non-consumable', description: "獣の体内に渦巻く、霊妙な核。それは喰らった者たちの記憶と知識を保持している。悲しげなエネルギーでうなっている。" },
    { name: 'かすかな記憶', type: 'consumable', quantity: 1, description: "過去の犠牲者からのかすかな記憶。これを消費すると、忘れられた秘密や有用なスキルが明らかになるかもしれないが、精神的な反動は予測不可能だ。" },
  ],
  startingPrompt: "変容は最近のことだ。その男の記憶—彼の恐怖、彼の人生、彼の知識—がまだ君の中で叫んでいる。君はもはやただの獣ではない。君は…何か別のものだ。囁きの地下聖堂が君を呼んでいる。宝の約束ではなく、力と忘れられたエッセンスの匂いで。君は飢えている、肉体だけでなく、答えにも。君は何者なのか？入り口に立つと、原始的な本能と新たに芽生えた意識が戦う。最初の一歩を、獣として踏み出すか、人として踏み出すか、描写せよ。",
  initialBlessings: DARK_MASTER_BLESSINGS_JA,
};

// --- SPANISH PLAYER CLASSES ---
const KNIGHT_CLASS_ES: PlayerClass = {
  id: 'knight',
  name: 'Caballero',
  description: 'Un bastión de honor y proeza marcial. Los caballeros comienzan su viaje con una armadura robusta y una espada confiable, listos para enfrentar a cualquier enemigo de frente.',
  initialHealth: 100,
  initialLuck: 60,
  initialEquipment: {
    head: { name: 'Yelmo Viejo', type: 'equippable', slot: 'head', description: 'Un casco simple y funcional que ha protegido a su portador de más de un golpe fatídico. Obstruye la visión periférica.' },
    body: { name: 'Armadura de Caballero Vieja', type: 'equippable', slot: 'body', description: 'Armadura de placas pesada, abollada y marcada por innumerables batallas. Ofrece una protección sustancial a costa de la movilidad.' },
    rightHand: { name: 'Espada Corta Desgastada', type: 'equippable', slot: 'rightHand', description: 'Una hoja confiable que ha visto su parte de conflicto. Su filo está mellado, pero su espíritu está intacto.' },
    companion: { name: 'Sabueso Guardián Real', type: 'summon_companion', slot: 'companion', description: 'Un compañero canino leal y entrenado para la batalla. Sus sentidos son agudos y su mordida es feroz.' },
    leftHand: { name: 'Escudo de Caballero Viejo', type: 'equippable', slot: 'leftHand', description: 'Un pesado escudo de madera con bandas de hierro, que lleva un escudo de armas desvaído. Ha desviado innumerables golpes y es un testimonio de resiliencia.' },
    feet: { name: 'Grebas de Metal Ruidosas', type: 'equippable', slot: 'feet', description: 'Grebas robustas pero mal ajustadas. Ofrecen buena protección para las espinillas pero resuenan ruidosamente con cada paso, haciendo imposible el sigilo.' },
    waist: { name: 'Antorcha Inflamable', type: 'equippable', slot: 'waist', description: 'Una robusta antorcha de madera envuelta en harapos empapados de aceite. Proporciona luz, pero podría atraer atención no deseada. Huele vagamente a pino y desesperación.' },
  },
  initialInventory: [
    { name: 'Orden Secreta del Rey', type: 'non-consumable', description: 'Un pergamino sellado con el escudo real. Su contenido es solo para tus ojos, detallando una misión de grave importancia.' },
    { name: 'Ungüento Curativo', type: 'consumable', quantity: 1, description: 'Una pasta espesa y herbal que se puede aplicar a las heridas para promover una curación rápida.' }
  ],
  startingPrompt: 'Vestido de hierro y juramentado a un antiguo pacto, te encuentras ante la boca cubierta de musgo de la Cripta Susurrante. Un escalofrío inquietante, más frío que el aire de la noche, se filtra desde el arco de piedra, trayendo consigo susurros débiles e indescifrables. La orden secreta de tu Rey se siente pesada en tu bolsa, un crudo recordatorio de la oscuridad invasora que debes vencer. Esto es más que una búsqueda del tesoro; es un deber sombrío. Describe la escena y tu primera acción resuelta contra el pavor que se acerca.',
  initialBlessings: KNIGHT_BLESSINGS_ES,
};
const ROGUE_CLASS_ES: PlayerClass = {
  id: 'rogue',
  name: 'Pícaro',
  description: 'Un maestro de las sombras y la sutileza. Los pícaros confían en el ingenio y la agilidad, prefiriendo atacar desde la oscuridad y desaparecer antes de que el enemigo pueda reaccionar.',
  initialHealth: 30,
  initialLuck: 90,
  initialEquipment: {
    head: { name: 'Capucha de Pícaro', type: 'equippable', slot: 'head', description: 'Una capucha profunda que oculta el rostro en la sombra, perfecta para pasar desapercibido.' },
    body: { name: 'Armadura de Tela', type: 'equippable', slot: 'body', description: 'Un conjunto de telas oscuras y en capas que ofrecen una protección mínima pero permiten un movimiento silencioso y fluido.' },
    rightHand: { name: 'Daga Oxidada', type: 'equippable', slot: 'rightHand', description: 'Una hoja picada y corroída, pero su filo todavía es lo suficientemente afilado para un derribo silencioso.' },
    feet: { name: 'Zapatos de Suela Blanda', type: 'equippable', slot: 'feet', description: 'Calzado ligero diseñado para amortiguar los pasos en suelos de piedra.' },
    companion: { name: 'Búho de la Luna Oscura', type: 'summon_companion', slot: 'companion', description: 'Un ave de presa nocturna con ojos inquietantemente inteligentes. Ve lo que otros no ven en la oscuridad.' },
    leftHand: null, waist: null,
  },
  initialInventory: [
    { name: 'Bomba de Humo', type: 'consumable', quantity: 1, description: 'Una pequeña esfera de arcilla que libera una espesa nube de humo desorientador al romperse.' },
    { name: 'Ganzúa', type: 'consumable', description: 'Una delgada pieza de metal, esencial para sortear cerraduras simples. Parece frágil y podría funcionar solo una vez.' }
  ],
  startingPrompt: 'Eres una sombra que se mueve sin ser vista. Bajo el manto de una noche sin luna, llegas a la Cripta Susurrante, atraído por los rumores de un artefacto de valor incalculable. La pesada puerta de piedra está ligeramente entreabierta, una invitación silenciosa a una oscuridad sofocante. Una corriente de aire frío trae el olor a polvo y algo metálico, como sangre vieja. Este es tu elemento. Describe cómo te deslizas dentro, abrazando el peligro palpable que te espera.',
  initialBlessings: ROGUE_BLESSINGS_ES,
};
const SCHOLAR_CLASS_ES: PlayerClass = {
  id: 'scholar',
  name: 'Erudito',
  description: 'Un buscador de conocimiento olvidado y secretos arcanos. El Erudito utiliza el intelecto para superar obstáculos, blandiendo la antigua sabiduría como un arma potente.',
  initialHealth: 70,
  initialLuck: 75,
  initialEquipment: {
    head: { name: 'Monóculo', type: 'equippable', slot: 'head', description: 'Una lente de cristal finamente molido que revela detalles invisibles a simple vista.' },
    body: { name: 'Túnica de Erudito', type: 'equippable', slot: 'body', description: 'Túnicas fluidas bordadas con símbolos arcanos que ofrecen una protección menor contra las energías mágicas.' },
    rightHand: { name: 'Bastón de Rama Marchita', type: 'equippable', slot: 'rightHand', description: 'Un trozo retorcido de madera antigua que zumba con un poder mágico latente. Se siente extrañamente cálido al tacto.' },
    companion: { name: 'Duendecillo Elemental', type: 'summon_companion', slot: 'companion', description: 'Una mota parpadeante de energía pura que se lanza por el aire, atraída por las fuentes de magia.' },
    leftHand: null, feet: null, waist: null,
  },
  initialInventory: [
    { name: 'Códice Arcano Antiguo', type: 'non-consumable', description: 'Un pesado tomo encuadernado en un cuero extraño, lleno de saber críptico y rituales prohibidos.' },
    { name: 'Poción de Maná', type: 'consumable', quantity: 1, description: 'Un líquido azul luminoso y arremolinado que sobrecarga temporalmente tus habilidades mágicas, haciendo que tu próximo hechizo sea increíblemente potente.' }
  ],
  startingPrompt: 'Impulsado por la sed de conocimiento perdido, tu investigación te ha llevado a la Cripta Susurrante, un lugar que se rumorea que guarda secretos de una era pasada y poderosa. Te encuentras en la entrada, con tu viejo bastón en la mano. El aire mismo crepita con una energía latente que puedes sentir en tu piel, una peligrosa sinfonía de poder olvidado. Este lugar no es simplemente una tumba; es una biblioteca de lo prohibido. Describe el primer secreto olvidado que buscas desvelar en medio del ominoso silencio.',
  initialBlessings: SCHOLAR_BLESSINGS_ES,
};
const TRICKSTER_CLASS_ES: PlayerClass = {
  id: 'trickster',
  name: 'Embaucador',
  description: 'Un individuo frágil pero astuto que empuña el poder del "Kotodama", el espíritu de las palabras. Tratan la realidad como un lienzo para sus verdades habladas y mentiras bien elaboradas, superando a enemigos mucho más fuertes que ellos. Su camino es el del ingenio sobre la fuerza, caminando por una delgada línea entre el bien y el mal.',
  initialHealth: 1,
  initialLuck: 100,
  initialEquipment: {
    head: { name: 'Sombrero de Mentiras Narradas', type: 'equippable', slot: 'head', description: 'Un sombrero aparentemente ordinario con un hábito peculiar: las "palabras" que dice son siempre mentiras. El truco es que solo el portador lo sabe.' },
    companion: { name: 'Fantasma Fanfarrón', type: 'summon_companion', slot: 'companion', description: 'Una entidad etérea y translúcida que refleja tus acciones, creando una distracción convincente o la ilusión de un compañero. No ofrece ayuda física pero es un maestro del despiste.' },
    waist: { name: 'Bolsa de Contenido Desconocido', type: 'equippable', slot: 'waist', description: 'Una simple bolsa de cuero. Cada vez que metes la mano, parece que sientes algo, pero lo que sacas nunca es lo que esperas.' },
    body: null, leftHand: null, rightHand: null, feet: null,
  },
  initialInventory: [
    { name: 'Moneda Brillante pero Barata', type: 'consumable', description: 'Una moneda reluciente que parece no tener precio, pero cualquier experto puede ver que es solo un trozo de hierro dorado. Perfecta para crear una distracción o participar en una apuesta que estás destinado a perder.' },
    { name: 'Pergamino en Blanco', type: 'consumable', description: 'Un rollo limpio de pergamino sin nada escrito. Se puede usar para registrar cualquier cosa, o para hacer creer a otros que contiene lo que más desean (o temen) ver.' },
  ],
  startingPrompt: 'Eres un portador del Kotodama, el poder de dar forma a la realidad con palabras. Tu cuerpo es frágil, pero tu voluntad es de hierro. Has venido a la Cripta Susurrante no por oro, sino para templar tus habilidades en un lugar donde el velo entre los mundos es delgado. Los susurros de la cripta no son solo amenazas; son ecos de poder, una sinfonía que pretendes dirigir. Mientras la puerta de piedra se cierra, sellándote en la oscuridad, sientes una emoción no de diversión, sino de desafío. Describe la primera "verdad" que hablas para que exista y así probar la respuesta de la cripta a tu poder.',
  initialBlessings: TRICKSTER_BLESSINGS_ES,
};
const DARK_MASTER_CLASS_ES: PlayerClass = {
  id: 'dark_master',
  name: 'Maestro Oscuro',
  description: "Una bestia demoníaca de una saga antigua, despertó a un intelecto humano tras su primera probada de hombre. Ahora, como un 'Maestro Oscuro', lucha entre un hambre primigenia y una conciencia robada. Devora a sus víctimas no solo por sustento, sino para asimilar sus mismas habilidades y conocimiento, volviéndose cada vez más poderoso y conflictivo.",
  initialHealth: 40,
  initialLuck: 80,
  initialEquipment: {
    head: { name: 'Melena Carmesí', type: 'equippable', slot: 'head', description: "No es un objeto, sino el propio pelaje rojo fuego de la bestia, rígido como cerdas. Ofrece algo de protección y brilla débilmente en la oscuridad." },
    body: { name: 'Túnica de Erudito Andrajosa', type: 'equippable', slot: 'body', description: "Los restos andrajosos de su primera comida humana. El persistente olor a papel y tinta es un recordatorio constante e inquietante de su nueva conciencia." },
    rightHand: { name: 'Garras Voraces', type: 'equippable', slot: 'rightHand', description: "Las armas naturales de la bestia. Pueden desgarrar la carne y, se dice, consumir la esencia misma de sus víctimas." },
    feet: { name: 'Zarpas de Sombra', type: 'equippable', slot: 'feet', description: "Sus patas son naturalmente silenciosas, lo que le permite moverse sin hacer ruido, un remanente de su naturaleza depredadora." },
    leftHand: null, waist: null, companion: null,
  },
  initialInventory: [
    { name: 'Esencia de lo Consumido', type: 'non-consumable', description: "Un núcleo etéreo y arremolinado dentro de la bestia. Contiene los recuerdos y el conocimiento de aquellos a quienes ha devorado. Zumba con una energía triste." },
    { name: 'Recuerdo Vago', type: 'consumable', quantity: 1, description: "Un recuerdo fugaz de una víctima pasada. Consumirlo podría revelar un secreto olvidado o una habilidad útil, pero la reacción psíquica es impredecible." },
  ],
  startingPrompt: "La transformación fue reciente. Los recuerdos del hombre —su miedo, su vida, su conocimiento— todavía gritan dentro de ti. Ya no eres solo una bestia. Eres... otra cosa. La Cripta Susurrante te llama, no con promesas de tesoros, sino con el aroma del poder y las esencias olvidadas. Tienes hambre, no solo de carne, sino de respuestas. ¿Qué eres? Mientras estás de pie ante la entrada, un instinto primario lucha con una conciencia recién descubierta. Describe tu primer paso, ¿bestia u hombre?",
  initialBlessings: DARK_MASTER_BLESSINGS_ES,
};

// --- KOREAN PLAYER CLASSES ---
const KNIGHT_CLASS_KO: PlayerClass = {
  id: 'knight',
  name: '기사',
  description: '명예와 무예의 보루. 기사는 튼튼한 갑옷과 신뢰할 수 있는 검으로 여정을 시작하며, 어떤 적이라도 정면으로 맞설 준비가 되어 있습니다.',
  initialHealth: 100,
  initialLuck: 60,
  initialEquipment: {
    head: { name: '오래된 투구', type: 'equippable', slot: 'head', description: '단순하지만 기능적인 투구로, 착용자를 여러 번의 치명적인 공격으로부터 보호했습니다. 주변 시야를 방해합니다.' },
    body: { name: '오래된 기사의 갑옷', type: 'equippable', slot: 'body', description: '수많은 전투로 찌그러지고 긁힌 무거운 판금 갑옷. 기동성을 희생하여 상당한 보호 기능을 제공합니다.' },
    rightHand: { name: '전투로 닳은 단검', type: 'equippable', slot: 'rightHand', description: '수많은 갈등을 겪은 믿음직한 칼날. 날이 부서졌지만 그 정신은 꺾이지 않았습니다.' },
    companion: { name: '왕실 수호견', type: 'summon_companion', slot: 'companion', description: '충성스럽고 전투 훈련을 받은 개 동반자. 감각은 날카롭고 무는 힘은 맹렬합니다.' },
    leftHand: { name: '오래된 기사의 방패', type: 'equippable', slot: 'leftHand', description: '빛바랜 문장이 새겨진 철로 보강된 무거운 나무 방패. 수많은 공격을 막아냈으며 회복력의 증거입니다.' },
    feet: { name: '시끄러운 금속 각반', type: 'equippable', slot: 'feet', description: '튼튼하지만 잘 맞지 않는 각반. 정강이를 잘 보호하지만 걸을 때마다 큰 소리가 나서 은신이 불가능합니다.' },
    waist: { name: '인화성 횃불', type: 'equippable', slot: 'waist', description: '기름에 적신 헝겊으로 감싼 튼튼한 나무 횃불. 빛을 제공하지만 원치 않는 주의를 끌 수 있습니다. 소나무와 절망의 희미한 냄새가 납니다.' },
  },
  initialInventory: [
    { name: '왕의 비밀 명령', type: 'non-consumable', description: '왕실 문장이 찍힌 봉인된 두루마리. 그 내용은 중대한 임무에 대해 자세히 설명되어 있으며 당신만 볼 수 있습니다.' },
    { name: '치유 연고', type: 'consumable', quantity: 1, description: '상처에 바르면 빠른 치유를 촉진하는 진한 허브 연고.' }
  ],
  startingPrompt: '철갑을 두르고 고대의 맹세를 한 당신은 이끼로 뒤덮인 속삭이는 지하실 입구에 서 있습니다. 밤공기보다 더 차가운 불안한 한기가 돌 아치에서 스며 나와 희미하고 알아들을 수 없는 속삭임을 전합니다. 당신의 주머니에 있는 왕의 비밀 명령은 당신이 물리쳐야 할 다가오는 어둠을 상기시키며 무겁게 느껴집니다. 이것은 단순한 보물 찾기가 아니라 엄중한 의무입니다. 장면과 다가오는 공포에 맞서는 당신의 첫 번째 단호한 행동을 묘사하십시오.',
  initialBlessings: KNIGHT_BLESSINGS_KO,
};
const ROGUE_CLASS_KO: PlayerClass = {
  id: 'rogue',
  name: '도적',
  description: '그림자와 교묘함의 대가. 도적은 재치와 민첩성에 의존하여 어둠 속에서 공격하고 적이 반응하기 전에 사라지는 것을 선호합니다.',
  initialHealth: 30,
  initialLuck: 90,
  initialEquipment: {
    head: { name: '도적의 두건', type: 'equippable', slot: 'head', description: '얼굴을 그림자 속에 가려 모습을 감추기에 완벽한 깊은 두건.' },
    body: { name: '천 갑옷', type: 'equippable', slot: 'body', description: '최소한의 보호만 제공하지만 조용하고 유연한 움직임을 가능하게 하는 어두운 색의 여러 겹으로 된 천 세트.' },
    rightHand: { name: '녹슨 단검', type: 'equippable', slot: 'rightHand', description: '구멍이 나고 부식된 칼날이지만, 그 날은 여전히 조용한 처치에 충분히 날카롭습니다.' },
    feet: { name: '부드러운 밑창 신발', type: 'equippable', slot: 'feet', description: '돌 바닥에서 발소리를 줄이기 위해 설계된 가벼운 신발.' },
    companion: { name: '어두운 달 올빼미', type: 'summon_companion', slot: 'companion', description: '불안할 정도로 지적인 눈을 가진 야행성 맹금류. 다른 사람들이 어둠 속에서 놓치는 것을 봅니다.' },
    leftHand: null, waist: null,
  },
  initialInventory: [
    { name: '연막탄', type: 'consumable', quantity: 1, description: '깨지면 방향 감각을 잃게 하는 짙은 연기 구름을 방출하는 작은 점토 구슬.' },
    { name: '자물쇠 따개', type: 'consumable', description: '간단한 자물쇠를 우회하는 데 필수적인 가느다란 금속 조각. 부서지기 쉬워 보이며 한 번만 작동할 수 있습니다.' }
  ],
  startingPrompt: '당신은 보이지 않게 움직이는 그림자입니다. 달 없는 밤의 장막 아래, 당신은 값비싼 유물의 소문에 이끌려 속삭이는 지하실에 도착합니다. 무거운 돌문이 약간 열려 있어 숨 막히는 어둠 속으로 조용한 초대를 보냅니다. 차가운 바람이 먼지와 오래된 피 같은 금속 냄새를 실어옵니다. 이곳은 당신의 영역입니다. 당신을 기다리는 명백한 위험을 받아들이며 안으로 어떻게 숨어드는지 묘사하십시오.',
  initialBlessings: ROGUE_BLESSINGS_KO,
};
const SCHOLAR_CLASS_KO: PlayerClass = {
  id: 'scholar',
  name: '학자',
  description: '잊혀진 지식과 비전의 비밀을 찾는 자. 학자는 지성을 사용하여 장애물을 극복하고 고대의 지식을 강력한 무기로 사용합니다.',
  initialHealth: 70,
  initialLuck: 75,
  initialEquipment: {
    head: { name: '단안경', type: 'equippable', slot: 'head', description: '육안으로는 보이지 않는 세부 사항을 드러내는 정교하게 연마된 수정 렌즈.' },
    body: { name: '학자의 로브', type: 'equippable', slot: 'body', description: '마법 에너지에 대한 약간의 보호를 제공하는 비전의 상징이 수놓아진 흐르는 로브.' },
    rightHand: { name: '마른 가지 지팡이', type: 'equippable', slot: 'rightHand', description: '잠재적인 마법의 힘으로 윙윙거리는 뒤틀린 고대 나무 조각. 만지면 이상하게 따뜻합니다.' },
    companion: { name: '원소 정령', type: 'summon_companion', slot: 'companion', description: '마법의 원천에 이끌려 공중을 날아다니는 순수한 에너지의 깜박이는 작은 조각.' },
    leftHand: null, feet: null, waist: null,
  },
  initialInventory: [
    { name: '고대 비전의 법전', type: 'non-consumable', description: '신비한 지식과 금지된 의식으로 가득 찬 이상한 가죽으로 묶인 무거운 책.' },
    { name: '마나 물약', type: 'consumable', quantity: 1, description: '일시적으로 마법 능력을 과충전시켜 다음 주문을 믿을 수 없을 정도로 강력하게 만드는 소용돌이치는 빛나는 파란색 액체.' }
  ],
  startingPrompt: '잃어버린 지식에 대한 갈증에 이끌려, 당신의 연구는 당신을 지나간 강력한 시대의 비밀을 간직하고 있다고 소문난 속삭이는 지하실로 이끌었습니다. 당신은 낡은 지팡이를 손에 들고 입구에 서 있습니다. 공기 자체가 당신의 피부에서 느낄 수 있는 잠재적인 에너지로 탁탁 튀며, 잊혀진 힘의 위험한 교향곡입니다. 이 장소는 단순한 무덤이 아니라 금지된 것들의 도서관입니다. 불길한 침묵 속에서 당신이 밝히려는 첫 번째 잊혀진 비밀을 묘사하십시오.',
  initialBlessings: SCHOLAR_BLESSINGS_KO,
};
const TRICKSTER_CLASS_KO: PlayerClass = {
  id: 'trickster',
  name: '사기꾼',
  description: '육체는 허약하지만 교활한 "코토다마"(말의 영혼)의 힘을 휘두르는 개인. 그들은 현실을 그들이 말하는 진실과 잘 만들어진 거짓말의 캔버스로 취급하며, 자신보다 훨씬 강한 적들을 속입니다. 그들의 길은 힘보다 재치이며, 선과 악의 미세한 경계를 걷습니다.',
  initialHealth: 1,
  initialLuck: 100,
  initialEquipment: {
    head: { name: '거짓을 서술하는 모자', type: 'equippable', slot: 'head', description: '평범해 보이지만 특이한 습관을 가진 모자: 그것이 "말하는" 말은 항상 거짓말입니다. 문제는 착용자만 이것을 안다는 것입니다.' },
    companion: { name: '허세 부리는 환영', type: 'summon_companion', slot: 'companion', description: '당신의 행동을 비추어 설득력 있는 기만이나 파트너의 환상을 만들어내는 영묘하고 반투명한 존재. 물리적인 도움은 제공하지 않지만 오도의 대가입니다.' },
    waist: { name: '내용물을 알 수 없는 주머니', type: 'equippable', slot: 'waist', description: '간단한 가죽 주머니. 안에 손을 넣을 때마다 무언가 느껴지는 것 같지만, 꺼내는 것은 결코 기대했던 것이 아닙니다.' },
    body: null, leftHand: null, rightHand: null, feet: null,
  },
  initialInventory: [
    { name: '반짝이지만 값싼 동전', type: 'consumable', description: '반짝이는 동전은 값비싸 보이지만, 전문가라면 누구나 그것이 단지 금도금된 철 조각이라는 것을 알 수 있습니다. 주의를 끌거나 운명적으로 질 수밖에 없는 내기에 참여하는 데 완벽합니다.' },
    { name: '빈 두루마리', type: 'consumable', description: '아무것도 쓰여 있지 않은 깨끗한 양피지 두루마리. 무엇이든 기록하거나, 다른 사람들이 가장 원하는 (또는 두려워하는) 것이 포함되어 있다고 믿게 만드는 데 사용할 수 있습니다.' },
  ],
  startingPrompt: '당신은 말로 현실을 만드는 힘인 코토다마의 사용자입니다. 당신의 몸은 허약하지만 의지는 철입니다. 당신은 금을 위해 속삭이는 지하실에 온 것이 아니라, 세계 사이의 장막이 얇은 곳에서 당신의 능력을 단련하기 위해 왔습니다. 지하실의 속삭임은 단순한 위협이 아니라, 당신이 지휘하려는 교향곡인 힘의 메아리입니다. 돌문이 닫히고 당신을 어둠 속에 가두자, 당신은 즐거움의 스릴이 아니라 도전의 스릴을 느낍니다. 당신의 힘에 대한 지하실의 반응을 시험하기 위해 당신이 존재하게 한 첫 번째 "진실"을 묘사하십시오.',
  initialBlessings: TRICKSTER_BLESSINGS_KO,
};
const DARK_MASTER_CLASS_KO: PlayerClass = {
  id: 'dark_master',
  name: '암흑 마수',
  description: "고대 동방의 기록에 등장하는 마수. 처음으로 사람을 맛본 후 인간의 지성에 눈을 떴다. 이제 '암흑 마수'로서 원시적인 굶주림과 훔친 양심 사이에서 갈등한다. 희생자를 삼키는 것은 생존을 위해서만이 아니라, 그들의 능력과 지식을 흡수하여 더욱 강력해지고, 내면의 갈등은 더욱 깊어지기 위함이다.",
  initialHealth: 40,
  initialLuck: 80,
  initialEquipment: {
    head: { name: '진홍 갈기', type: 'equippable', slot: 'head', description: "물건이 아니라, 짐승 자신의 불타는 듯한 붉은 털로, 뻣뻣한 강모와 같습니다. 약간의 보호를 제공하며 어둠 속에서 희미하게 빛납니다." },
    body: { name: '찢어진 학자의 로브', type: 'equippable', slot: 'body', description: "첫 번째 인간 식사의 찢어진 유물. 남아있는 종이와 잉크 냄새는 새로 얻은 의식에 대한 끊임없고 불안한 상기물입니다." },
    rightHand: { name: '탐식의 발톱', type: 'equippable', slot: 'rightHand', description: "이 짐승의 타고난 무기. 살을 찢을 수 있으며, 희생자의 정수 자체를 소비한다고 전해집니다." },
    feet: { name: '그림자를 밟는 발', type: 'equippable', slot: 'feet', description: "그 발은 본래 소리가 나지 않아, 포식자로서의 본성의 잔재로 소리 없이 움직일 수 있습니다." },
    leftHand: null, waist: null, companion: null,
  },
  initialInventory: [
    { name: '포식당한 자의 정수', type: 'non-consumable', description: "짐승 안에 소용돌이치는 영묘한 핵. 그것은 삼켜진 자들의 기억과 지식을 담고 있습니다. 슬픈 에너지로 윙윙거립니다." },
    { name: '희미한 기억', type: 'consumable', quantity: 1, description: "과거 희생자의 스쳐 지나가는 기억. 그것을 소비하면 잊혀진 비밀이나 유용한 기술이 드러날 수 있지만, 정신적 반동은 예측할 수 없습니다." },
  ],
  startingPrompt: "변화는 최근에 일어났습니다. 그 남자의 기억들—그의 두려움, 그의 삶, 그의 지식—이 여전히 당신 안에서 비명을 지르고 있습니다. 당신은 더 이상 단순한 짐승이 아닙니다. 당신은... 다른 무언가입니다. 속삭이는 지하실이 당신을 부릅니다. 보물의 약속이 아니라, 힘과 잊혀진 정수의 냄새로. 당신은 굶주려 있습니다. 살점뿐만 아니라, 해답에도. 당신은 누구입니까? 입구 앞에 서자, 원초적 본능이 새로 발견된 의식과 싸웁니다. 당신의 첫 걸음을 묘사하십시오. 짐승으로, 아니면 인간으로?",
  initialBlessings: DARK_MASTER_BLESSINGS_KO,
};

// --- LANGUAGE MAPPING ---

const t = (language: Language, key: string): string => {
    const translations: Record<string, Record<Language, string>> = {
        // Start Screen
        adventureTitle: { 'zh-TW': '無盡的冒險：低語地穴', 'zh-CN': '无尽的冒险：低语地穴', 'en': 'Endless Adventure: The Whispering Crypt', 'ja': '無限の冒険：囁きの地下聖堂', 'es': 'Aventura Interminable: La Cripta Susurrante', 'ko': '끝없는 모험: 속삭이는 지하실' },
        adventureSubtitle: { 'zh-TW': 'AI 驅動的文字角色扮演遊戲', 'zh-CN': 'AI 驱动的文字角色扮演游戏', 'en': 'An AI-Powered Text RPG', 'ja': 'AI駆動のテキストRPG', 'es': 'Un RPG de Texto Impulsado por IA', 'ko': 'AI 기반 텍스트 RPG' },
        introText: { 'zh-TW': '一款由 Ai 驅動的動態文字冒險遊戲。你的每一個動作都会塑造一個獨特的故事和畫面，創造出可無限重玩的奇幻任務。', 'zh-CN': '一款由 Ai 驱动的动态文字冒险游戏。你的每一个动作都会塑造一个独特的故事和画面，创造出可無限重玩的奇幻任务。', 'en': 'A dynamic text-based adventure game powered by AI. Every action you take shapes a unique story and visuals, creating an infinitely replayable fantasy quest.', 'ja': 'AIによって駆動されるダイナミックなテキストベースのアドベンチャーゲーム。あなたの一つ一つの行動がユニークな物語とビジュアルを形作り、無限にリプレイ可能なファンタジーの探求を創り出します。', 'es': 'Un dinámico juego de aventuras basado en texto impulsado por IA. Cada acción que tomas da forma a una historia y visuales únicos, creando una misión de fantasía infinitamente rejugable.', 'ko': 'AI에 의해 구동되는 동적인 텍스트 기반 어드벤처 게임. 당신이 취하는 모든 행동은 독특한 이야기와 시각 자료를 형성하여 무한히 다시 플레이할 수 있는 판타지 퀘스트를 만듭니다.' },
        enableNarration: { 'zh-TW': '啟用旁白', 'zh-CN': '启用旁白', 'en': 'Enable Narration', 'ja': 'ナレーションを有効にする', 'es': 'Activar Narración', 'ko': '내레이션 활성화' },
        voiceSpeed: { 'zh-TW': '語音速度', 'zh-CN': '语音速度', 'en': 'Voice Speed', 'ja': '読み上げ速度', 'es': 'Velocidad de Voz', 'ko': '음성 속도' },
        selectVoice: { 'zh-TW': '選擇聲音', 'zh-CN': '选择声音', 'en': 'Select Voice', 'ja': '声を選択', 'es': 'Seleccionar Voz', 'ko': '음성 선택' },
        browserDefault: { 'zh-TW': '瀏覽器預設', 'zh-CN': '浏览器预设', 'en': 'Browser Default', 'ja': 'ブラウザのデフォルト', 'es': 'Predeterminado del Navegador', 'ko': '브라우저 기본값' },
        testVoice: { 'zh-TW': '測試聲音', 'zh-CN': '测试声音', 'en': 'Test Voice', 'ja': 'テスト再生', 'es': 'Probar Voz', 'ko': '음성 테스트' },
        testVoiceText: { 'zh-TW': '你好，冒險者。', 'zh-CN': '你好，冒险者。', 'en': 'Hello, adventurer.', 'ja': 'こんにちは、冒険者よ。', 'es': 'Hola, aventurero.', 'ko': '안녕하세요, 모험가님.' },
        startAdventure: { 'zh-TW': '開始冒險', 'zh-CN': '开始冒险', 'en': 'Start Adventure', 'ja': '冒険を始める', 'es': 'Comenzar Aventura', 'ko': '모험 시작' },
        loadGame: { 'zh-TW': '讀取遊戲', 'zh-CN': '读取游戏', 'en': 'Load Game', 'ja': 'ゲームをロード', 'es': 'Cargar Juego', 'ko': '게임 불러오기' },
        loadError: { 'zh-TW': '讀取存檔失敗。檔案格式可能不正確。', 'zh-CN': '读取存档失败。档案格式可能不正确。', 'en': 'Failed to load save file. The file format may be incorrect.', 'ja': 'セーブファイルの読み込みに失敗しました。ファイル形式が正しくない可能性があります。', 'es': 'Error al cargar el archivo de guardado. El formato del archivo puede ser incorrecto.', 'ko': '저장 파일을 불러오지 못했습니다. 파일 형식이 올바르지 않을 수 있습니다.' },
        // Character Creation
        chooseOrigin: { 'zh-TW': '選擇你的出身', 'zh-CN': '选择你的出身', 'en': 'Choose Your Origin', 'ja': '出自を選択', 'es': 'Elige Tu Origen', 'ko': '당신의 기원을 선택하세요' },
        originDescription: { 'zh-TW': '你的選擇將決定你的初始能力、裝備，以及你在這個世界中的起點。', 'zh-CN': '你的选择将决定你的初始能力、装备，以及你在这个世界中的起点。', 'en': 'Your choice will determine your starting abilities, equipment, and your place in this world.', 'ja': 'あなたの選択が、初期能力、装備、そしてこの世界でのあなたの立ち位置を決定します。', 'es': 'Tu elección determinará tus habilidades iniciales, equipo y tu lugar en este mundo.', 'ko': '당신의 선택이 당신의 시작 능력, 장비, 그리고 이 세계에서의 당신의 위치를 결정할 것입니다.' },
        chooseGender: { 'zh-TW': '選擇性別', 'zh-CN': '选择性别', 'en': 'Choose Gender', 'ja': '性別を選択', 'es': 'Elegir Género', 'ko': '성별 선택' },
        male: { 'zh-TW': '男性', 'zh-CN': '男性', 'en': 'Male', 'ja': '男性', 'es': 'Masculino', 'ko': '남성' },
        female: { 'zh-TW': '女性', 'zh-CN': '女性', 'en': 'Female', 'ja': '女性', 'es': 'Femenino', 'ko': '여성' },
        startingEquipment: { 'zh-TW': '初始裝備', 'zh-CN': '初始装备', 'en': 'Starting Kit', 'ja': '初期装備', 'es': 'Equipo Inicial', 'ko': '시작 장비' },
        embarkJourney: { 'zh-TW': '踏上旅程', 'zh-CN': '踏上旅程', 'en': 'Embark on Your Journey', 'ja': '旅に出る', 'es': 'Emprende Tu Viaje', 'ko': '여정을 시작하세요' },
        // Game Screen
        buildingWorld: { 'zh-TW': '正在構築世界...', 'zh-CN': '正在构筑世界...', 'en': 'Building the world...', 'ja': '世界を構築中...', 'es': 'Construyendo el mundo...', 'ko': '세계를 구축하는 중...' },
        waitingForFate: { 'zh-TW': '等待命運的回應...', 'zh-CN': '等待命运的回应...', 'en': 'Awaiting fate\'s reply...', 'ja': '運命の返事を待っています...', 'es': 'Esperando la respuesta del destino...', 'ko': '운명의 답장을 기다리는 중...' },
        whatToDo: { 'zh-TW': '你該怎麼做？', 'zh-CN': '你该怎么做？', 'en': 'What do you do?', 'ja': 'どうしますか？', 'es': '¿Qué haces?', 'ko': '어떻게 하시겠습니까?' },
        thinkingOfUse: { 'zh-TW': '正在思考用法…', 'zh-CN': '正在思考用法…', 'en': 'Thinking of a use...', 'ja': '使い方を考え中...', 'es': 'Pensando en un uso...', 'ko': '사용법 생각 중...' },
        submit: { 'zh-TW': '執行', 'zh-CN': '执行', 'en': 'Submit', 'ja': '実行', 'es': 'Enviar', 'ko': '제출' },
        saveGame: { 'zh-TW': '儲存進度', 'zh-CN': '保存进度', 'en': 'Save Game', 'ja': 'ゲームを保存', 'es': 'Guardar Juego', 'ko': '게임 저장' },
        generateIllustration: { 'zh-TW': '生成場景繪圖', 'zh-CN': '生成场景绘图', 'en': 'Generate Illustration', 'ja': 'シーンのイラストを生成', 'es': 'Generar Ilustración', 'ko': '장면 삽화 생성' },
        generatingIllustration: { 'zh-TW': '正在生成繪圖...', 'zh-CN': '正在生成绘图...', 'en': 'Generating illustration...', 'ja': 'イラストを生成中...', 'es': 'Generando ilustración...', 'ko': '삽화를 생성하는 중...' },
        illustrationPromptStyle: { 'zh-TW': '史詩奇幻、黑暗、細膩的數位繪畫風格，', 'zh-CN': '史诗奇幻、黑暗、细腻的数位绘画风格，', 'en': 'Epic fantasy, dark, detailed digital painting of', 'ja': 'エピックファンタジー、ダーク、詳細なデジタルペインティングの', 'es': 'Pintura digital épica de fantasía, oscura y detallada de', 'ko': '서사 판타지, 어둡고 상세한 디지털 페인팅 스타일,' },
        illustrationError: { 'zh-TW': '空靈的迷霧拒絕形成影像。', 'zh-CN': '空灵的迷雾拒绝形成影像。', 'en': 'The ethereal mists refuse to form an image.', 'ja': '霊妙な霧が像を結ぶことを拒否しました。', 'es': 'Las nieblas etéreas se niegan a formar una imagen.', 'ko': '미묘한 안개가 형상을 만들기를 거부합니다.' },
        illustrationPromptNegative: { 'zh-TW': '圖片中不應包含任何可讀的文字、標題或對話。作為環境一部分的古老符文或魔法符號是允許的。', 'zh-CN': '图片中不应包含任何可读的文字、标题或对话。作为环境一部分的古老符文或魔法符号是允许的。', 'en': 'The image must not contain any legible text, titles, or dialogue. Ancient runes or magical symbols that are part of the environment are acceptable.', 'ja': '画像には、判読可能なテキスト、タイトル、対話を含めないでください。環境の一部である古代のルーン文字や魔法のシンボルは許容されます。', 'es': 'La imagen no debe contener texto legible, títulos ni diálogos. Se aceptan runas antiguas o símbolos mágicos que formen parte del entorno.', 'ko': '이미지에는 읽을 수 있는 텍스트, 제목 또는 대화가 포함되어서는 안 됩니다. 환경의 일부인 고대 룬이나 마법 기호는 허용됩니다.' },
        gameClearedButton: { 'zh-TW': '你已通關', 'zh-CN': '你已通关', 'en': 'You Have Cleared the Game', 'ja': 'ゲームをクリアしました', 'es': 'Has Completado el Juego', 'ko': '게임을 클리어했습니다' },
        // Player Stats
        health: { 'zh-TW': '生命', 'zh-CN': '生命', 'en': 'Health', 'ja': '体力', 'es': 'Salud', 'ko': '체력' },
        luck: { 'zh-TW': '幸運', 'zh-CN': '幸运', 'en': 'Luck', 'ja': '幸運', 'es': 'Suerte', 'ko': '행운' },
        inventory: { 'zh-TW': '物品欄', 'zh-CN': '物品栏', 'en': 'Inventory', 'ja': '所持品', 'es': 'Inventario', 'ko': '인벤토리' },
        yourPocketsAreEmpty: { 'zh-TW': '你的口袋空空如也。', 'zh-CN': '你的口袋空空如也。', 'en': 'Your pockets are empty.', 'ja': 'ポケットは空です。', 'es': 'Tus bolsillos están vacíos.', 'ko': '주머니가 비어 있습니다.' },
        blessings: { 'zh-TW': '祝福', 'zh-CN': '祝福', 'en': 'Blessings', 'ja': '祝福', 'es': 'Bendiciones', 'ko': '축복' },
        itemDescription: { 'zh-TW': '物品描述', 'zh-CN': '物品描述', 'en': 'Item Description', 'ja': 'アイテムの説明', 'es': 'Descripción del Objeto', 'ko': '아이템 설명' },
        blessingDescription: { 'zh-TW': '祝福效果', 'zh-CN': '祝福效果', 'en': 'Blessing Effect', 'ja': '祝福の効果', 'es': 'Efecto de Bendición', 'ko': '축복 효과' },
        slot_head: { 'zh-TW': '頭部', 'zh-CN': '头部', 'en': 'Head', 'ja': '頭', 'es': 'Cabeza', 'ko': '머리' },
        slot_body: { 'zh-TW': '身體', 'zh-CN': '身体', 'en': 'Body', 'ja': '体', 'es': 'Cuerpo', 'ko': '몸' },
        slot_leftHand: { 'zh-TW': '左手', 'zh-CN': '左手', 'en': 'Left Hand', 'ja': '左手', 'es': 'Mano Izquierda', 'ko': '왼손' },
        slot_rightHand: { 'zh-TW': '右手', 'zh-CN': '右手', 'en': 'Right Hand', 'ja': '右手', 'es': 'Mano Derecha', 'ko': '오른손' },
        slot_feet: { 'zh-TW': '腳部', 'zh-CN': '脚部', 'en': 'Feet', 'ja': '足', 'es': 'Pies', 'ko': '발' },
        slot_waist: { 'zh-TW': '腰部', 'zh-CN': '腰部', 'en': 'Waist', 'ja': '腰', 'es': 'Cintura', 'ko': '허리' },
        slot_companion: { 'zh-TW': '夥伴', 'zh-CN': '伙伴', 'en': 'Companion', 'ja': '相棒', 'es': 'Compañero', 'ko': '동료' },
        // Game Over Screen
        victoryTitle: { 'zh-TW': '勝利', 'zh-CN': '胜利', 'en': 'VICTORY', 'ja': '勝利', 'es': 'VICTORIA', 'ko': '승리' },
        defeatTitle: { 'zh-TW': '你已殞命', 'zh-CN': '你已殒命', 'en': 'YOU HAVE PERISHED', 'ja': 'あなたは死亡しました', 'es': 'HAS PERECIDO', 'ko': '당신은 사망했습니다' },
        victoryText: { 'zh-TW': '你的傳說將在時間的長廊中迴響。你已成功解鎖了「詐欺師」職業。', 'zh-CN': '你的传说将在时间的长廊中回响。你已成功解锁了「欺诈师」职业。', 'en': 'Your legend will echo through the ages. You have unlocked the Trickster class.', 'ja': 'あなたの伝説は時代を超えて語り継がれるでしょう。トリックスタークラスをアンロックしました。', 'es': 'Tu leyenda resonará a través de los siglos. Has desbloqueado la clase Embaucador.', 'ko': '당신의 전설은 시대를 거쳐 울려 퍼질 것입니다. 트릭스터 클래스를 잠금 해제했습니다.' },
        defeatText: { 'zh-TW': '你的旅程在此劃下句點，但死亡只是另一個開始。', 'zh-CN': '你的旅程在此划下句点，但死亡只是另一个开始。', 'en': 'Your journey ends here, but death is just another beginning.', 'ja': 'あなたの旅はここで終わりますが、死は新たな始まりに過ぎません。', 'es': 'Tu viaje termina aquí, pero la muerte es solo otro comienzo.', 'ko': '당신의 여정은 여기서 끝나지만, 죽음은 또 다른 시작일 뿐입니다.' },
        playAgain: { 'zh-TW': '再玩一次', 'zh-CN': '再玩一次', 'en': 'Play Again', 'ja': 'もう一度プレイ', 'es': 'Jugar de Nuevo', 'ko': '다시 플레이' },
        downloadAdventure: { 'zh-TW': '下載冒險紀錄', 'zh-CN': '下载冒险纪录', 'en': 'Download Adventure', 'ja': '冒険の記録をダウンロード', 'es': 'Descargar Aventura', 'ko': '모험 기록 다운로드' },
    };
    return translations[key][language] || translations[key]['en'];
};


const ALL_PLAYER_CLASSES: Record<Language, PlayerClass[]> = {
  'en': [KNIGHT_CLASS_EN, ROGUE_CLASS_EN, SCHOLAR_CLASS_EN],
  'zh-TW': [KNIGHT_CLASS_ZH_TW, ROGUE_CLASS_ZH_TW, SCHOLAR_CLASS_ZH_TW],
  'zh-CN': [KNIGHT_CLASS_ZH_CN, ROGUE_CLASS_ZH_CN, SCHOLAR_CLASS_ZH_CN],
  'ja': [KNIGHT_CLASS_JA, ROGUE_CLASS_JA, SCHOLAR_CLASS_JA],
  'es': [KNIGHT_CLASS_ES, ROGUE_CLASS_ES, SCHOLAR_CLASS_ES],
  'ko': [KNIGHT_CLASS_KO, ROGUE_CLASS_KO, SCHOLAR_CLASS_KO],
};

const TRICKSTER_CLASS: Record<Language, PlayerClass> = {
    'en': TRICKSTER_CLASS_EN,
    'zh-TW': TRICKSTER_CLASS_ZH_TW,
    'zh-CN': TRICKSTER_CLASS_ZH_CN,
    'ja': TRICKSTER_CLASS_JA,
    'es': TRICKSTER_CLASS_ES,
    'ko': TRICKSTER_CLASS_KO,
};

const DARK_MASTER_CLASS: Record<Language, PlayerClass> = {
    'en': DARK_MASTER_CLASS_EN,
    'zh-TW': DARK_MASTER_CLASS_ZH_TW,
    'zh-CN': DARK_MASTER_CLASS_ZH_CN,
    'ja': DARK_MASTER_CLASS_JA,
    'es': DARK_MASTER_CLASS_ES,
    'ko': DARK_MASTER_CLASS_KO,
};

export {
  ALL_PLAYER_CLASSES,
  TRICKSTER_CLASS,
  DARK_MASTER_CLASS,
  t,
};