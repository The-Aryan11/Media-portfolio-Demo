import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface CustomCursorProps {
  cursorVariant: 'default' | 'hover' | 'read' | 'drag';
  cursorText?: string;
  isModalOpen?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorVariant = 'default',
  cursorText = 'READ',
  isModalOpen = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for high-end physics feel
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device or mobile screen width
    const checkTouch = () => {
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 768 ||
        'ontouchstart' in window;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      // If on mobile viewport, keep hidden
      if (window.innerWidth < 768) {
        setIsVisible(false);
        return;
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      if (window.innerWidth >= 768) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Completely hide custom cursor on touch/mobile viewports or inside modals
  if (isTouchDevice || !isVisible || isModalOpen) {
    return null;
  }

  const variants = {
    default: {
      width: 14,
      height: 14,
      backgroundColor: '#1C1C1C',
      border: '0px solid transparent',
      color: 'transparent',
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(28, 28, 28, 0.08)',
      border: '1.5px solid rgba(28, 28, 28, 0.7)',
      color: 'transparent',
    },
    read: {
      width: 90,
      height: 90,
      backgroundColor: '#1C1C1C',
      border: '1px solid #C86A53',
      color: '#F4F3EF',
    },
    drag: {
      width: 80,
      height: 80,
      backgroundColor: '#C86A53',
      border: '0px solid transparent',
      color: '#F4F3EF',
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl backdrop-blur-[1px]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
    >
      {cursorVariant === 'read' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#F4F3EF] uppercase select-none flex items-center gap-1"
        >
          {cursorText || 'READ'}
        </motion.span>
      )}
      {cursorVariant === 'drag' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#F4F3EF] uppercase select-none"
        >
          SCROLL
        </motion.span>
      )}
    </motion.div>
  );
};
