import { api } from '../../lib/axios.config'
import type { CardAgendamentoProps } from '../../types/interface-card-agendamento'

export async function updateAgendamento(id: string, data: CardAgendamentoProps) {
  try {
    const response = await api.put(`/solicitacoes/${id}`, data)
    return response.data
  } catch (error) {
    console.log('Erorr ao atualizar o agendamento', error)
  }
}
