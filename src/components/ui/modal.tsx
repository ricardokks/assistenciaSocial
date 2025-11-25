import ReactDOM from "react-dom"
import type { IModal } from "../../types/interface-modal"

export function Modal(data: IModal){
    return ReactDOM.createPortal(
         <div
            onClick={data.close}
            className={`fixed inset-0 bg-black/40 flex items-center justify-center z-45 ${data.open ? 'visible' : 'invisible'}`}
        >
            {data.children}
        </div>,
        document.body
    )
}