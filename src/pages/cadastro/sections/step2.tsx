import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

import { IconeData } from '../../../assets/Icons/icone-data'
import { IconeNis } from '../../../assets/Icons/icone-nis'
import { IconePessoa } from '../../../assets/Icons/icone-pessoa'

export function Step2({
  section,
  setSection,
  passStep,
}: {
  section: number
  setSection: (section: number) => void
  passStep: () => void | Promise<void>
}) {
  const NisRef = useRef(null)
  const { register, setValue, watch } = useFormContext()

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="mt-5 flex w-3/4 flex-col items-center -space-y-2">
        <h2 className="text-primary-800 font-satoshi mb-5 text-center text-[25px] max-lg:text-base font-medium">
          Estamos quase lá! Continue preenchendo os campos
        </h2>
      </div>
      <div className="flex h-[70%] w-full flex-col items-center justify-center">
        {/* Nome */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">
            Nome da mãe:{' '}
          </label>
          <div className="relative flex">
            <IconePessoa className="absolute left-2 top-3 size-4" />
            <input
              {...register('nomeMae')}
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              placeholder="Nome da mãe completo"
              type="text"
            />
          </div>
        </div>

        {/* data de nascimento */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">
            Data de Nascimento:
          </label>
          <div className="relative flex">
            <IconeData className="absolute left-1 top-2 h-5 w-6" />

            <IMaskInput
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              mask="00-00-0000"
              placeholder="__/__/____"
              value={watch('dataNascimento')}
              onAccept={(value) => setValue('dataNascimento', value)}
            />
          </div>
        </div>

        {/* NIS */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 placeholder:text-primary-50 font-outfit text-[16px] font-medium">
            NIS:{' '}
          </label>
          <div className="relative flex">
            <IconeNis className="absolute left-1 top-2.5 h-5" />
            <IMaskInput
              ref={NisRef}
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              mask="000.00000.00-0"
              placeholder="Número do NIS"
              value={watch('nis')}
              onAccept={(value) => setValue('nis', value)}
            />
          </div>
        </div>

        {/* botão de retornar */}
        <button
          className="w-4/7 bg-primary-100 font-satoshi mt-8 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-400"
          onClick={() => setSection(section - 1)}
        >
          {' '}
          Retornar{' '}
        </button>
        {/* botão de prosseguir */}
        <button
          className="w-4/7 bg-primary-800 font-satoshi mt-3 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-900"
          onClick={async () => passStep()}
        >
          {' '}
          Prosseguir{' '}
        </button>
      </div>
    </div>
  )
}
