import { ClipboardList, DownloadCloud } from "lucide-react";
import { useState } from "react";

export function CardRelatorio(data: { nomeMes: string, numeroMes: number, ano: number, dados: any, gerarRelatorio: () => void }) {

    const [isAnimate, setIsAnimate] = useState(false)
    return (
        <div className='w-full bg-transparent border-2 border-primary-800 rounded-2xl h-auto flex px-4 items-center justify-between py-3 shadow shadow-black/40 overflow-y-auto max-md:px-2'>
            <div className='flex space-x-2 items-center'>
                <ClipboardList className='size-10 text-primary-800 max-md:size-6' />
                <div className='flex flex-col font-satoshi font-bold text-primary-800'>
                    <h1 className='text-[18px] max-md:text-[14px]'>Relatório de {data.nomeMes}</h1>
                    <h1 className='text-medium text-[12px] max-md:text-[10px]'>01/0{data.numeroMes}/{data.ano}</h1>
                </div>

            </div>
            <button 
            onClick={() => {
                setIsAnimate(true)
                data.gerarRelatorio()
                setTimeout(() => setIsAnimate(false), 2000);
            }}
            className={`px-4 py-2 bg-primary-800/80 rounded-xl text-white font-bold font-outfit flex items-center w-auto space-x-2 cursor-pointer md:hover:bg-primary-800 duration-500 max-md:text-[10px] max-md:whitespace-nowrap max-md:px-2 max-md:active:bg-primary-800 max-md:duration-700 ${isAnimate ? 'shake' : ''}`}>
                <DownloadCloud className='size-5 max-md:size-4' />
                <h1>Baixar comprovante</h1>
            </button>
        </div>
    )
}