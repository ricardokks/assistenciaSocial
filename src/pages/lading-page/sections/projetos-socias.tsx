import { TextoscardsProjeto } from '../../../constants/textos-card-projeto'
import { CardProjeto } from '../components/card-projeto'

export function SectionProjetosSociais() {
  return (
    <section
      className="relative flex w-full items-start justify-center overflow-hidden px-8"
      id="projetos"
    >
      {/* container de informações principais  */}
      <div className="relative m-0 flex size-[100%] h-auto max-w-[1280px] flex-col items-center justify-center gap-12 py-10">
        {/* texto  */}
        <h1
          className="font-outfit-bold text-center text-4xl text-white max-md:text-left"
          data-aos="fade-right"
        >
          Descubra os projetos em que nosso sistema <br className="max-md:hidden" /> atua e podemos
          ajudar.
        </h1>

        {/* container rederização dos cards  */}
        <div className="gap-y-15 grid w-full grid-cols-2 gap-20 max-md:grid-cols-1 max-sm:gap-8">
          {TextoscardsProjeto.map((card, index) => (
            <CardProjeto animation={true} key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
