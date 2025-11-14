import type { UsuarioDTO } from "../dto/Usuario/usuarioDTO"

export interface ModalUsuarioProps {
    usuario: UsuarioDTO
    abrilModalUsuario: boolean
    handleAbrirModalDelete: () => void
}