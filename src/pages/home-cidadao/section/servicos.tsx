import { IconeSearch } from "../../../assets/Icons/icone-search";
import { HeaderDashboards } from "../../../components/header";
import { CardProjeto } from "../../lading-page/components/card-projeto";

const data = [
  {
    foto: "/imgs/cras.jpg",
    titulo: "CRAS - Centro de Referência de Assistência Social",
    subtitulo: "Atendimento à população vulnerável",
    descricao:
      "O CRAS é a porta de entrada para os serviços socioassistenciais. Oferece acolhimento, acompanhamento familiar e programas de transferência de renda.",
  },
  {
    foto: "/imgs/creas.jpg",
    titulo: "CREAS - Centro de Referência Especializado",
    subtitulo: "Proteção Social Especial",
    descricao:
      "O CREAS atende indivíduos e famílias em situação de violação de direitos, como violência doméstica, abuso e abandono.",
  },
  {
    foto: "/imgs/cadunico.jpg",
    titulo: "Cadastro Único",
    subtitulo: "Identificação para programas sociais",
    descricao:
      "O CadÚnico reúne informações das famílias de baixa renda, permitindo acesso a benefícios como Bolsa Família, Tarifa Social e outros.",
  },
  {
    foto: "/imgs/bolsa-familia.jpg",
    titulo: "Programa Bolsa Família",
    subtitulo: "Transferência de renda",
    descricao:
      "O Bolsa Família auxilia financeiramente famílias em situação de pobreza, promovendo o acesso à educação e saúde.",
  },
]

export function Servicos() {
    return (
        <main className="flex h-screen w-[calc(100%-20%)] flex-col items-center space-y-6 overflow-y-auto px-4 max-md:w-full max-md:px-0">
            <HeaderDashboards.root>
                <HeaderDashboards.perfil user="CIDADAO" />
                <HeaderDashboards.notificacao />
            </HeaderDashboards.root>
            <div className="w-full h-full px-4 pl-8 py-1 flex flex-col">
                {/* Texto */}
                <h1 className="font-satoshi-bold text-primary-800 text-2xl"> Serviços Sociais</h1>
                {/* div do Input */}
                <div className="relative flex w-[55%]">
                    {/* Icone search */}
                    <IconeSearch className="absolute top-[1.55rem] left-3"/>
                    <input
                        placeholder="Procure pelo nome..."
                        className="w-full h-full bg-gray-500/10 px-2 py-1 rounded-2xl mt-3 pl-10 placeholder:font-satoshi text-primary-800 placeholder:text-primary-800 outline-none shadow shadow-black/10" />
                </div>
                <div className="w-full grid grid-cols-2 grid-rows-2 gap-10 mt-10">
                    {data.map(item => (
                        <CardProjeto foto={item.foto} titulo={item.titulo} subtitutlo={item.subtitulo} descricao={item.descricao} animation={false}/>
                    ))}
                </div>
            </div>
        </main>
    )
}
