import { useState } from 'react'

import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/header'
import { CardProjeto } from '../../lading-page/components/card-projeto'


export function Servicos(user: { user: any, onClick: (item: any) => void, assistencia: any }) {
  const { data } = user.assistencia

  const [searchTerm, setSearchTerm] = useState('')
  const cardsFiltrados = data.filter((item: any) => {
    const termo = searchTerm.trim().toLowerCase()

    if (termo === '') return true

    return item.titulo.toLowerCase().includes(termo)
  })

  return (
    <main className="main flex-col items-center overflow-y-auto px-4 max-lg:w-full max-lg:px-0">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={user.user} user="CIDADAO" />
      </HeaderDashboards.root>
      <div className="flex size-full flex-col px-4 py-1 pl-0 max-xl:px-0 max-lg:px-2">
        {/* Texto */}
        <h1 className="font-satoshi-bold text-primary-800 text-2xl max-lg:pl-1 max-lg:text-lg">
          {' '}
          Serviços Sociais
        </h1>
        {/* div do Input */}
        <div className="relative flex w-[55%] max-xl:w-4/5 max-lg:w-full">
          {/* Icone search */}
          <IconeSearch className="absolute left-3 top-[1.55rem]" />
          <input
            className="font-satoshi border-primary-800 text-primary-800 placeholder:text-primary-800/65 placeholder:font-satoshi mt-3  size-full rounded-2xl border-2 px-2 py-1 pl-10 shadow shadow-black/10 outline-none outline-0 max-xl:pl-10"
            placeholder="Procure pelo nome..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-10 grid w-full grid-cols-[repeat(auto-fit,minmax(400px,1fr))] max-xl:flex-col max-xl:items-center max-xl:justify-center max-xl:space-y-6 max-xl:pb-[8rem] max-lg:flex xl:gap-10">
          {cardsFiltrados.map((item: any, idx: any) => (
            <CardProjeto
              key={idx}
              animation={false}
              descricao={item.sobre}
              foto={item.icone}
              subtitulo={item.subnome}
              titulo={item.unidade}
              onClick={() => user.onClick(item)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
