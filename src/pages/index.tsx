import styles from '../styles/templates/header/Filter.module.css'
import stylesHome from '../styles/Home.module.css'
import { useSetStateContext, useStateContext } from '@/states/state'
import { IThemesEntity } from '@/states/state.interface'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLoadResources } from './loadResources'

export const Header = () => {
  return (
    <header className="mw-grid">
      <h1>Header</h1>
    </header>
  )
}

export const Filters = () => {
  const { themes } = useStateContext()
  const { setCurrentTheme, setFilterSearch } = useSetStateContext()
  const selectedTheme = ({ target }: any) => setCurrentTheme(target.value)
  const search = ({ target }: any) => setFilterSearch(target.value)

  return (
    <form action="#" className={styles.form_filter}>
      <fieldset className={styles.fieldset_filter}>
        <legend>Filtrar por nombre</legend>
        <input
          onChange={search}
          type="search"
          name="search"
          id="search"
          placeholder="Buscar por nombre..."
        />
      </fieldset>
      <fieldset className={styles.fieldset_filter}>
        <legend>Filtrar por temática</legend>
        <select name="themes" id="themes" onChange={selectedTheme}>
          <option value="all">Temáticas</option>
          {themes.map((theme: IThemesEntity) => (
            <option key={theme.id} value={theme.name}>
              {theme.name}
            </option>
          ))}
        </select>
      </fieldset>
    </form>
  )
}

export const GridCardPost = () => {
  useLoadResources()
  const router = useRouter()
  const { posts, user, currentTheme, filterSearch } = useStateContext()

  const checkUser = (evt: any) => {
    if (user) return
    evt.preventDefault()
    const result = confirm(
      'Debes ser un usuario registrado\n¿Deseas registrarte?',
    )
    if (result) void router.push('/register')
  }

  return (
    <section className={`mw-grid ${stylesHome.gird_card_basic}`}>
      {posts
        .filter(({ theme }) => {
          if (currentTheme === 'all') return true
          return theme.name === currentTheme
        })
        .filter(({ name }) => {
          if (!filterSearch) return true
          return filterSearch.some((word) => name.toLowerCase().includes(word))
        })
        .map(({ id, name, theme }) => (
          <Link key={id} href={`/post/${id}`} onClick={checkUser}>
            <CardBasic name={name} nameTheme={theme.name} />
          </Link>
        ))}
    </section>
  )
}

interface ICardBasic {
  name: string
  nameTheme: string
}
const CardBasic = ({ name, nameTheme }: ICardBasic) => {
  return (
    <article className={stylesHome.card_basic}>
      <h2>{name}</h2>
      <p>{nameTheme}</p>
    </article>
  )
}

const Home = () => {
  return (
    <>
      <main className='className="mw-grid"'>
        <Filters />
        <GridCardPost />
      </main>
    </>
  )
}

export default Home
