import { IconeSair } from '../../assets/Icons/iconeSair'
import {
  LinksDashboardAdministrador,
  LinksDashboardFuncionario,
  LinksDashboardUsuario,
} from '../../constants/links-navegacao-dashboards'
import type { HeaderLinksProps } from '../../types/interface-header-dashboard'
import type { TypeDashboardFuncionario } from '../../types/type-dashboard-funcionario'
import type { TypeUsario } from '../../types/type-usuarios'

const userLinks: Record<
  TypeUsario,
  | typeof LinksDashboardAdministrador
  | typeof LinksDashboardFuncionario
  | typeof LinksDashboardUsuario
> = {
  ADMINISTRADOR: LinksDashboardAdministrador,
  CIDADAO: LinksDashboardUsuario,
  GESTOR: LinksDashboardFuncionario,
  PROFISSIONAL: LinksDashboardFuncionario,
}

export function SideBarMobileLinks(props: HeaderLinksProps) {
  const linksUsers = userLinks[props.typeUser]
  return (
    <div className="flex items-center justify-center gap-6 px-4">
      {linksUsers.map((link, index) => (
        <button
          key={index}
          className={`p-3 ${props.sectionSelecionada === link.id ? 'bg-white ' : 'bg-transparent'} group rounded-2xl hover:bg-white`}
          onClick={() => props.selecionarSection(link.id as TypeDashboardFuncionario)}
        >
          <link.icone
            className={` group-hover:text-primary-800 ${props.sectionSelecionada === link.id ? 'text-primary-800' : 'text-white'} size-7`}
          />
        </button>
      ))}

      <button className={'text-white'}>
        <IconeSair className="size-8 text-white" />
      </button>
    </div>
  )
}
