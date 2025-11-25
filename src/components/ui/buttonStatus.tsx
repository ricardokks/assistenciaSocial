import { Check, X } from "lucide-react"
import type { statusButtonProps } from "../../types/type-status-button"

export function ButtonStatus(data: { status: statusButtonProps }) {
  return (
    <>
      {data.status === 'PENDENTE' && (
        <button className="bg-primary-800 flex items-center justify-center gap-1 text-[0.7rem] w-1/2 text-white font-bold p-1 rounded-full h-5">
           <div className="size-[6px] bg-white rounded-full" />
          Pendente
        </button>
      )}
      {data.status === 'ANALISE' && (
        <button className="bg-gray-600 flex items-center justify-center gap-1 text-[0.7rem] w-1/2 text-white font-bold p-1 rounded-full h-5">
            <div className="size-[6px] bg-white rounded-full" />
            Análise
        </button>
      )}
        {data.status === 'APROVADO' && (
        <button className="bg-[#19c954cc] flex items-center justify-center gap-1 text-[0.7rem] w-1/2 text-white font-bold p-1 rounded-full h-5">
          <Check className="size-3" strokeWidth={4} />
          
           <h1 className="-translate-y-[1px]">Aprovado</h1>
        </button>
      )}
        {data.status === 'RECUSADO' && (
        <button className="bg-[#FF5353] flex items-center justify-center gap-1 text-[0.7rem] w-1/2 text-white font-bold p-1 rounded-full h-5">
          <X className="size-3" strokeWidth={3} />
          <h1 className="-translate-y-[1px]">Recusado</h1>
        </button>
      )}
    </>
  )
}


