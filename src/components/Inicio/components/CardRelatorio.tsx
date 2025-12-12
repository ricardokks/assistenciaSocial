import { ClipboardList, DownloadCloud } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CardRelatorio(data: { nomeMes: string, numeroMes: number, ano: number, dados: any, gerarRelatorio: () => void }) {

    const [isAnimate, setIsAnimate] = useState(false);
    let mes

    async function handleDownload() {
        setIsAnimate(true);
        toast.info('Iniciando download do relatório...');
        data.gerarRelatorio();
        setTimeout(() => setIsAnimate(false), 2000);
    }

    if (data.numeroMes < 10){
        mes = `0${data.numeroMes}`;
    } else {
        mes = data.numeroMes;
    }
    
    return (
        <div className='w-full bg-transparent border-2 border-primary-800 rounded-2xl h-full min-h-[4rem] flex px-4 items-center justify-between py-3 shadow shadow-black/40 max-md:px-2 overflow-y-hidden'>
            <div className='flex space-x-2 items-center'>
                <ClipboardList className='size-10 text-primary-800 max-md:size-6' />
                <div className='flex flex-col font-satoshi font-bold text-primary-800'>
                    <h1 className='text-[18px] max-md:text-[14px]'>Relatório de {data.nomeMes}</h1>
                    <h1 className='text-medium text-[12px] max-md:text-[10px]'>01/{mes}/{data.ano}</h1>
                </div>
            </div>

            <button
                onClick={handleDownload}
                className={`px-4 py-2 bg-primary-800/80 rounded-xl text-white font-bold font-outfit flex items-center w-auto space-x-2 cursor-pointer md:hover:bg-primary-800 duration-500 max-md:text-[10px] max-md:whitespace-nowrap max-md:px-2 max-md:active:bg-primary-800 max-md:duration-700 ${isAnimate ? 'shake' : ''}`}
            >
                <DownloadCloud className='size-5 max-md:size-4' />
                <h1>Baixar relatório</h1>
            </button>
        </div>
    );
}
