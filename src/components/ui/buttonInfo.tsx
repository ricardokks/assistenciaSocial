import { Book, Eye, Trash2, X } from 'lucide-react'

import type { statusButtonProps } from '../../types/type-status-button'

export function ButtonInfo(data: {
  status: statusButtonProps
  onClickDelete: () => void
  onClickAguardandoAnalise?: () => void
  onClickRecusado: () => void
  onClickVisualizarInfo: () => void
}) {
  return (
    <>
      {data.status === 'PENDENTE' && (
        <button
          className={`font-outfit flex cursor-pointer items-center justify-center rounded-lg bg-[#FF5353] px-3 py-0.5 text-[13px]  text-white shadow-md duration-500 max-md:w-full hover:shadow-lg max-md:py-1 max-md:text-sm`}
          onClick={data.onClickDelete}
        >
          <Trash2 className=" aspect-square w-[14px] -translate-x-1 -translate-y-[1.5px]" />
          Cancelar{' '}
        </button>
      )}
      {data.status === 'CONCLUIDO' && (
        <button
          className={`font-outfit bg-primary-800 flex cursor-pointer items-center justify-center rounded-lg px-3 py-0.5 text-[13px]  text-white shadow-md duration-500 max-md:w-full hover:shadow-lg max-2xl:mt-4`}
          onClick={data.onClickVisualizarInfo}
        >
          <Eye className=" aspect-square w-[14px] -translate-x-1 -translate-y-[1.5px]" />
          Visualizar observações{' '}
        </button>
      )}
      {data.status === 'ANALISE' && (
        <button
          className={`font-outfit flex cursor-pointer  items-center justify-center rounded-lg bg-gray-600 px-3 py-0.5 text-[13px]  text-white shadow-md duration-500 hover:shadow-lg `}
          onClick={data.onClickAguardandoAnalise}
        >
          <Book className=" aspect-square w-[14px] -translate-x-1 -translate-y-[1.5px]" />
          Aguardando análise{' '}
        </button>
      )}
      {data.status === 'RECUSADO' && (
        <button
          className={`font-outfit flex cursor-pointer  items-center justify-center rounded-lg bg-gray-600 px-3 py-0.5 text-[13px] max-md:w-full text-white shadow-md duration-500 hover:shadow-lg`}
          onClick={data.onClickRecusado}
        >
          <X
            className=" aspect-square w-[14px] -translate-x-1 -translate-y-[1.5px]"
            strokeWidth={4}
          />
          Recusado{' '}
        </button>
      )}
    </>
  )
}
