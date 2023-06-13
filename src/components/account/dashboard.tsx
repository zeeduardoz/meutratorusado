import Link from 'next/link'
import { useContext } from 'react'
import { FaDollarSign, FaPercentage, FaStar, FaTractor } from 'react-icons/fa'

import { AuthContext } from '@contexts/AuthContext'

export function Stats() {
  const { useUser } = useContext(AuthContext)

  return (
    <div>
      <div className="grid gap-2 lg:grid-cols-2">
        <div className="items-center bg-foreground rounded flex justify-between px-8 py-3">
          <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
            <FaTractor className="text-3xl text-white" />
          </div>
          <div>
            <p className="text-xl font-black text-right text-color-light">
              100
            </p>
            <p className="font-light -mt-1 text-right text-color-medium">
              Total de equipamentos
            </p>
          </div>
        </div>
        <div className="items-center bg-foreground rounded flex justify-between px-8 py-3">
          <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
            <FaStar className="text-3xl text-white" />
          </div>
          <div>
            <p className="text-xl font-black text-right text-color-light">
              100
            </p>
            <p className="font-light -mt-1 text-right text-color-medium">
              Equipamentos em destaque
            </p>
          </div>
        </div>
        <div className="items-center bg-foreground rounded flex justify-between px-8 py-3">
          <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
            <FaTractor className="text-3xl text-white" />
          </div>
          <div>
            <p className="text-xl font-black text-right text-color-light">
              100
            </p>
            <p className="font-light -mt-1 text-right text-color-medium">
              Equipamentos em estoque
            </p>
          </div>
        </div>
        <div className="items-center bg-foreground rounded flex justify-between px-8 py-3">
          <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
            <FaTractor className="text-3xl text-white" />
          </div>
          <div>
            <p className="text-xl font-black text-right text-color-light">
              100
            </p>
            <p className="font-light -mt-1 text-right text-color-medium">
              Equipamentos resevados
            </p>
          </div>
        </div>
        <div className="items-center bg-foreground rounded flex justify-between px-8 py-3">
          <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
            <FaDollarSign className="text-3xl text-white" />
          </div>
          <div>
            <p className="text-xl font-black text-right text-color-light">
              100
            </p>
            <p className="font-light -mt-1 text-right text-color-medium">
              Equipamentos vendidos
            </p>
          </div>
        </div>
        <div className="items-center bg-foreground rounded flex justify-between px-8 py-3">
          <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
            <FaPercentage className="text-3xl text-white" />
          </div>
          <div>
            <p className="font-light text-right text-color-medium">
              <b className="font-black">100</b> Ofertas na sua cidade
            </p>
            <Link
              href={`/announcement?uf=${useUser?.cidade.uf}&city=${useUser?.cidade.codCidade}`}
            >
              <a className="block -mt-0.5 text-right text-color-light">
                Ver anúncios
              </a>
            </Link>
          </div>
        </div>
        <div className="items-center bg-foreground rounded flex justify-between px-8 py-3">
          <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
            <FaPercentage className="text-3xl text-white" />
          </div>
          <div>
            <p className="font-light text-right text-color-medium">
              <b className="font-black">100</b> Ofertas no seu estado
            </p>
            <Link href={`/announcement?uf=${useUser?.cidade.uf}`}>
              <a className="block -mt-0.5 text-right text-color-light">
                Ver anúncios
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
