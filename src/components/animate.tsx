"use state";

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react";

interface AnimateProps {
  children: React.ReactNode;
  fadeIn?: boolean;
  zoomIn?: boolean;
  duration?: number;
  delay?: number;
  animate?: 'left' | 'right' | 'top' | 'bottom';
}

const Animate = ({ children, animate, fadeIn, zoomIn, delay, duration = 0.3 }: AnimateProps) => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  const a = {
    left: { translateX: '-100%' },
    right: { translateX: '100%' },
    top: { translateY: '-100%' },
    bottom: { translateY: '100%' },
  }

  
  const b = {
    opacity: fadeIn ? 0 : 1,
    scale: zoomIn ? 0 : 1,
  }

  const visible = {
    translateX: '0%',
    translateY: '0%',
    scale: 1,
    opacity: 1
  }

  // const Comp = motion['div']



  return (
    <motion.div
      variants={{
        hidden: animate ? { ...b, ...a[animate] } : b,
        visible: visible
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration, delay }}
      ref={ref}

    >
      {children}
    </motion.div>
  )
}

export default Animate
