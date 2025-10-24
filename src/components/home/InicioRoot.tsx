import type { InterfaceChildren } from "../../types/interface-children";

export function InicioRoot({ children }: InterfaceChildren){
    return (
        <div className="h-full mt-2 w-[90%] py-0 px-4">
            {children}
        </div>
    )
}