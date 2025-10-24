import { useState } from 'react'

import { imagemAvatar } from '../../assets/image'
import type { InterfaceHeader } from '../../types/interface-header'
import type { TypeUsario } from '../../types/type-usuarios'
import { Dropbox } from './components/dropbox'

const userInfo: Record<TypeUsario, { cargo: string }> = {
  ADMINISTRADOR: { cargo: 'Administrador' },
  CIDADAO: { cargo: 'Cidadão' },
  GESTOR: { cargo: 'Gestor' },
  PROFISSIONAL: { cargo: 'Funcionário' },
}

export function HeaderDashboardPerfil(props: InterfaceHeader) {
  // estados e variaveis utilizadas no componente
  const user = userInfo[props.user]
  const [abrirDropbox, setAbrirDropbox] = useState(false)

  // Funções utilizadas no componente
  function handleAbrirDropbox() {
    setAbrirDropbox((prev) => !prev)
  }

  return (
    <div
      className="font-outfit-bold relative z-40 flex cursor-pointer items-center justify-center gap-4"
      onClick={handleAbrirDropbox}
    >
      {/* container de foto */}
      <div className="bg-primary-800 w-13 h-13 rounded-full">
        <img alt="" className="size-full" src={imagemAvatar} />
      </div>

      {/* container nome e tipo de usuario  */}
      <div className="flex flex-col items-start justify-center leading-5">
        <h3 className="text-primary-800 text-[1.2rem]">Pedro Lucas</h3>
        <p className="font-outfit text-primary-800 text-[1rem]">{user.cargo}</p>
      </div>

      {/* componente do dropbox */}
      <Dropbox abrirDropbox={abrirDropbox} />
    </div>
  )
}
