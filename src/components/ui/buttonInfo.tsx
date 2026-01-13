import { Book, Eye, Trash2, X } from 'lucide-react'

import type { statusButtonProps } from '../../types/type-status-button'

export function ButtonInfo(data: {
  status: statusButtonProps
  onClickDelete: () => void
  onClickAguardandoAnalise?: () => void
  onClickRecusado: () => void
  onClickVisualizarInfo: () => void
}) {
  const baseStyleButton =
    'font-outfit flex items-center justify-center gap-2 rounded-lg px-3 py-1 text-[13px] text-white shadow-md duration-500 hover:shadow-lg cursor-pointer max-md:w-full'


  return (
    <>
      {data.status === 'PENDENTE' && (
        <button
          className={`${baseStyleButton} bg-[#FF5353]`}
          onClick={data.onClickDelete}
        >
          <Trash2 className=" aspect-square w-[14px] -translate-x-1 -translate-y-[0.7px]" />
          Cancelar{' '}
        </button>
      )}

      {data.status === 'CONCLUIDO' && (
        <button
          className={`${baseStyleButton} bg-primary-800`}
          onClick={data.onClickVisualizarInfo}
        >
          <Eye className=" aspect-square w-[14px] -translate-x-1 -translate-y-[0.7px]" />
          Visualizar observações{' '}
        </button>
      )}

      {data.status === 'ANALISE' && (
        <button
          className={`${baseStyleButton} bg-gray-600`}
          onClick={data.onClickAguardandoAnalise}
        >
          <Book className=" aspect-square w-[14px] -translate-x-1 -translate-y-[0.7px]" />
          Aguardando análise{' '}
        </button>
      )}

      {data.status === 'RECUSADO' && (
        <button
          className={`${baseStyleButton} bg-gray-600`}
          onClick={data.onClickRecusado}
        >
          <X
            className=" aspect-square w-[14px] -translate-x-1 -translate-y-[0.7px]"
            strokeWidth={4}
          />
          Recusado{' '}
        </button>
      )}
    </>
  )
}
