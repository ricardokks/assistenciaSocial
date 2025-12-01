import { useEffect, useState } from 'react'
import { socket } from '../../utils/socket'
import { CardNotificacao } from './cardNotificacao'
import { getNotificacoes } from '../../api/notificacao/getNotificacao'

type Notificacao = {
  id: string
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
  const LIMITE_MS = 60 * 60 * 1000 // 1 hora

  useEffect(() => {
    async function load() {
      const saved = localStorage.getItem('notificacoes')
      const agora = Date.now()
      let notificacoesSalvas: Notificacao[] = []

      if (saved) {
        const parsed: Notificacao[] = JSON.parse(saved)
        // Mantém apenas notificações ainda válidas
        notificacoesSalvas = parsed.filter(n => !n.timestampVisto || agora - n.timestampVisto < LIMITE_MS)
      }

      if (user?.id) {
        const response = await getNotificacoes(user.id)
        const doBanco: Notificacao[] = response.map((n: any) => ({
          ...n,
          timestampCriado: new Date(n.timestampCriado).getTime(), // garante timestamp numérico
          timestampVisto: n.timestampVisto ? new Date(n.timestampVisto).getTime() : null,
        }))

        // Mescla sem duplicar (baseado em id ou solicitacaoId)
        const merged = [...doBanco, ...notificacoesSalvas].filter(
          (v, i, a) => a.findIndex((n: any) => n.id === v.id) === i
        )

        notificacoesSalvas = merged
      }

      setNotificacoes(notificacoesSalvas)
      localStorage.setItem('notificacoes', JSON.stringify(notificacoesSalvas))
    }

    load()
  }, [user?.id])

  useEffect(() => {
    if (!user) return

    const handler = (payload: Notificacao) => {
      setNotificacoes(prev => {
        const nova: Notificacao = {
          ...payload,
          timestampCriado: Date.now(),
          timestampVisto: null,
        }

        const lista = [nova, ...prev].slice(0, 4)
        localStorage.setItem('notificacoes', JSON.stringify(lista))
        return lista
      })
    }

    socket.on('solicitacao:statusAtualizado', handler)
    return () => socket.off('solicitacao:statusAtualizado', handler)
  }, [user])

  return (
    <div className="mt-2 flex flex-col space-y-2 max-md:pb-[8rem]">
      {notificacoes.length === 0 ? (
        <div className="text-primary-800/60 mt-4 text-center">
          Você não possui notificações recentes.
        </div>
      ) : (
        notificacoes.map((item, index) => (
          <CardNotificacao key={index} data={item} user={user} />
        ))
      )}
    </div>
  )
}

