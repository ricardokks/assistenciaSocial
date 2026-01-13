import { motion } from "framer-motion";

export function OrganicEyeOpen() {
  return (
    <motion.svg viewBox="0 0 200 100" width="300" height="150">
      {/* Contorno do olho */}
      <motion.path
        d="M20,50 Q100,15 180,50 Q100,85 20,50 Z"
        fill="#fff"
        stroke="#000"
        strokeWidth="2"
        initial={{ scaleY: 0.2, originY: "50%" }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Íris */}
      <motion.circle
        cx="100"
        cy="50"
        r="15"
        fill="#6b9aff"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
      />

      {/* Pálpebra superior deformando ao abrir */}
      <motion.path
        d="M20,50 Q100,15 180,50"
        stroke="#000"
        strokeWidth="2"
        fill="transparent"
        initial={{ d: "M20,50 Q100,50 180,50" }}
        animate={{ d: "M20,50 Q100,15 180,50" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Pálpebra inferior deformando ao abrir */}
      <motion.path
        d="M20,50 Q100,85 180,50"
        stroke="#000"
        strokeWidth="2"
        fill="transparent"
        initial={{ d: "M20,50 Q100,50 180,50" }}
        animate={{ d: "M20,50 Q100,85 180,50" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
