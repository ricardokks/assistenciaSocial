import { Trash2, X } from "lucide-react";
import { Modal } from "../../../components/ui/modal";
import { toast } from "sonner";

type IDeletarAgendamento = {
    open: boolean;
    close: () => void;
    onDelete: () => void
};

export function DeletarAgendamento({ open, close, onDelete }: IDeletarAgendamento) {
    return (
        <Modal open={open} close={close}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-black/80 flex flex-col items-center justify-center px-2 w-[30%] h-[55%] max-md:h-[58%] max-md:w-[80%] max-lg:h-1/2 max-lg:w-1/2 max-md:max-h-[350px] max-lg:max-h-[430px] max-xl:max-h-[500px] max-xl:w-2/3 max-xl:max-w-[550px] rounded-lg relative duration-300 ease-in-out ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}>
                <Trash2 className="w-40 h-40 aspect-square text-red-500" />
                <div className="flex flex-col w-full items-center justify-center pt-1 mt-3">
                    <h1 className="font-poppins font-extrabold text-[20px] text-white white max-lg:text-2xl">DELETAR AGENDAMENTO</h1>
                    <h2 className="font-albert font-medium text-[14px] text-white text-primary-200 text-center max-lg:text-md">Você tem certeza que deseja deletar esse agendamento?</h2>
                </div>
                <div className="w-full items-center h-1/5 flex justify-center pt-5">
                    <button
                        onClick={async () => {
                            onDelete()
                            toast.message("Agendamento cancelado com sucesso!")
                            close()
                        }}
                        className="flex items-center justify-center w-3/5 py-1 font-poppins font-semibold text-white bg-red-500 cursor-pointer hover:bg-red-600 duration-500 text-[18px] rounded-lg max-lg:w-4/5 max-lg:text-xl">Deletar</button>
                </div>

                <X onClick={close} className="absolute w-fit h-fit top-2 right-1 hover:text-red-500 text-white duration-500 cursor-pointer " />
            </div>
        </Modal>
    )
}