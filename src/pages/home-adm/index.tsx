import { type ReactNode, useState } from 'react'

import { SideBarDashboard } from '../../components/SideBar'
import type { TypeDashboardAdministrador } from '../../types/type-dashboard-administrador'
import { Instituicoes } from './sections/instituicoes'
import { Usuarios } from './sections/usuarios'
import { SideBarMobile } from '../../components/SideBarMobile'
import { Inicio } from '../../components/Inicio/Inicio'

export function HomeAdmin() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardAdministrador>('Inicio')
  const sectionsDashboard: Record<TypeDashboardAdministrador, ReactNode> = {
    Inicio: <Inicio user='ADMINISTRADOR' />,
    Instituicao: <Instituicoes />,
    Usuarios: <Usuarios />,
  }

  return (
    <main className="bg-[#f5f7fa] flex justify-between gap-6 h-screen">
      <SideBarDashboard.root>
        <SideBarDashboard.logo />
        <SideBarDashboard.Links
          sectionSelecionada={selecionarSection}
          selecionarSection={(section) => setSelecionarSection(section as TypeDashboardAdministrador)}
          typeUser="ADMINISTRADOR"
        />
        <SideBarDashboard.botao />
      </SideBarDashboard.root>

      {/* SideBarMobile tela menores  */}

      <SideBarMobile.root>
        <SideBarMobile.links
          sectionSelecionada={selecionarSection}
          selecionarSection={(section) => setSelecionarSection(section as TypeDashboardAdministrador)}
          typeUser="ADMINISTRADOR"
        />
      </SideBarMobile.root>

      {/* Renderização da Section Selecionada  */}
      {sectionsDashboard[selecionarSection]}
    </main>
  )
}
