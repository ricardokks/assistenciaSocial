import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'sonner'

import { logout } from '../../api/auth/logout'
import { IconeSair } from '../../assets/Icons/iconeSair'
import {
  LinksDashboardAdministrador,
  LinksDashboardFuncionario,
  LinksDashboardUsuario,
} from '../../constants/links-navegacao-dashboards'
import type { HeaderLinksProps } from '../../types/interface-header-dashboard'
import type { TypeDashboardFuncionario } from '../../types/type-dashboard-funcionario'
import type { TypeUsario } from '../../types/type-usuarios'
import { Loading } from '../loading'

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
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    try {
      setLoading(true)
      await logout()
      toast.success('Você foi deslogado com sucesso')
      navigate('/')
    } catch {
      toast.error('Erro ao deslogar')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

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

      <button className={'text-white hover:bg-white p-2 rounded-2xl  group'} onClick={async () => await handleLogout()}>
        <IconeSair className="size-8 text-white group-hover:text-primary-800" />
      </button>
    </div>
  )
}
