import { CardNotificacao } from './cardNotificacao'
import { useNotificacoes } from '../../hooks/useNotificacao'

export function InicioNotificacao({ user }: { user: any }) {
  const notificacoes = useNotificacoes(user?.id)

  return (
    <div className="mt-2 flex flex-col space-y-2 max-md:pb-[8rem] h-[90%] overflow-y-auto pb-5">
      {notificacoes.length === 0 ? (
        <div className="text-primary-800/60 mt-4 text-center">
          Você não possui notificações recentes.
        </div>
      ) : (
        [...notificacoes]
          .reverse()
          .map((item, index) => (
            <CardNotificacao key={index} data={item} user={user} />
          ))
      )}
    </div>
  )
}
