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

  // ✅ SEM VALOR DEFAULT
  const [dataAtendimento, setDataAtendimento] = useState('')
  const [horaAtendimento, setHoraAtendimento] = useState('')

  const [dadosInternos, setDadosInternos] = useState(props.dados)

  useEffect(() => {
    setDadosInternos(props.dados)
  }, [props.dados])

  useEffect(() => {
    async function FetchUsuario(id: string) {
      const response = await getUser(id)
      setNomeCidadao(response.nome)
      setCpfCidadao(response.cpf)
    }

    if (props.dados.usuarioId) FetchUsuario(props.dados.usuarioId)
  }, [props.dados.usuarioId])

  // ✅ GERA HORÁRIOS DE 30 EM 30 MIN (07:00 → 17:00)
  const horarios = Array.from({ length: 21 }, (_, i) => {
    const totalMinutos = 7 * 60 + i * 30
    const hora = Math.floor(totalMinutos / 60)
    const minutos = totalMinutos % 60

    if (hora > 17) return null

    return `${String(hora).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`
  }).filter(Boolean) as string[]

  const handleAbrirInput = (status: 'CONCLUIDO' | 'RECUSADO') => {
    setStatusSelecionado(status)
    setOpenObservacao(true)
    setDataAtendimento('')
    setHoraAtendimento('')
  }

  const handleAtualizar = async () => {
    if (!statusSelecionado) return

    if (!observacaoFuncionario.trim()) {
      toast.error('Digite uma observação antes de enviar.')
      return
    }

    if (statusSelecionado === 'CONCLUIDO') {
      if (!dataAtendimento || !horaAtendimento) {
        toast.error('Escolha a data e a hora do atendimento.')
        return
      }
    }

    try {
      let dataHoraISO: string | undefined

      if (statusSelecionado === 'CONCLUIDO') {
        dataHoraISO = new Date(
          `${dataAtendimento}T${horaAtendimento}:00`
        ).toISOString()
      }

      await updateAgendamento(dadosInternos.id ?? '', {
        status: statusSelecionado,
        observacoesFuncionario: observacaoFuncionario,
        ...(dataHoraISO && { data: dataHoraISO }),
        ...(horaAtendimento && { hora: horaAtendimento }),
      })

      toast.success('Agendamento atualizado com sucesso!')

      setDadosInternos((prev) => ({
        ...prev,
        status: statusSelecionado,
        observacoesFuncionario: observacaoFuncionario,
        ...(dataHoraISO && { data: dataHoraISO }),
        ...(horaAtendimento && { hora: horaAtendimento }),
      }))

      props.onUpdateLocal(dadosInternos.id!, {
        status: statusSelecionado,
        observacoesFuncionario: observacaoFuncionario,
        ...(dataHoraISO && { data: dataHoraISO }),
        ...(horaAtendimento && { hora: horaAtendimento }),
      })

      setOpenObservacao(false)
      setObservacaoFuncionario('')
      setStatusSelecionado(null)
    } catch (err) {
      console.error(err)
      toast.error('Erro ao realizar ação.')
    }
  }

  return (
    <div className="border-primary-800 h-full flex max-w-[350px] flex-col gap-4 rounded-[5.97px] border-2 bg-white p-3">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4">
        <div className="bg-primary-800 flex items-center justify-center rounded-full p-3">
          <IconeCalendario />
        </div>

        <h1 className="font-satoshi-black text-2xl">
          {dadosInternos.data
            ? formatarData(dadosInternos.data)
            : 'Data não definida'}
          {dadosInternos.hora && ` às ${dadosInternos.hora}`}
        </h1>
      </div>

      {/* Dados */}
      <div className="flex flex-col">
        <p className="text-primary-800 font-outfit py-1">
          {dadosInternos.observacoes}
        </p>
        <p className="text-primary-800 font-outfit">Nome: {nomeCidadao}</p>
        <p className="text-primary-800 font-outfit">CPF: {cpfCidadao}</p>
        <p className="text-primary-800 font-outfit">
          Status:{' '}
          <span className="font-bold">
            {dadosInternos.status?.toLowerCase()}
          </span>
        </p>
      </div>

      {openObservacao && (
        <div className="flex flex-col gap-2">
          {statusSelecionado === 'CONCLUIDO' && (
            <>
              <input
                type="date"
                className="w-full rounded border p-2"
                value={dataAtendimento}
                onChange={(e) => setDataAtendimento(e.target.value)}
              />

              <select
                className="w-full rounded border p-2"
                value={horaAtendimento}
                onChange={(e) => setHoraAtendimento(e.target.value)}
              >
                <option value="">Selecione a hora</option>
                {horarios.map((hora) => (
                  <option key={hora} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </>
          )}

          <textarea
            className="max-h-16 w-full rounded border p-2"
            placeholder="Digite a observação..."
            value={observacaoFuncionario}
            onChange={(e) => setObservacaoFuncionario(e.target.value)}
          />

          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={handleAtualizar}
          >
            Enviar
          </button>

          <button
            className="bg-gray-300 p-2 rounded"
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

      {!openObservacao && (
        <div className="flex flex-col gap-3">
          {dadosInternos.status !== 'CONCLUIDO' && (
            <button
              className="bg-primary-800 text-white p-2 rounded"
              onClick={() => handleAbrirInput('CONCLUIDO')}
            >
              Aceitar
            </button>
          )}

          {dadosInternos.status !== 'CONCLUIDO' && (
            <button
              className="bg-negative text-white p-2 rounded"
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
