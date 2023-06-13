import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  FaTractor,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUniversity,
  FaCalendarAlt,
  FaReceipt
} from 'react-icons/fa'

import { formatDate } from '@services/date'

type InvoiceProps = {
  nossoNumero: string
  seuNumero: string
  linhaDigitavel: string
  nomeSacado: string
  situacao: string
  dataPagtoBaixa: string
  dataVencimento: string
  valorNominal: number
  dataEmissao: string

  equipamento: {
    empresa: {
      idEmpresa: number
      cnpj: number
      perfil: string
      nomeFantasia: string
      cidade: {
        codCidade: number
        nomeCidade: string
        uf: string
      }
      contato: [
        {
          nome: string
          telefone: string
          ramal: number
          celular: string
          email: string
        }
      ]
      dadosFinanceiros: {
        banco: number
        agencia: number
        contaCorrente: string
        orientacoes: string
      }
    }
    chassi: string
    modelo: {
      marca: {
        codMarca: number
        nomeMarca: string
      }
      tipo: {
        codTipo: number
        descricaoTipo: string
      }
      codModelo: number
      descricaoModelo: string
    }
    anoFabricacao: number
    horimetro: number
  }

  venda: {
    dataVenda: string
    precoVenda: number
    boletoPago: boolean
  }
}

export function Modal(props: any) {
  const [open, setOpen] = useState(false)
  const invoice: InvoiceProps = props.invoice
  const cancelButton = useRef(null)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-color-warning rounded text-sm font-black hover:opacity-75 focus:outline-none py-2 text-center text-white delay-100 transition w-full"
      >
        Ver mais
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="inset-0 overflow-y-auto fixed z-20"
          initialFocus={cancelButton}
          open={open}
          onClose={setOpen}
        >
          <div className="items-end flex justify-center min-h-screen pb-20 pt-4 px-4 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="bg-gray-500 bg-opacity-75 inset-0 fixed transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="bg-primary rounded-lg shadow-xl inline-block overflow-hidden text-left transform transition-all align-bottom sm:my-8 sm:max-w-lg sm:align-middle sm:w-full">
                <div className="bg-primary pb-4 pt-5 px-4 sm:p-6 sm:pb-4">
                  <div className="sm:items-start sm:flex">
                    <div className="mt-3 py-5 text-center w-full sm:ml-4 sm:mt-0 sm:text-left">
                      <div>
                        <a
                          className="bg-color-success rounded block text-xl font-black hover:opacity-75 py-4 text-center text-white delay-100 transition w-full"
                          href={`https://redetratorusado.com.br/tratorapi/boletos/pdf/${invoice.nossoNumero}`}
                          target="_blank"
                        >
                          Pagar Boleto
                        </a>
                      </div>
                      <div className="mt-16">
                        <h1 className="text-2xl font-bold mb-5 text-color-info">
                          Equipamento
                        </h1>

                        <div className="items-center flex mt-2 w-full">
                          <div className="items-center bg-tertiary rounded flex justify-center p-2">
                            <FaTractor className="text-white" />
                          </div>
                          <p className="font-light ml-3 text-color-light">
                            Marca:{' '}
                            <b className="font-semibold">
                              {invoice.equipamento.modelo.marca.nomeMarca}
                            </b>
                          </p>
                        </div>
                        <div className="items-center flex mt-2 w-full">
                          <div className="items-center bg-tertiary rounded flex justify-center p-2">
                            <FaTractor className="text-white" />
                          </div>
                          <p className="font-light ml-3 text-color-light">
                            Modelo:{' '}
                            <b className="font-semibold">
                              {invoice.equipamento.modelo.descricaoModelo}
                            </b>
                          </p>
                        </div>
                        <div className="items-center flex mt-2 w-full">
                          <div className="items-center bg-tertiary rounded flex justify-center p-2">
                            <FaTractor className="text-white" />
                          </div>
                          <p className="font-light ml-3 text-color-light">
                            Ano de Fabricação:{' '}
                            <b className="font-semibold">
                              {invoice.equipamento.anoFabricacao}
                            </b>
                          </p>
                        </div>
                        <div className="items-center flex mt-2 w-full">
                          <div className="items-center bg-tertiary rounded flex justify-center p-2">
                            <FaTractor className="text-white" />
                          </div>
                          <p className="font-light ml-3 text-color-light">
                            Chassi:{' '}
                            <b className="font-semibold">
                              {invoice.equipamento.chassi}
                            </b>
                          </p>
                        </div>
                        <div className="items-center flex mt-2 w-full">
                          <div className="items-center bg-tertiary rounded flex justify-center p-2">
                            <FaTractor className="text-white" />
                          </div>
                          <p className="font-light ml-3 text-color-light">
                            Horímetro:{' '}
                            <b className="font-semibold">
                              {new Intl.NumberFormat().format(
                                invoice.equipamento.horimetro
                              )}{' '}
                              horas
                            </b>
                          </p>
                        </div>

                        <hr className="border-hr-color mx-auto my-10 w-full" />

                        <h1 className="text-2xl font-bold mb-5 text-color-info">
                          Dados de Venda
                        </h1>

                        <div className="my-5">
                          <div className="items-center flex mt-2 w-full">
                            <div className="items-center bg-tertiary rounded flex justify-center p-2">
                              <FaUser className="text-white" />
                            </div>
                            <p className="font-light ml-3 text-color-light">
                              Vendedor:{' '}
                              <b className="font-semibold">
                                {invoice.equipamento.empresa.contato[0].nome}
                              </b>
                            </p>
                          </div>
                          <div className="items-center flex mt-2 w-full">
                            <div className="items-center bg-tertiary rounded flex justify-center p-2">
                              <FaPhoneAlt className="text-white" />
                            </div>
                            <p className="font-light ml-3 text-color-light">
                              Telefone:{' '}
                              <b className="font-semibold">
                                {invoice.equipamento.empresa.contato[0].celular}
                              </b>
                            </p>
                          </div>
                          <div className="items-center flex mt-2 w-full">
                            <div className="items-center bg-tertiary rounded flex justify-center p-2">
                              <FaEnvelope className="text-white" />
                            </div>
                            <p className="font-light ml-3 text-color-light">
                              E-mail:{' '}
                              <b className="font-semibold">
                                {invoice.equipamento.empresa.contato[0].email}
                              </b>
                            </p>
                          </div>
                          <div className="items-center flex mt-2 w-full">
                            <div className="items-center bg-tertiary rounded flex justify-center p-2">
                              <FaMapMarkerAlt className="text-white" />
                            </div>
                            <p className="font-light ml-3 text-color-light">
                              Localidade:{' '}
                              <b className="font-semibold">
                                {invoice.equipamento.empresa.cidade.nomeCidade}{' '}
                                - {invoice.equipamento.empresa.cidade.uf}
                              </b>
                            </p>
                          </div>
                        </div>

                        <div className="my-10">
                          <div className="items-center flex mt-2 w-full">
                            <div className="items-center bg-tertiary rounded flex justify-center p-2">
                              <FaUniversity className="text-white" />
                            </div>
                            <p className="font-light ml-3 text-color-light">
                              Banco:{' '}
                              <b className="font-semibold">
                                {
                                  invoice.equipamento.empresa.dadosFinanceiros
                                    .banco
                                }
                              </b>
                            </p>
                          </div>
                          <div className="items-center flex mt-2 w-full">
                            <div className="items-center bg-tertiary rounded flex justify-center p-2">
                              <FaUniversity className="text-white" />
                            </div>
                            <p className="font-light ml-3 text-color-light">
                              Agencia:{' '}
                              <b className="font-semibold">
                                {
                                  invoice.equipamento.empresa.dadosFinanceiros
                                    .agencia
                                }
                              </b>
                            </p>
                          </div>
                          <div className="items-center flex mt-2 w-full">
                            <div className="items-center bg-tertiary rounded flex justify-center p-2">
                              <FaUniversity className="text-white" />
                            </div>
                            <p className="font-light ml-3 text-color-light">
                              Numero da Conta:{' '}
                              <b className="font-semibold">
                                {
                                  invoice.equipamento.empresa.dadosFinanceiros
                                    .contaCorrente
                                }
                              </b>
                            </p>
                          </div>
                        </div>

                        <div className="my-10">
                          <div className="items-center flex mt-2 w-full">
                            <div className="items-center bg-tertiary rounded flex justify-center p-2">
                              <FaReceipt className="text-white" />
                            </div>
                            <p className="font-light ml-3 text-color-light">
                              Valor da Compra:{' '}
                              <b className="font-semibold">
                                {new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL'
                                }).format(invoice.venda.precoVenda)}
                              </b>
                            </p>
                          </div>
                          <div className="items-center flex mt-2 w-full">
                            <div className="items-center bg-tertiary rounded flex justify-center p-2">
                              <FaCalendarAlt className="text-white" />
                            </div>
                            <p className="font-light ml-3 text-color-light">
                              Data de Compra:{' '}
                              <b className="font-semibold">
                                {formatDate(invoice.venda.dataVenda)}
                              </b>
                            </p>
                          </div>
                        </div>

                        <hr className="border-hr-color mx-auto my-10 w-full" />

                        <h1 className="text-2xl font-bold mb-5 text-color-info">
                          Orientações para Comprador
                        </h1>

                        <div className="mt-2">
                          <p className="text-sm font-light text-color-light">
                            {
                              invoice.equipamento.empresa.dadosFinanceiros
                                .orientacoes
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
