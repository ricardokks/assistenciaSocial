import type { IHomeProps } from "../../types/interface-home-props";
import { HeaderDashboards } from "../header";
import { InicioBanner } from "./banner";
import { InicioDados } from "./InicioDados";
import { InicioDashBoard } from "./inicioDashBoard";
import { InicioNotificacao } from "./InicioNotificacao";

export function Inicio({user}: IHomeProps ) {
    return (
        <main className="h-full w-full flex flex-col items-center space-y-6">
            <HeaderDashboards.root>
                <HeaderDashboards.perfil />
                <HeaderDashboards.notificacao />
            </HeaderDashboards.root>
            {/* Banner */}
            <InicioBanner />
            <InicioDashBoard.root>
                {user === "CIDADAO" ?
                    (<InicioNotificacao />) :
                    (<InicioDados />)
                }
            </InicioDashBoard.root>
        </main>
    )
}