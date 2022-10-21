import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

import { usePageLoading } from '../hooks/usePageLoading'
import { Toaster } from 'react-hot-toast'
import Spinner from '../hooks/useSpinner'
import theme from '../styles/customTheme'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { isPageLoading } = usePageLoading()
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Toaster />
        {isPageLoading ? <Spinner /> : <Component {...pageProps} />}
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
