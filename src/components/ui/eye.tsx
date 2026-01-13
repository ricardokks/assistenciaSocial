import { motion, useAnimation, type Variants } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedEyeProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  autoPlay?: boolean;
  delay?: number;
}

export function AnimatedEye({ 
  size = 40, 
  color = 'currentColor',
  strokeWidth = 2,
  autoPlay = true,
  delay = 0.5
}: AnimatedEyeProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (autoPlay) {
      const openEye = async () => {
        await controls.start('open');
      };
      
      const timer = setTimeout(openEye, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, delay, controls]);

  const upperLidVariants: Variants = {
    closed: {
      d: "M2 12 C2 12 6 12 12 12 C18 12 22 12 22 12",
    },
    open: {
      d: "M2 12 C2 12 6 5 12 5 C18 5 22 12 22 12",
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as const,
      }
    }
  };

  const lowerLidVariants: Variants = {
    closed: {
      d: "M2 12 C2 12 6 12 12 12 C18 12 22 12 22 12",
    },
    open: {
      d: "M2 12 C2 12 6 19 12 19 C18 19 22 12 22 12",
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as const,
      }
    }
  };

  const irisVariants: Variants = {
    closed: {
      scale: 0,
      opacity: 0,
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.2,
      }
    }
  };

  const glintVariants: Variants = {
    closed: {
      scale: 0,
      opacity: 0,
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.5,
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="closed"
      animate={controls}
    >
      <motion.path variants={upperLidVariants} fill="none" />
      <motion.path variants={lowerLidVariants} fill="none" />
      <motion.circle cx="12" cy="12" r="3" variants={irisVariants} fill="none" />
      <motion.circle cx="12" cy="12" r="1.5" variants={irisVariants} fill={color} stroke="none" />
      <motion.circle cx="13" cy="11" r="0.5" variants={glintVariants} fill="white" stroke="none" />
    </motion.svg>
  );
}

export function AnimatedEyeControlled({ 
  size = 40, 
  color = 'currentColor',
  strokeWidth = 2,
  isOpen = false,
}: AnimatedEyeProps & { isOpen?: boolean }) {
  
  const upperLidVariants: Variants = {
    closed: {
      d: "M2 12 C2 12 6 12 12 12 C18 12 22 12 22 12",
    },
    open: {
      d: "M2 12 C2 12 6 5 12 5 C18 5 22 12 22 12",
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as const,
      }
    }
  };

  const lowerLidVariants: Variants = {
    closed: {
      d: "M2 12 C2 12 6 12 12 12 C18 12 22 12 22 12",
    },
    open: {
      d: "M2 12 C2 12 6 19 12 19 C18 19 22 12 22 12",
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1] as const,
      }
    }
  };

  const irisVariants: Variants = {
    closed: {
      scale: 0,
      opacity: 0,
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.2,
      }
    }
  };

  const glintVariants: Variants = {
    closed: {
      scale: 0,
      opacity: 0,
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.5,
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
    >
      <motion.path variants={upperLidVariants} fill="none" />
      <motion.path variants={lowerLidVariants} fill="none" />
      <motion.circle cx="12" cy="12" r="3" variants={irisVariants} fill="none" />
      <motion.circle cx="12" cy="12" r="1.5" variants={irisVariants} fill={color} stroke="none" />
      <motion.circle cx="13" cy="11" r="0.5" variants={glintVariants} fill="white" stroke="none" />
    </motion.svg>
  );
}
