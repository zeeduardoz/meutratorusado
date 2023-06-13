import Link from 'next/link'
import { useEffect, useContext, useState } from 'react'
import { FaPencilAlt, FaStar, FaTractor } from 'react-icons/fa'

import { StockContext } from '@contexts/StockContext'
import { ModalDelete } from './delete'

export function ListStock(props: any) {
  const { stock, useLoading, getStock, addFeatured, removeFeatured } =
    useContext(StockContext)

  const [brand, setBrand] = useState(0)
  const [situation, setSituation] = useState('all')

  useEffect(() => {
    getStock()
  }, [])

  return (
    <div>
      <div className="grid mb-5 lg:grid-cols-2">
        <button className="bg-color-success rounded text-lg font-black hover:opacity-75 focus:outline-none py-3 text-white delay-100 transition w-full lg:w-3/4">
          Novo Equipamento
        </button>
        <div className="items-center flex justify-end">
          <div>
            <select
              onChange={e => setSituation(e.target.value)}
              defaultValue=""
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-xs outline-none p-3 text-color-light w-full"
            >
              <>
                <option
                  className="text-color-medium"
                  value=""
                  selected
                  disabled
                >
                  Selecione um tipo de Situação
                </option>
                <option className="text-color-medium" value="all">
                  Todos
                </option>
                <option className="text-color-medium" value="ES">
                  Em Estoque
                </option>
                <option className="text-color-medium" value="VE">
                  Vendidos
                </option>
                <option className="text-color-medium" value="RE">
                  Reservados
                </option>
              </>
            </select>
          </div>
          <div>
            <select
              onChange={e => setBrand(parseInt(e.target.value))}
              defaultValue=""
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-xs outline-none p-3 text-color-light w-full"
            >
              <>
                <option
                  className="text-color-medium"
                  value=""
                  selected
                  disabled
                >
                  Selecione uma Marca
                </option>
                <option className="text-color-medium" value="0">
                  Todas
                </option>
                {props.brands?.map((b: any) => {
                  return (
                    <option
                      key={b.codMarca}
                      className="text-color-medium"
                      value={b.codMarca}
                    >
                      {b.nomeMarca}
                    </option>
                  )
                })}
              </>
            </select>
          </div>
        </div>
      </div>
      {useLoading ? (
        <div className="flex flex-col mt-2 space-y-2">
          <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
          <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
          <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
          <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
          <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
          <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
          <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
        </div>
      ) : stock && stock.length >= 1 ? (
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
                        Chassi
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                      >
                        Situação
                      </th>
                      <th scope="col" className="p-5 relative">
                        <span className="sr-only">Funções</span>
                      </th>
                    </tr>
                  </thead>
                  <div className="bg-primary py-1.5"></div>
                  <tbody className="bg-primary rounded-lg divide-primary divide-y-8">
                    {stock.map((i, index) => {
                      if (situation !== 'all' && brand === 0) {
                        if (situation === i.situacao) {
                          return (
                            <tr key={index} className="bg-foreground">
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex">
                                  <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
                                    <FaTractor className="text-3xl text-white" />
                                  </div>
                                  <div className="ml-5">
                                    <p className="text-sm font-black text-color-light">
                                      {i.modelo?.marca.nomeMarca}
                                    </p>
                                    <p className="text-xs -mt-0.5 text-color-light">
                                      {i.modelo?.descricaoModelo},{' '}
                                      {i.anoFabricacao}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-sm text-center text-color-medium lg:text-left">
                                  {i.chassi}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-sm font-semibold text-center text-color-light lg:text-left">
                                  {i.situacao === 'VE'
                                    ? 'Vendido'
                                    : i.situacao === 'RE'
                                    ? 'Reservado'
                                    : 'Estoque'}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex justify-between w-full">
                                  <div className="has-tooltip">
                                    <div className="tooltip -ml-1.5 -mt-9 mx-2 relative">
                                      <div className="bg-tertiary rounded text-xs bottom-full right-0 px-4 py-1.5 text-white">
                                        Alterar destaque
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
                                    {i.destaque === 'S' ? (
                                      <button
                                        onClick={() => removeFeatured(i.chassi)}
                                        className="text-xl hover:opacity-75 focus:outline-none text-color-warning delay-100 transition"
                                      >
                                        <FaStar />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => addFeatured(i.chassi)}
                                        className="text-xl hover:opacity-75 focus:outline-none text-color-medium delay-100 transition"
                                      >
                                        <FaStar />
                                      </button>
                                    )}
                                  </div>
                                  <div className="items-center flex">
                                    <div className="has-tooltip">
                                      <div className="tooltip -ml-1.5 -mt-9 mx-2 relative">
                                        <div className="bg-tertiary rounded text-xs bottom-full right-0 px-4 py-1.5 text-white">
                                          Ver Equipamento
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
                                      <Link
                                        href={`/account/stock/equipment?chassi=${i.chassi}`}
                                      >
                                        <button className="hover:opacity-75 focus:outline-none px-1 text-color-info delay-100 transition">
                                          <FaPencilAlt />
                                        </button>
                                      </Link>
                                    </div>
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
                                      <ModalDelete chassi={i.chassi} />
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        } else {
                          return <></>
                        }
                      } else if (situation === 'all' && brand !== 0) {
                        if (brand === i.modelo.marca.codMarca) {
                          return (
                            <tr key={index} className="bg-foreground">
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex">
                                  <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
                                    <FaTractor className="text-3xl text-white" />
                                  </div>
                                  <div className="ml-5">
                                    <p className="text-sm font-black text-color-light">
                                      {i.modelo?.marca.nomeMarca}
                                    </p>
                                    <p className="text-xs -mt-0.5 text-color-light">
                                      {i.modelo?.descricaoModelo},{' '}
                                      {i.anoFabricacao}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-sm text-center text-color-medium lg:text-left">
                                  {i.chassi}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-sm font-semibold text-center text-color-light lg:text-left">
                                  {i.situacao === 'VE'
                                    ? 'Vendido'
                                    : i.situacao === 'RE'
                                    ? 'Reservado'
                                    : 'Estoque'}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex justify-between w-full">
                                  <div className="has-tooltip">
                                    <div className="tooltip -ml-1.5 -mt-9 mx-2 relative">
                                      <div className="bg-tertiary rounded text-xs bottom-full right-0 px-4 py-1.5 text-white">
                                        Alterar destaque
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
                                    {i.destaque === 'S' ? (
                                      <button
                                        onClick={() => removeFeatured(i.chassi)}
                                        className="text-xl hover:opacity-75 focus:outline-none text-color-warning delay-100 transition"
                                      >
                                        <FaStar />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => addFeatured(i.chassi)}
                                        className="text-xl hover:opacity-75 focus:outline-none text-color-medium delay-100 transition"
                                      >
                                        <FaStar />
                                      </button>
                                    )}
                                  </div>
                                  <div className="items-center flex">
                                    <div className="has-tooltip">
                                      <div className="tooltip -ml-1.5 -mt-9 mx-2 relative">
                                        <div className="bg-tertiary rounded text-xs bottom-full right-0 px-4 py-1.5 text-white">
                                          Ver Equipamento
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
                                      <Link
                                        href={`/account/stock/equipment?chassi=${i.chassi}`}
                                      >
                                        <button className="hover:opacity-75 focus:outline-none px-1 text-color-info delay-100 transition">
                                          <FaPencilAlt />
                                        </button>
                                      </Link>
                                    </div>
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
                                      <ModalDelete chassi={i.chassi} />
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        } else {
                          return <></>
                        }
                      } else if (situation !== 'all' && brand !== 0) {
                        if (
                          situation === i.situacao &&
                          brand === i.modelo.marca.codMarca
                        ) {
                          return (
                            <tr key={index} className="bg-foreground">
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex">
                                  <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
                                    <FaTractor className="text-3xl text-white" />
                                  </div>
                                  <div className="ml-5">
                                    <p className="text-sm font-black text-color-light">
                                      {i.modelo?.marca.nomeMarca}
                                    </p>
                                    <p className="text-xs -mt-0.5 text-color-light">
                                      {i.modelo?.descricaoModelo},{' '}
                                      {i.anoFabricacao}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-sm text-center text-color-medium lg:text-left">
                                  {i.chassi}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-sm font-semibold text-center text-color-light lg:text-left">
                                  {i.situacao === 'VE'
                                    ? 'Vendido'
                                    : i.situacao === 'RE'
                                    ? 'Reservado'
                                    : 'Estoque'}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex justify-between w-full">
                                  <div className="has-tooltip">
                                    <div className="tooltip -ml-1.5 -mt-9 mx-2 relative">
                                      <div className="bg-tertiary rounded text-xs bottom-full right-0 px-4 py-1.5 text-white">
                                        Alterar destaque
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
                                    {i.destaque === 'S' ? (
                                      <button
                                        onClick={() => removeFeatured(i.chassi)}
                                        className="text-xl hover:opacity-75 focus:outline-none text-color-warning delay-100 transition"
                                      >
                                        <FaStar />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => addFeatured(i.chassi)}
                                        className="text-xl hover:opacity-75 focus:outline-none text-color-medium delay-100 transition"
                                      >
                                        <FaStar />
                                      </button>
                                    )}
                                  </div>
                                  <div className="items-center flex">
                                    <div className="has-tooltip">
                                      <div className="tooltip -ml-1.5 -mt-9 mx-2 relative">
                                        <div className="bg-tertiary rounded text-xs bottom-full right-0 px-4 py-1.5 text-white">
                                          Ver Equipamento
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
                                      <Link
                                        href={`/account/stock/equipment?chassi=${i.chassi}`}
                                      >
                                        <button className="hover:opacity-75 focus:outline-none px-1 text-color-info delay-100 transition">
                                          <FaPencilAlt />
                                        </button>
                                      </Link>
                                    </div>
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
                                      <ModalDelete chassi={i.chassi} />
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        } else {
                          return <></>
                        }
                      } else {
                        return (
                          <tr key={index} className="bg-foreground">
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="items-center flex">
                                <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
                                  <FaTractor className="text-3xl text-white" />
                                </div>
                                <div className="ml-5">
                                  <p className="text-sm font-black text-color-light">
                                    {i.modelo?.marca.nomeMarca}
                                  </p>
                                  <p className="text-xs -mt-0.5 text-color-light">
                                    {i.modelo?.descricaoModelo},{' '}
                                    {i.anoFabricacao}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-sm text-center text-color-medium lg:text-left">
                                {i.chassi}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-sm font-semibold text-center text-color-light lg:text-left">
                                {i.situacao === 'VE'
                                  ? 'Vendido'
                                  : i.situacao === 'RE'
                                  ? 'Reservado'
                                  : 'Estoque'}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="items-center flex justify-between w-full">
                                <div className="has-tooltip">
                                  <div className="tooltip -ml-1.5 -mt-9 mx-2 relative">
                                    <div className="bg-tertiary rounded text-xs bottom-full right-0 px-4 py-1.5 text-white">
                                      Alterar destaque
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
                                  {i.destaque === 'S' ? (
                                    <button
                                      onClick={() => removeFeatured(i.chassi)}
                                      className="text-xl hover:opacity-75 focus:outline-none text-color-warning delay-100 transition"
                                    >
                                      <FaStar />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => addFeatured(i.chassi)}
                                      className="text-xl hover:opacity-75 focus:outline-none text-color-medium delay-100 transition"
                                    >
                                      <FaStar />
                                    </button>
                                  )}
                                </div>
                                <div className="items-center flex">
                                  <div className="has-tooltip">
                                    <div className="tooltip -ml-1.5 -mt-9 mx-2 relative">
                                      <div className="bg-tertiary rounded text-xs bottom-full right-0 px-4 py-1.5 text-white">
                                        Ver Equipamento
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
                                    <Link
                                      href={`/account/stock/equipment?chassi=${i.chassi}`}
                                    >
                                      <button className="hover:opacity-75 focus:outline-none px-1 text-color-info delay-100 transition">
                                        <FaPencilAlt />
                                      </button>
                                    </Link>
                                  </div>
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
                                    <ModalDelete chassi={i.chassi} />
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="font-light py-10 text-center text-color-medium">
          Nenhum equipamento encontrado.
        </p>
      )}
    </div>
  )
}
