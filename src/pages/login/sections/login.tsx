import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { login } from '../../../api/auth/login'
import { IconEyeClose } from '../../../assets/Icons/IconEyeClose'
import { IconEyeOpen } from '../../../assets/Icons/closeEyeOpen'
import { IconeCPF } from '../../../assets/Icons/iconeEmail'
import { IconeSenha } from '../../../assets/Icons/iconeSenha'
import imagemMassapeMobile from '../../../assets/image/image-mobile-login.png'
import imagemMassape from '../../../assets/image/imagemMasspae.png'
import logoMassapeAzul from '../../../assets/image/logo de massape azul.svg'
import logomassape from '../../../assets/image/logo-branca-massape.png'
import { BarsLoginMobile } from '../../../assets/svgs/bars-login-mobile.tsx'
import { type userLoginDTO, userLoginSchema } from '../../../schemas/userLoginSchema'
import type { ILoginUserDTO } from '../../../types/type-login-user'

export function Login() {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const { register, handleSubmit, reset, control } = useForm<ILoginUserDTO>({
    resolver: zodResolver(userLoginSchema),
  })

  async function onSubmit(data: userLoginDTO) {
    try {
      await login(data)
      toast.success('Usuário autenticado com sucesso!')
      reset()
    } catch {
      toast.error('Credencias inválidas')
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-between overflow-hidden bg-white max-lg:flex-col-reverse">
      {/* Tela principal */}
<<<<<<< HEAD
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
=======
      <div className='w-full h-32 z-10 absolute top-51 hidden max-lg:flex'> <BarsLoginMobile/> </div>
      <div className="w-[40%] max-xl:w-1/2 h-[90%] flex flex-col items-center mt-6 py-4 lg:space-y-10 max-lg:w-full max-lg:h-[60%] ">
        {/* Conteiner da imagem e textos */}
        <div className='w-full flex flex-col space-y-5 max-lg:space-y-1 items-center justify-center'>
          <img width={300} height={300} className='-translate-x-1 max-lg:hidden' src={logoMassapeAzul} alt="" />
          <div className='flex flex-col w-3/4 items-center mt-6 max-lg:mt-2 -space-y-2'>
            <h1 className=' text-3xl max-xl:text-2xl text-primary-800 font-outfit-bold'>SEJA BEM-VINDO(A)</h1>
            <h2 className='text-[25px] max-xl:text-xl  text-primary-800 font-satoshi font-medium text-center'>Assistência social na palma da mão</h2>
>>>>>>> a882cc194ccaf0ffeda861fd7aa4e760ed383d0d
          </div>
        </div>
        {/* formulário */}
        <form
          className="flex w-full flex-col items-center justify-center space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* conteiner dos inputs */}
          <div className="flex h-[70%] w-full flex-col items-center justify-center">
            {/* CPF */}
<<<<<<< HEAD
            <div className="w-3/5 flex-col items-center rounded-2xl p-2">
              <label className="text-primary-800 font-outfit text-[16px] font-medium">CPF: </label>
              <div className="relative flex">
                <IconeCPF className="absolute left-1 top-2" />
=======
            <div className="w-2/3 max-lg:w-5/6 flex-col items-center p-2 rounded-2xl">
              <label className="text-primary-800 font-outfit font-medium text-[16px]">CPF: </label>
              <div className='flex relative w-full'>
                <IconeCPF className='absolute top-2 left-1' />
>>>>>>> a882cc194ccaf0ffeda861fd7aa4e760ed383d0d
                <Controller
                  control={control}
                  name="cpf"
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none"
                      mask="000.000.000-00"
<<<<<<< HEAD
=======
                      unmask={true}
                      className="font-outfit w-full placeholder:text-primary-50 rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-primary-800 outline-none"
>>>>>>> a882cc194ccaf0ffeda861fd7aa4e760ed383d0d
                      placeholder="000.000.000-00"
                      unmask={true}
                      onAccept={(value: string) => field.onChange(value)}
                    />
                  )}
                />
              </div>
            </div>
            {/* senha */}
<<<<<<< HEAD
            <div className="w-3/5 flex-col items-center rounded-2xl p-2">
              <label className="text-primary-800 font-outfit text-[16px] font-medium">
                Senha:{' '}
              </label>
              <div className="relative flex">
                <IconeSenha className="absolute left-1 top-2" />
                <input
                  className="font-outfit w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium text-[#194A99] outline-none placeholder:text-[#194A99]"
=======
            <div className="w-2/3 max-lg:w-5/6 flex-col items-center p-2 rounded-2xl">
              <label className="text-primary-800 font-outfit font-medium text-[16px]">Senha: </label>
              <div className='flex relative'>
                <IconeSenha className='absolute top-2 left-1' />
                <input
                  className="outline-none border border-gray-300 text-primary-800  w-full pl-7 rounded-2xl py-2 placeholder:text-primary-50 text-[15px] font-outfit font-medium"
>>>>>>> a882cc194ccaf0ffeda861fd7aa4e760ed383d0d
                  placeholder="Digite sua senha"
                  type={visiblePassword ? 'text' : 'password'}
                  {...register('password')}
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
          <button
<<<<<<< HEAD
            className="bg-primary-800 font-satoshi mt-16 w-1/2 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-900"
            type="submit"
          >
            {' '}
            ENTRAR{' '}
          </button>
=======
            type='submit'
            className='bg-primary-800 px-3 py-1 w-3/5 rounded-2xl font-satoshi font-bold text-white text-lg max-lg:mt-4 mt-8 hover:bg-blue-900 duration-500 cursor-pointer'> ENTRAR </button>
>>>>>>> a882cc194ccaf0ffeda861fd7aa4e760ed383d0d
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
<<<<<<< HEAD
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
=======
      <div style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: "cover", }} className="w-3/5 max-xl:w-1/2 h-full relative max-lg:hidden" />
      <div style={{ backgroundImage: `url(${imagemMassapeMobile})`, backgroundSize: "cover", }} className="w-full flex justify-center items-center h-72 absolute top-0 lg:hidden z-0" > <img className='max-w-72 min-w-72' src={logomassape} alt="" /></div>
>>>>>>> a882cc194ccaf0ffeda861fd7aa4e760ed383d0d
    </div>
  )
}
