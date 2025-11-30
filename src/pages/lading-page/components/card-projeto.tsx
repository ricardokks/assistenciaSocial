import { useNavigate } from 'react-router-dom'
import type { TypeCardProjetoProps } from '../../../types/interface-card-projeto'

export function CardProjeto(props: TypeCardProjetoProps) {
  const navigate = useNavigate()
  
  return (
    <div data-aos={props.animation ? 'fade-right' : ''}>
      <article className="font-outfit animate-scale-in flex flex-col items-start justify-between gap-4 rounded-2xl bg-white p-6 transition-all duration-700 ease-in-out">
        {/* container informações sobre projeto  */}
        <div className="flex items-center justify-center gap-4">
          {/* container foto do projeto */}
          <div>
            <img alt={`Foto do projeto: ${props.titulo}`} src={props.foto} width={100} />
          </div>

          {/* container informação nome, subnome  */}
          <div className="flex flex-col gap-0">
            <h1 className="color-text font-outfit-bold text-[1.2rem]">{props.titulo}</h1>
            <p className="color-text font-outfit">{props.subtitulo}</p>
          </div>
        </div>

        {/* container descrição sobre o projeto */}
        <div>
          <p className="text-primary-800 line-clamp-2 w-[90%] font-[500] max-md:text-[1.2rem]">
            {props.descricao}
          </p>
        </div>

        {/* container botão entrar em contato  */}
        <div className='w-full space-x-4 flex items-center'>
          <button className="botao-contato font-outfit font-bold max-md:text-sm max-md:w-1/2 max-md:whitespace-nowrap max-md:px-1" onClick={props.onClick}>
            Realizar agendamento
          </button>

           <button 
           className="botao-contato font-outfit font-bold max-md:text-sm max-md:w-1/2" 
           onClick={() => navigate(`/sepad-massape/projeto/${props.id}`)}>
            Mais sobre
          </button>
        </div>
      </article>
    </div>
  )
}
