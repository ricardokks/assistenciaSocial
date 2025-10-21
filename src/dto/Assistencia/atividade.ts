import type { UsuarioDTO } from '../Usuario/usuarioDTO'

export type Atividade = {
  id: string
  nome: string
  data: Date
  tipoAtividade: string
  descricao: string
  usuario_id?: string
  usuario: UsuarioDTO[]
  ativo: boolean
}
