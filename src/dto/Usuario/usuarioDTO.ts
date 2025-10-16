
import type { Atividade } from "../Assistencia/atividade";
import type { Ouvidoria } from "../Assistencia/ouvidoria";
import type { Solicitacoes } from "../Assistencia/solicitacao";
import type { Configuracao } from "./configuracoes";

export type UsuarioDTO = {
    id: string;
    nome: string;
    localidade: string;
    numero_casa: string;
    rua: string;
    complemento: string;
    email: string;
    rg: string;
    cpf: string;
    nis: string;
    telefone: string;
    papel: 'CIDADAO' | 'ASSISTENCIA' | 'ADMIN';
    avatarURL?: string;
    assistenciaId?: string;
    configuracaoId?: string;

    solicitacoes:  Solicitacoes[];
    configuracao:  Configuracao;
    atividades:    Atividade[];
    ouvidorias:    Ouvidoria[];

}