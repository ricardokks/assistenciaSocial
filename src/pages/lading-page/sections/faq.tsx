import { useState } from 'react'

import { ondasFundo } from '../../../assets/image'
import { PerguntasLadingPage } from '../../../constants/perguntas-lading-page'
import { ComponenteFAQ } from '../components/componente-faq'

export function SectionFAQ() {
  // estados e variaveis utilizadas no componente
  const [isOpenFAQ, setIsOpenFAQ] = useState<number | null>()

  // Funções utilizadas
  function HandleIsOpen(id: number) {
    setIsOpenFAQ((isOpenFAQ) => (isOpenFAQ === id ? null : id))
  }

  return (
    <section
      className="relative mt-10 flex w-full items-start justify-center overflow-hidden px-8"
      id="faq"
    >
      {/* Imagem fundo onda */}
      <div className="absolute inset-0 size-full">
        <img
          alt="Ondas de fundo"
          className="z-10 size-full rotate-[-180deg] object-fill"
          src={ondasFundo}
        />
      </div>

      {/* container de informações principais  */}
      <div className="py-18 relative m-0 flex size-[100%] h-auto max-w-[1280px] flex-col items-center justify-start gap-8 max-md:gap-12 max-md:py-24">
        {/* container de textos  */}
        <div className="flex flex-col text-center max-md:gap-2" data-aos="fade-left">
          <h1 className="color-text font-outfit-bold text-4xl max-md:text-5xl">
            Perguntas frequentes
          </h1>
          <p className="text-primary-800 font-satoshi text-[1rem] max-md:text-[1.2rem]">
            Respostas para perguntas que você pode ter:
          </p>
        </div>

        {/* container de rederização das perguntas  */}
        <div className="flex flex-col gap-6">
          {PerguntasLadingPage.map((card, index) => (
            <ComponenteFAQ
              {...card}
              key={index}
              isOpen={isOpenFAQ === card.id}
              onToggle={() => HandleIsOpen(card.id)}
            />
          ))}
        </div>
      </div>

      {/* container branco parte de baixo  */}
      <div className="absolute bottom-0 h-10 w-full bg-white"></div>
    </section>
  )
}
