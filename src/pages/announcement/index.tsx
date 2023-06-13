import { parseCookies } from 'nookies'

import { Layout } from '@components/utils/layout'
import { Search } from '@components/announcement/search'
import { List } from '@components/announcement/list'
import { api } from '@services/api'
import { withSSRAuth } from '@utils/withSSRAuth'

const info = {
  page: 'Anúncios',
  description: ''
}

export default function Ads(props: any) {
  return (
    <Layout title="Anúncios" header={info}>
      <div className="pb-14 pt-5 w-full">
        <div className="container items-start justify-between md:flex md:space-x-10">
          <Search
            cities={props.cities}
            brands={props.brands}
            models={props.models}
          />
          <List uf={props.uf} city={props.city} />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const { '@mtu/token': token } = parseCookies(ctx)

  const responseCities = await api.get('/empresas/cidades/--')
  const responseMarcas = await api.get('/meusEquipamentos/marcas', {
    headers: { 'Token-Trator': token }
  })
  const responseModelos = await api.get('/meusEquipamentos/modelos/0', {
    headers: { 'Token-Trator': token }
  })

  const uf = ctx.query.uf ? ctx.query.uf : ''
  const city = ctx.query.city ? ctx.query.city : ''

  return {
    props: {
      cities: responseCities.data.cidades,
      brands: responseMarcas.data.marcas,
      models: responseModelos.data.modelos,
      uf,
      city
    }
  }
})
