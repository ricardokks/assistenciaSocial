import { IconeMais } from '../../../assets/Icons/icone-mais'
import { HeaderDashboards } from '../../../components/header'
import { IconeSearch } from '../../../assets/Icons/icone-search'

export function Usuarios() {
  return (
    <main className="flex h-full w-[calc(100%-20%)] pr-4 flex-col items-start space-y-6 max-md:px-4 max-md:w-full">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="ADMINISTRADOR" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      <div className="w-full h-full flex flex-col">
        <h1 className="font-outfit-bold text-xl text-primary-800">Usuários</h1>
        <div className="w-full flex justify-between">
          <div className='w-2/3 relative'>
          <IconeSearch className='translate-x-3 absolute mt-3'></IconeSearch>
          <input
            type="text"
            className="w-full py-2 outline-0 border-2 font-satoshi rounded-2xl px-2 pl-9 border-primary-800 text-primary-800 placeholder:text-primary-800/65"
            placeholder="Procurar por nome..."
          />
          </div>

          <button className="bg-primary-800 flex items-center text-white p-2 rounded-[5.97px] font-outfit-bold cursor-pointer hover:bg-primary-800/90  duration-500 ease-in-out justify-center gap-3">
            <IconeMais className="text-white size-4" /> Novo Usuário
          </button>
        </div>
      </div>
    </main>
  )
}
