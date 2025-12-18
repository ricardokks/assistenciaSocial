import { useEffect, useState } from 'react'

import { getNotificacoes } from '../api/notificacao/getNotificacao'
import { socket } from '../utils/socket'

let globalSetters: any[] = []
let globalNotificacoes: any[] = []

function atualizarTodos(novas: any[]) {
  globalNotificacoes = novas

  globalSetters.forEach((set) => {
    set(novas)
  })
}

export function useNotificacoes(userId?: string) {
  const [notificacoes, setNotificacoes] = useState<any[]>([])

  useEffect(() => {
    if (!globalSetters.includes(setNotificacoes)) {
      globalSetters.push(setNotificacoes)
    }

    return () => {
      globalSetters = globalSetters.filter((s) => s !== setNotificacoes)
    }
  }, [])

  // Carregar do banco ao montar
  useEffect(() => {
    async function load() {
      if (!userId) return

      const response = await getNotificacoes(userId)

      const doBanco = response.map((n: any) => ({
        ...n,
        timestampCriado: new Date(n.timestampCriado).getTime(),
        timestampVisto: n.timestampVisto ? new Date(n.timestampVisto).getTime() : null,
      }))

      // Mescla com notificações globais (para quem já recebeu via socket)
      const merged = [...doBanco, ...globalNotificacoes]

      const unicos = merged.filter((v, i, arr) => arr.findIndex((n) => n.id === v.id) === i)

      atualizarTodos(unicos)
    }

    load()
  }, [userId])

  // Registrar usuário no websocket
  useEffect(() => {
    if (!userId) return

    if (!socket.connected) {
      socket.connect()
    }

    socket.emit('register', userId)

    return () => {
      socket.off('register')
    }
  }, [userId])

  // Receber novas notificações em tempo real
  useEffect(() => {
    if (!userId) return

    const handler = (payload: any) => {
      const nova = {
        ...payload,
        timestampCriado: Date.now(),
        timestampVisto: null,
      }

      const merged = [nova, ...globalNotificacoes]
      atualizarTodos(merged)
    }

    socket.on('solicitacao:statusAtualizado', handler)

    return () => {
      socket.off('solicitacao:statusAtualizado', handler)
    }
  }, [userId])

  return notificacoes
}
