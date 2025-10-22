import { useState } from 'react'
import logoMassapeAzul from '../../../assets/image/logo de massape azul.svg'

import imagemMassape from '../../../assets/image/imagemMasspae.png'
import imagemMassapeMobile from '../../../assets/image/image-mobile-login.png'
import logomassape from "../../../assets/image/logo-branca-massape.png"

import zodResolver from "@hookform/resolvers"
import { IconEyeOpen } from '../../../assets/Icons/closeEyeOpen'
import { IconeSenha } from '../../../assets/Icons/iconeSenha'
import { Controller, useForm } from 'react-hook-form'
import type { ILoginUserDTO } from '../../../types/type-login-user'
import { IconeCPF } from '../../../assets/Icons/iconeCPF.tsx'
import { BarsLoginMobile } from '../../../assets/svgs/bars-login-mobile.tsx'
import { toast } from 'sonner'
import { login } from '../../../api/auth/login.ts'
import { userLoginSchema, type userLoginDTO } from '../../../schemas/userLoginSchema.ts'

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
      <div className="top-51 absolute z-10 h-32 w-full lg:hidden">
        {' '}
        <BarsLoginMobile />{' '}
      </div>
      <div className="mt-6 flex h-[90%] w-[55%] flex-col items-center py-4 max-lg:h-[50%] max-lg:w-full lg:space-y-16 ">
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
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col space-y-3 items-center justify-center max-md:mt-6 h-full'>
          {/* conteiner dos inputs */}
          <div className="w-full h-[70%] flex items-center justify-center flex-col">
            {/* CPF */}
            <div className="w-3/5 flex-col items-center rounded-2xl p-2">
              <label className="text-primary-800 font-outfit text-[16px] font-medium">CPF: </label>
              <div className="relative flex">
                <IconeCPF className="absolute left-1 top-2" />
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="000.000.000-00"
                      placeholder="000.000.000-00"
                      onAccept={(value: string) => field.onChange(value)}
                    />
                  )}
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
            className="bg-primary-800 font-satoshi mt-16 w-1/2 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-900"
            type="submit"
          >
            {' '}
            ENTRAR{' '}
          </button>
          {/* esqueci a senha */}
          <h1 className='text-center font-outfit text-primary-800 max-md:text-[14px]'>Esqueceu sua senha? <a className='font-outfit-bold cursor-pointer'>Entre em contato com um <br />administrador</a></h1>
        </form>
      </div>
      <div
        className="relative h-full w-1/2 max-lg:hidden"
        style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: 'cover' }}
      />
      <div
        className="absolute top-0 z-0 flex h-72 w-full items-center justify-center lg:hidden"
        style={{ backgroundImage: `url(${imagemMassapeMobile})`, backgroundSize: 'cover' }}
      >
        {' '}
        <img alt="" className="min-w-72 max-w-72" src={logomassape} />
      </div>
    </div>
  )
} 