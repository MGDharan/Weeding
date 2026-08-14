import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  opacity?: boolean;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className,
  speed = 0.2,
  opacity = true,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const opacityValue = opacity
    ? useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.4])
    : 1;

  return (
    <motion.div ref={ref} style={{ y, opacity: opacityValue }} className={className}>
      {children}
    </motion.div>
  );
};

export default Parallax;