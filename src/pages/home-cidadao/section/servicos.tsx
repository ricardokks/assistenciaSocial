import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/header'
import { CardProjeto } from '../../lading-page/components/card-projeto'

const data = [
  {
    foto: '/imgs/cras.jpg',
    titulo: 'CRAS - Centro de Referência de Assistência Social',
    subtitulo: 'Atendimento à população vulnerável',
    descricao:
      'O CRAS é a porta de entrada para os serviços socioassistenciais. Oferece acolhimento, acompanhamento familiar e programas de transferência de renda.',
  },
  {
    foto: '/imgs/creas.jpg',
    titulo: 'CREAS - Centro de Referência Especializado',
    subtitulo: 'Proteção Social Especial',
    descricao:
      'O CREAS atende indivíduos e famílias em situação de violação de direitos, como violência doméstica, abuso e abandono.',
  },
  {
    foto: '/imgs/cadunico.jpg',
    titulo: 'Cadastro Único',
    subtitulo: 'Identificação para programas sociais',
    descricao:
      'O CadÚnico reúne informações das famílias de baixa renda, permitindo acesso a benefícios como Bolsa Família, Tarifa Social e outros.',
  },
  {
    foto: '/imgs/bolsa-familia.jpg',
    titulo: 'Programa Bolsa Família',
    subtitulo: 'Transferência de renda',
    descricao:
      'O Bolsa Família auxilia financeiramente famílias em situação de pobreza, promovendo o acesso à educação e saúde.',
  },
  {
    foto: '/imgs/bolsa-familia.jpg',
    titulo: 'Programa Bolsa Família',
    subtitulo: 'Transferência de renda',
    descricao:
      'O Bolsa Família auxilia financeiramente famílias em situação de pobreza, promovendo o acesso à educação e saúde.',
  },
  {
    foto: '/imgs/bolsa-familia.jpg',
    titulo: 'Programa Bolsa Família',
    subtitulo: 'Transferência de renda',
    descricao:
      'O Bolsa Família auxilia financeiramente famílias em situação de pobreza, promovendo o acesso à educação e saúde.',
  },
]

export function Servicos(user: {user: any}) {
  return (
    <main className="main flex-col items-center overflow-y-auto px-4 max-lg:w-full max-lg:px-0">
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={user.user} user="CIDADAO" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>
      <div className="flex size-full flex-col px-4 py-1 pl-0 max-xl:px-0 max-lg:px-2">
        {/* Texto */}
        <h1 className="font-satoshi-bold text-primary-800 text-2xl max-lg:pl-1 max-lg:text-lg">
          {' '}
          Serviços Sociais
        </h1>
        {/* div do Input */}
        <div className="relative flex w-[55%] max-xl:w-4/5 max-lg:w-full">
          {/* Icone search */}
          <IconeSearch className="absolute left-3 top-[1.55rem]" />
          <input
            className="font-satoshi border-primary-800 text-primary-800 placeholder:text-primary-800/65 placeholder:font-satoshi mt-3  size-full rounded-2xl border-2 px-2 py-1 pl-10 shadow shadow-black/10 outline-none outline-0 max-xl:pl-10"
            placeholder="Procure pelo nome..."
          />
        </div>
        <div className="mt-10 grid w-full grid-cols-[repeat(auto-fit,minmax(400px,1fr))] max-xl:flex-col max-xl:items-center max-xl:justify-center max-xl:space-y-6 max-xl:pb-[8rem] max-lg:flex xl:gap-10">
          {data.map((item, idx) => (
            <CardProjeto
              key={idx}
              animation={false}
              descricao={item.descricao}
              foto={item.foto}
              subtitutlo={item.subtitulo}
              titulo={item.titulo}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
