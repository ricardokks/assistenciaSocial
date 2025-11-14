import ReactDOM from 'react-dom'

import { IconeClosed } from '../../../../assets/Icons/IconeClosed'

import type { ModalDeletarUsuarioProps } from '../../../../types/interface-modal-deletar-usuario'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'


export function ModalDeletarUsuario(props: ModalDeletarUsuarioProps) {
  return ReactDOM.createPortal(
    <section
      className={`${props.abrilModalUsuario ? 'opacity-100' : 'pointer-events-none opacity-0'} fixed top-0 z-[9999] flex  h-screen w-full items-center justify-center bg-black/50 backdrop-blur-[3px] transition-all duration-500 ease-in-out`}
    >
      {/* Modal de Criação do Agendamento  */}
      <article
        className={` ${props.abrilModalUsuario ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} relative flex size-[30%] min-w-[360px] h-auto items-start justify-between rounded-2xl bg-white p-7 px-4 transition-all duration-300 ease-in-out max-md:w-[80%]`}
      >
        {/* parte de cima do componente */}
        <nav className="bg-primary-800 absolute left-0 top-0 h-12 w-full rounded-t-2xl">
          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="font-outfit-bold text-2xl text-white">Novo Usuario</h1>
            <div className="cursor-pointer" onClick={props.handleAbrirModalDelete}>
              <IconeClosed className="size-8 text-primary-800" />
            </div>
          </div>
        </nav>

        <div className='w-full flex flex-col items-center justify-center '>
              <div className='w-20 h-20 text-primary-800 p-2 mt-6 bg-primary-100/60 rounded-full'> <IconeLixeira></IconeLixeira></div>

              <h1 className='font-outfit-bold text-xl text-primary-800 mt-6'>Deletar Usuário</h1>
              <h1 className='font-satoshi  text-base text-primary-800'>Tem certeza que deseja excluir usuário?</h1>
              <h1 className='font-satoshi text-base text-primary-800'>Essa ação não poderá ser desfeita.</h1>

              <div className='w-full flex justify-evenly mt-8'> 
                <button onClick={() => props.handleAbrirModalDelete()} className='w-[45%] h-10 p-1 bg-negative text-white rounded-md cursor-pointer'>Deletar</button>
                <button onClick={() => props.handleAbrirModalDelete()} className='w-[45%] h-10 p-1 bg-primary-100/80 text-white rounded-md cursor-pointer'>Cancelar</button>

              </div>

        </div>


      </article>
    </section>,
    document.body
  )
}
