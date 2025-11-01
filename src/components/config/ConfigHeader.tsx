import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ConfigHeader({ link }: { link: string }) {
    const navigate = useNavigate()

    return (
        <header className="w-full bg-primary-800 text-white py-4 px-6 flex items-center gap-3 max-w-[150rem]">
            <button
                onClick={() => navigate(link)}
                className="hover:opacity-80 transition-opacity ">
                <ChevronLeft className="w-8 h-8" />
            </button>
            <h1
                onClick={() => navigate(link)}
                className="text-xl font-bold">Configurações Gerais</h1>
        </header>
    )
}