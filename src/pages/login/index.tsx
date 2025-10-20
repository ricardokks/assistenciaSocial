import { useRef, useState } from 'react'
import { IMaskInput } from 'react-imask'

import { IconEyeClose } from '../../assets/Icons/IconEyeClose'
import { IconEyeOpen } from '../../assets/Icons/closeEyeOpen'
import { logoMassapeAzul } from '../../assets/image'
import imagemMassape from '../../assets/image/imagemMasspae.png'

export default function LoginPage() {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const cpfRef = useRef(null)
  const passwordRef = useRef(null)

  return (
    <div className="flex h-screen w-screen items-center justify-between overflow-hidden bg-white">
      {/* Tela principal */}
      <div className="h-[90%] w-[55%] flex-col items-center justify-between space-y-10 py-4 ">
        {/* Conteiner da imagem e textos */}
        <div className="flex w-full flex-col items-center justify-center space-y-5">
          <img alt="" className="-translate-x-1" height={300} src={logoMassapeAzul} width={300} />
          <div className="flex w-2/4 flex-col items-center -space-y-2">
            <h1 className="text-primary-800 font-outfit-bold text-[30px]">SEJA BEM-VINDO(A)</h1>
            <h2 className="text-primary-800 font-satoshi-medium text-center text-[20px]">
              Preencha os campos a seguir com suas informações
            </h2>
          </div>
        </div>
        {/* formulário */}
        <form className="flex w-full flex-col items-center justify-center space-y-3">
          <div className="flex h-[70%] w-full flex-col items-center justify-center">
            {/* CPF */}
            <div className="w-4/6 flex-col items-center rounded-2xl p-2">
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

            {/* CPF */}
            <div className="w-4/6 flex-col items-center rounded-2xl p-2">
              <label className="text-primary-800 placeholder:text-primary-50 font-outfit text-[16px] font-medium">
                Senha:{' '}
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
                <input
                  ref={passwordRef}
                  className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
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
            </div>
          </div>
          {/* botão de entrar */}
          <button className="bg-primary-800 hover:bg-primary-100 hover:text-dark-100 font-satoshi-bold mt-16  w-1/2  cursor-pointer rounded-2xl px-4 py-1 text-lg text-white duration-500">
            {' '}
            ENTRAR{' '}
          </button>
          {/* esqueci a senha */}
          <h1 className="font-outfit text-primary-800 text-center">
            Esqueceu sua senha?{' '}
            <a className="font-outfit-bold cursor-pointer">
              Entre em contato com um <br />
              administrador
            </a>
          </h1>
        </form>
      </div>
      <div
        className="relative h-full w-2/3"
        style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: 'cover' }}
      />
    </div>
  )
}
