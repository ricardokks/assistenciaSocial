import { type ReactNode, useEffect, useState } from 'react'

import { getUser } from '../../api/user/getUser'
import { Inicio } from '../../components/Inicio/Inicio'
import { SideBarDashboard } from '../../components/SideBar'
import { SideBarMobile } from '../../components/SideBarMobile'
import type { TypeDashboardAdministrador } from '../../types/type-dashboard-administrador'
import { Instituicoes } from './sections/instituicoes'
import { Usuarios } from './sections/usuarios'

export function HomeAdmin() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardAdministrador>('Inicio')
  const [user, setUser] = useState(null)

  async function getDataUser() {
    const data = await getUser()
    setUser(data)
    return data
  }
  useEffect(() => {
    getDataUser()
  }, [])

  const sectionsDashboard: Record<TypeDashboardAdministrador, ReactNode> = {
    Inicio: <Inicio user="ADMINISTRADOR" data={user} />,
    Instituicao: <Instituicoes data={user} />,
    Usuarios: <Usuarios  data={user}/>,
  }

  return (
    <main className="flex h-screen justify-between gap-6 bg-[#f5f7fa]">
      <SideBarDashboard.root>
        <SideBarDashboard.logo />
        <SideBarDashboard.Links
          sectionSelecionada={selecionarSection}
          typeUser="ADMINISTRADOR"
          selecionarSection={(section) =>
            setSelecionarSection(section as TypeDashboardAdministrador)
          }
        />
        <SideBarDashboard.botao />
      </SideBarDashboard.root>

      {/* SideBarMobile tela menores  */}

      <SideBarMobile.root>
        <SideBarMobile.links
          sectionSelecionada={selecionarSection}
          typeUser="ADMINISTRADOR"
          selecionarSection={(section) =>
            setSelecionarSection(section as TypeDashboardAdministrador)
          }
        />
      </SideBarMobile.root>

      {/* Renderização da Section Selecionada  */}
      {sectionsDashboard[selecionarSection]}
    </main>
  )
}
