import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { getAssistencia } from '../../../api/assistencia/getAssistencia'
import { PegarInformacaoFuncionario } from '../../../api/user/pegarInformacaoFuncionario'
import { HeaderDashboards } from '../../../components/a'
import type { AgendamentoDTO } from '../../../dto/Agendamento/AgendamentoDTO'
import type { IHomeProps } from '../../../types/interface-home-props'
import { CardAgendamento } from '../components/layout/card-agendamento'
import { SkeletonAgendamento } from '../components/skeleton/skeleton-agendamento'
import { IconeSearch } from '../../../assets/Icons/icone-search'

export function Agendamento(data: IHomeProps) {
  const [idInstituicao, setIdInstituicao] = useState<string | null>(null)
  const [agendamentoss, setAgendamentoss] = useState<AgendamentoDTO[]>([])
  const [loading, setLoading] = useState(false)

  // filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('PENDENTE')
  const [searchBy, setSearchBy] = useState<'Nome' | 'CPF' | 'Data' | 'Servico' | 'Filtrar por...'>(
    'Filtrar por...'
  )

  const [isAnimate, setIsAnimate] = useState(false)

  async function fetchIdInstituicao() {
    const response = await PegarInformacaoFuncionario()
    if (response?.data?.data?.assistenciaId) {
      setIdInstituicao(response.data.data.assistenciaId)
    }
  }

  async function fetchDadosInstituicao(id: string) {
    const response = await getAssistencia(id)
    setAgendamentoss(response.solicitacoes)
  }

  useEffect(() => {
    fetchIdInstituicao()
  }, [])

  useEffect(() => {
    if (!idInstituicao) return
    setLoading(true)
    fetchDadosInstituicao(idInstituicao).finally(() => setLoading(false))
  }, [idInstituicao])

  function updateLocalAgendamento(id: string, novosDados: Partial<AgendamentoDTO>) {
    setAgendamentoss((prev) =>
      novosDados.status === 'RECUSADO'
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) =>
            item.id === id ? { ...item, ...novosDados } : item
          )
    )
  }

  const agendamentosFiltrados = agendamentoss.filter((card) => {
    if (selectedStatus && card.status !== selectedStatus) return false
    if (!searchTerm) return true

    const termo = searchTerm.toLowerCase()

    switch (searchBy) {
      case 'Nome':
        return card.usuario?.nome?.toLowerCase().includes(termo)
      case 'CPF':
        return card.usuario?.cpf?.includes(termo)
      case 'Servico':
        return card.servico?.nome?.toLowerCase().includes(termo)
      case 'Data':
        return card.data?.toLowerCase().includes(termo)
      default:
        return true
    }
  })

  useEffect(() => {
    setSearchTerm('')
  }, [searchBy])

  return (
    <main className="main overflow-y-auto">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={data.data} user="PROFISSIONAL" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      {loading ? (
        <SkeletonAgendamento />
      ) : (
        <>
          {/* 🔍 BUSCA + FILTROS (RESPONSIVO) */}
          <div className="mt-4 flex w-full flex-col gap-3 md:flex-row md:items-center">
            {/* INPUT */}
            <div className="relative w-full md:flex-1">
              <IconeSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                className="border-primary-800 text-primary-800 h-[48px] w-full rounded-2xl border-2 pl-10 pr-3 shadow outline-none"
                placeholder={`Buscar por ${searchBy}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* SELECT TIPO */}
            <div className="relative w-full md:w-[220px]">
              <select
                className="border-primary-800 text-primary-800 h-[48px] w-full appearance-none rounded-2xl border-2 bg-transparent pl-3 pr-8 shadow outline-none"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value as any)}
              >
                <option value="">Filtrar por...</option>
                <option value="Nome">Nome</option>
                <option value="CPF">CPF</option>
                <option value="Data">Data</option>
                <option value="Servico">Serviço</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-primary-800" />
            </div>

            {/* SELECT STATUS */}
            <div className="relative w-full md:w-[220px]">
              <select
                className="border-primary-800 text-primary-800 h-[48px] w-full appearance-none rounded-2xl border-2 bg-transparent pl-3 pr-8 shadow outline-none"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                onClick={() => setIsAnimate((prev) => !prev)}
                onMouseLeave={() => setIsAnimate(false)}
              >
                <option value="">Todos</option>
                <option value="PENDENTE">Pendente</option>
                <option value="CONCLUIDO">Concluido</option>
              </select>

              <ChevronDown
                className={`absolute right-3 top-1/2 size-5 -translate-y-1/2 text-primary-800 transition ${
                  isAnimate ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>

          {/* LISTA */}
          <div  className="
    mt-6
    grid
    grid-cols-1
    gap-6
    sm:grid-cols-2
    lg:grid-cols-3
    2xl:grid-cols-4
    max-md:mb-[10rem]
  ">
            {agendamentosFiltrados.length > 0 ? (
              agendamentosFiltrados.map((card) => (
                <CardAgendamento
                  key={card.id}
                  dados={card}
                  onUpdateLocal={updateLocalAgendamento}
                />
              ))
            ) : (
              <p className="text-primary-800 col-span-full text-center">
                Nenhum agendamento encontrado.
              </p>
            )}
          </div>
        </>
      )}
    </main>
  )
}
