
export function SkeletonCardAgendamento() {
  return (
    <div className="border-primary-800 flex max-w-[350px] flex-col justify-between gap-4 rounded-[5.97px] border-2 bg-white p-3">
      {/* Calendário */}
      <div className="flex items-center justify-start gap-4">
        <div className="w-13 h-13 rounded-full bg-black/10 animate-pulse flex items-center justify-center rounded-full p-3"></div>
        <h1 className="font-satoshi-black h-6 w-30 rounded-2xl bg-black/10 animate-pulse"></h1>
      </div>

      {/* Dados do cidadão */}
      <div className="flex flex-col gap-2">
        <p className="text-primary-800 font-outfit w-25 bg-black/10 rounded-3xl w-[50%] py-1"></p>
        <p className="text-primary-800 h-3 bg-black/10 rounded-3xl w-[50%] font-outfit"></p>
        <p className="text-primary-800 h-3 bg-black/10 rounded-3xl w-[50%] font-outfit"></p>
        <p className="text-primary-800  bg-black/10 rounded-3xl w-[50%] h-4 font-outfit">
          <span className="font-bold"></span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className='w-full h-7 rounded-[5.97px] bg-black/10'></div>
        <div className='w-full h-7 rounded-[5.97px] bg-black/10'></div>
      </div>
    </div>
  )
}
