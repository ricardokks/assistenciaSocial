function converterParaRGB(valor: string): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return valor

  ctx.fillStyle = valor
  return ctx.fillStyle
}

export function converterCoresOKLCHparaRGB(root: HTMLElement) {
  const allElements = root.querySelectorAll<HTMLElement>('*')

  const propriedades = [
    'color',
    'backgroundColor',
    'borderColor',
    'outlineColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
  ]

  allElements.forEach((el) => {
    const style = getComputedStyle(el)

    propriedades.forEach((prop) => {
      const valor = style.getPropertyValue(prop)

      if (valor?.includes('oklch')) {
        const rgb = converterParaRGB(valor)
        el.style.setProperty(prop, rgb)
      }
    })
  })
}
