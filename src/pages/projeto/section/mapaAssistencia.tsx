export function MapaAssistencia({ localizacao }: { localizacao: string }) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    localizacao
  )}&t=&z=15&ie=UTF8&iwloc=B&output=embed`

  return (
    <section className="fade-up-animate m-0 mt-4 flex h-full max-h-[1000px] w-full max-w-[1280px] flex-col items-center">
      <div className="rounded-4xl shadow-inner-[#194A99] shadow-inner-xl flex h-[90%] max-h-[450px] min-h-[300px] w-full flex-col overflow-hidden bg-white px-4 pl-6 pt-8 drop-shadow-xl">
        <h1 className="color-text font-outfit text-[25px] font-bold">
          Localização:
        </h1>

        <h2 className="text-primary-800 font-outfit text-[14px] font-light">
          {localizacao}
        </h2>

        <div className="size-full">
          <iframe
            className="h-[95%] w-full rounded-2xl"
            frameBorder="0"
            scrolling="no"
            src={mapSrc}
          />
        </div>
      </div>
    </section>
  )
}
