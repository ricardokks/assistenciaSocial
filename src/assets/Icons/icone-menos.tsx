import type { TypeClassIcon } from '../../types/type-class-icon'

export function IconeMenos({ className }: TypeClassIcon) {
  return (
    <svg fill="none" height="4" viewBox="0 0 19 4" width="19" xmlns="http://www.w3.org/2000/svg">
      <path
        className={className}
        d="M2.5 2H16.5"
        stroke="#194A99"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      />
    </svg>
  )
}
