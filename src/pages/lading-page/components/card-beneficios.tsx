import type { CardBeneficiosProps } from '../../../types/interface-card-beneficio'

export function CardBeneficios(props: CardBeneficiosProps) {
  return (
    <div className="flex items-center justify-center" data-aos="fade-left">
      <article className="shadow-card-beneficio font-outfit h-full flex w-auto flex-col items-center justify-center gap-6 rounded-[17.2px] p-5 transition-all duration-500 ease-in-out hover:scale-110">
        {/* Container dos icones  */}
        <div className="">{<props.icone />}</div>

        {/* container titulo  */}
        <div className="flex w-full items-center justify-center">
          <h1 className="color-text font-outfit-bold text-center text-[1.5rem] leading-8 max-md:w-[80%] max-md:text-[1.7rem]">
            {props.titulo}
          </h1>
        </div>

        {/* container descrição  */}
        <div className="flex w-full items-center justify-center text-center">
          <p className="text-primary-800 font-outfit max-md:[1.3rem] text-[1rem] max-md:text-[1.2rem]">
            {props.descricao}
          </p>
        </div>
      </article>
    </div>
  )
}
