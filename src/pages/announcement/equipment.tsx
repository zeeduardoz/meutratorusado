import { parseCookies } from 'nookies'
import { useContext } from 'react'

import { Layout } from '@components/utils/layout'
import { EquipmentNormal } from '@components/announcement/equipment/normal'
import { EquipmentTyped } from '@components/announcement/equipment/typed'
import { Recommended } from '@components/announcement/recommended'
import { AuthContext } from '@contexts/AuthContext'
import { api } from '@services/api'

const info = {
  page: 'Anúncio',
  description: ''
}

export default function Equipment(props: any) {
  const { useUser } = useContext(AuthContext)

  return (
    <Layout title="Anúncio" header={info}>
      <div className="pb-14 pt-5 w-full">
        {props.equipment.situacao === 'VE' ? (
          <>
            <div className="container bg-primary rounded py-14">
              <h1 className="text-xl text-center text-color-medium">
                Infelizmente, este equipamento não está mais disponível.
              </h1>
              <h1 className="text-xl text-center text-color-medium">
                Temos algumas outras opções recomendadas para você logo abaixo.
              </h1>
            </div>
            {useUser ? <Recommended /> : <></>}
          </>
        ) : props.typed && useUser && useUser?.perfil === 'R' ? (
          <EquipmentTyped
            equipment={props.equipment}
            checklist={props.checklist}
            obs={props.obs}
          />
        ) : (
          <EquipmentNormal
            equipment={props.equipment}
            checklist={props.checklist}
            obs={props.obs}
          />
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx: any) {
  const { '@mtu/token': token } = parseCookies(ctx)

  let typed = false
  let equipment
  let checklist = []
  let obs = ''

  if (ctx.query.chassi && ctx.query.id) {
    if (token) {
      if (ctx.query.typed) typed = true
      const response = await api.get(
        `/equipamentosDeTerceiros/${ctx.query.chassi}/${ctx.query.id}`,
        {
          headers: { 'Token-Trator': token }
        }
      )
      if (response.data.mensagem.erro !== true) {
        equipment = response.data.equipamento
        checklist = response.data.checklist
        obs = response.data.observacao
      } else {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    } else {
      const response = await api.get(
        `/equipamentosDeTerceiros/${ctx.query.chassi}/${ctx.query.id}`
      )
      if (response.data.mensagem.erro !== true) {
        equipment = response.data.equipamento
      } else {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { typed, equipment, checklist, obs }
  }
}
