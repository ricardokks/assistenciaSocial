import type { TypeClassIcon } from '../../types/type-class-icon'

export function IconeMais({ className }: TypeClassIcon) {
  return (
    <svg fill="none" height="13" viewBox="0 0 13 13" width="13" xmlns="http://www.w3.org/2000/svg">
      <path
        className={className}
        d="M12.708 7.92H8.172V12.576H5.004V7.92H0.468V4.992H5.004V0.336H8.172V4.992H12.708V7.92Z"
        fill="#2B468B"
      />
    </svg>
  )
}
