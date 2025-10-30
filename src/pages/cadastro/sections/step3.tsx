import { useFormContext } from "react-hook-form";
import { IconeLocal } from "../../../assets/Icons/icone-local";
import { IconeCasa } from "../../../assets/Icons/icone-casa";

interface Step3Props {
  section: number;
  setSection: (section: number) => void;
}

export function Step3({ section, setSection }: Step3Props) {
  const {register, formState: { errors }, watch } = useFormContext();

  const dados = watch()
     console.log(dados);
  return (
    <div className="flex size-full flex-col items-center justify-center">
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
              {...register("localidade")}
              className={`font-outfit placeholder:text-primary-50 w-full rounded-2xl border py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none ${
                errors.localidade ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nome do seu bairro ou localidade"
              type="text"
            />
          </div>
          {errors.localidade && (
            <p className="text-red-500 text-sm mt-1">
              {errors.localidade.message as string}
            </p>
          )}
        </div>

        {/* Rua */}
        <div className="w-3/5 flex-col items-center rounded-2xl p-2">
          <label className="text-primary-800 font-outfit text-[16px] font-medium">
            Rua:
          </label>
          <div className="relative flex">
            <IconeLocal className="absolute left-1 top-2.5 size-5" />
            <input
              {...register("rua")}
              className={`font-outfit placeholder:text-primary-50 w-full rounded-2xl border py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none ${
                errors.rua ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nome da sua rua"
              type="text"
            />
          </div>
          {errors.rua && (
            <p className="text-red-500 text-sm mt-1">
              {errors.rua.message as string}
            </p>
          )}
        </div>

        <div className="flex w-3/5 flex-row items-center justify-center">
          {/* Número da casa */}
          <div className="w-2/5 flex-col items-center rounded-2xl p-2">
            <label className="text-primary-800 font-outfit text-[16px] font-medium">
              Número da casa:{' '}
            </label>
            <div className="relative flex">
              <IconeCasa className="absolute left-1.5 top-2.5 size-5" />
              <input
                {...register("numero_casa")}
                className={`font-outfit placeholder:text-primary-50 w-full rounded-2xl border py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none ${
                  errors.numero ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nº00"
                type="text"
              />
            </div>
            {errors.numero && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numero.message as string}
              </p>
            )}
          </div>

          {/* Complemento */}
          <div className="w-3/5 flex-col items-center rounded-2xl p-2">
            <label className="text-primary-800 font-outfit text-[16px] font-medium">
              Complemento:{' '}
            </label>
            <div className="relative flex">
              <IconeCasa className="absolute left-1.5 top-2.5 size-5" />
              <input
                {...register("complemento")}
                className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
                placeholder="Mais sobre a localização..."
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Botão de retornar */}
        <button
          type="button"
          className="w-4/7 bg-primary-100 font-satoshi mt-8 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-400"
          onClick={() => setSection(section - 1)}
        >
          Retornar
        </button>


      </div>
    </div>
  );
}
