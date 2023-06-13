import { Layout } from '@components/utils/layout'
import { policy } from '@utils/parameters'

const info = {
  page: 'Política de Privacidade',
  description: ''
}

export default function PrivacyPolicy() {
  return (
    <Layout title="Política de Privacidade" header={info}>
      <div className="container bg-primary rounded py-14 w-full">
        <div
          className="px-8 text-color-light"
          dangerouslySetInnerHTML={{ __html: policy }}
        />
      </div>
    </Layout>
  )
}
