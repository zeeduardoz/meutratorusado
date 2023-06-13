import Link from 'next/link'
import { useEffect, useContext } from 'react'
import { FaFillDrip, FaHeart, FaTachometerAlt } from 'react-icons/fa'

import { AdvertsContext } from '@contexts/AdvertsContext'

export function List(props: any) {
  const { useLoading, getAdverts, adverts, addFavorite, removeFavorite } =
    useContext(AdvertsContext)

  useEffect(() => {
    if (props.uf?.length === 2 && props.city?.length <= 1) {
      getAdverts(props.uf)
    } else if (props.uf?.length === 2 && props.city?.length >= 1) {
      getAdverts(props.uf, props.city)
    } else {
      getAdverts()
    }
  }, [])

  async function handleAddFavorite(id: number) {
    try {
      await addFavorite(id, 'search')
    } catch (err) {
      console.log(err)
    }
  }

  async function handleRemoveFavorite(id: number) {
    try {
      await removeFavorite(id, 'search')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="mt-28 w-full md:mt-0 lg:w-3/4">
        {useLoading ? (
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="animate-pulse bg-gray-300 rounded shadow-sm h-96"></div>
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
          <div className="grid gap-5 lg:grid-cols-3">
            {adverts.map(a => {
              return (
                <div className="bg-primary rounded shadow-sm flex flex-col justify-between">
                  <div className="bg-secondary rounded-t h-72 relative md:h-48">
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
                      className="rounded-t h-72 object-cover object-center w-full md:h-48"
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
                      {a.corExterna?.length > 1 ? a.corExterna : 'Nenhuma'}
                    </p>
                  </div>
                  <div className="p-5 pt-8">
                    <p className="font-light pb-5 text-center text-color-light">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(a.preco)}
                    </p>
                    <Link
                      href={
                        a.categoria !== 'AVALIE O EQUIPAMENTO'
                          ? `/announcement/equipment?chassi=${a.chassi}&id=${a.empresa?.idEmpresa}`
                          : `/announcement/equipment?chassi=${a.chassi}&id=${a.empresa?.idEmpresa}&typed=ranting`
                      }
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
