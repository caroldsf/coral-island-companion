export type GuideCategory = 'recipes' | 'utensils' | 'tools' | 'animals' | 'buildings'

export interface Guide {
  id: string
  category: GuideCategory
  name: string
  originalName?: string
  description: string
  details: string[]
  source: string
  rank?: string
  spoiler?: boolean
}

const wiki = 'https://www.coralisland.wiki/wiki/'
const number = new Intl.NumberFormat('pt-BR')
const coins = (amount: number) => `${number.format(amount)} moedas`
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')

const utensils = {
  seasoning: ['Kit de temperos', 'Seasoning Set', 1500],
  knife: ['Faca de chef', 'Chef Knife', 1500],
  bowl: ['Tigela de cerâmica', 'Ceramic Bowl', 2000],
  grill: ['Grelha', 'Grill', 2500],
  blender: ['Liquidificador', 'Blender', 2500],
  pot: ['Panela', 'Pot', 3500],
  skillet: ['Frigideira rasa', 'Skillet', 3500],
  oven: ['Forno', 'Oven', 4000],
  frying: ['Frigideira funda', 'Frying Pan', 4000],
} as const

const utensilGuides: Guide[] = Object.values(utensils).map(([name, originalName, price]) => ({
  id: `utensil-${slug(originalName)}`,
  category: 'utensils',
  name,
  originalName,
  description: `Compre na Socket Electronics por ${coins(price)} após instalar a cozinha.`,
  details: ['O programa de compras da TV anuncia um utensílio em promoção às terças-feiras.'],
  source: wiki + 'Socket_Electronics',
}))

type Recipe = [english: string, portuguese: string, ingredients: string]
const recipesByUtensil: Record<keyof typeof utensils, Recipe[]> = {
  seasoning: [
    ['Burrito', 'Burrito', 'tortilha, soja, qualquer queijo, qualquer vegetal'],
    ['Edamame', 'Edamame', 'ervilhas'],
    ['Lettuce wrap', 'Wrap de alface', 'alface, soja'],
    ['Onigiri', 'Onigiri', 'arroz'],
    ['Slimy okra', 'Quiabo gosmento', 'quiabo, gosma de slime'],
    ['Spicy sauerkraut', 'Chucrute apimentado', 'pimenta, repolho roxo'],
  ],
  knife: [
    ['Fish sandwich', 'Sanduíche de peixe', 'pão, alface, chalota, qualquer peixe'],
    ['Fresh salad', 'Salada fresca', 'qualquer vegetal'],
    ['Rainbow sandwich', 'Sanduíche arco-íris', 'pão, tomate, qualquer maionese, qualquer vegetal'],
    ['Sashimi', 'Sashimi', 'wasabi, qualquer peixe'],
    ['Sushi', 'Sushi', 'arroz, qualquer peixe'],
    ['Whole coconut drink', 'Água de coco', 'qualquer coco'],
  ],
  bowl: [
    ['Cenil', 'Cenil', 'taro, açúcar, qualquer coco'],
    ['Egg custard', 'Creme de ovos', 'açúcar, qualquer ovo, qualquer leite'],
    ['Es cendol', 'Es cendol', 'farinha de arroz, xarope, qualquer coco'],
    ['Es doger', 'Es doger', 'leite de vaca comum ou grande, batata-doce, xarope, qualquer coco'],
    ['Klepon', 'Klepon', 'farinha de arroz, açúcar, qualquer coco'],
    ['Purée', 'Purê', 'qualquer fruta ou qualquer vegetal'],
    ['Wakame', 'Wakame', '2 algas marinhas'],
    ['Yogurt', 'Iogurte', 'qualquer leite'],
  ],
  grill: [
    ['Assorted grilled platter', 'Prato de grelhados variados', 'qualquer mel, 2 vegetais quaisquer'],
    ['Bug jerky', 'Inseto desidratado', 'qualquer inseto'],
    ['Corn on the cob', 'Milho na espiga', 'milho, qualquer manteiga'],
    ['Grilled fish', 'Peixe grelhado', 'qualquer peixe'],
    ['Herbed tempeh', 'Tempeh com ervas', 'manjericão, sal gourmet, tempeh'],
    ['Smoked fish', 'Peixe defumado', 'madeira, qualquer peixe'],
    ['Smoked salmon', 'Salmão defumado', 'salmão ou salmão-vermelho, madeira'],
    ['Summer burger', 'Hambúrguer de verão', 'pão, abacaxi, chalota, qualquer queijo'],
  ],
  blender: [
    ['Green smoothie', 'Smoothie verde', 'qualquer vegetal'],
    ['Guacamole', 'Guacamole', 'abacate, alho, tomate'],
    ['Hummus', 'Homus', 'azeite, ervilhas'],
    ['Ice cream', 'Sorvete', 'qualquer leite'],
    ['Jamu', 'Jamu', 'gengibre, ginseng, qualquer mel'],
    ['Ketchup', 'Ketchup', 'sal gourmet, tomate'],
    ['Peanut butter', 'Pasta de amendoim', 'amêndoa, manteiga comum ou grande'],
    ['Smoothie', 'Smoothie de frutas', 'qualquer fruta'],
    ['Wasabi paste', 'Pasta de wasabi', 'wasabi'],
  ],
  pot: [
    ['Basil pesto pasta', 'Massa com pesto de manjericão', 'manjericão, tomate, farinha de trigo'],
    ['Clam chowder', 'Sopa cremosa de amêijoas', 'qualquer amêijoa, qualquer leite'],
    ['Fish soup', 'Sopa de peixe', 'saquê, qualquer peixe, qualquer vegetal'],
    ['Gnocchi', 'Nhoque', 'batata, qualquer manteiga, qualquer queijo, qualquer farinha'],
    ['Green curry', 'Curry verde', 'manjericão, pimentão, ervilhas, qualquer coco'],
    ['Hard-boiled duck egg', 'Ovo de pata cozido', 'ovo de pata comum ou grande'],
    ['Hard-boiled egg', 'Ovo cozido', 'ovo de galinha comum ou grande'],
    ['Hard-boiled quail egg', 'Ovo de codorna cozido', 'ovo de codorna comum ou grande'],
    ['Hot cocoa', 'Chocolate quente', 'cacau, leite de vaca comum ou grande'],
    ['Kue lapis', 'Kue lapis', 'açúcar, taro, qualquer coco'],
    ['Lodeh', 'Lodeh', 'berinjela, tempeh, qualquer coco, qualquer vegetal'],
    ['Red curry', 'Curry vermelho', 'cenoura, pimenta, chalota, qualquer coco'],
    ['Seafood ramen', 'Lámen de frutos do mar', 'farinha de trigo, qualquer peixe, qualquer mexilhão'],
    ['Stew', 'Ensopado', 'batata, qualquer cogumelo'],
    ['Stone soup', 'Sopa de pedra', 'pedra, qualquer ingrediente comestível'],
    ['Tomato soup', 'Sopa de tomate', 'tomate'],
    ['Veggie ramen', 'Lámen de vegetais', 'kombu, farinha de trigo, qualquer cogumelo'],
    ['Wild mushroom polenta', 'Polenta de cogumelos', 'milho, qualquer cogumelo'],
  ],
  skillet: [
    ['Cauliflower casserole', 'Gratinado de couve-flor', 'couve-flor, batata, qualquer farinha'],
    ['Fish taco', 'Taco de peixe', 'tortilha, qualquer peixe, qualquer maionese'],
    ['Hash browns', 'Batata rösti', 'batata, qualquer ovo, qualquer farinha'],
    ['Pancakes', 'Panquecas', 'xarope de bordo, qualquer farinha, qualquer fruta'],
    ['Pepper and mushroom flatbread', 'Pão achatado de pimentão e cogumelo', 'pimentão, qualquer farinha, qualquer cogumelo'],
    ['Popiah', 'Popiah', 'broto de bambu, cenoura, caranguejo ou camarão'],
    ['Sauteed chard', 'Acelga salteada', 'acelga, qualquer óleo'],
    ['Scrambled eggs', 'Ovos mexidos', 'qualquer ovo, qualquer leite'],
    ['Serabi', 'Serabi', 'sal gourmet, farinha de arroz, açúcar, qualquer coco'],
    ['Spring frittata', 'Fritada de primavera', 'qualquer ovo, qualquer vegetal'],
    ['Sunny-side-up eggs', 'Ovos fritos', 'qualquer ovo'],
    ['Tortilla', 'Tortilha', 'qualquer farinha'],
    ['Vegan taco', 'Taco vegano', 'molho kiracha, tortilha, qualquer vegetal'],
  ],
  oven: [
    ['Apple pie', 'Torta de maçã', 'maçã, farinha de trigo, manteiga comum ou grande, qualquer mel'],
    ['Bread', 'Pão', 'qualquer farinha'],
    ['Butter croissant', 'Croissant de manteiga', 'qualquer manteiga, qualquer farinha, qualquer leite'],
    ['Chocolate chip muffins', 'Muffins com gotas de chocolate', 'cacau, qualquer ovo, qualquer farinha'],
    ['Cookies', 'Biscoitos', 'cacau, qualquer manteiga, qualquer farinha'],
    ['Eggplant lasagna', 'Lasanha de berinjela', 'berinjela, tomate, qualquer queijo'],
    ['Fruit tart', 'Torta de frutas', 'açúcar, farinha de trigo, 2 frutas quaisquer'],
    ['Hawaiian pizza', 'Pizza havaiana', 'abacaxi, qualquer queijo, qualquer farinha'],
    ['Jackfruit casserole', 'Gratinado de jaca', 'jaca, batata, qualquer leite, qualquer cogumelo'],
    ['Kue kancing', 'Kue kancing', 'açúcar, qualquer ovo, qualquer farinha'],
    ['Minced jackfruit pie', 'Torta de jaca', 'jaca, qualquer manteiga, qualquer farinha'],
    ['Mooncake', 'Bolo lunar', 'lótus, qualquer ovo, qualquer farinha'],
    ['Mushroom jerky', 'Cogumelo desidratado', 'qualquer cogumelo'],
    ['Oven-baked risotto', 'Risoto de forno', 'arroz, qualquer manteiga, qualquer queijo, qualquer cogumelo'],
    ['Pineapple upside-down cake', 'Bolo invertido de abacaxi', 'abacaxi, açúcar, farinha de trigo'],
    ['Pizza', 'Pizza', 'tomate, qualquer queijo, qualquer farinha, qualquer cogumelo'],
    ['Pumpkin pie', 'Torta de abóbora', 'abóbora, açúcar, qualquer ovo, qualquer farinha'],
    ['Raisins', 'Uvas-passas', 'uva'],
    ['Ratatouille', 'Ratatouille', 'pimentão, berinjela, azeitona, tomate'],
    ['Red velvet cake', 'Bolo red velvet', 'morango, qualquer ovo, qualquer farinha, qualquer leite'],
    ['Vegetable jerky', 'Vegetais desidratados', 'qualquer vegetal'],
  ],
  frying: [
    ['Banana fritter', 'Bolinho frito de banana', 'banana, qualquer farinha, qualquer óleo'],
    ['Beet chips', 'Chips de beterraba', 'beterraba, qualquer óleo'],
    ['Donut', 'Rosquinha', 'óleo de canola, batata, açúcar'],
    ['Falafel', 'Falafel', 'pepino, ervilhas, qualquer óleo'],
    ['Fried rice', 'Arroz frito', 'arroz, chalota, qualquer ovo, qualquer vegetal'],
    ['Fried tempeh', 'Tempeh frito', 'tempeh, qualquer óleo'],
    ['Kale chips', 'Chips de couve', 'couve, qualquer óleo'],
    ['Omurice', 'Omurice', 'cenoura, ketchup, arroz, qualquer ovo'],
    ['Pad thai', 'Pad thai', 'limão, camarão, farinha de trigo, qualquer vegetal'],
    ['Peyek', 'Peyek', 'amêndoa, farinha de trigo, qualquer lagarta'],
    ['Potato chips', 'Chips de batata', 'batata, qualquer óleo'],
    ['Roasted almonds', 'Amêndoas torradas', 'amêndoa'],
    ['Roasted chestnuts', 'Castanhas assadas', 'castanha'],
    ['Roasted mushroom', 'Cogumelo salteado', 'manjericão, azeite, qualquer cogumelo'],
    ['Spider tempura', 'Tempurá de aranha', 'sal gourmet, qualquer farinha, qualquer óleo, qualquer aranha'],
    ['Sweet potato chips', 'Chips de batata-doce', 'batata-doce, qualquer óleo'],
    ['Sweet potato poutine', 'Poutine de batata-doce', 'batata-doce, qualquer queijo, qualquer óleo'],
  ],
}

const recipeGuides: Guide[] = (Object.keys(recipesByUtensil) as (keyof typeof utensils)[]).flatMap((utensil) => {
  const [name, originalUtensil] = utensils[utensil]
  return recipesByUtensil[utensil].map(([originalName, recipeName, ingredients]) => ({
    id: `recipe-${slug(originalName)}`,
    category: 'recipes',
    name: recipeName,
    originalName,
    description: `${name} (${originalUtensil}) · 2 porções`,
    details: [`Ingredientes: ${ingredients}. Use uma unidade de cada ingrediente, salvo indicação.`],
    source: wiki + 'Cooking',
  }))
})

const merfolkRecipes: [keyof typeof utensils, ...Recipe][] = [
  ['seasoning', 'Coral crunch kebabs', 'Espetinhos crocantes de coral', 'kombu, rabanete, red reefbud, tortilha'],
  ['blender', "Mermaid's kiss", 'Beijo de sereia', 'sea spud, marinip, qualquer coco'],
  ['seasoning', 'Nasi laut', 'Nasi laut', 'arroz, goldglow, pink coralcap, bluebell blossom'],
  ['knife', 'Kelp salad', 'Salada de algas', 'alga marinha, soka, twinshade sealeaf, pink coralcap'],
  ['grill', 'Algae-wrapped skewers', 'Espetinhos enrolados em alga', 'sproutfruit, twinshade sealeaf, alface-do-mar'],
  ['blender', 'Oceanic mojito', 'Mojito oceânico', 'bluecole, flor-de-neve, tea berry'],
  ['blender', 'Deep sea elixir', 'Elixir do mar profundo', 'spring sealeaf, red reefbud, essência de água'],
  ['blender', 'Coral reef fizz', 'Refresco de recife', 'goldglow, marinethorn blossom, helixpur blossom, xarope'],
  ['grill', 'Reef burger', 'Hambúrguer de recife', 'spring sealeaf, sproutfruit, qualquer farinha, qualquer vieira'],
  ['blender', 'Frozen seagrass', 'Batida gelada de erva marinha', 'alga marinha, leite de Mermoo'],
]
merfolkRecipes.forEach(([utensil, originalName, name, ingredients]) => {
  const [utensilName, originalUtensil] = utensils[utensil]
  recipeGuides.push({
    id: `recipe-${slug(originalName)}`,
    category: 'recipes',
    name,
    originalName,
    spoiler: true,
    description: `${utensilName} (${originalUtensil}) · Receita subaquática`,
    details: [`Ingredientes: ${ingredients}.`, 'A receita pode ser descoberta no Reino do Povo do Mar.'],
    source: 'https://www.reddit.com/r/coralisland/comments/1u9unpf/underwater_recipes/',
  })
})

const standardUpgrades = [
  'Bronze: 1.500 moedas, 20 madeiras e 5 barras de bronze · 1 dia.',
  'Prata: 3.000 moedas, 20 madeiras e 5 barras de prata · 2 dias.',
  'Ouro: 10.000 moedas, 5 madeiras de lei e 3 barras de ouro · 2 dias.',
  'Ósmio: 20.000 moedas, 5 madeiras de lei e 3 barras de ósmio · 4 dias.',
]
const wateringUpgrades = [
  'Bronze: 1.500 moedas e 5 barras de bronze · 1 dia.',
  'Prata: 3.000 moedas e 5 barras de prata · 2 dias.',
  'Ouro: 10.000 moedas, 3 resinas e 3 barras de ouro · 2 dias.',
  'Ósmio: 20.000 moedas, 5 resinas e 3 barras de ósmio · 4 dias.',
]
const beachUpgrades = [
  'Bronze: 2.000 moedas, 20 madeiras e 5 essências de alga de bronze.',
  'Prata: 5.000 moedas, 20 madeiras e 5 essências de alga de prata.',
  'Ouro: 10.000 moedas, 5 madeiras de lei e 5 essências de alga de ouro.',
  'Ósmio: 15.000 moedas, 5 madeiras de lei e 5 essências de alga de ósmio.',
]

type Tool = [english: string, portuguese: string, description: string, upgrades: string[]]
const upgradeableTools: Tool[] = [
  ['Hoe', 'Enxada', 'Prepara o solo. Carregue o golpe para preparar uma área maior com a ferramenta melhorada.', standardUpgrades],
  ['Axe', 'Machado', 'Corta árvores e tocos. As melhorias permitem cortar obstáculos maiores.', standardUpgrades],
  ['Pickaxe', 'Picareta', 'Quebra pedras. A picareta de bronze quebra rochas pequenas e a de prata, rochas grandes.', [
    ...standardUpgrades.slice(0, 3),
    'Ósmio: 20.000 moedas, 5 madeiras de lei e 5 barras de ósmio · 4 dias.',
  ]],
  ['Scythe', 'Foice', 'Corta mato e remove lixo no oceano. As melhorias aumentam a área do golpe carregado.', standardUpgrades],
  ['Watering Can', 'Regador', 'Reabasteça em uma fonte de água. As melhorias permitem regar mais quadrados de uma vez.', wateringUpgrades],
  ['Fishing Pole', 'Vara de pesca', 'As melhorias facilitam a captura de peixes e permitem arremessar mais longe.', beachUpgrades],
  ['Bug Net', 'Rede de insetos', 'Captura insetos e criaturas marinhas. As melhorias ampliam a área de captura.', beachUpgrades],
]

const toolGuides: Guide[] = upgradeableTools.map(([originalName, name, description, upgrades]) => ({
  id: `tool-${slug(originalName)}`,
  category: 'tools',
  name,
  originalName,
  description,
  details: [
    `Local: ${upgrades === beachUpgrades ? 'loja de praia do Sunny (Beach Shack)' : 'ferreiro Sanchez Brothers'}.`,
    'Cada melhoria exige a ferramenta do nível anterior.',
    ...upgrades,
  ],
  source: wiki + (upgrades === beachUpgrades ? 'Tool' : 'Blacksmith'),
}))
const ranchTools: [string, string, string, number][] = [
  ['Milk Pail', 'Balde de ordenha', 'Recolhe leite.', 300],
  ['Shears', 'Tesoura de tosquia', 'Recolhe lã.', 400],
  ['Animal Whistle', 'Apito de animais', 'Chama o cavalo.', 500],
]
ranchTools.forEach(([originalName, name, description, price]) => {
  toolGuides.push({
    id: `tool-${slug(originalName)}`,
    category: 'tools',
    name,
    originalName,
    description,
    details: [`Compre no rancho por ${coins(price)}.`],
    source: wiki + 'Ranch',
  })
})
toolGuides.push({
  id: 'tool-lumina-wand',
  category: 'tools',
  name: 'Varinha Lumina',
  originalName: 'Lumina Wand',
  spoiler: true,
  description: 'Emite luz para o cultivo na fazenda subaquática.',
  details: [
    'Melhorias com Cho Oyu na Câmara do Oráculo. Leve a varinha do nível anterior.',
    'Bronze: 5.000 moedas, 5 barras de bronze, 10 madeiras de lei e 2 núcleos solares.',
    'Prata: 7.000 moedas, 5 barras de prata, 20 madeiras de lei e 4 núcleos solares.',
    'Ouro: 10.000 moedas, 5 barras de ouro, 20 madeiras de lei e 8 núcleos solares.',
    'Ósmio: 15.000 moedas, 5 barras de ósmio, 20 madeiras de lei e 10 núcleos solares.',
  ],
  source: wiki + 'Oracle_Chamber',
})

type RanchAnimal = [
  english: string,
  portuguese: string,
  rank: string,
  price: number,
  housing: string,
  description: string,
  extra?: string,
]
const ranchAnimals: RanchAnimal[] = [
  ['Chicken', 'Galinha', 'F', 600, 'Galinheiro', 'Põe ovos diariamente.'],
  ['Cow', 'Vaca', 'F', 2500, 'Celeiro', 'Produz leite diariamente.', 'Use um balde de ordenha.'],
  ['Duck', 'Pato', 'E', 1000, 'Galinheiro', 'Põe ovos de pata a cada 2 dias.'],
  ['Sheep', 'Ovelha', 'E', 2000, 'Celeiro', 'Produz lã a cada 2 dias.', 'Use a tesoura de tosquia.'],
  ['Quail', 'Codorna', 'D', 5000, 'Galinheiro nível 2', 'Põe ovos de codorna a cada 4 dias.'],
  ['Goat', 'Cabra', 'D', 8000, 'Celeiro nível 2', 'Produz leite de cabra a cada 2 dias.', 'Use um balde de ordenha.'],
  ['Peafowl', 'Pavão', 'C', 20000, 'Galinheiro nível 2', 'Solta uma pena a cada 4 dias.'],
  ['Pig', 'Porco', 'C', 12000, 'Celeiro nível 2', 'Encontra trufas.', 'Ciclo de produção de 3 dias.'],
  ['Luwak', 'Civeta', 'B', 30000, 'Celeiro nível 2', 'Produz grãos de café gesha.', 'Ciclo de produção de 2 dias.'],
  ['Llama', 'Lhama', 'B', 30000, 'Celeiro nível 2', 'Produz lã de lhama a cada 4 dias.', 'O rancho vende as lhamas em pares pelo valor indicado. Use a tesoura de tosquia.'],
  ['Horse', 'Cavalo', 'F', 15000, 'Estábulo', 'Pode ser montado para se deslocar mais depressa.'],
]
const ranchGuides: Guide[] = ranchAnimals.map(([originalName, name, rank, price, housing, description, extra]) => ({
  id: `animal-${slug(originalName)}`,
  category: 'animals',
  name,
  originalName,
  rank,
  description,
  details: [`Compra no rancho: ${coins(price)}. Alojamento: ${housing}.`, ...(extra ? [extra] : [])],
  source: wiki + 'Ranch',
}))

type SpecialAnimal = [english: string, portuguese: string, price: number, description: string, requirement: string]
const savannahAnimals: SpecialAnimal[] = [
  ['Ostrich', 'Avestruz', 35000, 'Põe ovos de avestruz a cada 3 dias.', 'Galinheiro nível 2.'],
  ['Buffalo', 'Búfalo', 44000, 'Produz leite de búfala a cada 3 dias.', 'Celeiro nível 2 e balde de ordenha.'],
]
const oceanAnimals: SpecialAnimal[] = [
  ['Mermoo', 'Mermoo', 14000, 'Produz leite de Mermoo diariamente.', 'Orquestra Oceânica de 20 m e balde de ordenha.'],
  ['Carapoultry', 'Carapoultry', 8000, 'Põe ovos de Cara a cada 2 dias.', 'Orquestra Oceânica de 20 m.'],
  ['Seashroud', 'Seashroud', 18000, 'Produz algas de Seashroud a cada 3 dias.', 'Orquestra Oceânica de 40 m.'],
  ['Ink Hog', 'Ink Hog', 9000, 'Produz tinta Deepvoid diariamente.', 'Orquestra Oceânica de 40 m.'],
  ['Shell cluck', 'Shell Cluck', 30000, 'Produz esferas a cada 6 dias.', 'Orquestra Oceânica de 50 m.'],
]
const specialAnimalGuides: Guide[] = [
  ...savannahAnimals.map(([originalName, name, price, description, requirement]): Guide => ({
    id: `animal-${slug(originalName)}`,
    category: 'animals',
    name,
    originalName,
    spoiler: true,
    description,
    details: [`Compre de Lady Lavanna na Savana por ${coins(price)}.`, requirement],
    source: wiki + 'Farm_animal',
  })),
  ...oceanAnimals.map(([originalName, name, price, description, requirement]): Guide => ({
    id: `animal-${slug(originalName)}`,
    category: 'animals',
    name,
    originalName,
    spoiler: true,
    description,
    details: [`Compre com Slamet no rancho subaquático por ${coins(price)}.`, requirement, 'Alojamento: celeiro subaquático. Alimento: algas marinhas.'],
    source: wiki + 'Underwater_Ranch',
  })),
]

type Building = [
  english: string,
  portuguese: string,
  description: string,
  price: number,
  materials: string,
  placement: string,
]
const carpenterBuildings: Building[] = [
  ['Coop', 'Galinheiro', 'Abriga até 4 aves.', 2000, '100 madeiras, 50 pedras, 5 barras de bronze e 10 fibras', '4 × 7 quadrados'],
  ['Deluxe Coop', 'Galinheiro nível 2', 'Amplia um galinheiro para 8 aves.', 4500, '50 pedras, 20 madeiras de lei, 3 barras de prata e 10 fibras', '4 × 7 quadrados'],
  ['Barn', 'Celeiro', 'Abriga até 4 animais de criação.', 3000, '200 madeiras, 100 pedras, 5 barras de bronze e 10 fibras', '5 × 8 quadrados'],
  ['Deluxe Barn', 'Celeiro nível 2', 'Amplia um celeiro para 8 animais.', 6500, '100 pedras, 40 madeiras de lei, 5 barras de prata e 10 fibras', '5 × 8 quadrados'],
  ['Stable', 'Estábulo', 'Abriga um cavalo.', 15000, '200 pedras, 50 sucatas e 5 barras de prata', '3 × 4 quadrados'],
  ['Well', 'Poço', 'Fornece água para reabastecer o regador.', 2000, '60 pedras, 10 madeiras e 1 essência de alga de bronze', '3 × 3 quadrados'],
  ['Mill', 'Moinho', 'Produz farinhas, açúcar e sal gourmet.', 2000, '50 madeiras, 20 sucatas e 2 barras de bronze', '3 × 4 quadrados'],
  ['Silo', 'Silo', 'Armazena feno para os animais.', 2500, '300 pedras, 20 sucatas e 2 resinas', '3 × 3 quadrados'],
  ['Fish Pond', 'Lago de peixes', 'Permite criar e multiplicar peixes.', 7000, '50 pedras, 20 sucatas, 20 algas marinhas e 1 essência de alga de ouro', '5 × 5 quadrados'],
  ['Insect House', 'Viveiro de insetos', 'Permite criar e multiplicar insetos.', 7000, '20 compostos, 15 madeiras de lei, 10 seivas e 1 barra de ouro', '5 × 5 quadrados'],
  ['Shed', 'Galpão', 'Espaço interno para guardar itens e instalar máquinas.', 5000, '200 madeiras, 200 pedras e 5 barras de ouro', '8 × 9 quadrados'],
]
const buildingGuides: Guide[] = carpenterBuildings.map(([originalName, name, description, price, materials, placement]) => ({
  id: `building-${slug(originalName)}`,
  category: 'buildings',
  name,
  originalName,
  description,
  details: [`Carpintaria: ${coins(price)} e ${materials}.`, `Espaço externo: ${placement}. Prazo: 2 dias.`],
  source: originalName === 'Deluxe Coop' ? 'https://coralisland.fandom.com/wiki/Coop' : wiki + 'Carpenter',
}))
buildingGuides.push(
  {
    id: 'building-coop-level-3',
    category: 'buildings',
    name: 'Galinheiro nível 3',
    originalName: 'Coop Lv. 3',
    rank: 'C',
    description: 'Amplia um galinheiro nível 2 para 12 aves.',
    details: ['Carpintaria: 10.000 moedas, 35 madeiras de lei, 70 pedras, 20 fibras e 3 barras de ouro. Prazo: 3 dias.'],
    source: 'https://coralisland.fandom.com/wiki/Coop',
  },
  {
    id: 'building-barn-level-3',
    category: 'buildings',
    name: 'Celeiro nível 3',
    originalName: 'Barn Lv. 3',
    rank: 'C',
    description: 'Amplia um celeiro nível 2 para 12 animais. Porcos e civetas podem produzir dentro dele.',
    details: ['Carpintaria: 15.000 moedas, 60 madeiras de lei, 120 pedras, 20 fibras e 5 barras de ouro. Prazo: 3 dias.'],
    source: 'https://coralisland.fandom.com/wiki/Barn',
  },
  {
    id: 'building-farmhouse',
    category: 'buildings',
    name: 'Casa da fazenda',
    originalName: 'Farmhouse',
    description: 'A melhoria para o nível 2 instala a cozinha.',
    details: [
      'Nível 1: 50 madeiras e 20 pedras · reparo imediato.',
      'Nível 2: 5.000 moedas, 100 madeiras, 50 pedras e 10 barras de bronze · 3 dias.',
      'Nível 3: 40.000 moedas, 200 madeiras, 150 pedras e 10 barras de prata · 3 dias.',
      'Nível 4: 120.000 moedas, 200 madeiras de lei, 300 pedras e 10 barras de ouro · 3 dias.',
    ],
    source: wiki + 'Carpenter',
  },
  {
    id: 'building-greenhouse',
    category: 'buildings',
    name: 'Estufa',
    originalName: 'Greenhouse',
    spoiler: true,
    description: 'Permite plantar durante todo o ano em 14 × 14 quadrados.',
    details: ['Complete todas as oferendas do Altar de Plantações no Templo do Lago.', 'Regue mesmo nos dias de chuva.'],
    source: wiki + 'Greenhouse',
  },
  {
    id: 'building-underwater-barn',
    category: 'buildings',
    name: 'Celeiro subaquático',
    originalName: 'Underwater Barn',
    spoiler: true,
    description: 'Abriga animais marinhos na fazenda subaquática.',
    details: ['Compre com Slamet por 5.000 moedas, 100 pedras, 30 algas marinhas, 10 sucatas e 3 essências de alga de ósmio.'],
    source: wiki + 'Underwater_Ranch',
  },
)

export const guides: Guide[] = [
  ...recipeGuides,
  ...utensilGuides,
  ...toolGuides,
  ...ranchGuides,
  ...specialAnimalGuides,
  ...buildingGuides,
]
