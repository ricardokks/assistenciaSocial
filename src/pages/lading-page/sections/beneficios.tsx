import { ondasFundo } from '../../../assets/image'
import { TextosCardsBeneficios } from '../../../constants/card-beneficios'
import { CardBeneficios } from '../components/card-beneficios'

export function SectionBeneficios() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden px-8 max-md:py-14">
      {/* Imagem fundo onda */}
      <div className="absolute inset-0 size-full">
        <img
          alt="Ondas de fundo"
          className="z-10 size-full rotate-[-180deg] object-fill"
          src={ondasFundo}
        />
      </div>

      {/* container de informações principais  */}
      <div className="relative m-0 flex size-[100%] min-h-[100vh] max-w-[1280px] items-center justify-center">
        <div className="z-50 flex flex-col items-center gap-12">
          {/*   texto  */}
          <h1 className="titulo-inner font-outfit-bold text-[1rem]" data-aos="fade-left">
            Quais são os benefícios de agendar pelo <br className="max-md:hidden" /> SEPAD?
          </h1>

          {/* renderização dos cards beneficios  */}
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 max-md:grid-cols-1">
            {TextosCardsBeneficios.map((card, index) => (
              <CardBeneficios {...card} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
