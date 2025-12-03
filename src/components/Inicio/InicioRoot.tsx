import type { InterfaceChildren } from '../../types/interface-children'

export function InicioRoot({ children }: InterfaceChildren) {
  return <div className="mt-2 h-full  w-[100%] py-0 max-md:w-full max-md:pb-32 overflow-y-hidden">{children}</div>
}
