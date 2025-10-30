import { IconeSearch } from "../../../assets/Icons/icone-search";
import { HeaderDashboards } from "../../../components/header";

export function Servicos() {
    return (
        <main className="flex h-screen w-[calc(100%-20%)] flex-col items-center space-y-6 overflow-y-auto px-4 max-md:w-full max-md:px-0">
            <HeaderDashboards.root>
                <HeaderDashboards.perfil user="CIDADAO" />
                <HeaderDashboards.notificacao />
            </HeaderDashboards.root>
            <div className="w-full h-full px-4 pl-8 py-1 flex flex-col">
                {/* Texto */}
                <h1 className="font-satoshi-bold text-primary-800 text-2xl"> Serviços Sociais</h1>
                {/* div do Input */}
                <div className="relative flex w-[55%]">
                    {/* Icone search */}
                    <IconeSearch className="absolute top-[1.55rem] left-3"/>
                    <input
                        placeholder="Procure pelo nome..."
                        className="w-full h-full bg-gray-500/10 px-2 py-1 rounded-2xl mt-3 pl-10 placeholder:font-satoshi text-primary-800 placeholder:text-primary-800 outline-none shadow shadow-black/10" />
                </div>
                <div className="w-full grid grid-cols-2 grid-rows-2">

                </div>
            </div>
        </main>
    )
}