import { api } from '../../lib/axios.config'

export async function getAssistencias() {
  const { data } = await api.get(`/assistencias`)
  return data
}
