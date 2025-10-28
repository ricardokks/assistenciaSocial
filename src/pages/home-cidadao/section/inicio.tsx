import { HeaderDashboards } from '../../../components/Header'
import { InicioBanner } from '../../../components/home/banner'
import type { IHomeProps } from '../../../types/interface-home-props'

export function Inicio(data: IHomeProps) {
  return (
    <main className="w-[calc(100%-25%)] py-2">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="PROFISSIONAL" />
      </HeaderDashboards.root>
      {/* Banner */}
      <InicioBanner />
      <div className="h-full mt-2 w-[90%] py-0 px-4">
        <h1 className="font-satoshi-black text-2xl text-primary-800">
          {data.user === 'CIDADAO' ? 'Notificações' : 'Informações Gerais'}
        </h1>
        <div className=""></div>
      </div>
    </main>
  )
}
