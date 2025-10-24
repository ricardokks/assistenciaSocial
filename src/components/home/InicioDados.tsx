import { IconeCalendario } from "../../assets/Icons/Icone-calendario";
import { dadosHome } from "../../constants/dados-home";

export function InicioDados() {
    return (
        <div className="flex w-full h-full justify-between pt-2 space-x-6">
            {dadosHome.map(item => (
                // Componente
                <div key={item.id} className="flex flex-col border-2 border-[#194A99] h-[45%] w-2/4 rounded-2xl">
                    {/* Icone do calendario e valor do agendamentos */} 
                    <div className="w-full flex px-3 h-1/2 items-center pt-2">
                        <div className="rounded-full p-2 h-12 aspect-square bg-primary-800 flex items-center justify-center">
                            <IconeCalendario />
                        </div>
                        <h1 className="text-[#2D2D2D] font-satoshi font-bold text-3xl pl-2">{item.value}</h1>
                    </div>
                    {/* Texto (mensal, diario ou semanal) */}
                    <h1 className="px-4 mt-3 text-primary-800 font-satoshi text-[16px]">{item.text}</h1>
                </div>
            ))}
        </div>
    )
}