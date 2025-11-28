import { useEffect, useState } from 'react'

import { toast } from 'sonner'

import { updateAgendamento } from '../../../../api/agendamentos/updateAgendamento'
import { getUser } from '../../../../api/user/getUser'
import { IconeCalendario } from '../../../../assets/Icons/Icone-calendario'
import type { CardAgendamentoProps } from '../../../../types/interface-card-agendamento'
import { formatarData } from '../../../../utils/formatarData'

export function CardAgendamento(props: CardAgendamentoProps) {
  const [nomeCidadao, setNomeCidadao] = useState('')
  const [cpfCidadao, setCpfCidadao] = useState('')
  const [openObservacao, setOpenObservacao] = useState(false)
  const [observacaoFuncionario, setObservacaoFuncionario] = useState('')
  const [statusSelecionado, setStatusSelecionado] = useState<'CONCLUIDO' | 'RECUSADO' | null>(null)
  const [dataAtendimento, setDataAtendimento] = useState('') // input do usuário

  const [dadosInternos, setDadosInternos] = useState(props.dados)

  // Sincroniza props com estado interno
  useEffect(() => {
    setDadosInternos(props.dados)
  }, [props.dados])

  // Busca dados do usuário
  useEffect(() => {
    async function FetchUsuario(id: string) {
      const response = await getUser(id)
      setNomeCidadao(response.nome)
      setCpfCidadao(response.cpf)
    }
    if (props.dados.usuarioId) FetchUsuario(props.dados.usuarioId)
  }, [props.dados.usuarioId])

  const handleAbrirInput = (status: 'CONCLUIDO' | 'RECUSADO') => {
    setStatusSelecionado(status)
    setOpenObservacao(true)
  }

  const handleAtualizar = async () => {
    if (!statusSelecionado) return

    if (!observacaoFuncionario.trim()) {
      toast.error('Digite uma observação antes de enviar.')
      return
    }

    if (statusSelecionado === 'CONCLUIDO' && !dataAtendimento) {
      toast.error('Selecione uma data para o agendamento.')
      return
    }

    try {
      // Cria data ISO-8601 correta
      const dataISO = statusSelecionado === 'CONCLUIDO' ? new Date(dataAtendimento) : null

      await updateAgendamento(dadosInternos.id ?? '', {
        status: statusSelecionado,
        observacoesFuncionario: observacaoFuncionario,
        data: dataISO,
      })

      toast.success('Agendamento atualizado com sucesso!')

      // Atualiza estado local
      setDadosInternos((prev) => ({
        ...prev,
        status: statusSelecionado,
        observacoesFuncionario: observacaoFuncionario,
        data: dataISO,
      }))

      // Atualiza estado do pai
      props.onUpdateLocal(dadosInternos.id!, {
        status: statusSelecionado,
        observacoesFuncionario: observacaoFuncionario,
        data: dataISO,
      })

      // Limpa campos
      setOpenObservacao(false)
      setObservacaoFuncionario('')
      setStatusSelecionado(null)
      setDataAtendimento('')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao realizar ação.')
    }
  }

  return (
    <div className="border-primary-800 flex max-w-[350px] flex-col justify-start gap-4 rounded-[5.97px] border-2 bg-white p-3">
      {/* Calendário */}
      <div className="flex items-center justify-start gap-4">
        <div className="bg-primary-800 flex items-center justify-center rounded-full p-3">
          <IconeCalendario />
        </div>
        <h1 className="font-satoshi-black text-2xl">
          {dadosInternos.data ? formatarData(dadosInternos.data) : 'Defina uma data'}
        </h1>
      </div>

      {/* Dados do cidadão */}
      <div className="flex flex-col">
        <p className="text-primary-800 font-outfit py-1">{dadosInternos.observacoes}</p>
        <p className="text-primary-800 font-outfit">Nome: {nomeCidadao}</p>
        <p className="text-primary-800 font-outfit">CPF: {cpfCidadao}</p>
        <p className="text-primary-800 font-outfit">
          Status do Agendamento:{' '}
          <span className="font-bold">{dadosInternos.status?.toLowerCase()}</span>
        </p>
      </div>

      {/* Observação + Data */}
      {openObservacao && (
        <div className="flex flex-col gap-2">
          {statusSelecionado === 'CONCLUIDO' && (
            <div>
              <p className="text-primary-800 font-outfit">Escolha a baixo a data do atendimento:</p>
              <input
                type="date"
                className="border border-gray-300 rounded p-2 w-full"
                value={dataAtendimento}
                onChange={(e) => setDataAtendimento(e.target.value)}
              />
            </div>
          )}

          <textarea
            placeholder="Digite sua observação..."
            className="border border-gray-300 rounded max-h-16 p-2 w-full"
            value={observacaoFuncionario}
            onChange={(e) => setObservacaoFuncionario(e.target.value)}
          />

          <button
            onClick={handleAtualizar}
            className="hover:bg-green-600 bg-green-500 w-full cursor-pointer rounded-[5.97px] p-2 text-white"
          >
            Enviar
          </button>

          <button
            onClick={() => {
              setOpenObservacao(false)
              setObservacaoFuncionario('')
              setStatusSelecionado(null)
              setDataAtendimento('')
            }}
            className="hover:bg-gray-400 bg-gray-300 w-full cursor-pointer rounded-[5.97px] p-2 text-black"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Botões */}
      {!openObservacao && (
        <div className="font-satoshi flex flex-col gap-4">
          {dadosInternos.status !== 'CONCLUIDO' && (
            <button
              onClick={() => handleAbrirInput('CONCLUIDO')}
              className="hover:bg-primary-800/95 bg-primary-800 w-full cursor-pointer rounded-[5.97px] p-2 text-white"
            >
              Aceitar
            </button>
          )}

          {dadosInternos.status !== 'CONCLUIDO' && (
            <button
              onClick={() => handleAbrirInput('RECUSADO')}
              className="hover:bg-negative/95 bg-negative w-full cursor-pointer rounded-[5.97px] p-2 text-white"
            >
              Cancelar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
