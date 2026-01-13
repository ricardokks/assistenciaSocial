import {
  CheckCircle,
  Clock,
  FileText,
  X,
  XCircle,
} from 'lucide-react'

import { Modal } from '../../../components/ui/modal'
import type { SolicitacaoDTO } from '../../../types/type-solicitacoes'
import { formatarData } from '../../../utils/formatarData'
import { ButtonStatus } from '../../../components/ui/buttonStatus'

type Props = {
  open: boolean
  close: () => void
  solicitacao?: SolicitacaoDTO
}

export function VisualizarAgendamentoGlobal({
  open,
  close,
  solicitacao,
}: Props) {
  if (!solicitacao) return null

  const servico = solicitacao.assistencia?.servicos?.find(
    (s) => s.id === solicitacao.servicoId,
  )

  return (
    <Modal open={open} close={close}>
      <div
        className={`
          relative flex h-[70%] max-h-[32rem] min-h-[440px]
          w-[45%] max-w-[620px] flex-col rounded-xl bg-white
          transition-all duration-500
          max-md:h-[90%] max-md:w-[95%]
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="bg-primary-800 flex w-full items-center justify-between rounded-t-xl px-4 py-3 text-xl font-bold text-white">
          <h1>Detalhes do Agendamento</h1>
          <X
            className="size-7 cursor-pointer duration-300 hover:text-red-400"
            strokeWidth={3}
            onClick={close}
          />
        </div>

        {/* CONTEÚDO */}
        <div className="text-primary-800 flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
          {/* INFO PRINCIPAL */}
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <FileText className="size-5" />
              Informações do Agendamento
            </h2>

            <p className="text-sm text-primary-800/70">
              Confira abaixo o estado atual da sua solicitação.
            </p>
          </div>

          {/* DADOS */}
          <div className="grid grid-cols-2 gap-4 text-sm max-md:grid-cols-1">
            <div>
              <span className="font-bold">Unidade</span>
              <p>{solicitacao.assistencia?.unidade}</p>
            </div>

            <div>
              <span className="font-bold">Serviço solicitado</span>
              <p>{servico?.nome ?? 'Não informado'}</p>
            </div>

            <div>
              <span className="font-bold">Data da solicitação</span>
              <p>{formatarData(solicitacao.dataCriacao)}</p>
            </div>

            <div>
              <span className="font-bold">Status atual</span>
              <div className="mt-1">
                <ButtonStatus status={solicitacao.status} />
              </div>
            </div>
          </div>

          {/* TIMELINE */}
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
              <Clock className="size-5" />
              Andamento da solicitação
            </h2>

            <div className="flex flex-col gap-3 text-sm">
              {/* Criada */}
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600 size-5" />
                <span>Solicitação criada</span>
              </div>

              {/* Pendente */}
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600 size-5" />
                <span>Pendente de análise</span>
              </div>

              {/* Resultado */}
              {solicitacao.status === 'RECUSADO' && (
                <div className="flex items-center gap-2">
                  <XCircle className="size-5 text-red-600" />
                  <span>Solicitação recusada</span>
                </div>
              )}

              {solicitacao.status === 'CONCLUIDO' && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-5 text-green-600" />
                  <span>Solicitação aprovada</span>
                </div>
              )}
            </div>
          </div>

          {/* OBSERVAÇÃO */}
          {solicitacao.observacoesFuncionario && (
            <div className="rounded-lg bg-gray-100 p-3 text-sm">
              <span className="font-bold">Observação do funcionário</span>
              <p className="mt-1 text-primary-800/80">
                {solicitacao.observacoesFuncionario}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
