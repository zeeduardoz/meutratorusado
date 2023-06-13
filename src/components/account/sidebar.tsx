import Link from 'next/link'
import {
  FaChartLine,
  FaClipboardCheck,
  FaCommentsDollar,
  FaFileInvoiceDollar,
  FaHeart,
  FaSignOutAlt,
  FaTractor,
  FaUser
} from 'react-icons/fa'

export function Sidebar(props: any) {
  return (
    <div className="bg-secondary border-color-info rounded-md border-r-4 shadow-md block my-2 w-full lg:rounded-l-md lg:rounded-r-none lg:w-1/4">
      <div className="flex flex-col">
        <h1 className="text-3xl font-black tracking-wider pb-2 pt-7 text-center text-white">
          Menu
        </h1>
        <hr className="bg-color-info border-color-info my-5 py-0.5" />
        <ul>
          <li
            className={
              props.info.page === 'Meu Painel'
                ? 'bg-color-info font-bold list-none text-lg my-2 ml-8 pl-5 rounded-l-full py-5 text-white'
                : 'list-none px-8 py-4 text-color-medium hover:text-white hover:opacity-80  delay-100 transition'
            }
          >
            <Link href="/account/dashboard" scroll={false}>
              <a className="items-center flex">
                <FaChartLine className="mr-2" /> Meu Painel
              </a>
            </Link>
          </li>
          <li
            className={
              props.info.page === 'Minha Conta'
                ? 'bg-color-info font-bold list-none text-lg my-2 ml-8 pl-5 rounded-l-full py-5 text-white'
                : 'list-none px-8 py-4 text-color-medium hover:text-white hover:opacity-80  delay-100 transition'
            }
          >
            <Link href="/account/perfil" scroll={false}>
              <a className="items-center flex">
                <FaUser className="mr-2" /> Minha Conta
              </a>
            </Link>
          </li>
          <li
            className={
              props.info.page === 'Minhas Faturas'
                ? 'bg-color-info font-bold list-none text-lg my-2 ml-8 pl-5 rounded-l-full py-5 text-white'
                : 'list-none px-8 py-4 text-color-medium hover:text-white hover:opacity-80  delay-100 transition'
            }
          >
            <Link href="/account/invoices" scroll={false}>
              <a className="items-center flex">
                <FaFileInvoiceDollar className="text-xl mr-2" /> Minhas Faturas
              </a>
            </Link>
          </li>
          <li
            className={
              props.info.page === 'Meus Favoritos'
                ? 'bg-color-info font-bold list-none text-lg my-2 ml-8 pl-5 rounded-l-full py-5 text-white'
                : 'list-none px-8 py-4 text-color-medium hover:text-white hover:opacity-80  delay-100 transition'
            }
          >
            <Link href="/account/favorites" scroll={false}>
              <a className="items-center flex">
                <FaHeart className="text-xl mr-2" /> Meus Favoritos
              </a>
            </Link>
          </li>
          <li
            className={
              props.info.page === 'Meus Equipamentos' ||
              props.info.page === 'Equipamento'
                ? 'bg-color-info font-bold list-none text-lg my-2 ml-8 pl-5 rounded-l-full py-5 text-white'
                : 'list-none px-8 py-4 text-color-medium hover:text-white hover:opacity-80  delay-100 transition'
            }
          >
            <Link href="/account/stock" scroll={false}>
              <a className="items-center flex">
                <FaTractor className="text-xl mr-2" /> Meus Equipamentos
              </a>
            </Link>
          </li>
          <li
            className={
              props.info.page === 'Minhas Negociações'
                ? 'bg-color-info font-bold list-none text-lg my-2 ml-8 pl-5 rounded-l-full py-5 text-white'
                : 'list-none px-8 py-4 text-color-medium hover:text-white hover:opacity-80  delay-100 transition'
            }
          >
            <Link href="/account/negotiations" scroll={false}>
              <a className="items-center flex">
                <FaCommentsDollar className="text-xl mr-2" /> Minhas Negociações
              </a>
            </Link>
          </li>
          <li
            className={
              props.info.page === 'Minhas Avaliações'
                ? 'bg-color-info font-bold list-none text-lg my-2 ml-8 pl-5 rounded-l-full py-5 text-white'
                : 'list-none px-8 py-4 text-color-medium hover:text-white hover:opacity-80  delay-100 transition'
            }
          >
            <Link href="/account/ratings" scroll={false}>
              <a className="items-center flex">
                <FaClipboardCheck className="text-xl mr-2" /> Minhas Avaliações
              </a>
            </Link>
          </li>
        </ul>
        <hr className="bg-color-info border-color-info my-5 py-0.5" />
        <li className="text-xl list-none hover:opacity-75 pb-7 pt-2 px-8 text-white delay-100 transition">
          <a className="items-center cursor-pointer flex justify-center">
            <FaSignOutAlt className="mr-2" />
            Sair
          </a>
        </li>
      </div>
    </div>
  )
}
