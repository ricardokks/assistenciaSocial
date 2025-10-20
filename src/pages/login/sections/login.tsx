import { useState } from 'react'
import logoMassapeAzul from '../../../assets/image/logo de massape azul.svg'

import imagemMassape from '../../../assets/image/imagemMasspae.png'
import imagemMassapeMobile from '../../../assets/image/image-mobile-login.png'
import logomassape from "../../../assets/image/logo-branca-massape.png"


import { IconEyeOpen } from '../../../assets/Icons/closeEyeOpen'
import { IconEyeClose } from '../../../assets/Icons/IconEyeClose'
import { IconeCPF } from '../../../assets/Icons/iconeEmail'
import { IconeSenha } from '../../../assets/Icons/iconeSenha'
import { Controller, useForm } from 'react-hook-form'
import type { ILoginUserDTO } from '../../../types/type-login-user'
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema, type userLoginDTO } from '../../../schemas/userLoginSchema'
import { login } from '../../../api/auth/login'
import { toast } from 'sonner'
import { IMaskInput } from 'react-imask'

import { BarsLoginMobile } from "../../../assets/svgs/bars-login-mobile.tsx"

export function Login() {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const { register, handleSubmit, reset, control } = useForm<ILoginUserDTO>({ resolver: zodResolver(userLoginSchema) })

  async function onSubmit(data: userLoginDTO) {
    try {
      await login(data);
      toast.success("Usuário autenticado com sucesso!")
      reset()
    } catch {
      toast.error("Credencias inválidas")
    }
  }

  return (
    <div className="w-screen h-screen flex justify-between items-center bg-white overflow-hidden max-lg:flex-col-reverse">
      {/* Tela principal */}
      <div className='w-full h-32 z-10 absolute top-51 lg:hidden'> <BarsLoginMobile/> </div>
      <div className="w-[55%] h-[90%] flex flex-col items-center mt-6 py-4 lg:space-y-16 max-lg:w-full max-lg:h-[50%] ">
        {/* Conteiner da imagem e textos */}
        <div className='w-full flex flex-col space-y-5 items-center justify-center'>
          <img width={300} height={300} className='-translate-x-1' src={logoMassapeAzul} alt="" />
          <div className='flex flex-col w-2/4 items-center mt-6 -space-y-2'>
            <h1 className='text-[30px] text-primary-800 font-outfit-bold'>SEJA BEM-VINDO(A)</h1>
            <h2 className='text-[25px] text-primary-800 font-satoshi font-medium text-center'>Assistência social na palma da mão</h2>
          </div>
        </div>
        {/* formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col space-y-3 items-center justify-center'>
          {/* conteiner dos inputs */}
          <div className="w-full h-[70%] flex items-center justify-center flex-col">
            {/* CPF */}
            <div className="w-3/5 flex-col items-center p-2 rounded-2xl">
              <label className="text-primary-800 font-outfit font-medium text-[16px]">CPF: </label>
              <div className='flex relative'>
                <IconeCPF className='absolute top-2 left-1' />
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="000.000.000-00"
                      unmask={true}
                      className="font-outfit w-full placeholder:text-primary-50 rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
                      placeholder="000.000.000-00"
                      onAccept={(value: string) => field.onChange(value)}
                    />
                  )}
                />
              </div>
            </div>
            {/* senha */}
            <div className="w-3/5 flex-col items-center p-2 rounded-2xl">
              <label className="text-primary-800 font-outfit font-medium text-[16px]">Senha: </label>
              <div className='flex relative'>
                <IconeSenha className='absolute top-2 left-1' />
                <input
                  className="outline-none border border-gray-300 text-[#194A99] w-full pl-7 rounded-2xl py-2 placeholder:text-[#194A99] text-[15px] font-outfit font-medium"
                  placeholder="Digite sua senha"
                  type={visiblePassword ? 'text' : 'password'}
                  {...register('password')}
                />
                {/* Botão de visualizar a senha */}
                <button
                  type='button'
                  onClick={() => setVisiblePassword(visible => !visible)}
                  className='absolute top-2 right-1 cursor-pointer'>
                  {visiblePassword ? <IconEyeClose className='size-6 text-primary-800' /> : <IconEyeOpen className='size-6 text-primary-800' />}
                </button>
              </div>
            </div>
          </div>
          {/* botão de entrar */}
          <button
            type='submit'
            className='bg-primary-800 px-2 py-1 w-1/2 rounded-2xl font-satoshi font-bold text-white text-[16px] mt-16 hover:bg-blue-900 duration-500 cursor-pointer'> ENTRAR </button>
          {/* esqueci a senha */}
          <h1 className='text-center font-outfit text-primary-800'>Esqueceu sua senha? <a className='font-outfit-bold cursor-pointer'>Entre em contato com um <br />administrador</a></h1>
        </form>
      </div>
      <div style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: "cover", }} className="w-1/2 h-full relative max-lg:hidden" />
      <div style={{ backgroundImage: `url(${imagemMassapeMobile})`, backgroundSize: "cover", }} className="w-full flex justify-center items-center h-72 absolute top-0 lg:hidden z-0" > <img className='max-w-72 min-w-72' src={logomassape} alt="" /></div>
    </div>
  )
}