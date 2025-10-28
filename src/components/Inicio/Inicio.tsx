import type { IHomeProps } from '../../types/interface-home-props'
import { InicioBanner } from '../banner'
import { HeaderDashboards } from '../Header'
import { InicioDados } from './InicioDados'
import { InicioNotificacao } from './InicioNotificacao'
import { InicioDashBoard } from './InicioDashBoard'

export function Inicio({ user }: IHomeProps) {
  return (
    <main className="flex h-full w-[calc(100%-20%)] flex-col items-center space-y-6 max-md:w-full">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user={user} />
        {user !== 'CIDADAO' ? <HeaderDashboards.notificacao /> : null}
      </HeaderDashboards.root>

      {/* Banner */}
      <InicioBanner />

      {/* Container Principal  */}
      <InicioDashBoard.root>
        {user === 'CIDADAO' ? <InicioNotificacao /> : <InicioDados />}
      </InicioDashBoard.root>
    </main>
  )
}
