import { useContext, useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'

import { NegotiationContext } from '@contexts/NegotiationsContext'

export function Chat(props: any) {
  const {
    useLoading,
    negotiations,
    negotiation,
    getNegotiations,
    getNegotiation,
    sendMsg
  } = useContext(NegotiationContext)

  const [active, setActive] = useState<number>(
    props.initial.chassi === 'null'
      ? 0
      : negotiations?.findIndex(n => n.chassi === props.initial.chassi)
  )

  const [msg, setMsg] = useState<string>('')

  useEffect(() => {
    if (props.initial.chassi !== 'null') {
      getNegotiations('props', props.initial.chassi, props.initial.id)
    } else {
      getNegotiations('initial')
    }
  }, [])

  async function handleNegotiation(index: number, chassi: string, id: number) {
    try {
      setActive(index)
      getNegotiation(chassi, id)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleMsg() {
    try {
      sendMsg(
        msg,
        negotiations[active].chassi,
        negotiations[active].empresa.idEmpresa
      )
      setMsg('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="grid lg:grid-cols-2">
      <div className="border-hr-color border-r h-150 overflow-y-auto">
        {useLoading ? (
          <>
            <div className="animate-pulse bg-foreground border-hr-color border-b px-20 py-11"></div>
            <div className="animate-pulse bg-foreground border-hr-color border-b px-20 py-11"></div>
            <div className="animate-pulse bg-foreground border-hr-color border-b px-20 py-11"></div>
            <div className="animate-pulse bg-foreground border-hr-color border-b px-20 py-11"></div>
            <div className="animate-pulse bg-foreground border-hr-color border-b px-20 py-11"></div>
            <div className="animate-pulse bg-foreground border-hr-color border-b px-20 py-11"></div>
            <div className="animate-pulse bg-foreground border-hr-color border-b px-20 py-11"></div>
          </>
        ) : negotiations && negotiations.length >= 1 ? (
          negotiations.map((n, index) => {
            if (index === active) {
              return (
                <button
                  onClick={() =>
                    handleNegotiation(index, n.chassi, n.empresa.idEmpresa)
                  }
                  key={index}
                  className="items-center bg-foreground border-hr-color border-b flex focus:outline-none p-4 delay-100 transition w-full"
                >
                  <img
                    src={n.foto}
                    alt="Equipment Img"
                    className="rounded h-14 object-cover w-20"
                  />
                  <div className="ml-5 text-left">
                    <p className="text-sm text-color-light">{`${n.marca}, ${n.modelo} - ${n.ano}`}</p>
                    <p className="text-color-medium">
                      {n.empresa.nomeFantasia}
                    </p>
                  </div>
                </button>
              )
            } else if (!active && n.empresa.idEmpresa === props.initial.id) {
              return (
                <button
                  onClick={() =>
                    handleNegotiation(index, n.chassi, n.empresa.idEmpresa)
                  }
                  key={index}
                  className="items-center bg-foreground border-hr-color border-b flex focus:outline-none p-4 delay-100 transition w-full"
                >
                  <img
                    src={n.foto}
                    alt="Equipment Img"
                    className="rounded h-14 object-cover w-20"
                  />
                  <div className="ml-5 text-left">
                    <p className="text-sm text-color-light">{`${n.marca}, ${n.modelo} - ${n.ano}`}</p>
                    <p className="text-color-medium">
                      {n.empresa.nomeFantasia}
                    </p>
                  </div>
                </button>
              )
            } else {
              return (
                <button
                  onClick={() =>
                    handleNegotiation(index, n.chassi, n.empresa.idEmpresa)
                  }
                  key={index}
                  className="items-center border-hr-color border-b flex hover:opacity-75 focus:outline-none p-4 delay-100 transition w-full"
                >
                  <img
                    src={n.foto}
                    alt="Equipment Img"
                    className="rounded h-14 object-cover w-20"
                  />
                  <div className="ml-5 text-left">
                    <p className="text-sm text-color-light">{`${n.marca}, ${n.modelo} - ${n.ano}`}</p>
                    <p className="text-color-medium">
                      {n.empresa.nomeFantasia}
                    </p>
                  </div>
                </button>
              )
            }
          })
        ) : (
          <></>
        )}
      </div>
      <div className="mt-10 relative lg:mt-0">
        <div className="h-120 overflow-auto px-5">
          {negotiations && negotiation ? (
            negotiation[0].mensagens && negotiation[0].mensagens.length >= 1 ? (
              negotiation[0].mensagens.map((m, index) => {
                if (m.usuarioOrigem === negotiation[0].cliente.nomeFantasia) {
                  return (
                    <div key={index} className="py-5">
                      <p className="items-center flex font-bold justify-end py-2 text-color-light">
                        <small className="font-light mr-5 text-color-medium">
                          {m.dataHoraTxt}
                        </small>{' '}
                        Você
                      </p>
                      <p className="bg-secondary rounded text-sm p-5 text-right text-white w-full">
                        {m.mensagem}
                      </p>
                    </div>
                  )
                } else {
                  return (
                    <div className="py-5" key={index}>
                      <p className="items-center flex font-bold justify-start py-2 text-tertiary">
                        {m.usuarioOrigem}{' '}
                        <small className="font-light ml-5 text-color-medium">
                          {m.dataHoraTxt}
                        </small>
                      </p>
                      <p className="bg-tertiary rounded text-sm p-5 text-left text-white w-full">
                        {m.mensagem}
                      </p>
                    </div>
                  )
                }
              })
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="bg-primary bottom-0 left-0 p-5 absolute w-full">
          <div className="items-center flex w-full">
            <input
              defaultValue={msg}
              value={msg}
              type="text"
              onChange={e => setMsg(e.target.value)}
              name="msg"
              maxLength={400}
              placeholder="Digite a mensagem.."
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            <button
              onClick={() => handleMsg()}
              className="text-xl hover:opacity-75 focus:outline-none pl-5 text-color-info delay-100 transition"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
