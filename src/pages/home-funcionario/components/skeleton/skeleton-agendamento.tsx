import { SkeletonCardAgendamento } from './skeleton-cardAgendamento'

export function SkeletonAgendamento() {
  return (
    <main className="overflow-y-auto w-[100%]">
      {/* conteudo principal  */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-primary-800 font-outfit-bold text-[1.3rem]">Agendamentos</h1>
        </div>

        {/* renderização dos cards  */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {Array.from({ length: 8 })?.map((_, i) => (
            <SkeletonCardAgendamento key={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
