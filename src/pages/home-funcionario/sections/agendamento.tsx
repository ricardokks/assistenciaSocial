import { useEffect, useState } from 'react'

import { getAssistencia } from '../../../api/assistencia/getAssistencia'
import { PegarInformacaoFuncionario } from '../../../api/user/pegarInformacaoFuncionario'
import { HeaderDashboards } from '../../../components/Header'
import type { AgendamentoDTO } from '../../../dto/Agendamento/AgendamentoDTO'
import type { IHomeProps } from '../../../types/interface-home-props'
import { CardAgendamento } from '../components/layout/card-agendamento'
import { SkeletonAgendamento } from '../components/skeleton/skeleton-agendamento'

export function Agendamento(data: IHomeProps) {
  // estados e estados utilizados
  const [idInstituicao, setIdInstituicao] = useState<string | null>(null)
  const [informacaoUsuario, setInformacaoUsuario] = useState()
  const [agendamentoss, setAgendamentoss] = useState<AgendamentoDTO[]>([])
  const [loading, setLoading] = useState(false)

  // Funções Chamadadoras da API do backend
  async function fetchIdInstituicao() {
    const response = await PegarInformacaoFuncionario()
    if (response && response.data && response.data.data) {
      {
        setIdInstituicao(response.data.data.assistenciaId)
      }
    }
  }

  async function fetchDadosInstituicao(id: string) {
    const response = await getAssistencia(id)
    setAgendamentoss(response.solicitacoes)

    return response.solicitacoes
  }

  useEffect(() => {
    fetchIdInstituicao()
  }, [])

  useEffect(() => {
    if (idInstituicao) {
      setLoading(true)

      fetchDadosInstituicao(idInstituicao ?? '')
    }
  }, [idInstituicao])

  useEffect(() => {
    async function fecthDadosUsuarios() {
      const dados = await getAssistencia()
      setInformacaoUsuario(dados)

      return dados
    }

    fecthDadosUsuarios()
  }, [])

  // funções de atualização de agendamentos localmente
  function updateLocalAgendamento(id: string, novosDados: Partial<AgendamentoDTO>) {
    setAgendamentoss((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...novosDados } : item))
    )
  }

  return (
    <main className="main overflow-y-auto">
      {/* Header da aplicação  */}

      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={data.data} user="PROFISSIONAL" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>
      {/* conteudo principal  */}

      {loading ? (
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-primary-800 font-outfit-bold text-[1.3rem]">Agendamentos</h1>
          </div>

          {/* renderização dos cards  */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-6">
            {agendamentoss?.map((card) => (
              <CardAgendamento key={card.id} dados={card} onUpdateLocal={updateLocalAgendamento} />
            ))}
          </div>
        </div>
      ) : (
        <SkeletonAgendamento />
      )}
    </main>
  )
}
