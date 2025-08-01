'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CircleUser } from 'lucide-react';

const trustedLogos = [
  {
    name: 'Google',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    alt: 'Google'
  },
  {
    name: 'Microsoft',
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    alt: 'Microsoft'
  },
  {
    name: 'Apple',
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    alt: 'Apple'
  },
  {
    name: 'IBM',
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    alt: 'IBM'
  }
];

const testimonials = [
  {
    name: 'James Walker',
    gender: 'male',
    title: 'Software Engineer, London',
    quote: `I’ve always tracked my health data, but with Lifelytix I finally understood my own patterns. It showed me how late-night screens and missed sleep triggered my energy dips, and it gave me steps to fix it.`
  },
  {
    name: 'Sarah Imran',
    gender: 'female',
    title: 'Startup Founder, Dubai',
    quote: `Before Lifelytix, I was always tired and didn’t know why. Now, I can see exactly how my activity, food, and sleep work together. Weekly summaries and reminders keep me balanced without being pushy.`
  },
  {
    name: 'Ali Nawaz',
    gender: 'male',
    title: 'University Lecturer, Islamabad',
    quote: `I thought Lifelytix would just count my steps, but it goes deeper. It connects my mood with my daily habits and suggests breathing breaks at the perfect times. It feels like the app really knows me.`
  },
  {
    name: 'Marta Rivera',
    gender: 'female',
    title: 'Marketing Director, Barcelona',
    quote: `With Lifelytix, I finally feel in control of my health. It keeps things simple, reminds me to move, and spots my stress triggers before they get out of hand. Sunday reports have become my routine.`
  },
  {
    name: 'David Kim',
    gender: 'male',
    title: 'Financial Analyst, Seoul',
    quote: `The best part about Lifelytix is the small, realistic wins. It helped me cut back on caffeine, improve my sleep, and build new habits one week at a time. It fits easily into my busy schedule.`
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="relative z-20 py-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10"
    >
      {/* Glowing blur behind the testimonial area */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[-60px] -translate-x-1/2 -z-10 w-[120vw] h-[460px] blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 10%, #7D2AE7 14%, #3969E7 36%, #07B9CE 70%)',
          opacity: 0.08
        }}
      />

      {/* Testimonial Card */}
      <div className="relative z-10 w-full md:w-[620px] min-h-[360px] flex items-center">
<div className="relative z-10 w-full md:w-[620px] min-h-[360px] flex items-center bg-gradient-to-br from-[#090e1a]/90 via-[#090e1a]/95 to-[#090e1a] backdrop-blur-md rounded-3xl border border-white/15 shadow-2xl px-8 py-12">
  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full">
    {/* Static Left Column (Avatar, Heading, etc.) */}
    <div className="flex flex-col items-center md:items-start w-44 shrink-0">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[#07B9CE] text-xl font-bold select-none">|</span>
        <h3 className="text-white text-lg font-semibold">Testimonials</h3>
      </div>
      <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-[#07B9CE] shadow-xl bg-[#090e1a]">
        <CircleUser className="w-9 h-9 text-[#07B9CE]" strokeWidth={2.2} />
      </div>
      <div className="flex gap-1 mt-4 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 text-[#07B9CE] fill-[#07B9CE] drop-shadow-sm transition-transform duration-300 hover:scale-110"
          />
        ))}
      </div>
      <p className="font-bold text-white mt-1">{current.name}</p>
      <p className="text-white/60 text-xs text-center md:text-left">{current.title}</p>
    </div>

    {/* Animated Right Column (Only quote animates) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.quote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <p className="text-white/90 text-lg italic leading-relaxed">
              “{current.quote}”
            </p>
          </motion.div>
        </AnimatePresence>
  </div>
</div>

      </div>

      {/* Trusted Logos Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.18, ease: [0.4, 0.13, 0.23, 0.96] }}
        className="relative z-10 bg-gradient-to-br from-[#090e1a]/90 via-[#090e1a]/95 to-[#090e1a] backdrop-blur-md rounded-3xl border border-white/15 shadow-2xl px-8 py-12 min-h-[360px] w-full md:w-[520px] flex flex-col items-center justify-center"
      >
        <div className="flex items-center gap-2 mb-7">
          <span className="text-[#07B9CE] text-xl font-bold select-none">|</span>
          <h3 className="text-white text-lg font-semibold">Trusted By</h3>
        </div>
        <p className="text-white/80 text-base text-center mb-6">
          Companies, clinics, and innovators rely on Lifelytix to power real-world health.
        </p>
        <div className="flex flex-wrap gap-6 items-center justify-center max-w-[320px]">
          {trustedLogos.map(logo => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.alt}
              className="h-10 md:h-11 w-auto max-w-[110px] rounded-lg shadow border border-white/10 bg-white/5 p-1 object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
