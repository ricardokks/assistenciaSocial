import AOS from 'aos'
import 'aos/dist/aos.css'

import { SectionBeneficios } from './sections/beneficios'
import { SectionHero } from './sections/hero'
import { useEffect } from 'react'

export function HomePage() {
  // configuração do aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      mirror: true,
      once: false,
    })
  }, [])
  return (
    <main className="background-gradient flex h-auto w-full flex-col items-center justify-center">
      <SectionHero />
      <SectionBeneficios />
    </main>
  )
}
