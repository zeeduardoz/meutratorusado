import { useState, useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Thumbs } from 'swiper/core'
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHeart,
  FaInfoCircle
} from 'react-icons/fa'

import { AuthContext } from '@contexts/AuthContext'
import { AdvertsContext } from '@contexts/AdvertsContext'
import { EquipmentType, ChecklistType } from 'src/@types/equipment'

SwiperCore.use([Navigation, Thumbs])

export function EquipmentNormal(props: any) {
  const { useUser } = useContext(AuthContext)
  const { startChat, useLoading, addFavorite, removeFavorite } =
    useContext(AdvertsContext)

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [equipment, setEquipment] = useState<EquipmentType[] | any>([
    props.equipment
  ])
  const checklist: ChecklistType[] = props.checklist
  const obs: string = props.obs

  const [contact, setContact] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>(
    'Olá, estou interessado e gostaria de receber mais informações sobre este equipamento.'
  )

  async function handleChat() {
    try {
      await startChat(
        equipment[0].chassi,
        equipment[0].empresa.idEmpresa,
        msg,
        useUser.idEmpresa
      )
    } catch (err) {
      console.log(err)
    }
  }

  async function handleAddFavorite(id: number) {
    try {
      const response = await addFavorite(id, 'only')
      if (response.status === true) {
        const data = equipment
        data[0].favorito = true

        setEquipment([...data])
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleRemoveFavorite(id: number) {
    try {
      const response = await removeFavorite(id, 'only')
      if (response.status === true) {
        const data = equipment
        data[0].favorito = false

        setEquipment([...data])
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="container items-start justify-between lg:flex lg:space-x-10">
        <div className="w-full lg:w-1/2">
          <>
            <Swiper
              spaceBetween={5}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              className="bg-primary rounded h-120 w-full"
            >
              {equipment[0].album.length !== 0 ? (
                equipment[0].album.map((i: any) => {
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
              {equipment[0].album.length !== 0 ? (
                equipment[0].album.map((i: any) => {
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
          {useUser ? (
            obs?.length > 1 ? (
              <div className="bg-primary rounded mt-5 p-10">
                <h1 className="text-2xl font-black text-color-light">
                  Observação
                </h1>
                <p className="font-light mt-5 text-color-medium">{obs}</p>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="mt-10 w-full lg:mt-0 lg:w-1/2">
          <div className="bg-primary rounded p-10">
            <div className="items-center flex justify-between">
              <p className="text-xl font-light text-color-light">
                {`${
                  equipment[0].modelo.tipo.descricaoTipo
                    .charAt(0)
                    .toUpperCase() +
                  equipment[0].modelo.tipo.descricaoTipo.slice(1).toLowerCase()
                } ${equipment[0].modelo.marca.nomeMarca} ${
                  equipment[0].modelo.descricaoModelo
                } Ano ${equipment[0].anoFabricacao}`}
              </p>
              {equipment[0].favorito ? (
                <button
                  onClick={() =>
                    handleRemoveFavorite(equipment[0].idProprietarioMaquina)
                  }
                  className="text-3xl hover:opacity-75 focus:outline-none p-2 text-color-danger delay-100 transition"
                >
                  <FaHeart />
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleAddFavorite(equipment[0].idProprietarioMaquina)
                  }
                  className="text-3xl hover:opacity-75 focus:outline-none p-2 text-gray-300 delay-100 transition"
                >
                  <FaHeart />
                </button>
              )}
            </div>
            <div className="mt-3">
              <p className="items-center flex text-color-medium">
                <span className="bg-color-medium rounded-full h-1.5 mr-3 w-1.5"></span>
                {new Intl.NumberFormat().format(equipment[0].horimetro)} Horas
              </p>
              <p className="items-center flex text-color-medium">
                <span className="bg-color-medium rounded-full h-1.5 mr-3 w-1.5"></span>
                {equipment[0].corExterna.length > 1
                  ? equipment[0].corExterna
                  : 'Nenhuma'}
              </p>
              <p className="items-center flex text-color-medium">
                <span className="bg-color-medium rounded-full h-1.5 mr-3 w-1.5"></span>
                {equipment[0].origem === 'N' ? 'Nacional' : 'Importado'}
              </p>
            </div>
            <hr className="border-hr-color my-10" />
            {useUser ? (
              useUser.perfil === 'R' ? (
                equipment[0].empresa.perfil === 'F' ? (
                  <div>
                    <p className="text-xl font-light text-color-light">
                      Preço desejado
                    </p>
                    <p className="text-3xl font-black text-color-light">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(equipment[0].precoRepasse)}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xl font-light text-color-light">
                      Preço de repasse
                    </p>
                    <p className="text-3xl font-black text-color-light">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(equipment[0].precoRepasse)}
                    </p>
                  </div>
                )
              ) : (
                <div>
                  <p className="text-xl font-light text-color-light">Preço</p>
                  <p className="text-3xl font-black text-color-light">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(equipment[0].precoPublico)}
                  </p>
                </div>
              )
            ) : (
              <div>
                <p className="text-xl font-light text-color-light">Preço</p>
                <div className="animate-pulse bg-foreground rounded py-3 w-1/3"></div>
              </div>
            )}
          </div>
          <div className="bg-primary rounded mt-5 p-10">
            <div className="items-center flex">
              <FaMapMarkerAlt className="text-xl mr-3 text-color-light" />
              <p className="text-xl font-light text-color-light">
                {equipment[0].empresa.cidade.nomeCidade
                  .charAt(0)
                  .toUpperCase() +
                  equipment[0].empresa.cidade.nomeCidade.slice(1).toLowerCase()}
                {' - '}
                {equipment[0].empresa.cidade.uf}
              </p>
            </div>
            <hr className="border-hr-color my-10" />
            <div>
              <h1 className="text-2xl font-black text-color-light">
                Entrar em Contato
              </h1>
              {useUser ? (
                <div className="mt-7">
                  <div className="items-center flex py-2">
                    <div className="bg-tertiary rounded p-3 text-center">
                      <FaEnvelope className="text-xl text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-color-light">E-mail</p>
                      <p className="text-sm font-light text-color-light">
                        {equipment[0].empresa.contato[0].email}
                      </p>
                    </div>
                  </div>
                  <div className="items-center flex py-2">
                    <div className="bg-tertiary rounded p-3 text-center">
                      <FaPhoneAlt className="text-xl text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-color-light">Telefone</p>
                      <p className="text-sm font-light text-color-light">
                        {equipment[0].empresa.contato[0].celular}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-7">
                  <div className="items-center flex py-2">
                    <div className="bg-tertiary rounded p-3 text-center">
                      <FaEnvelope className="text-xl text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-color-light">E-mail</p>
                      <div className="animate-pulse bg-foreground rounded py-2 w-24"></div>
                    </div>
                  </div>
                  <div className="items-center flex py-2">
                    <div className="bg-tertiary rounded p-3 text-center">
                      <FaPhoneAlt className="text-xl text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-color-light">Telefone</p>
                      <div className="animate-pulse bg-foreground rounded py-2 w-24"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-10">
              {useUser ? (
                contact ? (
                  <>
                    <div className="mt-3">
                      <label htmlFor="msg" className="block text-color-medium">
                        Observação
                      </label>
                      <textarea
                        name="msg"
                        defaultValue={msg}
                        onChange={e => setMsg(e.target.value)}
                        placeholder="Digite um mensagem."
                        className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm h-20 mt-1 outline-none px-4 py-3 text-color-light w-full"
                      ></textarea>
                    </div>
                    <button
                      onClick={() => handleChat()}
                      className="items-center bg-color-info rounded inline-flex text-lg font-black justify-center mt-5 hover:opacity-75 focus:outline-none py-4 text-white duration-150 transition ease-in-out w-full"
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
                      {!useLoading && <span>Enviar Mensagem</span>}
                    </button>
                    <small className="text-xs text-color-medium">
                      * Aqui você pode enviar uma proposta ou tirar dúvida a
                      respeito do equipamento
                    </small>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setContact(true)}
                      className="items-center bg-color-info rounded inline-flex text-lg font-black justify-center hover:opacity-75 focus:outline-none py-4 text-white duration-150 transition ease-in-out w-full"
                    >
                      <span>Enviar Mensagem</span>
                    </button>
                    <small className="text-xs text-color-medium">
                      * Aqui você pode enviar uma proposta ou tirar dúvida a
                      respeito do equipamento
                    </small>
                  </>
                )
              ) : (
                <>
                  <a className="bg-color-info rounded cursor-pointer block text-xl font-black mb-1 hover:opacity-75 focus:outline-none py-3.5 text-center text-white delay-100 transition w-full">
                    Entre para fazer Contato
                  </a>
                  <small className="text-xs text-color-medium">
                    * Para entrar em contato com o vendedor, primeiro deve estar
                    logado em nosso site.
                  </small>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {useUser ? (
        <div className="container bg-primary rounded mt-10 px-5 py-10 lg:p-14">
          <h1 className="text-3xl font-black mb-10 text-center text-color-light">
            Especificações técnicas
          </h1>
          {checklist && checklist?.length >= 1 ? (
            checklist.map((item, index) => {
              return (
                <div key={index} className="px-5">
                  <h1 className="text-xl font-black text-color-info">
                    {item.nomeGrupo.charAt(0).toUpperCase() +
                      item.nomeGrupo.slice(1).toLowerCase()}
                  </h1>
                  <div className="mt-5 lg:grid lg:gap-x-10 lg:grid-cols-2 lg:grid-rows-2">
                    {item.itens.map((i, index) => {
                      return (
                        <div
                          key={index}
                          className="items-center flex py-1 space-x-2 text-color-medium"
                        >
                          <FaInfoCircle />
                          <p>{i.nomeItem}:</p>
                          {item.nomeGrupo === 'PNEUS' ? (
                            <b className="text-xs font-black">{i.resposta}</b>
                          ) : item.nomeGrupo === 'PESOS' ? (
                            <b className="text-xs font-black">{i.resposta}</b>
                          ) : (
                            <b className="text-xs font-black lg:text-base">
                              {i.resposta}
                            </b>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <hr className="border-hr-color my-10" />
                </div>
              )
            })
          ) : (
            <p className="mt-5 text-center text-color-medium">
              Nenhuma especificação registrada.
            </p>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
