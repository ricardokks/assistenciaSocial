import { useState } from 'react'
import ReactDOM from 'react-dom'

import { IconeClosed } from '../../../../assets/Icons/IconeClosed'
import type { ModalUsuarioProps } from '../../../../types/interface-modal-usuario'
import { CidadaoSection } from './sections-modal-criar/section-cidadao'
import { FuncionarioSection } from './sections-modal-criar/section-funcionario'
import { GestorSection } from './sections-modal-criar/section-gestor'

export function ModalEditarUsuario(props: ModalUsuarioProps) {
  let userType = 'Gestor'

  return ReactDOM.createPortal(
    <section
      className={`${props.abrilModalUsuario ? 'opacity-100' : 'pointer-events-none opacity-0'} fixed top-0 z-[9999] flex  h-screen w-full items-center justify-center bg-black/50 backdrop-blur-[3px] transition-all duration-500 ease-in-out`}
    >
      {/* Modal de Criação do Agendamento  */}
      <article
        className={` ${props.abrilModalUsuario ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} relative flex size-[70%] h-[85%] min-w-[360px] items-start justify-between rounded-2xl bg-white p-7 px-4 transition-all duration-300 ease-in-out max-lg:w-[80%]`}
      >
        {/* parte de cima do componente */}
        <nav className="bg-primary-800 absolute left-0 top-0 h-12 w-full rounded-t-2xl">
          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="font-outfit-bold text-2xl text-white">Editar Usuário</h1>
            <div
              className="cursor-pointer"
              onClick={() => {
                props.handleAbrirModalDelete()
              }}
            >
              <IconeClosed className="size-8 text-white" />
            </div>
          </div>
        </nav>

        {/* Seção dos forms */}

        {/*Sections */}

        <div className={` mt-6 flex size-full flex-col items-center justify-end py-10 pt-4 `}>
          {userType === 'Funcionario' && <FuncionarioSection />}
          {userType === 'Cidadao' && <CidadaoSection />}
          {userType === 'Gestor' && <GestorSection />}
        </div>
      </article>
    </section>,
    document.body
  )
}
