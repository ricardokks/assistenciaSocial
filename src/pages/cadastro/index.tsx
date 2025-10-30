import { useState } from 'react'
import { logoMassapeAzul } from '../../assets/image'
import imagemMassape from '../../assets/image/imagemMasspae.png'
import { Step1 } from './sections/step1';
import { Step2 } from './sections/step2';
import { Step3 } from './sections/step3';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCadastroSchema, type userCadastroDTO } from '../../schemas/userCadastroSchema';


export default function CadastroPage() {
  const [section, setSection] = useState(0);

   {const {  } = useForm<userCadastroDTO>({ resolver: zodResolver(userCadastroSchema) })  
  

  function RenderSection(section: number) {
    switch (section) {
      case 0: return <Step1 section={section} setSection={setSection} />
      case 1: return <Step2 section={section} setSection={setSection} />
      case 2: return <Step3 section={section} setSection={setSection} />
     }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-between overflow-hidden bg-white">
      {/* Tela principal */}
      <div className="mt-5 flex h-[90%] w-[55%] flex-col items-center space-y-16 py-4">
        {/* Conteiner da imagem e textos */}
        <div className="mb-9 flex w-full flex-col items-center justify-center space-y-5">
          <img alt="" className="-translate-x-1" height={300} src={logoMassapeAzul} width={300} />
        </div>
        {/* formulário */}
        <form
          className="flex w-full flex-col items-center justify-center space-y-3"
          onClick={(e) => e.preventDefault()}>
          {RenderSection(section)}
        </form>
      </div>
      <div
        className="relative h-full w-1/2"
        style={{ backgroundImage: `url(${imagemMassape})`, backgroundSize: 'cover' }}
      />
    </div>
  )
}}
