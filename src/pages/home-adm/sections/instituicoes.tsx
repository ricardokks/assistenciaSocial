import { useState } from 'react'
import { IconeMais } from '../../../assets/Icons/icone-mais'
import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/header'
import { Instituicao } from '../components/layout/instituicao'

export function Instituicoes() {

    const [abrirModalDelete, setAbrirModalDelete] = useState<boolean>(false)
    const [abrirModalCreate, setAbrirModalCreate] = useState<boolean>(false)
    const [abrirModalEdit, setAbrirModalEdit] = useState<boolean>(false)
  
    const [idInstituicao, setIdInstituicao] = useState<string>('')
    const [instituicao, setInstituicao] = useState<any>()

  return (
    <main className="flex h-full w-[calc(100%-20%)] overflow-hidden flex-col items-start space-y-6 pr-4 max-md:w-full max-md:px-4">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="ADMINISTRADOR" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      <div className="flex size-full flex-col">
        <h1 className="font-outfit-bold text-primary-800 text-xl">Instituições</h1>
        <div className="flex w-full justify-between mt-3">
          <div className="relative w-2/3">
            <IconeSearch className="absolute mt-3 translate-x-3"></IconeSearch>
            <input
              className="font-satoshi border-primary-800 text-primary-800 placeholder:text-primary-800/65 w-full rounded-2xl border-2 p-2 pl-9 outline-0"
              placeholder="Procurar por nome..."
              type="text"
            />
          </div>

          <button onClick={() => setAbrirModalCreate(true)} className="bg-primary-800 font-outfit-bold hover:bg-primary-800/90 flex cursor-pointer items-center justify-center gap-3 rounded-[5.97px]  p-2 text-white duration-500 ease-in-out">
            <IconeMais className="size-4 text-white" /> Nova Instituição
          </button>
        </div>

        <div className='w-full h-[2px] bg-primary-800/20 mt-4'></div>

        <div className='w-full grid grid-cols-3 gap-2 overflow-y-auto overflow-x-hidden mb-28 h-full mt-2'>

         <Instituicao></Instituicao>

        </div>

        
      </div>
    </main>
  )
}
