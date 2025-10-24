import { useState, type ReactNode } from "react";
import { HeaderDashboards } from "../../components/header";
import type { TypeDashboardCidadao } from "../../types/type-dashboard-cidadao";
import { Inicio } from "./section/inicio";

export function HomeCidadao() {
    const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
    const sectionsDashboard: Record<TypeDashboardCidadao, ReactNode> = {
        Inicio: <Inicio />,
        ContatarAtendimento: <div>  </div>,
        ProcurarServico: <div> rolinha </div>,
    }

    return (
        <main className="bg-bright-100 flex h-screen w-full">
            <HeaderDashboards.root>
                <HeaderDashboards.logo />
                <HeaderDashboards.Links 
                    sectionSelecionada={selecionarSection} 
                    selecionarSection={(section) => setSelecionarSection(section as TypeDashboardCidadao)} 
                    typeUser='CIDADAO' 
                />
                <HeaderDashboards.botao />
            </HeaderDashboards.root>

            {sectionsDashboard[selecionarSection]}
        </main>
    )
}