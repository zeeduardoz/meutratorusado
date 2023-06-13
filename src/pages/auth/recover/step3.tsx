import { Layout } from '@components/auth/layout'
import { RecoverPassStep3Form } from '@components/auth/recover/step3'
import { withSSRGuest } from '@utils/withSSRGuest'
import { parseCookies } from 'nookies'

export default function RecoverStep3() {
  return (
    <Layout title="Recuperar">
      <RecoverPassStep3Form />
    </Layout>
  )
}

export const getServerSideProps = withSSRGuest(async ctx => {
  const { '@mtu/recoverToken': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/auth/recover/step2',
        permanent: false
      }
    }
  }

  return { props: {} }
})
