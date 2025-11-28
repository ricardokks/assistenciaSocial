import type { TypeClassIcon } from '../../types/interface-class-icon'

export function IconeVoltar({ className }: TypeClassIcon) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
