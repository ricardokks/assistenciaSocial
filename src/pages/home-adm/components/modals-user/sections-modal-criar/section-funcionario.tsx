import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createUser } from '../../../../../api/user/createUser'
import { IconeCidadao } from '../../../../../assets/Icons/IconeCidadao'
import { IconeCasa } from '../../../../../assets/Icons/icone-casa'
import { IconeData } from '../../../../../assets/Icons/icone-data'
import { IconeLocal } from '../../../../../assets/Icons/icone-local'
import { IconeNis } from '../../../../../assets/Icons/icone-nis'
import { IconeEmail } from '../../../../../assets/Icons/iconeEmail'
import { IconeInstituicao } from '../../../../../assets/Icons/iconeInstituicao'
import { IconeSenha } from '../../../../../assets/Icons/iconeSenha'
import { ErrorMessage } from '../../../../../components/ui/errorMsg'
import type { AssistenciaDTOO } from '../../../../../dto/Assistencia/assistenciaDTO'
import { type userCadastroDTO, userCadastroSchema } from '../../../../../schemas/userCadastroSchema'
import { api } from '../../../../../lib/axios.config'

type Localidade = {
  id: string
  nome: string
}

type Props = {
  handleAbrirModalDelete: () => void
  setSection: (value: number) => void
  setStage: (value: number) => void
  refreshUsers: () => void
}

export function FuncionarioSection(props: Props) {
  const [Localidades, setLocalidades] = useState<Localidade[]>([])
  const [Assistencias, setAssistencias] = useState<AssistenciaDTOO[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingA, setLoadingA] = useState(true)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<userCadastroDTO>({
    resolver: zodResolver(userCadastroSchema),
    shouldUnregister: false,
  })

async function fetchLocalidades() {
  try {
    const response = await api.get('/localidades/all')
    setLocalidades(response.data?.data ?? [])
  } catch (error) {
    console.error('Erro ao buscar localidades', error)
  } finally {
    setLoading(false)
  }
}

async function fetchAssistencias() {
  try {
    const response = await api.get('/assistencias')
    setAssistencias(response.data?.data ?? [])
  } catch (error) {
    console.error('Erro ao buscar assistências', error)
  } finally {
    setLoadingA(false)
  }
}


  useEffect(() => {
    fetchLocalidades()
    fetchAssistencias()
  }, [])

  async function onSubmit(data: userCadastroDTO) {
    console.log('comeu')
    console.log('FORM DATA:', data)
    try {
      const res = await createUser(data, 'FUNCIONARIO')
      console.log('response:', res.data)
      props.setStage(0)
      props.setSection(0)
      props.handleAbrirModalDelete()

      props.refreshUsers()

      toast.success('Funcionário criado com sucesso!')
    } catch (error) {
      toast.error('Erro ao criar funcionário. Por favor, tente novamente.')
    }
  }


  return (
    <div className="h-[90%] w-full">
      <form
        className="flex size-full flex-col items-start justify-between gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex h-4/5 w-full flex-col gap-4 overflow-y-scroll px-10">
          {/* Nome */}
          <div className="flex flex-col gap-1">
            <p className="text-primary-800 font-outfit">Nome do Cidadão:</p>
            <div className="relative">
              <input
                {...register('nome')}
                className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                placeholder="Digite o nome do cidadão"
              />
              <IconeCidadao className="absolute left-2 top-2 size-7" />
            </div>
            <ErrorMessage message={errors?.nome?.message} />
          </div>

          {/* CPF */}
          <div className="flex flex-col gap-1">
            <p className="text-primary-800 font-outfit">CPF do Cidadão:</p>
            <div className="relative">
              <Controller
                control={control}
                name="cpf"
                render={({ field }) => (
                  <IMaskInput
                    className="border-primary-800/50 text-primary-800 focus:border-primary-800  w-full rounded-2xl  border-2 p-2 pl-10 outline-none"
                    inputRef={field.ref}
                    mask="000.000.000-00"
                    placeholder="000.000.000-00"
                    unmask={true}
                    value={field.value}
                    onAccept={(value) => field.onChange(value)}
                  />
                )}
              />
              <IconeCidadao className="absolute left-2 top-2 size-7" />
            </div>
            <ErrorMessage message={errors?.cpf?.message} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Senha */}
            <div className="flex flex-col gap-1">
              <p className="text-primary-800 font-outfit">Senha:</p>
              <div className="relative">
                <input
                  {...register('senha')}
                  className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                  placeholder="Digite a senha"
                  type="password"
                />
                <IconeSenha className="absolute left-2 top-2 size-7" />
              </div>
              <ErrorMessage message={errors?.senha?.message} />
            </div>

            {/* Data nascimento */}
            <div className="flex flex-col gap-1">
              <p className="text-primary-800 font-outfit">Data de Nascimento:</p>
              <div className="relative">
                <input
                  {...register('data_nascimento')}
                  className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                  type="date"
                />
                <IconeData className="absolute left-2 top-2 size-7" />
              </div>
              <ErrorMessage message={errors?.data_nascimento?.message} />
            </div>
          </div>

          {/* Nome da mãe */}
          <div className="flex flex-col gap-1">
            <p className="text-primary-800 font-outfit">Nome da Mãe:</p>
            <div className="relative">
              <input
                {...register('nome_mae')}
                className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                placeholder="Digite o nome da mãe"
              />
              <IconeCidadao className="absolute left-2 top-2 size-7" />
            </div>
            <ErrorMessage message={errors?.nome_mae?.message} />
          </div>

          {/* Localidade */}
          <div className="flex flex-col gap-1">
            <p className="text-primary-800 font-outfit">Localidade:</p>
            <div className="relative">
              <select
                {...register('localidadeId', { required: true })}
                className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border py-2 pl-10 text-[15px] font-medium text-[#194A99] outline-none"
                disabled={loading}
              >
                <option value="">{loading ? 'Carregando...' : 'Selecione a localidade'}</option>

                {Localidades ? (
                  Localidades?.map((localidade) => (
                    <option key={localidade.id} value={localidade.id}>
                      {localidade.nome}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <IconeLocal className="absolute left-2 top-1 size-7" />
            </div>
            <ErrorMessage message={errors?.localidadeId?.message} />
          </div>

          {/* Rua */}
          <div className="flex flex-col gap-1">
            <p className="text-primary-800 font-outfit">Rua:</p>
            <div className="relative">
              <input
                {...register('rua')}
                className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                placeholder="Digite a rua"
              />
              <IconeLocal className="absolute left-2 top-2 size-7" />
            </div>

            <ErrorMessage message={errors?.rua?.message} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Complemento */}
            <div className="flex flex-col gap-1">
              <p className="text-primary-800 font-outfit">Complemento:</p>
              <div className="relative">
                <input
                  placeholder="Complemento..."
                  {...register('complemento')}
                  className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                />
                <IconeCasa className="absolute left-2 top-2 size-7" />
              </div>
              <ErrorMessage message={errors?.complemento?.message} />
            </div>

            {/* Número */}
            <div className="flex flex-col gap-1">
              <p className="text-primary-800 font-outfit">Número:</p>
              <div className="relative">
                <input
                  placeholder="ex: 654"
                  {...register('numero_casa')}
                  className="border-primary-800/50 w-full rounded-2xl border-2 p-2 pl-10 outline-none"
                />
                <IconeCasa className="absolute left-2 top-2 size-7" />
              </div>
              <ErrorMessage message={errors?.numero_casa?.message} />
            </div>
          </div>

          {/* Assistencia */}
          <div className="flex flex-col gap-1">
            <p className="text-primary-800 font-outfit">Assistencia:</p>
            <div className="relative">
              <select
                {...register('assistenciaId', { required: true })}
                className="font-outfit placeholder:text-primary-50 w-full rounded-2xl border py-2 pl-10 text-[15px] font-medium text-[#194A99] outline-none"
                disabled={loadingA}
              >
                <option value="">{loadingA ? 'Carregando...' : 'Selecione a assistência'}</option>

                {Assistencias ? (
                  Assistencias?.map((assistencia) => (
                    <option key={assistencia.id} value={assistencia.id}>
                      {assistencia.unidade}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <IconeInstituicao className="text-primary-800 absolute left-2 top-1 size-7" />
            </div>
            <ErrorMessage message={errors?.localidadeId?.message} />
          </div>
        </div>

        <div className="flex w-full justify-center">
          <button className="bg-primary-800 w-[80%] rounded-md p-2 font-bold text-white hover:opacity-90">
            Criar Funcionário
          </button>
        </div>
      </form>
    </div>
  )
}
