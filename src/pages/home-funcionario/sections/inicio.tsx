import { HeaderDashboards } from '../../../components/Header'
import { Banner } from '../../../components/home/banner'

export function Inicio() {
  return (
    <section className="w-[calc(100%-25%)] py-2">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="PROFISSIONAL" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      <Banner />
    </section>
  )
}
