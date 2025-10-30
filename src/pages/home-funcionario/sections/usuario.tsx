import { IconeMais } from '../../../assets/Icons/icone-mais'
import { HeaderDashboards } from '../../../components/Header'
import { CardAgendamento } from '../components/card-agendamento'

export function Usuario() {
  return (
    <main className="flex h-full w-[calc(100%-20%)] max-md:px-4 pr-4 flex-col items-start overflow-y-auto space-y-6 max-md:w-full">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="PROFISSIONAL" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>
      {/* conteudo principal  */}
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-primary-800 font-outfit-bold text-[1.3rem]">Agendamentos</h1>

          <button className="bg-primary-800 flex items-center text-white p-2 rounded-[5.97px] font-outfit-bold cursor-pointer hover:bg-primary-800/90  duration-500 ease-in-out justify-center gap-3">
            <IconeMais className="text-white size-4" /> Novo Agendamento
          </button>
        </div>

        {/* renderização dos cards  */}
        <div className='grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8'>
          <CardAgendamento />
          <CardAgendamento />
          <CardAgendamento />
        </div>
      </div>
    </main>
  )
}
