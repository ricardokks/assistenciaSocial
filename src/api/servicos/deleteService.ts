import { api } from '../../lib/axios.config'

export async function deleteServico(id: string) {
  const { data } = await api.delete(`/servicos/${id}`)
  return data.data
}
