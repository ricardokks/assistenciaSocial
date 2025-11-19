import { useNavigate } from 'react-router-dom'

import type { TypeUsario } from '../types/type-usuarios'

function dashboard(tipo: TypeUsario | string) {
  const navigate = useNavigate()
  const papel = tipo.toLowerCase()
  return navigate(`/dashboard/${papel}`)
}

export function verifyRole(papel: TypeUsario) {
  if (papel === 'ADMINISTRADOR') dashboard('ADMINISTRADOR')
  if (papel === 'CIDADAO') dashboard('CIDADAO')
  if (papel === 'GESTOR') dashboard('GESTOR')
  if (papel === 'PROFISSIONAL') dashboard('FUNCIONARIO')
}
