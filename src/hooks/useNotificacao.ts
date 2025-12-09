import { useEffect, useState } from 'react'

import { getNotificacoes } from '../api/notificacao/getNotificacao'
import { socket } from '../utils/socket'

const LIMITE_MS = 60 * 60 * 1000 // 1 hora

let globalSetters: any[] = []
let globalNotificacoes: any[] = []

function atualizarTodos(novas: any[]) {
  globalNotificacoes = novas
  localStorage.setItem('notificacoes', JSON.stringify(novas))

  globalSetters.forEach((set) => set(novas))
}

export function useNotificacoes(userId?: string) {
  const [notificacoes, setNotificacoes] = useState<any[]>(globalNotificacoes)

  useEffect(() => {
    globalSetters.push(setNotificacoes)

    return () => {
      globalSetters = globalSetters.filter((s) => s !== setNotificacoes)
    }
  }, [])

  useEffect(() => {
    async function load() {
      const saved = localStorage.getItem('notificacoes')
      const agora = Date.now()
      let notificacoesSalvas: any[] = []

      if (saved) {
        const parsed = JSON.parse(saved)
        notificacoesSalvas = parsed.filter(
          (n) => !n.timestampVisto || agora - n.timestampVisto < LIMITE_MS
        )
      }

      if (userId) {
        const response = await getNotificacoes(userId)
        const doBanco = response.map((n: any) => ({
          ...n,
          timestampCriado: new Date(n.timestampCriado).getTime(),
          timestampVisto: n.timestampVisto ? new Date(n.timestampVisto).getTime() : null,
        }))

        notificacoesSalvas = [...doBanco, ...notificacoesSalvas].filter(
          (v, i, a) => a.findIndex((n) => n.id === v.id) === i
        )
      }

      atualizarTodos(notificacoesSalvas)
    }

    if (!userId) {
      const saved = localStorage.getItem('notificacoes')
      if (saved) setNotificacoes(JSON.parse(saved))
      return
    }

    load()
  }, [userId])

  useEffect(() => {
    if (!userId) return

    const handler = (payload: any) => {
      const nova = {
        ...payload,
        timestampCriado: Date.now(),
        timestampVisto: null,
      }

      const lista = [nova, ...globalNotificacoes].slice(0, 4)
      atualizarTodos(lista)
    }

    socket.on('solicitacao:statusAtualizado', handler)
    return () => socket.off('solicitacao:statusAtualizado', handler)
  }, [userId])

  return notificacoes
}
