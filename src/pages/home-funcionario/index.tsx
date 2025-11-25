import { type ReactNode, useEffect, useState } from 'react'

import { Inicio } from '../../components/Inicio/Inicio'
import { SideBarDashboard } from '../../components/SideBar'
import { SideBarMobile } from '../../components/SideBarMobile'
import type { TypeDashboardFuncionario } from '../../types/type-dashboard-funcionario'
import { Atendimento } from './sections/atendimento'
import { Dados } from './sections/dados'
import { Usuario } from './sections/usuario'
import { getUser } from '../../api/user/getUser'

export function HomeFuncionario() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardFuncionario>('Inicio')
  const [user, setUser] = useState(null)
  
    async function getDataUser() {
      const data = await getUser()
      setUser(data)
      return data
    }
    useEffect(() => {
      getDataUser()
    }, [])

  const sectionsDashboard: Record<TypeDashboardFuncionario, ReactNode> = {
    Inicio: <Inicio user="PROFISSIONAL" data={user}/>,
    Atendimento: <Atendimento />,
    Dados: <Dados />,
    Usuarios: <Usuario />,
  }

  return (
    <main className="flex h-screen w-full justify-between gap-6 bg-[#f5f7fa]">
      {/* SideBar tela maiores  */}
      <SideBarDashboard.root>
        <SideBarDashboard.logo />
        <SideBarDashboard.Links
          sectionSelecionada={selecionarSection}
          selecionarSection={(section) => setSelecionarSection(section as TypeDashboardFuncionario)}
          typeUser="PROFISSIONAL"
        />
        <SideBarDashboard.botao />
      </SideBarDashboard.root>

      {/* SideBarMobile tela menores  */}
      <SideBarMobile.root>
        <SideBarMobile.links
          sectionSelecionada={selecionarSection}
          selecionarSection={(section) => setSelecionarSection(section as TypeDashboardFuncionario)}
          typeUser="PROFISSIONAL"
        />
      </SideBarMobile.root>

      {/* Renderização da Section Selecionada  */}
      {sectionsDashboard[selecionarSection]}
    </main>
  )
}
