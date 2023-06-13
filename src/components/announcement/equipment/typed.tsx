import { useState, useContext } from 'react'
import NumberFormat from 'react-number-format'
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

export function EquipmentTyped(props: any) {
  const { useUser } = useContext(AuthContext)
  const { ratingAdvert, buyAdvert, useLoading, removeFavorite, addFavorite } =
    useContext(AdvertsContext)

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [equipment, setEquipment] = useState<EquipmentType[] | any>([
    props.equipment
  ])
  const checklist: ChecklistType[] = props.checklist
  const obs: string = props.obs

  const [modalAva, setModalAva] = useState<boolean>(false)
  const [modalBuy, setModalBuy] = useState<boolean>(false)
  const [ava, setAva] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')
  const [price, setPrice] = useState(equipment.valorUltimaAvaliacao)

  async function handleBuy() {
    try {
      await buyAdvert(equipment.chassi, equipment.empresa.idEmpresa)
      setModalBuy(false)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleRating() {
    try {
      await ratingAdvert(
        equipment.chassi,
        equipment.empresa.idEmpresa,
        price,
        msg
      )
      setModalAva(false)
    } catch (err) {
      console.log(err)
    }
  }

  function handlePrice(value: number) {
    setPrice(price + value)
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
          {useUser ? (
            <div className="bg-primary rounded mt-5 p-10">
              <div className="items-center flex">
                <FaMapMarkerAlt className="text-xl mr-3 text-color-light" />
                <p className="text-xl font-light text-color-light">
                  {equipment.empresa.cidade.nomeCidade.charAt(0).toUpperCase() +
                    equipment.empresa.cidade.nomeCidade.slice(1).toLowerCase()}
                  {' - '}
                  {equipment.empresa.cidade.uf}
                </p>
              </div>
              <hr className="border-hr-color my-10" />
              <div>
                <h1 className="text-2xl font-black text-color-light">
                  Entrar em Contato
                </h1>
                <div className="mt-7">
                  <div className="items-center flex py-2">
                    <div className="bg-tertiary rounded p-3 text-center">
                      <FaEnvelope className="text-xl text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-color-light">E-mail</p>
                      <p className="text-sm font-light text-color-light">
                        {equipment.empresa.contato[0].email}
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
                        {equipment.empresa.contato[0].celular}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-10 w-full lg:mt-0 lg:w-1/2">
          <div className="bg-primary rounded p-10">
            <div className="items-center flex justify-between">
              <p className="text-xl font-light text-color-light">
                {`${
                  equipment.modelo.tipo.descricaoTipo.charAt(0).toUpperCase() +
                  equipment.modelo.tipo.descricaoTipo.slice(1).toLowerCase()
                } ${equipment.modelo.marca.nomeMarca} ${
                  equipment.modelo.descricaoModelo
                } Ano ${equipment.anoFabricacao}`}
              </p>
              {equipment.favorito ? (
                <button
                  onClick={() =>
                    handleRemoveFavorite(equipment.idProprietarioMaquina)
                  }
                  className="text-3xl hover:opacity-75 focus:outline-none p-2 text-color-danger delay-100 transition"
                >
                  <FaHeart />
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleAddFavorite(equipment.idProprietarioMaquina)
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
                {new Intl.NumberFormat().format(equipment.horimetro)} Horas
              </p>
              <p className="items-center flex text-color-medium">
                <span className="bg-color-medium rounded-full h-1.5 mr-3 w-1.5"></span>
                {equipment.corExterna.length > 1
                  ? equipment.corExterna
                  : 'Nenhuma'}
              </p>
              <p className="items-center flex text-color-medium">
                <span className="bg-color-medium rounded-full h-1.5 mr-3 w-1.5"></span>
                {equipment.origem === 'N' ? 'Nacional' : 'Importado'}
              </p>
            </div>
            <hr className="border-hr-color my-10" />
            {useUser ? (
              equipment.empresa.perfil === 'F' ? (
                <div>
                  <p className="text-xl font-light text-color-light">
                    Preço desejado
                  </p>
                  <p className="text-3xl font-black text-color-light">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(equipment.precoRepasse)}
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
                    }).format(equipment.precoRepasse)}
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
            {useUser ? (
              obs.length > 1 ? (
                <>
                  <h1 className="text-2xl font-black text-color-light">
                    Observação
                  </h1>
                  <p className="font-light mt-5 text-color-medium">{obs}</p>
                  <hr className="border-hr-color my-10" />
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-black text-color-light">
                    Observação
                  </h1>
                  <p className="font-light mt-5 text-justify text-color-medium">
                    Nenhuma observação.
                  </p>
                </>
              )
            ) : (
              <>
                <div className="items-center flex">
                  <FaMapMarkerAlt className="text-xl mr-3 text-color-light" />
                  <p className="text-xl font-light text-color-light">
                    {equipment.empresa.cidade.nomeCidade
                      .charAt(0)
                      .toUpperCase() +
                      equipment.empresa.cidade.nomeCidade
                        .slice(1)
                        .toLowerCase()}
                    {' - '}
                    {equipment.empresa.cidade.uf}
                  </p>
                </div>
                <hr className="border-hr-color my-10" />
                <div>
                  <h1 className="text-2xl font-black text-color-light">
                    Entrar em Contato
                  </h1>
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
                </div>
              </>
            )}
            <div className="mt-10">
              {useUser ? (
                <>
                  <div>
                    <p className="text-lg font-light text-color-light">
                      Valor da última avaliação
                    </p>
                    <p className="text-2xl font-black text-color-light">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(equipment.valorUltimaAvaliacao)}
                    </p>
                  </div>
                  <div className="mt-10">
                    <button
                      onClick={() => setModalBuy(true)}
                      className="items-center animate-pulse bg-color-warning rounded inline-flex text-lg font-black justify-center hover:opacity-75 focus:outline-none py-4 text-white duration-150 transition ease-in-out w-full"
                    >
                      <span>Comprar Agora</span>
                    </button>
                    <div className="items-center inline-flex justify-center my-5 w-full">
                      <hr className="border-hr-color w-1/3" />
                      <p className="text-2xl tracking-wider px-5 text-center text-color-medium">
                        OU
                      </p>
                      <hr className="border-hr-color w-1/3" />
                    </div>
                    {ava ? (
                      <>
                        <div>
                          <div className="mt-3">
                            <label
                              htmlFor="price"
                              className="block text-color-medium"
                            >
                              Avaliar em
                            </label>
                            <NumberFormat
                              value={price}
                              thousandSeparator={true}
                              onChange={e =>
                                setPrice(
                                  parseInt(
                                    e.target.value
                                      .replaceAll('.', '')
                                      .replaceAll(',', '')
                                      .replaceAll('R$', '')
                                      .replaceAll(' ', '')
                                  )
                                )
                              }
                              prefix={'R$ '}
                              name="price"
                              placeholder="Digite o valor que irá avaliar este equipamento"
                              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
                            />
                          </div>

                          <div className="mt-6">
                            <label
                              htmlFor="obs"
                              className="block text-color-medium"
                            >
                              Observação
                            </label>
                            <textarea
                              name="obs"
                              onChange={e => setMsg(e.target.value)}
                              placeholder="Alguma observação sobre o equipamento?"
                              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm h-20 mt-1 outline-none px-4 py-3 text-color-light w-full"
                            ></textarea>
                          </div>
                        </div>
                        <button
                          onClick={() => setModalAva(true)}
                          className="items-center bg-color-info rounded inline-flex text-lg font-black justify-center mt-5 hover:opacity-75 focus:outline-none py-4 text-white duration-150 transition ease-in-out w-full"
                        >
                          <span>Avaliar Agora</span>
                        </button>
                        <div className="grid gap-5 grid-cols-3 mt-5">
                          <button
                            onClick={() => handlePrice(500)}
                            className="items-center bg-color-info rounded inline-flex font-black justify-center hover:opacity-75 focus:outline-none py-3 text-white duration-150 transition ease-in-out w-full"
                          >
                            <span>+ 500</span>
                          </button>
                          <button
                            onClick={() => handlePrice(1500)}
                            className="items-center bg-color-info rounded inline-flex font-black justify-center hover:opacity-75 focus:outline-none py-3 text-white duration-150 transition ease-in-out w-full"
                          >
                            <span>+ 1500</span>
                          </button>
                          <button
                            onClick={() => handlePrice(5000)}
                            className="items-center bg-color-info rounded inline-flex font-black justify-center hover:opacity-75 focus:outline-none py-3 text-white duration-150 transition ease-in-out w-full"
                          >
                            <span>+ 5000</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => setAva(true)}
                        className="items-center bg-color-info rounded inline-flex text-lg font-black justify-center hover:opacity-75 focus:outline-none py-4 text-white duration-150 transition ease-in-out w-full"
                      >
                        <span>Avaliar Agora</span>
                      </button>
                    )}
                  </div>
                </>
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
          {checklist && checklist.length >= 1 ? (
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
      {modalBuy ? (
        <div
          className="min-w-scree animated fadeIn faster items-center bg-center bg-no-repeat bg-cover flex h-screen inset-0 left-0 top-0 justify-center outline-none focus:outline-none fixed z-50"
          id="modal-id"
        >
          <div className="bg-black inset-0 opacity-90 absolute z-0"></div>
          <div className="bg-primary rounded-xl shadow-lg mx-auto my-auto max-w-lg p-5 relative w-full">
            <div>
              <div className="flex-auto justify-center p-5 text-center">
                <h2 className="text-2xl font-black py-4 text-color-light">
                  Tem certeza?
                </h2>
                <p className="px-8 text-color-medium">
                  Tem certeza que deseja comprar este equipamento? Clique em
                  "COMPRAR" para prosseguir.
                </p>
              </div>

              <div className="mt-2 p-3 space-x-4 text-center md:block">
                <button
                  onClick={() => setModalBuy(false)}
                  className="items-center bg-color-danger rounded-full hover:shadow-lg shadow-sm inline-flex justify-center mb-2 hover:opacity-75 focus:outline-none px-10 py-3 text-white md:mb-0"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBuy()}
                  disabled={useLoading}
                  className="items-center bg-color-success rounded-full hover:shadow-lg shadow-sm inline-flex justify-center mb-2 hover:opacity-75 focus:outline-none px-10 py-3 text-white md:mb-0"
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
                  {!useLoading && <span>Comprar</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {modalAva ? (
        <div
          className="min-w-scree animated fadeIn faster items-center bg-center bg-no-repeat bg-cover flex h-screen inset-0 left-0 top-0 justify-center outline-none focus:outline-none fixed z-50"
          id="modal-id"
        >
          <div className="bg-black inset-0 opacity-90 absolute z-0"></div>
          <div className="bg-primary rounded-xl shadow-lg mx-auto my-auto max-w-lg p-5 relative w-full">
            <div>
              <div className="flex-auto justify-center p-5 text-center">
                <h2 className="text-2xl font-black py-4 text-color-light">
                  Tem certeza?
                </h2>
                <p className="px-8 text-color-medium">
                  Tem certeza que deseja avaliar este equipamento por{' '}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(price)}
                  ? Clique em "AVALIAR" para prosseguir.
                </p>
              </div>

              <div className="mt-2 p-3 space-x-4 text-center md:block">
                <button
                  onClick={() => setModalAva(false)}
                  className="items-center bg-color-danger rounded-full hover:shadow-lg shadow-sm inline-flex justify-center mb-2 hover:opacity-75 focus:outline-none px-10 py-3 text-white md:mb-0"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRating()}
                  disabled={useLoading}
                  className="items-center bg-color-success rounded-full hover:shadow-lg shadow-sm inline-flex justify-center mb-2 hover:opacity-75 focus:outline-none px-10 py-3 text-white md:mb-0"
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
                  {!useLoading && <span>Avaliar</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
