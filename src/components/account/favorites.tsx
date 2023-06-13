import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useState, useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

import { api } from '@services/api'
import { AlertSuccess } from '@hooks/useAlert'

type FavoriteProps = {
  idProprietarioMaquina: number
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
  chassi: string
  foto: string
  marca: string
  modelo: string
  ano: number
  horimetro: number
  corExterna: string
  preco: number
  favorito: boolean
}

export function ListFavorites() {
  const [update, setUpdate] = useState<number>(0)
  const [favorites, setFavorites] = useState<FavoriteProps[] | any>(null)
  const [useLoading, setLoading] = useState<boolean>(!favorites)

  useEffect(() => {
    const { '@mtu/token': token } = parseCookies()

    if (token) {
      try {
        api
          .get(`/equipamentosDeTerceiros/favoritos`, {
            headers: { 'Token-Trator': token }
          })
          .then(response => {
            if (response.data.mensagem.erro !== true) {
              setFavorites(response.data.anuncios)
              setLoading(false)
            }
          })
      } catch (e) {
        console.log(e)
      }
    }
  }, [update])

  async function handleDelete(id: number) {
    const { '@mtu/token': token } = parseCookies()

    const response = await api.delete(
      `/equipamentosDeTerceiros/favoritos/${id}`,
      {
        headers: { 'Token-Trator': token }
      }
    )

    if (response.data.erro !== true) {
      AlertSuccess(response.data.mensagem)
      setUpdate(Math.random() * 1000)
    }
  }

  return useLoading ? (
    <div className="flex flex-col mt-2 space-y-2">
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
    </div>
  ) : favorites && favorites.length >= 1 ? (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-primary border-b border-t">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                  >
                    Equipamento
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                  >
                    Vendedor
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                  >
                    Preço
                  </th>
                  <th scope="col" className="p-5 relative">
                    <span className="sr-only">Funções</span>
                  </th>
                </tr>
              </thead>
              <div className="bg-primary py-1.5"></div>
              <tbody className="bg-primary rounded-lg divide-primary divide-y-8">
                {favorites.map((f: FavoriteProps, index: number) => {
                  return (
                    <tr key={index} className="bg-foreground">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="items-center flex">
                          <img
                            src={f.foto}
                            alt="Equipment IMG"
                            className="rounded h-14 object-cover w-20"
                          />
                          <div className="ml-5">
                            <p className="font-black text-color-light">
                              {f.marca}
                            </p>
                            <p className="text-sm -mt-1 text-color-light">
                              {f.modelo}, {f.ano}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="text-sm text-color-medium">
                          {f.empresa.nomeFantasia}
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="text-sm text-color-light">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(f.preco)}
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="items-center flex justify-between w-full">
                          <Link
                            href={`/announcement/equipment?chassi=${f.chassi}&id=${f.empresa.idEmpresa}`}
                          >
                            <button className="bg-color-warning rounded text-sm font-black hover:opacity-75 focus:outline-none px-3 py-2 text-center text-white delay-100 transition">
                              Ver mais
                            </button>
                          </Link>
                          <div className="has-tooltip">
                            <div className="tooltip -ml-1.5 -mt-9 mx-2 relative">
                              <div className="bg-tertiary rounded text-xs bottom-full right-0 px-4 py-1.5 text-white">
                                Excluir
                                <svg
                                  className="h-2 left-0 top-full ml-3 absolute text-tertiary"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 255 255"
                                  xmlSpace="preserve"
                                >
                                  <polygon
                                    className="fill-current"
                                    points="0,0 127.5,127.5 255,0"
                                  />
                                </svg>
                              </div>
                            </div>

                            <button
                              onClick={() =>
                                handleDelete(f.idProprietarioMaquina)
                              }
                              className="text-xl hover:opacity-75 focus:outline-none text-color-danger delay-100 transition"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="font-light py-10 text-center text-color-medium">
      Nenhum favorito encontrado.
    </p>
  )
}
