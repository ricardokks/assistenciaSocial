import { use, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { set } from 'zod'

import { findAllLocalidades } from '../../../api/localidades/findAllLocalidades'
import { IconeCasa } from '../../../assets/Icons/icone-casa'
import { IconeLocal } from '../../../assets/Icons/icone-local'

interface Step3Props {
  section: number
  setSection: (section: number) => void
  passStep: () => void | Promise<void>
}

type Localidades = {
  id: string
  nome: string
}

export function Step3({ section, setSection }: Step3Props) {
  const { register, watch } = useFormContext()
  const [localidades, setLocalidades] = useState<Localidades[]>([])

  useEffect(() => {
    async function FetchLocalidades() {
      const response = await findAllLocalidades()

      console.log("dados: ", response.data)
      setLocalidades(response.data)
    }
    FetchLocalidades()
  }, [])

  useEffect(() => {
    console.log("dados: ", localidades)
  }, [])

  const dados = watch()
  console.log(dados)
  return (
    <div className="flex size-full min-w-[500px] flex-col items-center justify-center max-lg:px-16">
      <div className="mt-5 flex w-3/4 flex-col items-center -space-y-2">
        <h2 className="text-primary-800 font-satoshi mb-5  text-center text-[25px] font-medium max-lg:text-base">
          Apenas coloque informações sobre onde você mora e estará tudo pronto
        </h2>
      </div>

      <div className="flex h-[70%] w-full flex-col items-center justify-center">
        {/* Bairro ou localidade */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2 max-lg:w-full">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">
            Bairro ou localidade:{' '}
          </label>
          <div className="relative flex">
            <IconeLocal className="absolute left-1 top-2.5 size-5" />
            <select
              {...register('localidadeId')}
              className={`font-outfit placeholder:text-primary-50 w-full rounded-2xl border py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none `}
            >
              <option value="">Selecione o Valor</option>
              {localidades.map((link): any => (
                <option key={link.id} value={link.id}>
                  {link.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rua */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2 max-lg:w-full">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">Rua:</label>
          <div className="relative flex">
            <IconeLocal className="absolute left-1 top-2.5 size-5" />
            <input
              {...register('rua')}
              className={`font-outfit placeholder:text-primary-50 w-full rounded-2xl border py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none`}
              placeholder="Nome da sua rua"
              type="text"
            />
          </div>
        </div>

        <div className="flex w-3/5 flex-row items-center justify-center max-lg:w-full">
          {/* Número da casa */}
          <div className="w-2/5 flex-col items-center rounded-2xl p-2">
            <label className="text-primary-800 font-outfit text-[16px] font-medium">
              Número da casa:{' '}
            </label>
            <div className="relative flex">
              <IconeCasa className="absolute left-1.5 top-2.5 size-5" />
              <input
                {...register('numero_casa')}
                className={`font-outfit placeholder:text-primary-50 w-full rounded-2xl border py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none `}
                placeholder="Nº00"
                type="text"
              />
            </div>
          </div>

          {/* Complemento */}
          <div className="w-3/5  flex-col items-center rounded-2xl p-2">
            <label className="text-primary-800 font-outfit text-[16px] font-medium">
              Complemento:{' '}
            </label>
            <div className="relative flex">
              <IconeCasa className="absolute left-1.5 top-2.5 size-5" />
              <input
                {...register('complemento')}
                className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
                placeholder="Mais sobre a localização..."
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Botão de retornar */}
        <button
          className="w-4/7  bg-primary-100 font-satoshi mt-8 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-400"
          type="button"
          onClick={() => setSection(section - 1)}
        >
          Retornar
        </button>
      </div>
    </div>
  )
}
