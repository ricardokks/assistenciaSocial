import { IconeEditar } from '../../../../assets/Icons/IconeEditar'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'

type UsuarioProps = {
  setDelete: () => void
}

export function Usuario(props: UsuarioProps) {
  return (
    <div className="w-full bg-primary-100/50 p-3 flex items-center shadow-xl shadow-primary-800/10 rounded-lg justify-between border border-primary-20/10 max-lg:h-28 max-lg:max-h-28 max-md:h-fit">
      <div className="flex w-1/2">
        <div
          style={{
            backgroundImage: `url(#)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="h-14 w-14 max-lg:h-20 max-lg:w-20 max-md:h-14 max-md:w-14 aspect-square rounded-full bg-white-100 border-3 border-verde-100"
        ></div>
        <div className="flex-col flex justify-center pl-3 text-verde-200 ">
          <h1 className="text-lg text-primary-800  font-satoshi-bold ">Aluno Sobrenome</h1>
          <h2 className=" text-primary-800 text-sm">pedrolucas@gmail.com</h2>
          <div className="text-primary-800 rounded-2xl mt-2 text-xs text-left font-satoshi-bold pr-1 w-full">
            {
              //data.sexoAluno === 'PREFIRO_NAO_DIZER' ? 'Sem informação' : SexoFormat
            }{' '}
            Funcionário
          </div>
        </div>
      </div>

      {/* Icones*/}
      <div className="flex space-x-1 items-center justify-center">
        {/* Icone atualizar */}
        <button className="w-8 h-8 flex justify-center items-center bg-primary-800 hover:bg-primary-50 rounded-lg duration-300 cursor-pointer">
          <IconeEditar className="text-white"></IconeEditar>
        </button>

        <button onClick={() => props.setDelete()} className="w-8 h-8 flex justify-center items-center bg-negative hover:bg-negative/80 rounded-lg duration-300 cursor-pointer">
          <IconeLixeira className='text-white'></IconeLixeira>
        </button>
      </div>
    </div>
  )
}
