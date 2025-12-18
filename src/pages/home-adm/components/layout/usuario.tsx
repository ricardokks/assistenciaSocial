import { IconeEditar } from '../../../../assets/Icons/IconeEditar'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'
import type { UsuarioDTOO } from '../../../../dto/Usuario/usuarioDTO'
import type { userCadastroDTO } from '../../../../schemas/userCadastroSchema'

type UsuarioProps = {
  user: userCadastroDTO | undefined
  setDelete: () => void
  setEdit: () => void
  setId: () => void
  setUser: () => void
}

export function Usuario(props: UsuarioProps) {
  const inicial = props?.user?.nome?.[0]?.toUpperCase() ?? ''

  return (
    <div className="bg-primary-100/50 shadow-primary-800/10 border-primary-20/10 flex w-full items-center justify-between rounded-lg border p-3 shadow-xl max-lg:h-28 max-lg:max-h-28 max-md:h-fit">
      {/* Avatar + Info */}
      <div className="flex w-1/2">
        <div className="bg-primary-800 size-13 font-outfit-bold flex items-center justify-center rounded-full text-[35px] text-white">
          <h1 className="pt-1">{inicial}</h1>
        </div>

        <div className="text-verde-200 flex flex-col justify-center pl-3">
          <h1 className="text-primary-800 font-satoshi-bold text-lg">{props?.user?.nome}</h1>
          <div className="text-primary-800 font-satoshi-bold mt-2 text-xs">
            {props?.user?.papel}
          </div>
        </div>
      </div>

      {/* Ícones */}
      <div className="flex items-center justify-center space-x-1">
        <button
          className="bg-primary-800 hover:bg-primary-50 flex size-8 items-center justify-center rounded-lg duration-300"
          onClick={() => {
            props.setEdit()
            props.setUser()
            console.log('setou')
          }}
        >
          <IconeEditar className="text-white" />
        </button>

        <button
          className="bg-negative hover:bg-negative/80 flex size-8 items-center justify-center rounded-lg duration-300"
          onClick={() => {
            props.setDelete()
            props.setId()
          }}
        >
          <IconeLixeira className="text-white" />
        </button>
      </div>
    </div>
  )
}
