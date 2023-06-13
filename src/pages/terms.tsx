import { Layout } from '@components/utils/layout'
import { terms } from '@utils/parameters'

const info = {
  page: 'Termos de Uso',
  description: ''
}

export default function Terms() {
  return (
    <Layout title="Termos de Uso" header={info}>
      <div className="container bg-primary rounded py-14 w-full">
        <div
          className="px-8 text-color-light"
          dangerouslySetInnerHTML={{ __html: terms }}
        />
      </div>
    </Layout>
  )
}
