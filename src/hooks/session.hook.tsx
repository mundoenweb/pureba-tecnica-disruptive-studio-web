import { useSetStateContext } from '@/states/state'
import { useRouter } from 'next/router'
import { FormEvent, MouseEvent } from 'react'
import { useFetch } from './fetch.hook'
import { paramSetUser } from '@/states/state.interface'

export const useSession = () => {
  const router = useRouter()

  const { setUser } = useSetStateContext()

  const singOut = () => {
    setUser(null)
    window.localStorage.removeItem('token')
  }

  const singIn = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const { username, email } = evt.target as any
    const data = { username: username.value, email: email.value }

    void useFetch<paramSetUser>({
      path: '/session/login',
      method: 'POST',
      data,
    }).then((user) => {
      if (!user) return
      window.localStorage.setItem('token', user.token)
      setUser(user)
      void router.push('/')
    })
  }

  const registerUser = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const { username, email, rol } = evt.target as any
    const data = {
      username: username.value,
      email: email.value,
      rol: rol.value,
    }

    void useFetch<paramSetUser>({
      path: '/users',
      method: 'POST',
      data,
    }).then((user) => {
      if (!user) return
      setUser(user)
      void router.push('/')
    })
  }

  const redirectLogin = (evt: MouseEvent) => {
    evt.preventDefault()
    void router.push('/login')
  }

  const redirectRegister = (evt: MouseEvent) => {
    evt.preventDefault()
    void router.push('/register')
  }

  return { singIn, singOut, registerUser, redirectLogin, redirectRegister }
}
