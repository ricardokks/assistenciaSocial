import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { createAssistencia } from '../../../../api/assistencia/createAssistencia'
import { IconeCidadao } from '../../../../assets/Icons/Icon-cidadao'
import { IconeClosed } from '../../../../assets/Icons/IconeClosed'
import { IconeLocal } from '../../../../assets/Icons/icone-local'
import { IconeVoltar } from '../../../../assets/Icons/iconeVoltar'
import { ErrorMessage } from '../../../../components/ui/errorMsg'
import type { AssistenciaSchemaDTO } from '../../../../dto/Assistencia/assistenciaDTO'
import { AssistenciaSchema } from '../../../../schemas/assistenciaSchema'
import type { ModalAssistenciaProps } from '../../../../types/interface-modal-assistencia'
import { toast } from 'sonner'

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

    const foto = URL.createObjectURL(file)
    setFotoFront(foto)
  }

  function addTag() {
    console.log('clicou')
    if (inputValue.length > 1 && inputValue.trim() !== '') {
      setTags((tags) => [...tags, inputValue])
      setInputValue('')
      console.log('clicou2')
      console.log(tags)
    }
  }

  useEffect(() => {
    setValue('abrange', tags)
  }, [tags])

  async function onSubmit(data: AssistenciaSchemaDTO) {
    try{
    console.log('data do form', data)
    if (!foto) return

    const payload = {
      ...data,
      icone: foto,
    }

    const res = await createAssistencia(payload)
    console.log('ERROS DO FORM', errors)

    console.log('response', res.data)

    toast.success('Assistência criada com sucesso!')
    props.handleAbrirModalDelete()
    props.refreshAssistencias()

  }catch(error){
    toast.error('Erro ao criar assistência. Por favor, tente novamente.')
  }
  }

  return ReactDOM.createPortal(
    <section
      className={`${props.abrilModalAssistencia ? 'opacity-100' : 'pointer-events-none opacity-0'} fixed top-0 z-[9999] flex  h-screen w-full items-center justify-center bg-black/50 backdrop-blur-[3px] transition-all duration-500 ease-in-out`}
    >
      {/* Modal de Criação do Agendamento  */}
      <article
        className={` ${props.abrilModalAssistencia ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} relative flex size-[70%] h-[85%] min-w-[360px] items-start justify-between rounded-2xl bg-white p-7 px-4 transition-all duration-300 ease-in-out max-lg:w-[80%]`}
      >
        {/* parte de cima do componente */}
        <nav className="bg-primary-800 absolute left-0 top-0 h-12 w-full rounded-t-2xl">
          <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="font-outfit-bold text-2xl text-white">Novo Usuário</h1>
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

        {/* Seção dos forms */}

        <div
          className={` mt-6 flex flex-col w-full h-full overflow-x-hidden items-center justify-end pt-4 `}
        >
          <div
            className=" mb-3 flex cursor-pointer place-self-start pl-10"
            onClick={() => {
              props.handleAbrirModalDelete()
            }}
          >
            {' '}
            <IconeVoltar className="text-primary-800 size-6" />{' '}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col  overflow-x-hidden items-start justify-between "
          >
            {/* container informações nome, cpf, data do agendamento, descrição  */}
            <div className="flex h-4/5 w-full flex-col gap-4  px-10 overflow-y-scroll">
              {/* nome  */}

              <div
                className="w-full gap-4 items-center grid-cols-[128px_1fr] grid 3
              6,2"
              >
                <div
                  style={{ backgroundImage: `url(${fotoFront})` }}
                  className="h-32 w-32 rounded-full border-2 border-primary-800/50 overflow-hidden"
                >
                  {' '}
                  <input onChange={(e) => addFoto(e)} type="file" className="w-full h-full" />
                </div>

                <div className="w-full h-full flex gap-4 flex-col">
                  <div className="flex w-[97%] flex-col gap-1">
                    <p className="text-primary-800 font-outfit">Nome da Instituição:</p>

                    <div className="relative flex w-full rounded-2xl">
                      <input
                        {...register('unidade')}
                        className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                        placeholder="Digite o nome do cidadão"
                        type="text"
                      />
                      <IconeCidadao className="absolute left-2 top-2 size-7" />
                    </div>
                    <ErrorMessage message={errors.unidade?.message} />
                  </div>

                  <div className="flex w-[97%] flex-col gap-1">
                    <p className="text-primary-800 font-outfit">Resumo da Instituição:</p>

                    <div className="relative flex w-full rounded-2xl">
                      <input
                        {...register('subnome')}
                        className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                        placeholder="Digite o nome do cidadão"
                        type="text"
                      />
                      <IconeCidadao className="absolute left-2 top-2 size-7" />
                    </div>
                    <ErrorMessage message={errors.subnome?.message} />
                  </div>
                </div>
              </div>

              {/* Localidade  */}
              <div className="flex w-[97%] flex-col gap-1">
                <p className="text-primary-800 font-outfit">Sobre a assistência:</p>

                <div className="relative flex w-full rounded-2xl">
                  <textarea
                    {...register('sobre')}
                    className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                    placeholder="Ex: Rua das Flores, 123 - Bairro Jardim"
                  ></textarea>
                  <IconeLocal className="absolute left-2 top-2 size-7" />
                </div>
                <ErrorMessage message={errors.sobre?.message} />
              </div>

              {/* Localidade  */}
              <div className="flex w-[97%] flex-col gap-1">
                <p className="text-primary-800 font-outfit">Abrange á:</p>

                <div className="border-primary-800/50 relative text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2  outline-none">
                  <div className="w-full min-h-10 items-center flex h-fit gap-2 flex-wrap mb-4">
                    {tags.map((tag, index) => (
                      <h1
                        key={index}
                        className="border-primary-100/80 font-outfit rounded-2xl border-2 items-center flex px-2"
                      >
                        {tag}

                        <button
                          type="button"
                          onClick={() => {
                            setTags((tags) => tags.filter((_, i) => i !== index))
                          }}
                          className=" font-satoshi-black ml-1.5 text-lg cursor-pointer hover:text-negative duration-300 ease items-center h-full flex -translate-y-0.5"
                        >
                          x
                        </button>
                      </h1>
                    ))}
                  </div>

                  <input
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                    placeholder="Ex: Correção de documentos, auxílio financeiro, etc."
                    type="text"
                    className="pl-10 w-full outline-none"
                    value={inputValue}
                  ></input>

                  <IconeLocal className="absolute left-2 bottom-2 size-7" />
                </div>
                <ErrorMessage message={errors.abrange?.message} />
              </div>

              {/* Localidade  */}
              <div className="flex w-[97%] flex-col gap-1">
                <p className="text-primary-800 font-outfit">Localização:</p>

                <div className="relative flex w-full rounded-2xl">
                  <input
                    {...register('localizacao')}
                    className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                    placeholder="Ex: Rua das Flores, 123 - Bairro Jardim"
                    type="text"
                  />
                  <IconeLocal className="absolute left-2 top-2 size-7" />
                </div>
                <ErrorMessage message={errors.localizacao?.message} />
              </div>
            </div>

            {/* container button  */}
            <div className="flex w-full items-center justify-center">
              <button
                type="submit"
                onClick={() => console.log('clicou no submitasd')}
                className="bg-primary-800 hover:bg-primary-800/90 w-[80%] mb-4 cursor-pointer  rounded-[5.97px] p-2 text-[1.1rem] font-bold text-white duration-500 ease-in-out max-md:w-full"
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
