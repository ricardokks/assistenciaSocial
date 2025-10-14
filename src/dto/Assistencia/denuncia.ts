import type { AssistenciaDTO } from "./assistenciaDTO";

export type Denuncia = {
    id: string;
    descricao: string;
    documentoURLs: DocumentoDenuncia[];
    assistenciaId: string;
    assistencia: AssistenciaDTO;
    createdAt: Date;
}

export type DocumentoDenuncia = {
    id: string;
    documentoURL: string;
    denunciaId: string;
    denuncia: Denuncia;
    nomeArquivo: string;
}
