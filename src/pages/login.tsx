import { useSession } from '@/hooks/session.hook'
import styles from '../styles/Session.module.css'

const Login = () => {
  const { singIn, redirectRegister } = useSession()
  return (
    <main className='className="mw-grid"'>
      <form action="#" onSubmit={singIn} className={styles.form_session}>
        <h1>Inicio de sesión</h1>
        <input
          required
          type="input"
          name="username"
          id="username"
          placeholder="Username"
        />
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="email"
        />
        <button>Iniciar Sesión</button>
        <button onClick={redirectRegister}>Regístrate</button>
      </form>
    </main>
  )
}

export default Login
