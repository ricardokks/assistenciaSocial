import type { TypeClassIcon } from '../../types/interface-class-icon'

export function IconeGestor({ className }: TypeClassIcon) {
  return (
    <svg className={className} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 6V28.5C7.5 29.6935 7.97411 30.8381 8.81802 31.682C9.66193 32.5259 10.8065 33 12 33H16.5M7.5 6H4.5M7.5 6H40.5M16.5 33H31.5M16.5 33L14.5 39M40.5 6H43.5M40.5 6V28.5C40.5 29.6935 40.0259 30.8381 39.182 31.682C38.3381 32.5259 37.1935 33 36 33H31.5M31.5 33L33.5 39M14.5 39H33.5M14.5 39L13.5 42M33.5 39L34.5 42M15 24L21 18L25.296 22.296C27.3144 19.3986 29.9443 16.9796 33 15.21"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
      />
    </svg>
  )
}
