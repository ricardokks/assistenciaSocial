import type { TypeUsario } from '../types/type-usuarios'
import type { NavigateFunction } from 'react-router-dom'

export function verifyRole(papel: TypeUsario, navigate: NavigateFunction, id?: string ) {
  if (papel === 'ADMINISTRADOR') navigate(`/dashboard/administrador/`)
  if (papel === 'CIDADAO') navigate(`/dashboard/cidadao/${id}`)
  if (papel === 'GESTOR') navigate(`/dashboard/gestor/${id}`)
  if (papel === 'FUNCIONARIO') navigate(`/dashboard/funcionario/`)
}
