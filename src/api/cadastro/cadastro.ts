import { api } from '../../lib/axios.config'
import type { userCadastroDTO } from '../../schemas/userCadastroSchema'

export async function cadastro(data: userCadastroDTO) {
  const response = await api.post('/usuarios', data)
  return response.data
}
