import { Book, BookAIcon, Eye, Trash2, X } from 'lucide-react'

import type { statusButtonProps } from '../../types/type-status-button'

export function ButtonInfo(data: { status: statusButtonProps }) {
  return (
    <>
      {data.status === 'PENDENTE' && (
        <button
          className={`font-outfit text-[13px] bg-[#FF5353] text-white px-3 py-0.5 rounded-lg shadow-md hover:shadow-lg duration-500  cursor-pointer flex items-center justify-center `}
        >
          <Trash2 className=" w-[14px] aspect-square -translate-y-[1.5px] -translate-x-1" />
          Cancelar{' '}
        </button>
      )}
      {data.status === 'APROVADO' && (
        <button
          className={`font-outfit text-[13px] bg-primary-800 text-white px-3 py-0.5 rounded-lg shadow-md hover:shadow-lg duration-500  cursor-pointer flex items-center justify-center `}
        >
          <Eye className=" w-[14px] aspect-square -translate-y-[1.5px] -translate-x-1" />
          Visualiar observações{' '}
        </button>
      )}
      {data.status === 'ANALISE' && (
         <button
          className={`font-outfit text-[13px] bg-gray-600  text-white px-3 py-0.5 rounded-lg shadow-md hover:shadow-lg duration-500  cursor-pointer flex items-center justify-center pointer-events-none`}
        >
          <Book className=" w-[14px] aspect-square -translate-y-[1.5px] -translate-x-1" />
          Aguardando análise{' '}
        </button>
      )}
      {data.status === 'RECUSADO' && (
         <button
          className={`font-outfit text-[13px] bg-gray-600  text-white px-3 py-0.5 rounded-lg shadow-md hover:shadow-lg duration-500  cursor-pointer flex items-center justify-center pointer-events-none`}
        >
          <X className=" w-[14px] aspect-square -translate-y-[1.5px] -translate-x-1" strokeWidth={4} />
          Recusado{' '}
        </button>
      )}
    </>
  )
}
