import { useEffect, useState } from 'react'

import { socket } from '../../utils/socket'
import { CardNotificacao } from './cardNotificacao'

type Notificacao = {
  data: string
  hora: string
  novoStatus: string
  protocolo: string
  servico?: string
  unidade?: string
  solicitacaoId: string
  solicitacao: any

  timestampCriado: number
  timestampVisto?: number | null
}

export function InicioNotificacao({ user }: { user: any }) {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])

  const LIMITE_MS = 60 * 60 * 1000

  useEffect(() => {
    const saved = localStorage.getItem('notificacoes')
    if (!saved) return

    const parsed: Notificacao[] = JSON.parse(saved)
    const agora = Date.now()

    const filtradas = parsed.filter((n) => {
      if (!n.timestampVisto) return true
      return agora - n.timestampVisto < LIMITE_MS
    })

    setNotificacoes(filtradas)
  }, [])

  useEffect(() => {
    if (notificacoes.length === 0) return

    const agora = Date.now()

    const novas = notificacoes.map((n) => {
      if (!n.timestampVisto) {
        return { ...n, timestampVisto: agora }
      }
      return n
    })

    setNotificacoes(novas)
    localStorage.setItem('notificacoes', JSON.stringify(novas))
  }, [notificacoes.length])

  useEffect(() => {
    if (!user) return

    socket.on('solicitacao:statusAtualizado', (payload) => {
      setNotificacoes((prev) => {
        const novaNotif: Notificacao = {
          ...payload,
          timestampCriado: Date.now(),
          timestampVisto: null,
        }

        const lista = [novaNotif, ...prev].slice(0, 4)

        localStorage.setItem('notificacoes', JSON.stringify(lista))

        return lista
      })
    })

    return () => socket.off('solicitacao:statusAtualizado')
  }, [user])

  return (
    <div className="mt-2 flex flex-col space-y-2 max-md:pb-[8rem]">
      {notificacoes.length === 0 ? (
        <div className="text-primary-800/60 mt-4 text-center">
          Você não possui notificações recentes.
        </div>
      ) : (
        notificacoes.map((item, index) => <CardNotificacao key={index} data={item} user={user} />)
      )}
    </div>
  )
}
