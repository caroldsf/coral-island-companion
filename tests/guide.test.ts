import assert from 'node:assert/strict'
import test from 'node:test'
import { defaultProfile, matches, validProfile, visibleAtRank } from '../app/src/preferences.ts'
import { guides } from '../app/src/data/guides.ts'

test('preserva o perfil gravado pelo MVP e descarta valores inválidos', () => {
  assert.equal(validProfile(defaultProfile), true)
  assert.equal(validProfile({ season: 'Verão', rank: 'Z' }), false)
  assert.equal(validProfile(null), false)
})

test('a busca aceita acentos ausentes e termos em qualquer ordem', () => {
  assert.equal(matches('verao pimentao', 'Pimentão', 'Verão'), true)
  assert.equal(matches('pimentao inverno', 'Pimentão', 'Verão'), false)
})

test('o filtro de rank só mostra itens liberados', () => {
  assert.equal(visibleAtRank('D', 'E'), false)
  assert.equal(visibleAtRank('D', 'D'), true)
  assert.equal(visibleAtRank(undefined, 'F'), true)
})

test('as fichas do guia têm identificadores únicos por seção e fonte HTTPS', () => {
  const keys = guides.map(item => item.category + ':' + item.id)
  assert.equal(new Set(keys).size, keys.length)
  assert.ok(guides.every(item => item.source.startsWith('https://')))
})
