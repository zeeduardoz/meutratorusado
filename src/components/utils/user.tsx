import { useContext, Fragment } from 'react'
import Link from 'next/link'
import { FaChevronDown, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Menu, Transition } from '@headlessui/react'

import { AuthContext } from '@contexts/AuthContext'

export function User() {
  const { useUser, signOut } = useContext(AuthContext)

  return (
    <>
      <Menu as="div" className="inline-block relative text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="cursor-pointer filter text-2xl hover:opacity-75 outline-none focus:outline-none p-3 px-5 text-white delay-100 transition">
                <div className="items-center flex space-x-3">
                  <FaUser aria-hidden="true" />
                  <p className="text-sm text-color-medium">
                    {useUser.razaoSocial}
                  </p>
                  <FaChevronDown
                    className="h-3 -mt-0.5 text-color-medium w-3"
                    aria-hidden="true"
                  />
                </div>
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
                className="bg-secondary rounded-b-md shadow-lg right-0 -mr-10 focus:outline-none absolute origin-top-right w-56 z-50 md:-mr-0"
              >
                <div className="border-none pt-4">
                  <Menu.Item>
                    <Link href="/account/perfil">
                      <a className="cursor-pointer block text-sm hover:opacity-75 focus:outline-none px-5 py-2 text-color-medium duration-300 transition w-full">
                        Meu perfil
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/account/invoices">
                      <a className="cursor-pointer block text-sm hover:opacity-75 focus:outline-none px-5 py-2 text-color-medium duration-300 transition w-full">
                        Minhas faturas
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/account/favorites">
                      <a className="cursor-pointer block text-sm hover:opacity-75 focus:outline-none px-5 py-2 text-color-medium duration-300 transition w-full">
                        Meus favoritos
                      </a>
                    </Link>
                  </Menu.Item>
                </div>
                <div className="border-none pt-4">
                  <Menu.Item>
                    <Link href="/account/stock">
                      <a className="cursor-pointer block text-sm hover:opacity-75 focus:outline-none px-5 py-2 text-color-medium duration-300 transition w-full">
                        Meus equipamentos
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/account/ratings">
                      <a className="cursor-pointer block text-sm hover:opacity-75 focus:outline-none px-5 py-2 text-color-medium duration-300 transition w-full">
                        Minhas avaliações
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/account/negotiations">
                      <a className="cursor-pointer block text-sm hover:opacity-75 focus:outline-none px-5 py-2 text-color-medium duration-300 transition w-full">
                        Minhas negociações
                      </a>
                    </Link>
                  </Menu.Item>
                </div>
                <div className="bg-primary rounded-b-md cursor-pointer font-black bottom-0 mt-8 hover:opacity-75 py-4 text-center text-color-light">
                  <a
                    className="items-center flex justify-center"
                    onClick={() => signOut()}
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sair
                  </a>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  )
}
