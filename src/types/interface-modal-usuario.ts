import type { UsuarioDTO } from '../dto/Usuario/usuarioDTO'

export interface ModalUsuarioProps {
  refreshUsers: () => void
  abrilModalUsuario: boolean
  handleAbrirModalDelete: () => void
}
