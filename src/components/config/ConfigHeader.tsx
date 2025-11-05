import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ConfigHeader({ link }: { link: string }) {
    const navigate = useNavigate()

    return (
        <header className="bg-primary-800 flex w-full max-w-[150rem] items-center gap-3 px-6 py-4 text-white">
            <button
                className="transition-opacity hover:opacity-80 "
                onClick={() => navigate(link)}>
                <ChevronLeft className="size-8" />
            </button>
            <h1
                className="text-xl font-bold"
                onClick={() => navigate(link)}>Configurações Gerais</h1>
        </header>
    )
}