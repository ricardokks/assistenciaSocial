import type { TypeIcon } from '../../types/type-icon'
import type { UsuarioDTO } from '../Usuario/usuarioDTO'
import type { Denuncia } from './denuncia'
import type { Ouvidoria } from './ouvidoria'
import type { Servico, Solicitacoes } from './solicitacao'

export type AssistenciaDTO = {
  id: string
  unidade: string
  longitude: number
  latitude: number
  telefone: string
  horarioFuncionamento: string
  servicos: Servico[]
  solicitacoes: Solicitacoes[]
  usuarios: UsuarioDTO[]
  denuncias: Denuncia[]
  ouvidorias: Ouvidoria[]
}

export type AssistenciaNOVODTO = {
  id: string
  unidade: string
  subNome: string
  icone: TypeIcon
  descricao: string
  localizacao: string
  telefone: string
  horarioFuncionamento: string
  servicos: Servico[]
  solicitacoes: Solicitacoes[]
  usuarios: UsuarioDTO[]
  denuncias: Denuncia[]
  ouvidorias: Ouvidoria[]
  abrange: string[]
}

export type AssistenciaDTOO = {
  id: string
  unidade: string
  localizacao: string
  abrange: string[]
  icone: string
  sobre: string
  subnome: string
}
