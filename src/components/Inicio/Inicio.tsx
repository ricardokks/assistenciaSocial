import { ClipboardList, DownloadCloud } from 'lucide-react'
import { useEffect } from 'react'

import type { IHomeProps } from '../../types/interface-home-props'
import { socket } from '../../utils/socket'
import { InicioBanner } from '../banner'
import { HeaderDashboards } from '../Header'
import { InicioDados } from './InicioDados'
import { InicioDashBoard } from './InicioDashBoard'
import { InicioNotificacao } from './InicioNotificacao'
import { InicioRelatorio } from './InicioRelatorioMensal'

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
    <main className="main scrollbar-thin-personalizada overflow-y-auto">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={data.data} user={data.user} />
      </HeaderDashboards.root>

      {/* Banner */}
      <InicioBanner />

      {/* Container Principal  */}
      <InicioDashBoard.root>
        <h1 className="font-satoshi-black text-primary-800 mb-2 text-2xl max-md:text-lg">
          {data.user === 'CIDADAO' ? 'Notificações' : 'Informações Gerais'}
        </h1>
        {data.user === 'CIDADAO' ? <InicioNotificacao user={data.data} /> : <InicioDados />}

        {data.user === 'CIDADAO' || 'ADMINISTRADOR' ? null : <InicioRelatorio />}
      </InicioDashBoard.root>
    </main>
  )
}
