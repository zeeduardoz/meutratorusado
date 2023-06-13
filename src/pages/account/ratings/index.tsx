import { Layout } from '@components/utils/layout'
import { withSSRAuth } from '@utils/withSSRAuth'
import { Sidebar } from '@components/account/sidebar'
// import { ListRating } from '@components/account/rating'

const info = {
  page: 'Minhas Avaliações',
  description: ''
}

export default function Ratings() {
  return (
    <Layout title="Minhas Avaliações" header={info}>
      <div className="container py-14 w-full">
        <div className="items-start rounded w-full lg:flex">
          <Sidebar info={info} />
          <div className="bg-primary rounded-md my-2 p-8 w-full lg:rounded-l-none lg:rounded-r-md lg:w-3/4">
            {/* <ListRating /> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return { props: {} }
})
