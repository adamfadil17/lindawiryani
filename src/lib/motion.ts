import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any,
      delay: 0.2,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any,
      delay: 0.2,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any,
      delay: 0.2,
    },
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any,
      delay: 0.2,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      staggerDirection: -1,
      delay: 0.3,
    },
  },
};
