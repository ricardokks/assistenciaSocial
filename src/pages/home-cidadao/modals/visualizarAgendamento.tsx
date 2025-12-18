import { Download, X } from 'lucide-react'

import { Modal } from '../../../components/ui/modal'
import type { SolicitacaoDTO } from '../../../types/type-solicitacoes'
import { formatarData } from '../../../utils/formatarData'
import { gerarComprovante } from '../../../utils/gerarComprovante'

type IVisualizarAgendamento = {
  open: boolean
  close: () => void
  solicitacao?: SolicitacaoDTO
  user: any
}

export function VisualizarAgendamento({ open, close, solicitacao, user }: IVisualizarAgendamento) {
  if (!solicitacao || !solicitacao.data) return null

  console.log('solicitacao: ', solicitacao)
  return (
    <Modal close={close} open={open}>
      <div
        className={`relative flex h-[62%] max-h-[28rem] min-h-[430px]
        w-[40%] max-w-[600px] flex-col items-center rounded-xl bg-white transition-all duration-500
        max-md:z-50 max-md:h-4/5 max-md:w-[95%]
        ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="bg-primary-800 font-outfit flex w-full items-center justify-between rounded-t-xl px-4 py-3 text-2xl font-bold text-white">
          <h1>Comprovante de Confirmação</h1>
          <X
            className="size-8 cursor-pointer duration-300 hover:text-red-500"
            strokeWidth={3}
            onClick={close}
          />
        </div>

        {/* Conteúdo */}
        <div className="font-outfit text-primary-800 mt-5 flex flex-col items-center space-y-5 px-6 text-center">
          <div>
            <h2 className="text-lg font-bold">Informações importantes</h2>
            <p className="font-satoshi text-primary-800/80 mt-1 max-w-[420px] text-sm">
              Suas informações de agendamento estão descritas abaixo. Por favor, apresente este
              comprovante no dia do seu atendimento.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Informações do Agendamento</h2>

            <div className="mt-3 flex flex-col space-y-1 text-[15px]">
              <span className="font-bold">Data do Atendimento</span>
              <span className="font-satoshi">
                Dia {formatarData(solicitacao.data)} às {solicitacao.hora || 'Não informado'}
              </span>

              <span className="mt-3 font-bold">Observação</span>
              <span className="font-satoshi text-[14px]">
                {solicitacao.observacoesFuncionario || 'Não há observações do funcionário'}
              </span>
            </div>
          </div>
        </div>

        {/* Botão baixar comprovante */}
        <button
          className="bg-primary-800 font-outfit mt-5 flex cursor-pointer items-center gap-2 rounded-xl px-6 py-2 text-white shadow-md duration-300 hover:shadow-lg"
          onClick={() => {
            gerarComprovante({
              nome: user?.nome ?? 'Não informado',
              dataNascimento: user?.data_nascimento
                ? formatarData(user.data_nascimento)
                : 'Não informado',
              cpf: user?.cpf ?? 'Não informado',
              solicitacao,
              assistencia: solicitacao.assistencia?.unidade ?? 'Não informado',
              servico:
                solicitacao.assistencia?.servicos.find((s) => s.id === solicitacao.servicoId)
                  ?.nome ?? 'Não informado',
              hora: solicitacao.hora || 'Não informado',
              dataAtendimento: formatarData(solicitacao.data ?? 'Não informado'),
              dataCriacao: formatarData(new Date().toISOString()),
            })
          }}
        >
          <Download className="size-5" />
          Baixar comprovante
        </button>
      </div>
    </Modal>
  )
}
