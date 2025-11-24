import { IconeSair } from '../../assets/Icons/iconeSair'

export function SideBarButtonSair( data: {handleSair: () => void }) {
  return (
    <button
      className="text-primary-800 font-outfit-bold flex w-[80%] cursor-pointer items-center justify-center rounded-2xl bg-white p-1 text-[1.2rem] transition-all
     duration-500 ease-in-out hover:bg-white/80"
    >
      <IconeSair className="size-9" onClick={async () => await data.handleSair()} />
      Sair
    </button>
  )
}
