import type { AgendamentoDTO } from '../dto/Agendamento/AgendamentoDTO'

export interface CardAgendamentoProps {
  data?: string
  dados: AgendamentoDTO
  deleteModal?: () => void
  onUpdateLocal: (id: string, novosDados: Partial<AgendamentoDTO>) => void
}
