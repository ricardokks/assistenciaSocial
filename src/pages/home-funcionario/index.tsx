import { type ReactNode, useState } from 'react'

import type { TypeDashboardFuncionario } from '../../types/type-dashboard-funcionario'
import { HeaderDashboards } from './components/header'
import { Atendimento } from './sections/atendimento'
import { Dados } from './sections/dados'
import { Inicio } from './sections/inicio'
import { Usuario } from './sections/usuario'

export function HomeFuncionario() {
  // variaveis e estados utilizados
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardFuncionario>('Inicio')
  const sectionsDashboard: Record<TypeDashboardFuncionario, ReactNode> = {
    Inicio: <Inicio />,
    Atendimento: <Atendimento />,
    Dados: <Dados />,
    Usuarios: <Usuario />,
  }

  return (
    <main className="bg-bright-100 flex h-screen w-full">
      <HeaderDashboards.root>
        <HeaderDashboards.logo />
        <HeaderDashboards.Links sectionSelecionada={selecionarSection} selecionarSection={setSelecionarSection} typeUser='PROFISSIONAL' />
        <HeaderDashboards.botao />
      </HeaderDashboards.root>

      {sectionsDashboard[selecionarSection]}
    </main>
  )
}
