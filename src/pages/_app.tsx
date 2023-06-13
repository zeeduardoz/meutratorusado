/* eslint-disable import/extensions */
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/thumbs/thumbs.min.css'

import { AuthProvider } from '@contexts/AuthContext'
import { UserProvider } from '@contexts/UserContext'
import { AdvertsProvider } from '@contexts/AdvertsContext'
import { StockProvider } from '@contexts/StockContext'
import { NegotiationProvider } from '@contexts/NegotiationsContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider enableSystem={false}>
          <ToastContainer
            autoClose={3000}
            position="top-right"
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
          />

          <AdvertsProvider>
            <StockProvider>
              <NegotiationProvider>
                <Component {...pageProps} />
              </NegotiationProvider>
            </StockProvider>
          </AdvertsProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  )
}
export default MyApp
