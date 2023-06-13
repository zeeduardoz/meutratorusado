import * as Yup from 'yup'
import NumberFormat from 'react-number-format'
import InputMask from 'react-input-mask'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import { AuthContext } from '@contexts/AuthContext'
import { AlertError } from '@hooks/useAlert'
import axios from 'axios'

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

interface CepInfo {
  bairro: string
  cep: string
  complemento: string
  localidade: string
  logradouro: string
  uf: string
}

interface BankInfo {
  COMPE: string
  LongName: string
  ShortName: string
}

interface City {
  codCidade: number
  nomeCidade: string
  uf: string
}

export function PerfilUpdate(props: any) {
  const { useLoading, useUser, updateAccount } = useContext(AuthContext)
  const cities: City[] = props.cities
  const banks: BankInfo[] = props.banks
  const [stateSelected, setStateSelected] = useState(useUser?.cidade.uf)
  const [cepInfo, setCepInfo] = useState<CepInfo | null>(null)

  const schema = Yup.object().shape({
    perfil: Yup.string().required('Informe o tipo de conta'),
    name: Yup.string().required('Informe o nome'),
    fantasyName: Yup.string().required('Informe o nome fantasia'),
    document: Yup.string().required('Informe o CPF ou CNPJ'),
    cep: Yup.string().required('Informe o CEP'),
    state: Yup.string().required('Selecione um estado'),
    city: Yup.string().required('Selecione uma cidade'),
    neighborhood: Yup.string().required('Informe o bairro'),
    street: Yup.string().required('Informe o endereço'),
    number: Yup.string().required('Informe o numero'),
    phoneNumber: Yup.string().required('Informe o telefone'),
    whatsapp: Yup.string(),
    facebook: Yup.string(),
    instagram: Yup.string(),
    twitter: Yup.string(),
    contactName: Yup.string().required('Informe o nome do contato'),
    contactEmail: Yup.string().required('Informe o e-mail do contato'),
    contactCel: Yup.string().required('Informe o celular do contato'),
    bank: Yup.string().required('Informe o banco!'),
    agency: Yup.number().required('Informe a agência!'),
    accountNumber: Yup.number().required('Informe o numero da conta'),
    user: Yup.string()
      .required('Informe o email!')
      .email('Informe um email válido!'),
    plan: Yup.string().required('Selecione um plano!'),
    password: Yup.string().required('Informe a senha!'),
    rePassword: Yup.string()
      .required('Repita a sua nova senha!')
      .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais!')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  async function getCep(cep: string) {
    if (!cep.includes('_') && cep.length === 9) {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cep
          .split('.')
          .join('')
          .split('/')
          .join('')
          .split('-')
          .join('')}/json/`
      )
      setCepInfo(response.data)
    }
  }

  async function handleUpdate(data: any) {
    try {
      updateAccount(data)
    } catch (err) {
      console.log(err)
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return useUser ? (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <h1 className="text-2xl font-black text-center text-color-light">
        Eu sou?
      </h1>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="items-center bg-tertiary rounded flex mt-6 px-5 py-5 w-full">
          <input
            type="radio"
            {...register('perfil')}
            name="perfil"
            value="R"
            className="form-radio"
            disabled={useLoading || useUser?.perfil !== 'R'}
            checked={useUser?.perfil === 'R'}
          />
          <p className="text-xl font-light ml-3 text-white">Revenda</p>
        </div>
        <div className="items-center bg-tertiary rounded flex mt-6 px-5 py-5 w-full">
          <input
            type="radio"
            {...register('perfil')}
            name="perfil"
            value="L"
            className="form-radio"
            disabled={useLoading || useUser?.perfil !== 'L'}
            checked={useUser?.perfil === 'L'}
          />
          <p className="text-xl font-light ml-3 text-white">Lojista</p>
        </div>
        <div className="items-center bg-tertiary rounded flex mt-6 px-5 py-5 w-full">
          <input
            {...register('perfil')}
            type="radio"
            name="perfil"
            value="F"
            className="form-radio"
            disabled={useLoading || useUser?.perfil !== 'F'}
            checked={useUser?.perfil === 'F'}
          />
          <p className="text-xl font-light ml-3 text-white">Pessoa Física</p>
        </div>
      </div>
      <hr className="my-10" />
      <h1 className="text-xl font-black mb-10 text-color-light">
        Informações gerais
      </h1>
      <div className="grid gap-5 gap-x-10 lg:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-color-medium">
            Razão Social / Nome <b className="text-color-danger">*</b>
          </label>
          <input
            {...register('name')}
            defaultValue={useUser.razaoSocial}
            type="text"
            name="name"
            maxLength={60}
            placeholder="Qual o nome/razão social?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.name && (
            <p className="text-sm py-1 text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="fantasyName" className="block text-color-medium">
            Nome Fantasia <b className="text-color-danger">*</b>
          </label>
          <input
            {...register('fantasyName')}
            defaultValue={useUser.nomeFantasia}
            type="text"
            name="fantasyName"
            maxLength={20}
            placeholder="Qual o nome fantasia?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.fantasyName && (
            <p className="text-sm py-1 text-red-400">
              {errors.fantasyName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="document" className="block text-color-medium">
            CPF ou CNPJ <b className="text-color-danger">*</b>
          </label>
          <InputMask
            {...register('document')}
            mask={
              useUser.cnpj.toString().length >= 12
                ? '99.999.999/9999-99'
                : '999.999.999-99'
            }
            defaultValue={useUser.cnpj}
            name="document"
            placeholder="Qual o CPF ou CNPJ?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.document && (
            <p className="text-sm py-1 text-red-400">
              {errors.document.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cep" className="block text-color-medium">
            CEP <b className="text-color-danger">*</b>
          </label>
          <InputMask
            {...register('cep')}
            mask="99999-999"
            alwaysShowMask={false}
            onChange={e => getCep(e.target.value)}
            defaultValue={useUser.cep}
            name="cep"
            type="text"
            placeholder="Qual o CEP?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.cep && (
            <p className="text-sm py-1 text-red-400">{errors.cep.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="state" className="block text-color-medium">
            Estado <b className="text-color-danger">*</b>
          </label>
          <select
            {...register('state')}
            name="state"
            onChange={e => setStateSelected(e.target.value)}
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          >
            {cepInfo ? (
              <>
                <option className="text-color-medium" value="" disabled>
                  Selecione um Estado
                </option>
                {states.map(s => {
                  if (s.uf === cepInfo.uf) {
                    return (
                      <option
                        key={s.uf}
                        className="text-color-medium"
                        value={s.uf}
                        selected
                      >
                        {s.name}
                      </option>
                    )
                  } else {
                    return (
                      <option
                        key={s.uf}
                        className="text-color-medium"
                        value={s.uf}
                      >
                        {s.name}
                      </option>
                    )
                  }
                })}
              </>
            ) : (
              <>
                <option
                  className="text-color-medium"
                  value=""
                  disabled
                  selected
                >
                  Selecione um Estado
                </option>
                {states.map(s => {
                  if (s.uf === useUser.cidade.uf) {
                    return (
                      <option
                        key={s.uf}
                        className="text-color-medium"
                        value={s.uf}
                        selected
                      >
                        {s.name}
                      </option>
                    )
                  } else {
                    return (
                      <option
                        key={s.uf}
                        className="text-color-medium"
                        value={s.uf}
                      >
                        {s.name}
                      </option>
                    )
                  }
                })}
              </>
            )}
          </select>
          {errors.state && (
            <p className="text-sm py-1 text-red-400">{errors.state.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="city" className="block text-color-medium">
            Cidade <b className="text-color-danger">*</b>
          </label>
          <select
            {...register('city')}
            name="city"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          >
            {cepInfo ? (
              <>
                <option className="text-color-medium" value="" disabled>
                  Selecione uma Cidade
                </option>
                {cities.map((c: any) => {
                  if (c.nomeCidade === cepInfo.localidade.toUpperCase()) {
                    return (
                      <option
                        key={c.codCidade}
                        className="text-color-medium"
                        value={`${c.codCidade}_${c.nomeCidade}`}
                        selected
                      >
                        {c.nomeCidade}
                      </option>
                    )
                  } else {
                    return (
                      <option
                        key={c.codCidade}
                        className="text-color-medium"
                        value={`${c.codCidade}_${c.nomeCidade}`}
                      >
                        {c.nomeCidade}
                      </option>
                    )
                  }
                })}
              </>
            ) : (
              <>
                <option
                  className="text-color-medium"
                  value=""
                  disabled
                  selected
                >
                  Selecione uma Cidade
                </option>
                {cities.map((c: any) => {
                  if (c.uf === stateSelected) {
                    if (c.nomeCidade === useUser?.cidade.nomeCidade) {
                      return (
                        <option
                          key={c.codCidade}
                          className="text-color-medium"
                          value={`${c.codCidade}_${c.nomeCidade}`}
                          selected
                        >
                          {c.nomeCidade}
                        </option>
                      )
                    } else {
                      return (
                        <option
                          key={c.codCidade}
                          className="text-color-medium"
                          value={`${c.codCidade}_${c.nomeCidade}`}
                        >
                          {c.nomeCidade}
                        </option>
                      )
                    }
                  } else {
                    return <></>
                  }
                })}
              </>
            )}
          </select>
          {errors.city && (
            <p className="text-sm py-1 text-red-400">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="neighborhood" className="block text-color-medium">
            Bairro <b className="text-color-danger">*</b>
          </label>
          <input
            {...register('neighborhood')}
            defaultValue={cepInfo ? cepInfo.bairro : useUser.bairro}
            type="text"
            name="neighborhood"
            maxLength={40}
            placeholder="Qual o bairro?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.neighborhood && (
            <p className="text-sm py-1 text-red-400">
              {errors.neighborhood.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="street" className="block text-color-medium">
            Endereço <b className="text-color-danger">*</b>
          </label>
          <input
            {...register('street')}
            defaultValue={cepInfo ? cepInfo.logradouro : useUser.endereco}
            type="text"
            name="street"
            maxLength={60}
            placeholder="Qual o endereço?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.street && (
            <p className="text-sm py-1 text-red-400">{errors.street.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="number" className="block text-color-medium">
            Numero <b className="text-color-danger">*</b>
          </label>
          <NumberFormat
            {...register('number')}
            defaultValue={useUser.numero}
            name="number"
            placeholder="Insira o numero"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.number && (
            <p className="text-sm py-1 text-red-400">{errors.number.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="complement" className="block text-color-medium">
            Complemento
          </label>
          <input
            {...register('complement')}
            defaultValue={cepInfo ? cepInfo.complemento : useUser.complemento}
            type="text"
            name="complement"
            maxLength={20}
            placeholder="Qual o complemento?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.complement && (
            <p className="text-sm py-1 text-red-400">
              {errors.complement.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-color-medium">
            Telefone <b className="text-color-danger">*</b>
          </label>
          <InputMask
            mask="+55 (99) 9999-9999"
            {...register('phoneNumber')}
            defaultValue={parseInt(
              useUser.telefone
                .replace('+', '')
                .replace('(', '')
                .replace(')', '')
                .replace('-', '')
                .replace(' ', '')
            )}
            type="tel"
            name="phoneNumber"
            placeholder="+55 (99) 99999-9999"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.phoneNumber && (
            <p className="text-sm py-1 text-red-400">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="whatsapp" className="block text-color-medium">
            WhatsApp <b className="text-color-danger">*</b>
          </label>
          <InputMask
            mask="+55 (99) 9999-9999"
            {...register('whatsapp')}
            defaultValue={parseInt(
              useUser.whatsapp
                ?.replace('+', '')
                .replace('(', '')
                .replace(')', '')
                .replace('-', '')
                .replace(' ', '')
            )}
            type="tel"
            name="whatsapp"
            placeholder="+55 (99) 99999-9999"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.whatsapp && (
            <p className="text-sm py-1 text-red-400">
              {errors.whatsapp.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="facebook" className="block text-color-medium">
            Facebook
          </label>
          <input
            {...register('facebook')}
            defaultValue={useUser.facebook}
            type="text"
            name="facebook"
            maxLength={20}
            placeholder="Qual o Facebook?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.facebook && (
            <p className="text-sm py-1 text-red-400">
              {errors.facebook.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="instagram" className="block text-color-medium">
            Instagram
          </label>
          <input
            {...register('instagram')}
            defaultValue={useUser.instagran}
            type="text"
            name="instagram"
            maxLength={20}
            placeholder="Qual o Instagram?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.instagram && (
            <p className="text-sm py-1 text-red-400">
              {errors.instagram.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="twitter" className="block text-color-medium">
            Twitter
          </label>
          <input
            {...register('twitter')}
            defaultValue={useUser.twitter}
            type="text"
            name="twitter"
            maxLength={20}
            placeholder="Qual o Twitter?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.twitter && (
            <p className="text-sm py-1 text-red-400">
              {errors.twitter.message}
            </p>
          )}
        </div>
      </div>
      <hr className="my-10" />
      <h1 className="text-xl font-black mb-10 text-color-light">
        Dados de Contato
      </h1>
      <div className="grid gap-5 gap-x-10 lg:grid-cols-2">
        <div>
          <label htmlFor="contactName" className="block text-color-medium">
            Nome do Contato <b className="text-color-danger">*</b>
          </label>
          <input
            {...register('contactName')}
            defaultValue={useUser.contato[0].nome}
            type="text"
            name="contactName"
            maxLength={60}
            placeholder="Qual nome do Contato?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.contactName && (
            <p className="text-sm py-1 text-red-400">
              {errors.contactName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contactEmail" className="block text-color-medium">
            E-mail <b className="text-color-danger">*</b>
          </label>
          <input
            {...register('contactEmail')}
            defaultValue={useUser.contato[0].email}
            type="email"
            name="contactEmail"
            maxLength={60}
            placeholder="Qual e-mail do Contato?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.contactEmail && (
            <p className="text-sm py-1 text-red-400">
              {errors.contactEmail.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contactCel" className="block text-color-medium">
            Celular <b className="text-color-danger">*</b>
          </label>
          <InputMask
            mask="+55 (99) 9999-9999"
            {...register('contactCel')}
            defaultValue={useUser.contato[0].celular
              .replace('+', '')
              .replace('(', '')
              .replace(')', '')
              .replace('-', '')
              .replace(' ', '')}
            type="tel"
            name="contactCel"
            placeholder="+55 (99) 99999-9999"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.contactCel && (
            <p className="text-sm py-1 text-red-400">
              {errors.contactCel.message}
            </p>
          )}
        </div>
        <div className="items-center flex space-x-5">
          <div className="w-3/4">
            <label htmlFor="contactTel" className="block text-color-medium">
              Telefone
            </label>
            <InputMask
              mask="+55 (99) 9999-9999"
              {...register('contactTel')}
              defaultValue={parseInt(
                useUser.contato[0].telefone
                  .replace('+', '')
                  .replace('(', '')
                  .replace(')', '')
                  .replace('-', '')
                  .replace(' ', '')
              )}
              type="tel"
              name="contactTel"
              placeholder="+55 (99) 9999-9999"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.contactTel && (
              <p className="text-sm py-1 text-red-400">
                {errors.contactTel.message}
              </p>
            )}
          </div>
          <div className="w-1/4">
            <label htmlFor="contactRamal" className="block text-color-medium">
              Ramal
            </label>
            <NumberFormat
              {...register('contactRamal')}
              defaultValue={
                useUser.contato[0].ramal ? useUser.contato[0].ramal : 0
              }
              name="contactRamal"
              placeholder="Ramal?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.contactRamal && (
              <p className="text-sm py-1 text-red-400">
                {errors.contactRamal.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <hr className="my-10" />
      <h1 className="text-xl font-black mb-10 text-color-light">
        Dados Bancários
      </h1>
      <div className="grid gap-5 gap-x-10 lg:grid-cols-2">
        <div>
          <label htmlFor="bank" className="block text-color-medium">
            Banco <b className="text-color-danger">*</b>
          </label>
          <select
            {...register('bank')}
            name="bank"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          >
            <option className="text-color-medium" value="" disabled selected>
              Selecione um Banco
            </option>
            {banks.map(b => {
              if (parseInt(b.COMPE) === useUser?.dadosFinanceiros.banco) {
                return (
                  <option
                    key={b.COMPE}
                    className="text-color-medium"
                    value={b.COMPE}
                    selected
                  >
                    {b.LongName}
                  </option>
                )
              } else {
                return (
                  <option
                    key={b.COMPE}
                    className="text-color-medium"
                    value={b.COMPE}
                  >
                    {b.LongName}
                  </option>
                )
              }
            })}
          </select>
          {errors.bank && (
            <p className="text-sm py-1 text-red-400">{errors.bank.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="agency" className="block text-color-medium">
            Agência <b className="text-color-danger">*</b>
          </label>
          <NumberFormat
            {...register('agency')}
            defaultValue={useUser.dadosFinanceiros.agencia}
            name="agency"
            maxLength={10}
            placeholder="Insira a agência do banco!"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.agency && (
            <p className="text-sm py-1 text-red-400">{errors.agency.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="accountNumber" className="block text-color-medium">
            Numero da Conta <b className="text-color-danger">*</b>
          </label>
          <NumberFormat
            {...register('accountNumber')}
            defaultValue={useUser.dadosFinanceiros.contaCorrente}
            name="accountNumber"
            maxLength={20}
            placeholder="Insira o numero da conta!"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.accountNumber && (
            <p className="text-sm py-1 text-red-400">
              {errors.accountNumber.message}
            </p>
          )}
        </div>
      </div>
      <hr className="my-10" />
      <h1 className="text-xl font-black mb-10 text-color-light">
        Dados de Autenticação
      </h1>
      <div className="grid gap-5 gap-x-10 lg:grid-cols-2">
        <div>
          <label htmlFor="user" className="block text-color-medium">
            E-mail <b className="text-color-danger">*</b>
          </label>
          <input
            {...register('user')}
            defaultValue={useUser.login}
            type="email"
            name="user"
            placeholder="nome@email.com"
            maxLength={60}
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.user && (
            <p className="text-sm py-1 text-red-400">{errors.user.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="plan" className="block text-color-medium">
            Planos <b className="text-color-danger">*</b>
          </label>
          <select
            {...register('plan')}
            name="plan"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          >
            <option className="text-color-medium" value="" disabled selected>
              Selecione um plano
            </option>
            <option
              className="text-color-medium"
              value="4_Diamante"
              selected={useUser.plano.codPlano === 4}
            >
              Diamante
            </option>
            <option
              className="text-color-medium"
              value="3_Ouro"
              selected={useUser.plano.codPlano === 3}
            >
              Ouro
            </option>
            <option
              className="text-color-medium"
              value="2_Prata"
              selected={useUser.plano.codPlano === 2}
            >
              Prata
            </option>
            <option
              className="text-color-medium"
              value="1_Bronze"
              selected={useUser.plano.codPlano === 1}
            >
              Bronze
            </option>
          </select>
          {errors.category && (
            <p className="text-sm py-1 text-red-400">
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-color-medium">
            Senha <b className="text-color-danger">*</b>
          </label>
          <input
            {...register('password')}
            defaultValue={''}
            type="password"
            name="password"
            maxLength={20}
            placeholder="Insira sua senha"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.password && (
            <p className="text-sm py-1 text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="rePassword" className="block text-color-medium">
            Repetir senha <b className="text-color-danger">*</b>
          </label>
          <input
            {...register('rePassword')}
            defaultValue={''}
            type="password"
            name="rePassword"
            maxLength={20}
            placeholder="Repetir sua senha"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          {errors.rePassword && (
            <p className="text-sm py-1 text-red-400">
              {errors.rePassword.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex text-lg font-bold justify-center tracking-wider mt-16 focus:outline-none px-4 py-3 text-white uppercase duration-150 transition ease-in-out w-full"
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
        {!useLoading && <span>Atualizar</span>}
      </button>
    </form>
  ) : (
    <></>
  )
}
