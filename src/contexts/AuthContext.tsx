import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'

import { api } from '@services/api'
import { AlertSuccess, AlertError } from '@hooks/useAlert'

type ContactType = {
  nome: string
  telefone: string
  ramal: number
  celular: string
  email: string
}

type UserType = {
  idEmpresa: number
  cnpj: number
  perfil: string
  cnpjCpfValido: boolean
  razaoSocial: string
  nomeFantasia: string
  telefone: string
  whatsapp: string
  facebook: string
  instagran: string
  twitter: string
  endereco: string
  numero: number
  complemento: string
  cep: number
  bairro: string
  cidade: {
    codCidade: number
    nomeCidade: string
    uf: string
  }
  contato: ContactType[]
  plano: {
    codPlano: number
    nomePlano: string
    descricaoPlano: string
    quantidadeDestaque: number
    valorPlano: number
  }
  dadosFinanceiros: {
    banco: number
    agencia: number
    contaCorrente: string
    taxaComissao: number
    diasVencimentoBoleto: number
    temBoletoAberto: true
  }
  login: string
  status: string
  dataCadastro: string
}

type signInType = {
  user: string
  password: string
}

type createAccountType = {
  perfil: string
  name: string
  fantasyName: string
  document: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string
  phoneNumber: string

  contactName: string
  contactEmail: string
  contactCel: string
  contactTel: string
  contactRamal: number

  bank: number
  agency: number
  accountNumber: number

  user: string
  plan: string
  password: string
}

type updateAccountType = {
  perfil: string
  name: string
  fantasyName: string
  document: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string
  phoneNumber: string
  whatsapp: string
  facebook: string
  instagram: string
  twitter: string

  contactName: string
  contactEmail: string
  contactCel: string
  contactTel: string
  contactRamal: number

  bank: number
  agency: number
  accountNumber: number

  user: string
  plan: string
  password: string
}

type AuthCotextType = {
  useLoading: boolean
  useUser: UserType

  createAccount: (data: createAccountType) => Promise<any>
  updateAccount: (data: updateAccountType) => Promise<any>
  signIn: (data: signInType) => Promise<any>
  signOut: () => void
  refresh: () => void
}

export const AuthContext = createContext({} as AuthCotextType)

export function signOut() {
  destroyCookie(undefined, '@mtu/token', {
    path: '/'
  })

  Router.push('/')
}

export const AuthProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [useUser, setUser] = useState<UserType | any>(null)
  const [useUpdate, setUpdate] = useState(0)

  useEffect(() => {
    const { '@mtu/token': token } = parseCookies()

    if (token) {
      setLoading(true)
      api
        .get(`/empresas`, { headers: { 'Token-Trator': token } })
        .then(r => {
          if (r.data.mensagem !== true) {
            setUser(r.data.empresa)
          }
        })
        .catch(err => {
          console.log(err)
          signOut()
        })
      setLoading(false)
    }
  }, [useUpdate])

  function signOut() {
    destroyCookie(undefined, '@mtu/token', {
      path: '/'
    })

    setUser(null)

    Router.push('/')
  }

  async function signIn(data: signInType) {
    try {
      const response = await api.get(
        `/empresas/login/${data.user}/${data.password}`
      )

      if (response.data.erro !== true) {
        AlertSuccess('Autenticado com sucesso!')

        setCookie(undefined, '@mtu/token', response.data.mensagem, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        })

        api
          .get(`/empresas`, {
            headers: { 'Token-Trator': response.data.mensagem }
          })
          .then(r => {
            if (r.data.mensagem !== true) {
              setUser(r.data.empresa)
            }
          })
          .catch(err => {
            console.log(err)
            signOut()
          })

        Router.push('/')
      } else {
        AlertError(response.data.mensagem)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function createAccount(data: createAccountType) {
    const response = await api.post(
      '/empresas',
      {
        empresa: {
          cnpj: parseInt(
            data.document
              .split('.')
              .join('')
              .split('/')
              .join('')
              .split('-')
              .join('')
          ),
          perfil: data.perfil,
          razaoSocial: data.name,
          nomeFantasia: data.fantasyName,
          telefone: data.phoneNumber,
          endereco: data.street,
          numero: parseInt(data.number),
          complemento: data.complement,
          cep: parseInt(data.cep.replace('-', '')),
          bairro: data.neighborhood,
          cidade: {
            codCidade: parseInt(data.city.split('_')[0]),
            nomeCidade: data.city.split('_')[1],
            uf: data.state
          },
          whatsapp: '',
          facebook: '',
          instagran: '',
          twitter: '',
          contato: [
            {
              nome: data.contactName,
              telefone: data.contactTel,
              ramal: data.contactRamal ? data.contactRamal : 0,
              celular: data.contactCel,
              email: data.contactEmail
            }
          ],
          login: data.user,
          senha: data.password,
          plano: {
            codPlano: parseInt(data.plan.split('_')[0]),
            nomePlano: data.plan.split('_')[1]
          },
          dadosFinanceiros: {
            banco: data.bank,
            agencia: data.agency,
            contaCorrente: data.accountNumber
          }
        }
      },
      { headers: { 'Token-Trator': 'novo-cadastro' } }
    )

    if (response.data.erro !== true) {
      AlertSuccess(response.data.mensagem)
      Router.push('/auth/email/confirm')
    } else {
      AlertError(response.data.mensagem)
    }
  }

  async function updateAccount(data: updateAccountType) {
    const { '@mtu/token': token } = parseCookies()

    const response = await api.post(
      '/empresas',
      {
        empresa: {
          cnpj: parseInt(
            data.document
              .split('.')
              .join('')
              .split('/')
              .join('')
              .split('-')
              .join('')
          ),
          perfil: data.perfil,
          razaoSocial: data.name,
          nomeFantasia: data.fantasyName,
          telefone: data.phoneNumber,
          endereco: data.street,
          numero: parseInt(data.number),
          complemento: data.complement,
          cep: parseInt(data.cep.replace('-', '')),
          bairro: data.neighborhood,
          cidade: {
            codCidade: parseInt(data.city.split('_')[0]),
            nomeCidade: data.city.split('_')[1],
            uf: data.state
          },
          whatsapp: data.whatsapp,
          facebook: data.facebook,
          instagran: data.instagram,
          twitter: data.twitter,
          contato: [
            {
              nome: data.contactName,
              telefone: data.contactTel,
              ramal: data.contactRamal ? data.contactRamal : 0,
              celular: data.contactCel,
              email: data.contactEmail
            }
          ],
          login: data.user,
          senha: data.password,
          plano: {
            codPlano: parseInt(data.plan.split('_')[0]),
            nomePlano: data.plan.split('_')[1]
          },
          dadosFinanceiros: {
            banco: data.bank,
            agencia: data.agency,
            contaCorrente: data.accountNumber
          }
        }
      },
      { headers: { 'Token-Trator': token } }
    )

    if (response.data.erro !== true) {
      AlertSuccess(response.data.mensagem)
    } else {
      AlertError(response.data.mensagem)
    }
  }

  function refresh() {
    setUpdate(Math.random() * 1000)
  }

  return (
    <AuthContext.Provider
      value={{
        useLoading,
        useUser,
        createAccount,
        signIn,
        refresh,
        signOut,
        updateAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
