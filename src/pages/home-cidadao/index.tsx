<<<<<<< HEAD
import { type ReactNode, useState } from 'react'

import { SideBarDashboard } from '../../components/SideBar'
import type { TypeDashboardCidadao } from '../../types/type-dashboard-cidadao'
import { Inicio } from './section/inicio'

export function HomeCidadao() {
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
  const sectionsDashboard: Record<TypeDashboardCidadao, ReactNode> = {
    Inicio: <Inicio />,
    ContatarAtendimento: <div> </div>,
    ProcurarServico: <div> rolinha </div>,
  }

  return (
    <main className="bg-[#f5f7fa] flex justify-between h-screen w-full">
      <SideBarDashboard.root>
        <SideBarDashboard.logo />
        <SideBarDashboard.Links
          sectionSelecionada={selecionarSection}
          selecionarSection={(section) => setSelecionarSection(section as TypeDashboardCidadao)}
          typeUser="CIDADAO"
        />
        <SideBarDashboard.botao />
      </SideBarDashboard.root>
=======
import { useState, type ReactNode } from "react";
import type { TypeDashboardCidadao } from "../../types/type-dashboard-cidadao";
import { SideBarDashboard } from "../../components/SideBar";
import { Inicio } from "../../components/home/Inicio";

export function HomeCidadao() {
    const [selecionarSection, setSelecionarSection] = useState<TypeDashboardCidadao>('Inicio')
    const sectionsDashboard: Record<TypeDashboardCidadao, ReactNode> = {
        Inicio: <Inicio user="CIDADAO"/>,
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
>>>>>>> 5564bf44e68bf9cbfa42775b2c25d9778e2ae2c1

      {sectionsDashboard[selecionarSection]}
    </main>
  )
}
