import { Layout } from '@components/auth/layout'
import { RegisterForm } from '@components/auth/register'
import { api } from '@services/api'
import { withSSRGuest } from '@utils/withSSRGuest'
import axios from 'axios'

export default function Register(props: any) {
  return (
    <Layout title="Cadastrar">
      <RegisterForm cities={props.cities} banks={props.banks} />
    </Layout>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  const response = await api.get('/empresas/cidades/--')
  const banks = await axios.get(
    'https://raw.githubusercontent.com/guibranco/BancosBrasileiros/master/data/bancos.json'
  )
  return { props: { cities: response.data.cidades, banks: banks.data } }
})
