import { toast } from 'sonner'

import { deleteSolicitacao } from '../api/solicitacoes/deleteSolicitacao'
import type { SolicitacaoDTO } from '../types/type-solicitacoes'

export async function deleteSolicitacaoFunc(
  idParaDeletar: string | null,
  setSolicitacoes: React.Dispatch<React.SetStateAction<SolicitacaoDTO[]>>,
  setVisibilidadeModalDeletarAgendamento: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!idParaDeletar) return

  try {
    await deleteSolicitacao(idParaDeletar)
    setSolicitacoes((prev) => prev.filter((item) => item.id !== idParaDeletar))
  } catch (error: any) {
    const message = error?.response?.data?.message ?? 'Erro ao deletar agendamento'
    toast.error(message)
  } finally {
    setVisibilidadeModalDeletarAgendamento(false)
  }
}
