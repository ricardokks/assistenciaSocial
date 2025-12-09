import { IconeCalendario } from "../../../assets/Icons/Icone-calendario";
import type { InicioDadosProps } from "../../../types/interface-card-inicio-agendamento";


export function CardInicioAgendamento(props: InicioDadosProps){
    return(
          <div
          className="flex size-full flex-col rounded-2xl border-2 border-[#194A99] pb-7 pt-3"
        >
          {/* Icone do calendario e valor do agendamentos */}
          <div className="flex h-1/2 w-full items-center px-3 pt-2">
            <div className="bg-primary-800 flex aspect-square h-12 items-center justify-center rounded-full p-2">
              <IconeCalendario />
            </div>
            <h1 className="font-satoshi pl-2 text-3xl font-bold text-[#2D2D2D]">{props.valorAgendamento}</h1>
          </div>
          {/* Texto (mensal, diario ou semanal) */}
          <h1 className="text-primary-800 font-satoshi mt-3 px-4 text-[16px]">{props.text}</h1>
        </div>
    )
}