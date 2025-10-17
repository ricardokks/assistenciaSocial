import { useState } from 'react'

import { IconeMais } from '../../../assets/Icons/icone-mais'
import { IconeMenos } from '../../../assets/Icons/icone-menos'
import type { TypeComponenteFAQ } from '../../../types/interface-componente-faq'

export function ComponenteFAQ(props: TypeComponenteFAQ) {
  // estados e variaveis utilizadas no componente
  const [isOpen, setIsOpen] = useState(false)

  // funções utilizadas
  function handleIsOpen() {
    setIsOpen((prev) => !prev)
  }
  return (
    <div data-aos={props.direcao ? 'fade-left' : 'fade-right'}>
      <article
        className={`relative w-[500px] cursor-pointer max-md:w-full  border-primary-100 rounded-2xl border-b-2 flex h-auto flex-col items-start justify-center gap-2 px-4 py-2 transition-all duration-500 ease-in-out`}
        onClick={handleIsOpen}
      >
        {/* container pergunta  */}
        <div className="flex w-[100%] items-center justify-between">
          <h1 className="color-text font-outfit-bold w-[80%] text-[1.1rem] max-md:text-[1.3rem]">
            {props.pergunta}
          </h1>
          <div className="w-3 cursor-pointer max-md:w-5" onClick={handleIsOpen}>
            {isOpen ? <IconeMenos className="" /> : <IconeMais className="w-9" />}
          </div>
        </div>

        {/* container da resposta  */}
        <div
          className={` ${isOpen ? 'mt-1 max-h-[500px] opacity-100 mb-2' : 'mt-0 mb-0 max-h-0 opacity-0'} text-primary-800 w-full transition-all duration-1000 ease-in-out`}
        >
          <p>{props.resposta}</p>
        </div>
      </article>
    </div>
  )
}
