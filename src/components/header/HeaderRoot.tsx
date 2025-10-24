import type { InterfaceChildren } from '../../types/interface-children'

export function HeaderDashbordRoot({ children }: InterfaceChildren) {
  return <header className='border-dark-100/10 flex w-[95%]  items-center justify-between border-b-2 pb-4 pt-2'>{children}</header>
}
