import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

import { IconEyeClose } from '../../../assets/Icons/IconEyeClose'
import { IconEyeOpen } from '../../../assets/Icons/closeEyeOpen'
import { IconeCPF } from '../../../assets/Icons/icon-cpf'
import { IconePessoa } from '../../../assets/Icons/icone-pessoa'
import { IconeSenha } from '../../../assets/Icons/iconeSenha'
import type { userCadastroDTO } from '../../../schemas/userCadastroSchema'

export function Step1({
  passStep,
}: {
  section: number
  setSection: (section: number) => void
  passStep: () => void | Promise<void>
}) {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const cpfRef = useRef(null)

  const { register, setValue, watch } = useFormContext<userCadastroDTO>()

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="mb-7 mt-5 flex w-3/5 flex-col  items-center  -space-y-2 max-lg:w-full max-lg:px-16 ">
        <h1 className="text-primary-800 font-outfit-bold text-[30px] max-lg:text-xl  ">
          SEJA BEM-VINDO(A)
        </h1>
        <h2 className="text-primary-800 font-satoshi text-center text-[25px] font-medium max-lg:text-base">
          Preencha os campos a seguir com suas informações
        </h2>
      </div>

      <div className="flex h-[70%] w-full flex-col items-center justify-center">
        {/* Nome */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">
            Nome Completo:
          </label>
          <div className="relative flex">
            <IconePessoa className="absolute left-2 top-3 size-4" />
            <input
              {...register('nome')}
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              placeholder="Digite seu nome"
              type="text"
            />
          </div>
        </div>

        {/* CPF */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 placeholder:text-primary-50 font-outfit text-[16px] font-medium">
            CPF:
          </label>
          <div className="relative flex">
            <IconeCPF className="absolute left-1 top-2" />
            <IMaskInput
              {...register('cpf')}
              ref={cpfRef}
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              mask="000.000.000-00"
              placeholder="000.000.000-00"
              value={watch('cpf')}
              onAccept={(value) => {
                const onlyNumbers = value.replace(/\D/g, '')
                setValue('cpf', onlyNumbers, { shouldValidate: true })
              }}
            />
          </div>
        </div>


        {/* Senha */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">Senha:</label>
          <div className="relative flex">
            <IconeSenha className="absolute left-1 top-2" />
            <input
              {...register('senha')}
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              placeholder="Digite sua senha"
              type={visiblePassword ? 'text' : 'password'}
            />

            <button
              className="absolute right-1 top-2 cursor-pointer"
              type="button"
              onClick={() => setVisiblePassword((v) => !v)}
            >
              {visiblePassword ? (
                <IconEyeClose className="text-primary-800 size-6" />
              ) : (
                <IconEyeOpen className="text-primary-800 size-6" />
              )}
            </button>
          </div>

          {/* Botão de prosseguir */}
          <button
            className="bg-primary-800 font-satoshi mt-8 w-full cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-900"
            type="button"
            onClick={async () => passStep()}
          >
            Prosseguir
          </button>
        </div>
      </div>
    </div>
  )
}
