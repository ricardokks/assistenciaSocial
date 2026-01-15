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
  solicitacoes: any[]
  assistenciaSelecionada: any
}

export function CriarAgendamento({
  open,
  close,
  create,
  assistencias,
  solicitacoes,
  assistenciaSelecionada,
}: ICriarAgendamento) {
  const [isAnimate, setIsAnimate] = useState(false)
  const [isAnimate2, setIsAnimate2] = useState(false)
  const [assistencia, setAssistencia] = useState<AssistenciaDTO[]>(assistencias?.data ?? [])

  const { id } = useParams()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
    // Verificar duplicidade
    const existe = solicitacoes?.some(
      (s) =>
        s.unidadeId === data.unidadeId && s.servicoId === data.servicoId && s.status === 'PENDENTE'
    )

    if (existe) {
      toast.error('Você já possui este serviço solicitado nessa assistência.')
      return
    }

     if (!data.unidadeId) {
    toast.error("Por favor, selecione uma assistência adequada")
    return
  }

    try {
      close()
      const response = await createSolicitacoes(data)
      toast.success('Agendamento criado com sucesso! Espere alguns segundos')
      create(response)
    } catch (error: any) {
      const messagem = error?.response?.data?.message ?? 'Erro ao criar um agendamento'
      toast.error(messagem)
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

  useEffect(() => {
    if (open && assistenciaSelecionada?.id) {
      setValue('unidadeId', assistenciaSelecionada.id)
    }
  }, [open, assistenciaSelecionada, setValue])

  useEffect(() => {
    setValue('servicoId', '')
  }, [watch('unidadeId')])


  return (
    <Modal close={close} open={open}>
      <div
        className={`relative flex h-[62%] max-h-[500px] min-h-[420px] w-[40%] max-w-[600px] flex-col items-center rounded-xl bg-white transition-all duration-500 max-xl:h-1/3 max-xl:max-h-[28rem] max-xl:min-h-[28rem] max-xl:w-3/5 max-lg:h-[40%] max-lg:max-h-[430px] max-lg:w-4/5 max-md:z-50 max-md:max-h-[420px] max-md:w-[90%] 
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="bg-primary-800 font-outfit flex w-full items-center justify-between rounded-t-xl px-3 py-2 text-2xl font-bold text-white ">
          <h1>Novo Agendamento</h1>
          <X
            className="size-8 cursor-pointer duration-300 hover:text-red-500"
            strokeWidth={3}
            onClick={close}
          />
        </div>

        {/* Inputs */}
        <form className="mt-5 w-full space-y-4 px-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Assistência */}
          <div className="relative flex w-full flex-col">
            <label className="text-primary-800 font-outfit mb-1 text-[14px]">
              Selecione a Assistência
            </label>

            <select
              {...register('unidadeId')}
              className="border-1 border-primary-800 text-primary-800 w-full appearance-none rounded-lg py-2 pl-2 text-[14px] outline-none"
              onClick={() => setIsAnimate((prev) => !prev)}
              onMouseDown={() => setIsAnimate((prev) => !prev)}
              onMouseLeave={() => setIsAnimate(false)}
              onMouseUp={() => setIsAnimate(false)}
            >
              <option value="">Selecionar</option>
              {assistencia.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.unidade}
                </option>
              ))}
            </select>

            <ChevronDown
              strokeWidth={3}
              className={`text-primary-800 absolute right-1.5 top-9 size-5 transition-all duration-500 ${isAnimate ? 'rotate-180' : 'rotate-0'
                }`}
            />
          </div>

          {/* Serviço */}
          <div className="relative flex w-full flex-col">
            <label className="text-primary-800 font-outfit mb-1 text-[14px]">
              Selecione o Serviço
            </label>

            <select
              {...register('servicoId')}
              className="border-1 border-primary-800 text-primary-800 w-full appearance-none rounded-lg py-2 pl-2 text-[14px] outline-none disabled:bg-gray-200"
              disabled={servicosFiltrados.length === 0}
              onClick={() => setIsAnimate2((prev) => !prev)}
              onMouseDown={() => setIsAnimate2((prev) => !prev)}
              onMouseLeave={() => setIsAnimate2(false)}
              onMouseUp={() => setIsAnimate2(false)}
            >
              <option value="">Selecionar serviço</option>

              {servicosFiltrados.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.nome}
                </option>
              ))}
            </select>

            <ChevronDown
              strokeWidth={3}
              className={`text-primary-800 absolute right-1.5 top-9 size-5 transition-all duration-500 ${isAnimate2 ? 'rotate-180' : 'rotate-0'
                }`}
            />

            {errors.servicoId && (
              <span className="mt-1 text-xs text-red-500">{errors.servicoId.message}</span>
            )}
          </div>

          {/* Observações */}
          <div className="flex w-full flex-col">
            <label className="text-primary-800 font-outfit mb-1 text-[14px]">Observações</label>
            <textarea
              {...register('observacoes')}
              className="border-1 border-primary-800 text-primary-800 min-h-[80px] w-full resize-none rounded-lg px-3 py-2 outline-none"
              placeholder="Digite alguma observação..."
            ></textarea>
          </div>

          {/* Botão */}
          <div className="flex w-full items-center justify-center">
            <button
              className="bg-primary-800 font-outfit hover:bg-primary-800/90 mt-4 w-2/4 cursor-pointer rounded-lg py-2 font-bold text-white shadow duration-300 max-xl:mt-4 max-md:mt-2 max-md:w-4/5"
              type="submit"
            >
              Criar Agendamento
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
