import type { MouseEventHandler } from 'react'

export interface TypeClassIcon {
  className?: string
  onClick?: MouseEventHandler<SVGSVGElement>
}
