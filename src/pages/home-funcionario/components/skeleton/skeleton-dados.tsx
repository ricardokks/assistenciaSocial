export function SkeletonDados() {
  return (
    <main className="w-full">
      {/* container de informações principais  */}
      <form className="font-outfit w-full  max-md:pb-42 flex size-full flex-col gap-4">
        {/* container de informações foto, nome, subnome */}
        <div className="flex w-full items-center justify-start gap-4 rounded-2xl p-4 shadow-md outline-2 outline-[#262626]/10">
          {/* foto  */}
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-black/10 animate-pulse"></div>
          </div>

          {/* nome e subnome */}
          <div className="flex flex-col justify-center leading-4">
            {/* nome  */}
            <div className="relative flex  h-4 w-20 rounded-2xl bg-black/10 animate-pulse items-center gap-2"></div>

            {/* subnome */}
            <div className="relative flex  h-4 w-15 mt-2 rounded-2xl bg-black/10 animate-pulse items-center gap-2"></div>
          </div>
        </div>

        {/* container sobre a assistencia */}
        <div className="relative flex w-full flex-col items-start justify-start gap-4 rounded-2xl border-2 border-[#262626]/10 p-4 shadow-md">
          <div className="flex w-full flex-col">
            <h1 className="text-primary-800 font-outfit-bold">Sobre a assistencia :</h1>

            <div className="font-outfit text-primary-800 focus:border-primary-800 w-full flex flex-col gap-3 rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out">
              <div className="relative flex  h-5 w-full rounded-2xl bg-black/10 animate-pulse items-center gap-2"></div>
              <div className="relative flex  h-5 w-[80%] rounded-2xl bg-black/10 animate-pulse items-center gap-2"></div>
              <div className="relative flex  h-5 w-[50%] rounded-2xl bg-black/10 animate-pulse items-center gap-2"></div>
            </div>
          </div>

          {/* container de abrange a  */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="text-primary-800 font-outfit-bold">Abrange a:</h1>

            <div className="font-outfit text-primary-800 focus:border-primary-800 w-full flex flex-col gap-3 rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out">
              <div className="relative flex  h-5 w-full rounded-2xl bg-black/10 animate-pulse items-center gap-2"></div>
              <div className="relative flex  h-5 w-[80%] rounded-2xl bg-black/10 animate-pulse items-center gap-2"></div>
              <div className="relative flex  h-5 w-[50%] rounded-2xl bg-black/10 animate-pulse items-center gap-2"></div>
            </div>
          </div>

          {/* container de localização  */}
          <div className="flex w-full flex-col gap-6">
            <h1 className="text-primary-800 font-outfit-bold">Localização</h1>

            <div className="font-outfit text-primary-800 focus:border-primary-800 w-full flex flex-col gap-3 rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out">
              <div className="relative flex  h-5 w-[40%] rounded-2xl bg-black/10 animate-pulse items-center gap-2"></div>
            </div>

            <div
              className="xw-full rounded-2xl border-0 bg-black/10 animate-pulse h-[10rem]"
            />
          </div>
        </div>
      </form>
    </main>
  )
}
