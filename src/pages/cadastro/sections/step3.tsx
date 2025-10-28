import { IconeLocal } from '../../../assets/Icons/icone-local'
import { IconeCasa } from '../../../assets/Icons/icone-casa'


export function Step3({ section, setSection }: { section: number, setSection: (section: number) => void }) {

  return (
    <div className='flex size-full flex-col items-center justify-center'>
      <div className="mt-5 flex w-2/4 flex-col items-center -space-y-2">
        <h2 className="text-primary-800 font-satoshi mb-5 text-center text-[25px] font-medium">
          Apenas coloque informações sobre onde você mora e estará tudo pronto
        </h2>
      </div>
      <div className="flex h-[70%] w-full flex-col items-center justify-center">
        {/* Bairro ou localidade */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">
            Bairro ou localidade:{' '}
          </label>
          <div className="relative flex">
            <IconeLocal className="absolute left-1 top-2.5 size-5" />
            <input
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              placeholder="Nome do seu bairro ou localidade"
              type="text"
            />
          </div>
        </div>

        {/* Rua */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">
            Rua:
          </label>
          <div className="relative flex">
            <IconeLocal className="absolute left-1 top-2.5 size-5" />
            <input
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              placeholder="Nome da sua rua"
              type="text"
            />
          </div>
        </div>
        <div className='flex w-3/5 flex-row items-center justify-center'>
                {/* Número da casa */}
        <div className="w-2/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 placeholder:text-primary-50 font-outfit text-[16px] font-medium">
            Número da casa:{' '}
          </label>
          <div className="relative flex">
            <IconeCasa className="absolute left-1.5 top-2.5 size-5" />
            <input
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              placeholder="Nº00"
              type="text"
            />
          </div>
        </div>
        {/* Complemento */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 placeholder:text-primary-50 font-outfit text-[16px] font-medium">
            Complemento:{' '}
          </label>
          <div className="relative flex">
            <IconeCasa className="absolute left-1.5 top-2.5 size-5" />
            <input
              className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
              placeholder="Mais sobre a localização..."
              type="text"
            />
          </div>
        </div>
        </div>
    

        {/* botão de retornar */}
        <button
          className="w-4/7 bg-primary-100 font-satoshi mt-8 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-400"
          onClick={() => setSection(section - 1)}>
          {' '}
          Retornar{' '}
        </button>
        {/* botão de prosseguir */}
        <button
          className="w-4/7 bg-primary-800 font-satoshi mt-3 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-900"
          onClick={() => setSection(section + 1)}>
          {' '}
          Prosseguir{' '}
        </button>
      </div>
    </div>
  )
}
