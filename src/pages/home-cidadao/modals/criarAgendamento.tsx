import { ChevronDown, X } from "lucide-react";
import { Modal } from "../../../components/ui/modal";
import { useState } from "react";

type ICriarAgendamento = {
    open: boolean;
    close: () => void;
};

export function CriarAgendamento({ open, close }: ICriarAgendamento) {
    const [isAnimate, setIsAnimate] = useState(false)
    const [isAnimate2, setIsAnimate2] = useState(false)

    return (
        <Modal open={open} close={close}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white w-[40%] h-[62%] max-w-[600px] max-h-[450px] relative rounded-xl flex flex-col items-center transition-all duration-500 
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-125"}`}
            >
                {/* Cabeçalho */}
                <div className="w-full bg-primary-800 py-2 font-outfit font-bold text-white flex items-center justify-between px-3 text-2xl rounded-t-xl">
                    <h1>Novo Agendamento</h1>
                    <X
                        onClick={close}
                        className="size-8 hover:text-red-500 duration-300 cursor-pointer"
                        strokeWidth={3}
                    />
                </div>

                {/* Inputs */}
                <div className="w-full px-6 mt-5 space-y-4">

                    {/* Assistência */}
                    <div className="flex flex-col w-full relative">
                        <label className="text-primary-800 font-outfit text-[14px] mb-1">
                            Selecione a Assistência
                        </label>
                        <select
                            onMouseDown={() => setIsAnimate((prev) => !prev)}
                            onMouseLeave={() => setIsAnimate(false)}
                            onMouseUp={() => setIsAnimate(false)}
                            onClick={() => setIsAnimate((prev) => !prev)}
                            className="w-full pl-2 py-2 border-1 border-primary-800 rounded-lg text-[14px] text-primary-800 outline-none appearance-none"
                        >
                            <option value="">Selecionar</option>
                            <option value="CRAS">CRAS</option>
                            <option value="CREAS">CREAS</option>
                            <option value="CasaLar">Casa Lar</option>
                        </select>
                        <ChevronDown
                            className={`absolute right-1.5 top-9 size-5 transition-all duration-500 text-primary-800 ${isAnimate ? 'rotate-180' : 'rotate-0'
                                }`}
                            strokeWidth={3}
                        />
                    </div>

                    {/* Serviço */}
                    <div className="flex flex-col w-full relative">
                        <label className="text-primary-800 font-outfit text-[14px] mb-1">
                            Selecione o Serviço que deseja
                        </label>
                        <select
                            onMouseDown={() => setIsAnimate2((prev) => !prev)}
                            onMouseLeave={() => setIsAnimate2(false)}
                            onMouseUp={() => setIsAnimate2(false)}
                            onClick={() => setIsAnimate2((prev) => !prev)}
                            className="w-full pl-2 py-2 border-1 border-primary-800 rounded-lg text-[14px] text-primary-800 outline-none appearance-none"
                        >
                            <option value="">Selecionar serviço</option>
                            <option value="AtualizaçãoCadastral">Atualização cadastral</option>
                            <option value="Benefícios">Benefícios</option>
                            <option value="AtendimentoSocial">Atendimento social</option>
                        </select>
                         <ChevronDown
                            className={`absolute right-1.5 top-9 size-5 transition-all duration-500 text-primary-800 ${isAnimate2 ? 'rotate-180' : 'rotate-0'
                                }`}
                            strokeWidth={3}
                        />
                    </div>

                    {/* Observações */}
                    <div className="flex flex-col w-full">
                        <label className="text-primary-800 font-outfit text-[14px] mb-1">
                            Observações
                        </label>
                        <textarea
                            className="w-full px-3 py-2 min-h-[80px] border-1 border-primary-800 rounded-lg text-primary-800 outline-none resize-none"
                            placeholder="Digite alguma observação..."
                        ></textarea>
                    </div>

                    {/* Botão */}
                    <div className="w-full flex items-center justify-center">
                        <button className="w-2/4 bg-primary-800 text-white py-2 rounded-lg font-outfit hover:bg-primary-800/90 duration-300 shadow cursor-pointer font-bold">
                        Criar Agendamento
                    </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
