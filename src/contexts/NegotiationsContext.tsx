/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { parseCookies } from 'nookies'
import { createContext, useContext, useState } from 'react'

import { api } from '@services/api'
import { AlertError, AlertSuccess } from '@hooks/useAlert'
import { AuthContext } from './AuthContext'
import { formatDate } from '@services/date'

type NegotiationProps = {
  empresa: {
    idEmpresa: number
    cnpj: number
    nomeFantasia: string
    cidade: {
      codCidade: number
      nomeCidade: string
      uf: string
    }
  }
  chassi: string
  foto: string
  marca: string
  modelo: string
  ano: number
  horimetro: number
  corExterna: string
  preco: number
  favorito: boolean
}

type Msg = {
  dataHora: number
  dataHoraTxt: string
  usuarioOrigem: string
  mensagem: string
}

type ChatProps = {
  cliente: {
    idEmpresa: number
    cnpj: number
    nomeFantasia: string
  }
  mensagens: Msg[]
}

type NegotiationContextType = {
  negotiations: NegotiationProps[]
  negotiation: ChatProps[]
  useLoading: boolean

  getNegotiations: (type: string, chassi?: string, id?: number) => void
  getNegotiation: (chassi: string, id: number) => Promise<any>
  sendMsg: (msg: string, chassi: string, id: number) => void
}

export const NegotiationContext = createContext({} as NegotiationContextType)

export const NegotiationProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [negotiations, setNegotiations] = useState<NegotiationProps[] | any>(
    null
  )
  const [negotiation, setNegotiation] = useState<ChatProps[] | any>(null)
  const { useUser } = useContext(AuthContext)

  async function getNegotiation(chassi: string, id: number) {
    const { '@mtu/token': token } = parseCookies()

    if (token) {
      try {
        const response = await api.get(`/chat/${id}/${chassi}`, {
          headers: { 'Token-Trator': token }
        })

        if (response.data.mensagem.erro !== true) {
          const data = response.data.negociacao.filter(
            (n: any) => n.cliente.idEmpresa === useUser.idEmpresa
          )
          setNegotiation(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function getNegotiations(type: string, chassi?: string, id?: number) {
    const { '@mtu/token': token } = parseCookies()

    setLoading(true)
    if (token) {
      try {
        const response = await api.get(`/chat/lista`, {
          headers: { 'Token-Trator': token }
        })

        if (response.data.mensagem.erro !== true) {
          setNegotiations(response.data.anuncios)
          setLoading(false)
          if (type === 'initial') {
            getNegotiation(
              response.data.anuncios[0].chassi,
              response.data.anuncios[0].empresa.idEmpresa
            )
          } else {
            getNegotiation(chassi!, id!)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function sendMsg(msg: string, chassi: string, id: number) {
    const { '@mtu/token': token } = parseCookies()

    try {
      const response = await api.post(
        `/chat`,
        {
          empresaChassi: id,
          chassi,
          mensagem: msg,
          empresaMensagem: useUser.idEmpresa
        },
        {
          headers: { 'Token-Trator': token }
        }
      )

      if (response.data.erro !== true) {
        AlertSuccess(response.data.mensagem)

        const msgAdd = {
          dataHora: 0,
          dataHoraTxt: formatDate(new Date(Date.now())),
          usuarioOrigem: useUser.nomeFantasia,
          mensagem: msg
        }

        const data = negotiation
        data[0].mensagens.push(msgAdd)

        setNegotiation([...data])
      } else {
        AlertError(response.data.mensagem)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <NegotiationContext.Provider
      value={{
        negotiations,
        negotiation,
        getNegotiations,
        getNegotiation,
        sendMsg,
        useLoading
      }}
    >
      {children}
    </NegotiationContext.Provider>
  )
}
