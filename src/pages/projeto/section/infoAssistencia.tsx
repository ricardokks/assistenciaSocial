import type { dataInfoAssistencia } from '../../../types/interface-info-assistencia'

export function InfoAssistencia(data: dataInfoAssistencia) {
  return (
    <section 
    className="fade-up-animate m-0 flex h-full max-h-[1000px] w-[100%] max-w-[1280px] flex-col items-center justify-center space-x-6 pt-10 max-md:mb-8 max-md:items-center max-md:justify-center max-md:gap-4 max-md:space-x-0 xl:min-h-[800px]">
      {/* Div foto e botão */}
      <div className="m-0 flex h-full items-center justify-center space-x-6 pt-10 max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-4 max-md:space-x-0 max-xl:min-w-[60rem] max-md:min-w-[24rem] max-lg:min-w-[40rem] max-2xl:min-w-[76rem] max-lg:max-w-[60rem]">
        <div className="rounded-4xl shadow-inner-[#194A99] shadow-inner-xl flex h-2/3 w-1/4 flex-col items-center justify-evenly bg-white p-4 drop-shadow-[#70A6FF] drop-shadow-xl max-md:w-full">
          <img className='w-48 h-48 max-md:mb-4 rounded-2xl' src={data.icone} />
          <button className="botao-contato font-satoshi-black cursor-pointer rounded-2xl p-2 text-[1.1rem] max-md:w-full max-md:text-[14px]">
            {' '}
            Entrar em contato
          </button>
        </div>

        {/* Div info */}
        <div className="rounded-4xl shadow-inner-[#194A99] shadow-inner-xl flex h-2/3 max-h-[800px] w-3/4 flex-col overflow-hidden bg-white p-8 px-10 drop-shadow-[#70A6FF] drop-shadow-xl max-md:w-full max-md:px-0">
          <div className="scrollbar-thin-personalizada flex h-full max-h-[calc(100%-0.1rem)] translate-x-5 flex-col pr-4 max-2xl:overflow-y-scroll">
            <div className="font-outfit color-text flex flex-col -space-y-2">
              <h1 className="text-[30px] font-bold">{data.nome}</h1>
              <h2 className="text-[18px] font-normal">{data.subNome}</h2>
            </div>

            <div className="font-outfit mt-4 flex flex-col">
              <h1 className="text-primary-800 text-[16px] font-bold">Sobre a Assistência:</h1>
              <h2 className="text-primary-800 text-[16px] font-light">{data.descrição}</h2>
            </div>

            <div className="font-outfit text-primary-800 mt-6 flex flex-col font-light">
              <h1 className="text-primary-800 text-[16px] font-bold">Abrange a:</h1>
              <div className="flex flex-col pl-4">
                {data.abrange.map((item: any) => (
                  <h1 key={item}>• {item}</h1>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
