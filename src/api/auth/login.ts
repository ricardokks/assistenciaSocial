import { api } from '../../lib/axios.config'
import type { userLoginDTO } from '../../schemas/userLoginSchema'

export async function login(data: userLoginDTO) {
  const response = await api.post('/login', data)
  return response.data
}
