import { parseCookies } from 'nookies'
import { useState, useEffect } from 'react'
import { FaTractor } from 'react-icons/fa'

import { api } from '@services/api'
import { Modal } from './modal'
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

export function ListInvoices() {
  const [useLoading, setLoading] = useState<boolean>(true)
  const [invoices, setInvoices] = useState<InvoiceProps[] | any>(null)

  useEffect(() => {
    const { '@mtu/token': token } = parseCookies()

    setLoading(true)
    if (token) {
      try {
        api
          .get(`/boletos/meus-em-aberto`, {
            headers: { 'Token-Trator': token }
          })
          .then(response => {
            if (response.data.mensagem !== true) {
              setInvoices(response.data.listaBoletos)
              setLoading(false)
            }
          })
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  return useLoading ? (
    <div className="flex flex-col mt-2 space-y-2">
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
      <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
    </div>
  ) : invoices && invoices.length >= 1 ? (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-primary border-b border-t">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                  >
                    Equipamento
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                  >
                    Vendedor / Preço
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                  >
                    Data de Venda
                  </th>
                  <th scope="col" className="p-5 relative">
                    <span className="sr-only">Funções</span>
                  </th>
                </tr>
              </thead>
              <div className="bg-primary py-1.5"></div>
              <tbody className="bg-primary rounded-lg divide-primary divide-y-8">
                {invoices.map((i: InvoiceProps, index: number) => {
                  return (
                    <tr key={index} className="bg-foreground">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="items-center flex">
                          <div className="items-center bg-tertiary rounded-full flex justify-center p-3">
                            <FaTractor className="text-3xl text-white" />
                          </div>
                          <div className="ml-5">
                            <p className="font-black text-color-light">
                              {i.equipamento.modelo.marca.nomeMarca}
                            </p>
                            <p className="text-sm -mt-1 text-color-light">
                              {i.equipamento.modelo.descricaoModelo},{' '}
                              {i.equipamento.anoFabricacao}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="text-sm text-center text-color-medium lg:text-left">
                          {i.equipamento.empresa.nomeFantasia}
                        </p>
                        <p className="text-sm text-color-light">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(i.venda.precoVenda)}
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <p className="text-sm text-center text-color-light lg:text-left">
                          {formatDate(i.venda.dataVenda)}
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <Modal invoice={i} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="font-light py-10 text-center text-color-medium">
      Nenhum favorito encontrado.
    </p>
  )
}
