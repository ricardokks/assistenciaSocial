import { useEffect, useState } from 'react'

import { PegarInformacaoFuncionario } from '../../api/user/pegarInformacaoFuncionario'
import { imagemAvatar } from '../../assets/image'
import type { UsuarioDTO } from '../../dto/Usuario/usuarioDTO'
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
  const [dadosUser, setDadosUser] = useState<UsuarioDTO | null>(null)
  const [carregarInformacao, setCarregarInformacao] = useState(false)
  const [abrirDropbox, setAbrirDropbox] = useState(false)

  // Funções utilizadas no componente
  function handleAbrirDropbox() {
    setAbrirDropbox((prev) => !prev)
  }

  async function PegarDadosUser() {
    try {
      const response = await PegarInformacaoFuncionario()

      if (response && response.data && response.data.data) {
        setDadosUser(response.data.data)
        setCarregarInformacao(true)
      } else {
        console.log('Não foi possivel carregar as informações')
      }
    } catch (error) {
      return console.log('Error ao pegar dados', error)
    }
  }

  useEffect(() => {
    PegarDadosUser()
  }, [])

  return (
    <div
      className="font-outfit-bold relative z-40 flex cursor-pointer items-center justify-center gap-4"
      onClick={handleAbrirDropbox}
    >
      {/* container de foto */}
      {carregarInformacao ? (
        <div className="bg-primary-800 relative w-13 h-13 rounded-full">
          <img
            alt={'Foto do usário'}
            className="size-full rounded-full"
            src={dadosUser?.avatarURL}
          />
        </div>
      ) : (
        <div className=" w-13 h-13 bg-black/10 animate-pulse rounded-full"></div>
      )}

      {/* container nome e tipo de usuario  */}
      <div className="flex flex-col items-start justify-center leading-5">
        {/* nome do usuario  */}
        <h3 className="text-primary-800 text-[1.2rem]">
          {carregarInformacao ? (
            <span>{dadosUser?.nome}</span>
          ) : (
            <div className="bg-black/10 w-19 h-4 rounded-[5.97px]"></div>
          )}
        </h3>

        {/* cargo do usuário */}
        <p className="font-outfit text-primary-800 text-[1rem]">
          {carregarInformacao ? (
            user.cargo
          ) : (
            <div className="bg-black/10 w-19 h-4 mt-1 rounded-[5.97px]"></div>
          )}
        </p>
      </div>

      {/* componente do dropbox */}
      <Dropbox abrirDropbox={abrirDropbox} />
    </div>
  )
}
