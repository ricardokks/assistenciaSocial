import { api } from '../../lib/axios.config'

export async function cadastro(data: FormData) {
  try {
    const response = await api.post('/users', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error) {
    console.log('Falha ao criar um usuário', error)
    throw error
  }
}
