import { motion, type Variants } from 'framer-motion';

interface AnimatedTrashProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  delay?: number;
}

interface AnimatedTrashControlledProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  isOpen?: boolean;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
};

const lidVariants: Variants = {
  closed: { 
    rotate: 0,
    y: 0,
  },
  open: { 
    rotate: -35,
    y: -2,
    transition: springTransition,
  },
};

export const AnimatedTrash = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2,
  delay = 0,
}: AnimatedTrashProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 -4 24 28"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trash body */}
      <motion.path
        d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay }}
      />

      {/* Lid + Handle - animated together */}
      <motion.g
        style={{ originX: "0.5", originY: "0.25" }}
        variants={lidVariants}
        initial="closed"
        animate="open"
        transition={{ delay: delay + 0.5 }}
      >
        {/* Lid line */}
        <motion.path
          d="M3 6h18"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
        />
        {/* Handle */}
        <motion.path
          d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
        />
      </motion.g>

      {/* Internal lines */}
      <motion.line
        x1="10"
        y1="11"
        x2="10"
        y2="17"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.2, delay: delay + 0.6 }}
      />
      <motion.line
        x1="14"
        y1="11"
        x2="14"
        y2="17"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.2, delay: delay + 0.7 }}
      />
    </motion.svg>
  );
};

export const AnimatedTrashControlled = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2,
  isOpen = false,
}: AnimatedTrashControlledProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 -4 24 28"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trash body */}
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />

      {/* Lid + Handle - animated together */}
      <motion.g
        style={{ originX: "0.5", originY: "0.25" }}
        variants={lidVariants}
        animate={isOpen ? "open" : "closed"}
      >
        {/* Lid line */}
        <path d="M3 6h18" />
        {/* Handle */}
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </motion.g>

      {/* Internal lines */}
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </motion.svg>
  );
};
