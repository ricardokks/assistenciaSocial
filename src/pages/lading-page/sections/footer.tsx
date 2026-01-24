import { IconeFacebook } from '../../../assets/Icons/icone-facebook'
import { IconeInstagram } from '../../../assets/Icons/icone-instagram'
import { logoSEPADAzul } from '../../../assets/image'
import { LinksNavBarHomePage } from '../../../constants/links-header-home-page'
import { scrollParaIrSecao } from '../../../utils/function-scroll'
import  logomassappsemsocial  from '../../../assets/image/logomassapp-semsocial.png'


export function Footer() {
  return (
    <footer className="relative flex w-full items-start justify-center overflow-hidden bg-white px-8">
      <div className=" relative flex w-full flex-col items-center justify-center gap-8 pt-20 text-center max-md:gap-8 max-md:text-left">
        {/* container informação de massape */}
        <div className="flex items-center justify-center gap-10">
          {/* logo */}
          <div>
            <img alt="logo do SEPAD" className="max-md:w-[70px]"  width="70" height="70" src={logomassappsemsocial} />
          </div>
          <h1 className="text-primary-800">|</h1>
          {/* redes socias */}
          <div className="flex items-center justify-center gap-4">
            <a className="w-7 max-md:w-10">
              <IconeFacebook className="" />
            </a>
            <a className="w-7 max-md:w-10" href="">
              <IconeInstagram />
            </a>
          </div>
        </div>

        {/* container de seção  */}
        <div className="text-primary-800 flex h-auto items-center justify-center gap-2 font-bold max-md:gap-6">
          {LinksNavBarHomePage.map((link, index) => (
            <p
              key={index}
              className="flex w-auto cursor-pointer items-center justify-center gap-5"
              onClick={() => scrollParaIrSecao(link.id)}
            >
              {link.name} {link.name !== 'FAQ' ? '|' : ''}
            </p>
          ))}
        </div>

        {/* container frase sobre sistema  */}
        <div className="flex w-full items-center justify-center">
          <p className="text-primary-800 w-[60%] max-md:w-full max-md:text-[1.2rem]">
            Conectando você aos serviços que fazem a diferença na sua vida e na sua comunidade,
            garantindo mais praticidade, acessibilidade e transparência em cada atendimento.
          </p>
        </div>

        {/* texto dos direitos reservados  */}
        <p className="text-primary-800 font-outfit w-full text-center">
          © 2025 Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
