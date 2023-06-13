import { Layout } from '@components/utils/layout'
import { FaDotCircle, FaEye, FaLightbulb } from 'react-icons/fa'

const info = {
  page: 'Sobre',
  description: ''
}

export default function About() {
  return (
    <Layout title="Sobre" header={info}>
      <div className="container py-14 w-full">
        <div className="flex flex-col text-gray-50 md:grid">
          <div className="flex md:contents">
            <div className="col-end-4 col-start-2 mr-10 relative md:mx-auto">
              <div className="items-center flex h-full justify-center w-6">
                <div className="bg-tertiary h-full pointer-events-none w-1"></div>
              </div>
              <div className="items-center bg-tertiary rounded-full shadow flex h-8 top-1/2 justify-center -ml-1 -mt-3 absolute text-center w-8">
                <FaLightbulb />
              </div>
            </div>
            <div className="col-end-12 col-start-4 mr-auto my-10 px-5 w-full lg:pl-10">
              <h3 className="text-2xl font-black mb-2 text-color-light">
                Quem somos
              </h3>
              <p className="font-light leading-tight text-justify text-color-medium w-full">
                Somos o Meu Trator Usado, uma plataforma inovadora que surgiu
                para “desburocratizar” o mercado de compra e venda de tratores
                usados no Brasil, criando relacionamento entre empresas do
                segmento e simplificando as negociações. As empresas terão ao
                seu alcance estoques de tratores usados a nível nacional para
                oferecer aos seus clientes finais.
              </p>
            </div>
          </div>
          <div className="flex md:contents">
            <div className="col-end-4 col-start-2 mr-10 relative md:mx-auto">
              <div className="items-center flex h-full justify-center w-6">
                <div className="bg-tertiary h-full pointer-events-none w-1"></div>
              </div>
              <div className="items-center bg-tertiary rounded-full shadow flex h-8 top-1/2 justify-center -ml-1 -mt-3 absolute text-center w-8">
                <FaDotCircle />
              </div>
            </div>
            <div className="col-end-12 col-start-4 mr-auto my-10 px-5 w-full lg:pl-10">
              <h3 className="text-2xl font-black mb-2 text-color-light">
                Missão
              </h3>
              <p className="font-light leading-tight text-justify text-color-medium w-full">
                Conectar os estoques de equipamentos usados no Brasil tendo como
                objetivo principal acesso à informação e que os concessionários
                e lojistas não percam vendas por falta de equipamentos. Agregar
                valor a venda de equipamentos usados com o uso de tecnologia,
                conectando os estoques às demandas por equipamentos nos quatro
                cantos do país, maximizando a lucratividade de concessionários e
                dos usuários destes equipamentos.
              </p>
            </div>
          </div>
          <div className="flex md:contents">
            <div className="col-end-4 col-start-2 mr-10 relative md:mx-auto">
              <div className="items-center flex h-full justify-center w-6">
                <div className="bg-tertiary h-full pointer-events-none w-1"></div>
              </div>
              <div className="items-center bg-tertiary rounded-full shadow flex h-8 top-1/2 justify-center -ml-1 -mt-3 absolute text-center w-8">
                <FaEye />
              </div>
            </div>
            <div className="col-end-12 col-start-4 mr-auto my-10 px-5 w-full lg:pl-10">
              <h3 className="text-2xl font-black mb-2 text-color-light">
                Visão
              </h3>
              <p className="font-light leading-tight text-justify text-color-medium w-full">
                Sermos a ferramenta mais útil e por consequência mais acessada
                pelo mercado de equipamentos usados no Brasil. Sermos lembrados
                como referência no mercado nacional de venda de tratores usados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
