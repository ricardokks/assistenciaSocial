import ReactDOM from 'react-dom'

import { IconeClosed } from '../../../../assets/Icons/IconeClosed'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'
import type { ModalDeleteAssistenciaProps } from '../../../../types/interface-modal-deletar-assistencia'
import { deleteAssistencia } from '../../../../api/assistencia/deleteAssistencia'
import { toast } from 'sonner'

export function ModalDeletarInst(props: ModalDeleteAssistenciaProps) {

 async function handleDeleteInst() {
  try {
    await deleteAssistencia(props.id)

    toast.success('Instituição deletada com sucesso!')
    props.refreshAssistencias()
    props.handleAbrirModalDelete()
  } catch (error: any) {
    const message =
      error?.response?.data?.message ??
      'Erro ao deletar instituição. Por favor, tente novamente.'

    toast.error(message)
  }
}



  return ReactDOM.createPortal(
    <section
      className={`${props.abrilModalAssistencia ? 'opacity-100' : 'pointer-events-none opacity-0'} fixed top-0 z-[9999] flex  h-screen w-full items-center justify-center bg-black/50 backdrop-blur-[3px] transition-all duration-500 ease-in-out`}
    >
      {/* Modal de Criação do Agendamento  */}
      <article
        className={` ${props.abrilModalAssistencia ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} relative flex size-[30%] h-auto min-w-[360px] items-start justify-between rounded-2xl bg-white p-7 px-4 transition-all duration-300 ease-in-out max-md:w-[80%]`}
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

          <h1 className="font-outfit-bold text-primary-800 mt-6 text-xl">Deletar Instituição</h1>
          <h1 className="font-satoshi  text-primary-800 text-base">
            Tem certeza que deseja excluir instituição??
          </h1>
          <h1 className="font-satoshi text-primary-800 text-base">
            Essa ação não poderá ser desfeita.
          </h1>

          <div className="mt-8 flex w-full justify-evenly">
            <button
              className="bg-negative h-10 w-[45%] cursor-pointer rounded-md p-1 text-white"
              onClick={() => {

                handleDeleteInst()
                props.handleAbrirModalDelete()}
                
              }
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
