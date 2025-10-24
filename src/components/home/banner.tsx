import { IconeBanner } from "../../assets/Icons/icone-banner";

export function InicioBanner() {
    return (
        <div className="w-[90%] background-gradient-banner h-[28%] md:py-14 rounded-2xl mt-2 flex justify-between items-center px-8 relative max-md:flex-col max-md:h-[35%] max-md:pt-4 max-md:px-4 max-md:max-h-[380px] ">
            <div className="text-white flex flex-col w-[55%] max-md:w-full">
                <h1 className="font-outfit-light text-[22px] max-md:text-[14px]">SEPAD</h1>
                <h1 className="font-satoshi-black text-[26px] md:mt-0.5 max-md:text-[16px]">Seja Bem-vindo(a), ao seu sistema de atendimento online.</h1>
            </div>

            <IconeBanner className="md:size-[16rem]  md:absolute md:-top-10 md:right-[5%] " />
        </div>
    )
}