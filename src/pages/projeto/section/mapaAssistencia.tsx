export function MapaAssistencia(data: { localizacao: string }) {
  return (
    <section className="fade-up-animate m-0 mt-4 flex h-full max-h-[1000px] w-[100%] max-w-[1280px] flex-col items-center space-x-6 max-md:gap-4 max-md:space-x-0 xl:min-h-[800px]">
      <div className="rounded-4xl shadow-inner-[#194A99] shadow-inner-xl flex h-[90%] max-h-[450px] min-h-[300px] w-full flex-col overflow-hidden bg-white px-4 pl-6 pt-8 drop-shadow-[#70A6FF] drop-shadow-xl max-md:w-full max-md:pl-4 max-md:pt-4">
        <h1 className="color-text font-outfit text-[25px] font-bold max-md:text-[20px]">
          Localização:{' '}
        </h1>
        <h2 className="text-primary-800 font-outfit text-[14px] font-light">{data.localizacao}</h2>

        <div className="size-full">
          <iframe
            className="h-[95%] rounded-2xl"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            width="100%"
          >
            <a href="https://www.mapsdirections.info/it/calcola-la-popolazione-su-una-mappa/">
              popolazione per regione Italia mappa
            </a>
          </iframe>
        </div>
      </div>
    </section>
  )
}
