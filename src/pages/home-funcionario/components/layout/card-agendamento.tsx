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
  const [statusSelecionado, setStatusSelecionado] =
    useState<'CONCLUIDO' | 'RECUSADO' | null>(null)

  // ✅ DATA E HORA PADRÃO
  const hoje = new Date().toISOString().split('T')[0]

  const [dataAtendimento, setDataAtendimento] = useState(hoje)
  const [horaAtendimento, setHoraAtendimento] = useState('07:00')

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

    try {
      await updateAgendamento(dadosInternos.id ?? '', {
        status: statusSelecionado,
        observacoesFuncionario,
        data: dataAtendimento, // ✅ STRING YYYY-MM-DD
        hora: horaAtendimento, // ✅ STRING HH:mm
      })

      toast.success('Agendamento atualizado com sucesso!')

      // Atualiza estado local
      setDadosInternos((prev) => ({
        ...prev,
        status: statusSelecionado,
        observacoesFuncionario,
        data: dataAtendimento,
        hora: horaAtendimento,
      }))

      // Atualiza estado do pai
      props.onUpdateLocal(dadosInternos.id!, {
        status: statusSelecionado,
        observacoesFuncionario,
        data: dataAtendimento,
        hora: horaAtendimento,
      })

      // Limpa campos
      setOpenObservacao(false)
      setObservacaoFuncionario('')
      setStatusSelecionado(null)
    } catch (err) {
      console.error(err)
      toast.error('Erro ao realizar ação.')
    }
  }

  return (
    <div className="border-primary-800 h-full flex max-w-[350px] flex-col justify-start gap-4 rounded-[5.97px] border-2 bg-white p-3">
      {/* Calendário */}
      <div className="flex items-center justify-start gap-4">
        <div className="bg-primary-800 flex items-center justify-center rounded-full p-3">
          <IconeCalendario />
        </div>
        <h1 className="font-satoshi-black text-2xl">
          {dadosInternos.data ? formatarData(dadosInternos.data) : 'Defina uma data'}
          {dadosInternos.hora && ` às ${dadosInternos.hora}`}
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

      {/* Observação + Data + Hora */}
      {openObservacao && (
        <div className="flex flex-col gap-2">
          {statusSelecionado === 'CONCLUIDO' && (
            <div className="flex flex-col gap-2">
              <p className="text-primary-800 font-outfit">
                Escolha abaixo a data do atendimento:
              </p>

              {/* DATA */}
              <input
                className="w-full rounded border border-gray-300 p-2"
                type="date"
                value={dataAtendimento}
                onChange={(e) => setDataAtendimento(e.target.value)}
              />

              {/* HORA */}
              <select
                className="w-full rounded border border-gray-300 p-2"
                value={horaAtendimento}
                onChange={(e) => setHoraAtendimento(e.target.value)}
              >
                <option value="">Selecione a hora</option>
                {Array.from({ length: 11 }, (_, i) => 7 + i).map((h) => {
                  const hora = String(h).padStart(2, '0') + ':00'
                  return (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  )
                })}
              </select>
            </div>
          )}

          {/* OBSERVAÇÃO */}
          <textarea
            className="max-h-16 w-full rounded border border-gray-300 p-2"
            placeholder="Digite sua observação..."
            value={observacaoFuncionario}
            onChange={(e) => setObservacaoFuncionario(e.target.value)}
          />

          {/* BOTÃO ENVIAR */}
          <button
            className="w-full cursor-pointer rounded-[5.97px] bg-green-500 p-2 text-white hover:bg-green-600"
            onClick={handleAtualizar}
          >
            Enviar
          </button>

          {/* BOTÃO CANCELAR */}
          <button
            className="w-full cursor-pointer rounded-[5.97px] bg-gray-300 p-2 text-black hover:bg-gray-400"
            onClick={() => {
              setOpenObservacao(false)
              setObservacaoFuncionario('')
              setStatusSelecionado(null)
            }}
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
              className="hover:bg-primary-800/95 bg-primary-800 w-full cursor-pointer rounded-[5.97px] p-2 text-white"
              onClick={() => handleAbrirInput('CONCLUIDO')}
            >
              Aceitar
            </button>
          )}

          {dadosInternos.status !== 'CONCLUIDO' && (
            <button
              className="hover:bg-negative/95 bg-negative w-full cursor-pointer rounded-[5.97px] p-2 text-white"
              onClick={() => handleAbrirInput('RECUSADO')}
            >
              Cancelar
            </button>
          )}
        </div>
      )}
    </div>
  )
}
