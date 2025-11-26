import { Book, Eye, Trash2, X } from 'lucide-react'

import type { statusButtonProps } from '../../types/type-status-button'

export function ButtonInfo(data: { status: statusButtonProps, onClickDelete: () => void, onClickAguardandoAnalise: () => void, onClickRecusado: () => void, onClickVisualizarInfo: () => void }) {
  return (
    <>
      {data.status === 'PENDENTE' && (
        <button
          onClick={data.onClickDelete}
          className={`font-outfit text-[13px] bg-[#FF5353] text-white px-3 py-0.5 rounded-lg shadow-md hover:shadow-lg duration-500  cursor-pointer flex items-center justify-center `}
        >
          <Trash2 className=" w-[14px] aspect-square -translate-y-[1.5px] -translate-x-1" />
          Cancelar{' '}
        </button>
      )}
      {data.status === 'CONCLUIDO' && (
        <button
          onClick={data.onClickVisualizarInfo}
          className={`font-outfit text-[13px] bg-primary-800 text-white px-3 py-0.5 rounded-lg shadow-md hover:shadow-lg duration-500  cursor-pointer flex items-center justify-center `}
        >
          <Eye className=" w-[14px] aspect-square -translate-y-[1.5px] -translate-x-1" />
          Visualizar observações{' '}
        </button>
      )}
      {data.status === 'ANALISE' && (
        <button
          onClick={data.onClickAguardandoAnalise}
          className={`font-outfit text-[13px] bg-gray-600  text-white px-3 py-0.5 rounded-lg shadow-md hover:shadow-lg duration-500  cursor-pointer flex items-center justify-center `}
        >
          <Book className=" w-[14px] aspect-square -translate-y-[1.5px] -translate-x-1" />
          Aguardando análise{' '}
        </button>
      )}
      {data.status === 'RECUSADO' && (
        <button
          onClick={data.onClickRecusado}
          className={`font-outfit text-[13px] bg-gray-600  text-white px-3 py-0.5 rounded-lg shadow-md hover:shadow-lg duration-500  cursor-pointer flex items-center justify-center`}
        >
          <X className=" w-[14px] aspect-square -translate-y-[1.5px] -translate-x-1" strokeWidth={4} />
          Recusado{' '}
        </button>
      )}
    </>
  )
}
