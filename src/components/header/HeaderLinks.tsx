import {
  LinksDashboardAdministrador,
  LinksDashboardFuncionario,
  LinksDashboardUsuario,
} from '../../constants/links-navegacao-dashboards'

import type { HeaderLinksProps } from '../../types/interface-header-dashboard'
import type { TypeDashboardFuncionario } from '../../types/type-dashboard-funcionario'
import type { TypeUsario } from '../../types/type-usuarios'


// Criando uma tipagem que irá associar cada usuario a um link
const userLink: Record<
  TypeUsario,
  | typeof LinksDashboardFuncionario
  | typeof LinksDashboardUsuario
  | typeof LinksDashboardAdministrador
> = {
  ADMINISTRADOR: LinksDashboardAdministrador,
  CIDADAO: LinksDashboardUsuario,
  GESTOR: LinksDashboardFuncionario,
  PROFISSIONAL: LinksDashboardFuncionario,
}

export function HeaderLinks(props: HeaderLinksProps) {
  //   variaveis e estados utilizadas no componente
  const links = userLink[props.typeUser]

  return (
    <div className={`flex w-full flex-col items-start justify-center gap-3 px-4`}>
      {/* Rendeização dinamica dos links  */}
      {links.map((link, index) => (
        <button
          key={index}
          className={`${props.sectionSelecionada === link.id ? 'text-primary-800 bg-white' : 'bg-transparent text-white'} hover:text-primary-800  font-outfit-bold font-outfit hover:bg-white-100 group flex w-full cursor-pointer items-center justify-start gap-4 rounded-2xl p-3 text-[1.1rem] transition-all duration-500 ease-in-out`}
          onClick={() => props.selecionarSection(link.id as TypeDashboardFuncionario)}
        >
          {/* parte do icone */}
          <span
            className={`group-hover:bg-primary-800 flex items-center justify-center rounded-[0.5rem] p-1 ${props.sectionSelecionada === link.id ? ' bg-primary-800' : 'bg-white '}`}
          >
            {
              <link.icone
                className={`group-hover:text-white-100 text-primary-800 size-6 p-[2px] ${props.sectionSelecionada === link.id ? 'text-white' : 'text-primary-800'}`}
              />
            }
          </span>
          {/* nome do link */}
          {link.nomeLink}
        </button>
      ))}
    </div>
  )
}
