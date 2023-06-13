import { Layout } from '@components/utils/layout'
import { withSSRAuth } from '@utils/withSSRAuth'
import { Sidebar } from '@components/account/sidebar'
import { ListStock } from '@components/account/stock/list'
import { parseCookies } from 'nookies'
import { api } from '@services/api'

const info = {
  page: 'Meus Equipamentos',
  description: ''
}

export default function Stock(props: any) {
  return (
    <Layout title="Meus Equipamentos" header={info}>
      <div className="container py-14 w-full">
        <div className="items-start rounded w-full lg:flex">
          <Sidebar info={info} />
          <div className="bg-primary rounded-md my-2 p-8 w-full lg:rounded-l-none lg:rounded-r-md lg:w-3/4">
            <ListStock brands={props.brands} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const { '@mtu/token': token } = parseCookies(ctx)

  const response = await api.get(`/meusEquipamentos/marcas`, {
    headers: { 'Token-Trator': token }
  })

  return { props: { brands: response.data.marcas } }
})
