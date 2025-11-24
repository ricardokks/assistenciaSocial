import { type ReactNode, useEffect, useState } from 'react'

import { Inicio } from '../../components/Inicio/Inicio'
import { SideBarDashboard } from '../../components/SideBar'
import { SideBarMobile } from '../../components/SideBarMobile'
import type { TypeDashboardCidadao } from '../../types/type-dashboard-cidadao'
import { Servicos } from './section/servicos'
import { Chat } from './section/chat'
import { getUser } from '../../api/user/getUser'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../api/auth/logout'
import { toast } from 'sonner'
import { Loading } from '../../components/loading'

export function HomeCidadao() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
  const [user, setUser] = useState(null)

  async function getDataUser(){
    const data = await getUser()
    setUser(data)
    return data
  }
  
  const sectionsDashboard: Record<TypeDashboardCidadao, ReactNode> = {
    Inicio: <Inicio user="CIDADAO" data={user}/>,
    ContatarAtendimento: <Chat data={user}/>,
    ProcurarServico: <Servicos user={user}/>,
  }

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      setLoading(true)
      await logout()
      toast.success('Você foi deslogado com sucesso')
      navigate('/')
    } catch {
      toast.error('Erro ao deslogar')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
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
        <SideBarDashboard.botao handleSair={async () => await handleLogout} />
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
