import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPlus, FaFillDrip, FaTachometerAlt } from 'react-icons/fa'

import { api } from '@services/api'

type Adverts = {
  chassi: string
  empresa: {
    idEmpresa: number
    cnpj: number
    nomeFantasia: string
    cidade: {
      codCidade: number
      nomeCidade: string
      uf: string
    }
  }
  foto: string
  marca: string
  modelo: string
  ano: number
  horimetro: number
  corExterna: string
  preco: number
  categoria: string
  favorito: boolean
}

export function NoLogued() {
  const [useLoading, setLoading] = useState(true)
  const [adverts, setAdverts] = useState<Adverts[] | any>(null)

  useEffect(() => {
    api
      .get('/anuncios/gerais')
      .then(response => {
        if (response.data.mensagem.erro !== true) {
          setAdverts(response.data.anuncios)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div className="container">
        <h1 className="text-4xl font-black text-center text-color-light">
          Como funciona?
        </h1>
        <div className="grid gap-x-4 gap-y-24 mt-28 lg:grid-cols-4">
          <div className="bg-primary rounded shadow-sm px-6 py-7 relative">
            <div className="-top-16 left-0 right-0 absolute">
              <img src="./estoque_nacional.png" className="h-32 mx-auto w-32" />
            </div>
            <div className="pt-16">
              <p className="font-bold text-center text-color-light">
                Estoque Nacional
              </p>
              <p className="font-light mt-5 text-center text-color-medium">
                Acesso ao maior número de equipamentos em uma plataforma
              </p>
            </div>
          </div>
          <div className="bg-primary rounded shadow-sm px-6 py-7 relative">
            <div className="-top-16 left-0 right-0 absolute">
              <img
                src="./captacao_equipamento.png"
                className="h-32 mx-auto w-32"
              />
            </div>
            <div className="pt-16">
              <p className="font-bold text-center text-color-light">
                Captação de Equipamentos
              </p>
              <p className="font-light mt-5 text-center text-color-medium">
                Compre direto das concessionárias, revendas ou de clientes com
                interesse em venda.
              </p>
            </div>
          </div>
          <div className="bg-primary rounded shadow-sm px-6 py-7 relative">
            <div className="-top-16 left-0 right-0 absolute">
              <img src="./elimine_inter.png" className="h-32 mx-auto w-32" />
            </div>
            <div className="pt-16">
              <p className="font-bold text-center text-color-light">
                Elimine Intermediários
              </p>
              <p className="font-light mt-5 text-center text-color-medium">
                Ambiente seguro para empresas do ramo
              </p>
            </div>
          </div>
          <div className="bg-primary rounded shadow-sm px-6 py-7 relative">
            <div className="-top-16 left-0 right-0 absolute">
              <img src="./compraevenda.png" className="h-32 mx-auto w-32" />
            </div>
            <div className="pt-16">
              <p className="font-bold text-center text-color-light">
                Compra e Venda para especialistas
              </p>
              <p className="font-light mt-5 text-center text-color-medium">
                Negociações com os especialistas do mercado
              </p>
            </div>
          </div>

          <div className="bg-primary rounded shadow-sm px-6 py-7 relative">
            <div className="-top-16 left-0 right-0 absolute">
              <img src="./checklist.png" className="h-32 mx-auto w-32" />
            </div>
            <div className="pt-16">
              <p className="font-bold text-center text-color-light">
                Checklist
              </p>
              <p className="font-light mt-5 text-center text-color-medium">
                Detalhamento completo do equipamento
              </p>
            </div>
          </div>
          <div className="bg-primary rounded shadow-sm px-6 py-7 relative">
            <div className="-top-16 left-0 right-0 absolute">
              <img src="./avaliacao.png" className="h-32 mx-auto w-32" />
            </div>
            <div className="pt-16">
              <p className="font-bold text-center text-color-light">
                Avaliações
              </p>
              <p className="font-light mt-5 text-center text-color-medium">
                Avalie os equipamentos que você quer comprar
              </p>
            </div>
          </div>
          <div className="bg-primary rounded shadow-sm px-6 py-7 relative">
            <div className="-top-16 left-0 right-0 absolute">
              <img src="./repasses.png" className="h-32 mx-auto w-32" />
            </div>
            <div className="pt-16">
              <p className="font-bold text-center text-color-light">Repasses</p>
              <p className="font-light mt-5 text-center text-color-medium">
                Acesso à uma grande quantidade de equipamentos diretamente dos
                concessionários
              </p>
            </div>
          </div>
          <div className="bg-primary rounded shadow-sm px-6 py-7 relative">
            <div className="-top-16 left-0 right-0 absolute">
              <img
                src="./empresas_parceiras.png"
                className="h-32 mx-auto w-32"
              />
            </div>
            <div className="pt-16">
              <p className="font-bold text-center text-color-light">
                Empresas Parceiras
              </p>
              <p className="font-light mt-5 text-center text-color-medium">
                Vejam nossos parceiros
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary my-28 py-10 text-center w-full">
        <div className="container relative">
          <img
            src="./planshand.png"
            className="hidden h-40 right-0 absolute w-40 lg:block"
          />
          <a
            href="/plans"
            className="text-4xl font-black tracking-wide text-white underline uppercase"
          >
            Clique aqui e conheça nossos planos
          </a>
        </div>
      </div>
      <div className="container items-center justify-between py-14 space-y-10 lg:flex lg:space-y-0">
        <p className="text-4xl font-bold text-center text-color-info lg:text-left lg:w-1/3">
          Assista nosso vídeo e confira como vender ou comprar de forma rápida,
          simples e fácil.
        </p>
        <div className="h-80 relative w-full lg:w-1/2">
          <iframe
            className="h-80 relative w-full z-20"
            src="https://www.youtube.com/embed/mvGMhCxjIuI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="bg-secondary rounded-md shadow-md hidden h-80 -left-5 top-5 absolute w-full z-10 lg:block"></div>
        </div>
      </div>
      <div className="mt-28 my-14 w-full">
        <div className="container">
          <span className="bg-tertiary rounded-t text-4xl font-black px-10 py-4 text-white z-0">
            Vantagens
          </span>
        </div>
        <div className="bg-secondary mt-4 relative z-10">
          <div className="container items-center justify-between py-20 lg:flex">
            <div className="w-full lg:w-1/2">
              <img src="./benefits.png" alt="Benifts" />
            </div>
            <div>
              <span className="items-center flex my-5">
                <p className="bg-tertiary rounded-l text-lg font-bold px-3 py-3 text-white w-80 lg:px-10">
                  Ambiente Seguro
                </p>
                <i className="bg-color-info rounded-r text-2xl font-bold px-3.5 py-3.5 text-white">
                  <FaPlus />
                </i>
              </span>
              <span className="items-center flex my-5">
                <p className="bg-tertiary rounded-l text-lg font-bold px-3 py-3 text-white w-80 lg:px-10">
                  Sem intermediários
                </p>
                <i className="bg-color-info rounded-r text-2xl font-bold px-3.5 py-3.5 text-white">
                  <FaPlus />
                </i>
              </span>
              <span className="items-center flex my-5">
                <p className="bg-tertiary rounded-l text-lg font-bold px-3 py-3 text-white w-80 lg:px-10">
                  Preços diferenciados
                </p>
                <i className="bg-color-info rounded-r text-2xl font-bold px-3.5 py-3.5 text-white">
                  <FaPlus />
                </i>
              </span>
              <span className="items-center flex my-5">
                <p className="bg-tertiary rounded-l text-lg font-bold px-3 py-3 text-white w-80 lg:px-10">
                  Avaliações com informações
                </p>
                <i className="bg-color-info rounded-r text-2xl font-bold px-3.5 py-3.5 text-white">
                  <FaPlus />
                </i>
              </span>
              <span className="items-center flex my-5">
                <p className="bg-tertiary rounded-l text-lg font-bold px-3 py-3 text-white w-80 lg:px-10">
                  Avaliação por especialistas
                </p>
                <i className="bg-color-info rounded-r text-2xl font-bold px-3.5 py-3.5 text-white">
                  <FaPlus />
                </i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-28">
        <div>
          <h1 className="text-3xl font-black text-color-light">
            Anúncios em Destaque
          </h1>
          <hr className="bg-color-info rounded-full border-0 mt-1 p-1 w-1/12" />
        </div>
        {useLoading ? (
          <div className="grid gap-5 mt-10 lg:grid-cols-4">
            <div className="animate-pulse bg-gray-300 rounded shadow-sm h-96"></div>
            <div className="animate-pulse bg-gray-300 rounded shadow-sm h-96"></div>
            <div className="animate-pulse bg-gray-300 rounded shadow-sm h-96"></div>
            <div className="animate-pulse bg-gray-300 rounded shadow-sm h-96"></div>

            <div className="animate-pulse bg-gray-300 rounded shadow-sm h-96"></div>
            <div className="animate-pulse bg-gray-300 rounded shadow-sm h-96"></div>
            <div className="animate-pulse bg-gray-300 rounded shadow-sm h-96"></div>
            <div className="animate-pulse bg-gray-300 rounded shadow-sm h-96"></div>
          </div>
        ) : adverts && adverts.length >= 1 ? (
          <div className="grid gap-5 mt-10 lg:grid-cols-4">
            {adverts.map((a: Adverts) => {
              return (
                <div className="bg-primary rounded shadow-sm flex flex-col justify-between">
                  <div className="bg-secondary rounded-t h-72 relative md:h-52">
                    <img
                      src={a.foto}
                      alt="Equipment Image"
                      className="rounded-t h-72 object-cover object-center w-full md:h-52"
                    />
                  </div>
                  <div className="p-5">
                    <h1 className="text-xl font-black text-color-light">
                      {a.marca}
                    </h1>
                    <p className="font-medium -mt-1 text-color-light">
                      {a.modelo}, <small>{a.ano}</small>
                    </p>
                  </div>
                  <div className="px-5">
                    <p className="items-center flex text-sm font-light text-color-medium">
                      <FaTachometerAlt className="mr-1.5" />
                      {new Intl.NumberFormat().format(a.horimetro)}
                      {' Horas'}
                    </p>
                    <p className="items-center flex text-sm font-light text-color-medium">
                      <FaFillDrip className="mr-1.5" />
                      {a.corExterna}
                    </p>
                  </div>
                  <div className="p-5 pt-8">
                    <Link
                      href={`/announcement/equipment?chassi=${a.chassi}&id=${a.empresa.idEmpresa}`}
                      passHref
                    >
                      <a className="bg-color-info rounded block text-lg font-black hover:opacity-75 focus:outline-none py-3 text-center text-white delay-100 transition w-full">
                        Ver mais
                      </a>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
