import { IconeCalendario } from "../../assets/Icons/Icone-calendario";
import { dadosHome } from "../../constants/dados-home";

export function InicioDados() {
    return (
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
            {dadosHome.map(item => (
                // Componente
                <div key={item.id} className="flex size-full flex-col rounded-2xl border-2 border-[#194A99] pb-7 pt-3">
                    {/* Icone do calendario e valor do agendamentos */} 
                    <div className="flex h-1/2 w-full items-center px-3 pt-2">
                        <div className="bg-primary-800 flex aspect-square h-12 items-center justify-center rounded-full p-2">
                            <IconeCalendario />
                        </div>
                        <h1 className="font-satoshi pl-2 text-3xl font-bold text-[#2D2D2D]">{item.value}</h1>
                    </div>
                    {/* Texto (mensal, diario ou semanal) */}
                    <h1 className="text-primary-800 font-satoshi mt-3 px-4 text-[16px]">{item.text}</h1>
                </div>
            ))}
        </div>
    )
}