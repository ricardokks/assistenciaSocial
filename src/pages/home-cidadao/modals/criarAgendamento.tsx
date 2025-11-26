import { ChevronDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createSolicitacoes } from '../../../api/solicitacoes/createSolicitacoes'
import { Loading } from '../../../components/loading'
import { Modal } from '../../../components/ui/modal'
import { solicitacaoSchema, type solicitacaoSchemaDTO } from '../../../schemas/solicitacaoSchema'
import type { AssistenciaDTO } from '../../../types/type-assistencia'

type ICriarAgendamento = {
  open: boolean
  close: () => void
  create: (data: any) => void
  assistencias: any
}

export function CriarAgendamento({ open, close, create, assistencias }: ICriarAgendamento) {
  const [isAnimate, setIsAnimate] = useState(false)
  const [isAnimate2, setIsAnimate2] = useState(false)
  const [assistencia, setAssistencia] = useState<AssistenciaDTO[]>(assistencias?.data ?? [])

  const { id } = useParams()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<solicitacaoSchemaDTO>({
    resolver: zodResolver(solicitacaoSchema),
    defaultValues: {
      status: 'PENDENTE',
      usuarioId: id,
    },
  })

  // O que foi selecionado no select de assistência
  const selectedAssistenciaId = watch('unidadeId')

  // Busca os serviços pertencentes à assistência
  const servicosFiltrados = Array.isArray(assistencia)
    ? assistencia.find((a) => a.id === selectedAssistenciaId)?.servicos || []
    : []

  const onSubmit = async (data: solicitacaoSchemaDTO) => {
    try {
      close()
      const response = await createSolicitacoes(data)
      create(response)
      toast.success('Agendamento criado com sucesso!')
    } catch {
      toast.error('Erro ao criar um agendamento')
    }
  }

  useEffect(() => {
    if (Array.isArray(assistencias?.data)) {
      setAssistencia(assistencias.data)
    } else {
      setAssistencia([])
    }
  }, [assistencias])

  if (!assistencia) {
    return ReactDOM.createPortal(<Loading />, document.body)
  }

  return (
    <Modal open={open} close={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-[40%] h-[62%] max-w-[600px] max-h-[450px] relative rounded-xl flex flex-col items-center transition-all duration-500 
          ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}
      >
        {/* Cabeçalho */}
        <div className="w-full bg-primary-800 py-2 font-outfit font-bold text-white flex items-center justify-between px-3 text-2xl rounded-t-xl">
          <h1>Novo Agendamento</h1>
          <X
            onClick={close}
            className="size-8 hover:text-red-500 duration-300 cursor-pointer"
            strokeWidth={3}
          />
        </div>

        {/* Inputs */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-6 mt-5 space-y-4">
          {/* Assistência */}
          <div className="flex flex-col w-full relative">
            <label className="text-primary-800 font-outfit text-[14px] mb-1">
              Selecione a Assistência
            </label>

            <select
              {...register('unidadeId')}
              onMouseDown={() => setIsAnimate((prev) => !prev)}
              onMouseLeave={() => setIsAnimate(false)}
              onMouseUp={() => setIsAnimate(false)}
              onClick={() => setIsAnimate((prev) => !prev)}
              className="w-full pl-2 py-2 border-1 border-primary-800 rounded-lg text-[14px] text-primary-800 outline-none appearance-none"
            >
              <option value="">Selecionar</option>
              {assistencia.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.unidade}
                </option>
              ))}
            </select>

            <ChevronDown
              className={`absolute right-1.5 top-9 size-5 transition-all duration-500 text-primary-800 ${
                isAnimate ? 'rotate-180' : 'rotate-0'
              }`}
              strokeWidth={3}
            />
          </div>

          {/* Serviço */}
          <div className="flex flex-col w-full relative">
            <label className="text-primary-800 font-outfit text-[14px] mb-1">
              Selecione o Serviço
            </label>

            <select
              {...register('servicoId')}
              disabled={servicosFiltrados.length === 0}
              onMouseDown={() => setIsAnimate2((prev) => !prev)}
              onMouseLeave={() => setIsAnimate2(false)}
              onMouseUp={() => setIsAnimate2(false)}
              onClick={() => setIsAnimate2((prev) => !prev)}
              className="w-full pl-2 py-2 border-1 border-primary-800 rounded-lg text-[14px] text-primary-800 outline-none appearance-none disabled:bg-gray-200"
            >
              <option value="">Selecionar serviço</option>

              {servicosFiltrados.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.nome}
                </option>
              ))}
            </select>

            <ChevronDown
              className={`absolute right-1.5 top-9 size-5 transition-all duration-500 text-primary-800 ${
                isAnimate2 ? 'rotate-180' : 'rotate-0'
              }`}
              strokeWidth={3}
            />

            {errors.servicoId && (
              <span className="text-red-500 text-xs mt-1">{errors.servicoId.message}</span>
            )}
          </div>

          {/* Observações */}
          <div className="flex flex-col w-full">
            <label className="text-primary-800 font-outfit text-[14px] mb-1">Observações</label>
            <textarea
              {...register('observacoes')}
              className="w-full px-3 py-2 min-h-[80px] border-1 border-primary-800 rounded-lg text-primary-800 outline-none resize-none"
              placeholder="Digite alguma observação..."
            ></textarea>
          </div>

          {/* Botão */}
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="w-2/4 bg-primary-800 text-white py-2 rounded-lg font-outfit hover:bg-primary-800/90 duration-300 shadow cursor-pointer font-bold"
            >
              Criar Agendamento
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
