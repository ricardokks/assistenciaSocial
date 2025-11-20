import { IconeEditar } from "../../../../assets/Icons/IconeEditar"
import { IconeLixeira } from "../../../../assets/Icons/IconeLixeira"


type InstituicaoProps = {
  setDelete: () => void
  setEdit: () => void
}

export function Instituicao(){

 return(
    <div className="w-full p-1 px-4 pt-4 h-64 bg-white rounded-2xl border-2 border-primary-100/20 shadow-2xl shadow-neutral-700/20 ">
      <div className="w-full flex gap-4 justify-start">
        <div style={{backgroundImage: `url(#)`, backgroundSize: "cover"}} className="min-w-16 w-16 h-16 bg-black min-h-16 rounded-lg"/>
        <div className="w-full flex flex-col">
          <h1 className="color-text text-lg font-outfit-bold">CRAS II Monsenhor Jõao Batista</h1>
          <h1 className="text-primary-800 text-sm font-satoshi">Centro de Referencia de Assistência Social</h1>

        </div>
        </div>
        <h1 className="text-base mt-8 text-primary-800 font-satoshi">Entrada da Assistência Social, fortalecendo família e comunidade.</h1>

        <div className="flex w-full justify-between gap-3 mt-4">
          <button className="w-full flex items-center justify-center bg-primary-800 p-1 rounded-lg text-white font-satoshi-bold">Editar <IconeEditar className="h-8 w-8"/></button>
          <button className="w-full flex items-center justify-center bg-negative p-1 rounded-lg text-white font-satoshi-bold">Excluir <IconeLixeira className="h-8 w-8"/></button>

        </div>
    </div>
 )
}