import { useContext, Fragment } from 'react'
import Link from 'next/link'
import {
  FaBell,
  FaClipboardCheck,
  FaClipboardList,
  FaCommentsDollar,
  FaMapMarkerAlt,
  FaTimes
} from 'react-icons/fa'
import { Menu, Transition } from '@headlessui/react'

import { UserContext } from '@contexts/UserContext'

export function Notifications() {
  const { notifications, deleteNotification, clearNotifications } =
    useContext(UserContext)

  async function handleDelete(id: number) {
    try {
      await deleteNotification(id)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Menu as="div" className="inline-block relative text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="cursor-pointer filter text-2xl hover:opacity-75 outline-none focus:outline-none px-2 py-3 text-white delay-100 transition">
                <FaBell />

                {notifications && notifications.length >= 1 ? (
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
                className="bg-secondary rounded-b-md shadow-lg right-0 focus:outline-none absolute origin-top-right w-76 z-50"
              >
                <div className="py-5">
                  <h1 className="font-bold text-center text-white">
                    Notificações
                  </h1>
                </div>
                <hr className="border-color-info" />
                <div className="border-none">
                  {notifications && notifications.length >= 1 ? (
                    notifications.map((n, index) => {
                      return (
                        <Link
                          key={index}
                          href={
                            n.tipo === 'AVA'
                              ? '/'
                              : n.tipo === 'RAV'
                              ? '/'
                              : n.tipo === 'DTC'
                              ? '/'
                              : n.tipo === 'DTE'
                              ? '/'
                              : `/account/negotiations?chassi=${n.chassi}&id=${n.empresaChassi}`
                          }
                        >
                          <a className="items-center cursor-pointer flex justify-between pt-7 px-5">
                            <div className="items-center flex">
                              <div className="rounded-full text-3xl text-color-info">
                                {n.tipo === 'AVA' ? (
                                  <FaClipboardList />
                                ) : n.tipo === 'RAV' ? (
                                  <FaClipboardCheck />
                                ) : n.tipo === 'DTC' ? (
                                  <FaMapMarkerAlt />
                                ) : n.tipo === 'DTE' ? (
                                  <FaMapMarkerAlt />
                                ) : (
                                  <FaCommentsDollar />
                                )}
                              </div>
                              <div className="ml-5">
                                <h1 className="font-black text-white">
                                  {n.tipo === 'AVA'
                                    ? 'Avaliação solicitada'
                                    : n.tipo === 'RAV'
                                    ? 'Resposta de avaliação'
                                    : n.tipo === 'DTC'
                                    ? 'Equipamento na Cidade'
                                    : n.tipo === 'DTE'
                                    ? 'Equipamento no Estado'
                                    : 'Negociação'}
                                </h1>
                                <p className="items-center flex text-xs font-medium text-white">
                                  {n.mensagem}
                                </p>
                              </div>
                            </div>
                            <div>
                              <button
                                onClick={() => handleDelete(n.codNotificacao)}
                                className="text-lg hover:opacity-75 focus:outline-none px-5 text-color-danger delay-100 transition"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </a>
                        </Link>
                      )
                    })
                  ) : (
                    <p className="pb-3 pt-10 text-center text-gray-400">
                      Nenhuma notificação
                    </p>
                  )}
                </div>
                <div
                  onClick={() => clearNotifications()}
                  className="rounded-b-md cursor-pointer bottom-0 mt-3 hover:opacity-75 py-5 text-center text-blue-300"
                >
                  <p>Limpar todas notificações</p>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  )
}
