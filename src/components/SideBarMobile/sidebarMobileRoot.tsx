import type { InterfaceChildren } from '../../types/interface-children'

export function SideBarMobileRoot({ children }: InterfaceChildren) {
  return (
    <div className="min-md:hidden fixed bottom-0 left-0 z-[9999] h-auto w-full">
      <div className="bg-primary-800 w-full rounded-t-[1rem] px-2 py-6">{children}</div>
    </div>
  )
}
