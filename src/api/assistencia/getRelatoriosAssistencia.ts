import { api } from '../../lib/axios.config'

export async function getRelatoriosAssistencia() {
  const { data } = await api.get('/assistencia/relatorio')
  return data.data
}
