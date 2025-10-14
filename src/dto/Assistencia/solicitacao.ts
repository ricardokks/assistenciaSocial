import type { UsuarioDTO } from "../Usuario/usuarioDTO";
import type { AssistenciaDTO } from "./assistenciaDTO";

export type Servico = {
    id: string;
    nome: string;
    descricao: string;
    numero_protocolo: string;
    solicitacoes: Solicitacoes[];
    assistenciaId: string;
    assistencia: AssistenciaDTO;
}

export type Solicitacoes = {
    id: string;
    usuarioId: string;
    usuario: UsuarioDTO;
    servicoId: string;
    servico: Servico;
    assistenciaId: string;
    assistencia: AssistenciaDTO;
    status: "CONCLUIDO" | "ANALISE" | "RECUSADO" | "DOCUMENTO_PENDENTE";
    protocolo: string;
    observacoes?: string;
    createdAt: Date;
    updatedAt: Date;
}


