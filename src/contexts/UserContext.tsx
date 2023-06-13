import { parseCookies } from 'nookies'
import { createContext, useEffect, useState } from 'react'

import { api } from '@services/api'

type NotificationProps = {
  codNotificacao: number
  tipo: string
  mensagem: string
  chassi: string
  empresaChassi: number
}

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
  }

  dataVenda: string
  precoVenda: number
  boletoPago: boolean
}

type UserContextType = {
  notifications: NotificationProps[]
  invoices: InvoiceProps[]

  clearNotifications: () => Promise<any>
  deleteNotification: (id: number) => Promise<any>
}

export const UserContext = createContext({} as UserContextType)

export const UserProvider: React.FC = ({ children }: any) => {
  const [notifications, setNotifications] = useState<NotificationProps[] | any>(
    null
  )
  const [invoices, setInvoices] = useState<InvoiceProps[] | any>(null)

  useEffect(() => {
    const { '@mtu/token': token } = parseCookies()

    if (token) {
      api
        .get(`/empresas/notificacoes`, { headers: { 'Token-Trator': token } })
        .then(n => {
          if (n.data.mensagem !== true) {
            setNotifications(n.data.notificacoes)
          }
        })
        .catch(err => {
          console.log(err)
          setNotifications(null)
        })

      api
        .get(`/boletos/meus-em-aberto`, { headers: { 'Token-Trator': token } })
        .then(b => {
          if (b.data.mensagem !== true) {
            setInvoices(b.data.listaBoletos)
          }
        })
        .catch(err => {
          console.log(err)
          setInvoices(null)
        })
    }
  }, [])

  async function clearNotifications() {
    const { '@mtu/token': token } = parseCookies()

    if (notifications) {
      notifications.forEach((n: NotificationProps) => {
        api.delete(`/empresas/notificacoes/${n.codNotificacao}`, {
          headers: { 'Token-Trator': token }
        })
      })
      setNotifications([])
    }
  }

  async function deleteNotification(id: number) {
    const { '@mtu/token': token } = parseCookies()
    if (token) {
      const response = await api.delete(`/empresas/notificacoes/${id}`, {
        headers: { 'Token-Trator': token }
      })

      if (response.data.mensagem.erro !== true) {
        const data = notifications.filter(
          (i: NotificationProps) => i.codNotificacao !== id
        )
        setNotifications(data)
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        notifications,
        invoices,
        deleteNotification,
        clearNotifications
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
