import { IconeCalendario } from '../../../assets/Icons/Icone-calendario'

export function CardAgendamento() {
  return (
    <div className="border-2 max-w-[350px] border-primary-800 rounded-[5.97px] p-3 flex flex-col gap-4 bg-white">
      {/* container calendario */}
      <div className="flex items-center justify-start gap-4">
        <div className="p-3 flex items-center justify-center bg-primary-800 rounded-full">
          <IconeCalendario />
        </div>
        <h1 className="font-satoshi-black text-2xl">21/21/2121</h1>
      </div>

      {/* container dados do cidadao */}
      <div className="flex flex-col">
        <p className="text-primary-800 font-outfit py-1">Correção do cadastro único</p>
        <p className="text-primary-800 font-outfit">Nome: José Felipe Lima</p>
        <p className="text-primary-800 font-outfit">CPF: 691.322.104-51</p>
      </div>

      {/* container dos botoes de controles  */}
      <div className="flex flex-col font-satoshi gap-4 ">
        <button className="w-full cursor-pointer hover:bg-primary-800/95 p-2 bg-primary-800 rounded-[5.97px] text-white">Editar</button>
        <button className="w-full cursor-pointer hover:bg-negative/95 p-2 bg-negative rounded-[5.97px] text-white">
          Cancelar Agendamento
        </button>
      </div>
    </div>
  )
}
