import { useState } from 'react'

import { IconeMais } from '../../../assets/Icons/icone-mais'
import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/header'
import { Usuario } from '../components/layout/usuario'
import { ModalDeletarUsuario } from '../components/modals/modal-deletar-usuario'

export function Usuarios() {
  const [abrilModalUsuario, setAbrirModalDelete] = useState<boolean>(false)
  const [idUsuario, setIdUsuario] = useState<string>('')

  return (
    <main className="flex h-full w-[calc(100%-20%)] flex-col items-start space-y-6 overflow-hidden pr-4 max-md:w-full max-md:px-4">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="ADMINISTRADOR" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      <div className="flex size-full flex-col">
        <h1 className="font-outfit-bold text-primary-800 text-xl">Usuários</h1>
        <div className="mt-3 flex w-full justify-between">
          <div className="relative w-2/3">
            <IconeSearch className="absolute mt-3 translate-x-3"></IconeSearch>
            <input
              className="font-satoshi border-primary-800 text-primary-800 placeholder:text-primary-800/65 w-full rounded-2xl border-2 p-2 pl-9 outline-0"
              placeholder="Procurar por nome..."
              type="text"
            />
          </div>

          <button className="bg-primary-800 font-outfit-bold hover:bg-primary-800/90 flex cursor-pointer items-center justify-center gap-3 rounded-[5.97px]  p-2 text-white duration-500 ease-in-out">
            <IconeMais className="size-4 text-white" /> Novo Usuário
          </button>
        </div>

        <div className="bg-primary-800/20 mt-4 h-[2px] w-full"></div>

        <div className="mb-28 mt-2 flex size-full flex-col gap-3  overflow-y-auto overflow-x-hidden">
          <Usuario setDelete={() => setAbrirModalDelete(true)}></Usuario>
        </div>
        <ModalDeletarUsuario
          abrilModalUsuario={abrilModalUsuario}
          handleAbrirModalDelete={() => setAbrirModalDelete(false)}
          id={idUsuario}
        ></ModalDeletarUsuario>
      </div>
    </main>
  )
}
