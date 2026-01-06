import { io } from 'socket.io-client'

export const socket = io('api.assistenciasocialmassape.com.br', {
  autoConnect: false,
})
