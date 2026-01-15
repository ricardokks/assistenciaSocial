import { toast } from 'sonner'

import { deleteSolicitacao } from '../api/solicitacoes/deleteSolicitacao'

export async function deleteSolicitacaoFunc(
  idParaDeletar: string | null,
  remove: (id: string) => void,
  setVisibilidadeModalDeletarAgendamento: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!idParaDeletar) return

  try {
    await deleteSolicitacao(idParaDeletar)
    remove(idParaDeletar)
  } catch (error: any) {
    const message = error?.response?.data?.message ?? 'Erro ao deletar agendamento'
    toast.error(message)
  } finally {
    setVisibilidadeModalDeletarAgendamento(false)
  }
}
