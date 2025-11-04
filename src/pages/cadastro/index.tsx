import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { cadastro } from '../../api/cadastro/cadastro'
import { logoMassapeAzul } from '../../assets/image'
import imagemMassape from '../../assets/image/imagemMasspae.png'
<<<<<<< HEAD
import { type userCadastroDTO, userCadastroSchema } from '../../schemas/userCadastroSchema'
import { Step1 } from './sections/step1'
import { Step2 } from './sections/step2'
import { Step3 } from './sections/step3'
=======
import { Step1 } from './sections/step1';
import { Step2 } from './sections/step2';
import { Step3 } from './sections/step3';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCadastroSchema, type userCadastroDTO } from '../../schemas/userCadastroSchema';
>>>>>>> 6b1a9a446d22bc6fafd857125601002efc1fd4b7

export default function CadastroPage() {
  const [section, setSection] = useState(0)

  const methods = useForm({
    resolver: zodResolver(userCadastroSchema),
    shouldUnregister: false,
  })

  const { handleSubmit } = methods

  function onSubmit(data: userCadastroDTO) {
    console.log('submit chamado', data)
    /*   try {
      console.log(data);
      await cadastro(data);
      toast.success("Usuário cadastrado com sucesso!");
      reset();
    } catch {
      toast.error("Dados inválidos");
    }
      */
  }

  return (
    <div className="flex h-screen w-screen items-center justify-between overflow-hidden bg-white">
      <div className="mt-5 flex h-[90%] w-[55%] flex-col items-center space-y-16 py-4">
        <div className="mb-9 flex w-full flex-col items-center justify-center space-y-5">
          <img alt="" className="-translate-x-1" height={300} src={logoMassapeAzul} width={300} />
        </div>

        <FormProvider {...methods}>
          <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            {section === 0 && <Step1 section={section} setSection={setSection} />}
            {section === 1 && <Step2 section={section} setSection={setSection} />}
            {section === 2 && <Step3 section={section} setSection={setSection} />}

            {section === 2 && (
              <button
                className="w-4/7 bg-primary-800 font-satoshi mt-3 cursor-pointer rounded-2xl px-2 py-1 text-[16px] font-bold text-white duration-500 hover:bg-blue-900"
                type="submit"
              >
                Cadastrar
              </button>
            )}
          </form>
        </FormProvider>
      </div>

      <div
        className="relative h-full w-1/2"
        style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: 'cover' }}
      />
    </div>
  )
}
