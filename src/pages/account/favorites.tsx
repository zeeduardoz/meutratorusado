import { Layout } from '@components/utils/layout'
import { withSSRAuth } from '@utils/withSSRAuth'
import { Sidebar } from '@components/account/sidebar'
import { ListFavorites } from '@components/account/favorites'

const info = {
  page: 'Meus Favoritos',
  description: ''
}

export default function Favorites() {
  return (
    <Layout title="Meus Favoritos" header={info}>
      <div className="container py-14 w-full">
        <div className="items-start rounded w-full lg:flex">
          <Sidebar info={info} />
          <div className="bg-primary rounded-md my-2 p-8 w-full lg:rounded-l-none lg:rounded-r-md lg:w-3/4">
            <ListFavorites />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return { props: {} }
})
