import { useFetch } from '@/hooks/fetch.hook'
import { useSetStateContext, useStateContext } from '@/states/state'
import { IPostEntity, IThemesEntity } from '@/states/state.interface'
import { useEffect } from 'react'

export const useLoadResources = () => {
  const { setThemes, setPosts } = useSetStateContext()
  const { user, token } = useStateContext()
  useEffect(() => {
    void useFetch<IThemesEntity[]>({ path: '/themes', alerts: false }).then(
      (data) => setThemes(data),
    )
    console.log('user', user, 'token', token)
    if (user && token) {
      void useFetch<IPostEntity[]>({ path: '/posts', alerts: false }).then(
        (data) => setPosts(data),
      )
    } else {
      void useFetch<IPostEntity[]>({
        path: '/posts/short',
        alerts: false,
      }).then((data) => setPosts(data))
    }
  }, [user, token])
}
