import { api } from '../../lib/axios.config'

export async function getAssistencia(id?: string) {
  const { data } = await api.get(`/assistencias/${id}`)
  return data
}
