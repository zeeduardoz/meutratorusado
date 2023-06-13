import Link from 'next/link'
import { useState } from 'react'
import { parseCookies } from 'nookies'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Thumbs } from 'swiper/core'
import {
  FaClipboardList,
  FaCommentsDollar,
  FaFile,
  FaTractor
} from 'react-icons/fa'

import { EquipmentType } from 'src/@types/equipment'

SwiperCore.use([Navigation, Thumbs])

export function Header(props: any) {
  const { '@mtu/token': token } = parseCookies()

  const equipment: EquipmentType | any = props.equipment

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <div className="grid gap-x-10 gap-y-5 lg:grid-cols-2">
      <div>
        <>
          <Swiper
            spaceBetween={5}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            className="bg-primary rounded h-120 w-full"
          >
            {equipment.album.length !== 0 ? (
              equipment.album.map((i: any) => {
                return (
                  <SwiperSlide key={i.codigo}>
                    <img src={i.img} className="h-120 object-cover w-full" />
                  </SwiperSlide>
                )
              })
            ) : (
              <SwiperSlide>
                <img
                  src="https://s3.amazonaws.com/meutratorusado.com.br/catalogo/imagem_provisoria.jpg"
                  className="h-120 object-cover w-full"
                />
              </SwiperSlide>
            )}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={5}
            slidesPerView={6}
            freeMode={true}
            watchSlidesVisibility={true}
            watchSlidesProgress={true}
            className="rounded mt-5 w-full"
          >
            {equipment.album.length !== 0 ? (
              equipment.album.map((i: any) => {
                return (
                  <SwiperSlide key={i.codigo}>
                    <img
                      src={i.img}
                      className="rounded h-24 object-cover w-24"
                    />
                  </SwiperSlide>
                )
              })
            ) : (
              <SwiperSlide>
                <img
                  src="https://s3.amazonaws.com/meutratorusado.com.br/catalogo/imagem_provisoria.jpg"
                  className="rounded h-24 object-cover w-24"
                />
              </SwiperSlide>
            )}
          </Swiper>
        </>
      </div>
      <div>
        <li
          className={
            props.info.page === 'Equipamento'
              ? 'bg-tertiary rounded font-light p-4 text-white'
              : 'bg-secondary rounded font-light p-4 text-white mb-2'
          }
        >
          <Link href={`/account/stock/equipment?chassi=${equipment.chassi}`}>
            <a className="items-center flex">
              <FaTractor className="mr-3" /> Informações do equipamento
            </a>
          </Link>
        </li>
        <li
          className={
            props.info.page === 'Documentos'
              ? 'bg-tertiary rounded font-light p-4 text-white'
              : 'bg-secondary rounded font-light p-4 text-white mb-2'
          }
        >
          <Link
            href={`/account/stock/equipment/documents?chassi=${equipment.chassi}`}
          >
            <a className="items-center flex">
              <FaFile className="mr-3" /> Documentos do equipamento
            </a>
          </Link>
        </li>
        <li
          className={
            props.info.page === 'Revisões'
              ? 'bg-tertiary rounded font-light p-4 text-white'
              : 'bg-secondary rounded font-light p-4 text-white mb-2'
          }
        >
          <Link
            href={`/account/stock/equipment/reviews?chassi=${equipment.chassi}`}
          >
            <a className="items-center flex">
              <FaClipboardList className="mr-3" /> Revisões do equipamento
            </a>
          </Link>
        </li>
        <li
          className={
            props.info.page === 'Negociações'
              ? 'bg-tertiary rounded font-light p-4 text-white'
              : 'bg-secondary rounded font-light p-4 text-white mb-2'
          }
        >
          <Link
            href={`/account/stock/equipment/negotiations?chassi=${equipment.chassi}`}
          >
            <a className="items-center flex">
              <FaCommentsDollar className="mr-3" /> Negociações do equipamento
            </a>
          </Link>
        </li>
        <li
          className={
            props.info.page === 'Checklist'
              ? 'bg-tertiary rounded font-light p-4 text-white'
              : 'bg-secondary rounded font-light p-4 text-white mb-2'
          }
        >
          <Link
            href={`/account/stock/equipment/negotiations?chassi=${equipment.chassi}`}
          >
            <a className="items-center flex">
              <FaTractor className="mr-3" /> Checklist do equipamento
            </a>
          </Link>
        </li>
        <li
          className={
            props.info.page === 'Avaliações'
              ? 'bg-tertiary rounded font-light p-4 text-white'
              : 'bg-secondary rounded font-light p-4 text-white mb-2'
          }
        >
          <Link
            href={`/account/stock/equipment/rating?chassi=${equipment.chassi}`}
          >
            <a className="items-center flex">
              <FaTractor className="mr-3" /> Avaliações do equipamento
            </a>
          </Link>
        </li>
        <li className={'bg-secondary rounded font-light p-4 text-white mb-2'}>
          <Link
            href={`https://redetratorusado.com.br/tratorapi/transfer/pdf/${token}/${equipment.empresa.idEmpresa}/${equipment.chassi}`}
          >
            <a className="items-center flex">
              <FaTractor className="mr-3" /> Relatório do equipamento
            </a>
          </Link>
        </li>
      </div>
    </div>
  )
}
