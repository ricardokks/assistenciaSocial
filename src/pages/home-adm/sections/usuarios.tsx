import { useState } from 'react'
import { IconeMais } from '../../../assets/Icons/icone-mais'
import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/header'
import { Usuario } from '../components/layout/usuario'
import { ModalDeletarUsuario } from '../components/modals/modal-deletar-usuario'
import { ModalCriarUsuario } from '../components/modals/modal-criar-usuario'
import type { UsuarioDTO } from '../../../dto/Usuario/usuarioDTO'
import { ModalEditarUsuario } from '../components/modals/modal-editar-usuario'
import { tr } from 'zod/v4/locales'

export function Usuarios() {
  const [abrirModalDelete, setAbrirModalDelete] = useState<boolean>(false)
  const [abrirModalCreate, setAbrirModalCreate] = useState<boolean>(false)
  const [abrirModalEdit, setAbrirModalEdit] = useState<boolean>(false)

  const [idUsuario, setIdUsuario] = useState<string>('')
  const [usuario, setUsuario] = useState<UsuarioDTO>()




  return (
    <main className="flex h-full w-[calc(100%-20%)] overflow-hidden flex-col items-start space-y-6 pr-4 max-md:w-full max-md:px-4">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="ADMINISTRADOR" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      <div className="flex size-full flex-col">
        <h1 className="font-outfit-bold text-primary-800 text-xl">Usuários</h1>
        <div className="flex w-full justify-between mt-3">
          <div className="relative w-2/3">
            <IconeSearch className="absolute mt-3 translate-x-3"></IconeSearch>
            <input
              className="font-satoshi border-primary-800 text-primary-800 placeholder:text-primary-800/65 w-full rounded-2xl border-2 p-2 pl-9 outline-0"
              placeholder="Procurar por nome..."
              type="text"
            />
          </div>

          <button onClick={() => setAbrirModalCreate(true)} className="bg-primary-800 font-outfit-bold hover:bg-primary-800/90 flex cursor-pointer items-center justify-center gap-3 rounded-[5.97px]  p-2 text-white duration-500 ease-in-out">
            <IconeMais className="size-4 text-white" /> Novo Usuário
          </button>
        </div>

        <div className='w-full h-[2px] bg-primary-800/20 mt-4'></div>

        <div className='w-full flex flex-col overflow-y-auto overflow-x-hidden mb-28  h-full gap-3 mt-2'>

          <Usuario setDelete={() => setAbrirModalDelete(true)} setEdit={() => setAbrirModalEdit(true)}></Usuario>


        </div>
        <ModalDeletarUsuario
          id={idUsuario}
          abrilModalUsuario={abrirModalDelete}
          handleAbrirModalDelete={() => setAbrirModalDelete(false)}
        ></ModalDeletarUsuario>

        <ModalCriarUsuario
          usuario={usuario!}
          abrilModalUsuario={abrirModalCreate}
          handleAbrirModalDelete={() => setAbrirModalCreate(false)}
        ></ModalCriarUsuario>

          <ModalEditarUsuario
          usuario={usuario!}
          abrilModalUsuario={abrirModalEdit}
          handleAbrirModalDelete={() => setAbrirModalEdit(false)}
        ></ModalEditarUsuario>
        
        
      </div>
    </main>
  )
}
