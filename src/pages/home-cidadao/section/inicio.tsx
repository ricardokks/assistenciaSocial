import { InicioBanner } from '../../../components/banner'
import { HeaderDashboards } from '../../../components/header'
import { InicioDashBoard } from '../../../components/Inicio/InicioDashBoard'
import type { IHomeProps } from '../../../types/interface-home-props'

export function Inicio(data: IHomeProps) {
  return (
    <main className="flex h-screen w-[calc(100%-20%)] flex-col items-center space-y-6 overflow-y-auto px-4 max-md:w-full max-md:px-0">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="CIDADAO" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>
      <InicioBanner />
      <div className="mt-2 h-full w-[90%] px-4 py-0">
        <h1 className="font-satoshi-black text-primary-800 text-2xl">
          {data.user === 'CIDADAO' ? 'Notificações' : 'Informações Gerais'}
        </h1>
        <InicioDashBoard.root>
            <InicioDashBoard.notificacao />
        </InicioDashBoard.root>
      </div>
    </main>
  )
}
