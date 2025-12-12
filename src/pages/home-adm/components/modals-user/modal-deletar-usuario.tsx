import ReactDOM from 'react-dom'

import { IconeClosed } from '../../../../assets/Icons/IconeClosed'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'
import type { ModalDeletarUsuarioProps } from '../../../../types/interface-modal-deletar-usuario'
import { deleteUser } from '../../../../api/user/deleteUser'
import { toast } from 'sonner'

export function ModalDeletarUsuario(props: ModalDeletarUsuarioProps) {



  async function handleDeleteUser() {
    try {
      const res = await deleteUser(props.id)
      console.log("response:", res.data)
      props.handleAbrirModalDelete()
      props.refreshUsers()

      toast.success('Usuário deletado com sucesso!')
    } catch (error) {
      console.log('Erro ao deletar usuário:', error)
      toast.error('Erro ao deletar usuário. Por favor, tente novamente.')
    }
  }


  return ReactDOM.createPortal(
    <section
      className={`${props.abrilModalUsuario ? 'opacity-100' : 'pointer-events-none opacity-0'} fixed top-0 z-[9999] flex  h-screen w-full items-center justify-center bg-black/50 backdrop-blur-[3px] transition-all duration-500 ease-in-out`}
    >
      {/* Modal de Criação do Agendamento  */}
      <article
        className={` ${props.abrilModalUsuario ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} relative flex size-[30%] h-auto min-w-[360px] items-start justify-between rounded-2xl bg-white p-7 px-4 transition-all duration-300 ease-in-out max-md:w-[80%]`}
      >
        {/* parte de cima do componente */}
        <nav className="absolute left-0 top-0 h-12 w-full rounded-t-2xl bg-white">
          <div className="flex items-center justify-end px-4 py-2 ">
            <div className="cursor-pointer" onClick={props.handleAbrirModalDelete}>
              <IconeClosed className="text-primary-800 size-8" />
            </div>
          </div>
        </nav>

        <div className="flex w-full flex-col items-center justify-center ">
          <div className="text-primary-800 bg-primary-100/60 mt-6 size-20 rounded-full p-2">
            {' '}
            <IconeLixeira></IconeLixeira>
          </div>

          <h1 className="font-outfit-bold text-primary-800 mt-6 text-xl">Deletar Usuário</h1>
          <h1 className="font-satoshi  text-primary-800 text-base">
            Tem certeza que deseja excluir usuário?
          </h1>
          <h1 className="font-satoshi text-primary-800 text-base">
            Essa ação não poderá ser desfeita.
          </h1>

          <div className="mt-8 flex w-full justify-evenly">
            <button
              className="bg-negative h-10 w-[45%] cursor-pointer rounded-md p-1 text-white"
              onClick={() => {props.handleAbrirModalDelete()
                                   handleDeleteUser()
              }}
            >
              Deletar
            </button>
            <button
              className="bg-primary-100/80 h-10 w-[45%] cursor-pointer rounded-md p-1 text-white"
              onClick={() => props.handleAbrirModalDelete()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </article>
    </section>,
    document.body
  )
}
