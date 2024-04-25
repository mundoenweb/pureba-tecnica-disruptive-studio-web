export interface IStateGlobal {
  user: IUserEntity | null
  userPosts: IPostEntity[] | []
  categories: ICategoryEntity[] | []
  themes: IThemesEntity[] | []
  posts: IPostEntity[] | []
  token: string | null
  currentTheme: string
  filterSearch: string[] | undefined
}

export interface paramSetUser {
  user: IUserEntity
  token: string
}

export interface ISetStateContext {
  setUser: (user?: paramSetUser | null) => void
  setCategories: (categories: ICategoryEntity[]) => void
  setThemes: (themes: IThemesEntity[]) => void
  setPosts: (posts: IPostEntity[]) => void
  setUserPosts: (posts: IPostEntity[]) => void
  setCurrentTheme: (currentTheme: string) => void
  setFilterSearch: (filterSearch: string) => void
}

export interface ICategoryEntity {
  id: string
  name: string
  createdAt?: string
  updatedAt?: string
}

export interface IPostEntity {
  id: string
  name: string
  image?: string
  video?: string
  text?: string
  theme: IThemesEntity
  user: IUserEntity
  createdAt?: string
  updatedAt?: string
}

export interface IThemesEntity {
  id: string
  name: string
  image: string
  categories: ICategoryEntity[] | string[]
  createdAt?: string
  updatedAt?: string
}

export interface IUserEntity {
  id: string
  username: string
  email: string
  rol: IRoleEntity
  credits: number
  createdAt: string
  updatedAt: string
}

export interface IRoleEntity {
  name: string
  role: number
}
