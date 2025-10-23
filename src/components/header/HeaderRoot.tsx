import type { InterfaceChildren } from '../../types/interface-children'

export function HeaderDashbordRoot({ children }: InterfaceChildren) {
  return <header className='py-4 flex w-full items-center justify-between border-b-2 border-dark-100/10'>{children}</header>
}
