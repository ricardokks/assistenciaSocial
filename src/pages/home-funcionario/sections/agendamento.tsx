import { useEffect, useState } from 'react'

import { getAssistencia } from '../../../api/assistencia/getAssistencia'
import { PegarInformacaoFuncionario } from '../../../api/user/pegarInformacaoFuncionario'
import { HeaderDashboards } from '../../../components/Header'
import { Loading } from '../../../components/loading'
import type { AgendamentoDTO } from '../../../dto/Agendamento/AgendamentoDTO'
import { CardAgendamento } from '../components/layout/card-agendamento'
import { ModalCriarAgendamento } from '../components/modals/modal-criar-agendamento'
import { ModalEditarAgendamento } from '../components/modals/modal-editar-agendamento'

export function Agendamento() {
  // estados e estados utilizados
  const [abrirModalCriarAgendamento, setAbrirModalCriarAgendamento] = useState<boolean>(false)
  const [abrilModalEditarAgendamento, setAbrilModalEditarAgendamento] = useState<boolean>(false)
  const [idInstituicao, setIdInstituicao] = useState<string | null>(null)
  const [informacaoUsuario, setInformacaoUsuario] = useState()
  const [agendamentoss, setAgendamentoss] = useState<AgendamentoDTO[]>([])

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
    console.log('Estado', agendamentoss)
  }, [agendamentoss])

  useEffect(() => {
    if (idInstituicao) {
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

  // funções utilizados
  function handleAbrirModalCriarAgendamento() {
    setAbrirModalCriarAgendamento((prev) => !prev)
  }

  function handleAbrirModalEditarAgendamento() {
    setAbrilModalEditarAgendamento((prev) => !prev)
  }

  function updateLocalAgendamento(id: string, novosDados: Partial<AgendamentoDTO>) {
    setAgendamentoss((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...novosDados } : item))
    )
  }

  if (!idInstituicao) {
    return <Loading />
  }

  return (
    <main className="main overflow-y-auto">
      {/* Header da aplicação  */}

      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="PROFISSIONAL" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>
      {/* conteudo principal  */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-primary-800 font-outfit-bold text-[1.3rem]">Agendamentos</h1>
        </div>

        {/* renderização dos cards  */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {agendamentoss?.map((card) => (
            <CardAgendamento key={card.id} dados={card} onUpdateLocal={updateLocalAgendamento} />
          ))}
        </div>
      </div>

      {/* Modais utilizados no componente */}
      <ModalCriarAgendamento
        abrilModalAgendamento={abrirModalCriarAgendamento}
        handleAbrilModalAgendamento={handleAbrirModalCriarAgendamento}
      />

      <ModalEditarAgendamento
        abrirEditarAgendamento={abrilModalEditarAgendamento}
        handleAbrirModalEditarAgendamento={handleAbrirModalEditarAgendamento}
      />
    </main>
  )
}
