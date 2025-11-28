import { IconeEditar } from '../../../../assets/Icons/IconeEditar'
import { IconeLixeira } from '../../../../assets/Icons/IconeLixeira'

type InstituicaoProps = {
  setDelete: () => void
  setEdit: () => void
}

export function Instituicao() {
  return (
    <div className="border-primary-100/20 h-64 w-full rounded-2xl border-2 bg-white p-1 px-4 pt-4 shadow-2xl shadow-neutral-700/20 ">
      <div className="flex w-full justify-start gap-4">
        <div
          className="size-16 min-h-16 min-w-16 rounded-lg bg-black"
          style={{ backgroundImage: `url(#)`, backgroundSize: 'cover' }}
        />
        <div className="flex w-full flex-col">
          <h1 className="color-text font-outfit-bold text-lg">CRAS II Monsenhor Jõao Batista</h1>
          <h1 className="text-primary-800 font-satoshi text-sm">
            Centro de Referencia de Assistência Social
          </h1>
        </div>
      </div>
      <h1 className="text-primary-800 font-satoshi mt-8 text-base">
        Entrada da Assistência Social, fortalecendo família e comunidade.
      </h1>

      <div className="mt-4 flex w-full justify-between gap-3">
        <button className="bg-primary-800 font-satoshi-bold flex w-full items-center justify-center rounded-lg p-1 text-white">
          Editar <IconeEditar className="size-8" />
        </button>
        <button className="bg-negative font-satoshi-bold flex w-full items-center justify-center rounded-lg p-1 text-white">
          Excluir <IconeLixeira className="size-8" />
        </button>
      </div>
    </div>
  )
}
