import { useNavigate } from 'react-router-dom'

import { autoLogin } from '../../../api/auth/autologin'
import { logoMonocramaticaSEPAD } from '../../../assets/image'
import { LinksNavBarHomePage } from '../../../constants/links-header-home-page'
import { scrollParaIrSecao } from '../../../utils/function-scroll'
import { verifyRole } from '../../../utils/verify-role'

export function Header() {
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
            className="font-outfit-bold relative cursor-pointer text-[1rem] font-bold text-white after:absolute after:bottom-[0.5px] after:left-0 after:h-[2px] after:w-0  after:bg-white  after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => scrollParaIrSecao(link.id)}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* button de entrar  */}
      <div>
        <button
          className="text-primary-800 cursor-pointer rounded-2xl bg-white px-8 py-2 font-bold   transition-all duration-500 ease-in-out hover:bg-white/90"
          onClick={async () => await autoLoginButton()}
        >
          ENTRAR
        </button>
      </div>
    </header>
  )
}
