import { useEffect, useState } from 'react'

import { toast } from 'sonner'

import { getAssistencias } from '../../api/assistencia/getAllAssistencia'
import { getUser } from '../../api/user/getUser'
import { Inicio } from '../../components/Inicio/Inicio'
import { SideBarDashboard } from '../../components/SideBar'
import { SideBarMobile } from '../../components/SideBarMobile'
import type { TypeDashboardCidadao } from '../../types/type-dashboard-cidadao'
import { Agendamento } from './section/agendamento'
import { Servicos } from './section/servicos'
import { getAssistenciaLocalityUser } from '../../api/assistencia/getAssistenciaLocalityUser'

export function HomeCidadao() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
  const [user, setUser] = useState(null)
  const [assistencias, setAssistencias] = useState(null)
  const [solicitacoes, setSolicitacoes] = useState([])
  const [visibilidadeModalCriarAgendamento, setVisibilidadeModalCriarAgendamento] = useState(false)
  const [assistenciaSelecionada, setAssistenciaSelecionada] = useState(null)

  async function getDataUser() {
    try {
      const data = await getUser()
      setUser(data)
      setSolicitacoes(data.solicitacoes)
    } catch (error: any) {
      const message = error?.response?.data?.message ?? 'Erro ao buscar dados do usuário'
      toast.error(message)
    }
  }

  async function getAssistenciasAll() {
    try {
      const data = await getAssistenciaLocalityUser()
      setAssistencias(data)
    } catch (error: any) {
      const message = error?.response?.data?.message ?? 'Erro ao buscar assistências'
      toast.error(message)
    }
  }

  useEffect(() => {
    getDataUser()
    getAssistenciasAll()
  }, [])

  if (!assistencias) return null
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

      {/* Renderização condicional CORRETA */}
      {selecionarSection === 'Inicio' && <Inicio data={user} user="CIDADAO" />}

      {selecionarSection === 'ContatarAtendimento' && (
        <Agendamento
          assistencias={assistencias}
          assistenciaSelecionada={assistenciaSelecionada}
          data={user}
          setSolicitacoes={setSolicitacoes}
          setVisibilidadeModalCriarAgendamento={setVisibilidadeModalCriarAgendamento}
          solicitacoes={solicitacoes}
          visibilidadeModalCriarAgendamento={visibilidadeModalCriarAgendamento}
        />
      )}

      {selecionarSection === 'ProcurarServico' && (
        <Servicos
          assistencia={assistencias}
          user={user}
          onClick={(assistencia) => {
            setAssistenciaSelecionada(assistencia)
            setSelecionarSection('ContatarAtendimento')
            setTimeout(() => {
              setVisibilidadeModalCriarAgendamento(true)
            }, 1000)
          }}
        />
      )}
    </main>
  )
}
