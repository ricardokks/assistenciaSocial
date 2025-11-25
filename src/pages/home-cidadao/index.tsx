import { type ReactNode, useEffect, useState } from 'react'

import { getUser } from '../../api/user/getUser'
import { Inicio } from '../../components/Inicio/Inicio'
import { SideBarDashboard } from '../../components/SideBar'
import { SideBarMobile } from '../../components/SideBarMobile'
import type { TypeDashboardCidadao } from '../../types/type-dashboard-cidadao'
import { Servicos } from './section/servicos'
import { Agendamento } from './section/atendimento'

export function HomeCidadao() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
  const [user, setUser] = useState(null)

  // Visibilidade modals
  const [visibilidadeModalCriarAgendamento, setVisibilidadeModalCriarAgendamento] = useState(false)

  const [visibilidadeModalDeletarAgendamento, setVisibilidadeModalDeletarAgendamento] = useState(false)

  const [visibilidadeModalVisualizarAgendamento, setVisibilidadeModalVisualizarAgendamento] = useState(false)

  async function getDataUser() {
    const data = await getUser()
    setUser(data)
    return data
  }

  const sectionsDashboard: Record<TypeDashboardCidadao, ReactNode> = {
    Inicio: <Inicio user="CIDADAO" data={user} />,
    ContatarAtendimento: <Agendamento data={user} />,
    ProcurarServico: <Servicos user={user} />,
  }

  useEffect(() => {
    getDataUser()
  }, [])

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
