import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// https://api.assistenciasocialmassape.com.br
// http://localhost:4000