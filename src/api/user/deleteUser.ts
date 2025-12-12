
import { api } from '../../lib/axios.config'

export async function deleteUser(userId: string) {
  try {
    const response = await api.delete(`/users/${userId}`)
    return response
    } catch (error) {
    console.log('Falha ao deletar o usuário', error)
    throw error
    }
}