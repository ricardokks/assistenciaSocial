import type { TypeClassIcon } from '../../types/interface-class-icon'

export function IconeLixeira({ className }: TypeClassIcon) {
  return (
    <svg className={className} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect rx="10" fill="none" />
      <path
        d="M12.5 26.5C11.95 26.5 11.4792 26.3042 11.0875 25.9125C10.6958 25.5208 10.5 25.05 10.5 24.5V11.5H9.5V9.5H14.5V8.5H20.5V9.5H25.5V11.5H24.5V24.5C24.5 25.05 24.3042 25.5208 23.9125 25.9125C23.5208 26.3042 23.05 26.5 22.5 26.5H12.5ZM22.5 11.5H12.5V24.5H22.5V11.5ZM14.5 22.5H16.5V13.5H14.5V22.5ZM18.5 22.5H20.5V13.5H18.5V22.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
