import { useNavigate } from 'react-router-dom'

import { autoLogin } from '../../../api/auth/autologin'
import { browserDesktop, browserMobile } from '../../../assets/image'
import { verifyRole } from '../../../utils/verify-role'
import { Header } from '../components/header'
import { HeaderMobile } from '../components/header-mobile'

export function SectionHero() {
  const navigate = useNavigate()

  async function autoLoginButton() {
    try {
      const user = await autoLogin()
      verifyRole(user.data.papel, navigate)
    } catch {
      navigate('/login')
    }
  }

  return (
    <section
      className="font-outfit m-0 flex size-[100%] h-auto max-w-[1280px] flex-col justify-start bg-transparent p-4 px-5"
      id="inicio"
    >
      <Header />
      <HeaderMobile />

      {/* Informações principais  */}
      <div className=" relative flex w-full flex-col items-center justify-center gap-4 pt-20 text-center max-md:gap-8">
        {/* container de textos  */}
        <div className="flex w-full flex-col items-center justify-center gap-2 max-md:text-center">
          <h1 className="text-5xl  font-bold text-white">
            Tudo que você precisa para realizar os <br className="max-md:hidden" />
            seus agendamentos
          </h1>
          <p className="font-satoshi w-[75%] font-[500] text-white max-md:w-full">
            Tudo em um só lugar. Agende, gerencie e acompanhe seus horários de forma intuitiva, sem{' '}
            <br className="max-md:hidden" />
            complicações e com a praticidade que você precisa para manter sua rotina sempre
            organizada.
          </p>
        </div>

        {/* container botões */}
        <div className="flex w-full items-center justify-center gap-4 max-md:flex-col max-md:items-center max-md:justify-start">
          <button
            className="text-primary-800 cursor-pointer rounded-3xl bg-white px-6 py-3 font-extrabold duration-500 ease-in-out hover:bg-white/90 max-sm:w-[80%]"
            onClick={async () => await autoLoginButton()}
          >
            Agendar agora
          </button>
          <a
            className="max-md:w-full"
            target="_blank"
            href="https://wa.me/558894923323?text=Olá,%20gostaria%20de%20mais%20informações!
"
          >
            <button
              className="hover:text-primary-800 group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-white bg-transparent px-6 py-3 font-extrabold text-white
  before:absolute before:inset-0 before:origin-right before:scale-x-0 before:bg-white before:transition-transform before:duration-500
  hover:before:origin-left hover:before:scale-x-100  max-sm:w-[80%]"
            >
              <span className="relative z-10">Contate-nos</span>
            </button>
          </a>
        </div>

        {/* container imagem browser  */}
        <div className="">
          {/* Imagem browser desktop  */}
          <img alt="" className="max-md:hidden" src={browserDesktop} />

          {/* Imagem browser mobile  */}
          <img alt="" className="hidden w-[120rem] max-md:block" src={browserMobile} />
          {/* degradê  */}
        </div>
      </div>
    </section>
  )
}
