import { useEffect, useState } from 'react'
import { getNotificacoes } from '../api/notificacao/getNotificacao'
import { socket } from '../utils/socket'

const LIMITE_MS = 60 * 60 * 1000 // 1 hora

let globalSetters: any[] = []
let globalNotificacoes: any[] = []

function atualizarTodos(novas: any[]) {
  globalNotificacoes = novas

  localStorage.setItem('notificacoes', JSON.stringify(novas))

  globalSetters.forEach((set, i) => {
    set(novas)
  })
}

function carregarLocalStorage() {
  try {
    const raw = localStorage.getItem('notificacoes')

    if (!raw) return []

    const parsed = JSON.parse(raw)

    const agora = Date.now()
    const filtradas = parsed.filter((n: any) => {
      const ok = !n.timestampVisto || agora - n.timestampVisto < LIMITE_MS
      return ok
    })

    return filtradas
  } catch (err) {
    return []
  }
}

export function useNotificacoes(userId?: string) {
  const [notificacoes, setNotificacoes] = useState(() => {
    const initial = carregarLocalStorage()
    return initial
  })

  useEffect(() => {
    if (!globalSetters.includes(setNotificacoes)) {
      globalSetters.push(setNotificacoes)
    } else {
    }

    return () => {
      globalSetters = globalSetters.filter((s) => s !== setNotificacoes)
    }
  }, [])

  useEffect(() => {
    async function load() {

      const base = carregarLocalStorage()

      if (userId) {

        const response = await getNotificacoes(userId)

        const doBanco = response.map((n: any) => ({
          ...n,
          timestampCriado: new Date(n.timestampCriado).getTime(),
          timestampVisto: n.timestampVisto
            ? new Date(n.timestampVisto).getTime()
            : null,
        }))

        const merged = [...doBanco, ...base, ...globalNotificacoes]

        const unicos = merged.filter(
          (v, i, arr) => arr.findIndex((n) => n.id === v.id) === i
        )

        atualizarTodos(unicos)
      }
    }

    load()
  }, [userId])


  useEffect(() => {
    if (!userId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("register", userId);

    return () => {
      socket.off("register");
    };
  }, [userId]);


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
