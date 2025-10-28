import { InicioBanner } from '../../../components/banner'
import { HeaderDashboards } from '../../../components/Header'
import type { IHomeProps } from '../../../types/interface-home-props'

export function Inicio(data: IHomeProps) {
  return (
    <main className="w-[calc(100%-25%)] py-2">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="PROFISSIONAL" />
      </HeaderDashboards.root>
      {/* Banner */}
      <InicioBanner />
      <div className="mt-2 h-full w-[90%] px-4 py-0">
        <h1 className="font-satoshi-black text-primary-800 text-2xl">
          {data.user === 'CIDADAO' ? 'Notificações' : 'Informações Gerais'}
        </h1>
        <div className=""></div>
      </div>
    </main>
  )
}
