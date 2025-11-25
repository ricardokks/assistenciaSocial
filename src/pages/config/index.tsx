import { Bell, ChevronDown, ChevronLeft, Edit2, Moon, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconeMensagemQuadrada } from '../../assets/Icons/icone-mensagem-quadrada'
import { getUser } from '../../api/user/getUser'
import { Loading } from '../../components/loading'
import { useForm } from 'react-hook-form'
import type { typeConfig } from '../../types/type-config'
import { configSchema } from '../../schemas/userConfigSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export function Config() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [isAnimate, setIsAnimate] = useState(false)
  const [autoTheme, setAutoTheme] = useState(true)
  const [config, setConfig] = useState<typeConfig | null>(null)

  // RHF
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<typeConfig>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      idioma: 'PORTUGUES',
      tamanhoFonte: 16,
      notificacao: true,
      temaEscuro: window.matchMedia("(prefers-color-scheme: dark)").matches,
    },
  })

  const fontSize = watch("tamanhoFonte")
  const darkTheme = watch("temaEscuro")

  async function GetDataUserConfig() {
    try {
      const { configuracao } = await getUser()
      setConfig(configuracao)

      reset({
        idioma: configuracao.idioma,
        tamanhoFonte: configuracao.tamanhoFonte,
        temaEscuro: configuracao.temaEscuro ?? false,
        notificacao: configuracao.notificacao
      })

    } finally {
      // aa
    }
  }

  useEffect(() => {
    async function load() {
      await GetDataUserConfig()
      setLoading(false)
    }

    load()
  }, [])


  useEffect(() => {
    if (autoTheme) {
      // seguir navegador
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", prefersDark)
      return
    }

    // seguir usuário
    document.documentElement.classList.toggle("dark", darkTheme)
  }, [darkTheme, autoTheme])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const listener = () => {
      if (autoTheme) {
        document.documentElement.classList.toggle("dark", media.matches)
        setValue("temaEscuro", media.matches)
      }
    }

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [autoTheme])

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])


  async function onSubmit(data: typeConfig) {
    console.log("ENVIAR PARA API:", data)
    // await updateUserConfig(data)
  }

  if (loading) return <Loading />

  return (
    <main className="font-outfit flex min-h-screen w-full flex-col items-center bg-[#EAEAEA] ">
      {/* Header */}
      <header className="bg-primary-800 flex w-full max-w-[150rem] items-center gap-3 px-6 py-4 text-white">
        <button className="transition-opacity hover:opacity-80">
          <ChevronLeft onClick={() => navigate(-1)} className="size-8" />
        </button>
        <h1 className="text-xl font-bold">Configurações Gerais</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full max-w-5xl space-y-4 px-4 py-6">

        <div className="flex flex-col space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          {/* Escala da fonte */}
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-gray-100 p-3">
              <IconeMensagemQuadrada />
            </div>

            <div className="flex-1">
              <h3 className="mb-1 text-base font-semibold text-gray-900">
                Escala da fonte dos textos
              </h3>
              <p className="text-sm text-gray-500">
                Aumente ou diminua o tamanho das fontes
              </p>
            </div>

            <div className="w-1/9 relative mt-2 min-w-20">
              <select
                {...register("tamanhoFonte", { valueAsNumber: true })}
                className="w-full text-black appearance-none rounded-lg border border-gray-300 bg-white p-2 text-sm outline-none "
                onMouseDown={() => setIsAnimate((prev) => !prev)}
                onMouseLeave={() => setIsAnimate(false)}
                onMouseUp={() => setIsAnimate(false)}
              >
                {[12, 14, 16, 18, 20, 22, 24].map((n) => (
                  <option key={n} value={n}>{n} px</option>
                ))}
              </select>

              <ChevronDown
                className={`absolute right-1.5 top-2.5 size-5 transition-all duration-500 text-black ${isAnimate ? 'rotate-180' : 'rotate-0'
                  }`}
              />
            </div>
          </div>

          <div className="h-0.5 w-full rounded-2xl bg-gray-800/20" />

          {/* Libras */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <IconeMensagemQuadrada />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Libras</h3>
                <p className="text-sm text-gray-500">
                  Ative o tradutor de Libras no app
                </p>
              </div>
            </div>

            <button
              type="button"
              className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${config?.idioma === 'LIBRAS' ? 'bg-green-500' : 'bg-gray-300'
                }`}
              onClick={() => {
                const novoValor = config?.idioma === "LIBRAS" ? "PORTUGUES" : "LIBRAS"
                setValue("idioma", novoValor)
                setConfig((prev) => ({ ...prev!, idioma: novoValor }))
              }
              }
            >
              <span
                className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform duration-300 ${config?.idioma === 'LIBRAS' ? 'translate-x-6' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Notificações */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <Bell className="size-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Notificações</h3>
                <p className="text-sm text-gray-500">
                  Ative ou desative as notificações
                </p>
              </div>
            </div>

            <button
              type="button"
              className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${config?.notificacao ? 'bg-green-500' : 'bg-gray-300'
                }`}
              onClick={() => {
                setValue("notificacao", !config?.notificacao)
                setConfig((prev) => ({ ...prev!, notificacao: !prev?.notificacao }))
              }}
            >
              <span
                className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform duration-300 ${config?.notificacao ? 'translate-x-6' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Tema escuro */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <Moon className="size-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Tema escuro</h3>
                <p className="text-sm text-gray-500">Ative o modo escuro</p>
              </div>
            </div>

            <button
              type="button"
              className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${config?.temaEscuro ? 'bg-green-500' : 'bg-gray-300'
                }`}
              onClick={() => {
                setAutoTheme(false)
                setValue("temaEscuro", !config?.temaEscuro)
                setConfig(prev => ({ ...prev!, temaEscuro: !prev?.temaEscuro }))
              }}

            >
              <span
                className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform duration-300 ${config?.temaEscuro ? 'translate-x-6' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Conta */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <User className="size-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Conta</h3>
                <p className="text-sm text-gray-500">Gerencie seu perfil</p>
              </div>
            </div>

            <button className="text-gray-700 transition-colors hover:text-gray-900">
              <Edit2 className="size-5" />
            </button>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex w-full items-center justify-center pt-4">
          <button
            type="submit"
            className="bg-primary-800 w-1/3 cursor-pointer rounded-xl py-2 font-medium text-white transition-opacity hover:opacity-90"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </main>
  )
}
