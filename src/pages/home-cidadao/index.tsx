import { type ReactNode, useState } from 'react'

import { SideBarDashboard } from '../../components/SideBar'
import type { TypeDashboardCidadao } from '../../types/type-dashboard-cidadao'
import { Inicio } from './section/inicio'

export function HomeCidadao() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
  const sectionsDashboard: Record<TypeDashboardCidadao, ReactNode> = {
    Inicio: <Inicio />,
    ContatarAtendimento: <div> </div>,
    ProcurarServico: <div> rolinha </div>,
  }

  return (
    <main className="flex h-screen w-full justify-between bg-[#f5f7fa]">
      <SideBarDashboard.root>
        <SideBarDashboard.logo />
        <SideBarDashboard.Links
          sectionSelecionada={selecionarSection}
          selecionarSection={(section) => setSelecionarSection(section as TypeDashboardCidadao)}
          typeUser="CIDADAO"
        />
        <SideBarDashboard.botao />
      </SideBarDashboard.root>

      {sectionsDashboard[selecionarSection]}
    </main>
  )
}
