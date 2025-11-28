import { api } from '../../lib/axios.config'

export async function updateSolicitacoes(id: string) {
  try {
    const response = api.put(`solicitacoes/${id}`)
    return response
  } catch (error) {
    console.log('Error ao atualizar', error)
  }
}
