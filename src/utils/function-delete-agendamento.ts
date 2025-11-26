import { toast } from "sonner"
import { deleteSolicitacao } from "../api/solicitacoes/deleteSolicitacao"
import type { SolicitacaoDTO } from "../types/type-solicitacoes"


export async function deleteSolicitacaoFunc(idParaDeletar: string | null, setSolicitacoes: React.Dispatch<React.SetStateAction<SolicitacaoDTO[]>>, setVisibilidadeModalDeletarAgendamento: React.Dispatch<React.SetStateAction<boolean>>) {
    if (!idParaDeletar) return

    try {
        await deleteSolicitacao(idParaDeletar)

        // remove do estado local
        setSolicitacoes(prev => prev.filter(item => item.id !== idParaDeletar))

        toast.success("Agendamento deletado com sucesso")
        //   usar dps de funcionar =>       await deleteSolicitacao(idParaDeletar)
    } catch {
        toast.error("Erro ao deletar")
    } finally {
        setVisibilidadeModalDeletarAgendamento(false)
    }
}