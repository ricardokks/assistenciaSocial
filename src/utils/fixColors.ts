export function converterCoresOKLCHparaRGB(element: HTMLElement) {
  const computed = window.getComputedStyle(element)

  const props = ['color', 'backgroundColor', 'borderColor']

  props.forEach((prop) => {
    const value = computed.getPropertyValue(prop)

    if (value.includes('oklch')) {
      // Converte usando CSS nativo
      element.style.setProperty(prop, corOKLCHparaRGB(value))
    }
  })

  ;[...element.children].forEach((child) => converterCoresOKLCHparaRGB(child as HTMLElement))
}

function corOKLCHparaRGB(oklchValue: string) {
  const helper = document.createElement('div')
  helper.style.color = oklchValue
  document.body.appendChild(helper)

  const rgb = getComputedStyle(helper).color

  document.body.removeChild(helper)
  return rgb
}
