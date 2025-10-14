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
