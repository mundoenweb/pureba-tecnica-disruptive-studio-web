import { useSession } from '@/hooks/session.hook'
import styles from '../styles/Session.module.css'

const Login = () => {
  const { registerUser, redirectLogin } = useSession()
  return (
    <main className='className="mw-grid"'>
      <form action="" className={styles.form_session} onSubmit={registerUser}>
        <h1>Registro</h1>
        <input type="input" name="username" placeholder="Username" />
        <input type="input" name="email" placeholder="email" />
        <select name="rol">
          <option value="reader">Lector</option>
          <option value="creator">Creador de contenido</option>
        </select>
        <button>Regístrate</button>
        <button onClick={redirectLogin}>Iniciar Sesión</button>
      </form>
    </main>
  )
}

export default Login
