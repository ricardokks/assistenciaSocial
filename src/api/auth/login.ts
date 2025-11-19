import { api } from '../../lib/axios.config'
import type { userLoginDTO } from '../../schemas/userLoginSchema'

export async function login(data: userLoginDTO) {
  try {
    const response = await api.post('/login', data)
    return response.data
  } catch (error) {
    return console.log('Não foi possivel logar', error)
  }
}
