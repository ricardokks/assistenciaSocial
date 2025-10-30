import { useState } from 'react'

import { IconeEditar } from '../../../assets/Icons/IconeEditar'
import { IconeLapis } from '../../../assets/Icons/IconeLapis'
import { imagemAvatar } from '../../../assets/image'
import { HeaderDashboards } from '../../../components/header'

export function Dados() {
  // estados e variaveis utilizadas no componente
  const [editarNome, setEditarNome] = useState<boolean>()
  const [editarSubNome, setEditarSubNome] = useState<boolean>()

  // Funções utilizadads no componente
  function handleEditarNome() {
    return setEditarNome((prev) => !prev)
  }

  function handleEditarSubNome() {
    return setEditarSubNome((prev) => !prev)
  }

  return (
    <main className="flex h-full w-[calc(100%-20%)] max-md:px-4 pr-4 flex-col items-start overflow-y-auto space-y-6 max-md:w-full">
      {/* componente header  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="PROFISSIONAL" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      {/* container de informações principais  */}
      <form className="font-outfit  flex size-full flex-col gap-4 max-md:pb-42">
        {/* container de informações foto, nome, subnome */}
        <div className="flex w-full items-center justify-start gap-4 rounded-2xl p-4 shadow-md outline-2 outline-[#262626]/10">
          {/* foto  */}
          <div className="relative">
            <img alt="Foto do projeto" src={imagemAvatar} width={60} />

            <div className="absolute bottom-0 right-0 cursor-pointer rounded-2xl bg-white p-1 duration-500 ease-in-out hover:bg-[#d9d9d9]">
              <IconeEditar className="text-primary-800 size-4" />
            </div>
          </div>

          {/* nome e subnome */}
          <div className="flex flex-col justify-center leading-4">
            {/* nome  */}
            <div className="relative flex w-full items-center gap-2">
              {editarNome ? (
                <input
                  className="color-text font-outfit-bold placeholder:text-primary-800/40 border-b-primary-100 mb-1 border-b-2 p-1 text-[1.4rem] outline-0"
                  placeholder="Sala Lilas"
                />
              ) : (
                <h1 className="color-text font-outfit-bold text-[1.4rem]">Sala Lilas</h1>
              )}

              {/* icone lapis editar  */}
              <div className="cursor-pointer" onClick={handleEditarNome}>
                <IconeLapis className="text-primary-800 size-4" />
              </div>
            </div>

            {/* subnome */}
            <div className="flex items-center gap-2">
              {editarSubNome ? (
                <input
                  className="color-text font-outfit-bold placeholder:text-primary-800/40 border-b-primary-100 mb-1 border-b-2 p-1 text-[1rem] outline-0"
                  placeholder="Centro de Apoio Feminino"
                />
              ) : (
                <p className="color-text">Centro de Apoio Feminino</p>
              )}

              {/* container lapis editar  */}
              <div className="cursor-pointer" onClick={handleEditarSubNome}>
                <IconeLapis className="text-primary-800 size-4" />
              </div>
            </div>
          </div>
        </div>

        {/* container de resumo sobre assistencia */}
        <div className="relative flex w-full flex-col items-start justify-start gap-4 rounded-2xl border-2 border-[#262626]/10 p-4 shadow-md">
          <h1 className="text-primary-800 font-outfit-bold">Resumo sobre a assistencia</h1>

          <textarea
            className="font-ou text-primary-800 focus:border-primary-800 w-full rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out"
            cols={3}
          />
        </div>

        {/* container sobre a assistencia */}
        <div className="relative flex w-full flex-col items-start justify-start gap-4 rounded-2xl border-2 border-[#262626]/10 p-4 shadow-md">
          <div className="flex w-full flex-col">
            <h1 className="text-primary-800 font-outfit-bold">Sobre a assistencia :</h1>

            <textarea
              className="font-outfit text-primary-800 focus:border-primary-800 w-full rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out"
              cols={3}
            />
          </div>

          {/* container de abrange a  */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-primary-800 font-outfit-bold">Abrange a:</h1>

            <textarea
              className="font-outfit text-primary-800 focus:border-primary-800 w-full rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out"
              cols={3}
            />
          </div>

          {/* container de localização  */}
          <div className="flex w-full flex-col gap-6">
            <h1 className="text-primary-800 font-outfit-bold">Localização</h1>

            <textarea
              className="font-outfit text-primary-800 focus:border-primary-800 w-full rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out"
              cols={1}
            />

            <iframe
              allowFullScreen
              className="h-[95%] w-full rounded-2xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.690972986147!2d-6.260296484161234!3d53.344097979979404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9d61e6b9e5%3A0x33ef78a4f73a8f87!2s1%20Grafton%20Street%2C%20Dublin%2C%20Ireland!5e0!3m2!1sen!2sie!4v1687620148895!5m2!1sen!2sie"
            />
          </div>
        </div>

        {/* botão salvar dados  */}
        <div className="mt-4 flex w-full items-center justify-center">
          <button
            className="hover:bg-primary-800/90 bg-primary-800 font-outfit-bold w-[50%] cursor-pointer rounded-2xl p-3 text-[1.2rem] text-white ease-in-out max-md:w-full "
            type="submit"
          >
            Salvar Aletarações
          </button>
        </div>
      </form>
    </main>
  )
}
