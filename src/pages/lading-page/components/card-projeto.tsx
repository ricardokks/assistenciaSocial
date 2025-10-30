import type { TypeCardProjetoProps } from '../../../types/interface-card-projeto'


export function CardProjeto(props: TypeCardProjetoProps) {
  return (
    <div data-aos={props.animation ? "fade-right" : ""}>
      <article className="font-outfit flex flex-col items-start justify-between gap-4 rounded-2xl bg-white p-6 transition-all duration-500 ease-in-out hover:scale-105">
        {/* container informações sobre projeto  */}
        <div className="flex items-center justify-center gap-4">
          {/* container foto do projeto */}
          <div>
            <img alt={`Foto do projeto: ${props.titulo}`} src={props.foto} width={100} />
          </div>

          {/* container informação nome, subnome  */}
          <div className="flex flex-col gap-0">
            <h1 className="color-text font-outfit-bold text-[1.2rem]">{props.titulo}</h1>
            <p className="color-text font-outfit">{props.subtitutlo}</p>
          </div>
        </div>

        {/* container descrição sobre o projeto */}
        <div>
          <p className="text-primary-800 line-clamp-2 w-[90%] font-[500] max-md:text-[1.2rem]">
            {props.descricao}
          </p>
        </div>

        {/* container botão entrar em contato  */}
        <div>
          <button className="botao-contato font-outfit font-bold">Entrar em contato</button>
        </div>
      </article>
    </div>
  )
}
