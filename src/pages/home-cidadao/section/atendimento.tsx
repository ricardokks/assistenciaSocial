import { ChevronDown, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { toast } from 'sonner'

import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/header'
import { ButtonInfo } from '../../../components/ui/buttonInfo'
import { ButtonStatus } from '../../../components/ui/buttonStatus'
import type { AssistenciaDTO } from '../../../types/type-assistencia'
import type { SolicitacaoDTO } from '../../../types/type-solicitacoes'
import { deleteSolicitacaoFunc } from '../../../utils/function-delete-agendamento'
import { CriarAgendamento } from '../modals/criarAgendamento'
import { DeletarAgendamento } from '../modals/deletarAgendamento'
import { VisualizarAgendamento } from '../modals/visualizarAgendamento'

export function Agendamento(user: { data: any; assistencias: AssistenciaDTO[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [isAnimate, setIsAnimate] = useState(false)
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoDTO[]>([])
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);


  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null)
  const [solicitacaoDados, setSolicitacaoDados] = useState<SolicitacaoDTO>()

  // Visibilidade modals
  const [visibilidadeModalCriarAgendamento, setVisibilidadeModalCriarAgendamento] = useState(false)

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

  useEffect(() => {
    if (user.data?.solicitacoes) {
      setSolicitacoes(user.data.solicitacoes)
    }
  }, [user.data])

  
  return (
    <main className="main flex-col h-screen items-center overflow-y-auto px-4 max-lg:w-full max-lg:px-0">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={user.data} user="CIDADAO" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      {/* div do button Novo Agendamento */}
      <div className="w-full flex md:items-center md:justify-between text-primary-800 font-outfit max-md:flex-col max-md:space-y-1">
        <h1 className="font-medium text-2xl max-md:text-xl">Meus Agendamentos</h1>
        <button
          onClick={() => setVisibilidadeModalCriarAgendamento(true)}
          className="flex items-center bg-primary-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg duration-500 hover:bg-primary-800/90 cursor-pointer max-md:px-2 max-md:py-1 max-md:text-sm max-md:w-1/2 max-md:max-w-[170px]"
        >
          <Plus className="size-5 mr-2" />
          Novo Agendamento
        </button>
      </div>

      {/* Search */}
      <div className="relative flex w-[80%] max-xl:w-4/5 max-lg:w-full max-2xl:-translate-y-3 max-xl:-translate-y-0 items-center text-center max-md:w-full">
        {/* Icone search */}
        <IconeSearch className="absolute left-3 top-[1.25rem]" />
        <input
          className="font-satoshi border-primary-800 text-primary-800 placeholder:text-primary-800/65 placeholder:font-satoshi mt-3  size-full rounded-2xl border-2 px-2 py-1 pl-10 shadow shadow-black/10 outline-none outline-0 max-xl:pl-10 max-md:w-3/5"
          placeholder="Procure pelo nome..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="w-1/4 h-full mt-3 ml-3 relative max-md:w-2/5">
          <select
            onMouseDown={() => setIsAnimate((prev) => !prev)}
            onMouseLeave={() => setIsAnimate(false)}
            onMouseUp={() => setIsAnimate(false)}
            onClick={() => setIsAnimate((prev) => !prev)}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-primary-800 pl-3 appearance-none rounded-2xl text-[16px] border-primary-800 border-2 bg-transparent  outline-none shadow-md ml-1 h-full w-full font-outfit"
          >
            <option value="">Filtrar por...</option>
            <option value="PENDENTE">Pendente</option>
            <option value="CONCLUIDO">Aprovado</option>
            <option value="RECUSADO">Recusado</option>
            <option value="ANALISE">Análise</option>
          </select>

          <ChevronDown
            className={`absolute right-1.5 top-3.5 size-5 transition-all duration-500 text-primary-800 ${isAnimate ? 'rotate-180' : 'rotate-0'
              }`}
            strokeWidth={3}
          />
        </div>
      </div>

      <div className="w-full mt-5 grid grid-cols-3 md:gap-x-3 gap-y-2 max-md:grid-cols-1 max-md:overflow-y-auto ">
        {filteredAppointments.map((item: SolicitacaoDTO) => (
          <div
            key={item.id}
            className={`bg-white w-full flex flex-col rounded-2xl p-4 shadow-lg min-h-[170px] max-md:max-h-[200px]
    transition-all duration-700 animate-scale-in
    ${item.id === lastCreatedId ? 'animate-scale-in' : ''}
  `}
          >
            {/* Foto, nome, data solicitacao */}
            <div className="w-full flex space-x-5">
              <img src="/" className="w-12 h-12" />
              <div className="flex flex-col">
                <span className="font-outfit-bold text-lg text-primary-800">
                  {item.assistencia?.unidade}
                </span>
                <span className="font-outfit text-sm text-primary-800/75">
                  Data de solicitacao: {formatDate(item.dataCriacao)}
                </span>
              </div>
            </div>

            <div className="flex w-full">
              {/* text Servico solicitado e Status de agendamento */}
              <div className="w-full flex flex-col mt-5">
                <span className="font-outfit text-primary-800 text-[14px]">Serviço solicitado</span>
                <span className="font-satoshi font-medium text-primary-800 text-[12px]">
                  {item?.assistencia?.servicos?.find((svc) => svc.id === item.servicoId)?.nome}
                </span>
              </div>

              {/* serviço e status*/}
              <div className="w-full flex flex-col mt-5">
                <span className="font-outfit text-primary-800 text-[14px]">
                  Status do agendamento
                </span>
                <ButtonStatus status={item.status} />
              </div>
            </div>

            {/* button */}
            <div className="w-full flex justify-start mt-5">
              <ButtonInfo
                status={item.status}
                onClickDelete={() => {
                  setIdParaDeletar(item.id)
                  setVisibilidadeModalDeletarAgendamento(true)
                }}
                onClickAguardandoAnalise={() =>
                  toast.info('Análise do seu agendamento está sendo realizada')
                }
                onClickRecusado={() =>
                  toast.error('Após uma análise, o seu agendamento foi recusado')
                }
                onClickVisualizarInfo={() => {
                  setSolicitacaoDados(item)
                  setVisibilidadeModalVisualizarAgendamento((prev) => !prev)
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <CriarAgendamento
        open={visibilidadeModalCriarAgendamento}
        close={() => setVisibilidadeModalCriarAgendamento((p) => !p)}
        create={(response) => {
          const created = response.data
          const { data } = user.assistencias

          const assistencia = data.find(a => a.id === created.unidadeId)

          const novoAgendamento = {
            ...created,
            assistencia: assistencia ?? null,
          }

          setLastCreatedId(created.id)
          setSolicitacoes(prev => [...prev, novoAgendamento])
        }}

        assistencias={user.assistencias}
        solicitacoes={solicitacoes}
      />

      <DeletarAgendamento
        open={visibilidadeModalDeletarAgendamento}
        close={() => setVisibilidadeModalDeletarAgendamento((prev) => !prev)}
        onDelete={() =>
          deleteSolicitacaoFunc(
            idParaDeletar,
            setSolicitacoes,
            setVisibilidadeModalDeletarAgendamento
          )
        }
      />

      <VisualizarAgendamento
        open={visibilidadeModalVisualizarAgendamento}
        close={() => setVisibilidadeModalVisualizarAgendamento((prev) => !prev)}
        solicitacao={solicitacaoDados}
      />
    </main>
  )
}
