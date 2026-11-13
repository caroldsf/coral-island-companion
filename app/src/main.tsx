import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import type { FormEvent, ReactNode } from 'react'
import { calculateCrop, crops } from './data/crops'
import type { Crop } from './data/crops'
import { guides } from './data/guides'
import { defaultProfile, matches, ranks, readLocal, seasons, validProfile, visibleAtRank, writeLocal } from './preferences'
import type { Profile, Season } from './preferences'
import { cropIcon, guideIcon } from './icons'
import './styles.css'

const tabs = {
  crops: '🌱 Plantações', fruit: '🌳 Frutíferas', calc: '🧮 Calculadora',
  recipes: '🍲 Receitas', utensils: '🍳 Utensílios', tools: '🛠️ Ferramentas',
  animals: '🐔 Animais', buildings: '🏠 Construções', favorites: '★ Favoritos',
  search: 'Busca', about: 'ℹ️ Sobre',
} as const
type Tab = keyof typeof tabs
type Guide = {
  id: string; category: string; name: string; originalName?: string;
  description: string; details: readonly string[]; source: string;
  rank?: string; spoiler?: boolean
}
const entries: readonly Guide[] = guides
const seasonIcons = ['🌸', '☀️', '🍂', '❄️']
const labels = { crop: 'Semente', seedling: 'Muda sazonal', tree: 'Árvore permanente' }
const money = (amount: number) => amount.toLocaleString('pt-BR') + ' g'
const profileKey = 'cic-profile'
const favoritesKey = 'cic-favorites'

function readFavorites(): string[] {
  const stored = readLocal(favoritesKey)
  return Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string') : []
}

function Field({ name, children }: { name: string; children: ReactNode }) {
  return <label className="field"><span>{name}</span>{children}</label>
}

function ProfileDialog({ dialog, profile, onSave }: {
  dialog: { current: HTMLDialogElement | null }; profile: Profile; onSave: (profile: Profile) => void;
}) {
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const value = { season: form.get('season'), rank: form.get('rank') }
    if (validProfile(value)) {
      onSave(value)
      dialog.current?.close()
    }
  }

  return <dialog ref={dialog} aria-labelledby="profile-title">
    <form key={profile.season + profile.rank} onSubmit={save}>
      <h2 id="profile-title">Configure sua ilha 🌺</h2>
      <Field name="Estação atual"><select name="season" defaultValue={profile.season}>
        {seasons.map(season => <option key={season}>{season}</option>)}
      </select></Field>
      <Field name="Classificação da cidade"><select name="rank" defaultValue={profile.rank}>
        {ranks.map(rank => <option key={rank}>{rank}</option>)}
      </select></Field>
      <div className="actions"><button className="btn">Salvar e explorar</button>
        <button className="tab" type="button" onClick={() => dialog.current?.close()}>Fechar</button></div>
    </form>
  </dialog>
}

function Calculator({ available, selected, setSelected, initialSeason }: {
  available: readonly Crop[]; selected: string; setSelected: (id: string) => void; initialSeason: Season;
}) {
  const [season, setSeason] = useState(initialSeason)
  const [day, setDay] = useState('1')
  const [plots, setPlots] = useState('10')
  const [replant, setReplant] = useState(true)
  const [mature, setMature] = useState(false)
  const [end, setEnd] = useState<'season' | 'cycle'>('season')
  const crop = available.find(item => item.id === selected) ?? available[0]
  if (!crop) return <p>Nenhuma cultura disponível para calcular.</p>
  const tree = crop.kind === 'tree'
  const plantingSeasons = tree ? seasons : crop.seasons
  const plantingSeason = plantingSeasons.includes(season) ? season : plantingSeasons[0]
  const result = calculateCrop(crop, { season: plantingSeason, day: Number(day), plots: Number(plots), replant, mature: tree && mature, end })

  return <>
    <p className="muted">Estime a venda in natura em qualidade base, com crescimento normal e cultivo ao ar livre. O saldo desconta as sementes e mudas compradas durante o período.</p>
    <div className="formgrid">
      <Field name="Cultura"><select value={crop.id} onChange={event => setSelected(event.target.value)}>
        {available.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select></Field>
      <Field name={tree && mature ? 'Estação inicial' : 'Estação do plantio'}>
        <select value={plantingSeason} onChange={event => setSeason(event.target.value as Season)}>
          {plantingSeasons.map(item => <option key={item}>{item}</option>)}
        </select>
      </Field>
      <Field name={tree && mature ? 'Dia inicial' : 'Dia do plantio'}>
        <input type="number" min="1" max="28" value={day} onChange={event => setDay(event.target.value)} />
      </Field>
      <Field name="Quantidade de plantas"><input type="number" min="1" max="100000" value={plots}
        onChange={event => setPlots(event.target.value)} /></Field>
      <Field name="Período"><select value={end} onChange={event => setEnd(event.target.value as typeof end)}>
        <option value="season">Até o fim da estação</option><option value="cycle">112 dias a partir da data inicial</option>
      </select></Field>
    </div>
    {crop.kind === 'crop' && !crop.regrowthDays &&
      <label className="checkbox"><input type="checkbox" checked={replant} onChange={event => setReplant(event.target.checked)} /> Replantar após colher, se houver tempo para outra colheita</label>}
    {tree && <label className="checkbox"><input type="checkbox" checked={mature} onChange={event => setMature(event.target.checked)} /> Árvore adulta já plantada</label>}
    <div className="card result" aria-live="polite">
      {result ? <>
        <strong>Saldo estimado de {money(result.profit)}</strong>
        <dl className="summary">
          <div><dt>Colheitas por planta</dt><dd>{result.harvests}</dd></div>
          <div><dt>Unidades vendidas</dt><dd>{result.units}</dd></div>
          <div><dt>Receita</dt><dd>{money(result.revenue)}</dd></div>
          <div><dt>Custo de plantio</dt><dd>{money(result.cost)}</dd></div>
        </dl>
        {result.calendar.length > 0 && <details>
          <summary>Calendário de colheitas</summary>
          <ul>{result.calendar.map(date =>
            <li key={[date.yearOffset, date.season, date.day].join('-')}>{date.season}, dia {date.day}{date.yearOffset > 0 && ' · ano seguinte'}</li>
          )}</ul>
        </details>}
      </> : <p>Confira a data, a quantidade de plantas e os dados disponíveis para esta cultura.</p>}
    </div>
  </>
}

function App() {
  const [profile, setProfile] = useState<Profile | null>(() => {
    const stored = readLocal(profileKey)
    return validProfile(stored) ? stored : null
  })
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([profile?.season ?? defaultProfile.season])
  const [tab, setTab] = useState<Tab>('crops')
  const [query, setQuery] = useState('')
  const [spoilers, setSpoilers] = useState(false)
  const [favorites, setFavorites] = useState(readFavorites)
  const [selectedCrop, setSelectedCrop] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const current = profile ?? defaultProfile

  useEffect(() => {
    if (!profile && dialog.current && !dialog.current.open) dialog.current.showModal()
  }, [profile])

  function saveProfile(value: Profile) {
    setProfile(value)
    setSelectedSeasons([value.season])
    writeLocal(profileKey, value)
  }

  function changeTab(value: Tab, focus = false) {
    setTab(value)
    if (focus) requestAnimationFrame(() => heading.current?.focus())
  }

  function toggleFavorite(id: string) {
    const next = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id]
    setFavorites(next)
    writeLocal(favoritesKey, next)
  }

  function favorite(id: string, name: string) {
    const active = favorites.includes(id)
    return <button className="favorite" type="button" aria-label={'Favorito: ' + name}
      aria-pressed={active} onClick={() => toggleFavorite(id)}>{active ? '★' : '☆'}</button>
  }

  const available = crops.filter(item => spoilers || (!item.spoiler && visibleAtRank(item.rank, current.rank)))
  const visibleGuides = entries.filter(item => spoilers || (!item.spoiler && visibleAtRank(item.rank, current.rank)))
  const cropId = (crop: Crop) => 'crop:' + crop.id
  const guideId = (item: Guide) => item.category + ':' + item.id

  function cropCard(item: Crop) {
    return <article key={cropId(item)} className="card">
      <div className="card-title"><h3><span className="item-icon" aria-hidden="true">{cropIcon(item)}</span>{item.name}</h3>{favorite(cropId(item), item.name)}</div>
      {item.englishName !== item.name && <p className="original">{item.englishName}</p>}
      <span className="chip">{labels[item.kind]}</span>
      {item.environment === 'ocean' ? <span className="chip">Cultivo subaquático</span> : <span className="chip">Cidade {item.rank}+</span>}
      <div className="details">
        <div>Produção em {item.seasons.join(' e ')}</div>
        <div>{item.growthDays} dias para crescer{item.regrowthDays ? ` · rebrote a cada ${item.regrowthDays} dias` : ''}</div>
        <div>{item.seedPrice == null ? 'Preço de plantio indisponível' : `Plantio ${money(item.seedPrice)}`} · {item.sellPrice == null ? 'venda indisponível' : `venda base ${money(item.sellPrice)}`}</div>
      </div>
      <div className="card-actions">
        {item.environment !== 'ocean' && item.seedPrice != null && item.sellPrice != null && <button className="link-button" onClick={() => {
          setSelectedCrop(item.id)
          changeTab('calc', true)
        }}>Calcular</button>}
        <a href={item.source} target="_blank" rel="noreferrer">Fonte</a>
      </div>
    </article>
  }

  function guideCard(item: Guide) {
    return <article key={guideId(item)} className="card">
      <div className="card-title"><h3><span className="item-icon" aria-hidden="true">{guideIcon(item)}</span>{item.name}</h3>{favorite(guideId(item), item.name)}</div>
      {item.originalName && item.originalName !== item.name && <p className="original">{item.originalName}</p>}
      {item.rank && <span className="chip">Cidade {item.rank}+</span>}
      {item.description && <p className="muted">{item.description}</p>}
      {item.details.length > 0 && <ul className="details">{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}
      <div className="card-actions"><a href={item.source} target="_blank" rel="noreferrer">Fonte</a></div>
    </article>
  }

  const cropResults = available.filter(item => {
    if (tab === 'search') return matches(query, item.name, item.englishName, labels[item.kind], ...item.seasons)
    if (tab === 'favorites') return favorites.includes(cropId(item))
    if (tab === 'fruit') return item.kind !== 'crop'
    return tab === 'crops' && item.kind === 'crop' && selectedSeasons.length > 0 &&
      selectedSeasons.every(season => item.seasons.includes(season))
  })
  const guideResults = visibleGuides.filter(item => {
    if (tab === 'search') return matches(query, item.name, item.originalName ?? '', item.description, ...item.details)
    if (tab === 'favorites') return favorites.includes(guideId(item))
    return item.category === tab
  })
  const count = cropResults.length + guideResults.length
  const title = tab === 'crops' ? 'Plantações por estação' :
    tab === 'fruit' ? 'Frutíferas' : tab === 'calc' ? 'Calculadora de colheitas' :
    tab === 'about' ? 'Sobre o projeto' : tabs[tab].replace(/^[^\p{L}]+/u, '')

  return <>
    <header><div className="wrap top">
      <div><div className="brand">🌴 Coral Island Companion</div><div className="subtitle">Your island, your pace.</div></div>
      <button className="ghost" onClick={() => dialog.current?.showModal()}>⚙️ Meu progresso</button>
    </div></header>
    <main>
      <section className="panel hero"><div>
        <div className="eyebrow">Guia não oficial</div><h1>Sua ilha, no seu ritmo 🌱</h1>
        <p className="muted">Planeje plantações, compare estações e acompanhe o progresso da sua cidade.</p>
      </div><span className="pill">{profile ? `${current.season} · Cidade ${current.rank}` : 'Perfil não configurado'}</span></section>
      <div className="utilities">
        <Field name="Buscar no guia"><input type="search" placeholder="Ex.: pimenta, milho, frigideira" value={query}
          onChange={event => { setQuery(event.target.value); changeTab('search') }} /></Field>
        <label className="checkbox"><input type="checkbox" checked={spoilers}
          onChange={event => setSpoilers(event.target.checked)} /> Mostrar spoilers e ranks futuros</label>
      </div>
      <nav className="tabs" aria-label="Seções do guia">
        {(Object.keys(tabs) as Tab[]).map(key => <button key={key} type="button"
          className={'tab' + (key === tab ? ' active' : '')}
          aria-current={key === tab ? 'page' : undefined}
          onClick={() => changeTab(key)}>{tabs[key]}</button>)}
      </nav>
      <section className="panel" aria-labelledby="section-title">
        <h2 ref={heading} tabIndex={-1} id="section-title">{title}</h2>
        {tab === 'crops' && <>
          <p className="muted">Marque várias estações para ver culturas que produzem em <strong>todas</strong> elas. Use <strong>Só esta</strong> para ver uma estação de cada vez.</p>
          <div className="filters" role="group" aria-label="Estações">
            {seasons.map((season, index) => {
              const checked = selectedSeasons.includes(season)
              return <div className="season-control" key={season}>
                <label className={'season checkbox' + (checked ? ' active' : '')}>
                  <input type="checkbox" checked={checked}
                    onChange={() => setSelectedSeasons(current => current.includes(season)
                      ? current.filter(item => item !== season) : [...current, season])} />
                  <span aria-hidden="true">{seasonIcons[index]}</span> {season}
                </label>
                <button type="button" className="season-only" aria-label={`Ver só ${season}`}
                  onClick={() => setSelectedSeasons([season])}>Só esta</button>
              </div>
            })}
          </div>
        </>}
        {tab === 'fruit' && <p className="muted">Mudas sazonais morrem fora das estações compatíveis. Árvores permanentes sobrevivem o ano todo e frutificam nas estações indicadas.</p>}
        {tab === 'calc' && <Calculator key={current.season} available={available.filter(item => item.environment !== 'ocean' && item.seedPrice != null && item.sellPrice != null)}
          selected={selectedCrop} setSelected={setSelectedCrop} initialSeason={current.season} />}
        {tab === 'about' && <>
          <p className="muted">Coral Island Companion é um guia feito por fãs, sem afiliação com a Stairway Games. O perfil e os favoritos ficam neste navegador.</p>
          <p className="muted">Cada ficha indica a fonte consultada. A calculadora usa preços base e considera plantio ao ar livre. Bônus, processamento e estufa ficam fora da estimativa.</p>
          <button className="btn" onClick={() => {
            writeLocal(profileKey, null)
            setProfile(null)
            setSelectedSeasons([defaultProfile.season])
            setSpoilers(false)
            dialog.current?.showModal()
          }}>Redefinir meu perfil</button>
        </>}
        {tab !== 'calc' && tab !== 'about' && <>
          <p className="muted" role="status">{count === 1 ? '1 resultado' : `${count} resultados`}</p>
          {count > 0 ? <div className="cards">{cropResults.map(cropCard)}{guideResults.map(guideCard)}</div> :
            <p className="muted">{tab === 'favorites' ? 'Use a estrela das fichas para salvar seus favoritos.' :
              tab === 'crops' && !selectedSeasons.length ? 'Escolha ao menos uma estação.' : 'Nenhum item corresponde aos filtros atuais.'}</p>}
        </>}
      </section>
      <footer>Coral Island Companion · Guia não oficial 🌴</footer>
    </main>
    <ProfileDialog dialog={dialog} profile={current} onSave={saveProfile} />
  </>
}

createRoot(document.getElementById('root')!).render(<App />)



