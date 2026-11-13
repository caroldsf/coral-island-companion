const cropIcons: Record<string, string> = {
  potato: '🥔', carrot: '🥕', 'sweet-potato': '🍠', cauliflower: '🥦',
  broccoli: '🥦', lettuce: '🥬', chard: '🥬', 'bok-choy': '🥬',
  cabbage: '🥬', 'red-cabbage': '🥬', cucumber: '🥒', peas: '🫛',
  corn: '🌽', tomato: '🍅', 'hot-pepper': '🌶️', 'bell-pepper': '🫑',
  eggplant: '🍆', garlic: '🧄', onion: '🧅', turnip: '🌱',
  pumpkin: '🎃', melon: '🍈', watermelon: '🍉', pineapple: '🍍',
  strawberry: '🍓', blueberry: '🫐', blackberry: '🫐', grape: '🍇',
  banana: '🍌', mango: '🥭', papaya: '🍈', lemon: '🍋', avocado: '🥑',
  pear: '🍐', peach: '🍑', apple: '🍎', orange: '🍊', olive: '🫒',
  almond: '🌰', 'cocoa-bean': '🍫', 'coffee-bean': '☕', soybean: '🫘',
  sunflower: '🌻', daisy: '🌼', peony: '🌸', poppy: '🌺', tulip: '🌷',
  lily: '💮', iris: '🪻', snowdrop: '🤍', orchid: '🌺', gardenia: '🌼',
  wheat: '🌾', barley: '🌾', rice: '🌾', basil: '🌿', mint: '🌿',
}

const guideIcons: Record<string, string> = {
  'animal-chicken': '🐔', 'animal-cow': '🐄', 'animal-duck': '🦆',
  'animal-sheep': '🐑', 'animal-quail': '🐦', 'animal-goat': '🐐',
  'animal-peafowl': '🦚', 'animal-pig': '🐖', 'animal-luwak': '🐾',
  'animal-llama': '🦙', 'animal-horse': '🐎', 'animal-ostrich': '🐦',
  'animal-buffalo': '🐃', 'animal-mermoo': '🐄', 'animal-carapoultry': '🐚',
  'animal-seashroud': '🪸', 'animal-ink-hog': '🦑', 'animal-shell-cluck': '🐚',
  'tool-axe': '🪓', 'tool-pickaxe': '⛏️', 'tool-fishing-pole': '🎣',
  'tool-bug-net': '🦋', 'tool-watering-can': '💧', 'tool-milk-pail': '🪣',
  'tool-shears': '✂️', 'tool-lumina-wand': '🪄',
  'building-greenhouse': '🪴', 'building-underwater-barn': '🪸',
  'building-farmhouse': '🏡',
}

const categoryIcons: Record<string, string> = {
  recipes: '🍲', utensils: '🍳', tools: '🛠️', animals: '🐾', buildings: '🏠',
}

export function cropIcon(crop: { id: string; kind: string; environment?: string }) {
  return cropIcons[crop.id] ?? (crop.environment === 'ocean' ? '🪸' :
    crop.kind === 'tree' ? '🌳' : crop.kind === 'seedling' ? '🍃' : '🌱')
}

export function guideIcon(guide: { id: string; category: string }) {
  return guideIcons[guide.id] ?? categoryIcons[guide.category] ?? '🌴'
}
