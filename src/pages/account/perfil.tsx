import axios from 'axios'

import { Layout } from '@components/utils/layout'
import { withSSRAuth } from '@utils/withSSRAuth'
import { Sidebar } from '@components/account/sidebar'
import { PerfilUpdate } from '@components/account/perfil'
import { api } from '@services/api'

const info = {
  page: 'Minha Conta',
  description: ''
}

export default function Perfil(props: any) {
  return (
    <Layout title="Minha Conta" header={info}>
      <div className="container py-14 w-full">
        <div className="items-start rounded w-full lg:flex">
          <Sidebar info={info} />
          <div className="bg-primary rounded-md my-2 p-8 w-full lg:rounded-l-none lg:rounded-r-md lg:w-3/4">
            <PerfilUpdate cities={props.cities} banks={props.banks} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  const response = await api.get('/empresas/cidades/--')
  const banks = await axios.get(
    'https://raw.githubusercontent.com/guibranco/BancosBrasileiros/master/data/bancos.json'
  )
  return { props: { cities: response.data.cidades, banks: banks.data } }
})
