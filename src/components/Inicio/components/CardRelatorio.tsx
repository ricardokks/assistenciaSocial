import { ClipboardList, DownloadCloud } from 'lucide-react'
import { useState } from 'react'

import { toast } from 'sonner'

export function CardRelatorio(data: {
  nomeMes: string
  numeroMes: number
  ano: number
  dados: any
  gerarRelatorio: () => void
}) {
  const [isAnimate, setIsAnimate] = useState(false)
  let mes

  async function handleDownload() {
    setIsAnimate(true)
    toast.info('Iniciando download do relatório...')
    data.gerarRelatorio()
    setTimeout(() => setIsAnimate(false), 2000)
  }

  if (data.numeroMes < 10) {
    mes = `0${data.numeroMes}`
  } else {
    mes = data.numeroMes
  }

  return (
    <div className="border-primary-800 flex size-full min-h-[4rem] items-center justify-between overflow-y-hidden rounded-2xl border-2 bg-transparent px-4 py-3 shadow shadow-black/40 max-md:px-2">
      <div className="flex items-center space-x-2">
        <ClipboardList className="text-primary-800 size-10 max-md:size-6" />
        <div className="font-satoshi text-primary-800 flex flex-col font-bold">
          <h1 className="text-[18px] max-md:text-[14px]">Relatório de {data.nomeMes}</h1>
          <h1 className="text-medium text-[12px] max-md:text-[10px]">
            01/{mes}/{data.ano}
          </h1>
        </div>
      </div>

      <button
        className={`bg-primary-800/80 font-outfit md:hover:bg-primary-800 max-md:active:bg-primary-800 flex w-auto cursor-pointer items-center space-x-2 rounded-xl px-4 py-2 font-bold text-white duration-500 max-md:whitespace-nowrap max-md:px-2 max-md:text-[10px] max-md:duration-700 ${isAnimate ? 'shake' : ''}`}
        onClick={handleDownload}
      >
        <DownloadCloud className="size-5 max-md:size-4" />
        <h1>Baixar relatório</h1>
      </button>
    </div>
  )
}
