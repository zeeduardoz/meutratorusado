import Link from 'next/link'
import Image from 'next/image'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaBars, FaTimes, FaUser, FaUnlockAlt } from 'react-icons/fa'

import { Theme } from '@components/utils/theme'
import { User } from '@components/utils/user'
import { Notifications } from '@components/utils/notifications'
import { Invoices } from '@components/utils/invoices'
import { AuthContext } from '@contexts/AuthContext'
import { AlertError } from '@hooks/useAlert'

const pages = [
  {
    title: 'Início',
    link: '/'
  },
  {
    title: 'Sobre',
    link: '/about'
  },
  {
    title: 'Revendas',
    link: '/resales'
  },
  {
    title: 'Planos',
    link: '/plans'
  }
]

export function Header(props: any) {
  const { useUser, useLoading, signIn } = useContext(AuthContext)
  const [useNav, setNav] = useState(false)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const schema = Yup.object().shape({
    user: Yup.string()
      .required('Informe o email!')
      .email('Informe um email válido!'),
    password: Yup.string().required('Informe a senha!')
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  async function handleSignIn(data: any) {
    try {
      await signIn(data)
    } catch (err) {
      console.log(err)
      AlertError('Ocorreu um erro na requisição!')
    }
  }
  const onSubmit = handleSubmit(data => handleSignIn(data))

  return (
    <header className="bg-foreground">
      <div className="bg-secondary w-full md:bg-tertiary">
        <div className="container items-center flex justify-center md:justify-end">
          {useUser ? (
            <div className="items-center bg-secondary flex px-3">
              <User />
              <Theme />
              <Notifications />
              <Invoices />
            </div>
          ) : (
            <div className="items-center bg-secondary flex px-2">
              <Theme />
            </div>
          )}
        </div>
      </div>
      {!useNav ? (
        <div className="container items-center flex justify-between">
          <div className="w-1/2 lg:w-1/4">
            <Link href="/">
              <img
                src="logo.jpeg"
                alt="Logo"
                className="rounded-b cursor-pointer"
              />
            </Link>
          </div>
          <button
            className="block text-5xl hover:opacity-75 px-5 text-color-light lg:hidden"
            onClick={() => setNav(true)}
          >
            <FaBars />
          </button>
          <div className="items-center hidden justify-between w-7/12 lg:flex">
            {pages.map((page, index) => {
              if (page.title === props.info.page) {
                return (
                  <Link key={index} href={page.link}>
                    <a className="bg-secondary rounded text-xl font-semibold px-10 py-3 text-color-info">
                      {page.title}
                    </a>
                  </Link>
                )
              } else {
                return (
                  <Link key={index} href={page.link}>
                    <a className="text-lg font-semibold hover:opacity-75 text-color-light delay-150 duration-300 transition">
                      {page.title}
                    </a>
                  </Link>
                )
              }
            })}
            {useUser ? (
              props.info.page === 'Início' || props.info.page === 'Anúncios' ? (
                <Link href="/account/dashboard">
                  <a className="bg-color-info rounded text-xl font-semibold hover:opacity-75 px-10 py-3 text-white delay-150 duration-300 transition">
                    Minha conta
                  </a>
                </Link>
              ) : (
                <Link href="/announcement">
                  <a className="bg-color-info rounded text-xl font-semibold hover:opacity-75 px-10 py-3 text-white delay-150 duration-300 transition">
                    Pesquisar
                  </a>
                </Link>
              )
            ) : (
              <Link href="/auth/login">
                <a className="bg-color-info rounded text-xl font-semibold hover:opacity-75 px-10 py-3 text-white delay-150 duration-300 transition">
                  Acessar
                </a>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="items-center bg-secondary flex flex-col h-screen left-0 top-0 py-10 absolute w-full z-50 lg:hidden">
          <button
            className="block text-5xl mb-10 hover:opacity-75 px-5 text-white lg:hidden"
            onClick={() => setNav(false)}
          >
            <FaTimes />
          </button>
          {pages.map((page, index) => {
            if (page.title === props.info.page) {
              return (
                <Link key={index} href={page.link}>
                  <a className="bg-secondary rounded text-xl font-semibold my-3 text-color-info">
                    {page.title}
                  </a>
                </Link>
              )
            } else {
              return (
                <Link key={index} href={page.link}>
                  <a className="text-lg my-3 hover:opacity-75 text-white delay-150 duration-300 transition">
                    {page.title}
                  </a>
                </Link>
              )
            }
          })}
          <Link href="/auth/login">
            <a className="bg-color-info rounded text-xl font-semibold my-3 hover:opacity-75 px-10 py-3 text-white delay-150 duration-300 transition">
              Acessar
            </a>
          </Link>
        </div>
      )}
      {useUser ? (
        <>
          <div className="hidden lg:block">
            <div className="left-3/4 -mt-12 2xl:ml-10 ml-32 absolute w-7 z-0">
              <img src="shape003.png" alt="Shape" />
            </div>
            <div className="left-3/4 -mt-3 2xl:ml-24 ml-52 absolute w-10 z-0">
              <img src="shape003.png" alt="Shape" />
            </div>
            <div className="left-0 right-0 -mt-5 mx-auto absolute rotate-90 transform w-28 z-0">
              <img src="shape002.png" alt="Shape" />
            </div>
          </div>
          <div className="items-center bg-secondary flex justify-center mt-10 py-14 relative w-full z-10">
            <div>
              <h1 className="text-3xl font-black text-white">
                {props.info.page}
              </h1>
              <hr className="bg-color-info rounded-full border-0 mt-1 p-1 w-1/2" />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="left-10 -mt-14 absolute w-28 z-0">
              <img src="shape003.png" alt="Shape" />
            </div>
            <div className="right-16 -mt-24 absolute -rotate-90 transform w-28 z-0">
              <img src="shape002.png" alt="Shape" />
            </div>
          </div>
        </>
      ) : props.info.page !== 'Início' && !useUser ? (
        <>
          <div className="hidden lg:block">
            <div className="left-3/4 -mt-12 2xl:ml-10 ml-32 absolute w-7 z-0">
              <img src="shape003.png" alt="Shape" />
            </div>
            <div className="left-3/4 -mt-3 2xl:ml-24 ml-52 absolute w-10 z-0">
              <img src="shape003.png" alt="Shape" />
            </div>
            <div className="left-0 right-0 -mt-5 mx-auto absolute rotate-90 transform w-28 z-0">
              <img src="shape002.png" alt="Shape" />
            </div>
          </div>
          <div className="items-center bg-secondary flex justify-center mt-10 py-14 relative w-full z-10">
            <div>
              <h1 className="text-3xl font-black text-white">
                {props.info.page}
              </h1>
              <hr className="bg-color-info rounded-full border-0 mt-1 p-1 w-1/2" />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="left-10 -mt-14 absolute w-28 z-0">
              <img src="shape003.png" alt="Shape" />
            </div>
            <div className="right-16 -mt-24 absolute -rotate-90 transform w-28 z-0">
              <img src="shape002.png" alt="Shape" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hidden lg:block">
            <div className="left-3/4 -mt-12 2xl:ml-10 ml-32 absolute w-7 z-0">
              <img src="shape003.png" alt="Shape" />
            </div>
            <div className="left-3/4 -mt-3 2xl:ml-24 ml-52 absolute w-10 z-0">
              <img src="shape003.png" alt="Shape" />
            </div>
            <div className="left-0 right-0 mx-auto absolute rotate-90 transform w-28 z-0">
              <img src="shape002.png" alt="Shape" />
            </div>
          </div>
          <div className="2xl:block hidden">
            <div className="items-center flex justify-between mt-8 relative space-x-20 z-20 lg:px-20">
              <div className="w-1/3">
                <img src="header-img.png" alt="Header Trator Image" />
              </div>
              <div className="items-center flex justify-center px-20 w-1/3">
                <span>
                  <h1 className="text-4xl font-bold text-white">
                    Bem-vindo(a), a
                  </h1>
                  <h1 className="text-4xl font-black text-white">
                    nossa plataforma!
                  </h1>
                  <p className="text-xl font-light mb-10 mt-5 text-white">
                    Conectando o agronegocio em uma grande rede de negociações
                    de tratores usados.
                  </p>
                  <a
                    className="bg-color-success rounded text-xl font-bold hover:opacity-75 px-10 py-3 text-white delay-150 duration-300 transition"
                    href="/auth/register"
                  >
                    Cadastrar
                  </a>
                </span>
              </div>
              <div className="bg-primary rounded-md shadow-lg p-10 w-1/4">
                <div>
                  <h1 className="font-sans text-4xl font-black text-color-light">
                    Acessar
                  </h1>
                  <hr className="bg-color-info rounded-full border-0 p-1 w-20" />
                </div>
                <form onSubmit={onSubmit} id="form1" className="mt-14">
                  <div className="mt-6">
                    <label
                      htmlFor="user"
                      className="items-center flex text-color-medium"
                    >
                      <FaUser className="mr-2" /> E-mail
                    </label>
                    <input
                      defaultValue={user}
                      type="email"
                      name="user"
                      onChange={e => setUser(e.target.value)}
                      maxLength={50}
                      placeholder="nome@email.com"
                      className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
                    />
                    {errors.user && (
                      <p className="text-sm py-1 text-red-400">
                        {errors.user.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="password"
                      className="items-center flex text-color-medium"
                    >
                      <FaUnlockAlt className="mr-2" />
                      Senha
                    </label>
                    <input
                      defaultValue={password}
                      type="password"
                      name="password"
                      onChange={e => setPassword(e.target.value)}
                      maxLength={30}
                      placeholder="Insira sua senha"
                      className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
                    />
                    {errors.password && (
                      <p className="text-sm py-1 text-red-400">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 text-right">
                    <Link href="/auth/recover/step1">
                      <a className="hover:text-utils-primary focus:text-utils-primary cursor-pointer text-sm font-semibold text-color-medium">
                        Esqueceu a senha?
                      </a>
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      setValue('user', user)
                      setValue('password', password)
                    }}
                    className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex text-lg font-bold justify-center tracking-wider mt-10 focus:outline-none px-4 py-3 text-white uppercase duration-150 transition ease-in-out w-full"
                    disabled={useLoading}
                  >
                    {useLoading && (
                      <svg
                        className="animate-spin h-5 -ml-1 mr-3 text-white w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {useLoading && <span>Aguarde</span>}
                    {!useLoading && <span>Entrar</span>}
                  </button>
                </form>
              </div>
            </div>
            <div className="bg-secondary h-100 top-76 absolute w-full z-10"></div>
            <div className="hidden lg:block">
              <div className="left-10 -mt-24 absolute w-28 z-0">
                <img src="shape003.png" alt="Shape" />
              </div>
              <div className="right-16 -mt-36 absolute -rotate-90 transform w-28 z-0">
                <img src="shape002.png" alt="Shape" />
              </div>
            </div>
          </div>
          <div className="2xl:hidden">
            <div className="items-center flex justify-center mt-3 relative space-x-40 z-20 lg:px-20">
              <div className="items-center flex justify-center p-10 w-full md:p-14 lg:p-0 lg:w-1/3">
                <span className="text-center">
                  <h1 className="text-xl font-bold text-white md:text-4xl">
                    Bem-vindo(a), a
                  </h1>
                  <h1 className="text-xl font-black text-white md:text-4xl">
                    nossa plataforma!
                  </h1>
                  <p className="font-light mb-10 mt-5 text-white md:text-xl">
                    Conectando o agronegocio em uma grande rede de negociações
                    de tratores usados.
                  </p>
                  <a
                    className="bg-color-success rounded text-xl font-bold hover:opacity-75 px-10 py-3 text-white delay-150 duration-300 transition"
                    href="/auth/register"
                  >
                    Cadastrar
                  </a>
                </span>
              </div>
              <div className="bg-primary rounded-md shadow-lg hidden p-8 w-1/3 lg:block">
                <div>
                  <h1 className="font-sans text-4xl font-black text-color-light">
                    Acessar
                  </h1>
                  <hr className="bg-color-info rounded-full border-0 p-1 w-20" />
                </div>
                <form onSubmit={onSubmit} id="form2" className="mt-8">
                  <div className="mt-6">
                    <label
                      htmlFor="user"
                      className="items-center flex text-color-medium"
                    >
                      <FaUser className="mr-2" /> E-mail
                    </label>
                    <input
                      defaultValue={user}
                      onChange={e => setUser(e.target.value)}
                      type="email"
                      name="user"
                      maxLength={50}
                      placeholder="nome@email.com"
                      className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
                    />
                    {errors.user && (
                      <p className="text-sm py-1 text-red-400">
                        {errors.user.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="password"
                      className="items-center flex text-color-medium"
                    >
                      <FaUnlockAlt className="mr-2" />
                      Senha
                    </label>
                    <input
                      defaultValue={password}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      maxLength={30}
                      placeholder="Insira sua senha"
                      className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
                    />
                    {errors.password && (
                      <p className="text-sm py-1 text-red-400">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 text-right">
                    <Link href="/auth/recover/step1">
                      <a className="hover:text-utils-primary focus:text-utils-primary cursor-pointer text-sm font-semibold text-color-medium">
                        Esqueceu a senha?
                      </a>
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      setValue('user', user)
                      setValue('password', password)
                    }}
                    className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex text-lg font-bold justify-center tracking-wider mt-10 focus:outline-none px-4 py-3 text-white uppercase duration-150 transition ease-in-out w-full"
                    disabled={useLoading}
                  >
                    {useLoading && (
                      <svg
                        className="animate-spin h-5 -ml-1 mr-3 text-white w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {useLoading && <span>Aguarde</span>}
                    {!useLoading && <span>Entrar</span>}
                  </button>
                </form>
              </div>
            </div>
            <div className="bg-header bg-cover h-72 top-44 absolute w-full z-10 sm:top-56 md:h-80 md:top-76 lg:h-96 lg:top-60 xl:h-80 xl:top-76"></div>
            <div className="hidden lg:block">
              <div className="left-10 -mt-24 absolute w-28 z-0">
                <img src="shape003.png" alt="Shape" />
              </div>

              <div className="right-16 -mt-36 absolute -rotate-90 transform w-28 z-0">
                <img src="shape002.png" alt="Shape" />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
