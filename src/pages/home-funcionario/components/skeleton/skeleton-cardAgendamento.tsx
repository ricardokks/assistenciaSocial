export function SkeletonCardAgendamento() {
  return (
    <div className="border-primary-800 flex max-w-[350px] flex-col justify-between gap-4 rounded-[5.97px] border-2 bg-white p-3">
      {/* Calendário */}
      <div className="flex items-center justify-start gap-4">
        <div className="w-13 h-13 flex animate-pulse items-center justify-center rounded-full bg-black/10 p-3"></div>
        <h1 className="font-satoshi-black w-30 h-6 animate-pulse rounded-2xl bg-black/10"></h1>
      </div>

      {/* Dados do cidadão */}
      <div className="flex flex-col gap-2">
        <p className="text-primary-800 font-outfit w-25 w-[50%] rounded-3xl bg-black/10 py-1"></p>
        <p className="text-primary-800 font-outfit h-3 w-[50%] rounded-3xl bg-black/10"></p>
        <p className="text-primary-800 font-outfit h-3 w-[50%] rounded-3xl bg-black/10"></p>
        <p className="text-primary-800  font-outfit h-4 w-[50%] rounded-3xl bg-black/10">
          <span className="font-bold"></span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-7 w-full rounded-[5.97px] bg-black/10"></div>
        <div className="h-7 w-full rounded-[5.97px] bg-black/10"></div>
      </div>
    </div>
  )
}
