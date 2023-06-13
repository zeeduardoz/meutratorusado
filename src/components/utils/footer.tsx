import Image from 'next/image'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookSquare,
  FaInstagramSquare
} from 'react-icons/fa'

export function Footer() {
  return (
    <>
      <div className="container">
        <img
          src="wallpaper.jpeg"
          alt="Banner"
          className="rounded-md shadow-md"
        />
      </div>
      <footer className="border-color-info border-t-8 mt-28">
        <div className="bg-secondary py-10 md:mx-auto">
          <div className="container grid gap-10 lg:gap-0 lg:grid-cols-3">
            <div>
              <p className="text-xl font-semibold mb-5 text-white">
                Entrar em contato
              </p>
              <div className="items-center border-blue-300 border-dashed border-b flex py-5 w-4/5">
                <span className="bg-color-info rounded p-2">
                  <FaPhoneAlt className="text-2xl text-white" />
                </span>
                <div className="ml-4">
                  <p className="font-semibold text-white">Telefone</p>
                  <p className="-mt-1 text-color-medium">+55 (16) 99275-7320</p>
                </div>
              </div>
              <div className="items-center border-blue-300 border-dashed border-b flex py-5 w-4/5">
                <span className="bg-color-info rounded p-2">
                  <FaEnvelope className="text-2xl text-white" />
                </span>
                <div className="ml-4">
                  <p className="font-semibold text-white">E-mail</p>
                  <p className="-mt-1 text-color-medium">
                    comercial@meutratorusado.com.br
                  </p>
                </div>
              </div>
            </div>
            <div className="flex lg:ml-10">
              <div>
                <p className="text-xl font-semibold text-white">
                  Meu Trator Usado
                </p>
                <ul className="list-none mt-5">
                  <li>
                    <a
                      href="/"
                      className="hover:opacity-75 py-3 text-color-medium"
                    >
                      Início
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="hover:opacity-75 py-3 text-color-medium"
                    >
                      Sobre
                    </a>
                  </li>
                  <li>
                    <a
                      href="/resales"
                      className="hover:opacity-75 py-3 text-color-medium"
                    >
                      Revendas
                    </a>
                  </li>
                  <li>
                    <a
                      href="/plans"
                      className="hover:opacity-75 py-3 text-color-medium"
                    >
                      Planos
                    </a>
                  </li>
                </ul>
                <ul className="mt-5">
                  <li>
                    <a
                      href="/privacy-policy"
                      className="hover:opacity-75 py-3 text-color-medium"
                    >
                      Política de Privacidade
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="hover:opacity-75 py-3 text-color-medium"
                    >
                      Termos de Uso
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center flex justify-center">
              <div>
                <div className="items-center flex justify-between">
                  <p className="text-xl font-semibold text-white">
                    Baixe nosso Aplicativo
                  </p>
                  <a href="/" className="w-32">
                    <img src="googleplay.png" alt="Google APP" />
                  </a>
                  <a
                    href="https://apps.apple.com/app/id1542977644"
                    className="w-32"
                  >
                    <img src="applestore.png" alt="Apple APP" />
                  </a>
                </div>
                <div className="hidden mx-auto w-10/12 lg:block">
                  <a href="/">
                    <img src="logo.jpeg" alt="Logo" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary border-tertiary border-t py-10 md:mx-auto">
          <div className="container items-center flex justify-between">
            <div className="w-full">
              <p className="text-sm font-light text-white">
                © Meu Trator Usado, todos direitos reservados.
              </p>
            </div>
            <div className="items-center flex justify-end space-x-5">
              <a className="text-2xl hover:opacity-75 text-color-info" href="/">
                <FaFacebookSquare />
              </a>
              <a className="text-2xl hover:opacity-75 text-color-info" href="/">
                <FaInstagramSquare />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
