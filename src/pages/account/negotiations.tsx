import { useContext } from 'react'

import { Layout } from '@components/utils/layout'
import { withSSRAuth } from '@utils/withSSRAuth'
import { Sidebar } from '@components/account/sidebar'
import { Chat } from '@components/account/chat'
import { AuthContext } from '@contexts/AuthContext'

const info = {
  page: 'Minhas Negociações',
  description: ''
}

export default function Negotiations(props: any) {
  const { useUser } = useContext(AuthContext)

  return (
    <Layout title="Minhas Negociações" header={info}>
      <div className="container py-14 w-full">
        <div className="items-start rounded w-full lg:flex">
          <Sidebar info={info} />
          <div className="bg-primary rounded-md my-2 p-8 w-full lg:rounded-l-none lg:rounded-r-md lg:w-3/4">
            {useUser ? <Chat initial={props} /> : <></>}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const chassi = ctx.query.chassi ? ctx.query.chassi : 'null'
  const id = ctx.query.chassi ? ctx.query.id : 0
  return { props: { chassi, id } }
})
