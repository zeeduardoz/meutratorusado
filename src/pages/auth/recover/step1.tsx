import { Layout } from '@components/auth/layout'
import { RecoverPassStep1Form } from '@components/auth/recover/step1'
import { withSSRGuest } from '@utils/withSSRGuest'

export default function RecoverStep1() {
  return (
    <Layout title="Recuperar">
      <RecoverPassStep1Form />
    </Layout>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return { props: {} }
})
