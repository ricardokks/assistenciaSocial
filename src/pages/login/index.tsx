import { useState } from 'react'
import { logoMassapeAzul } from '../../assets/image'
import imagemMassape from '../../assets/image/imagemMasspae.png'
import { IconEyeOpen } from '../../assets/Icons/closeEyeOpen'
import { IconEyeClose } from '../../assets/Icons/IconEyeClose'
import { IconeEmail } from '../../assets/Icons/iconeEmail'
import { IconeSenha } from '../../assets/Icons/iconeSenha'

export default function LoginPage() {
  const [visiblePassword, setVisiblePassword] = useState(false)

  return (
    <div className="w-screen h-screen flex justify-between items-center bg-white overflow-hidden">
      {/* Tela principal */}
      <div className="w-[55%] h-[90%] flex flex-col items-center mt-6 py-4 space-y-16">
        {/* Conteiner da imagem e textos */}
        <div className='w-full flex flex-col space-y-5 items-center justify-center'>
          <img width={300} height={300} className='-translate-x-1' src={logoMassapeAzul} alt="" />
          <div className='flex flex-col w-2/4 items-center mt-6 -space-y-2'>
            <h1 className='text-[30px] text-primary-800 font-outfit-bold'>SEJA BEM-VINDO(A)</h1>
            <h2 className='text-[25px] text-primary-800 font-satoshi font-medium text-center'>Assistência social na palma da mão</h2>
          </div>
        </div>
        {/* formulário */}
        <form className='w-full flex flex-col space-y-3 items-center justify-center'>
          {/* conteiner dos inputs */}
          <div className="w-full h-[70%] flex items-center justify-center flex-col">
            {/* Email */}
            <div className="w-3/5 flex-col items-center p-2 rounded-2xl">
              <label className="text-primary-800 font-outfit font-medium text-[16px]">Email: </label>
              <div className='flex relative'>
                <IconeEmail className='absolute top-2.5 left-1.5'/>
                <input
                  className="outline-none border border-gray-300 text-[#194A99] w-full pl-7 rounded-2xl py-2 placeholder:text-[#194A99] text-[15px] font-outfit font-medium"
                  placeholder="Digite seu Email"
                  type="text"
                />
              </div>
            </div>
            {/* senha */}
            <div className="w-3/5 flex-col items-center p-2 rounded-2xl">
              <label className="text-primary-800 font-outfit font-medium text-[16px]">Senha: </label>
              <div className='flex relative'>
                  <IconeSenha className='absolute top-2 left-1'/>
                <input
                  className="outline-none border border-gray-300 text-[#194A99] w-full pl-7 rounded-2xl py-2 placeholder:text-[#194A99] text-[15px] font-outfit font-medium"
                  placeholder="Digite sua senha"
                  type={visiblePassword ? 'text' : 'password'}
                />
              {/* Botão de visualizar a senha */}
                <button 
                type='button'
                onClick={() => setVisiblePassword(visible => !visible)} 
                className='absolute top-2 right-1 cursor-pointer'>
                    { visiblePassword ? <IconEyeClose className='size-6 text-primary-800'/> : <IconEyeOpen className='size-6 text-primary-800'/>}
                </button>
              </div>
            </div>
          </div>
          {/* botão de entrar */}
          <button className='bg-primary-800 px-2 py-1 w-1/2 rounded-2xl font-satoshi font-bold text-white text-[16px] mt-16 hover:bg-blue-900 duration-500 cursor-pointer'> ENTRAR </button>
          {/* esqueci a senha */}
          <h1 className='text-center font-outfit text-primary-800'>Esqueceu sua senha? <a className='font-outfit-bold cursor-pointer'>Entre em contato com um <br/>administrador</a></h1>
        </form>
      </div>
      <div style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: "cover", }} className="w-1/2 h-full relative" />
    </div>
  )
}
