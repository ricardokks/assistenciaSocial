import type { ReactNode } from 'react'

interface HeaderRootProps {
  children: ReactNode
}

export function HeaderRoot({ children }: HeaderRootProps) {
  return <div className='bg-primary-800 flex w-[20%] flex-col items-center justify-between py-2'>{children}</div>
}
