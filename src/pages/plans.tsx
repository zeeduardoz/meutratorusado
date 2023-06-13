import { Layout } from '@components/utils/layout'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const info = {
  page: 'Planos',
  description: ''
}

export default function Plans() {
  return (
    <Layout title="Planos" header={info}>
      <div className="container py-14 w-full">
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="bg-primary rounded shadow-sm px-7 py-8">
            <img src="./planbronze.png" alt="Bronze" className="h-36 mx-auto" />
            <p className="text-2xl font-black py-10 text-center text-color-light">
              Plano Bronze
            </p>
            <div className="text-left">
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                1 Usuários Liberados
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Avaliação de Usados
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Compartilhamento de comissão
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaTimesCircle className="text-lg mr-2 mt-0.5 text-color-danger" />
                Anúncios em destaque
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaTimesCircle className="text-lg mr-2 mt-0.5 text-color-danger" />
                Acesso ao nome dos vendedores
              </p>
            </div>
            <p className="text-2xl font-bold my-10 text-center text-color-light">
              <small className="text-sm font-light">R$</small> 199,00
            </p>
            <a className="bg-color-success rounded cursor-not-allowed block text-xl font-bold hover:opacity-75 py-3 text-center text-white delay-150 duration-300 transition">
              Comprar
            </a>
          </div>
          <div className="bg-primary rounded shadow-sm px-7 py-8">
            <img src="./planprata.png" alt="Prata" className="h-36 mx-auto" />
            <p className="text-2xl font-black py-10 text-center text-color-light">
              Plano Prata
            </p>
            <div className="text-left">
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                2 Usuários Liberados
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Avaliação de Usados
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Compartilhamento de comissão
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                10 Anúncios em destaque
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaTimesCircle className="text-lg mr-2 mt-0.5 text-color-danger" />
                Acesso ao nome dos vendedores
              </p>
            </div>
            <p className="text-2xl font-bold my-10 text-center text-color-light">
              <small className="text-sm font-light">R$</small> 299,00
            </p>
            <a className="bg-color-success rounded cursor-not-allowed block text-xl font-bold hover:opacity-75 py-3 text-center text-white delay-150 duration-300 transition">
              Comprar
            </a>
          </div>
          <div className="bg-primary rounded shadow-sm px-7 py-8">
            <img src="./planouro.png" alt="Ouro" className="h-36 mx-auto" />
            <p className="text-2xl font-black py-10 text-center text-color-light">
              Plano Ouro
            </p>
            <div className="text-left">
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                10 Usuários Liberados
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Avaliação de Usados
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Compartilhamento de comissão
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                15 Anúncios em destaque
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Acesso ao nome dos vendedores
              </p>
            </div>
            <p className="text-2xl font-bold my-10 text-center text-color-light">
              <small className="text-sm font-light">R$</small> 399,00
            </p>
            <a className="bg-color-success rounded cursor-not-allowed block text-xl font-bold hover:opacity-75 py-3 text-center text-white delay-150 duration-300 transition">
              Comprar
            </a>
          </div>
          <div className="bg-primary rounded shadow-sm px-7 py-8">
            <img
              src="./plandiamante.png"
              alt="Diamante"
              className="h-36 mx-auto"
            />
            <p className="text-2xl font-bold py-10 text-center text-color-light">
              Plano Ouro
            </p>
            <div className="text-left">
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Usuários Ilimitados
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Avaliação de Usados
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Compartilhamento de comissão
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                30 Anúncios em destaque
              </p>
              <p className="flex font-light py-1 text-color-medium">
                <FaCheckCircle className="text-lg mr-2 mt-0.5 text-color-success" />
                Acesso ao nome dos vendedores
              </p>
            </div>
            <p className="text-2xl font-bold my-10 text-center text-color-light">
              <small className="text-sm font-light">R$</small> 499,00
            </p>
            <a className="bg-color-success rounded cursor-not-allowed block text-xl font-bold hover:opacity-75 py-3 text-center text-white delay-150 duration-300 transition">
              Comprar
            </a>
          </div>
        </div>
        <p className="text-sm mt-5 text-color-medium">
          Sistema PAGE e USE, pagamentos efetuados através de boletos bancários.
        </p>
      </div>
    </Layout>
  )
}
