import { SectionHero } from './sections/hero'

export function HomePage() {
  return (
    <main className="background-gradient flex h-auto w-full items-center justify-center">
      <section className="m-0 size-[100%] min-h-[100vh] max-w-[1280px]  bg-transparent p-4 px-5">
        <SectionHero />
      </section>
    </main>
  )
}
