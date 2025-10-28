import type { InterfaceChildren } from "../../types/interface-children";

export function InicioRoot({ children }: InterfaceChildren){
    return (
        <div className="mt-2 h-full w-[95%] px-4 py-0 max-md:w-full">
            {children}
        </div>
    )
}