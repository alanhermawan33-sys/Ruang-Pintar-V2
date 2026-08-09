import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'motion/react';

interface ScrollVelocityMarqueeProps {
  baseVelocity?: number;
  className?: string;
  items?: string[];
}

export const ScrollVelocityMarquee: React.FC<ScrollVelocityMarqueeProps> = ({
  baseVelocity = 100,
  className = '',
  items = [
    'RUANG PINTAR',
    '•',
    'DESIGN & BUILD YOUR IMAGINATION',
    '•',
    'HERITAGE CRAFTSMANSHIP',
    '•',
    'BESPOKE FURNITURE',
    '•',
    'LUXURY INTERIOR & ARCHITECTURE',
    '•',
    'JAKARTA STUDIO',
    '•',
  ]
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth out the raw velocity with a spring
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Transform velocity to skew and velocity boost
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-3, 3]);

  return (
    <div className={`overflow-hidden py-5 bg-[#171818] text-[#FAF9F7] border-y border-[#6A5D43]/30 select-none ${className}`}>
      <motion.div 
        ref={containerRef}
        style={{ skewX: skew }}
        className="flex whitespace-nowrap overflow-x-hidden"
      >
        <div className="animate-marquee flex items-center gap-8 text-sm sm:text-base md:text-lg font-heading tracking-[0.25em] font-medium uppercase">
          {items.map((item, index) => (
            <span key={`m1-${index}`} className={item === '•' ? 'text-[#C5A880] text-xl font-bold' : 'hover:text-[#C5A880] transition-colors duration-300'}>
              {item}
            </span>
          ))}
          {/* Repeat for seamless loop */}
          {items.map((item, index) => (
            <span key={`m2-${index}`} className={item === '•' ? 'text-[#C5A880] text-xl font-bold' : 'hover:text-[#C5A880] transition-colors duration-300'}>
              {item}
            </span>
          ))}
          {/* Repeat 3rd time for wide monitors */}
          {items.map((item, index) => (
            <span key={`m3-${index}`} className={item === '•' ? 'text-[#C5A880] text-xl font-bold' : 'hover:text-[#C5A880] transition-colors duration-300'}>
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
