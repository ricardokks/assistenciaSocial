import { IMaskInput } from 'react-imask'

import { IconeCidadao } from '../../../../../assets/Icons/IconeCidadao'
import { IconeCasa } from '../../../../../assets/Icons/icone-casa'
import { IconeData } from '../../../../../assets/Icons/icone-data'
import { IconeLocal } from '../../../../../assets/Icons/icone-local'
import { IconeNis } from '../../../../../assets/Icons/icone-nis'
import { IconeEmail } from '../../../../../assets/Icons/iconeEmail'
import { IconeInstituicao } from '../../../../../assets/Icons/iconeInstituicao'
import { IconeSenha } from '../../../../../assets/Icons/iconeSenha'
export function GestorSection() {
  return (
    <div className="w-full h-[90%]">
      <form action="POST" className="flex w-full h-full flex-col items-start justify-between gap-4">
        {/* container informações nome, cpf, data do agendamento, descrição  */}
        <div className="flex px-10 w-full h-4/5 flex-col gap-4 overflow-y-scroll ">
          {/* nome  */}
          <div className="flex w-[97%] flex-col gap-1">
            <p className="text-primary-800 font-outfit">Nome do Gestor:</p>

            <div className="relative flex w-full rounded-2xl">
              <input
                className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                placeholder="Digite o nome do Gestor"
                type="text"
              />
              <IconeCidadao className="absolute left-2 top-2 size-7" />
            </div>
          </div>

          {/* Email  */}
          <div className="w-full grid grid-cols-2 gap-x-4 pr-4">
            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">CPF do Gestor:</p>

              <div className="relative flex">
                <svg
                  className="absolute left-1 top-1.5 "
                  fill="none"
                  height="32"
                  viewBox="0 0 27 28"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.375 11.75H23.625M7.875 17.375H9M13.5 17.375H14.625M6.75 21.875H20.25C21.1451 21.875 22.0036 21.5194 22.6365 20.8865C23.2694 20.2536 23.625 19.3951 23.625 18.5V9.5C23.625 8.60489 23.2694 7.74645 22.6365 7.11351C22.0036 6.48058 21.1451 6.125 20.25 6.125H6.75C5.85489 6.125 4.99645 6.48058 4.36351 7.11351C3.73058 7.74645 3.375 8.60489 3.375 9.5V18.5C3.375 19.3951 3.73058 20.2536 4.36351 20.8865C4.99645 21.5194 5.85489 21.875 6.75 21.875Z"
                    stroke="#194A99"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.25"
                  />
                </svg>
                <IMaskInput
                  className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                  mask="000.000.000-00"
                  placeholder="000.000.000-00"
                />
              </div>
            </div>

            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">Nis do Gestor:</p>

              <div className="relative flex">
                <IconeNis className="absolute left-1 top-1.5 h-8 w-8" />
                <IMaskInput
                  className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                  mask="000.00000.00-0"
                  placeholder="000.00000.00-0"
                />
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-x-4 pr-4">
            {/* Senha  */}

            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">Senha do Gestor:</p>

              <div className="relative flex w-full rounded-2xl">
                <input
                  className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                  placeholder="Digite a senha do Gestor"
                  type="text"
                />
                <IconeSenha className="absolute left-2 top-2 size-7" />
              </div>
            </div>

            {/* nome  */}
            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">Data de Nascimento do Gestor:</p>

              <div className="relative flex w-full rounded-2xl">
                <input
                  className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                  type="date"
                />
                <IconeData className="absolute left-2 top-2 size-7" />
              </div>
            </div>
          </div>

          {/* nome  */}
          <div className="flex w-[97%] flex-col gap-1">
            <p className="text-primary-800 font-outfit">Nome da Mãe do Gestor:</p>

            <div className="relative flex w-full rounded-2xl">
              <input
                className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                placeholder="Digite o nome da Mãe do Gestor"
                type="text"
              />
              <IconeCidadao className="absolute left-2 top-2 size-7" />
            </div>
          </div>

          {/* Localidade  */}
          <div className="flex w-[97%] flex-col gap-1">
            <p className="text-primary-800 font-outfit">Localidade do Gestor:</p>

            <div className="relative flex w-full rounded-2xl">
              <input
                className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                placeholder="Digite a localidade Gestor"
                type="text"
              />
              <IconeLocal className="absolute left-2 top-2 size-7" />
            </div>
          </div>

          <div className="flex w-[97%] flex-col gap-1">
            <p className="text-primary-800 font-outfit">Rua:</p>

            <div className="relative flex w-full rounded-2xl">
              <input
                className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                placeholder="Digite a rua do Gestor"
                type="text"
              />
              <IconeLocal className="absolute left-2 top-2 size-7" />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-x-4 pr-4">
            {/* Localidade  */}
            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">Complemento:</p>

              <div className="relative flex w-full rounded-2xl">
                <input
                  className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                  placeholder="Complemento sobre a moradia..."
                  type="text"
                />
                <IconeCasa className="absolute left-2 top-2 size-7" />
              </div>
            </div>

            {/* Localidade  */}
            <div className="flex w-[97%] flex-col gap-1">
              <p className="text-primary-800 font-outfit">Número da Casa:</p>

              <div className="relative flex w-full rounded-2xl">
                <input
                  className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                  placeholder="Digite o número da casa do Gestor"
                  type="text"
                />
                <IconeCasa className="absolute left-2 top-2 size-7" />
              </div>
            </div>
          </div>
          {/* descrição da reunião  */}
          <div className="flex w-[97%] flex-col gap-1">
            <p className="text-primary-800 font-outfit">Institução do Gestor:</p>

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
            Criar Gestor
          </button>
        </div>
      </form>
    </div>
  )
}
