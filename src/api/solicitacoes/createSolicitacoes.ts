import { api } from '../../lib/axios.config'

export async function createSolicitacoes(dados: any) {
  const { data } = await api.post(`/solicitacoes`, dados)
  return data
}
