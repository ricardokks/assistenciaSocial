import {
  ChevronDown,
  Menu,
  Plus,
  X,
  Accessibility,
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
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
import { VisualizarAgendamentoGlobal } from '../modals/visualizarAgendamentoGlobal'

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
  const [selectedStatus, setSelectedStatus] = useState('')
  const [isAnimate, setIsAnimate] = useState(false)
  const [isAnimateSearch, setIsAnimateSearch] = useState(true)

  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null)
  const [solicitacaoDados, setSolicitacaoDados] = useState<SolicitacaoDTO>()

  const [openVisualizar, setOpenVisualizar] = useState(false)
  const [openVisualizarGlobal, setOpenVisualizarGlobal] = useState(false)
  const [openDeletar, setOpenDeletar] = useState(false)

  if (!solicitacoes) return <Loading />

  const filteredAppointments = solicitacoes.filter((apt: SolicitacaoDTO) => {
    const matchesText = apt.assistencia?.unidade
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus ? apt.status === selectedStatus : true

    return matchesText && matchesStatus
  })

  function formatDate(dateString: Date) {
    return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }

  return (
    <main className="main relative h-screen flex-col items-center overflow-y-auto px-4 max-lg:w-full max-lg:px-0">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={user.data} user="CIDADAO" />
      </HeaderDashboards.root>

      {/* HEADER */}
      <div
        className={`text-primary-800 font-outfit flex w-full max-md:flex-col max-md:space-y-1 md:items-center md:justify-between ${
          isAnimateSearch ? 'max-md:hidden' : ''
        }`}
      >
        <h1 className="text-2xl font-medium max-md:text-xl">
          Meus Agendamentos
        </h1>

        <button
          className="bg-primary-800 hover:bg-primary-800/90 flex items-center rounded-lg px-4 py-2 text-white shadow-md duration-500 hover:shadow-lg"
          onClick={() => setVisibilidadeModalCriarAgendamento(true)}
        >
          <Plus className="mr-2 size-5" />
          Novo Agendamento
        </button>
      </div>

      {/* SEARCH */}
      <div
        className={`relative flex w-[80%] items-center text-center max-xl:w-4/5 max-lg:w-full max-md:w-full ${
          isAnimateSearch ? 'max-md:hidden' : ''
        }`}
      >
        <IconeSearch className="absolute left-3 top-[1.25rem]" />

        <input
          className="font-satoshi border-primary-800 text-primary-800 mt-3 size-full rounded-2xl border-2 px-2 py-1 pl-10 shadow outline-none"
          placeholder="Procure pelo nome..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="relative ml-3 mt-3 h-full w-1/4 max-md:w-2/5">
          <select
            className="border-primary-800 text-primary-800 size-full appearance-none rounded-2xl border-2 bg-transparent pl-3 shadow outline-none"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            onMouseDown={() => setIsAnimate(true)}
            onMouseUp={() => setIsAnimate(false)}
          >
            <option value="">Filtrar por...</option>
            <option value="PENDENTE">Pendente</option>
            <option value="CONCLUIDO">Aprovado</option>
            <option value="RECUSADO">Recusado</option>
          </select>

          <ChevronDown
            strokeWidth={3}
            className={`absolute right-2 top-3 size-5 transition ${
              isAnimate ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* CARDS */}
      <div className="max-md:min-h-2/5 mt-5 grid w-full grid-cols-3 gap-y-2 max-xl:grid-cols-2 max-md:flex max-md:h-[90%] max-md:flex-col max-md:space-y-4 max-md:overflow-y-auto max-md:pb-32 md:gap-x-3">
        <AnimatePresence>
          {filteredAppointments.map((item: SolicitacaoDTO) => {
            const controls = useAnimation()

            return (
              <motion.div
                key={item.id}
                drag="x"
                dragElastic={0.2}
                dragConstraints={{ left: 0, right: 0 }}
                animate={controls}
                onDragEnd={async (_, info) => {
                  if (info.offset.x > 120) {
                    setSolicitacaoDados(item)
                    item.status === 'CONCLUIDO'
                      ? setOpenVisualizar(true)
                      : setOpenVisualizarGlobal(true)
                    return
                  }

                  if (info.offset.x < -120) {
                    if (item.status !== 'PENDENTE') {
                      toast.info('Só é possível excluir se estiver pendente')
                      controls.start({ x: 0 })
                      return
                    }

                    setIdParaDeletar(item.id)
                    setOpenDeletar(true)
                    return
                  }

                  controls.start({ x: 0 })
                }}
                className="relative animate-scale-in flex min-h-[200px] w-full flex-col justify-between rounded-2xl bg-white p-4 shadow-lg transition-all duration-700"
              >
                {/* ÍCONE ACESSIBILIDADE */}
                <Accessibility className="absolute right-3 top-3 size-5 text-primary-800" />

                {/* FOTO, NOME, DATA */}
                <div className="flex w-full space-x-5">
                  <img className="size-12" src={item.assistencia.icone} />
                  <div className="flex flex-col">
                    <span className="font-outfit-bold text-primary-800 text-lg">
                      {item.assistencia.unidade}
                    </span>
                    <span className="font-outfit text-primary-800/75 text-sm">
                      Data de solicitacao: {formatDate(item.dataCriacao)}
                    </span>
                  </div>
                </div>

                <div className="flex max-h-20 min-h-20 w-full">
                  <div className="mt-5 flex w-full flex-col">
                    <span className="font-outfit text-primary-800 text-[14px]">
                      Serviço solicitado
                    </span>
                    <span className="font-satoshi text-primary-800 text-[12px] font-medium">
                      {
                        item.assistencia.servicos.find(
                          (svc) => svc.id === item.servicoId
                        )?.nome
                      }
                    </span>
                  </div>

                  <div className="mt-5 flex w-full flex-col">
                    <span className="font-outfit text-primary-800 text-[14px]">
                      Status do agendamento
                    </span>
                    <ButtonStatus status={item.status} />
                  </div>
                </div>

                <ButtonInfo
                  status={item.status}
                  onClickDelete={() => {
                    setIdParaDeletar(item.id)
                    setOpenDeletar(true)
                  }}
                  onClickRecusado={() =>
                    toast.error(
                      item.observacoesFuncionario ??
                        'Após análise, seu agendamento foi recusado'
                    )
                  }
                  onClickVisualizarInfo={() => {
                    setSolicitacaoDados(item)
                    item.status === 'CONCLUIDO'
                      ? setOpenVisualizar(true)
                      : setOpenVisualizarGlobal(true)
                  }}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* MODAIS */}
      <CriarAgendamento
        assistencias={user.assistencias}
        assistenciaSelecionada={user.assistenciaSelecionada}
        open={visibilidadeModalCriarAgendamento}
        close={() => setVisibilidadeModalCriarAgendamento(false)}
        solicitacoes={solicitacoes}
        create={(response) => {
          const created = response.data
          const assistencia = user.assistencias.data.find(
            (a: any) => a.id === created.unidadeId
          )
          setSolicitacoes((prev: any) => [
            { ...created, assistencia },
            ...prev,
          ])
        }}
      />

      <DeletarAgendamento
        open={openDeletar}
        close={() => setOpenDeletar(false)}
        onDelete={() =>
          deleteSolicitacaoFunc(
            idParaDeletar,
            setSolicitacoes,
            setOpenDeletar
          )
        }
      />

      <VisualizarAgendamento
        open={openVisualizar}
        close={() => setOpenVisualizar(false)}
        solicitacao={solicitacaoDados}
        user={user.data}
      />

      <VisualizarAgendamentoGlobal
        open={openVisualizarGlobal}
        close={() => setOpenVisualizarGlobal(false)}
        solicitacao={solicitacaoDados}
        user={user.data}
      />

      <Menu
        className="text-primary-800 absolute right-7 top-5 size-8 cursor-pointer lg:hidden"
        strokeWidth={3}
        onClick={() => setIsAnimateSearch((p) => !p)}
      />
    </main>
  )
}
