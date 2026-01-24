import { useState } from 'react'

import { IconeBars } from '../../../assets/Icons/IconeBars'
import { IconeClosed } from '../../../assets/Icons/IconeClosed'
import { LinksNavBarHomePage } from '../../../constants/links-header-home-page'
import  logomassapp  from '../../../assets/image/logomassapp.png'


export function HeaderMobile() {
  // estados e variaveis utilizados no componente
  const [isOpen, setIsOpen] = useState(false)

  // funções utilizadas no componente
  function HandleToggleIcon() {
    setIsOpen((prev) => !prev)
  }

  function scrollParaIrSecao(id: string) {
    const section = document.getElementById(id)

    // Função de Alterar Icon
    HandleToggleIcon()

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <header className="relative z-[10000] hidden h-auto w-full items-center justify-between bg-transparent max-md:flex">
      {/* logo SEPAD  */}
      <div className="cursor-pointer">
        <img alt="logo SEPAD" className='pt-1' width="90" height="70" src={logomassapp} />
      </div>

      {/* Icone de Bars  */}
      <button
        className="z-50 flex cursor-pointer items-center justify-center"
        onClick={HandleToggleIcon}
      >
        {isOpen ? (
          <IconeClosed className={`size-9 ${isOpen ? 'text-primary-800' : 'text-white'}`} />
        ) : (
          <IconeBars className="text-white" />
        )}
      </button>

      {/* links de navegação header mobile  */}
      <div
        className={`fixed ${isOpen ? 'translate-x-0' : 'translate-x-full'} left-0 top-0 z-40 flex  h-screen w-full justify-end bg-black/50 duration-500 ease-in-out`}
        onClick={HandleToggleIcon}
      >
        <div
          className="relative flex h-screen w-[65%] flex-col items-center justify-center gap-4 bg-white text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {LinksNavBarHomePage.map((link) => (
            <a
              key={link.id}
              className="font-outfit-bold  text-primary-800 after:bg-primary-800 relative cursor-pointer text-[1.3rem] font-bold after:absolute after:bottom-[0.5px] after:left-0 after:h-[2px] after:w-0  after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => scrollParaIrSecao(link.id)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
