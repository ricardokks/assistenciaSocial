import { useEffect, useState } from 'react'
import type { UsuarioDTO } from '../../dto/Usuario/usuarioDTO'
import type { InterfaceHeader } from '../../types/interface-header'
import type { TypeUsario } from '../../types/type-usuarios'

const userInfo: Record<TypeUsario, { cargo: string }> = {
  ADMINISTRADOR: { cargo: 'Administrador' },
  CIDADAO: { cargo: 'Cidadão' },
  GESTOR: { cargo: 'Gestor' },
  PROFISSIONAL: { cargo: 'Funcionário' },
  FUNCIONARIO: { cargo: 'Funcionário' },
}

export function headerDashboardPerfil(props: InterfaceHeader) {
  // estados e variaveis utilizadas no componente
  const user = userInfo[props.user]
  const [dadosUser, setDadosUser] = useState<UsuarioDTO | null>(null)
  const [carregarInformacao, setCarregarInformacao] = useState(false)

  const inicial = dadosUser?.nome?.[0]?.toUpperCase() ?? ''

  useEffect(() => {
    if (props.data) {
      setDadosUser(props.data)
      setCarregarInformacao(true)
    }
  }, [props.data])

  return (
    <div className="font-outfit-bold relative z-40 flex cursor-pointer items-center justify-center gap-4">
      {/* container de foto */}
      {carregarInformacao ? (
        dadosUser?.avatarURL ? (
          <div className="bg-primary-800 w-13 h-13 relative rounded-full">
            <img
              alt={'Foto do usário'}
              className="size-full rounded-full"
              src={dadosUser?.avatarURL}
            />
          </div>
        ) : (
          <div className="bg-primary-800 w-13 h-13 font-outfit-bold relative flex items-center justify-center rounded-full text-[35px] text-white ">
            <h1 className="pt-1">{inicial}</h1>
          </div>
        )
      ) : (
        <div className=" w-13 h-13 animate-pulse rounded-full bg-black/10"></div>
      )}

      {/* container nome e tipo de usuario  */}
      <div className="flex flex-col items-start justify-center leading-5">
        {/* nome do usuario  */}
        <h3 className="text-primary-800 text-[1.2rem]">
          {carregarInformacao ? (
            <span>{dadosUser?.nome}</span>
          ) : (
            <div className="w-19 h-4 rounded-[5.97px] bg-black/10"></div>
          )}
        </h3>

        {/* cargo do usuário */}
        <p className="font-outfit text-primary-800 text-[1rem]">
          {carregarInformacao ? (
            user.cargo
          ) : (
            <div className="w-19 mt-1 h-4 rounded-[5.97px] bg-black/10"></div>
          )}
        </p>
      </div>
    </div>
  )
}
