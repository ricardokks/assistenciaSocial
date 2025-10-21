import type { TypeClassIcon } from '../../types/interface-class-icon'

export function IconeEmail({ className }: TypeClassIcon) {
  return (
    <svg fill="none" height="18" viewBox="0 0 23 18" width="23" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M3.75 1H19.75C20.85 1 21.75 1.9 21.75 3V15C21.75 16.1 20.85 17 19.75 17H3.75C2.65 17 1.75 16.1 1.75 15V3C1.75 1.9 2.65 1 3.75 1Z"
        stroke="#194A99"
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        
      />
      <path
        d="M21.75 3L11.75 10L1.75 3"
        stroke="#194A99"
        stroke-width="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
