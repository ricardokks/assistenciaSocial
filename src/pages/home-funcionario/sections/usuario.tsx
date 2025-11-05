import { useState } from 'react'

import { IconeMais } from '../../../assets/Icons/icone-mais'
import { HeaderDashboards } from '../../../components/Header'
import { agendamentos } from '../../../constants/informacao-cidadao'
import { CardAgendamento } from '../components/layout/card-agendamento'
import { ModalCriarAgendamento } from '../components/modals/modal-criar-agendamento'
import { ModalEditarAgendamento } from '../components/modals/modal-editar-agendamento'

export function Usuario() {
  // estados e estados utilizados
  const [abrirModalCriarAgendamento, setAbrirModalCriarAgendamento] = useState<boolean>(false)
  const [abrilModalEditarAgendamento, setAbrilModalEditarAgendamento] = useState<boolean>(false)
  const [abrilModalDelete, setAbrirModalDelete] = useState<boolean>(false)

  // funções utilizados
  function handleAbrirModalCriarAgendamento() {
    setAbrirModalCriarAgendamento((prev) => !prev)
  }

  function handleAbrirModalEditarAgendamento() {
    setAbrilModalEditarAgendamento((prev) => !prev)
  }
  return (
    <main className="main overflow-y-auto">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="PROFISSIONAL" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>
      {/* conteudo principal  */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-primary-800 font-outfit-bold text-[1.3rem]">Agendamentos</h1>

          <button
            className="bg-primary-800 font-outfit-bold hover:bg-primary-800/90 flex cursor-pointer items-center justify-center gap-3 rounded-[5.97px]  p-2 text-white duration-500 ease-in-out"
            onClick={handleAbrirModalCriarAgendamento}
          >
            <IconeMais className="size-4 text-white" /> Novo Agendamento
          </button>
        </div>

        {/* renderização dos cards  */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {agendamentos.map((card, index) => (
            <CardAgendamento
              key={index}
              abrirModal={handleAbrirModalCriarAgendamento}
              updateModal={handleAbrirModalEditarAgendamento}
              {...card}
            />
          ))}
        </div>
      </div>

      {/* Modais utilizados no componente */}
      <ModalCriarAgendamento
        abrilModalAgendamento={abrirModalCriarAgendamento}
        handleAbrilModalAgendamento={handleAbrirModalCriarAgendamento}
      />

      <ModalEditarAgendamento
        abrirEditarAgendamento={abrilModalEditarAgendamento}
        handleAbrirModalEditarAgendamento={handleAbrirModalEditarAgendamento}
      />
    </main>
  )
}
