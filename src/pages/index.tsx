import { useContext } from 'react'
import { setCookie } from 'nookies'

import { Layout } from '@components/utils/layout'
import { AuthContext } from '@contexts/AuthContext'
import { Logued } from '@components/home/logued'
import { NoLogued } from '@components/home/noLogued'
import { api } from '@services/api'

const info = {
  page: 'Início',
  description: ''
}

export default function Home() {
  const { useUser } = useContext(AuthContext)

  return (
    <Layout title="Início" header={info}>
      <div className="pb-14 pt-5 w-full">
        {useUser ? <Logued /> : <NoLogued />}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx: any) {
  if (ctx.query.activated) {
    const response = await api.get(`/notificaCadastro/${ctx.query.activated}`)
    if (response.data.erro !== true) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false
        }
      }
    } else {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  }

  if (ctx.query.token) {
    setCookie(undefined, '@mtu/recoverToken', ctx.query.token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })
    return {
      redirect: {
        destination: '/auth/recover/step3',
        permanent: false
      }
    }
  }

  return { props: {} }
}
