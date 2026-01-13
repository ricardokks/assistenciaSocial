import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type SwipeableCardProps = {
  children: ReactNode
  onSwipeRight: () => void
  onSwipeLeft: () => void
}

export function SwipeableCard({
  children,
  onSwipeRight,
  onSwipeLeft,
}: SwipeableCardProps) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={(_: any, info: { offset: { x: number } }) => {
        if (info.offset.x > 120) onSwipeRight()
        if (info.offset.x < -120) onSwipeLeft()
      }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  )
}
