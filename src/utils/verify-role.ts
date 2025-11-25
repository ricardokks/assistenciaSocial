import type { TypeUsario } from '../types/type-usuarios'
import type { NavigateFunction } from 'react-router-dom'

export function verifyRole(papel: TypeUsario, navigate: NavigateFunction) {
  if (papel === 'ADMINISTRADOR') navigate('/dashboard/administrador')
  if (papel === 'CIDADAO') navigate('/dashboard/cidadao')
  if (papel === 'GESTOR') navigate('/dashboard/gestor')
  if (papel === 'FUNCIONARIO') navigate('/dashboard/funcionario')
}
