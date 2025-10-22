export function MapaAssistencia(data: {localizacao: string}){
    return (
         <section className="m-0 flex h-full w-[100%] max-w-[1280px] max-h-[1000px] xl:min-h-[800px] items-center flex-col space-x-6 max-md:space-x-0 max-md:gap-4 mt-4">
        <div className="bg-white h-[90%] px-4 w-full min-h-[300px] max-h-[450px] max-md:w-full rounded-4xl drop-shadow-[#70A6FF] drop-shadow-xl shadow-inner-[#194A99] shadow-inner-xl pt-8 pl-6 flex flex-col overflow-hidden max-md:pt-4 max-md:pl-4">
          <h1 className="color-text font-outfit font-bold text-[25px] max-md:text-[20px]">Localização: </h1>
          <h2 className="text-primary-800 font-outfit font-light text-[14px]">{data.localizacao}</h2>

          <div className="w-full h-full">
            <iframe width="100%" className="rounded-2xl h-[95%]" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.mapsdirections.info/it/calcola-la-popolazione-su-una-mappa/">popolazione per regione Italia mappa</a></iframe>
          </div>
        </div>

      </section>
    )
}