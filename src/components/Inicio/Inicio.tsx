import type { IHomeProps } from '../../types/interface-home-props'
import { InicioBanner } from '../banner'
import { HeaderDashboards } from '../header'
import { InicioDados } from './InicioDados'
import { InicioNotificacao } from './InicioNotificacao'
import { InicioDashBoard } from './InicioDashBoard'

export function Inicio({ user }: IHomeProps) {
  return (
    <main className="flex h-full w-[calc(100%-20%)] pr-4 flex-col items-start space-y-6 max-md:px-4 max-md:w-full">
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
