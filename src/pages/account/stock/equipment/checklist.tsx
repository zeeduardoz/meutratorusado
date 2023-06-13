import { parseCookies } from 'nookies'

import { Layout } from '@components/utils/layout'
import { withSSRAuth } from '@utils/withSSRAuth'
import { Sidebar } from '@components/account/sidebar'
import { Header } from '@components/account/stock/equipment/header'
import { api } from '@services/api'

const info = {
  page: 'Checklist',
  description: ''
}

export default function Checklist(props: any) {
  return (
    <Layout title="Checklist" header={info}>
      <div className="container py-14 w-full">
        <div className="items-start rounded w-full lg:flex">
          <Sidebar info={info} />
          <div className="bg-primary rounded-md my-2 p-8 w-full lg:rounded-l-none lg:rounded-r-md lg:w-3/4">
            <Header info={info} equipment={props.equipment} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const { '@mtu/token': token } = parseCookies(ctx)

  if (!ctx.query.chassi) {
    return {
      redirect: {
        destination: '/account/stock',
        permanent: false
      }
    }
  }

  const response = await api.get(`/meusEquipamentos/${ctx.query.chasssi}`, {
    headers: { 'Token-Trator': token }
  })

  if (!response.data.equipamento) {
    return {
      redirect: {
        destination: '/account/stock',
        permanent: false
      }
    }
  }

  return { props: { equipment: response.data.equipamento } }
})
