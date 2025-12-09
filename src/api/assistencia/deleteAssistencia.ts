import { api } from '../../lib/axios.config'

export async function deleteAssistencia(id?: string) {
  const { data } = await api.delete(`/assistencias/${id}`)
  return data.data
}
