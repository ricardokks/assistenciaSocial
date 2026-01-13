import {
  Accessibility,
  Menu,
  Plus,
} from 'lucide-react'
import { useRef, useState } from 'react'

import { toast } from 'sonner'

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
  solicitacoes: SolicitacaoDTO[]
  visibilidadeModalCriarAgendamento: boolean
  setVisibilidadeModalCriarAgendamento: React.Dispatch<React.SetStateAction<boolean>>
  assistenciaSelecionada: any
}) {
  const {
    solicitacoes,
    setSolicitacoes,
    visibilidadeModalCriarAgendamento,
    setVisibilidadeModalCriarAgendamento,
  } = user

  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null)

  const [solicitacaoDados, setSolicitacaoDados] =
    useState<SolicitacaoDTO>()

  const [modalVisualizarGlobal, setModalVisualizarGlobal] =
    useState(false)

  const [modalVisualizarConcluido, setModalVisualizarConcluido] =
    useState(false)

  const [modalDeletar, setModalDeletar] = useState(false)
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null)

  const [showAcessibilidade, setShowAcessibilidade] =
    useState<string | null>(null)

  const touchStartX = useRef<number | null>(null)

  if (!solicitacoes) return <Loading />

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent, item: SolicitacaoDTO) {
    if (!touchStartX.current) return

    const deltaX = e.changedTouches[0].clientX - touchStartX.current

    if (deltaX > 80) {
      setSolicitacaoDados(item)

      if (item.status === 'CONCLUIDO') {
        setModalVisualizarConcluido(true)
      } else {
        setModalVisualizarGlobal(true)
      }
    }

    if (deltaX < -80) {
      setIdParaDeletar(item.id)
      setModalDeletar(true)
    }

    touchStartX.current = null
  }

  return (
    <main className="relative h-screen overflow-y-auto px-4">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={user.data} user="CIDADAO" />
      </HeaderDashboards.root>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-primary-800">Meus Agendamentos</h1>

        <button
          onClick={() => setVisibilidadeModalCriarAgendamento(true)}
          className="flex items-center gap-2 rounded-lg bg-primary-800 px-4 py-2 text-white"
        >
          <Plus className="size-5" />
          Novo
        </button>
      </div>

      <div className="mt-5 space-y-4 pb-32">
        {solicitacoes.map((item) => (
          <div
            key={item.id}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(e, item)}
            className={`relative rounded-2xl bg-white p-4 shadow-lg
              ${item.id === lastCreatedId ? 'animate-scale-in' : ''}
            `}
          >
            {/* Acessibilidade */}
            <button
              className="absolute right-3 top-3 text-primary-800"
              onClick={() =>
                setShowAcessibilidade(
                  showAcessibilidade === item.id ? null : item.id,
                )
              }
            >
              <Accessibility />
            </button>

            {showAcessibilidade === item.id && (
              <div className="absolute right-3 top-12 rounded-xl bg-white p-3 text-sm shadow-xl">
                <p>Arraste para direita: visualizar</p>
                <p>Arraste para esquerda: excluir</p>
              </div>
            )}

            <div className="flex gap-4">
              <img
                src={item.assistencia.icone}
                className="size-12"
              />
              <div>
                <p className="text-lg text-primary-800">
                  {item.assistencia.unidade}
                </p>
                <p className="text-sm text-primary-800/70">
                  Criado em{' '}
                  {new Date(item.dataCriacao).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <div>
                <p className="text-sm">Serviço</p>
                <p className="text-xs font-medium">
                  {
                    item.assistencia.servicos.find(
                      (s) => s.id === item.servicoId,
                    )?.nome
                  }
                </p>
              </div>

              <div>
                <p className="text-sm">Status</p>
                <ButtonStatus status={item.status} />
              </div>
            </div>

            <ButtonInfo
              status={item.status}
              onClickAguardandoAnalise={() =>
                toast.info('Sua solicitação está pendente')
              }
              onClickVisualizarInfo={() => {
                setSolicitacaoDados(item)
                item.status === 'CONCLUIDO'
                  ? setModalVisualizarConcluido(true)
                  : setModalVisualizarGlobal(true)
              }}
              onClickDelete={() => {
                setIdParaDeletar(item.id)
                setModalDeletar(true)
              }}
              onClickRecusado={() =>
                toast.error(
                  item.observacoesFuncionario ?? 'Solicitação recusada',
                )
              }
            />
          </div>
        ))}
      </div>

      {/* MODAIS */}

      <CriarAgendamento
        assistencias={user.assistencias}
        assistenciaSelecionada={user.assistenciaSelecionada}
        close={() => setVisibilidadeModalCriarAgendamento((p) => !p)}
        open={visibilidadeModalCriarAgendamento}
        solicitacoes={solicitacoes}
        create={(response) => {
          const created = response.data
          const { data } = user.assistencias

          const assistencia = data.find(
            (a: any) => a.id === created.unidadeId,
          )

          const novoAgendamento = {
            ...created,
            assistencia: assistencia ?? null,
          }

          setLastCreatedId(created.id)
          setSolicitacoes((prev: any) => [
            novoAgendamento,
            ...prev,
          ])
        }}
      />

      <DeletarAgendamento
        open={modalDeletar}
        close={() => setModalDeletar(false)}
        onDelete={() =>
          deleteSolicitacaoFunc(
            idParaDeletar,
            setSolicitacoes,
            setModalDeletar,
          )
        }
      />

      <VisualizarAgendamento
        open={modalVisualizarConcluido}
        close={() => setModalVisualizarConcluido(false)}
        solicitacao={solicitacaoDados}
        user={user.data}
      />

      <VisualizarAgendamentoGlobal
        open={modalVisualizarGlobal}
        close={() => setModalVisualizarGlobal(false)}
        solicitacao={solicitacaoDados}
        user={user.data}
      />

      <button className="absolute right-5 top-5 lg:hidden">
        <Menu />
      </button>
    </main>
  )
}
