import { IconeCras } from "../../assets/Icons/icone-cras";
import { HeaderMobile } from "./components/headerMobileProjeto";
import { HeaderProjeto } from "./components/headerProjeto";

export function Projeto() {
  const abrangeArray = [
    { text: 'Acompanhamento familiar' },
    { text: 'Agendamento para inclusão nos grupos de Proteção he Atendimento Integral à Família (PAIF)' },
    { text: 'Agendamento para inclusão de crianças, adolescentes e idosos nos grupos do Serviço de' },
    { text: 'Convivência e Fortalecimento de Vínculos' },
    { text: 'Agendamento de visita domiciliar para auxílio natalidade' },
    { text: 'Agendamento de visita domiciliar para cesta básica' }
  ]

  return (
    <main className="background-gradient flex-col flex max-md:gap-6 h-screen max-md:h-auto w-screen items-center p-4 overflow-x-hidden">
      <HeaderProjeto />
      <HeaderMobile />
      {/* Section */}
      <section className="m-0 flex h-full w-[100%] max-w-[1280px] xl:min-h-[800px] max-h-[1000px] items-center max-md:items-center max-md:justify-center pt-10 justify-center flex-col space-x-6 max-md:space-x-0 max-md:mb-8 max-md:gap-4 ">
        {/* Div foto e botão */}
        <div className="m-0 flex h-full items-center max-md:items-center max-md:justify-center pt-10 justify-center max-md:flex-col space-x-6 max-md:space-x-0 max-md:gap-4 ">
          <div className="bg-white h-2/3 w-1/4 max-md:w-full rounded-4xl drop-shadow-[#70A6FF] drop-shadow-xl shadow-inner-[#194A99] shadow-inner-xl py-4 flex flex-col items-center px-4 justify-evenly">
            <IconeCras />
            <button className="botao-contato font-satoshi-black text-[1.1rem] max-md:w-full max-md:text-[14px] p-2 rounded-2xl cursor-pointer"> Entrar em contato</button>
          </div>



          {/* Div info */}
          <div className="bg-white h-2/3 w-3/4 max-h-[800px] max-md:w-full rounded-4xl drop-shadow-[#70A6FF] drop-shadow-xl shadow-inner-[#194A99] shadow-inner-xl p-8 px-10 flex flex-col overflow-hidden max-md:px-0">
            <div className="flex flex-col max-2xl:overflow-y-scroll scrollbar-thin-personalizada pr-4 h-full max-h-[calc(100%-0.1rem)] translate-x-5">
              <div className="flex flex-col font-outfit color-text -space-y-2">
                <h1 className="font-bold text-[30px]">CRAS | Francisca Lima</h1>
                <h2 className="font-normal text-[18px]">Centro de Referência de Assistência Social</h2>
              </div>

              <div className="mt-4 flex flex-col font-outfit">
                <h1 className="font-bold text-[16px] text-primary-800">Sobre a Assistência:</h1>
                <h2 className="font-light text-[16px] text-primary-800">
                  é a porta de entrada da Assistência Social. É um local público, localizado prioritariamente em áreas de maior vulnerabilidade social, onde são oferecidos os serviços de Assistência Social, com o objetivo de fortalecer a convivência com a família e com a comunidade.
                </h2>
              </div>

              <div className="mt-6 flex flex-col font-outfit font-light text-primary-800">
                <h1 className="font-bold text-[16px] text-primary-800">Abrange a:</h1>
                <div className="pl-4 flex flex-col">
                  {abrangeArray.map((item) => (
                    <h1 key={item.text}>• {item.text}</h1>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="m-0 flex h-full w-[100%] max-w-[1280px] max-h-[1000px] xl:min-h-[800px] items-center flex-col space-x-6 max-md:space-x-0 max-md:gap-4 mt-4">
        <div className="bg-white h-[90%] px-4 w-full min-h-[300px] max-h-[450px] max-md:w-full rounded-4xl drop-shadow-[#70A6FF] drop-shadow-xl shadow-inner-[#194A99] shadow-inner-xl pt-8 pl-6 flex flex-col overflow-hidden max-md:pt-4 max-md:pl-4">
          <h1 className="color-text font-outfit font-bold text-[25px] max-md:text-[20px]">Localização: </h1>
          <h2 className="text-primary-800 font-outfit font-light text-[14px]">Vila Santo Antônio Da Conquista, Bairro Nossa Senhora de Fátima</h2>



          <div className="w-full h-full">
            <iframe width="100%" className="rounded-2xl h-[95%]" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.mapsdirections.info/it/calcola-la-popolazione-su-una-mappa/">popolazione per regione Italia mappa</a></iframe>
          </div>
        </div>


      </section>
    </main>
  )
}
