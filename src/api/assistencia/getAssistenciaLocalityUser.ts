import { api } from '../../lib/axios.config'

export async function getAssistenciaLocalityUser() {
  const { data } = await api.get(`/assistencias/locality`)
  return data
}
