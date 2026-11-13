export const ranks = ['F', 'E', 'D', 'C', 'B', 'A', 'S'] as const
export const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'] as const

export type Rank = typeof ranks[number]
export type Season = typeof seasons[number]
export type Profile = { season: Season; rank: Rank }

export const defaultProfile: Profile = { season: 'Verão', rank: 'F' }

export function readLocal(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null')
  } catch {
    return null
  }
}

export function writeLocal(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The guide still works when browser storage is disabled.
  }
}

export function validProfile(value: unknown): value is Profile {
  if (typeof value !== 'object' || value === null) return false
  const profile = value as Partial<Profile>
  return seasons.includes(profile.season as Season) && ranks.includes(profile.rank as Rank)
}

export function searchKey(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR').trim()
}

export function matches(query: string, ...fields: string[]) {
  const searchable = searchKey(fields.join(' '))
  return searchKey(query).split(/\s+/).every(word => searchable.includes(word))
}

export function visibleAtRank(required: string | undefined, current: Rank) {
  return required === undefined || ranks.indexOf(required as Rank) <= ranks.indexOf(current)
}
