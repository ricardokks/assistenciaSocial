import { useParams } from "react-router-dom"

export function Config() {
    const { id } = useParams()

    return (
        <main className="flex flex-col h-screen w-screen items-center ">
            <div className="bg-primary-800  w-full mt-0 h-24 flex items-center pl-5 space-x-4">
                <svg width="22" height="22" viewBox="0 0 19 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 32L2 17L17 2" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h1 className="font-bold font-satoshi text-xl text-white">Configurações Gerais</h1>
            </div>
            <h1>oi</h1>
        </main>
    )
}   