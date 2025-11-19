import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'sonner'

import { logout } from '../../api/auth/logout'
import { IconeSair } from '../../assets/Icons/iconeSair'
import { Loading } from '../loading'

export function SideBarButtonSair() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
    <button
      className="text-primary-800 font-outfit-bold flex w-[80%] cursor-pointer items-center justify-center rounded-2xl bg-white p-1 text-[1.2rem] transition-all
     duration-500 ease-in-out hover:bg-white/80"
    >
      <IconeSair className="size-9" onClick={async () => await handleLogout()} />
      Sair
    </button>
  )
}
