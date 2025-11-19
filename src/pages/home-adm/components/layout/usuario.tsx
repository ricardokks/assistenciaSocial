import { IconeEditar } from '../../../../assets/Icons/IconeEditar'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'

type UsuarioProps = {
  setDelete: () => void
}

export function Usuario(props: UsuarioProps) {
  return (
    <div className="bg-primary-100/50 shadow-primary-800/10 border-primary-20/10 flex w-full items-center justify-between rounded-lg border p-3 shadow-xl max-lg:h-28 max-lg:max-h-28 max-md:h-fit">
      <div className="flex w-1/2">
        <div
          className="bg-white-100 border-3 border-verde-100 aspect-square size-14 rounded-full max-lg:size-20 max-md:size-14"
          style={{
            backgroundImage: `url(#)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="text-verde-200 flex flex-col justify-center pl-3 ">
          <h1 className="text-primary-800 font-satoshi-bold  text-lg ">Aluno Sobrenome</h1>
          <h2 className=" text-primary-800 text-sm">pedrolucas@gmail.com</h2>
          <div className="text-primary-800 font-satoshi-bold mt-2 w-full rounded-2xl pr-1 text-left text-xs">
            {
              //data.sexoAluno === 'PREFIRO_NAO_DIZER' ? 'Sem informação' : SexoFormat
            }{' '}
            Funcionário
          </div>
        </div>
      </div>

      {/* Icones*/}
      <div className="flex items-center justify-center space-x-1">
        {/* Icone atualizar */}
        <button className="bg-primary-800 hover:bg-primary-50 flex size-8 cursor-pointer items-center justify-center rounded-lg duration-300">
          <IconeEditar className="text-white"></IconeEditar>
        </button>

        <button
          className="bg-negative hover:bg-negative/80 flex size-8 cursor-pointer items-center justify-center rounded-lg duration-300"
          onClick={() => props.setDelete()}
        >
          <IconeLixeira className="text-white"></IconeLixeira>
        </button>
      </div>
    </div>
  )
}
