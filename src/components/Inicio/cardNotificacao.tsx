import { IconeNotificacao } from "../../assets/Icons/icone-notificacao";

export function CardNotificacao({ data, user }: any) {
  return (
    <div className="relative flex h-auto w-full items-center space-x-3 rounded-2xl bg-[#476CFF1A] px-4 py-6 shadow shadow-blue-950/25">
      <div className="bg-primary-800 flex aspect-square h-8 items-center justify-center rounded-full p-2">
        <IconeNotificacao />
      </div>

      <div className="text-primary-800 flex w-full flex-col">
        <h1 className="font-outfit font-medium">
          Atualização do seu agendamento
        </h1>

        <p className="font-satoshi text-[15px] font-light">
          Olá {user?.nome}, seu agendamento foi atualizado para{" "}
          <strong>{data.novoStatus}</strong> na unidade{" "}
          <strong>{data.unidade}</strong>.
        </p>

        <span className="text-primary-800/50 font-satoshi mt-0.5 text-[12px]">
          {data.data} {data.hora}
        </span>
      </div>

      <div className="absolute right-3 top-3 aspect-square h-2 rounded-full bg-[#335CFF]" />
    </div>
  )
}
