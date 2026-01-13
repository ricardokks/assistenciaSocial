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
import { LogoutModal } from '../../pages/home-cidadao/modals/confirmarLogout'

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
  FUNCIONARIO: LinksDashboardFuncionario,
}

export function SideBarMobileLinks(props: HeaderLinksProps) {
  const linksUsers = userLinks[props.typeUser]
  const navigate = useNavigate()

  const [openLogout, setOpenLogout] = useState(false)

  async function handleLogout() {
    try {
      navigate('/')
      await logout()
      toast.success('Você foi deslogado com sucesso')
    } catch {
      toast.error('Erro ao deslogar')
    }
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 px-4">
        {linksUsers.map((link, index) => (
          <button
            key={index}
            className={`group rounded-2xl p-3 hover:bg-white ${
              props.sectionSelecionada === link.id ? 'bg-white' : 'bg-transparent'
            }`}
            onClick={() =>
              props.selecionarSection(link.id as TypeDashboardFuncionario)
            }
          >
            <link.icone
              className={`size-7 ${
                props.sectionSelecionada === link.id
                  ? 'text-primary-800'
                  : 'text-white'
              } group-hover:text-primary-800`}
            />
          </button>
        ))}

        {/* BOTÃO DE SAIR */}
        <button
          className="group rounded-2xl p-2 hover:bg-white"
          onClick={() => setOpenLogout(true)}
        >
          <IconeSair className="size-8 text-white group-hover:text-primary-800" />
        </button>
      </div>

      {/* MODAL DE CONFIRMAÇÃO */}
      <LogoutModal
        open={openLogout}
        close={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  )
}
