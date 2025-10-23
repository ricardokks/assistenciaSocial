import type { TypeDashboardAdministrador } from './type-dashboard-administrador'
import type { TypeDashboardCidadao } from './type-dashboard-cidadao'
import type { TypeDashboardFuncionario } from './type-dashboard-funcionario'
import type { TypeUsario } from './type-usuarios'

export interface HeaderLinksProps {
  typeUser: TypeUsario
  selecionarSection: (section: TypeDashboardFuncionario | TypeDashboardCidadao | TypeDashboardAdministrador ) => void
  sectionSelecionada: TypeDashboardFuncionario | TypeDashboardCidadao | TypeDashboardAdministrador
}
