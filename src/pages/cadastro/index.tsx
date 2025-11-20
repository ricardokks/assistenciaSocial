import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { cadastro } from '../../api/user/cadastro'
import { logoMassape, logoMassapeAzul } from '../../assets/image'
import imagemMassapeMobile from '../../assets/image/image-mobile-login.png'
import imagemMassape from '../../assets/image/imagemMasspae.png'
import { BarsLoginMobile } from '../../assets/svgs/bars-login-mobile'
import { type userCadastroDTO, userCadastroSchema } from '../../schemas/userCadastroSchema'
import { Step1 } from './sections/step1'
import { Step2 } from './sections/step2'
import { Step3 } from './sections/step3'

export default function CadastroPage() {
  const [section, setSection] = useState(0)

  const methods = useForm({
    resolver: zodResolver(userCadastroSchema),
    shouldUnregister: false,
  })

  const { handleSubmit } = methods

  async function onSubmit(data: userCadastroDTO) {
    console.log('submit chamado', data)
    try {
      console.log(data)
      await cadastro(data)
      toast.success('Usuário cadastrado com sucesso')
      methods.reset()
    } catch {
      toast.error('Erro ao cadastrar')
    }
  }

  async function passStep(Props: any[]) {
    const isValid = await methods.trigger(Props)

    if (isValid) {
      setSection(section + 1)
    } else {
      toast.error('Preencha os dados corretamente')
    }
  }
  async function IsValid(Props: any[]) {
    const isValid = await methods.trigger(Props)

    if (!isValid) {
      toast.error('Preencha os dados corretamente')
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-between overflow-hidden bg-white max-lg:flex-col-reverse">
      <div className="mt-5 flex h-[90%] w-[55%] flex-col items-center space-y-16 py-4 max-lg:w-full max-lg:justify-end max-lg:pb-14">
        <div className="mb-3 flex w-full flex-col items-center justify-center space-y-5">
          <img
            alt=""
            className="-translate-x-1 max-lg:hidden"
            height={300}
            src={logoMassapeAzul}
            width={300}
          />
        </div>

        <FormProvider {...methods}>
          <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            {section === 0 && (
              <Step1
                passStep={() => passStep(['nome', 'cpf', 'senha'])}
                section={section}
                setSection={setSection}
              />
            )}
            {section === 1 && (
              <Step2
                passStep={() => passStep(['nomeMae', 'dataNascimento', 'nis'])}
                section={section}
                setSection={setSection}
              />
            )}
            {section === 2 && (
              <Step3
                passStep={() => passStep(['localidade', 'rua', 'numero_casa', 'complemento'])}
                section={section}
                setSection={setSection}
              />
            )}

            {section === 2 && (
              <button
                className="w-4/7 bg-primary-800 font-satoshi-bold mt-3 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-900 max-lg:w-[calc(57.142857%-40px)]"
                type="submit"
                onClick={async () => IsValid(['localidade', 'rua', 'numero_casa', 'complemento'])}
              >
                Cadastrar
              </button>
            )}
          </form>
        </FormProvider>
      </div>

      <div
        className="relative h-full w-3/5 max-xl:w-1/2 max-lg:hidden"
        style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: 'cover' }}
      />
      <div
        className="absolute top-0 z-0 flex h-48 w-full items-center justify-center lg:hidden"
        style={{ backgroundImage: `url(${imagemMassapeMobile})`, backgroundSize: 'cover' }}
      >
        {' '}
        <img alt="" className="min-w-64 max-w-64" src={logoMassape} />
        <div className="absolute -bottom-8 h-24 w-full">
          <BarsLoginMobile></BarsLoginMobile>
        </div>
      </div>
    </div>
  )
}
