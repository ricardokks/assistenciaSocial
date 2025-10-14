import { logoMonocramaticaSEPAD } from '../../../assets/image'
import { LinksNavBarHomePage } from '../../../constants/links-header-home-page'

export function Header() {
  return (
    <header className="font-outfit relative flex items-center justify-between bg-transparent max-md:hidden">
      {/* logo SEPAD  */}
      <div className="cursor-pointer">
        <img alt="logo SEPAD" src={logoMonocramaticaSEPAD} />
      </div>

      {/* Links de navegação  */}
      <div className="flex content-between gap-10">
        {LinksNavBarHomePage.map((link) => (
          <a
            key={link.id}
            className="font-outfit-bold relative text-[1rem] font-bold text-white after:absolute after:bottom-[0.5px] after:left-0 after:h-[2px] after:w-0  after:bg-white  after:transition-all after:duration-300 hover:after:w-full"
            href=""
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* button de entrar  */}
      <div>
        <button className="text-primary-800 cursor-pointer rounded-2xl bg-white px-8 py-2 font-bold   transition-all duration-500 ease-in-out hover:bg-white/90">
          ENTRAR
        </button>
      </div>
    </header>
  )
}
