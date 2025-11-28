import ReactDOM from 'react-dom'

import type { IModal } from '../../types/interface-modal'

export function Modal(data: IModal) {
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 ${data.open ? 'visible' : 'invisible'}`}
      onClick={data.close}
    >
      {data.children}
    </div>,
    document.body
  )
}
