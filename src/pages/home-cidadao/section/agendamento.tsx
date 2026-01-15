import {
  ChevronDown,
  Menu,
  Plus,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/a'

import type { AssistenciaDTO } from '../../../types/type-assistencia'
import type { SolicitacaoDTO } from '../../../types/type-solicitacoes'

import { deleteSolicitacaoFunc } from '../../../utils/function-delete-agendamento'

import { CriarAgendamento } from '../modals/criarAgendamento'
import { DeletarAgendamento } from '../modals/deletarAgendamento'
import { VisualizarAgendamento } from '../modals/visualizarAgendamento'
import { VisualizarAgendamentoGlobal } from '../modals/visualizarAgendamentoGlobal'
import { AgendamentoCard } from '../components/cardAgendamento'
import { useInfiniteSolicitacoes } from '../../../hooks/useInfiniteSolicitacoes'
import { AgendamentoSkeleton } from '../components/agendamentoSkeleton'
import AOS from 'aos'


export function Agendamento(user: {
  data: any
  assistencias: AssistenciaDTO[]
  visibilidadeModalCriarAgendamento: boolean
  setVisibilidadeModalCriarAgendamento: React.Dispatch<React.SetStateAction<boolean>>
  assistenciaSelecionada: any
}) {
  const { visibilidadeModalCriarAgendamento, setVisibilidadeModalCriarAgendamento } = user

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [isAnimate, setIsAnimate] = useState(false)
  const [isAnimateSearch, setIsAnimateSearch] = useState(true)

  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null)
  const [solicitacaoDados, setSolicitacaoDados] = useState<SolicitacaoDTO>()

  const [openVisualizar, setOpenVisualizar] = useState(false)
  const [openVisualizarGlobal, setOpenVisualizarGlobal] = useState(false)
  const [openDeletar, setOpenDeletar] = useState(false)

  const {
    solicitacoes,
    loading,
    observe,
    prepend,
    remove,
    setScrollRoot
  } = useInfiniteSolicitacoes()



  const filteredAppointments = solicitacoes.filter((apt: SolicitacaoDTO) => {
    const matchesText = apt.assistencia?.unidade
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus ? apt.status === selectedStatus : true

    return matchesText && matchesStatus
  })

  const handleVisualizar = useCallback((item: any) => {
    setSolicitacaoDados(item)
    setOpenVisualizar(true)
    console.log("openVisualizar", openVisualizar)
  }, [])

   const handleVisualizarGlobal = useCallback((item: any) => {
    setSolicitacaoDados(item)
    setOpenVisualizarGlobal(true)
  }, [])

  const handleDelete = useCallback((id: any) => {
    setIdParaDeletar(id)
    setOpenDeletar(true)
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out-cubic'
    })
  }, [])

  return (
    <main className="main relative h-screen flex-col items-center overflow-y-auto px-4 max-lg:w-full max-lg:px-0">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={user.data} user="CIDADAO" />
      </HeaderDashboards.root>

      {/* HEADER */}
      <AnimatePresence>
        {(!isAnimateSearch || window.innerWidth > 1024) && (
          <motion.div initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`text-primary-800 font-outfit flex w-full flex-col max-md:space-y-1  md:justify-between ${isAnimateSearch ? 'max-md:hidden' : ''}`}
          >
            <div className={`text-primary-800 font-outfit flex w-full max-md:flex-col max-md:space-y-1 md:items-center md:justify-between`}>
              <h1 className="text-2xl font-medium max-md:text-xl">Meus Agendamentos</h1>
              <button
                className="bg-primary-800 hover:bg-primary-800/90 flex cursor-pointer items-center rounded-lg px-4 py-2 text-white shadow-md duration-500 hover:shadow-lg max-md:w-1/2 max-md:max-w-[170px] max-md:px-2 max-md:py-1 max-md:text-sm"
                onClick={() => setVisibilidadeModalCriarAgendamento(true)}
              >
                <Plus className="mr-2 size-5" />
                Novo Agendamento
              </button>
            </div>

            <div className="relative flex w-[80%] items-center text-center max-2xl:-translate-y-3 max-xl:w-4/5 max-xl:-translate-y-0 max-lg:w-full max-md:w-full mt-8">
              {/* Ícone Search */}
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
                  className={`text-primary-800 absolute right-1.5 top-3.5 size-5 transition-all duration-500 ${isAnimate ? 'rotate-180' : 'rotate-0'
                    }`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        
      {/* CARDS */}
      <div
        ref={setScrollRoot}
        className="max-md:min-h-2/5 mt-5 grid w-full grid-cols-3 gap-y-2 max-xl:grid-cols-2 max-md:flex max-md:h-[90%] max-md:flex-col max-md:space-y-4 overflow-y-auto max-lg:pb-32 md:gap-x-3 scrollbar-thin-personalizada">
        {filteredAppointments.length === 0 && !loading ? (
          solicitacoes.length === 0 ? (
            <div className="text-primary-800/60 col-span-3 mt-4 text-center">
              Você não possui agendamentos recentes
            </div>
          ) : (
            <div className="text-primary-800/60 col-span-3 mt-4 text-center">
              Nenhum agendamento encontrado para o filtro aplicado
            </div>
          )
        ) : (
          <AnimatePresence>
            {filteredAppointments.map((item: any) => (
              <AgendamentoCard
                key={item.id}
                item={item}
                onVisualizar={() => handleVisualizar(item)}
                onDelete={() => handleDelete(item.id)}
                onVisualizarGlobal={() => handleVisualizarGlobal(item)}
                
                animation={false}
              />
            ))}
          </AnimatePresence>
        )}

        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <AgendamentoSkeleton key={i} />
          ))
        }

        <div ref={observe} className="h-10" />

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
          prepend({ ...created, assistencia })
        }}
      />

      <DeletarAgendamento
        open={openDeletar}
        close={() => setOpenDeletar(false)}
        onDelete={() =>
          deleteSolicitacaoFunc(
            idParaDeletar,
            remove,
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
