import { useNavigate } from 'react-router-dom'

import { LinksDropbox } from '../../../constants/links-dropbox'
import type { DropboxProps } from '../../../types/interface-dropbox-props'

export function Dropbox(props: DropboxProps) {
  const navigate = useNavigate()

  return (
    <article
      className={`${props.abrirDropbox ? 'translate-y-1 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'} absolute -left-3 top-20 flex size-auto flex-col items-start justify-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-md transition-all duration-500 ease-in-out`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* container triangulo  */}
      <div className="absolute left-4 top-0 z-0 size-7 -translate-y-3 rotate-[45deg] rounded-tl-[5.97px] bg-white"></div>

      {/* Container Configurações  */}
      {LinksDropbox.map((card, index) => (
        <div
          key={index}
          className="z-10 flex w-full items-center justify-start gap-4 rounded-[5.97px] py-1.5 pl-2 pr-3 transition-all duration-500 ease-in-out hover:bg-black/10"
          onClick={() => {
            if (!props.id) return
            navigate(card.navigate(props.id))
          }}
        >
          <div className="bg-primary-800 content-center rounded-2xl p-2">
            {<card.icone className="size-5" />}
          </div>
          <div>
            <h4 className="text-primary-800 font-outfit-bold text-[1.1rem]">{card.texto}</h4>
          </div>
        </div>
      ))}
    </article>
  )
}
