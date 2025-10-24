import { IconeCalendario } from "../../assets/Icons/Icone-calendario";

export function Dados() {
    return (
        <div className="flex flex-col border-2 border-[#194A99] h-[45%] w-2/4 rounded-2xl">
            <div className="w-full flex px-3 h-1/2 items-center pt-2">
                <div className="rounded-full p-2 h-12 aspect-square bg-primary-800 flex items-center justify-center">
                    <IconeCalendario />
                </div>
                <h1 className="text-[#2D2D2D] font-satoshi font-bold text-3xl pl-2">1726</h1>
            </div>
            <h1 className="px-4 mt-3 text-primary-800 font-satoshi text-[16px]">Total de agendamentos mensais</h1>
        </div>
    )
}