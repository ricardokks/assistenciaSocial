import { IconeMais } from '../../../assets/Icons/icone-mais'
import { IconeMenos } from '../../../assets/Icons/icone-menos'
import type { TypeComponenteFAQ } from '../../../types/interface-componente-faq'

export function ComponenteFAQ(props: TypeComponenteFAQ) {
  return (
    <div data-aos={props.direcao ? 'fade-left' : 'fade-right'}>
      <article
        className={`border-primary-100 relative flex h-auto  w-[500px] cursor-pointer flex-col items-start justify-center gap-2 rounded-2xl border-b-2 px-4 py-2 transition-all duration-500 ease-in-out max-md:w-full`}
        onClick={props.onToggle}
      >
        {/* container pergunta  */}
        <div className="flex w-[100%] items-center justify-between">
          <h1 className="color-text font-outfit-bold w-[80%] text-[1.1rem] max-md:text-[1.3rem]">
            {props.pergunta}
          </h1>
          <div className="w-3 cursor-pointer max-md:w-5">
            {props.isOpen ? <IconeMenos className="" /> : <IconeMais className="w-3 text-primary-800" />}
          </div>
        </div>

        {/* container da resposta  */}
        {
          <div
            className={` ${props.isOpen ? 'mb-2 mt-1 max-h-[500px] opacity-100' : 'my-0 max-h-0 opacity-0'} text-primary-800 w-full transition-all duration-1000 ease-in-out`}
          >
            <p>{props.resposta}</p>
          </div>
        }
      </article>
    </div>
  )
}
