import { HeaderDashboards } from "../../../components/header"

export function Inicio() {
  return (
    <section className='w-[calc(100%-25%)] py-2'>
      <HeaderDashboards.root>
        <HeaderDashboards.perfil />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>
    </section>
  )
}
