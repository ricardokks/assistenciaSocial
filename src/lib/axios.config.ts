import axios from 'axios'

export const api = axios.create({
  baseURL: 'api.assistenciasocialmassape.com.br',
  withCredentials: true,
})
