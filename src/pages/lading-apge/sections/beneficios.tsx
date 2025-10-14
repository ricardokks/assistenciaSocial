import { IconeBars } from '../../../assets/Icons/IconeBars'
import { ondasFundo } from '../../../assets/image'
import { TextosCardsBeneficios } from '../../../constants/card-beneficios'
import { CardBeneficios } from '../components/card-beneficios'

export function SectionBeneficios() {
  return (
    <section className="relative flex items-center justify-center">
      {/* Imagem fundo onda */}
      <img alt="" className="absolute z-0 rotate-[-90deg]" src={ondasFundo} width={226} />

      <div className="z-50 pt-20">
        <h1 className="titulo-inner text-2xl">
          Quais são os benefícios de agendar pelo <br /> SEPAD?
        </h1>

        <div>
          
        </div>
        {TextosCardsBeneficios.map((card, index) => (
          <CardBeneficios {...card} key={index} />
        ))}
      </div>
    </section>
  )
}
