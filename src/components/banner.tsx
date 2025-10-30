import { IconeBanner } from '../assets/Icons/icone-banner'

export function InicioBanner() {
  return (
    <div className="background-gradient-banner relative mt-2 flex h-[28%] w-[100%] items-center justify-between rounded-2xl px-8 max-md:h-[35%] max-md:max-h-[380px] max-md:flex-col max-md:px-4 max-md:pt-4 md:py-14 ">
      <div className="flex w-[55%] flex-col text-white max-md:w-full">
        <h1 className="font-outfit text-[1.3rem] max-md:text-[14px]">SEPAD</h1>
        <h1 className="font-satoshi-black text-[1.4rem] max-md:text-[1.3rem] md:mt-0.5">
          Seja Bem-vindo(a), ao seu sistema de atendimento online.
        </h1>
      </div>

      <IconeBanner className="md:absolute  md:-top-10 md:right-[5%] md:size-[16rem] " />
    </div>
  )
}
