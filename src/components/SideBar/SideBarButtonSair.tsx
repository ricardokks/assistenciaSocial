import { useNavigate } from 'react-router-dom'

import { toast } from 'sonner'

import { logout } from '../../api/auth/logout'
import { IconeSair } from '../../assets/Icons/iconeSair'

export function SideBarButtonSair() {
  const navigate = useNavigate()

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
    <button
      className="text-primary-800 font-outfit-bold flex w-[80%] cursor-pointer items-center justify-center rounded-2xl bg-white p-1 text-[1.2rem] transition-all
     duration-500 ease-in-out hover:bg-white/80"
      onClick={async () => await handleLogout()}
    >
      <IconeSair className="size-9" />
      Sair
    </button>
  )
}
