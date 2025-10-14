import { browserDesktop } from '../../../assets/image'
import { Header } from '../components/header'
import { HeaderMobile } from '../components/header-mobile'

export function SectionHero() {
  return (
    <section className="font-outfit flex flex-col justify-center">
      <Header />
      <HeaderMobile />

      {/* Informações principais  */}
      <div className="flex w-full flex-col items-center justify-center gap-4 max-md:gap-8 pt-20 text-center">
        {/* container de textos  */}
        <div className="flex w-full max-md:text-left flex-col items-center justify-center gap-2">
          <h1 className="text-5xl font-bold text-white">
            Tudo que você precisa para realizar os <br className='max-md:hidden' />
            seus agendamentos
          </h1>
          <p className="font-satoshi w-[75%] max-md:w-full font-[500] text-white">
            Tudo em um só lugar. Agende, gerencie e acompanhe seus horários de forma intuitiva, sem{' '}
            <br className='max-md:hidden' />
            complicações e com a praticidade que você precisa para manter sua rotina sempre
            organizada.
          </p>
        </div>

        {/* container botões */}
        <div className="flex max-md:justify-start w-full items-center justify-center gap-4">
          <button className="text-primary-800 max-sm:w-[50%] cursor-pointer rounded-3xl bg-white px-6 py-3 font-extrabold duration-500 ease-in-out hover:bg-white/90">
            Agendar agora
          </button>
          <button
            className="hover:text-primary-800 max-sm:w-[50%] group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-white bg-transparent px-6 py-3 font-extrabold
  text-white before:absolute before:inset-0 before:origin-right before:scale-x-0 before:bg-white before:transition-transform
  before:duration-500 hover:before:origin-left hover:before:scale-x-100"
          >
            <span className="relative z-10">Contate-nos</span>
          </button>
        </div>

        {/* container imagem browser  */}
        <div>
          <img alt="" src={browserDesktop} />
        </div>
      </div>
    </section>
  )
}
