import { useState, type ReactNode } from "react";
import type { TypeDashboardCidadao } from "../../types/type-dashboard-cidadao";
import { Inicio } from "./section/inicio";
import { SideBarDashboard } from "../../components/SideBar";

export function HomeCidadao() {
    const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
    const sectionsDashboard: Record<TypeDashboardCidadao, ReactNode> = {
        Inicio: <Inicio user="PROFISSIONAL"/>,
        ContatarAtendimento: <div>  </div>,
        ProcurarServico: <div> rolinha </div>,
    }

    return (
        <main className="bg-bright-100 flex h-screen w-full">
            <SideBarDashboard.root>
                <SideBarDashboard.logo />
                <SideBarDashboard.Links 
                    sectionSelecionada={selecionarSection} 
                    selecionarSection={(section) => setSelecionarSection(section as TypeDashboardCidadao)} 
                    typeUser='CIDADAO' 
                />
                <SideBarDashboard.botao />
            </SideBarDashboard.root>

            {sectionsDashboard[selecionarSection]}
        </main>
    )
}