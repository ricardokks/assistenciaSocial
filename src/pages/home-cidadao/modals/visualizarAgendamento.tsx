import { X, Download } from "lucide-react";
import { Modal } from "../../../components/ui/modal";
import type { SolicitacaoDTO } from "../../../types/type-solicitacoes";

type IVisualizarAgendamento = {
    open: boolean;
    close: () => void;
    solicitacao?: SolicitacaoDTO
};

export function VisualizarAgendamento({ open, close, solicitacao }: IVisualizarAgendamento) {
    return (
        <Modal open={open} close={close}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white w-[40%] h-[62%] max-w-[600px] max-h-[28rem] 
                relative rounded-xl flex flex-col items-center transition-all duration-500  max-md:w-[95%] max-md:z-50 max-md:h-4/5 min-h-[430px]
                ${open ? "opacity-100 scale-100" : "opacity-0 scale-125"}`}
            >
                {/* Cabeçalho */}
                <div className="w-full bg-primary-800 py-3 font-outfit font-bold text-white flex items-center justify-between px-4 text-2xl rounded-t-xl">
                    <h1>Comprovante de Confirmação</h1>
                    <X
                        onClick={close}
                        className="size-8 hover:text-red-500 duration-300 cursor-pointer"
                        strokeWidth={3}
                    />
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col items-center text-center px-6 mt-5 space-y-5 font-outfit text-primary-800">
                    {/* Informações importantes */}
                    <div>
                        <h2 className="text-lg font-bold">Informações importantes</h2>
                        <p className="text-sm font-satoshi text-primary-800/80 mt-1 max-w-[420px]">
                            Suas informações de agendamento estão descritas abaixo. 
                            Por favor, apresente este comprovante no dia do seu atendimento.
                        </p>
                    </div>

                    {/* Informações do Agendamento */}
                    <div>
                        <h2 className="text-lg font-bold">Informações do Agendamento</h2>

                        <div className="flex flex-col mt-3 text-[15px] space-y-1">
                            <span className="font-bold">Data do Atendimento</span>
                            <span className="font-satoshi">Dia {solicitacao?.data}</span>

                            <span className="font-bold mt-3">Observação</span>
                            <span className="font-satoshi text-[14px]">
                                {solicitacao?.observacoes}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Botão baixar comprovante */}
                <button
                    onClick={() => console.log("Baixar comprovante")}
                    className="mt-5 bg-primary-800 text-white font-outfit flex items-center gap-2 px-6 py-2 rounded-xl shadow-md hover:shadow-lg duration-300 cursor-pointer"
                >
                    <Download className="size-5" />
                    Baixar comprovante
                </button>
            </div>
        </Modal>
    );
}
