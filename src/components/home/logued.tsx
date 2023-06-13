import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { FaHeart, FaFillDrip, FaTachometerAlt } from 'react-icons/fa'

import { AuthContext } from '@contexts/AuthContext'
import { AdvertsContext } from '@contexts/AdvertsContext'

export function Logued() {
  const { useUser } = useContext(AuthContext)
  const { getDirected, directed, addFavorite, removeFavorite, useLoading } =
    useContext(AdvertsContext)

  useEffect(() => {
    getDirected()
  }, [])

  async function handleAddFavorite(id: number) {
    try {
      await addFavorite(id, 'directed')
    } catch (err) {
      console.log(err)
    }
  }

  async function handleRemoveFavorite(id: number) {
    try {
      await removeFavorite(id, 'directed')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="container items-center flex justify-center w-full lg:justify-end">
        <div>
          <h1 className="text-lg font-light pb-5 text-center text-color-light">
            Busca Avançada
          </h1>
          <Link href="/announcement">
            <a className="bg-color-info rounded shadow-sm text-xl font-black hover:opacity-75 px-14 py-3.5 text-center text-white delay-100 transition">
              Pesquisar
            </a>
          </Link>
        </div>
      </div>

      <div className="container mt-20 lg:mt-10">
        <div>
          <h1 className="text-2xl font-black text-color-light lg:text-3xl">
            Recomendados para Você
          </h1>
          <hr className="bg-color-info rounded-full border-0 mt-1 p-1 w-1/6 lg:w-1/12" />
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
        ) : directed && directed.length >= 1 ? (
          <div className="grid gap-5 mt-10 lg:grid-cols-4">
            {directed.map(a => {
              if (a.categoria === 'RECOMENDADOS PARA VOCÊ') {
                return (
                  <div className="bg-primary rounded shadow-sm flex flex-col justify-between">
                    <div className="bg-secondary rounded-t h-72 relative md:h-52">
                      {a.favorito ? (
                        <button
                          onClick={() =>
                            handleRemoveFavorite(a.idProprietarioMaquina)
                          }
                          className="text-2xl right-0 top-0 hover:opacity-75 focus:outline-none p-2 absolute text-color-danger delay-100 transition"
                        >
                          <FaHeart />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddFavorite(a.idProprietarioMaquina)
                          }
                          className="text-2xl right-0 top-0 hover:opacity-75 focus:outline-none p-2 absolute text-gray-300 delay-100 transition"
                        >
                          <FaHeart />
                        </button>
                      )}
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
              } else {
                return <></>
              }
            })}
          </div>
        ) : (
          <></>
        )}
      </div>

      {useUser.perfil === 'R' ? (
        <div className="container mt-28">
          <div>
            <h1 className="text-2xl font-black text-color-light lg:text-3xl">
              Avalie o Equipamento
            </h1>
            <hr className="bg-color-info rounded-full border-0 mt-1 p-1 w-1/6 lg:w-1/12" />
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
          ) : directed && directed.length >= 1 ? (
            <div className="grid gap-5 mt-10 lg:grid-cols-4">
              {directed.map(a => {
                if (a.categoria === 'AVALIE O EQUIPAMENTO') {
                  return (
                    <div className="bg-primary rounded shadow-sm flex flex-col justify-between">
                      <div className="bg-secondary rounded-t h-72 relative md:h-52">
                        {a.favorito ? (
                          <button
                            onClick={() =>
                              handleRemoveFavorite(a.idProprietarioMaquina)
                            }
                            className="text-2xl right-0 top-0 hover:opacity-75 focus:outline-none p-2 absolute text-color-danger delay-100 transition"
                          >
                            <FaHeart />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleAddFavorite(a.idProprietarioMaquina)
                            }
                            className="text-2xl right-0 top-0 hover:opacity-75 focus:outline-none p-2 absolute text-gray-300 delay-100 transition"
                          >
                            <FaHeart />
                          </button>
                        )}
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
                          href={`/announcement/equipment?chassi=${a.chassi}&id=${a.empresa.idEmpresa}&typed=ranting`}
                          passHref
                        >
                          <a className="bg-color-info rounded block text-lg font-black hover:opacity-75 focus:outline-none py-3 text-center text-white delay-100 transition w-full">
                            Ver mais
                          </a>
                        </Link>
                      </div>
                    </div>
                  )
                } else {
                  return <></>
                }
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
