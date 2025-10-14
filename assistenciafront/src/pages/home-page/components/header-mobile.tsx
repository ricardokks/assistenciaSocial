import { useState } from 'react'

import { IconeBars } from '../../../assets/Icons/IconeBars'
import { IconeClosed } from '../../../assets/Icons/IconeClosed'
import { logoMonocramaticaSEPAD } from '../../../assets/image'
import { LinksNavBarHomePage } from '../../../constants/links-header-home-page'

export function HeaderMobile() {
  // estados e variaveis utilizados no componente
  const [isOpen, setIsOpen] = useState(false)

  // funções utilizadas no componente
  function HandleToggleIcon() {
    setIsOpen((prev) => !prev)
  }
  return (
    <header className="hidden h-auto w-full items-center justify-between bg-transparent max-md:flex">
      {/* logo SEPAD  */}
      <div className="cursor-pointer">
        <img alt="logo SEPAD" src={logoMonocramaticaSEPAD} />
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
        className={`fixed ${isOpen ? 'translate-x-0' : 'translate-x-full'} top-0 z-40  flex h-screen w-[100%] justify-end duration-500 ease-in-out`}
      >
        <div className="relative flex h-screen w-[65%] flex-col items-center justify-center gap-4 bg-white text-left">
          {LinksNavBarHomePage.map((link) => (
            <a
              key={link.id}
              className="font-outfit-bold text-primary-800 after:bg-primary-800 relative text-[1rem] font-bold after:absolute after:bottom-[0.5px] after:left-0 after:h-[2px]  after:w-0  after:transition-all after:duration-300 hover:after:w-full"
              href=""
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
