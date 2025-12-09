import { useEffect, useState } from 'react'

import { getAssistencia } from '../../api/assistencia/getAssistencia'
import { PegarInformacaoFuncionario } from '../../api/user/pegarInformacaoFuncionario'
import { CardInicioAgendamento } from './components/cardInicio'

export function InicioDados() {
  const [idUsuario, setIdUsuario] = useState('')
  const [agendamento, setAgendamento] = useState<{ solicitacoes: any; dataCriacao: any } | null>(
    null
  )
  const [stats, setStats] = useState({ diario: 0, semanal: 0, mensal: 0 })

  useEffect(() => {
    if (!agendamento) return

    const resultado = getAgendamentosStats(agendamento.solicitacoes)
    setStats(resultado)
  }, [agendamento])
  
  // Função para converter string -> Date
  function parseDate(dateString: string) {
    return new Date(dateString)
  }

  function getAgendamentosStats(solicitacoes: any[]) {
    const hoje = new Date()

    const inicioDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
    const inicioDaSemana = new Date(hoje)
    inicioDaSemana.setDate(hoje.getDate() - hoje.getDay() + 1)

    const inicioDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)

    let diario = 0
    let semanal = 0
    let mensal = 0

    solicitacoes.forEach((item) => {
      const data = parseDate(item.dataCriacao)

      if (data >= inicioDoDia) diario++
      if (data >= inicioDaSemana) semanal++
      if (data >= inicioDoMes) mensal++
    })

    return { diario, semanal, mensal }
  }

  // Pegar o ID do user
  useEffect(() => {
    async function fecthIdUsuario() {
      const response = await PegarInformacaoFuncionario()
      if (response && response.data && response.data.data) {
        setIdUsuario(response.data.data.assistenciaId)
      }
    }

    fecthIdUsuario()
  }, [])

  // Pegar dados da assistência
  useEffect(() => {
    async function FetchDadosAssistencia(id: string) {
      const response = await getAssistencia(id)

      const dados = {
        solicitacoes: response.solicitacoes,
        dataCriacao: response.solicitacoes.map((s: any) => s.dataCriacao),
      }

      setAgendamento(dados)
    }

    if (idUsuario) FetchDadosAssistencia(idUsuario)
  }, [idUsuario])

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
      <CardInicioAgendamento text="Total de agendamentos mensais" valorAgendamento={stats.mensal} />
      <CardInicioAgendamento
        text="Total de agendamentos semanais"
        valorAgendamento={stats.semanal}
      />
      <CardInicioAgendamento text="Total de agendamentos diários" valorAgendamento={stats.diario} />
    </div>
  )
}
