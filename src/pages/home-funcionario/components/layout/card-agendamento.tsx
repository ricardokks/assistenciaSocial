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

  const [dataAtendimento, setDataAtendimento] = useState('')
  const [horaAtendimento, setHoraAtendimento] = useState('')
  const [dadosInternos, setDadosInternos] = useState(props.dados)

  // 👉 Data mínima = hoje
  const hoje = new Date().toISOString().split('T')[0]

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

  const horarios = Array.from({ length: 21 }, (_, i) => {
    const totalMinutos = 7 * 60 + i * 30
    const hora = Math.floor(totalMinutos / 60)
    const minutos = totalMinutos % 60

    if (hora > 17) return null

    return `${String(hora).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`
  }).filter(Boolean) as string[]

  function handleAbrirInput(status: 'CONCLUIDO' | 'RECUSADO') {
    setStatusSelecionado(status)
    setOpenObservacao(true)
    setDataAtendimento('')
    setHoraAtendimento('')
  }

  async function handleAtualizar() {
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

      // 🚫 Impede data anterior a hoje
      const dataSelecionada = new Date(`${dataAtendimento}T00:00:00`)
      const hojeSemHora = new Date()
      hojeSemHora.setHours(0, 0, 0, 0)

      if (dataSelecionada < hojeSemHora) {
        toast.error('Não é possível agendar para uma data anterior a hoje.')
        return
      }
    }

    try {
      let dataHoraISO: string | undefined

      if (statusSelecionado === 'CONCLUIDO') {
        dataHoraISO = new Date(`${dataAtendimento}T${horaAtendimento}:00`).toISOString()
      }

      await updateAgendamento(dadosInternos.id ?? '', {
        status: statusSelecionado,
        observacoesFuncionario: observacaoFuncionario,
        ...(dataHoraISO && { data: dataHoraISO }),
        ...(horaAtendimento && { hora: horaAtendimento }),
      })

      toast.success('Agendamento atualizado com sucesso!')

      props.onUpdateLocal(dadosInternos.id!, {
        status: statusSelecionado,
        observacoesFuncionario: observacaoFuncionario,
        ...(dataHoraISO && { data: dataHoraISO }),
        ...(horaAtendimento && { hora: horaAtendimento }),
      })

      setOpenObservacao(false)
      setObservacaoFuncionario('')
      setStatusSelecionado(null)
    } catch (error) {
      toast.error('Erro ao realizar ação.')
      console.error(error)
    }
  }

  console.log('dadosInternos', dadosInternos)
  return (
    <div className="border-primary-800 flex max-w-[350px] flex-col gap-4 rounded border-2 bg-white p-3">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4">
        <div className="bg-primary-800 rounded-full p-3">
          <IconeCalendario />
        </div>

        <h1 className="font-satoshi-black text-2xl">
          {dadosInternos.data ? formatarData(dadosInternos.data) : 'Data não definida'}
          {dadosInternos.hora && ` às ${dadosInternos.hora}`}
        </h1>
      </div>

      {/* Dados */}
      <div className="flex flex-col">
        <p className="text-primary-800 py-1">{dadosInternos.observacoes}</p>
        <p className="text-primary-800">Nome: {nomeCidadao}</p>
        <p className="text-primary-800">CPF: {cpfCidadao}</p>
        <p className="text-primary-800">
          Status: <span className="font-bold">{dadosInternos.status?.toLowerCase()}</span>
        </p>
        <p className="text-primary-800">Protocolo: {dadosInternos.protocolo}</p>
        <p className="text-primary-800">Serviço solicitado: {dadosInternos.servico?.nome}</p>
      </div>

      {openObservacao && (
        <div className="flex flex-col gap-2">
          {statusSelecionado === 'CONCLUIDO' && (
            <>
              <input
                type="date"
                min={hoje}
                className="rounded border p-2"
                value={dataAtendimento}
                onChange={(e) => setDataAtendimento(e.target.value)}
              />

              <select
                className="rounded border p-2"
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
            className="max-h-16 rounded border p-2"
            placeholder="Digite a observação..."
            value={observacaoFuncionario}
            onChange={(e) => setObservacaoFuncionario(e.target.value)}
          />

          <button className="rounded bg-green-500 p-2 text-white" onClick={handleAtualizar}>
            Enviar
          </button>

          <button
            className="rounded bg-gray-300 p-2"
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
            <>
              <button
                className="bg-primary-800 rounded p-2 text-white"
                onClick={() => handleAbrirInput('CONCLUIDO')}
              >
                Aceitar
              </button>

              <button
                className="rounded bg-red-500 p-2 text-white"
                onClick={() => handleAbrirInput('RECUSADO')}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
