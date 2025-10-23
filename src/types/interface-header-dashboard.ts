import type { TypeDashboardFuncionario } from './type-dashboard-funcionario'
import type { TypeUsario } from './type-usuarios'

export interface HeaderLinksProps {
  typeUser: TypeUsario
  selecionarSection: (section: TypeDashboardFuncionario) => void
  sectionSelecionada: TypeDashboardFuncionario
}
