import type { IHomeProps } from '../../types/interface-home-props'
import { HeaderDashboards } from '../header'
import { InicioBanner } from '../banner'
import { InicioDados } from './InicioDados'
import { InicioDashBoard } from './InicioDashBoard'
import { InicioNotificacao } from './InicioNotificacao'

export function Inicio(data: IHomeProps) {
  return (
    <main className="main">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={data.data} user={data.user} />
        {data.user !== 'CIDADAO' ? <HeaderDashboards.notificacao /> : null}
      </HeaderDashboards.root>

      {/* Banner */}
      <InicioBanner />

      {/* Container Principal  */}
      <InicioDashBoard.root>
        <h1 className="font-satoshi-black text-primary-800 text-2xl">
          {data.user === 'CIDADAO' ? 'Notificações' : 'Informações Gerais'}
        </h1>
        {data.user === 'CIDADAO' ? <InicioNotificacao /> : <InicioDados />}
      </InicioDashBoard.root>
    </main>
  )
}
