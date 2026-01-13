import axios from 'axios'

export const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
})

// https://api.assistenciasocialmassape.com.br
// http://localhost:4000
