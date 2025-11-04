import { type ReactNode, useState } from 'react'

import { Inicio } from '../../components/Inicio/Inicio'
import { SideBarDashboard } from '../../components/SideBar'
import { SideBarMobile } from '../../components/SideBarMobile'
import type { TypeDashboardCidadao } from '../../types/type-dashboard-cidadao'
import { Servicos } from './section/servicos'

export function HomeCidadao() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
  const sectionsDashboard: Record<TypeDashboardCidadao, ReactNode> = {
    Inicio: <Inicio user="CIDADAO" />,
    ContatarAtendimento: <div> </div>,
    ProcurarServico: <Servicos />,
  }

  return (
    <main className="flex h-screen w-full justify-between gap-6 bg-[#f5f7fa] max-md:flex-col">
      <SideBarDashboard.root>
        <SideBarDashboard.logo />
        <SideBarDashboard.Links
          sectionSelecionada={selecionarSection}
          selecionarSection={(section) => setSelecionarSection(section as TypeDashboardCidadao)}
          typeUser="CIDADAO"
        />
        <SideBarDashboard.botao />
      </SideBarDashboard.root>
      <SideBarMobile.root>
        <SideBarMobile.links
          sectionSelecionada={selecionarSection}
          selecionarSection={(section) => setSelecionarSection(section as TypeDashboardCidadao)}
          typeUser="CIDADAO"
        />
      </SideBarMobile.root>

      {sectionsDashboard[selecionarSection]}
    </main>
  )
}
