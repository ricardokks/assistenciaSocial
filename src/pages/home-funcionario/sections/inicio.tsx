import { HeaderDashboards } from '../../../components/Header'

export function Inicio() {
  return (
    <section className='w-[calc(100%-25%)] py-2'>
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user='PROFISSIONAL' />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

    </section>
  )
}
