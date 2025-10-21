import React, { type ReactNode, useState } from 'react'

import type { TypeDashboardFuncionario } from '../../types/type-dashboard-funcionario'
import { Inicio } from './sections/inicio'
import { Atendimento } from './sections/atendimento'
import { Dados } from './sections/dados'

export function HomeFuncionario() {
  // variaveis e estados utilizados
  const [selecionarSection, setSelecionarSection] = useState<TypeDashboardFuncionario>('Inicio')
  const sectionsDashboard: Record<TypeDashboardFuncionario, ReactNode> = {
    Inicio: <Inicio />,
    Atendimento: <Atendimento />,
    Dados: <Dados />,
    Usuário: <Atendimento />
  }
  return (
    <section className="h-screen w-full bg-bright-100">
      <h1>oi</h1>
    </section>
  )
}
