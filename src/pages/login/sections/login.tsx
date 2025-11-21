import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { autoLogin } from '../../../api/auth/autologin.ts'
import { login } from '../../../api/auth/login'
import { IconEyeClose } from '../../../assets/Icons/IconEyeClose'
import { IconEyeOpen } from '../../../assets/Icons/closeEyeOpen'
import { IconeCPF } from '../../../assets/Icons/iconeCpf.tsx'
import { IconeSenha } from '../../../assets/Icons/iconeSenha'
import imagemMassapeMobile from '../../../assets/image/image-mobile-login.png'
import imagemMassape from '../../../assets/image/imagemMasspae.png'
import logoMassapeAzul from '../../../assets/image/logo de massape azul.svg'
import logomassape from '../../../assets/image/logo-branca-massape.png'
import { BarsLoginMobile } from '../../../assets/svgs/bars-login-mobile.tsx'
import { Loading } from '../../../components/loading.tsx'
import { type userLoginDTO, userLoginSchema } from '../../../schemas/userLoginSchema'
import type { ILoginUserDTO } from '../../../types/type-login-user'
import { verifyRole } from '../../../utils/verify-role.ts'

export function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [visiblePassword, setVisiblePassword] = useState(false)
  const { register, handleSubmit, reset, control } = useForm<ILoginUserDTO>({
    resolver: zodResolver(userLoginSchema),
  })

  async function AutoLogin() {
    const user = await autoLogin()
    verifyRole(user.data.papel, navigate)
  }

  async function onSubmit(data: userLoginDTO) {
    try {
      setLoading(true)
      const user = await login(data)
      verifyRole(user.data.papel, navigate)
      toast.success('Usuário autenticado com sucesso!')
    } catch {
      toast.error('Credencias inválidas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    AutoLogin()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex h-screen w-screen items-center justify-between overflow-hidden bg-white max-lg:flex-col-reverse">
      {/* Tela principal */}
      <div className="top-51 absolute z-10 hidden h-32 w-full max-lg:flex">
        {' '}
        <BarsLoginMobile />{' '}
      </div>
      <div className="mt-6 flex h-[90%] w-[40%] flex-col items-center py-4 max-xl:w-1/2 max-lg:h-[60%] max-lg:w-full lg:space-y-10 ">
        {/* Conteiner da imagem e textos */}
        <div className="flex w-full flex-col items-center justify-center space-y-5 max-lg:space-y-1">
          <img
            alt=""
            className="-translate-x-1 max-lg:hidden"
            height={300}
            src={logoMassapeAzul}
            width={300}
          />
          <div className="mt-6 flex w-3/4 flex-col items-center -space-y-2 max-lg:mt-2">
            <h1 className=" text-primary-800 font-outfit-bold text-3xl max-xl:text-2xl">
              SEJA BEM-VINDO(A)
            </h1>
            <h2 className="text-primary-800 font-satoshi  text-center text-[25px] font-medium max-xl:text-xl">
              Assistência social na palma da mão
            </h2>
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
            <div className="w-2/3 flex-col items-center rounded-2xl p-2 max-lg:w-5/6">
              <label className="text-primary-800 font-outfit text-[16px] font-medium">CPF: </label>
              <div className="relative flex w-full">
                <IconeCPF className="absolute left-1 top-2" />
                <Controller
                  control={control}
                  name="cpf"
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      className="font-outfit placeholder:text-primary-50 text-primary-800 w-full rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium outline-none"
                      mask="000.000.000-00"
                      placeholder="000.000.000-00"
                      unmask={true}
                      onAccept={(value: string) => field.onChange(value)}
                    />
                  )}
                />
              </div>
            </div>
            {/* senha */}
            <div className="w-2/3 flex-col items-center rounded-2xl p-2 max-lg:w-5/6">
              <label className="text-primary-800 font-outfit text-[16px] font-medium">
                Senha:{' '}
              </label>
              <div className="relative flex">
                <IconeSenha className="absolute left-1 top-2" />
                <input
                  className="text-primary-800 placeholder:text-primary-50 font-outfit w-full  rounded-2xl border border-gray-300 py-2 pl-7 text-[15px] font-medium outline-none"
                  placeholder="Digite sua senha"
                  type={visiblePassword ? 'text' : 'password'}
                  {...register('senha')}
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
            className="bg-primary-800 font-satoshi mt-8 w-3/5 cursor-pointer rounded-2xl px-3 py-1 text-lg font-bold text-white duration-500 hover:bg-blue-900 max-lg:mt-4"
            type="submit"
          >
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
        className="relative h-full w-3/5 max-xl:w-1/2 max-lg:hidden"
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
