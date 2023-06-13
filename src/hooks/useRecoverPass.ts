import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'

import { api } from '@services/api'

type Recover = {
  email: string
}

type ChangePassword = {
  password: string
  rePassword: string
}

export async function RecoverStep1(data: Recover) {
  const response = await api.put('/empresas/password', data)

  if (response.data.erro !== true) Router.push('/auth/recover/step2')
  return response.data
}

export async function RecoverStep3(data: ChangePassword) {
  const { '@mtu/recoverToken': token } = parseCookies()

  const response = await api.post(
    '/regravaNovaSenha',
    { password: data.password },
    { headers: { Authorization: 'Bearer ' + token } }
  )

  if (response.data.erro !== true) {
    destroyCookie(undefined, '@mtu/recoverToken', { path: '/' })

    Router.push('/auth/login')
    return response.data
  }

  return response.data
}
