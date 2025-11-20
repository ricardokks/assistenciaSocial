import { IconeCidadao } from '../../../../../assets/Icons/IconeCidadao'
import { IconeEmail } from '../../../../../assets/Icons/iconeEmail'
import { IconeInstituicao } from '../../../../../assets/Icons/iconeInstituicao'
import { IconeSenha } from '../../../../../assets/Icons/iconeSenha'

export function FuncionarioSection() {
  return (
    <div className="w-full h-full">
      <form action="POST" className="flex w-full h-full flex-col items-start justify-between gap-4">
        {/* container informações nome, cpf, data do agendamento, descrição  */}
        <div className="flex px-10 w-full flex-col gap-4">
          {/* nome  */}
          <div className="flex w-[97%] flex-col gap-1">
            <p className="text-primary-800 font-outfit">Nome do Funcionário:</p>

            <div className="relative flex w-full rounded-2xl">
              <input
                className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                placeholder="Digite o nome do cidadão"
                type="text"
              />
              <IconeCidadao className="absolute left-2 top-2 size-7" />
            </div>
          </div>

          {/* Email  */}
          <div className="flex w-[97%] flex-col gap-1">
            <p className="text-primary-800 font-outfit">E-mail do Funcionário:</p>

            <div className="relative flex w-full rounded-2xl">
              <input
                className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                placeholder="Digite o nome do cidadão"
                type="text"
              />
              <IconeEmail className="absolute left-2 top-2 size-7" />
            </div>
          </div>

          {/* Senha  */}
          <div className="flex w-[97%] flex-col gap-1">
            <p className="text-primary-800 font-outfit">Senha do Funcionário:</p>

            <div className="relative flex w-full rounded-2xl">
              <input
                className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                placeholder="Digite o nome do cidadão"
                type="text"
              />
              <IconeSenha className="absolute left-2 top-2 size-7" />
            </div>
          </div>

          {/* descrição da reunião  */}
          <div className="flex w-[97%] flex-col gap-1">
            <p className="text-primary-800 font-outfit">Institução do Funcionário:</p>

            <div className="relative flex w-full rounded-2xl">
            <select
              className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
              name=""
              id=""
            >
              <option value="">Selecione a instituição</option>
              <option value="">Instituição 1</option>
              <option value="">Instituição 2</option>
              <option value="">Instituição 3</option>
              
            </select>
          <IconeInstituicao className="absolute left-2 top-2 size-7 text-primary-800" />
            </div>


          </div>
        </div>

        {/* container button  */}
        <div className="flex w-full items-center justify-center">
          <button className="bg-primary-800 hover:bg-primary-800/90 w-[80%] cursor-pointer  rounded-[5.97px] p-2 text-[1.1rem] font-bold text-white duration-500 ease-in-out max-md:w-full">
            Criar Funcionário
          </button>
        </div>
      </form>
    </div>
  )
}
