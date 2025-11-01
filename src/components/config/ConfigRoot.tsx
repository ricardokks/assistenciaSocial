import type { InterfaceChildren } from "../../types/interface-children";

export function ConfigRoot({children}: InterfaceChildren){
    return (
        <main className="flex flex-col min-h-screen w-full items-center bg-[#EAEAEA] font-outfit ">
            {children}
        </main>
    )
}