import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'

import { AlertError } from '@hooks/useAlert'
import { AdvertsContext } from '@contexts/AdvertsContext'

const states = [
  { name: 'Acre', uf: 'AC' },
  { name: 'Alagoas', uf: 'AL' },
  { name: 'Amapá', uf: 'AP' },
  { name: 'Amazonas', uf: 'AM' },
  { name: 'Bahia', uf: 'BA' },
  { name: 'Ceará', uf: 'CE' },
  { name: 'Distrito Federal', uf: 'DF' },
  { name: 'Espírito Santo', uf: 'ES' },
  { name: 'Goiás', uf: 'GO' },
  { name: 'Maranhão', uf: 'MA' },
  { name: 'Mato Grosso', uf: 'MT' },
  { name: 'Mato Grosso do Sul', uf: 'MS' },
  { name: 'Minas Gerais', uf: 'MG' },
  { name: 'Pará', uf: 'PA' },
  { name: 'Paraíba', uf: 'PB' },
  { name: 'Paraná', uf: 'PR' },
  { name: 'Pernambuco', uf: 'PE' },
  { name: 'Piauí', uf: 'PI' },
  { name: 'Rio de Janeiro', uf: 'RJ' },
  { name: 'Rio Grande do Norte', uf: 'RN' },
  { name: 'Rio Grande do Sul', uf: 'RS' },
  { name: 'Rondônia', uf: 'RO' },
  { name: 'Roraima', uf: 'RR' },
  { name: 'Santa Catarina', uf: 'SC' },
  { name: 'São Paulo', uf: 'SP' },
  { name: 'Sergipe', uf: 'SE' },
  { name: 'Tocantins', uf: 'TO' }
]

const types = [
  {
    value: 'R',
    name: 'Revenda'
  },
  {
    value: 'L',
    name: 'Lojista'
  },
  {
    value: 'P',
    name: 'Pessoa Física'
  }
]

const categorys = [
  {
    value: 1,
    name: 'Trator'
  },
  {
    value: 2,
    name: 'Colhedora'
  },
  {
    value: 3,
    name: 'Colheitadeira'
  },
  {
    value: 4,
    name: 'Pulverizador'
  }
]

interface City {
  codCidade: number
  nomeCidade: string
  uf: string
}

interface Brand {
  codMarca: number
  nomeMarca: string
}

interface Model {
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

export function Search(props: any) {
  const { useLoading, searchAdverts } = useContext(AdvertsContext)
  const cities: City[] = props.cities
  const brands: Brand[] = props.brands
  const models: Model[] = props.models

  const [stateSelected, setStateSelected] = useState<string>('')
  const [brandSelected, setBrandSelected] = useState<number>()

  const { register, handleSubmit } = useForm()

  async function handleSearch(data: any) {
    try {
      searchAdverts(data)
    } catch (err) {
      console.log(err)
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <>
      <div className="bg-primary rounded px-5 py-10 w-full lg:w-1/3">
        <h1 className="text-2xl font-black text-center text-color-light">
          Pesquisar
        </h1>
        <form onSubmit={handleSubmit(handleSearch)} className="mt-10 w-full">
          <div className="mt-6">
            <label htmlFor="category" className="block text-color-medium">
              Categoria
            </label>
            <select
              {...register('category')}
              name="category"
              defaultValue=""
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              <>
                <option className="text-color-medium" value="" selected>
                  Todas
                </option>
                {categorys.map(c => {
                  return (
                    <option
                      key={c.value}
                      className="text-color-medium"
                      value={c.value}
                    >
                      {c.name}
                    </option>
                  )
                })}
              </>
            </select>
          </div>
          <div className="mt-6">
            <label htmlFor="perfil" className="block text-color-medium">
              Tipo de vendedor
            </label>
            <select
              {...register('perfil')}
              name="perfil"
              defaultValue=""
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              <>
                <option className="text-color-medium" value="" selected>
                  Todos
                </option>
                {types.map(t => {
                  return (
                    <option
                      key={t.value}
                      className="text-color-medium"
                      value={t.value}
                    >
                      {t.name}
                    </option>
                  )
                })}
              </>
            </select>
          </div>
          <div className="mt-6">
            <label htmlFor="state" className="block text-color-medium">
              Estado
            </label>
            <select
              {...register('state')}
              name="state"
              defaultValue=""
              onChange={e => setStateSelected(e.target.value)}
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              <>
                <option className="text-color-medium" value="" selected>
                  Todos
                </option>
                {states.map(s => {
                  return (
                    <option
                      key={s.uf}
                      className="text-color-medium"
                      value={s.uf}
                    >
                      {s.name}
                    </option>
                  )
                })}
              </>
            </select>
          </div>
          <div className="mt-6">
            <label htmlFor="city" className="block text-color-medium">
              Cidade
            </label>
            <select
              {...register('city')}
              name="city"
              defaultValue=""
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              <>
                <option className="text-color-medium" value="" selected>
                  Todas
                </option>
                {cities.map((c: any) => {
                  return c.uf === stateSelected ? (
                    <option
                      key={c.codCidade}
                      className="text-color-medium"
                      value={`${c.codCidade}`}
                    >
                      {c.nomeCidade}
                    </option>
                  ) : (
                    <></>
                  )
                })}
              </>
            </select>
          </div>
          <div className="mt-6">
            <label htmlFor="brand" className="block text-color-medium">
              Marcas
            </label>
            <select
              {...register('brand')}
              name="brand"
              defaultValue=""
              onChange={e => setBrandSelected(parseInt(e.target.value))}
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              <>
                <option className="text-color-medium" value="" selected>
                  Todas
                </option>
                {brands.map(b => {
                  return (
                    <option
                      key={b.codMarca}
                      className="text-color-medium"
                      value={b.codMarca}
                    >
                      {b.nomeMarca}
                    </option>
                  )
                })}
              </>
            </select>
          </div>
          <div className="mt-6">
            <label htmlFor="model" className="block text-color-medium">
              Modelos
            </label>
            <select
              {...register('model')}
              name="model"
              defaultValue=""
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              <>
                <option className="text-color-medium" value="" selected>
                  Todos
                </option>
                {models.map(m => {
                  return m.marca.codMarca === brandSelected ? (
                    <option
                      key={m.codModelo}
                      className="text-color-medium"
                      value={m.codModelo}
                      selected
                    >
                      {m.descricaoModelo}
                    </option>
                  ) : (
                    <></>
                  )
                })}
              </>
            </select>
          </div>
          <div className="items-center justify-between lg:flex lg:space-x-7">
            <div className="mt-6">
              <label htmlFor="yearStart" className="block text-color-medium">
                Ano Início
              </label>
              <NumberFormat
                {...register('yearStart')}
                name="yearStart"
                defaultValue=""
                className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
              />
            </div>
            <div className="mt-6">
              <label htmlFor="yearEnd" className="block text-color-medium">
                Ano Fim
              </label>
              <NumberFormat
                {...register('yearEnd')}
                name="yearEnd"
                defaultValue=""
                className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-sm inline-flex text-lg font-black justify-center tracking-wider mt-10 focus:outline-none py-3 text-white uppercase duration-150 transition ease-in-out w-full"
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
            {!useLoading && <span>Pesquisar</span>}
          </button>
        </form>
      </div>
    </>
  )
}
