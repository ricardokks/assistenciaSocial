import {
  ChevronDown,
  Menu,
  Plus,
  Accessibility,
} from 'lucide-react'
import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useAnimation,
} from 'framer-motion'
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
  const {
    visibilidadeModalCriarAgendamento,
    setVisibilidadeModalCriarAgendamento,
    solicitacoes,
    setSolicitacoes,
  } = user

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [isAnimate, setIsAnimate] = useState(false)
  const [isAnimateSearch, setIsAnimateSearch] = useState(true)

  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null)
  const [solicitacaoDados, setSolicitacaoDados] =
    useState<SolicitacaoDTO>()

  const [openVisualizar, setOpenVisualizar] = useState(false)
  const [openVisualizarGlobal, setOpenVisualizarGlobal] =
    useState(false)
  const [openDeletar, setOpenDeletar] = useState(false)

  if (!solicitacoes) return <Loading />

  const filteredAppointments = solicitacoes.filter(
    (apt: SolicitacaoDTO) => {
      const matchesText = apt.assistencia?.unidade
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesStatus = selectedStatus
        ? apt.status === selectedStatus
        : true

      return matchesText && matchesStatus
    }
  )

  function formatDate(dateString: Date) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    })
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
          className="bg-primary-800 hover:bg-primary-800/90 flex items-center rounded-lg px-4 py-2 text-white shadow-md duration-300"
          onClick={() =>
            setVisibilidadeModalCriarAgendamento(true)
          }
        >
          <Plus className="mr-2 size-5" />
          Novo Agendamento
        </button>
      </div>

      {/* SEARCH */}
      <div
        className={`relative flex w-[80%] items-center max-lg:w-full ${
          isAnimateSearch ? 'max-md:hidden' : ''
        }`}
      >
        <IconeSearch className="absolute left-3 top-[1.25rem]" />
        <input
          className="mt-3 w-full rounded-2xl border-2 border-primary-800 px-10 py-1"
          placeholder="Procure pelo nome..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="relative ml-3 mt-3 w-1/4">
          <select
            className="w-full appearance-none rounded-2xl border-2 border-primary-800 pl-3"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            onClick={() => setIsAnimate((p) => !p)}
          >
            <option value="">Filtrar por...</option>
            <option value="PENDENTE">Pendente</option>
            <option value="CONCLUIDO">Concluído</option>
            <option value="RECUSADO">Recusado</option>
          </select>

          <ChevronDown
            className={`absolute right-2 top-3 transition ${
              isAnimate ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* CARDS */}
      <div className="mt-5 grid w-full grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:flex max-md:flex-col">
        <AnimatePresence>
          {filteredAppointments.map((item: SolicitacaoDTO) => {
            const controls = useAnimation()
            const [showHint, setShowHint] = useState(false)

            return (
              <motion.div
                key={item.id}
                drag="x"
                dragElastic={0.15}
                dragConstraints={{ left: -150, right: 150 }}
                animate={controls}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 120) {
                    setSolicitacaoDados(item)
                    item.status === 'CONCLUIDO'
                      ? setOpenVisualizar(true)
                      : setOpenVisualizarGlobal(true)
                  } else if (info.offset.x < -120) {
                    if (item.status !== 'PENDENTE') {
                      toast.error(
                        'Não é possível excluir este agendamento'
                      )
                    } else {
                      setIdParaDeletar(item.id)
                      setOpenDeletar(true)
                    }
                  }

                  controls.start({
                    x: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    },
                  })
                }}
                className="relative rounded-2xl bg-white p-4 shadow-lg"
              >
                <Accessibility
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowHint((p) => !p)}
                />

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute right-3 top-10 rounded-xl bg-neutral-800 px-3 py-2 text-xs text-white"
                    >
                      Arraste → para visualizar<br />
                      Arraste ← para excluir
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-3">
                  <img src={item.assistencia.icone} className="size-12" />
                  <div>
                    <p className="font-bold">
                      {item.assistencia.unidade}
                    </p>
                    <p className="text-sm">
                      {formatDate(item.dataCriacao)}
                    </p>
                  </div>
                </div>

                <ButtonStatus status={item.status} />

                <ButtonInfo
                  status={item.status}
                  onClickDelete={() => {
                    setIdParaDeletar(item.id)
                    setOpenDeletar(true)
                  }}
                  onClickRecusado={() =>
                    toast.error(
                      item.observacoesFuncionario ??
                        'Agendamento recusado'
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
        className="absolute right-7 top-5 cursor-pointer lg:hidden"
        onClick={() => setIsAnimateSearch((p) => !p)}
      />
    </main>
  )
}
