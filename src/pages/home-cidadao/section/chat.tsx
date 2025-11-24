import { useState } from "react";
import { IconeSearch } from "../../../assets/Icons/icone-search";
import { HeaderDashboards } from "../../../components/header";

export function Chat(user: {data: any}) {

    const [selectedId, setSelectedId] = useState(1)

    const dataButtons = [
        { id: 1, nome: "Não lidas" },
        { id: 2, nome: "Lidas" }
    ]

    const dataPeoples = [
        { nome: "Jonh doe", instituicao: "CRAS II", mensagem: "How are you doing?", tempo: "19:45" },
        { nome: "Jonhy", instituicao: "CRAS I", mensagem: "How are you doing?", tempo: "19:45" },
        { nome: "Jonh doe", instituicao: "CRAS II", mensagem: "How are you doing?", tempo: "19:45" },
        { nome: "Jonhy", instituicao: "CRAS I", mensagem: "How are you doing?", tempo: "19:45" },
        { nome: "Jonh doe", instituicao: "CRAS II", mensagem: "How are you doing?", tempo: "19:45" },
        { nome: "Jonhy", instituicao: "CRAS I", mensagem: "How are you doing?", tempo: "19:45" },
        { nome: "Jonh doe", instituicao: "CRAS II", mensagem: "How are you doing?", tempo: "19:45" },
        { nome: "Jonhy", instituicao: "CRAS I", mensagem: "How are you doing?", tempo: "19:45" }
    ]

    return (
        <main className="main flex-col h-screen items-center overflow-y-auto px-4 max-lg:w-full max-lg:px-0">
            <HeaderDashboards.root>
                <HeaderDashboards.perfil data={user.data} user="CIDADAO" />
                <HeaderDashboards.notificacao />
            </HeaderDashboards.root>

            {/* Parte dos users */}
            <div className="w-2/5 flex flex-col text-primary-800 h-full border-r-2">
                {/* text mensagem */}
                <h1 className="font-outfit font-medium text-2xl"> Mensagens </h1>

                {/* Input */}
                <div className="relative flex w-[95%] max-xl:w-4/5 max-lg:w-full">
                    <IconeSearch className="absolute left-2.5 top-[1.4rem] w-4 h-4" />
                    <input
                        className="font-satoshi bg-gray-500/20 text-primary-800 placeholder:text-primary-800/65 placeholder:font-satoshi mt-3 size-full rounded-2xl px-2 pl-8 shadow shadow-black/10 outline-none outline-0 max-xl:pl-10"
                        placeholder="Procure pelo usuário..."
                    />
                </div>

                {/* div nao lida, lidas */}
                <div className="relative flex w-3/5 space-x-3 mt-7">
                    {dataButtons.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            className={`
                                border border-primary-800 px-1 py-1
                                text-satoshi text-[12px] font-medium duration-500 w-3/5 rounded-full
                                ${selectedId === item.id
                                    ? "bg-primary-800 text-white"
                                    : "bg-transparent text-primary-800 hover:bg-gray-300/10"
                                }
                            `}
                        >
                            {item.nome}
                        </button>
                    ))}
                </div>

                {/* Pessoas */}
                <div className="w-full flex flex-col space-y-2 mt-3 overflow-y-auto  pr-2 h-4/5 pb-8">
                    {dataPeoples.map((item, index) => (
                        <div
                            key={index}
                            className="w-[95%] h-1/6 bg-gray-500/20 rounded-xl px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-300/50 duration-300"
                        >
                            {/* Esquerda: foto + informações */}
                            <div className="flex items-center gap-3">

                                {/* Foto do usuário */}
                                <div className="relative">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover bg-gray-600"
                                    />

                                    {/* Status online */}
                                    
                                </div>

                                {/* Nome + Message */}
                                <div className="flex flex-col">
                                    <span className="font-outfit text-primary-800 font-semibold -mb-1">
                                        {item.nome} - {item.instituicao}
                                    </span>

                                    <span className="font-satoshi text-[13px] text-primary-800/70">
                                        {item.mensagem}
                                    </span>
                                </div>
                            </div>

                            {/* Horário */}
                            <span className="font-satoshi text-[12px] text-primary-800/70">
                                {item.tempo}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
            {/* Painel Chat */}
            <div className="flex flex-col h-full w-full">
                    <div></div>
            </div>
        </main>
    )
}
