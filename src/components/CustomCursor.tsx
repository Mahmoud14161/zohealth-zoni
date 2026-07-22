import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on devices with a real pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div 
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-10%',
        translateY: '-10%',
        willChange: 'transform'
      }}
      animate={{
        scale: isHovering ? 1.2 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 20
      }}
    >
      <img 
        src="/Mouse.png" 
        alt="cursor" 
        className="w-10 h-10 object-contain drop-shadow-md" 
      />
    </motion.div>
  );
}
