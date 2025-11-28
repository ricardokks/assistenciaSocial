import { Trash2, X } from 'lucide-react'

import { toast } from 'sonner'

import { Modal } from '../../../components/ui/modal'

type IDeletarAgendamento = {
  open: boolean
  close: () => void
  onDelete: () => void
}

export function DeletarAgendamento({ open, close, onDelete }: IDeletarAgendamento) {
  return (
    <Modal close={close} open={open}>
      <div
        className={`relative flex h-[55%] w-[30%] flex-col items-center justify-center rounded-lg bg-black/80 px-2 duration-300 ease-in-out max-xl:max-h-[500px] max-xl:w-2/3 max-xl:max-w-[550px] max-lg:max-h-[430px] max-md:z-50 max-md:max-h-[350px] max-md:w-[90%] ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Trash2 className="aspect-square size-40 text-red-500 max-md:size-32" />
        <div className="mt-3 flex w-full flex-col items-center justify-center pt-1">
          <h1 className="font-poppins white text-[20px] font-extrabold text-white max-lg:text-2xl max-md:text-[18px]">
            DELETAR AGENDAMENTO
          </h1>
          <h2 className="font-albert text-primary-200 max-lg:text-md text-center text-[14px] font-medium text-white">
            Você tem certeza que deseja deletar esse agendamento?
          </h2>
        </div>
        <div className="flex h-1/5 w-full items-center justify-center pt-5">
          <button
            className="font-poppins flex w-3/5 cursor-pointer items-center justify-center rounded-lg bg-red-500 py-1 text-[18px] font-semibold text-white duration-500 hover:bg-red-600 max-lg:w-4/5 max-lg:text-xl"
            onClick={async () => {
              onDelete()
              toast.message('Agendamento cancelado com sucesso!')
              close()
            }}
          >
            Deletar
          </button>
        </div>

        <X
          className="absolute right-1 top-2 size-fit cursor-pointer text-white duration-500 hover:text-red-500 max-md:w-8"
          onClick={close}
        />
      </div>
    </Modal>
  )
}
