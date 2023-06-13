import { Layout } from '@components/auth/layout'
import { withSSRGuest } from '@utils/withSSRGuest'

export default function RecoverStep2() {
  return (
    <Layout title="Recuperar">
      <div className="flex flex-col h-screen justify-center p-14 w-full">
        <div>
          <h1 className="text-5xl font-black text-color-light">
            Confirmar Cadastro
          </h1>
          <p className="text-xl font-light text-color-medium">
            Siga as informações abaixo, para prosseguir!
          </p>
          <p className="text-xl font-light mt-10 text-color-info">
            Foi enviado uma confirmação para o e-mail informado, clique no link
            enviado para realizar a confirmação!
          </p>
          <p className="font-light mt-5 text-color-danger">
            Atenção: Caso o e-mail de confirmação não tenha chegado após 5
            minutos, entre em contato conosco!
          </p>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return { props: {} }
})
