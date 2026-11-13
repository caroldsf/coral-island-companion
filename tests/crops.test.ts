import assert from 'node:assert/strict'
import { test } from 'node:test'
import { calculateCrop, crops, filterCrops } from '../app/src/data/crops.ts'
import type { Crop } from '../app/src/data/crops.ts'

function item(id: string): Crop {
  const crop = crops.find(candidate => candidate.id === id)
  assert.ok(crop, `Missing crop: ${id}`)
  return crop
}

test('season filters use intersection, rank and accent-insensitive search', () => {
  const both = filterCrops(crops, { seasons: ['Verão', 'Outono'] })
  assert.ok(both.some(crop => crop.id === 'hot-pepper'))
  assert.ok(!both.some(crop => crop.id === 'corn'))
  assert.ok(!both.some(crop => crop.id === 'apple'))
  assert.deepEqual(filterCrops(crops, { rank: 'E', query: 'pitaya' }), [item('dragonfruit')])
  assert.deepEqual(filterCrops(crops, { rank: 'F', query: 'pitaya' }), [])
  assert.deepEqual(filterCrops(crops, { query: 'maca' }), [item('apple')])
  assert.deepEqual(filterCrops(crops, { query: 'hot pepper' }), [item('hot-pepper')])
})

test('replanting uses one seed per harvest per plant and never adds a wasted final seed', () => {
  const result = calculateCrop(item('turnip'), {
    season: 'Primavera', day: 1, plots: 2, replant: true,
  })
  assert.ok(result)
  assert.deepEqual(result.calendar.map(date => date.day), [5, 9, 13, 17, 21, 25])
  assert.deepEqual([result.seedCount, result.cost, result.revenue, result.profit], [12, 180, 480, 300])
})

test('a harvest may land on day 28 but not in an incompatible season', () => {
  const turnip = item('turnip')
  const plan = { season: 'Primavera', day: 24, plots: 1, replant: false } as const
  assert.equal(calculateCrop(turnip, plan)?.calendar[0]?.day, 28)
  assert.equal(calculateCrop(turnip, { ...plan, day: 25 })?.profit, -15)
  assert.equal(calculateCrop(turnip, { ...plan, day: 29 }), null)
  assert.equal(calculateCrop(turnip, { ...plan, season: 'Outono' }), null)
  assert.equal(calculateCrop(turnip, { ...plan, plots: 1.5 }), null)
})

test('regrowth uses one seed per plant and preserves its calendar across seasons', () => {
  const result = calculateCrop(item('hot-pepper'), {
    season: 'Verão', day: 26, plots: 3, replant: true,
  })
  assert.ok(result)
  assert.deepEqual(result.calendar[0], { season: 'Outono', day: 5, yearOffset: 0 })
  assert.equal(result.harvests, 8)
  assert.equal(result.seedCount, 3)
  assert.equal(result.profit, 744)
})

test('seasonal seedlings yield two fruit and can carry growth over the new year', () => {
  const result = calculateCrop(item('avocado'), {
    season: 'Inverno', day: 25, plots: 1, replant: false,
  })
  assert.ok(result)
  assert.deepEqual(result.calendar[0], { season: 'Primavera', day: 7, yearOffset: 1 })
  assert.equal(result.harvests, 6)
  assert.equal(result.units, 12)
  assert.equal(result.profit, -292)
})

test('permanent trees mature outside their fruiting season and yield three fruit', () => {
  const apple = item('apple')
  const result = calculateCrop(apple, {
    season: 'Verão', day: 1, plots: 1, replant: false,
  })
  assert.ok(result)
  assert.deepEqual(result.calendar.map(date => date.day), [5, 9, 13, 17, 21, 25])
  assert.ok(result.calendar.every(date => date.season === 'Outono'))
  assert.equal(result.units, 18)
  assert.equal(result.profit, -1552)
})

test('mature tree projection omits planting cost and past dates in the current season', () => {
  const result = calculateCrop(item('apple'), {
    season: 'Outono', day: 8, plots: 1, replant: false, mature: true, end: 'season',
  })
  assert.ok(result)
  assert.deepEqual(result.calendar.map(date => date.day), [9, 13, 17, 21, 25])
  assert.equal(result.cost, 0)
  assert.equal(result.profit, 2040)
})

test('catalog entries have distinct IDs and positive numeric inputs', () => {
  assert.equal(crops.length, 89)
  assert.equal(new Set(crops.map(crop => crop.id)).size, crops.length)
  for (const crop of crops) {
    for (const value of [crop.growthDays, crop.seedPrice, crop.sellPrice, crop.yieldPerHarvest]) {
      assert.ok(Number.isSafeInteger(value) && value > 0, crop.id)
    }
    assert.ok(crop.seasons.length > 0, crop.id)
    assert.match(crop.source, /^https:\/\//)
    if (crop.kind !== 'crop') assert.ok(crop.regrowthDays && crop.regrowthDays > 0)
  }
})

test('ocean crops require spoiler opt-in and are excluded from land projections', () => {
  assert.deepEqual(filterCrops(crops, { query: 'petalia' }), [])
  assert.deepEqual(filterCrops(crops, { query: 'petalia', showSpoilers: true }), [item('petalia')])
  assert.equal(calculateCrop(item('petalia'), {
    season: 'Primavera', day: 1, plots: 1, replant: false,
  }), null)
})


test('categorias seguem os tipos da tabela de cultivos', () => {
  assert.equal(item('corn').category, 'Vegetal')
  assert.equal(item('tomato').category, 'Fruta')
  assert.equal(item('pumpkin').category, 'Fruta')
  assert.equal(item('petalia').category, 'Flor')
  assert.equal(item('wheat').category, 'Grão')
  assert.equal(item('tea-leaf').category, 'Erva')
  assert.equal(item('cotton').category, 'Recurso')
})
