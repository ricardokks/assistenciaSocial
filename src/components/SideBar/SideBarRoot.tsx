import type { InterfaceChildren } from '../../types/interface-children'

export function SideBarRoot({ children }: InterfaceChildren) {
  return (
    <div className="bg-primary-800 flex w-[20%] flex-col items-center justify-between py-2 max-lg:hidden">
      {children}
    </div>
  )
}
