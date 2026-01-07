import { useNavigate } from 'react-router-dom'
import { fotoPadraoInstituicao } from '../../../assets/image'

export function CardProjeto(props: any) {
  const navigate = useNavigate()

  return (
    <div data-aos={props.animation ? 'fade-right' : ''}>
      <article className="font-outfit animate-scale-in max-md:fmax-w-[380px] flex max-h-[280px] min-h-[280px] flex-col items-start justify-between gap-4 rounded-2xl bg-white p-6 transition-all duration-700 ease-in-out max-md:min-w-[380px]">
        {/* container informações sobre projeto  */}
        <div className="flex items-center justify-center gap-4">
          {/* container foto do projeto */}
          <div>
            <img 
            className='rounded-2xl' 
            alt={`Foto do projeto: ${props.unidade}`} 
            src={props.icone ? props.icone : fotoPadraoInstituicao}
             width={100} />
          </div>

          {/* container informação nome, subnome  */}
          <div className="flex flex-col gap-0">
            <h1 className="color-text font-outfit-bold text-[1.2rem]">{props.unidade}</h1>
            <p className="color-text font-outfit">{props.subnome}</p>
          </div>
        </div>

        {/* container descrição sobre o projeto */}
        <div>
          <p className="text-primary-800 line-clamp-2 w-[90%] font-[500] max-md:text-[1.2rem]">
            {props.sobre}
          </p>
        </div>

        {/* container botão entrar em contato  */}
        <div className="flex w-full items-center space-x-4 max-md:space-x-8">
          <button
            className="botao-contato font-outfit font-bold max-md:w-1/2 max-md:whitespace-nowrap max-md:px-2 max-md:text-sm"
            onClick={() => navigate('/login')}
          >
            Realizar agendamento
          </button>

          <button
            className="botao-contato font-outfit font-bold max-md:w-1/2 max-md:text-sm"
            onClick={() => navigate(`/sepad-massape/projeto/${props.id}`)}
          >
            Mais sobre
          </button>
        </div>
      </article>
    </div>
  )
}
