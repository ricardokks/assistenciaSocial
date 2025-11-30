import { useEffect } from 'react'

import type { IHomeProps } from '../../types/interface-home-props'
import { socket } from '../../utils/socket'
import { InicioBanner } from '../banner'
import { HeaderDashboards } from '../header'
import { InicioDados } from './InicioDados'
import { InicioDashBoard } from './InicioDashBoard'
import { InicioNotificacao } from './InicioNotificacao'

export function Inicio(data: IHomeProps) {
  useEffect(() => {
    if (!data.data) return

    socket.connect()
    socket.emit('register', data.data.id)

    return () => {
      socket.disconnect()
    }
  }, [data.data])

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
        {data.user === 'CIDADAO' ? <InicioNotificacao user={data.data} /> : <InicioDados />}
      </InicioDashBoard.root>
    </main>
  )
}
