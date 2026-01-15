import { useEffect, useState, lazy, Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getAssistencias } from '../../api/assistencia/getAllAssistencia'
import { getUser } from '../../api/user/getUser'
import { SideBarDashboard } from '../../components/SideBar'
import { SideBarMobile } from '../../components/SideBarMobile'
import type { TypeDashboardCidadao } from '../../types/type-dashboard-cidadao'
import { logout } from '../../api/auth/logout'
import { Loading } from '../../components/loading'

// Lazy load das seções
const Inicio = lazy(() =>
  import('../../components/Inicio/Inicio').then((module) => ({ default: module.Inicio }))
)

const Agendamento = lazy(() =>
  import('./section/agendamento').then((module) => ({ default: module.Agendamento }))
)

const Servicos = lazy(() =>
  import('./section/servicos').then((module) => ({ default: module.Servicos }))
)

export function HomeCidadao() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
  const [user, setUser] = useState<any>(null)
  const [assistencias, setAssistencias] = useState<any>(null)
  const [visibilidadeModalCriarAgendamento, setVisibilidadeModalCriarAgendamento] = useState(false)
  const [assistenciaSelecionada, setAssistenciaSelecionada] = useState<any>(null)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      const dataUser = await getUser()
      setUser(dataUser)

      const dataAssistencias = await getAssistencias()
      setAssistencias(dataAssistencias)

      if (id === undefined) {
        await logout()
        navigate('/login')
      }
    }

    loadData()
  }, [])

  if (!user || !assistencias) return <Loading />

  return (
    <main className="flex h-screen w-full justify-between gap-6 bg-[#f5f7fa] max-md:flex-col">
      {/* Sidebar */}
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

      {/* Seção com animação básica de fade */}
        <Suspense fallback={ <div className="flex h-screen w-full items-center justify-center bg-[#f5f7fa]">
      <Loading />
    </div>}>
            {selecionarSection === 'Inicio' && <Inicio data={user} user="CIDADAO" />}

            {selecionarSection === 'ContatarAtendimento' && (
              <Agendamento
                assistencias={assistencias}
                assistenciaSelecionada={assistenciaSelecionada}
                data={user}
                setVisibilidadeModalCriarAgendamento={setVisibilidadeModalCriarAgendamento}
                visibilidadeModalCriarAgendamento={visibilidadeModalCriarAgendamento}
              />
            )}

            {selecionarSection === 'ProcurarServico' && (
              <Servicos
                assistencia={assistencias}
                user={user}
                onClick={(assistencia: any) => {
                  setAssistenciaSelecionada(assistencia)
                  setSelecionarSection('ContatarAtendimento')
                  setVisibilidadeModalCriarAgendamento(true)
                }}
              />
            )}
        </Suspense>
    </main>
  )
}
