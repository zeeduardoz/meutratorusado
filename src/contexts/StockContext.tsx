/* eslint-disable no-unused-expressions */
import { parseCookies } from 'nookies'
import { createContext, useEffect, useState } from 'react'

import { api } from '@services/api'
import { AlertError, AlertSuccess } from '@hooks/useAlert'

type EquipmentProps = {
  empresa: {
    idEmpresa: number
    cnpj: number
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
  corExterna: string
  origem: string
  numeroMotor: string
  garantia: string
  situacao: string
  precoRepasse: number
  precoPublico: number
  precoArremate: number
  propostaMinima: number
  destaque: string
  favorito: boolean
}

type StockContextType = {
  useLoading: boolean
  stock: EquipmentProps[]

  getStock: () => void
  addFeatured: (chassi: string) => Promise<any>
  removeFeatured: (chassi: string) => Promise<any>
  deleteEquipment: (chassi: string) => Promise<any>
}

export const StockContext = createContext({} as StockContextType)

export const StockProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [stock, setStock] = useState<EquipmentProps[] | any>(null)

  useEffect(() => {
    console.log(stock)
  }, [stock])

  async function getStock() {
    const { '@mtu/token': token } = parseCookies()

    setLoading(true)
    if (token) {
      try {
        const response = await api.get(`/meusEquipamentos`, {
          headers: { 'Token-Trator': token }
        })

        if (response.data.mensagem.erro !== true) {
          setStock(response.data.equipamentos)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function addFeatured(chassi: string) {
    const { '@mtu/token': token } = parseCookies()

    if (token) {
      try {
        const response = await api.post(
          `/meusEquipamentos/destaque`,
          { chassi },
          {
            headers: { 'Token-Trator': token }
          }
        )

        if (response.data.erro !== true) {
          const index = stock.findIndex((x: any) => x.chassi === chassi)
          const data = stock
          stock[index].destaque = 'S'

          setStock([...data])

          AlertSuccess(response.data.mensagem)
        } else {
          AlertError(response.data.mensagem)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function removeFeatured(chassi: string) {
    const { '@mtu/token': token } = parseCookies()

    if (token) {
      try {
        const response = await api.delete(
          `/meusEquipamentos/${chassi}/destaque`,
          {
            headers: { 'Token-Trator': token }
          }
        )

        if (response.data.erro !== true) {
          const index = stock.findIndex((x: any) => x.chassi === chassi)
          const data = stock
          stock[index].destaque = 'N'

          setStock([...data])

          AlertSuccess(response.data.mensagem)
        } else {
          AlertError(response.data.mensagem)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async function deleteEquipment(chassi: string) {
    const { '@mtu/token': token } = parseCookies()

    if (token) {
      try {
        const response = await api.delete(`/meusEquipamentos/${chassi}`, {
          headers: { 'Token-Trator': token }
        })

        if (response.data.erro !== true) {
          const response = await api.get(`/meusEquipamentos`, {
            headers: { 'Token-Trator': token }
          })

          if (response.data.mensagem.erro !== true) {
            setStock(response.data.equipamentos)
          }

          AlertSuccess(response.data.mensagem)
        } else {
          AlertError(response.data.mensagem)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <StockContext.Provider
      value={{
        stock,
        useLoading,
        getStock,
        addFeatured,
        removeFeatured,
        deleteEquipment
      }}
    >
      {children}
    </StockContext.Provider>
  )
}
