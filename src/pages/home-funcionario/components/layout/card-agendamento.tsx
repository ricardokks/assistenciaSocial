import { IconeCalendario } from '../../../../assets/Icons/Icone-calendario'

export function CardAgendamento() {
  return (
    <div className="border-primary-800 flex max-w-[350px] flex-col gap-4 rounded-[5.97px] border-2 bg-white p-3">
      {/* container calendario */}
      <div className="flex items-center justify-start gap-4">
        <div className="bg-primary-800 flex items-center justify-center rounded-full p-3">
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
      <div className="font-satoshi flex flex-col gap-4 ">
        <button className="hover:bg-primary-800/95 bg-primary-800 w-full cursor-pointer rounded-[5.97px] p-2 text-white">
          Editar
        </button>
        <button className="hover:bg-negative/95 bg-negative w-full cursor-pointer rounded-[5.97px] p-2 text-white">
          Cancelar Agendamento
        </button>
      </div>
    </div>
  )
}
