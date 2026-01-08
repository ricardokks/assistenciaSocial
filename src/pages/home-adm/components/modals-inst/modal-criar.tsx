import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createAssistencia } from '../../../../api/assistencia/createAssistencia'
import { CriarServicos } from '../../../../api/servicos/createService'
import { IconeCidadao } from '../../../../assets/Icons/Icon-cidadao'
import { IconeClosed } from '../../../../assets/Icons/IconeClosed'
import { IconeLocal } from '../../../../assets/Icons/icone-local'
import { IconeVoltar } from '../../../../assets/Icons/iconeVoltar'
import { ErrorMessage } from '../../../../components/ui/errorMsg'
import type { AssistenciaSchemaDTO } from '../../../../dto/Assistencia/assistenciaDTO'
import { AssistenciaSchema } from '../../../../schemas/assistenciaSchema'
import type { ModalAssistenciaProps } from '../../../../types/interface-modal-assistencia'

export function ModalCriarInst(props: ModalAssistenciaProps) {
  const methods = useForm({
    resolver: zodResolver(AssistenciaSchema),
    shouldUnregister: false,
  })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods

  const [fotoFront, setFotoFront] = useState<string | null>(null)
  const [foto, setFoto] = useState<File | undefined>(undefined)

  const [tags, setTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  function addFoto(e: any) {
    const file = e.target.files[0]
    setFoto(file)
    setFotoFront(URL.createObjectURL(file))
  }

  function addTag() {
    if (inputValue.trim().length > 1 && !tags.includes(inputValue.trim())) {
      setTags((prev) => [...prev, inputValue.trim()])
      setInputValue('')
    }
  }

  useEffect(() => {
    setValue('abrange', tags)
  }, [tags, setValue])

  async function onSubmit(data: AssistenciaSchemaDTO) {
    try {
      if (!foto) return

      const payload = {
        ...data,
        icone: foto,
      }

      const res = await createAssistencia(payload)

      await Promise.all(
        tags.map((tag) => CriarServicos(res.data.data.id, tag))
      )

      toast.success('Assistência criada com sucesso!')
      props.handleAbrirModalDelete()
      props.refreshAssistencias()
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        'Erro ao criar assistência. Por favor, tente novamente.'
      toast.error(msg)
    }
  }

  return ReactDOM.createPortal(
    <section
      className={`${
        props.abrilModalAssistencia
          ? 'opacity-100'
          : 'pointer-events-none opacity-0'
      } fixed top-0 z-[9999] flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-[3px] transition-all`}
    >
      <article
        className={`${
          props.abrilModalAssistencia
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0'
        } relative flex h-[85%] w-[70%] min-w-[360px] flex-col rounded-2xl bg-white px-4 py-7 transition-all max-lg:w-[80%]`}
      >
        {/* HEADER */}
        <nav className="bg-primary-800 absolute left-0 top-0 h-12 w-full rounded-t-2xl">
          <div className="flex items-center justify-between px-4 py-2">
            <h1 className="font-outfit-bold text-2xl text-white">
              Nova Instituição
            </h1>
            <div
              className="cursor-pointer"
              onClick={() => {
                setTags([])
                setInputValue('')
                props.handleAbrirModalDelete()
              }}
            >
              <IconeClosed className="size-8 text-white" />
            </div>
          </div>
        </nav>

        {/* CONTEÚDO */}
        <div className="mt-6 flex size-full flex-col pt-4">
          <div
            className="mb-3 flex cursor-pointer pl-10"
            onClick={props.handleAbrirModalDelete}
          >
            <IconeVoltar className="text-primary-800 size-6" />
          </div>

          <form
            className="flex size-full flex-col justify-between"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex h-4/5 w-full flex-col gap-4 overflow-y-scroll px-10">
              {/* FOTO */}
              <div className="grid grid-cols-[128px_1fr] items-center gap-4">
                <div
                  className="border-primary-800/50 size-32 overflow-hidden rounded-full border-2"
                  style={{
                    backgroundImage: `url(${fotoFront})`,
                    backgroundSize: 'cover',
                  }}
                >
                  <input className="size-full" type="file" onChange={addFoto} />
                </div>

                <div className="flex flex-col gap-4">
                  {/* UNIDADE */}
                  <div>
                    <p className="text-primary-800 font-outfit">
                      Nome da Instituição:
                    </p>
                    <div className="relative">
                      <input
                        {...register('unidade')}
                        className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                      />
                      <IconeCidadao className="absolute left-2 top-2 size-7" />
                    </div>
                    <ErrorMessage message={errors.unidade?.message} />
                  </div>

                  {/* SUBNOME */}
                  <div>
                    <p className="text-primary-800 font-outfit">
                      Resumo da Instituição:
                    </p>
                    <div className="relative">
                      <input
                        {...register('subnome')}
                        className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                      />
                      <IconeCidadao className="absolute left-2 top-2 size-7" />
                    </div>
                    <ErrorMessage message={errors.subnome?.message} />
                  </div>
                </div>
              </div>

              {/* SOBRE */}
              <div>
                <p className="text-primary-800 font-outfit">
                  Sobre a assistência:
                </p>
                <div className="relative">
                  <textarea
                    {...register('sobre')}
                    className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                  />
                  <IconeLocal className="absolute left-2 top-2 size-7" />
                </div>
                <ErrorMessage message={errors.sobre?.message} />
              </div>

              {/* ABRANGE */}
              <div>
                <p className="text-primary-800 font-outfit">Abrange à:</p>

                <div className="border-primary-800/50 relative rounded-2xl border-2 p-2">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="border-primary-100/80 flex items-center rounded-2xl border-2 px-2"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-2 text-negative"
                          onClick={() =>
                            setTags((t) => t.filter((_, i) => i !== index))
                          }
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* INPUT  */}
                  <div className="relative">
                    <input
                      className="w-full pl-10 outline-none"
                      placeholder="Ex: Correção de documentos, auxílio financeiro, etc."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <IconeLocal className="absolute bottom-2 left-2 size-7" />
                    <button
                      type="button"
                      onClick={() => addTag()}
                      className="bg-primary-800 absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <ErrorMessage message={errors.abrange?.message} />
              </div>

              {/* LOCALIZAÇÃO */}
              <div>
                <p className="text-primary-800 font-outfit">Localização:</p>
                <div className="relative">
                  <input
                    {...register('localizacao')}
                    className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                  />
                  <IconeLocal className="absolute left-2 top-2 size-7" />
                </div>
                <ErrorMessage message={errors.localizacao?.message} />
              </div>
            </div>

            {/* BOTÃO */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary-800 hover:bg-primary-800/90 mb-4 w-[80%] rounded p-2 text-white"
              >
                Criar Instituição
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>,
    document.body
  )
}
