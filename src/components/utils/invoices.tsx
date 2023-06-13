import Link from 'next/link'
import { useContext, Fragment } from 'react'
import { FaFileInvoiceDollar, FaTractor } from 'react-icons/fa'
import { Menu, Transition } from '@headlessui/react'

import { UserContext } from '@contexts/UserContext'

export function Invoices() {
  const { invoices } = useContext(UserContext)

  return (
    <>
      <Menu as="div" className="inline-block relative text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="cursor-pointer filter text-2xl hover:opacity-75 outline-none focus:outline-none px-2 py-3 text-white delay-100 transition">
                <FaFileInvoiceDollar />

                {invoices && invoices.length >= 1 ? (
                  <>
                    <div className="z-2 bg-color-info border-secondary rounded-full border-2 h-4 right-1.5 top-2 absolute w-4"></div>
                    <div className="z-2 animate-ping bg-color-info rounded-full h-2.5 right-2 top-2.5 absolute w-2.5"></div>
                  </>
                ) : (
                  <></>
                )}
              </Menu.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="bg-secondary rounded-b-md shadow-lg right-0 -mr-3 focus:outline-none absolute origin-top-right w-76 z-50"
              >
                <div className="py-5">
                  <h1 className="font-bold text-center text-white">
                    Faturas em Aberto
                  </h1>
                </div>
                <hr className="border-color-info" />
                <div className="border-none">
                  {invoices && invoices.length >= 1 ? (
                    invoices.map((i, index) => {
                      if (index < 5) {
                        if (i.boletoPago !== true) {
                          return (
                            <Link key={index} href="/">
                              <a className="items-center cursor-pointer flex justify-between pt-7 px-5">
                                <div className="items-center flex">
                                  <div className="rounded-full text-3xl text-color-info">
                                    <FaTractor />
                                  </div>
                                  <div className="ml-5">
                                    <h1 className="font-black text-white">
                                      {i.equipamento.modelo.marca.nomeMarca}
                                    </h1>
                                    <p className="items-center flex text-sm font-medium text-white">
                                      {i.equipamento.modelo.descricaoModelo},
                                      {i.equipamento.anoFabricacao}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs pb-1 text-color-medium">
                                    {i.dataEmissao}
                                  </p>
                                  <p className="text-color-medium">
                                    {new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL'
                                    }).format(i.valorNominal)}
                                  </p>
                                </div>
                              </a>
                            </Link>
                          )
                        } else {
                          return <></>
                        }
                      } else {
                        return <></>
                      }
                    })
                  ) : (
                    <p className="pb-3 pt-10 text-center text-gray-400">
                      Nenhuma fatura
                    </p>
                  )}
                </div>
                <div className="rounded-b-md cursor-pointer bottom-0 mt-3 hover:opacity-75 py-5 text-center text-blue-300">
                  <Link href="/account/invoices">Ver todas as Faturas</Link>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  )
}
