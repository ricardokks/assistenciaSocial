import type { Atividade } from '../Assistencia/atividade'
import type { Ouvidoria } from '../Assistencia/ouvidoria'
import type { Solicitacoes } from '../Assistencia/solicitacao'
import type { Configuracao } from './configuracoes'

export type UsuarioDTO = {
  id: string
  nome: string
  nome_mae: string
  localidade?: string
  numero_casa?: string
  rua?: string
  complemento?: string
  cpf?: string
  papel: 'CIDADAO' | 'ASSISTENCIA' | 'ADMIN'
  avatarURL?: string
  assistenciaId?: string
  configuracaoId?: string

  solicitacoes: Solicitacoes[]
  configuracao: Configuracao
  atividades: Atividade[]
  ouvidorias: Ouvidoria[]
}

export type UsuarioDTOO = {
  id: string
  nome: string
  nome_mae: string
  localidade?: string
  numero_casa?: string
  rua?: string
  complemento?: string
  cpf?: string
  papel: 'CIDADAO' | 'ASSISTENCIA' | 'ADMIN'
  avatarURL?: string
}
  