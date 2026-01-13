import { ArrowLeftRight } from 'lucide-react'

export function SwipeHint() {
  return (
    <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-primary-800 px-2 py-1 text-xs text-white shadow">
      <ArrowLeftRight size={14} />
      Arraste
    </div>
  )
}
