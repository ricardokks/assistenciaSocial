import type { CardBeneficiosProps } from '../../../types/type-card-beneficio'

export function CardBeneficios(props: CardBeneficiosProps) {
  return (
    <article className="shadow-card-beneficio rounded-[17.2px] p-5">
      {/* Container de Relogio  */}
      <div>{<props.icone />}</div>

      {/* container titulo  */}
      <div>
        <h1 className="color-text">{props.titulo}</h1>
      </div>

      {/* container descrição  */}
      <div>{props.descricao}</div>
    </article>
  )
}
