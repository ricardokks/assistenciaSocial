import { useRef, useState } from 'react'
import { IMaskInput } from 'react-imask'

import { IconEyeClose } from '../../../assets/Icons/IconEyeClose'
import { IconEyeOpen } from '../../../assets/Icons/closeEyeOpen'
import { IconePessoa } from '../../../assets/Icons/icone-pessoa'
import { IconeSenha } from '../../../assets/Icons/iconeSenha'

export function Step1({section, setSection}: {section:number, setSection: (section:number) => void}) {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const cpfRef = useRef(null)
  return (
    <div className="flex w-full h-full justify-center items-center flex-col">
      <div className="mt-5 flex w-2/4 flex-col items-center -space-y-2">
        <h1 className="text-primary-800 font-outfit-bold text-[30px]">SEJA BEM-VINDO(A)</h1>
        <h2 className="text-primary-800 font-satoshi text-center text-[25px] font-medium">
          Preencha os campos a seguir com suas informações
        </h2>
      </div>

      <div className="flex h-[70%] w-full flex-col items-center justify-center">
        {/* Nome */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">
            Nome Completo:{' '}
          </label>
          <div className="relative flex">
            <IconePessoa className="absolute size-4 left-2 top-3" />
            <input
              className="font-outfit w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none placeholder:text-primary-50"
              placeholder="Digite seu nome"
              type="text"
            />
          </div>
        </div>

        {/* CPF */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 placeholder:text-primary-50 font-outfit text-[16px] font-medium">
            CPF:{' '}
          </label>
          <div className="relative flex">
            <svg
              className="absolute left-1 top-2"
              fill="none"
              height="22"
              viewBox="0 0 27 28"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.375 11.75H23.625M7.875 17.375H9M13.5 17.375H14.625M6.75 21.875H20.25C21.1451 21.875 22.0036 21.5194 22.6365 20.8865C23.2694 20.2536 23.625 19.3951 23.625 18.5V9.5C23.625 8.60489 23.2694 7.74645 22.6365 7.11351C22.0036 6.48058 21.1451 6.125 20.25 6.125H6.75C5.85489 6.125 4.99645 6.48058 4.36351 7.11351C3.73058 7.74645 3.375 8.60489 3.375 9.5V18.5C3.375 19.3951 3.73058 20.2536 4.36351 20.8865C4.99645 21.5194 5.85489 21.875 6.75 21.875Z"
                stroke="#194A99"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.25"
              />
            </svg>
            <IMaskInput
              ref={cpfRef}
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              mask="000.000.000-00"
              placeholder="000.000.000-00"
            />
          </div>
        </div>

        {/* senha */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">Senha: </label>
          <div className="relative flex">
            <IconeSenha className="absolute left-1 top-2" />
            <input
              className="font-outfit w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none placeholder:text-primary-50"
              placeholder="Digite sua senha"
              type={visiblePassword ? 'text' : 'password'}
            />
            {/* Botão de visualizar a senha */}
            <button
              className="absolute right-1 top-2 cursor-pointer"
              type="button"
              onClick={() => setVisiblePassword((visible) => !visible)}
            >
              {visiblePassword ? (
                <IconEyeClose className="text-primary-800 size-6" />
              ) : (
                <IconEyeOpen className="text-primary-800 size-6" />
              )}
            </button>

              
 
          </div>
                   {/* botão de prosseguir */}
          <button
          onClick={() => setSection(section + 1)}
          className="w-full bg-primary-800 font-satoshi mt-8 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-900">
            {' '}
            Prosseguir{' '}
          </button>
        </div>
      </div>
    </div>
  )
}
