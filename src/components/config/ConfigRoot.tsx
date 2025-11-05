import type { InterfaceChildren } from "../../types/interface-children";

export function ConfigRoot({children}: InterfaceChildren){
    return (
        <main className="font-outfit flex min-h-screen w-full flex-col items-center bg-[#EAEAEA] ">
            {children}
        </main>
    )
}