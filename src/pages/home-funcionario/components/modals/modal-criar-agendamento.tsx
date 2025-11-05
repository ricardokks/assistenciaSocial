import ReactDOM from 'react-dom'
import { IMaskInput } from 'react-imask'

import { IconeCidadao } from '../../../../assets/Icons/IconeCidadao'
import { IconeClosed } from '../../../../assets/Icons/IconeClosed'
import { IconeData } from '../../../../assets/Icons/icone-data'
import { IconeCPF } from '../../../../assets/Icons/iconeCpf'
import type { ModalCriarAgendamentoProps } from '../../../../types/interface-modal-criar-agendamento'

export function ModalCriarAgendamento(props: ModalCriarAgendamentoProps) {
  return ReactDOM.createPortal(
    <section
      className={`${props.abrilModalAgendamento ? 'opacity-100' : 'pointer-events-none opacity-0'} fixed top-0 z-[9999] flex  h-screen w-full items-center justify-center bg-black/50 backdrop-blur-[3px] transition-all duration-500 ease-in-out`}
    >
      {/* Modal de Criação do Agendamento  */}
      <article
        className={` ${props.abrilModalAgendamento ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} relative flex size-[40%] h-auto items-start justify-between rounded-2xl bg-white p-7 px-4 transition-all duration-300 ease-in-out max-md:w-[80%]`}
      >
        {/* parte de cima do componente */}
        <nav className="bg-primary-800 absolute left-0 top-0 h-12 w-full rounded-t-2xl">
          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="font-outfit-bold text-2xl text-white">Novo Agendamento</h1>
            <div className="cursor-pointer" onClick={props.handleAbrilModalAgendamento}>
              <IconeClosed className="size-8 text-white" />
            </div>
          </div>
        </nav>

        <form action="" className="flex w-full flex-col items-start justify-between gap-4 pt-8">
          {/* container informações nome, cpf, data do agendamento, descrição  */}
          <div className="flex w-full flex-col gap-4">
            {/* nome  */}
            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">Nome do Cidadão:</p>

              <div className="relative flex w-full rounded-2xl">
                <input
                  className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                  placeholder="Digite o nome do cidadão"
                  type="text"
                />
                <IconeCidadao className="absolute left-2 top-2 size-7" />
              </div>
            </div>

            {/* cpf  */}
            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">CPF do cidadão:</p>

              <div className="relative flex w-full rounded-2xl">
                <IMaskInput
                  className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                  mask="000.000.000-00"
                  placeholder="000.000.000-00"
                  type="text"
                />
                <IconeCPF className="absolute left-2 top-2 size-7" />
              </div>
            </div>

            {/* data do agendamento  */}
            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">Data do agendamento:</p>

              <div className="relative flex w-full rounded-2xl">
                <input
                  className="calendario border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                  type="date"
                />
                <IconeData className="absolute left-2 top-2 size-7" />
              </div>
            </div>

            {/* descrição da reunião  */}
            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">Data do agendamento:</p>

              <textarea
                className="font-outfit text-primary-800 focus:border-primary-800 border-primary-800/50 w-full rounded-2xl border-2  p-4 outline-none duration-500 ease-in-out"
                cols={1}
              />
            </div>
          </div>

          {/* container button  */}
          <div className="flex w-full items-center justify-center">
            <button className="bg-primary-800 hover:bg-primary-800/90 w-[80%] cursor-pointer  rounded-[5.97px] p-2 text-[1.1rem] font-bold text-white duration-500 ease-in-out max-md:w-full">
              Criar Agendamento
            </button>
          </div>
        </form>
      </article>
    </section>,
    document.body
  )
}
