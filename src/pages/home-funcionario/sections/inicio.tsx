<<<<<<< HEAD
import { HeaderDashboards } from '../../../components/Header'
import { Banner } from '../../../components/home/banner'
=======
import { HeaderDashboards } from "../../../components/header"
>>>>>>> 5564bf44e68bf9cbfa42775b2c25d9778e2ae2c1

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
