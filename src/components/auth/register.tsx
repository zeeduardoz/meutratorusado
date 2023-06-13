import Link from 'next/link'
import * as Yup from 'yup'
import NumberFormat from 'react-number-format'
import InputMask from 'react-input-mask'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import { AuthContext } from '@contexts/AuthContext'
import { AlertError } from '@hooks/useAlert'
import axios from 'axios'

const steps = [
  {
    title: 'Cadastrar como:',
    number: 1,
    complete: true
  },
  {
    title: 'Informações pessoais',
    number: 2,
    complete: false
  },
  {
    title: 'Dados de Contato',
    number: 3,
    complete: false
  },
  {
    title: 'Conta bancaria',
    number: 4,
    complete: false
  },
  {
    title: 'Último passo',
    number: 5,
    complete: false
  }
]

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

export function RegisterForm(props: any) {
  const { useLoading, createAccount } = useContext(AuthContext)
  const [step, setStep] = useState(steps)
  const [actual, setActual] = useState(1)
  const [documentMask, setDocumentMask] = useState({
    mask: '',
    maskChar: ''
  })
  const cities: City[] = props.cities
  const banks: BankInfo[] = props.banks
  const [stateSelected, setStateSelected] = useState('')
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

  const initialValues = {
    name: '',
    fantasyName: '',
    document: '',
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',
    phoneNumber: '',

    contactName: '',
    contactEmail: '',
    contactCel: '',
    contactTel: '',
    contactRamal: '',

    bank: '',
    agency: '',
    accountNumber: '',

    user: '',
    plan: '',
    password: '',
    rePassword: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  function handleStepComplete(n: any) {
    const a = step
    a[n - 1].complete = true
    setActual(n + 1)
    setStep(a)
  }

  function handleStep(n: any) {
    const a = step
    if (a[n - 1].complete === true) setActual(n)
  }

  function handleMask(e: string) {
    if (e.length >= 12) {
      setDocumentMask({ mask: '99.999.999/9999-99', maskChar: '' })
    } else if (e.length === 11) {
      setDocumentMask({ mask: '999.999.999-99', maskChar: '' })
    } else {
      setDocumentMask({ mask: '99999999999999', maskChar: '' })
    }
  }

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

  async function handleSignIn(data: any) {
    try {
      await createAccount(data)
    } catch (err) {
      console.log(err)
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <div
      className={
        actual === 1 || actual === 4
          ? 'flex flex-col h-screen justify-center p-14 w-full'
          : actual === 3 || actual === 5
          ? 'flex flex-col justify-center p-14 w-full 2xl:h-screen'
          : 'flex flex-col justify-center p-14 w-full'
      }
    >
      <div>
        <h1 className="text-5xl font-black text-color-light">Cadastrar</h1>
        <p className="text-xl font-light text-color-medium">
          Já possui um cadastro?
          <Link href="/auth/login">
            <a className="font-bold ml-2 hover:text-color-info focus:text-color-info">
              Clique aqui.
            </a>
          </Link>
        </p>
      </div>

      <div className="items-center justify-between mt-10 lg:flex">
        {step.map(s => {
          if (s.number === actual) {
            return (
              <h1
                key={s.number}
                className="text-xl font-bold text-color-light lg:text-left"
              >
                {s.title}
              </h1>
            )
          } else {
            return <div className="hidden" key={s.number}></div>
          }
        })}
        <div className="items-center flex justify-start lg:justify-end">
          {step.map(s => {
            if (s.number === actual) {
              return (
                <div
                  key={s.number}
                  className="items-center bg-color-info rounded flex text-xl font-bold h-7 justify-center mx-1 text-white w-7"
                >
                  <span>{s.number}</span>
                </div>
              )
            } else if (s.complete) {
              return (
                <div
                  key={s.number}
                  onClick={() => handleStep(s.number)}
                  className="items-center bg-color-success rounded cursor-pointer flex text-xl font-bold h-7 justify-center mx-1 text-white w-7"
                >
                  <span>{s.number}</span>
                </div>
              )
            } else {
              return (
                <div
                  key={s.number}
                  onClick={() => handleStep(s.number)}
                  className="items-center bg-gray-500 rounded cursor-pointer flex text-xl font-bold h-7 justify-center mx-1 text-white w-7"
                >
                  <span>{s.number}</span>
                </div>
              )
            }
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(handleSignIn)} className="mt-10 w-full">
        <div className={actual === 1 ? 'block' : 'hidden'}>
          <div className="items-center bg-tertiary rounded flex mt-6 px-5 py-5 w-full">
            <input
              type="radio"
              {...register('perfil')}
              name="perfil"
              value="R"
              className="form-radio"
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
            />
            <p className="text-xl font-light ml-3 text-white">Pessoa Física</p>
          </div>
          {errors.perfil && (
            <p className="text-sm pt-5 text-red-400">{errors.perfil.message}</p>
          )}
          <div
            onClick={() => handleStepComplete(1)}
            className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md cursor-pointer inline-flex text-lg font-bold justify-center tracking-wider mt-10 focus:outline-none px-4 py-3 text-white uppercase duration-150 transition ease-in-out w-full"
          >
            Proxima etapa
          </div>
        </div>

        <div className={actual === 2 ? 'block' : 'hidden'}>
          <div className="mt-6">
            <label htmlFor="name" className="block text-color-medium">
              Razão Social / Nome <b className="text-color-danger">*</b>
            </label>
            <input
              {...register('name')}
              defaultValue={initialValues.name}
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
          <div className="mt-6">
            <label htmlFor="fantasyName" className="block text-color-medium">
              Nome Fantasia <b className="text-color-danger">*</b>
            </label>
            <input
              {...register('fantasyName')}
              defaultValue={initialValues.fantasyName}
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
          <div className="mt-6">
            <label htmlFor="document" className="block text-color-medium">
              CPF ou CNPJ <b className="text-color-danger">*</b>
            </label>
            <InputMask
              {...register('document')}
              {...documentMask}
              alwaysShowMask={false}
              onChange={e => handleMask(e.target.value)}
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
          <div className="mt-6">
            <label htmlFor="cep" className="block text-color-medium">
              CEP <b className="text-color-danger">*</b>
            </label>
            <InputMask
              {...register('cep')}
              mask="99999-999"
              alwaysShowMask={false}
              onChange={e => getCep(e.target.value)}
              name="cep"
              type="text"
              placeholder="Qual o CEP?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.cep && (
              <p className="text-sm py-1 text-red-400">{errors.cep.message}</p>
            )}
          </div>
          <div className="mt-6">
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
              )}
            </select>
            {errors.state && (
              <p className="text-sm py-1 text-red-400">
                {errors.state.message}
              </p>
            )}
          </div>
          <div className="mt-6">
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
                    return c.uf === stateSelected ? (
                      <option
                        key={c.codCidade}
                        className="text-color-medium"
                        value={`${c.codCidade}_${c.nomeCidade}`}
                      >
                        {c.nomeCidade}
                      </option>
                    ) : (
                      <></>
                    )
                  })}
                </>
              )}
            </select>
            {errors.city && (
              <p className="text-sm py-1 text-red-400">{errors.city.message}</p>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="neighborhood" className="block text-color-medium">
              Bairro <b className="text-color-danger">*</b>
            </label>
            <input
              {...register('neighborhood')}
              defaultValue={
                cepInfo ? cepInfo.bairro : initialValues.neighborhood
              }
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
          <div className="mt-6">
            <label htmlFor="street" className="block text-color-medium">
              Endereço <b className="text-color-danger">*</b>
            </label>
            <input
              {...register('street')}
              defaultValue={cepInfo ? cepInfo.logradouro : initialValues.street}
              type="text"
              name="street"
              maxLength={60}
              placeholder="Qual o endereço?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.street && (
              <p className="text-sm py-1 text-red-400">
                {errors.street.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="number" className="block text-color-medium">
              Numero <b className="text-color-danger">*</b>
            </label>
            <NumberFormat
              {...register('number')}
              defaultValue={initialValues.number}
              name="number"
              placeholder="Insira o numero"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.number && (
              <p className="text-sm py-1 text-red-400">
                {errors.number.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="complement" className="block text-color-medium">
              Complemento
            </label>
            <input
              {...register('complement')}
              defaultValue={
                cepInfo ? cepInfo.complemento : initialValues.complement
              }
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
          <div className="mt-6">
            <label htmlFor="phoneNumber" className="block text-color-medium">
              Celular <b className="text-color-danger">*</b>
            </label>
            <InputMask
              mask="+55 (99) 9999-9999"
              {...register('phoneNumber')}
              defaultValue={initialValues.phoneNumber}
              type="tel"
              name="phoneNumber"
              placeholder="+55 (99) 9999-9999"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.phoneNumber && (
              <p className="text-sm py-1 text-red-400">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div
            onClick={() => handleStepComplete(2)}
            className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md cursor-pointer inline-flex text-lg font-bold justify-center tracking-wider mt-10 focus:outline-none px-4 py-3 text-white uppercase duration-150 transition ease-in-out w-full"
          >
            Proxima etapa
          </div>
        </div>

        <div className={actual === 3 ? 'block' : 'hidden'}>
          <div className="mt-6">
            <label htmlFor="contactName" className="block text-color-medium">
              Nome do Contato <b className="text-color-danger">*</b>
            </label>
            <input
              {...register('contactName')}
              defaultValue={initialValues.contactName}
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
          <div className="mt-6">
            <label htmlFor="contactEmail" className="block text-color-medium">
              E-mail <b className="text-color-danger">*</b>
            </label>
            <input
              {...register('contactEmail')}
              defaultValue={initialValues.contactEmail}
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
          <div className="mt-6">
            <label htmlFor="contactCel" className="block text-color-medium">
              Celular <b className="text-color-danger">*</b>
            </label>
            <InputMask
              mask="+55 (99) 9999-9999"
              {...register('contactCel')}
              defaultValue={initialValues.contactCel}
              type="tel"
              name="contactCel"
              placeholder="+55 (99) 9999-9999"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.contactCel && (
              <p className="text-sm py-1 text-red-400">
                {errors.contactCel.message}
              </p>
            )}
          </div>
          <div className="items-center flex mt-6 space-x-5">
            <div className="w-3/4">
              <label htmlFor="contactTel" className="block text-color-medium">
                Telefone
              </label>
              <InputMask
                mask="+55 (99) 9999-9999"
                {...register('contactTel')}
                defaultValue={initialValues.contactTel}
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
                defaultValue={initialValues.contactRamal}
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
          <div
            onClick={() => handleStepComplete(3)}
            className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md cursor-pointer inline-flex text-lg font-bold justify-center tracking-wider mt-10 focus:outline-none px-4 py-3 text-white uppercase duration-150 transition ease-in-out w-full"
          >
            Proxima etapa
          </div>
        </div>

        <div className={actual === 4 ? 'block' : 'hidden'}>
          <div className="mt-6">
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
                return (
                  <option
                    key={b.COMPE}
                    className="text-color-medium"
                    value={b.COMPE}
                  >
                    {b.LongName}
                  </option>
                )
              })}
            </select>
            {errors.bank && (
              <p className="text-sm py-1 text-red-400">{errors.bank.message}</p>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="agency" className="block text-color-medium">
              Agência <b className="text-color-danger">*</b>
            </label>
            <NumberFormat
              {...register('agency')}
              defaultValue={initialValues.agency}
              name="agency"
              maxLength={10}
              placeholder="Insira a agência do banco!"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.agency && (
              <p className="text-sm py-1 text-red-400">
                {errors.agency.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="accountNumber" className="block text-color-medium">
              Numero da Conta <b className="text-color-danger">*</b>
            </label>
            <NumberFormat
              {...register('accountNumber')}
              defaultValue={initialValues.accountNumber}
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
          <div
            onClick={() => handleStepComplete(4)}
            className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md cursor-pointer inline-flex text-lg font-bold justify-center tracking-wider mt-10 focus:outline-none px-4 py-3 text-white uppercase duration-150 transition ease-in-out w-full"
          >
            Proximo passo
          </div>
        </div>

        <div className={actual === 5 ? 'block' : 'hidden'}>
          <div className="mt-6">
            <label htmlFor="user" className="block text-color-medium">
              E-mail <b className="text-color-danger">*</b>
            </label>
            <input
              {...register('user')}
              defaultValue={initialValues.user}
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
          <div className="mt-6">
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
              <option className="text-color-medium" value="4_Diamante">
                Diamante
              </option>
              <option className="text-color-medium" value="3_Ouro">
                Ouro
              </option>
              <option className="text-color-medium" value="2_Prata">
                Prata
              </option>
              <option className="text-color-medium" value="1_Bronze">
                Bronze
              </option>
            </select>
            {errors.category && (
              <p className="text-sm py-1 text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label htmlFor="password" className="block text-color-medium">
              Senha <b className="text-color-danger">*</b>
            </label>
            <input
              {...register('password')}
              defaultValue={initialValues.password}
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
          <div className="mt-6">
            <label htmlFor="rePassword" className="block text-color-medium">
              Repetir senha <b className="text-color-danger">*</b>
            </label>
            <input
              {...register('rePassword')}
              defaultValue={initialValues.rePassword}
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
          <button
            type="submit"
            className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex text-lg font-bold justify-center tracking-wider mt-10 focus:outline-none px-4 py-3 text-white uppercase duration-150 transition ease-in-out w-full"
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
            {!useLoading && <span>Cadastrar</span>}
          </button>
        </div>
      </form>
    </div>
  )
}
