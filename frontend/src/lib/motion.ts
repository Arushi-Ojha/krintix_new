import type { Transition, Variants } from "framer-motion";

/** Default spring — smooth, slightly weighted */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 30,
  mass: 0.85,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.8,
};

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
};
