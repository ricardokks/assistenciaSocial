import { api } from '../../lib/axios.config'

export async function deleteSolicitacao(id: string) {
  const { data } = await api.delete(`/solicitacoes/${id}`)
  return data
}
