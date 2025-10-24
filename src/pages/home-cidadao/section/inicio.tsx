import { IconeCalendario } from "../../../assets/Icons/Icone-calendario";
import { IconeNotificacao } from "../../../assets/Icons/icone-notificacao";
import { HeaderDashboards } from "../../../components/header";
import { Banner } from "../../../components/home/banner";
import { Dados } from "../../../components/home/dados";
import { Notificacao } from "../../../components/home/notificacao";
import type { IHomeProps } from "../../../types/interface-home-props";

export function Inicio(data: IHomeProps) {
    return (
        <main className="h-full w-full flex flex-col items-center space-y-6">
            <HeaderDashboards.root>
                <HeaderDashboards.perfil />
                <HeaderDashboards.notificacao />
            </HeaderDashboards.root>
            {/* Banner */}
            <Banner />
            <div className="h-full mt-2 w-[90%] py-0 px-4">
                <h1 className="font-satoshi-black text-2xl text-primary-800">{data.user === 'CIDADAO' ? 'Notificações' : 'Informações Gerais'}</h1>
                
                {data.user === 'CIDADAO' ? (<Notificacao />) : (<Dados />)}
            </div>
        </main>
    )
}