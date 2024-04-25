import { StateProvider } from '@/states/state'
import '@/styles/globals/globals.css'
import type { AppProps } from 'next/app'
import { Header } from './index'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <Header />
      <Component {...pageProps} />
    </StateProvider>
  )
}
