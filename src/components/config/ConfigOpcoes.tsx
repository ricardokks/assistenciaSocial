import { Bell, Moon, User, Edit2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { IconeMensagemQuadrada } from "../../assets/Icons/icone-mensagem-quadrada";
import { configSchema } from "../../schemas/userConfigSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { typeConfig } from "../../types/type-config";
import { toast } from "sonner";


export function ConfigOpcoes(data: { id?: string, values: typeConfig }) {

    const [isAnimate, setIsAnimate] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [libras, setLibras] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);

    const { register, handleSubmit } = useForm<typeConfig>({
        resolver: zodResolver(configSchema), 
        defaultValues: {
            idioma: "PORTUGUES",
            tamanhoFonte: 16,
            altoContraste: false,
            leitorTela: false,
        },
    })

    async function onSubmit(data: typeConfig){
        try {
           // await updateUser()
        } catch {
            toast.error("Erro ao atualizar as suas informações ")
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-5xl px-4 py-6 space-y-4 mt-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col space-y-5">
                {/* Escala da fonte */}
                <div>
                    <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <IconeMensagemQuadrada />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                                Escala da fonte dos textos
                            </h3>
                            <p className="text-sm text-gray-500">
                                Aumente ou diminua a quantidade de zoom e o tamanho das fontes no geral
                            </p>
                        </div>
                        <div className="w-1/9 min-w-20 mt-2 relative">
                            <select
                                {...register('tamanhoFonte')}
                                onMouseDown={() => setIsAnimate(prev => !prev)}
                                onMouseUp={() => setIsAnimate(false)}
                                onMouseLeave={() => setIsAnimate(false)}
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="border border-gray-300 rounded-lg px-2 py-2 text-sm bg-white outline-none w-full appearance-none "
                            >
                                <option value="12">12 px</option>
                                <option value="14">14 px</option>
                                <option value="16">16 px</option>
                                <option value="18">18 px</option>
                                <option value="20">20 px</option>
                                <option value="22">22 px</option>
                                <option value="24">24 px</option>
                            </select>
                            <ChevronDown
                                className={`absolute top-2.5 right-1.5 h-5 w-5 duration-500 transition-all ${isAnimate ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-gray-800/20 rounded-2xl" />
                {/* Libras */}
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <IconeMensagemQuadrada />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Libras</h3>
                                <p className="text-sm text-gray-500">
                                    Ative o tradutor e utilização de libras como linguagem
                                </p>
                            </div>
                        </div>
                        <button
                            {...register('leitorTela')}
                            onClick={() => setLibras(!libras)}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${libras ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${libras ? "translate-x-6" : "translate-x-0"
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Notificações */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <Bell className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Notificações</h3>
                            <p className="text-sm text-gray-500">
                                Ative ou desative as notificações no no aparelho
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setNotifications(!notifications)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${notifications ? "bg-green-500" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${notifications ? "translate-x-6" : "translate-x-0"
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Conta */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <User className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Conta</h3>
                            <p className="text-sm text-gray-500">Gerencie as descrições do seu perfil e sua conta</p>
                        </div>
                    </div>
                    <button className="text-gray-700 hover:text-gray-900 transition-colors">
                        <Edit2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Botão Salvar */}
            <div className="pt-4 w-full flex items-center justify-center">
                <button 
                    type="submit"
                    className="w-1/3 bg-primary-800 text-white py-2 rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer">
                    Salvar Alterações
                </button>
            </div>
        </form>
    )
}