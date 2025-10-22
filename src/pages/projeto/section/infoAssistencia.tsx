import type { dataInfoAssistencia } from "../../../types/interface-info-assistencia";

export function InfoAssistencia(data: dataInfoAssistencia){
    return (
        <section className="m-0 flex h-full w-[100%] max-w-[1280px] xl:min-h-[800px] max-h-[1000px] items-center max-md:items-center max-md:justify-center pt-10 justify-center flex-col space-x-6 max-md:space-x-0 max-md:mb-8 max-md:gap-4 ">
                {/* Div foto e botão */}
                <div className="m-0 flex h-full items-center max-md:items-center max-md:justify-center pt-10 justify-center max-md:flex-col space-x-6 max-md:space-x-0 max-md:gap-4 ">
                  <div className="bg-white h-2/3 w-1/4 max-md:w-full rounded-4xl drop-shadow-[#70A6FF] drop-shadow-xl shadow-inner-[#194A99] shadow-inner-xl py-4 flex flex-col items-center px-4 justify-evenly">
                    {<data.icone/>} 
                    <button className="botao-contato font-satoshi-black text-[1.1rem] max-md:w-full max-md:text-[14px] p-2 rounded-2xl cursor-pointer"> Entrar em contato</button>
                  </div>
        
        
                  {/* Div info */}
                  <div className="bg-white h-2/3 w-3/4 max-h-[800px] max-md:w-full rounded-4xl drop-shadow-[#70A6FF] drop-shadow-xl shadow-inner-[#194A99] shadow-inner-xl p-8 px-10 flex flex-col overflow-hidden max-md:px-0">
                    <div className="flex flex-col max-2xl:overflow-y-scroll scrollbar-thin-personalizada pr-4 h-full max-h-[calc(100%-0.1rem)] translate-x-5">
                      <div className="flex flex-col font-outfit color-text -space-y-2">
                        <h1 className="font-bold text-[30px]">{ data.nome }</h1>
                        <h2 className="font-normal text-[18px]">{ data.subNome }</h2>
                      </div>
        
                      <div className="mt-4 flex flex-col font-outfit">
                        <h1 className="font-bold text-[16px] text-primary-800">Sobre a Assistência:</h1>
                        <h2 className="font-light text-[16px] text-primary-800">
                         {data.descrição}
                        </h2>
                      </div>
        
                      <div className="mt-6 flex flex-col font-outfit font-light text-primary-800">
                        <h1 className="font-bold text-[16px] text-primary-800">Abrange a:</h1>
                        <div className="pl-4 flex flex-col">
                          {data.abrange.map((item: any) => (
                            <h1 key={item.text}>• {item.text}</h1>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
    )
}