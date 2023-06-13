import Router from 'next/router'
import { parseCookies } from 'nookies'
import { createContext, useState } from 'react'

import { api } from '@services/api'
import { AlertSuccess, AlertError } from '@hooks/useAlert'

type Directed = {
  idProprietarioMaquina: number
  chassi: string
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
  foto: string
  marca: string
  modelo: string
  ano: number
  horimetro: number
  corExterna: string
  preco: number
  categoria: string
  favorito: boolean
}

type Adverts = {
  idProprietarioMaquina: number
  chassi: string
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
  foto: string
  marca: string
  modelo: string
  ano: number
  horimetro: number
  corExterna: string
  preco: number
  categoria: string
  favorito: boolean
}

type AdvertsContextType = {
  useLoading: boolean
  adverts: Adverts[]
  directed: Directed[]
  searchAdverts: (data: any) => Promise<any>
  getAdverts: (uf?: string, city?: string) => Promise<any>
  getDirected: () => Promise<any>
  buyAdvert: (chassi: string, id: number) => Promise<any>
  ratingAdvert: (
    chassi: string,
    id: number,
    avaPrice: any,
    avaObs: string
  ) => Promise<any>
  startChat: (
    chassi: string,
    id: number,
    msg: string,
    sender: number
  ) => Promise<any>
  addFavorite: (id: number, multiple: string) => Promise<any>
  removeFavorite: (id: number, multiple: string) => Promise<any>
}

export const AdvertsContext = createContext({} as AdvertsContextType)

export const AdvertsProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [adverts, setAdverts] = useState<Adverts[] | any>(null)
  const [directed, setDirected] = useState<Adverts[] | any>(null)

  async function getAdverts(uf?: string, city?: string) {
    const { '@mtu/token': token } = parseCookies()

    setLoading(true)
    if (token) {
      try {
        const response = await api.get(
          `/equipamentosDeTerceiros${uf ? `?uf=${uf}` : ''}${
            city ? `&cidade=${city}` : ''
          }`,
          {
            headers: { 'Token-Trator': token }
          }
        )

        if (response.data.mensagem.erro !== true) {
          setAdverts(response.data.anuncios)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function searchAdverts(data: any) {
    const { '@mtu/token': token } = parseCookies()

    setLoading(true)
    if (token) {
      try {
        const string = `equipamentosDeTerceiros${
          data.category !== undefined && data.category.length > 0
            ? `?categoria=${data.category}`
            : '?categoria=0'
        }${
          data.perfil !== undefined && data.perfil.length > 0
            ? `&perfil=${data.perfil}`
            : ''
        }${
          data.state !== undefined && data.state.length > 0
            ? `&uf=${data.state}`
            : ''
        }${
          data.city !== undefined && data.city.length > 0
            ? `&cidade=${data.city}`
            : ''
        }${
          data.brand !== undefined && data.brand.length > 0
            ? `&marca=${data.brand}`
            : ''
        }${
          data.model !== undefined && data.model.length > 0
            ? `&modelo=${data.model}`
            : ''
        }${
          data.yearStart !== undefined && data.yearStart.length > 0
            ? `&anoInicio=${data.yearStart}`
            : ''
        }${
          data.yearEnd !== undefined && data.yearEnd.length > 0
            ? `&anoFim=${data.yearEnd}`
            : ''
        }`

        const response = await api.get(string, {
          headers: { 'Token-Trator': token }
        })

        if (response.data.mensagem.erro !== true) {
          setAdverts(response.data.anuncios)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function buyAdvert(chassi: string, id: number) {
    const { '@mtu/token': token } = parseCookies()

    setLoading(true)
    if (token) {
      try {
        const response = await api.put(
          `/equipamentosDeTerceiros/${chassi}/${id}/arremate`,
          {
            headers: { 'Token-Trator': token }
          }
        )

        if (response.data.erro !== true) {
          AlertSuccess(response.data.mensagem)
          setLoading(false)
          Router.push('/account/invoices')
        } else {
          AlertError(response.data.mensagem)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
        setLoading(true)
      }
    }
  }

  async function ratingAdvert(
    chassi: string,
    id: number,
    avaPrice: any,
    avaObs: string
  ) {
    const { '@mtu/token': token } = parseCookies()

    setLoading(true)
    if (token) {
      try {
        const response = await api.post(
          `/equipamentosDeTerceiros/${chassi}/${id}/avaliacao`,
          {
            valorAvaliado: avaPrice,
            observação: avaObs
          },
          {
            headers: { 'Token-Trator': token }
          }
        )

        if (response.data.erro !== true) {
          AlertSuccess(response.data.mensagem)
          setLoading(false)
          Router.push(
            `/announcement/equipment?chassi=${chassi}&id=${id}&typed=ranting`
          )
        } else {
          AlertError(response.data.mensagem)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
        setLoading(true)
      }
    }
  }

  async function startChat(
    chassi: string,
    id: number,
    msg: string,
    sender: number
  ) {
    const { '@mtu/token': token } = parseCookies()

    setLoading(true)
    if (token) {
      try {
        const response = await api.post(
          `/chat`,
          {
            empresaChassi: id,
            chassi,
            mensagem: msg,
            empresaMensagem: sender
          },
          {
            headers: { 'Token-Trator': token }
          }
        )

        if (response.data.erro !== true) {
          AlertSuccess(response.data.mensagem)
          setLoading(false)
          Router.push(`/account/negotiations?chassi=${chassi}&id=${id}`)
        } else {
          AlertError(response.data.mensagem)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
        setLoading(true)
      }
    }
  }

  async function addFavorite(id: number, multiple: string) {
    const { '@mtu/token': token } = parseCookies()

    if (token) {
      try {
        const response = await api.put(
          `/equipamentosDeTerceiros/favoritos/${id}`,
          {},
          {
            headers: { 'Token-Trator': token }
          }
        )

        if (response.data.erro !== true) {
          if (multiple === 'only') {
            return { status: true }
          } else if (multiple === 'search') {
            const index = adverts.findIndex(
              (x: any) => x.idProprietarioMaquina === id
            )
            const data = adverts
            data[index].favorito = true

            setAdverts([...data])
          } else if (multiple === 'directed') {
            const index = directed.findIndex(
              (x: any) => x.idProprietarioMaquina === id
            )
            const data = directed
            data[index].favorito = true

            setDirected([...data])
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function removeFavorite(id: number, multiple: string) {
    const { '@mtu/token': token } = parseCookies()

    if (token) {
      try {
        const response = await api.delete(
          `/equipamentosDeTerceiros/favoritos/${id}`,
          {
            headers: { 'Token-Trator': token }
          }
        )

        if (response.data.erro !== true) {
          if (multiple === 'only') {
            return { status: true }
          } else if (multiple === 'search') {
            const index = adverts.findIndex(
              (x: any) => x.idProprietarioMaquina === id
            )
            const data = adverts
            data[index].favorito = false

            setAdverts([...data])
          } else if (multiple === 'directed') {
            const index = directed.findIndex(
              (x: any) => x.idProprietarioMaquina === id
            )
            const data = directed
            data[index].favorito = false

            setDirected([...data])
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function getDirected() {
    const { '@mtu/token': token } = parseCookies()

    setLoading(true)
    if (token) {
      try {
        const response = await api.get(`/equipamentosDeTerceiros`, {
          headers: { 'Token-Trator': token }
        })

        if (response.data.mensagem.erro !== true) {
          setDirected(response.data.anuncios)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <AdvertsContext.Provider
      value={{
        adverts,
        useLoading,
        searchAdverts,
        getAdverts,
        buyAdvert,
        ratingAdvert,
        startChat,
        addFavorite,
        removeFavorite,
        directed,
        getDirected
      }}
    >
      {children}
    </AdvertsContext.Provider>
  )
}
