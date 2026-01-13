import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { logout } from '../../api/auth/logout'
import { IconeSair } from '../../assets/Icons/iconeSair'
import { LogoutModal } from '../../pages/home-cidadao/modals/confirmarLogout'

export function SideBarButtonSair() {
  const navigate = useNavigate()
  const [openLogout, setOpenLogout] = useState(false)

  async function handleLogout() {
    try {
      navigate('/')
      await logout()
      toast.success('Você saiu da conta')
    } catch {
      toast.error('Erro ao sair')
    }
  }

  return (
    <>
      <button
        className="text-primary-800 font-outfit-bold flex w-[80%] items-center justify-center rounded-2xl bg-white p-1 text-[1.2rem] hover:bg-white/80"
        onClick={() => setOpenLogout(true)}
      >
        <IconeSair className="size-9" />
        Sair
      </button>

      <LogoutModal
        open={openLogout}
        close={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  )
}
