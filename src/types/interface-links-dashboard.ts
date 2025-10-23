import type { TypeDashboardAdministrador } from './type-dashboard-administrador'
import type { TypeDashboardCidadao } from './type-dashboard-cidadao'
import type { TypeDashboardFuncionario } from './type-dashboard-funcionario'
import type { TypeIcon } from './type-icon'

export interface LinksDashboardFuncionarioProps  {
  icone: TypeIcon | string
  nomeLink: string
  id?: TypeDashboardFuncionario
}

export interface LinksDashboardAdministradorProps {
  icone: TypeIcon | string
  nomeLink: string
  id: TypeDashboardAdministrador
}

export interface LinksDashboardCidadaoProps {
  icone: TypeIcon | string
  nomeLink: string
  id: TypeDashboardCidadao
}