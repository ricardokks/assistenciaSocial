import type { ReactNode } from 'react'

interface HeaderRootProps {
  children: ReactNode
}

export function HeaderRoot({ children }: HeaderRootProps) {
  return <div className='bg-primary-800 flex w-[25%] flex-col items-center justify-between py-2 max-md:hidden'>{children}</div>
}
