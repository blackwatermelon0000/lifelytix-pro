'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const counters = [
  { label: 'Users Joined', value: 120000 },
  { label: 'Daily Self-Checks', value: 34000 },
  { label: 'Global Coaches', value: 800 },
  { label: 'Countries Served', value: 62 }
];

export default function StatCounter() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
  }, []);

  return (
    <section className="relative z-10 px-2 py-12 md:px-0 flex flex-col items-center">
      <div
        ref={ref}
        className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {counters.map((counter, idx) => (
          <motion.div
            key={counter.label}
            initial={{ opacity: 0, y: 36, scale: 0.94 }}
            animate={hasAnimated ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.66,
              delay: idx * 0.11,
              type: 'spring',
              bounce: 0.32
            }}
            className="
              relative flex flex-col items-center justify-center
              bg-gradient-to-br from-[#090e1a]/90 via-[#090e1a]/95 to-[#090e1a]
              rounded-2xl px-8 py-9
              shadow-2xl backdrop-blur-md border border-[#3969E7]/20
              group hover:scale-105 transition-transform
              min-w-[220px] max-w-[330px] mx-auto
            "
          >
            {/* Animated number */}
            <span className="text-[2.7rem] sm:text-[3.1rem] font-extrabold leading-tight bg-gradient-to-r from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] text-transparent bg-clip-text drop-shadow-lg tracking-wide select-none">
              {hasAnimated ? <CountUp end={counter.value} duration={1.8} /> : '0'}
            </span>
            {/* Label */}
            <span className="text-base sm:text-lg mt-2 bg-gradient-to-r from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] text-transparent bg-clip-text font-medium tracking-wider uppercase drop-shadow select-none">
              {counter.label}
            </span>
            {/* Glass overlay */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-25 bg-gradient-to-br from-white/10 via-white/5 to-white/0" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// -------- TypeScript-Safe CountUp --------
type CountUpProps = {
  end: number;
  duration: number;
};

function CountUp({ end, duration }: CountUpProps) {
  const [count, setCount] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const value = Math.floor(progress * end);
      setCount(value);
      if (progress < 1) {
        frame.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frame.current = requestAnimationFrame(animate);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
}
