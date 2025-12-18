import ReactDOM from 'react-dom'

import { IconeLoading } from '../assets/Icons/icone-loading'

export function Loading() {
  return ReactDOM.createPortal(
    <main className="text-primary-800 flex h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="relative mb-6 size-40">
        {/* Círculo girando */}

        <IconeLoading />
      </div>

      {/* Texto */}
      <p className="font-satoshi-bold text-primary-800 text-center text-lg font-medium">
        Carregando informações, aguarde...
      </p>
    </main>,
    document.body
  )
}
