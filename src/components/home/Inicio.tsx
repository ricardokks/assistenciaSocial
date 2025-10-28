import type { IHomeProps } from '../../types/interface-home-props'
import { HeaderDashboards } from '../Header'
import { InicioDados } from './InicioDados'
import { InicioNotificacao } from './InicioNotificacao'
import { InicioBanner } from './banner'
import { InicioDashBoard } from './inicioDashBoard'

export function Inicio({ user }: IHomeProps) {
  return (
    <main className="h-full w-[calc(100%-20%)] flex flex-col items-center space-y-6">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user={user} />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>
      {/* Banner */}
      <InicioBanner />
      <InicioDashBoard.root>
        {user === 'CIDADAO' ? <InicioNotificacao /> : <InicioDados />}
      </InicioDashBoard.root>
    </main>
  )
}
