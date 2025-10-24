import { type ReactNode, useState } from 'react'
import type { TypeDashboardFuncionario } from '../../types/type-dashboard-funcionario'
import { Atendimento } from './sections/atendimento'
import { Dados } from './sections/dados'
import { Inicio } from './sections/inicio'
import { Usuario } from './sections/usuario'
import { SideBarDashboard } from '../../components/SideBar'

export function HomeFuncionario() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardFuncionario>('Inicio')

  const sectionsDashboard: Record<TypeDashboardFuncionario, ReactNode> = {
    Inicio: <Inicio />,
    Atendimento: <Atendimento />,
    Dados: <Dados />,
    Usuarios: <Usuario />,
  }

  return (
    <main className="flex h-screen w-full justify-between bg-[#f5f7fa]">
      <SideBarDashboard.root>
        <SideBarDashboard.logo />
        <SideBarDashboard.Links sectionSelecionada={selecionarSection} selecionarSection={(section) => setSelecionarSection(section as TypeDashboardFuncionario)} typeUser='PROFISSIONAL' />
        <SideBarDashboard.botao />
      </SideBarDashboard.root>

      {sectionsDashboard[selecionarSection]}
    </main>
  )
}
