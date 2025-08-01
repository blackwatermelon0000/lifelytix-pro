'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import heartIcon from '../animations/heart.json';
import sleepIcon from '../animations/sleep.json';
import brainIcon from '../animations/brain.json';

const features = [
  {
    title: 'Real-Time Vitals Monitoring',
    description: 'Track heart rate, stress, and energy levels with AI-powered analytics and wearable sync.',
    lottie: heartIcon
  },
  {
    title: 'Smart Sleep & Recovery',
    description: 'Decode your sleep cycles and optimize recovery using deep learning analysis.',
    lottie: sleepIcon
  },
  {
    title: 'Mood & Mindfulness AI',
    description: 'Understand emotional trends and receive nudges to boost daily mental wellbeing.',
    lottie: brainIcon
  }
];

export default function FeatureHighlights() {
  return (
    <section
      id="features"
      className="relative z-10 py-14 md:py-12 px-4 sm:px-8 md:px-14 max-w-7xl mx-auto -mt-3"
    >
      {/* Blurred gradient background blob (fainter) */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[-120px] -translate-x-1/2 -z-10 w-[110vw] h-[500px] blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 10%, #7D2AE7 16%, #3969E7 40%, #07B9CE 80%)',
          opacity: 0.12
        }}
      />

      {/* Heading with animated underline */}
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#1f57e5] bg-clip-text text-transparent inline-block"
        >
          Why People Love Lifelytix
          <span className="block h-[4px] w-30 mx-auto mt-5 rounded-full bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#3969E7] animate-bounce" />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-lg bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#1f57e5] bg-clip-text text-transparent font-medium"
        >
          Features designed for real wellness, not just tracking.
        </motion.p>
      </div>

      {/* Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.17 } }, hidden: {} }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
            }}
            whileHover={{
              scale: 1.035,
              boxShadow: '0 4px 32px 0 rgba(57,105,231,0.07), 0 0px 0px 2px #07B9CE26'
            }}
            className="relative group bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Gradient accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] absolute top-0 left-0 z-10" />

            {/* Lottie Glow Icon (subtle) */}
            <div className="relative z-20 flex items-center justify-center mt-8 mb-5">
              <div className="absolute w-20 h-20 rounded-full blur-xl opacity-40 bg-gradient-to-br from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] group-hover:opacity-40 transition duration-400" />
              <div className="w-16 h-16 relative">
                <Lottie animationData={feature.lottie} loop autoplay className="w-full h-full" />
              </div>
            </div>

            {/* Title */}
            <h3 className="relative z-20 text-lg font-bold bg-gradient-to-r from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] bg-clip-text text-transparent text-center mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="relative z-20 text-base bg-gradient-to-r from-[#7D2AE7] via-[#3969E7] to-[#0694a4] bg-clip-text text-transparent text-center mb-8 px-2 font-medium min-h-[60px]">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
