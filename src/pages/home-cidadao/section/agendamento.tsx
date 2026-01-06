import { ChevronDown, Menu, Plus, X } from 'lucide-react'
import { useState } from 'react'

import { toast } from 'sonner'

import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/a'
import { Loading } from '../../../components/loading'
import { ButtonInfo } from '../../../components/ui/buttonInfo'
import { ButtonStatus } from '../../../components/ui/buttonStatus'
import type { AssistenciaDTO } from '../../../types/type-assistencia'
import type { SolicitacaoDTO } from '../../../types/type-solicitacoes'
import { deleteSolicitacaoFunc } from '../../../utils/function-delete-agendamento'
import { CriarAgendamento } from '../modals/criarAgendamento'
import { DeletarAgendamento } from '../modals/deletarAgendamento'
import { VisualizarAgendamento } from '../modals/visualizarAgendamento'

export function Agendamento(user: {
  data: any
  assistencias: AssistenciaDTO[]
  setSolicitacoes: any
  solicitacoes: any
  visibilidadeModalCriarAgendamento: boolean
  setVisibilidadeModalCriarAgendamento: React.Dispatch<React.SetStateAction<boolean>>
  assistenciaSelecionada: any
}) {
  const { visibilidadeModalCriarAgendamento, setVisibilidadeModalCriarAgendamento } = user

  const { setSolicitacoes, solicitacoes } = user
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [isAnimate, setIsAnimate] = useState(false)
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null)
  const [isAnimateSearch, setIsAnimateSearch] = useState(true)

  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null)
  const [solicitacaoDados, setSolicitacaoDados] = useState<SolicitacaoDTO>()

  // Visibilidade modals
  const [visibilidadeModalDeletarAgendamento, setVisibilidadeModalDeletarAgendamento] =
    useState(false)

  const [visibilidadeModalVisualizarAgendamento, setVisibilidadeModalVisualizarAgendamento] =
    useState(false)

  const filteredAppointments = solicitacoes?.filter((apt: SolicitacaoDTO) => {
    const matchesText = apt?.assistencia?.unidade.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus ? apt.status === selectedStatus : true

    return matchesText && matchesStatus
  })

  function formatDate(dateString: Date) {
    const formatted = new Date(dateString).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    })

    return formatted
  }
  if (!solicitacoes) return <Loading />

  return (
    <main className="main relative h-screen flex-col items-center overflow-y-auto px-4 max-lg:w-full max-lg:px-0">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={user.data} user="CIDADAO" />
      </HeaderDashboards.root>

      {/* div do button Novo Agendamento */}
      <div
        className={`text-primary-800 font-outfit flex w-full max-md:flex-col max-md:space-y-1 md:items-center md:justify-between ${isAnimateSearch ? 'max-md:hidden' : ''}`}
      >
        <h1 className="text-2xl font-medium max-md:text-xl">Meus Agendamentos</h1>
        <button
          className="bg-primary-800 hover:bg-primary-800/90 flex cursor-pointer items-center rounded-lg px-4 py-2 text-white shadow-md duration-500 hover:shadow-lg max-md:w-1/2 max-md:max-w-[170px] max-md:px-2 max-md:py-1 max-md:text-sm"
          onClick={() => setVisibilidadeModalCriarAgendamento(true)}
        >
          <Plus className="mr-2 size-5" />
          Novo Agendamento
        </button>
      </div>

      {/* Search */}
      <div
        className={`relative flex w-[80%] items-center text-center max-2xl:-translate-y-3 max-xl:w-4/5 max-xl:-translate-y-0 max-lg:w-full max-md:w-full ${isAnimateSearch ? 'max-md:hidden' : ''}`}
      >
        {/* Icone search */}
        <IconeSearch className="absolute left-3 top-[1.25rem]" />
        <input
          className="font-satoshi border-primary-800 text-primary-800 placeholder:text-primary-800/65 placeholder:font-satoshi mt-3  size-full rounded-2xl border-2 px-2 py-1 pl-10 shadow shadow-black/10 outline-none outline-0 max-xl:pl-10 max-md:w-3/5"
          placeholder="Procure pelo nome..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="relative ml-3 mt-3 h-full w-1/4 max-md:w-2/5">
          <select
            className="text-primary-800 border-primary-800 font-outfit ml-1 size-full appearance-none rounded-2xl border-2  bg-transparent pl-3 text-[16px] shadow-md outline-none"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            onClick={() => setIsAnimate((prev) => !prev)}
            onMouseDown={() => setIsAnimate((prev) => !prev)}
            onMouseLeave={() => setIsAnimate(false)}
            onMouseUp={() => setIsAnimate(false)}
          >
            <option value="">Filtrar por...</option>
            <option value="PENDENTE">Pendente</option>
            <option value="CONCLUIDO">Aprovado</option>
            <option value="RECUSADO">Recusado</option>
            <option value="ANALISE">Análise</option>
          </select>

          <ChevronDown
            strokeWidth={3}
            className={`text-primary-800 absolute right-1.5 top-3.5 size-5 transition-all duration-500 ${
              isAnimate ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </div>

      <div className="max-md:min-h-2/5 mt-5 grid w-full grid-cols-3 gap-y-2 max-xl:grid-cols-2 max-md:flex max-md:h-[90%] max-md:flex-col max-md:space-y-4 max-md:overflow-y-auto max-md:pb-32 md:gap-x-3">
        {filteredAppointments.length === 0 ? (
          <div className="text-primary-800/60 col-span-3 mt-4 text-center max-md:col-span-1">
            Você não possui agendamentos recentes
          </div>
        ) : (
          filteredAppointments.map((item: SolicitacaoDTO) => (
            <div
              key={item.id}
              className={`animate-scale-in flex min-h-[200px] w-full flex-col justify-between rounded-2xl bg-white p-4
    shadow-lg transition-all duration-700 max-md:max-h-[200px]
    ${item.id === lastCreatedId ? 'animate-scale-in' : ''}
  `}
            >
              {/* Foto, nome, data solicitacao */}
              <div className="flex w-full space-x-5">
                <img className="size-12" src={item.assistencia.icone} />
                <div className="flex flex-col">
                  <span className="font-outfit-bold text-primary-800 text-lg">
                    {item.assistencia?.unidade}
                  </span>
                  <span className="font-outfit text-primary-800/75 text-sm">
                    Data de solicitacao: {formatDate(item.dataCriacao)}
                  </span>
                </div>
              </div>

              <div className="flex max-h-20 min-h-20 w-full">
                {/* text Servico solicitado e Status de agendamento */}
                <div className="mt-5 flex w-full flex-col">
                  <span className="font-outfit text-primary-800 text-[14px]">
                    Serviço solicitado
                  </span>
                  <span className="font-satoshi text-primary-800 text-[12px] font-medium">
                    {item?.assistencia?.servicos?.find((svc) => svc.id === item.servicoId)?.nome}
                  </span>
                </div>

                {/* serviço e status*/}
                <div className="mt-5 flex w-full flex-col">
                  <span className="font-outfit text-primary-800 text-[14px]">
                    Status do agendamento
                  </span>
                  <ButtonStatus status={item.status} />
                </div>
              </div>

              {/* button */}
              <ButtonInfo
                status={item.status}
                onClickAguardandoAnalise={() =>
                  toast.info('Análise do seu agendamento está sendo realizada')
                }
                onClickDelete={() => {
                  setIdParaDeletar(item.id)
                  setVisibilidadeModalDeletarAgendamento(true)
                }}
                onClickRecusado={() =>
                  toast.error(
                    `${item.observacoesFuncionario ? `Após uma análise, o seu agendamento foi recusado. Observação do funcionário: ${item.observacoesFuncionario}` : 'Após uma análise, o seu agendamento foi recusado'} `
                  )
                }
                onClickVisualizarInfo={() => {
                  setSolicitacaoDados(item)
                  setVisibilidadeModalVisualizarAgendamento((prev) => !prev)
                }}
              />
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      <CriarAgendamento
        assistencias={user.assistencias}
        assistenciaSelecionada={user.assistenciaSelecionada}
        close={() => setVisibilidadeModalCriarAgendamento((p) => !p)}
        open={visibilidadeModalCriarAgendamento}
        solicitacoes={solicitacoes}
        create={(response) => {
          const created = response.data
          const { data } = user.assistencias

          const assistencia = data.find((a: any) => a.id === created.unidadeId)

          const novoAgendamento = {
            ...created,
            assistencia: assistencia ?? null,
          }

          setLastCreatedId(created.id)
          setSolicitacoes((prev: any) => [...prev, novoAgendamento])
        }}
      />

      <DeletarAgendamento
        close={() => setVisibilidadeModalDeletarAgendamento((prev) => !prev)}
        open={visibilidadeModalDeletarAgendamento}
        onDelete={() =>
          deleteSolicitacaoFunc(
            idParaDeletar,
            setSolicitacoes,
            setVisibilidadeModalDeletarAgendamento
          )
        }
      />

      <VisualizarAgendamento
        close={() => setVisibilidadeModalVisualizarAgendamento((prev) => !prev)}
        open={visibilidadeModalVisualizarAgendamento}
        solicitacao={solicitacaoDados}
        user={user.data}
      />

      <Menu
        className={`text-primary-800 absolute right-7 top-5 size-8 cursor-pointer lg:hidden  `}
        strokeWidth={3}
        onClick={() => setIsAnimateSearch((prev) => !prev)}
      />
    </main>
  )
}
