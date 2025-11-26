import type { AssistenciaDTO } from "./type-assistencia"

export type SolicitacaoDTO = {
  id: string
  usuarioId: string
  servicoId: string
  dataCriacao: Date
  data?: string
  unidadeId: string
  observacoes?: string
  status: "ANALISE" | "APROVADO" | "RECUSADO" | "PENDENTE"
  servico: any
  assistencia: AssistenciaDTO
}
