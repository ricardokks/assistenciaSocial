import type { IHomeProps } from '../../types/interface-home-props'
import { InicioBanner } from '../banner'
import { InicioDados } from './InicioDados'
import { InicioNotificacao } from './InicioNotificacao'
import { InicioDashBoard } from './InicioDashBoard'
import { HeaderDashboards } from '../header'

export function Inicio({ user }: IHomeProps) {
  return (
    <main className="main">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user={user} />
        {user !== 'CIDADAO' ? <HeaderDashboards.notificacao /> : null}
      </HeaderDashboards.root>

      {/* Banner */}
      <InicioBanner />

      {/* Container Principal  */}
      <InicioDashBoard.root>
         <h1 className="font-satoshi-black text-primary-800 text-2xl">
          {user === 'CIDADAO' ? 'Notificações' : 'Informações Gerais'}
        </h1>
        {user === 'CIDADAO' ? <InicioNotificacao /> : <InicioDados />}
      </InicioDashBoard.root>
    </main>
  )
}
