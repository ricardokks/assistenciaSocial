import { api } from '../../lib/axios.config'

export function PegarInformacaoFuncionario() {
  try {
    const response = api.get('/users/')
    return response
  } catch (error) {
    return console.log('Error ao pegar informações', error)
  }
}
