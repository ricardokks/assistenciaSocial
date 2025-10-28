import { IconeNotificacao } from '../../assets/Icons/icone-notificacao'

export function InicioNotificacao() {
  return (
    <div className="mt-2 flex size-full flex-col space-y-2 overflow-y-auto">
      {/* Componente de notificação */}
      <div className="relative flex h-auto w-full items-center space-x-3 rounded-2xl bg-[#476CFF1A] px-4 py-6 shadow shadow-blue-950/25">
        {/* Icone de notificação */}
        <div className="bg-primary-800 flex aspect-square h-8 items-center justify-center rounded-full p-2">
          <IconeNotificacao />
        </div>
        {/* Main ( texto e data ) */}
        <div className="text-primary-800 flex w-full flex-col justify-around">
          <h1 className="font-outfit font-medium"> Nova mensagem </h1>
          <h1 className="font-satoshi text-[15px] font-light max-md:line-clamp-2">
            {' '}
            Olá Felipe, você tem novas mensagens para responder, clique abaixo e verifique
          </h1>
          <h1 className="text-primary-800/50 font-satoshi mt-0.5 text-[12px] font-normal">
            {' '}
            12/12/2025 13:00{' '}
          </h1>
        </div>

        {/* Bolinha de notificação no canto superior direito */}
        <div className="absolute right-3 top-3 aspect-square h-2 rounded-full bg-[#335CFF]" />
      </div>
    </div>
  )
}
