import type { TypeClassIcon } from '../../types/interface-class-icon'

export function IconeBars({ className }: TypeClassIcon) {
  return (
    <svg fill="none" height="23" viewBox="0 0 31 23" width="31" xmlns="http://www.w3.org/2000/svg">
      <path
        className={className}
        d="M2 2H28.6667M2 11.5H28.6667M2 21H28.6667"
        stroke="currentColor"
        stroke-width="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
