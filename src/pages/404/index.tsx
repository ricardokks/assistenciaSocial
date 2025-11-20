import { ArrowBigLeft, ArrowLeft, HomeIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { OndasAzulClaro, OndasAzulEscuro } from '../../assets/Icons/ondas'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center background-gradient">
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 opacity-20">
        <OndasAzulEscuro />
      </div>

      {/* Decorative curved lines - bottom left */}
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 opacity-20 rotate-180">
        <OndasAzulClaro />
      </div>

      <div  className="absolute animation-MoveUpandDown top-16 w-16 aspect-square bg-[#83AAF3]/80 rounded-full flex items-center justify-center shadow-2xl shadow-black/40 max-md:w-16 max-lg:w-20">
        <HomeIcon className="text-white w-10 h-10 max-md:w-8 max-md:h-8 max-lg:w-12 max-lg:h-12" />
      </div>

      <div className="justify-center items-center text-center text-white font-outfit -space-y-5">
        <h1 className="text-[150px] font-bold max-lg:text-[100px]">404</h1>
        <h2 className="text-2xl font-bold mb-5 max-lg:text-xl max-md:mb-1">
          Página Não Encontrada
        </h2>
        <p className="text-lg font-satoshi max-md:text-sm ">
          Desculpe, a página que você está procurando não existe.
        </p>
      </div>
      <div className="mt-8 space-x-4 flex w-[35%] max-lg:w-3/4 max-2xl:max-w-[500px] text-sm max-lg:flex-col max-lg:space-y-4">
        <div
          onClick={() => navigate('/')}
          className="flex items-center justify-center bg-white rounded-2xl space-x-3 py-3 hover:scale-105 duration-500 w-[90%] max-lg:w-full"
        >
          <HomeIcon className="text-[#4f9bff] w-5 h-5" />
          <button className="cursor-pointer font-satoshi font-bold text-[#4f9bff]">
            Voltar para a página inicial
          </button>
        </div>

        <div
          onClick={() => navigate(-1)}
          className="flex items-center justify-center cursor-pointer font-bold font-satoshi py-3 rounded-2xl  hover:scale-105 duration-500 text-white outline-2 outline-white w-[90%] space-x-3 max-lg:w-full"
        >
          <ArrowLeft className="text-white -translate-x-1 w-5 h-5" />
          <button className="cursor-pointer font-satoshi font-bold ">Página anterior</button>
        </div>
      </div>
    </main>
  )
}
