import type { ReactNode } from "react";

export interface IModal {
    open: boolean,
    close: () => void,
    children: ReactNode
}