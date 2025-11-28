import { ArrowBigLeft, ArrowLeft, HomeIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { OndasAzulClaro, OndasAzulEscuro } from '../../assets/Icons/ondas'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="background-gradient flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute right-0 top-0 size-32 opacity-20 sm:size-48 md:size-64">
        <OndasAzulEscuro />
      </div>

      {/* Decorative curved lines - bottom left */}
      <div className="absolute bottom-0 left-0 size-32 rotate-180 opacity-20 sm:size-48 md:size-64">
        <OndasAzulClaro />
      </div>

      <div className="animation-MoveUpandDown absolute top-16 flex aspect-square w-16 items-center justify-center rounded-full bg-[#83AAF3]/80 shadow-2xl shadow-black/40 max-lg:w-20 max-md:w-16">
        <HomeIcon className="size-10 text-white max-lg:size-12 max-md:size-8" />
      </div>

      <div className="font-outfit items-center justify-center -space-y-5 text-center text-white">
        <h1 className="text-[150px] font-bold max-lg:text-[100px]">404</h1>
        <h2 className="mb-5 text-2xl font-bold max-lg:text-xl max-md:mb-1">
          Página Não Encontrada
        </h2>
        <p className="font-satoshi text-lg max-md:text-sm ">
          Desculpe, a página que você está procurando não existe.
        </p>
      </div>
      <div className="mt-8 flex w-[35%] space-x-4 text-sm max-2xl:max-w-[500px] max-lg:w-3/4 max-lg:flex-col max-lg:space-y-4">
        <div
          className="flex w-[90%] items-center justify-center space-x-3 rounded-2xl bg-white py-3 duration-500 hover:scale-105 max-lg:w-full"
          onClick={() => navigate('/')}
        >
          <HomeIcon className="size-5 text-[#4f9bff]" />
          <button className="font-satoshi cursor-pointer font-bold text-[#4f9bff]">
            Voltar para a página inicial
          </button>
        </div>

        <div
          className="font-satoshi flex w-[90%] cursor-pointer items-center justify-center space-x-3 rounded-2xl  py-3 font-bold text-white outline-2 outline-white duration-500 hover:scale-105 max-lg:w-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="size-5 -translate-x-1 text-white" />
          <button className="font-satoshi cursor-pointer font-bold ">Página anterior</button>
        </div>
      </div>
    </main>
  )
}
