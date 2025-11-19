import { Bell, ChevronDown, Edit2, Moon, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { IconeMensagemQuadrada } from '../../assets/Icons/icone-mensagem-quadrada'
import { configSchema } from '../../schemas/userConfigSchema'
import type { typeConfig } from '../../types/type-config'

export function ConfigOpcoes(data: { id?: string; values: typeConfig }) {
  const [isAnimate, setIsAnimate] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [libras, setLibras] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [darkTheme, setDarkTheme] = useState(false)

  const { register, handleSubmit } = useForm<typeConfig>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      idioma: 'PORTUGUES',
      tamanhoFonte: 16,
      altoContraste: false,
      leitorTela: false,
    },
  })

  async function onSubmit(data: typeConfig) {
    try {
      // await updateUser()
    } catch {
      toast.error('Erro ao atualizar as suas informações ')
    }
  }

  return (
    <form className="mt-4 w-full max-w-5xl space-y-4 px-4 py-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-5 rounded-2xl bg-white p-6 shadow-sm">
        {/* Escala da fonte */}
        <div>
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-gray-100 p-3">
              <IconeMensagemQuadrada />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-base font-semibold text-gray-900">
                Escala da fonte dos textos
              </h3>
              <p className="text-sm text-gray-500">
                Aumente ou diminua a quantidade de zoom e o tamanho das fontes no geral
              </p>
            </div>
            <div className="w-1/9 relative mt-2 min-w-20">
              <select
                {...register('tamanhoFonte')}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-2 text-sm outline-none "
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                onMouseDown={() => setIsAnimate((prev) => !prev)}
                onMouseLeave={() => setIsAnimate(false)}
                onMouseUp={() => setIsAnimate(false)}
              >
                <option value="12">12 px</option>
                <option value="14">14 px</option>
                <option value="16">16 px</option>
                <option value="18">18 px</option>
                <option value="20">20 px</option>
                <option value="22">22 px</option>
                <option value="24">24 px</option>
              </select>
              <ChevronDown
                className={`absolute right-1.5 top-2.5 size-5 transition-all duration-500 ${isAnimate ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          </div>
        </div>
        <div className="h-0.5 w-full rounded-2xl bg-gray-800/20" />
        {/* Libras */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <IconeMensagemQuadrada />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Libras</h3>
                <p className="text-sm text-gray-500">
                  Ative o tradutor e utilização de libras como linguagem
                </p>
              </div>
            </div>
            <button
              {...register('leitorTela')}
              className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${
                libras ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={() => setLibras(!libras)}
            >
              <span
                className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform duration-300 ${
                  libras ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
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
                Ative ou desative as notificações no no aparelho
              </p>
            </div>
          </div>
          <button
            className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${
              notifications ? 'bg-green-500' : 'bg-gray-300'
            }`}
            onClick={() => setNotifications(!notifications)}
          >
            <span
              className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform duration-300 ${
                notifications ? 'translate-x-6' : 'translate-x-0'
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
              <p className="text-sm text-gray-500">
                Gerencie as descrições do seu perfil e sua conta
              </p>
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
          className="bg-primary-800 w-1/3 cursor-pointer rounded-xl py-2 font-medium text-white transition-opacity hover:opacity-90"
          type="submit"
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  )
}
