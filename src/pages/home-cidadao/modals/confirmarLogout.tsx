import { LogOut, X } from 'lucide-react'
import { Modal } from '../../../components/ui/modal'

type LogoutModalProps = {
  open: boolean
  close: () => void
  onConfirm: () => void
}

export function LogoutModal({ open, close, onConfirm }: LogoutModalProps) {
  return (
    <Modal open={open} close={close}>
      <div
        className={`relative flex h-[55%] w-[30%] flex-col items-center justify-center rounded-lg bg-black/80 px-4 duration-300 ease-in-out
        max-xl:w-2/3 max-lg:max-h-[430px]
        max-md:z-50 max-md:h-[45%] max-md:w-[90%]
        ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <LogOut className="size-36 text-red-500 max-md:size-28" />

        <div className="mt-4 flex flex-col items-center gap-1 text-center">
          <h1 className="font-poppins text-xl font-extrabold text-white">
            SAIR DA CONTA
          </h1>

          <p className="font-albert text-sm text-white/80">
            Você realmente deseja sair da sua conta?
          </p>
        </div>

        <div className="mt-6 flex w-full justify-center">
          <button
            className="font-poppins w-3/5 rounded-lg bg-red-500 py-2 text-lg font-semibold text-white duration-300 hover:bg-red-600 max-md:w-4/5"
            onClick={onConfirm}
          >
            Sair
          </button>
        </div>

        <X
          className="absolute right-3 top-3 cursor-pointer text-white duration-300 hover:text-red-500"
          onClick={close}
        />
      </div>
    </Modal>
  )
}
