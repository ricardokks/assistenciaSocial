import { IconeNotificacao } from "../../assets/Icons/icone-notificacao";

export function InicioNotificacao() {
    return (
        <div className="flex flex-col space-y-2 w-full h-full overflow-y-auto mt-2">
            {/* Componente de notificação */}
            <div className="w-full px-4 py-6 h-24 rounded-2xl flex bg-[#476CFF1A] items-center shadow shadow-blue-950/25 space-x-3 relative">
                {/* Icone de notificação */}
                <div className="rounded-full p-2 h-8 aspect-square bg-primary-800 flex items-center justify-center">
                    <IconeNotificacao />
                </div>
                {/* Main ( texto e data ) */}
                <div className="w-full flex flex-col justify-around text-primary-800">
                    <h1 className="font-outfit font-medium"> Nova mensagem </h1>
                    <h1 className="font-satoshi font-light text-[15px]"> Olá Felipe, você tem novas mensagens para responder, clique abaixo e verifique</h1>
                    <h1 className="text-primary-800/50 font-satoshi font-normal text-[12px] mt-0.5"> 12/12/2025 13:00 </h1>
                </div>

                {/* Bolinha de notificação no canto superior direito */}
                <div className="absolute top-3 right-3 bg-[#335CFF] h-2 aspect-square rounded-full" />
            </div>
        </div>
    )
}