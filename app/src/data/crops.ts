export const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'] as const
export const ranks = ['F', 'E', 'D', 'C', 'B', 'A', 'S'] as const
export type Season = typeof seasons[number]
export type Rank = typeof ranks[number]
export type CropKind = 'crop' | 'seedling' | 'tree'
export type CropCategory = 'Fruta' | 'Vegetal' | 'Flor' | 'Grão' | 'Outros'

export interface Crop {
  id: string
  name: string
  englishName: string
  seasons: readonly Season[]
  rank: Rank
  kind: CropKind
  category: CropCategory
  growthDays: number
  regrowthDays?: number
  seedPrice: number
  sellPrice: number
  yieldPerHarvest: number
  source: string
  spoiler?: boolean
  environment?: 'ocean'
}

const [spring, summer, fall, winter] = seasons
const wiki = 'https://coralisland.wiki/wiki/'

type CropRow = [
  englishName: string, name: string, seasons: Season[], rank: Rank,
  growthDays: number, seedPrice: number, sellPrice: number, regrowthDays?: number,
]

const seedRows: CropRow[] = [
  ['Carrot', 'Cenoura', [spring], 'F', 7, 35, 78],
  ['Cauliflower', 'Couve-flor', [spring], 'F', 10, 70, 175],
  ['Chard', 'Acelga', [spring], 'D', 6, 50, 111],
  ['Cucumber', 'Pepino', [spring], 'E', 9, 25, 41, 3],
  ['Daisy', 'Margarida', [spring], 'F', 4, 15, 40],
  ['Lettuce', 'Alface', [spring], 'D', 5, 20, 47],
  ['Peas', 'Ervilha', [spring], 'D', 11, 45, 59, 4],
  ['Peony', 'Peônia', [spring], 'F', 4, 20, 42],
  ['Poppy', 'Papoula', [spring], 'E', 7, 30, 82],
  ['Potato', 'Batata', [spring], 'F', 5, 25, 75],
  ['Radish', 'Rabanete', [spring, summer], 'E', 6, 60, 119],
  ['Snowdrop', 'Gota-de-neve', [winter, spring], 'C', 12, 45, 125],
  ['Soybean', 'Soja', [spring], 'E', 7, 20, 19, 4],
  ['Strawberry', 'Morango', [spring], 'D', 10, 145, 102, 4],
  ['Sugarcane', 'Cana-de-açúcar', [spring], 'D', 5, 50, 23, 1],
  ['Turnip', 'Nabo', [spring], 'F', 4, 15, 40],
  ['Bell pepper', 'Pimentão', [summer], 'E', 8, 70, 47, 4],
  ['Blackberry', 'Amora', [summer], 'D', 11, 40, 41, 4],
  ['Blueberry', 'Mirtilo', [summer], 'F', 10, 50, 41, 4],
  ['Coffee bean', 'Grão de café', [summer], 'D', 11, 70, 25, 2],
  ['Corn', 'Milho', [summer], 'F', 12, 25, 24, 4],
  ['Gardenia', 'Gardênia', [summer], 'F', 5, 20, 45],
  ['Hot pepper', 'Pimenta', [summer, fall], 'F', 7, 40, 36, 3],
  ['Iris', 'Íris', [summer], 'D', 10, 30, 102],
  ['Lily', 'Lírio', [summer, fall], 'D', 9, 60, 149],
  ['Melon', 'Melão', [summer], 'E', 12, 130, 233],
  ['Okra', 'Quiabo', [summer], 'E', 9, 60, 59, 6],
  ['Pineapple', 'Abacaxi', [summer], 'D', 9, 110, 201],
  ['Red cabbage', 'Repolho-roxo', [summer], 'D', 9, 45, 106],
  ['Rose', 'Rosa', [summer], 'D', 6, 20, 51],
  ['Starfruit', 'Carambola', [summer], 'E', 13, 60, 108],
  ['Sunflower', 'Girassol', [summer], 'F', 8, 20, 70],
  ['Tomato', 'Tomate', [summer], 'E', 10, 25, 34, 4],
  ['Wheat', 'Trigo', [summer], 'F', 5, 15, 33],
  ['Amaranth', 'Amaranto', [fall], 'E', 8, 25, 24, 5],
  ['Artichoke', 'Alcachofra', [fall], 'D', 8, 45, 29, 4],
  ['Barley', 'Cevada', [fall], 'D', 8, 100, 118],
  ['Basil', 'Manjericão', [fall], 'E', 5, 20, 39],
  ['Beet', 'Beterraba', [fall], 'E', 6, 20, 52],
  ['Blue dahlia', 'Dália-azul', [fall], 'D', 4, 50, 80],
  ['Bok choy', 'Bok choy', [fall], 'D', 8, 60, 126],
  ['Cactus', 'Cacto', [fall], 'B', 13, 300, 400],
  ['Cranberry', 'Oxicoco', [fall], 'F', 5, 20, 18, 2],
  ['Eggplant', 'Berinjela', [fall], 'E', 9, 35, 36, 3],
  ['Fairy rose', 'Rosa de fada', [fall], 'C', 8, 135, 171],
  ['Garlic', 'Alho', [fall], 'C', 9, 30, 110],
  ['Grape', 'Uva', [fall], 'D', 9, 150, 73, 6],
  ['Orchid', 'Orquídea', [fall], 'F', 8, 75, 130],
  ['Pumpkin', 'Abóbora', [fall], 'E', 13, 90, 116, 7],
  ['Rice', 'Arroz', [fall], 'F', 9, 15, 46],
  ['Sweet potato', 'Batata-doce', [fall], 'F', 9, 60, 30, 4],
  ['Taro root', 'Raiz de taro', [fall], 'D', 5, 35, 24, 2],
  ['Watermelon', 'Melancia', [fall], 'C', 11, 50, 105],
  ['Cotton', 'Algodão', [winter], 'C', 9, 50, 105],
  ['Tea leaf', 'Folha de chá', [winter], 'C', 11, 25, 68],
]

const seedlingRows: CropRow[] = [
  ['Banana', 'Banana', [spring, summer], 'E', 10, 800, 50, 4],
  ['Plum', 'Ameixa', [spring, summer], 'E', 10, 1350, 68, 4],
  ['Rambutan', 'Rambutã', [spring, summer], 'E', 10, 1350, 73, 4],
  ['Dragonfruit', 'Pitaya', [summer, fall], 'E', 10, 1350, 68, 4],
  ['Jackfruit', 'Jaca', [summer, fall], 'E', 10, 1500, 74, 4],
  ['Papaya', 'Mamão', [summer, fall], 'E', 10, 1350, 68, 4],
  ['Cocoa bean', 'Grão de cacau', [fall, winter], 'C', 10, 1500, 85, 4],
  ['Lemon', 'Limão', [fall, winter], 'C', 10, 1200, 61, 4],
  ['Pear', 'Pera', [fall, winter], 'C', 10, 1350, 68, 4],
  ['Avocado', 'Abacate', [winter, spring], 'C', 10, 1000, 59, 4],
  ['Lychee', 'Lichia', [winter, spring], 'C', 10, 1500, 79, 4],
  ['Snake fruit', 'Salak', [winter, spring], 'C', 10, 1200, 67, 4],
]

const treeRows: CropRow[] = [
  ['Durian', 'Durião', [spring], 'C', 28, 4500, 155, 4],
  ['Orange', 'Laranja', [spring], 'C', 28, 4000, 136, 4],
  ['Mango', 'Manga', [summer], 'C', 28, 4000, 136, 4],
  ['Peach', 'Pêssego', [summer], 'C', 28, 4500, 153, 4],
  ['Apple', 'Maçã', [fall], 'C', 28, 4000, 136, 4],
  ['Olive', 'Azeitona', [fall], 'C', 28, 4000, 113, 4],
  ['Almond', 'Amêndoa', [winter], 'C', 28, 4250, 144, 4],
]

// The underwater farm has its own unlock requirements. These entries use F only
// as a neutral value for the town-rank filter, and the UI labels them separately.
const oceanRows: CropRow[] = [
  ['Bluebell blossom', 'Bluebell blossom', [...seasons], 'F', 10, 75, 135],
  ['Bluecole', 'Bluecole', [...seasons], 'F', 20, 300, 420],
  ['Goldglow', 'Goldglow', [...seasons], 'F', 9, 105, 70, 4],
  ['Helixpur blossom', 'Helixpur blossom', [...seasons], 'F', 5, 55, 91],
  ['Labu', 'Labu', [...seasons], 'F', 13, 70, 100, 6],
  ['Marinethorn blossom', 'Marinethorn blossom', [...seasons], 'F', 8, 75, 125],
  ['Marinip', 'Marinip', [...seasons], 'F', 4, 25, 50],
  ['Petalia', 'Petalia', [...seasons], 'F', 6, 135, 40, 2],
  ['Pink coralcap', 'Pink coralcap', [...seasons], 'F', 14, 55, 65, 4],
  ['Red reefbud', 'Red reefbud', [...seasons], 'F', 9, 70, 41, 3],
  ['Sea spud', 'Sea spud', [...seasons], 'F', 10, 85, 154],
  ['Soka', 'Soka', [...seasons], 'F', 11, 105, 53, 3],
  ['Spring sealeaf', 'Spring sealeaf', [...seasons], 'F', 8, 80, 140],
  ['Sproutfruit', 'Sproutfruit', [...seasons], 'F', 6, 45, 83],
  ['Twinshade sealeaf', 'Twinshade sealeaf', [...seasons], 'F', 6, 115, 157],
]

// Categorias culinárias/práticas para leitura rápida no catálogo, não classificação botânica.
const fruitNames = new Set(['Strawberry','Blackberry','Blueberry','Melon','Pineapple','Starfruit','Cranberry','Grape','Watermelon','Banana','Plum','Rambutan','Dragonfruit','Jackfruit','Papaya','Lemon','Pear','Avocado','Lychee','Snake fruit','Durian','Orange','Mango','Peach','Apple','Olive'])
const flowerNames = new Set(['Daisy','Peony','Poppy','Snowdrop','Gardenia','Iris','Lily','Rose','Sunflower','Blue dahlia','Cactus','Fairy rose','Orchid','Bluebell blossom','Helixpur blossom','Marinethorn blossom'])
const grainNames = new Set(['Corn','Wheat','Rice','Barley','Coffee bean','Cocoa bean','Soybean','Amaranth','Tea leaf'])
const otherNames = new Set(['Cotton','Sugarcane','Almond'])
export function cropCategory(englishName: string): CropCategory {
  if (fruitNames.has(englishName)) return 'Fruta'
  if (flowerNames.has(englishName)) return 'Flor'
  if (grainNames.has(englishName)) return 'Grão'
  if (otherNames.has(englishName)) return 'Outros'
  return 'Vegetal'
}

function toCrops(rows: CropRow[], kind: CropKind, yieldPerHarvest: number): Crop[] {
  return rows.map(([englishName, name, growingSeasons, rank, growthDays, seedPrice, sellPrice, regrowthDays]) => ({
    id: englishName.toLowerCase().replaceAll(' ', '-'),
    name,
    englishName,
    seasons: growingSeasons,
    rank,
    kind,
    category: cropCategory(englishName),
    growthDays,
    seedPrice,
    sellPrice,
    regrowthDays,
    yieldPerHarvest,
    source: wiki + englishName.replaceAll(' ', '_'),
  }))
}

export const crops: Crop[] = [
  ...toCrops(seedRows, 'crop', 1),
  ...toCrops(seedlingRows, 'seedling', 2),
  ...toCrops(treeRows, 'tree', 3),
  ...toCrops(oceanRows, 'crop', 1).map(crop => ({
    ...crop,
    source: wiki + 'Crop#Ocean_crops',
    environment: 'ocean' as const,
    spoiler: true,
  })),
].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))

function searchKey(value: string): string {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
}

export function filterCrops(catalog: readonly Crop[], options: {
  seasons?: readonly Season[]
  rank?: Rank
  showSpoilers?: boolean
  query?: string
  kind?: CropKind
} = {}): Crop[] {
  const terms = searchKey(options.query ?? '').split(/\s+/)
  const rankLimit = options.rank === undefined ? ranks.length : ranks.indexOf(options.rank)
  return catalog.filter(crop => (
    (!crop.spoiler || options.showSpoilers) &&
    ranks.indexOf(crop.rank) <= rankLimit &&
    (!options.kind || crop.kind === options.kind) &&
    (options.seasons ?? []).every(season => crop.seasons.includes(season)) &&
    terms.every(term => searchKey(`${crop.name} ${crop.englishName}`).includes(term))
  ))
}

interface CropPlan {
  season: Season
  day: number
  plots: number
  replant: boolean
  mature?: boolean
  end?: 'season' | 'cycle'
}

interface HarvestDate {
  season: Season
  day: number
  yearOffset: number
}

export interface CropProjection {
  harvests: number
  calendar: HarvestDate[]
  units: number
  seedCount: number
  cost: number
  revenue: number
  profit: number
}

const seasonLength = 28
const yearLength = seasons.length * seasonLength

function seasonOf(absoluteDay: number): Season {
  return seasons[Math.floor(absoluteDay / seasonLength) % seasons.length]!
}

export function calculateCrop(crop: Crop, plan: CropPlan): CropProjection | null {
  const seasonIndex = seasons.indexOf(plan.season)
  if (
    crop.environment === 'ocean' ||
    seasonIndex < 0 || !Number.isInteger(plan.day) || plan.day < 1 || plan.day > seasonLength ||
    !Number.isSafeInteger(plan.plots) || plan.plots < 1 ||
    (crop.kind !== 'tree' && !crop.seasons.includes(plan.season))
  ) return null

  const start = seasonIndex * seasonLength + plan.day - 1
  const seasonEnd = (seasonIndex + 1) * seasonLength - 1
  const end = plan.end === 'season' ? seasonEnd : start + yearLength - 1
  const dates: number[] = []
  let seedsPerPlot = 1

  if (crop.kind === 'tree') {
    // An established tree starts each fruiting season with a fresh regrowth interval.
    const matureAt = plan.mature ? start - seasonLength : start + crop.growthDays
    const interval = crop.regrowthDays!
    seedsPerPlot = plan.mature ? 0 : 1
    for (let seasonStart = seasonIndex * seasonLength; seasonStart <= end; seasonStart += seasonLength) {
      if (!crop.seasons.includes(seasonOf(seasonStart))) continue
      const first = Math.max(seasonStart, matureAt) + interval
      const last = Math.min(seasonStart + seasonLength - 1, end)
      for (let date = first; date <= last; date += interval) {
        if (date >= start) dates.push(date)
      }
    }
  } else {
    // Outdoor plants carry growth across consecutive supported seasons and then wither.
    let last = seasonEnd
    while (last < end && crop.seasons.includes(seasonOf(last + 1))) last += seasonLength
    last = Math.min(last, end)
    const repeatEvery = crop.regrowthDays ?? (plan.replant ? crop.growthDays : 0)
    for (let date = start + crop.growthDays; date <= last; date += repeatEvery) {
      dates.push(date)
      if (!repeatEvery) break
    }
    if (!crop.regrowthDays && plan.replant) seedsPerPlot = Math.max(1, dates.length)
  }

  const units = dates.length * crop.yieldPerHarvest * plan.plots
  const seedCount = seedsPerPlot * plan.plots
  const cost = seedCount * crop.seedPrice
  const revenue = units * crop.sellPrice
  if (!Number.isSafeInteger(cost) || !Number.isSafeInteger(revenue)) return null
  return {
    harvests: dates.length,
    calendar: dates.map(date => ({
      season: seasonOf(date),
      day: date % seasonLength + 1,
      yearOffset: Math.floor(date / yearLength),
    })),
    units,
    seedCount,
    cost,
    revenue,
    profit: revenue - cost,
  }
}
