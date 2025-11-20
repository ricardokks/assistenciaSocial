import { useState } from 'react'
import ReactDOM from 'react-dom'

import { IconeCidadao } from '../../../../assets/Icons/Icon-cidadao'
import { IconeFuncionario } from '../../../../assets/Icons/Icon-funcionario'
import { IconeGestor } from '../../../../assets/Icons/Icon-gestor'
import { IconeClosed } from '../../../../assets/Icons/IconeClosed'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'
import { IconeSair } from '../../../../assets/Icons/iconeSair'
import type { ModalUsuarioProps } from '../../../../types/interface-modal-usuario'
import { FuncionarioSection } from './sections-modal-criar/section-funcionario'
import { CidadaoSection } from './sections-modal-criar/section-cidadao'
import { GestorSection } from './sections-modal-criar/section-gestor'
import { IconeVoltar } from '../../../../assets/Icons/iconeVoltar'

export function ModalCriarUsuario(props: ModalUsuarioProps) {
  const [section, setSection] = useState<number>(0)
  const [stage, setStage] = useState<number>(0)

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
            <h1 className="font-outfit-bold text-2xl text-white">Novo Usuário</h1>
            <div
              className="cursor-pointer"
              onClick={() => {
                props.handleAbrirModalDelete()
                setSection(0)
                setStage(0)
              }}
            >
              <IconeClosed className="size-8 text-white" />
            </div>
          </div>
        </nav>

        {/* Seção dos forms */}


        <div
          className={`flex flex-col  mt-10 pt-4 items-center justify-end ${stage === 0 ? 'h-100 w-full' : 'invisible size-0'}`}
        >
          <h1 className="font-outfit-bold text-2xl text-primary-800">
            Que tipo de usuário você deseja criar?
          </h1>
          <div className="w-full flex justify-evenly items-center h-28 mt-16">
            <button
              className={` ${section == 1 ? 'bg-primary-100' : 'bg-primary-100/50 hover:bg-primary-100/60'} w-[20%] cursor-pointer  duration-300 ease h-full rounded-2xl font-satoshi-black text-lg text-primary-800 flex flex-col gap-2 p-1 items-center justify-center`}
              onClick={() => setSection(1)}
            >
              {' '}
              <IconeFuncionario className="w-12 h-12" /> Funcionário
            </button>
            <button
              className={` ${section == 2 ? 'bg-primary-100' : 'bg-primary-100/50 hover:bg-primary-100/60'} w-[20%] cursor-pointer  duration-300 ease h-full rounded-2xl font-satoshi-black text-lg text-primary-800 flex flex-col gap-2 p-1 items-center justify-center`}
              onClick={() => setSection(2)}
            >
              {' '}
              <IconeCidadao className="w-12 h-12" /> Cidadão
            </button>
            <button
              className={` ${section == 3 ? 'bg-primary-100' : 'bg-primary-100/50 hover:bg-primary-100/60'} w-[20%] cursor-pointer  duration-300 ease h-full rounded-2xl font-satoshi-black text-lg text-primary-800 flex flex-col gap-2 p-1 items-center justify-center`}
              onClick={() => setSection(3)}
            >
              {' '}
              <IconeGestor className="w-12 h-12" /> Gestor
            </button>
          </div>

          <div className="w-full flex justify-evenly mt-20 mb-4">
            <button
              onClick={() => (section ? setStage(1) : null)}
              className="w-[45%] h-10 p-1 bg-primary-800 text-white rounded-md cursor-pointer"
            >
              Prosseguir
            </button>
          </div>
        </div>

        {/*Sections */}

        <div
          className={` flex flex-col mt-6 pt-4 items-center justify-end ${stage === 1 ? 'h-full py-10 w-full' : 'invisible size-0'}`}
        >
            <div className=' justify-self-start mb-3 flex self-start pl-10 cursor-pointer'
            onClick={() => {
              setSection(0)
              setStage(0)
            }}
          >
            {' '}
            <IconeVoltar className="h-6 w-6 text-primary-800" />{' '}
          </div>
          {section === 1 && <FuncionarioSection />}
          {section === 2 && <CidadaoSection />}
          {section === 3 && <GestorSection />}


        </div>
      </article>
    </section>,
    document.body
  )
}
