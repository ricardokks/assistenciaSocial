export interface CardAgendamentoProps {
  nomeCidadao: string
  cpf: string
  data: string
  DescricaoAgendamento: string
  abrirModal?: () => void
  updateModal?: () => void
  deleteModal?: () => void
}
