import { useEffect, useState } from 'react'

import { tr } from 'zod/v4/locales'

import { GetAllUsers } from '../../../api/user/getAllUsers'
import { IconeMais } from '../../../assets/Icons/icone-mais'
import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/a'
import type { UsuarioDTOO } from '../../../dto/Usuario/usuarioDTO'
import type { userCadastroDTO } from '../../../schemas/userCadastroSchema'
import type { IHomeProps } from '../../../types/interface-home-props'
import { Usuario } from '../components/layout/usuario'
import { ModalCriarUsuario } from '../components/modals-user/modal-criar-usuario'
import { ModalDeletarUsuario } from '../components/modals-user/modal-deletar-usuario'
import { ModalEditarUsuario } from '../components/modals-user/modal-editar-usuario'

export function Usuarios(data: IHomeProps) {
  const [abrirModalDelete, setAbrirModalDelete] = useState<boolean>(false)
  const [abrirModalCreate, setAbrirModalCreate] = useState<boolean>(false)
  const [abrirModalEdit, setAbrirModalEdit] = useState<boolean>(false)

  const [idUsuario, setIdUsuario] = useState<string>('')
  const [usuario, setUsuario] = useState<userCadastroDTO>()

  const [Usuarios, setUsuarios] = useState<userCadastroDTO[]>()

  async function refreshUsers() {
    const res = await GetAllUsers()
    setUsuarios(res.data)
  }

  useEffect(() => {
    refreshUsers()
  }, [])

  return (
    <main className="main flex h-full flex-col items-start space-y-6 overflow-hidden pr-4 max-md:w-full max-md:px-4">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={data.data} user="ADMINISTRADOR" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      <div className="max-lg:pb-30 flex size-full flex-col pb-10">
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

          <button
            className="bg-primary-800 font-outfit-bold hover:bg-primary-800/90 flex cursor-pointer items-center justify-center gap-3 rounded-[5.97px]  p-2 text-white duration-500 ease-in-out"
            onClick={() => setAbrirModalCreate(true)}
          >
            <IconeMais className="size-4 text-white" /> Novo Usuário
          </button>
        </div>

        <div className="bg-primary-800/20 mt-4 h-[2px] w-full"></div>

        <div className="mb-28 mt-2 flex size-full flex-col gap-3  overflow-y-auto overflow-x-hidden">
          {Usuarios?.filter((u) => u.papel !== 'ADMINISTRADOR').map((user) => (
            <Usuario
              key={user.id}
              setDelete={() => setAbrirModalDelete(true)}
              setEdit={() => setAbrirModalEdit(true)}
              setId={() => setIdUsuario(user.id)}
              setUser={() => setUsuario(user)}
              user={user}
            />
          ))}
        </div>
        <ModalDeletarUsuario
          abrilModalUsuario={abrirModalDelete}
          handleAbrirModalDelete={() => setAbrirModalDelete(false)}
          id={idUsuario}
          refreshUsers={() => refreshUsers()}
        ></ModalDeletarUsuario>

        <ModalCriarUsuario
          abrilModalUsuario={abrirModalCreate}
          handleAbrirModalDelete={() => setAbrirModalCreate(false)}
          refreshUsers={() => refreshUsers()}
        ></ModalCriarUsuario>

        <ModalEditarUsuario
          abrilModalUsuario={abrirModalEdit}
          handleAbrirModalDelete={() => setAbrirModalEdit(false)}
          refreshUsers={() => refreshUsers()}
          usuario={usuario!}
        ></ModalEditarUsuario>
      </div>
    </main>
  )
}
