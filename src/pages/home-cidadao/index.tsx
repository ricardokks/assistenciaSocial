import { type ReactNode, useState } from 'react'

import { SideBarDashboard } from '../../components/SideBar'
import type { TypeDashboardCidadao } from '../../types/type-dashboard-cidadao'
import { Servicos } from './section/servicos'
import { Inicio } from '../../components/Inicio/Inicio'

export function HomeCidadao() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
  const sectionsDashboard: Record<TypeDashboardCidadao, ReactNode> = {
    Inicio: <Inicio user='CIDADAO' />,
    ContatarAtendimento: <div> </div>,
    ProcurarServico: <Servicos />,
  }

  return (
    <main className="flex h-screen w-full gap-6 justify-between bg-[#f5f7fa]">
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
