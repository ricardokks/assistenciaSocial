import { SectionHero } from './sections/hero'

export function HomePage() {
  return (
    <main className="background-gradient overflow-y-hidden flex h-screen w-full items-center justify-center">
      <section className="m-0 min-h-[100vh] h-[100%] w-[100%]  max-w-[1280px] bg-transparent p-4 px-5">
        <SectionHero />
      </section>
    </main>
  )
}
