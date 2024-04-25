import React, { useState, useContext, useEffect } from 'react'
import {
  ICategoryEntity,
  IPostEntity,
  ISetStateContext,
  IStateGlobal,
  IThemesEntity,
  IUserEntity,
  paramSetUser,
} from './state.interface'

export const stateContext = React.createContext<IStateGlobal>(
  {} as unknown as IStateGlobal,
)
const setStateContext = React.createContext<ISetStateContext>(
  {} as unknown as ISetStateContext,
)

export const useStateContext = () => {
  return useContext(stateContext)
}

export const useSetStateContext = () => {
  return useContext(setStateContext)
}

export const StateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, setState] = useState<IStateGlobal>({
    categories: [],
    themes: [],
    posts: [],
    userPosts: [],
    user: null as unknown as IUserEntity,
    token: null,
    currentTheme: 'all',
    filterSearch: undefined,
  })

  useEffect(() => {
    console.log('state', state)
  }, [state])

  const setUser = (user: paramSetUser | null = null) => {
    setState((prevState) => ({
      ...prevState,
      user: user?.user ?? null,
      token: user?.token ?? null,
    }))
  }

  const setUserPosts = (userPosts: IPostEntity[] = []) => {
    setState((prevState) => ({
      ...prevState,
      userPosts,
    }))
  }

  const setThemes = (themes: IThemesEntity[] = []) => {
    setState((prevState) => ({
      ...prevState,
      themes,
    }))
  }

  const setCategories = (categories: ICategoryEntity[] = []) => {
    setState((prevState) => ({
      ...prevState,
      categories,
    }))
  }

  const setPosts = (posts: IPostEntity[] = []) => {
    setState((prevState) => ({
      ...prevState,
      posts,
    }))
  }

  const setCurrentTheme = (currentTheme: string) => {
    setState((prevState) => ({
      ...prevState,
      currentTheme,
    }))
  }

  const setFilterSearch = (filterSearch: string) => {
    setState((prevState) => ({
      ...prevState,
      filterSearch: filterSearch.toLowerCase().split(' '),
    }))
  }

  return (
    <stateContext.Provider value={state}>
      <setStateContext.Provider
        value={{
          setUser,
          setCategories,
          setThemes,
          setPosts,
          setUserPosts,
          setCurrentTheme,
          setFilterSearch,
        }}
      >
        {children}
      </setStateContext.Provider>
    </stateContext.Provider>
  )
}
