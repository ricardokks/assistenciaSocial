import { IconeEditar } from '../../../../assets/Icons/IconeEditar'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'
import type { AssistenciaDTOO } from '../../../../dto/Assistencia/assistenciaDTO'

type InstituicaoProps = {
  setDelete: () => void
  setEdit: () => void
  setId: () => void
  setInstituicao: () => void
  instituicao?: AssistenciaDTOO
}

export function Instituicao(props: InstituicaoProps) {
  return (
    <div className="border-primary-100/20 h-64 w-full flex justify-between flex-col pb-4 rounded-2xl border-2 bg-white p-1 px-4 pt-4 shadow-2xl shadow-neutral-700/20 ">
      <div className="flex w-full justify-start gap-4">
        <div
          className="size-16 min-h-16 min-w-16 rounded-lg bg-black"
          style={{ backgroundImage: `url(${props.instituicao?.icone})`, backgroundSize: 'cover' }}
        />
        <div className="flex w-full flex-col">
          <h1 className="color-text font-outfit-bold text-lg line-clamp-1">
            {props.instituicao?.unidade}
          </h1>
          <h1 className="text-primary-800 font-satoshi text-sm line-clamp-2">
            {props.instituicao?.subnome}
          </h1>
        </div>
      </div>
      <h1 className="text-primary-800 font-satoshi mt-8 text-base line-clamp-2">
        {props.instituicao?.sobre}
      </h1>

      <div className=" flex w-full mt-auto justify-between gap-3">
        <button
          onClick={() => {
            props.setInstituicao()
            props.setEdit()
          }}
          className="bg-primary-800 font-satoshi-bold flex w-full items-center cursor-pointer justify-center rounded-lg p-1 text-white"
        >
          Editar <IconeEditar className="size-8" />
        </button>
        <button
          onClick={() => {
            props.setId()
            props.setDelete()
            console.log('clicou')
          }}
          className="bg-negative font-satoshi-bold flex w-full items-center cursor-pointer justify-center rounded-lg p-1 text-white"
        >
          Excluir <IconeLixeira className="size-8" />
        </button>
      </div>
    </div>
  )
}
