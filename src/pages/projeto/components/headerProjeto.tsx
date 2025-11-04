import { IconeSPD } from '../../../assets/Icons/icone-spd-svg'
import { LinksNavBarHomePage } from '../../../constants/links-header-home-page'
import { scrollParaIrSecao } from '../../../utils/function-scroll'

export function HeaderProjeto() {
  return (
    <header className="font-outfit relative flex w-full max-w-[1280px] items-center justify-between bg-transparent px-6 max-md:hidden">
      {/* Logo SEPAD */}
      <div className="cursor-pointer">
        <IconeSPD />
      </div>

      {/* Links de navegação */}
      <nav className="flex items-center gap-10">
        {LinksNavBarHomePage.map((link) => (
          <a
            key={link.id}
            className="font-outfit-bold relative cursor-pointer text-[1rem] font-bold text-white after:absolute after:bottom-[0.5px] after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => scrollParaIrSecao(link.id)}
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Botão de entrar */}
      <div>
        <button className="text-primary-800 cursor-pointer rounded-2xl bg-white px-8 py-2 font-bold transition-all duration-500 ease-in-out hover:bg-white/90">
          ENTRAR
        </button>
      </div>
    </header>
  )
}
