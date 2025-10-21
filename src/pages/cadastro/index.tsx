import { useState } from 'react'

import { IconEyeClose } from '../../assets/Icons/IconEyeClose'
import { IconEyeOpen } from '../../assets/Icons/closeEyeOpen'
import { IconeSenha } from '../../assets/Icons/iconeSenha'
import { logoMassapeAzul } from '../../assets/image'
import imagemMassape from '../../assets/image/imagemMasspae.png'

export default function CadastroPage() {
  const [visiblePassword, setVisiblePassword] = useState(false)

  return (
    <div className="flex h-screen w-screen items-center justify-between overflow-hidden bg-white">
      {/* Tela principal */}
      <div className="mt-6 flex h-[90%] w-[55%] flex-col items-center space-y-16 py-4">
        {/* Conteiner da imagem e textos */}
        <div className="flex w-full flex-col items-center justify-center space-y-5">
          <img alt="" className="-translate-x-1" height={300} src={logoMassapeAzul} width={300} />
          <div className="mt-6 flex w-2/4 flex-col items-center -space-y-2">
            <h1 className="text-primary-800 font-outfit-bold text-[30px]">SEJA BEM-VINDO(A)</h1>
            <h2 className="text-primary-800 font-satoshi text-center text-[25px] font-medium">
              Assistência social na palma da mão
            </h2>
          </div>
        </div>
        {/* formulário */}
        <form className="flex w-full flex-col items-center justify-center space-y-3">
          {/* conteiner dos inputs */}
          <div className="flex h-[70%] w-full flex-col items-center justify-center">
            {/* Email */}
            <div className="w-3/5 flex-col items-center rounded-2xl p-2">
              <label className="text-primary-800 font-outfit text-[16px] font-medium">
                Email:{' '}
              </label>
              <div className="relative flex">
                <input
                  className="font-outfit w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none placeholder:text-[#194A99]"
                  placeholder="Digite seu Email"
                  type="text"
                />
              </div>
            </div>
            {/* senha */}
            <div className="w-3/5 flex-col items-center rounded-2xl p-2">
              <label className="text-primary-800 font-outfit text-[16px] font-medium">
                Senha:{' '}
              </label>
              <div className="relative flex">
                <IconeSenha className="absolute left-1 top-2" />
                <input
                  className="font-outfit w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none placeholder:text-[#194A99]"
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
          <button className="bg-primary-800 font-satoshi mt-16 w-1/2 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-900">
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
        className="relative h-full w-1/2"
        style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: 'cover' }}
      />
    </div>
  )
}
