import { useState } from 'react'
import ReactDOM from 'react-dom'

import { IconeCidadao } from '../../../../assets/Icons/Icon-cidadao'
import { IconeFuncionario } from '../../../../assets/Icons/Icon-funcionario'
import { IconeClosed } from '../../../../assets/Icons/IconeClosed'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'
import { IconeSair } from '../../../../assets/Icons/iconeSair'
import { IconeVoltar } from '../../../../assets/Icons/iconeVoltar'
import type { ModalUsuarioProps } from '../../../../types/interface-modal-usuario'
import { CidadaoSection } from './sections-modal-criar/section-cidadao'
import { FuncionarioSection } from './sections-modal-criar/section-funcionario'

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
          className={`mt-10 flex  flex-col items-center justify-end pt-4 ${stage === 0 ? 'h-100 w-full' : 'invisible size-0'}`}
        >
          <h1 className="font-outfit-bold text-primary-800 text-2xl">
            Que tipo de usuário você deseja criar?
          </h1>
          <div className="mt-16 flex h-28 w-full items-center justify-evenly">
            <button
              className={` ${section == 1 ? 'bg-primary-100' : 'bg-primary-100/50 hover:bg-primary-100/60'} ease font-satoshi-black  text-primary-800 flex h-full w-[20%] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl p-1 text-lg duration-300`}
              onClick={() => setSection(1)}
            >
              {' '}
              <IconeFuncionario className="size-12" /> Funcionário
            </button>
            <button
              className={` ${section == 2 ? 'bg-primary-100' : 'bg-primary-100/50 hover:bg-primary-100/60'} ease font-satoshi-black  text-primary-800 flex h-full w-[20%] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl p-1 text-lg duration-300`}
              onClick={() => setSection(2)}
            >
              {' '}
              <IconeCidadao className="size-12" /> Cidadão
            </button>
          </div>

          <div className="mb-4 mt-20 flex w-full justify-evenly">
            <button
              className="bg-primary-800 h-10 w-[45%] cursor-pointer rounded-md p-1 text-white"
              onClick={() => (section ? setStage(1) : null)}
            >
              Prosseguir
            </button>
          </div>
        </div>

        {/*Sections */}

        <div
          className={` mt-6 flex flex-col items-center justify-end pt-4 ${stage === 1 ? 'size-full py-10' : 'invisible size-0'}`}
        >
          <div
            className=" mb-3 flex cursor-pointer place-self-start pl-10"
            onClick={() => {
              setSection(0)
              setStage(0)
            }}
          >
            {' '}
            <IconeVoltar className="text-primary-800 size-6" />{' '}
          </div>
          {section === 1 && (
            <FuncionarioSection
              handleAbrirModalDelete={() => props.handleAbrirModalDelete()}
              refreshUsers={props.refreshUsers}
              setSection={setSection}
              setStage={setStage}
            />
          )}
          {section === 2 && (
            <CidadaoSection
              handleAbrirModalDelete={() => props.handleAbrirModalDelete()}
              refreshUsers={props.refreshUsers}
              setSection={setSection}
              setStage={setStage}
            />
          )}
        </div>
      </article>
    </section>,
    document.body
  )
}
