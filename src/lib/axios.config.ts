import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.assistenciasocialmassape.com.br',
  withCredentials: true,
})

// https://api.assistenciasocialmassape.com.br
// http://localhost:4000
