import { Layout } from '@components/utils/layout'
import { FaCommentsDollar, FaGifts, FaPercentage } from 'react-icons/fa'

const info = {
  page: 'Revendas',
  description: ''
}

export default function Resales() {
  return (
    <Layout title="Revendas" header={info}>
      <div className="container py-14 w-full">
        <div className="flex flex-col text-gray-50 md:grid">
          <div className="flex md:contents">
            <div className="col-end-4 col-start-2 mr-10 relative md:mx-auto">
              <div className="items-center flex h-full justify-center w-6">
                <div className="bg-tertiary h-full pointer-events-none w-1"></div>
              </div>
              <div className="items-center bg-tertiary rounded-full shadow flex h-8 top-1/2 justify-center -ml-1 -mt-3 absolute text-center w-8">
                <FaGifts />
              </div>
            </div>
            <div className="col-end-12 col-start-4 mr-auto my-10 px-5 w-full lg:pl-10">
              <h3 className="text-2xl font-black mb-2 text-color-light">
                Benefícios para a concessionária
              </h3>
              <p className="font-light leading-tight text-justify text-color-medium w-full">
                A melhora na ligação entre concessionária e loja, promovida pela
                plataforma, cria um ambiente simples e eficaz para o cliente,
                favorecendo na captação de tratores para o seu estoque,
                fortalecendo seu negócio, evitando assim a perda de vendas e
                trazendo soluções aos usuários finais dos equipamentos.
              </p>
            </div>
          </div>
          <div className="flex md:contents">
            <div className="col-end-4 col-start-2 mr-10 relative md:mx-auto">
              <div className="items-center flex h-full justify-center w-6">
                <div className="bg-tertiary h-full pointer-events-none w-1"></div>
              </div>
              <div className="items-center bg-tertiary rounded-full shadow flex h-8 top-1/2 justify-center -ml-1 -mt-3 absolute text-center w-8">
                <FaCommentsDollar />
              </div>
            </div>
            <div className="col-end-12 col-start-4 mr-auto my-10 px-5 w-full lg:pl-10">
              <h3 className="text-2xl font-black mb-2 text-color-light">
                Negociações
              </h3>
              <p className="font-light leading-tight text-justify text-color-medium w-full">
                Para trazer mais simplicidade nas negociações o concessionário
                ou lojista poderá cadastrar seus equipamentos na plataforma sem
                complicações. Basta incluir todas as informações do trator, tais
                como fotos, checklist, revisões e demais documentos que
                auxiliarão na venda.
              </p>
            </div>
          </div>
          <div className="flex md:contents">
            <div className="col-end-4 col-start-2 mr-10 relative md:mx-auto">
              <div className="items-center flex h-full justify-center w-6">
                <div className="bg-tertiary h-full pointer-events-none w-1"></div>
              </div>
              <div className="items-center bg-tertiary rounded-full shadow flex h-8 top-1/2 justify-center -ml-1 -mt-3 absolute text-center w-8">
                <FaPercentage />
              </div>
            </div>
            <div className="col-end-12 col-start-4 mr-auto my-10 px-5 w-full lg:pl-10">
              <h3 className="text-2xl font-black mb-2 text-color-light">
                Por que devo vender utilizando a plataforma?
              </h3>
              <p className="font-light leading-tight text-justify text-color-medium w-full">
                A integração da comunicação entre empresas e lojas, permite que
                as transações comerciais feitas pelo “Meu Trator Usado” sejam
                muito mais vantajosas. Com uma base muito mais ampla retornamos
                para o vendedor 50% da comissão de venda cobrada do comprador.
                Dentro do sistema o vendedor e comprador terão a segurança de
                transacionar em ambiente seguro com pedidos eletrônicos
                confirmando as transações, onde será possível emitir o boleto e
                anexar a Nota Fiscal de venda na plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
