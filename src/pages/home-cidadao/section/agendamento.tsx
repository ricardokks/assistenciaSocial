import {
  ChevronDown,
  Menu,
  Plus,
  Accessibility,
  X,
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
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus ? apt.status === selectedStatus : true

    return matchesText && matchesStatus
  })

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

        <div className="flex items-center gap-3">
          <Accessibility className="size-6 text-primary-800" />

          <button
            className="bg-primary-800 flex items-center rounded-lg px-4 py-2 text-white shadow-md duration-300 hover:bg-primary-800/90"
            onClick={() => setVisibilidadeModalCriarAgendamento(true)}
          >
            <Plus className="mr-2 size-5" />
            Novo Agendamento
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div
        className={`relative flex w-[80%] items-center text-center
        max-xl:w-4/5 max-lg:w-full max-md:w-full
        ${isAnimateSearch ? 'max-md:hidden' : ''}`}
      >
        <IconeSearch className="absolute left-3 top-[1.25rem]" />

        <input
          className="border-primary-800 text-primary-800 mt-3 w-full rounded-2xl border-2 px-2 py-1 pl-10 shadow outline-none"
          placeholder="Procure pelo nome..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="relative ml-3 mt-3 w-1/4 max-md:w-2/5">
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
      <div className="mt-5 grid w-full grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:flex max-md:flex-col max-md:pb-32">
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
                  // 👉 DIREITA
                  if (info.offset.x > 120) {
                    await controls.start({
                      x: 300,
                      opacity: 0,
                      transition: { duration: 0.3 },
                    })

                    setSolicitacaoDados(item)

                    if (item.status === 'CONCLUIDO') {
                      setOpenVisualizar(true)
                    } else {
                      setOpenVisualizarGlobal(true)
                    }

                    controls.set({ x: 0, opacity: 1 })
                    return
                  }

                  // 👈 ESQUERDA
                  if (info.offset.x < -120) {
                    if (item.status !== 'PENDENTE') {
                      toast.info(
                        `Não é possível excluir um agendamento ${item.status.toLowerCase()}`
                      )

                      controls.start({
                        x: 0,
                        transition: { type: 'spring', stiffness: 300 },
                      })
                      return
                    }

                    await controls.start({
                      x: -300,
                      opacity: 0,
                      transition: { duration: 0.3 },
                    })

                    setIdParaDeletar(item.id)
                    setOpenDeletar(true)

                    controls.set({ x: 0, opacity: 1 })
                    return
                  }

                  // Volta
                  controls.start({
                    x: 0,
                    transition: { type: 'spring', stiffness: 300 },
                  })
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[200px] flex-col justify-between rounded-2xl bg-white p-4 shadow-lg"
              >
                <div className="flex gap-4">
                  <img className="size-12" src={item.assistencia.icone} />
                  <div>
                    <span className="text-lg font-bold">
                      {item.assistencia.unidade}
                    </span>
                    <p className="text-sm opacity-70">
                      Data: {formatDate(item.dataCriacao)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <span className="text-sm">Serviço</span>
                    <p className="text-xs font-medium">
                      {
                        item.assistencia.servicos.find(
                          (s) => s.id === item.servicoId
                        )?.nome
                      }
                    </p>
                  </div>

                  <ButtonStatus status={item.status} />
                </div>

                <ButtonInfo
                  status={item.status}
                  onClickDelete={() => {
                    if (item.status !== 'PENDENTE') {
                      toast.info('Só é possível excluir se estiver pendente')
                      return
                    }
                    setIdParaDeletar(item.id)
                    setOpenDeletar(true)
                  }}
                  onClickRecusado={() =>
                    toast.error(
                      item.observacoesFuncionario ??
                        'Seu agendamento foi recusado'
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

      {/* BOTÃO MOBILE */}
      <button
        className="absolute right-7 top-5 z-50 lg:hidden"
        onClick={() => setIsAnimateSearch((p) => !p)}
      >
        {isAnimateSearch ? (
          <Menu className="size-8" />
        ) : (
          <X className="size-8 rotate-90" />
        )}
      </button>
    </main>
  )
}
