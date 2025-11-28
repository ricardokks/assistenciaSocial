import { Check, X } from 'lucide-react'

import type { statusButtonProps } from '../../types/type-status-button'

export function ButtonStatus(data: { status: statusButtonProps }) {
  return (
    <>
      {data.status === 'PENDENTE' && (
        <button className="bg-primary-800 flex h-5 w-1/2 items-center justify-center gap-1 rounded-full p-1 text-[0.7rem] font-bold text-white">
          <div className="size-[6px] rounded-full bg-white" />
          Pendente
        </button>
      )}
      {data.status === 'ANALISE' && (
        <button className="flex h-5 w-1/2 items-center justify-center gap-1 rounded-full bg-gray-600 p-1 text-[0.7rem] font-bold text-white">
          <div className="size-[6px] rounded-full bg-white" />
          Análise
        </button>
      )}
      {data.status === 'CONCLUIDO' && (
        <button className="flex h-5 w-1/2 items-center justify-center gap-1 rounded-full bg-[#19c954cc] p-1 text-[0.7rem] font-bold text-white">
          <Check className="size-3" strokeWidth={4} />

          <h1 className="-translate-y-[1px]">Aprovado</h1>
        </button>
      )}
      {data.status === 'RECUSADO' && (
        <button className="flex h-5 w-1/2 items-center justify-center gap-1 rounded-full bg-[#FF5353] p-1 text-[0.7rem] font-bold text-white">
          <X className="size-3" strokeWidth={3} />
          <h1 className="-translate-y-[1px]">Recusado</h1>
        </button>
      )}
    </>
  )
}
