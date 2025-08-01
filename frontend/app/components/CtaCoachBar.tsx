'use client';

import { motion } from 'framer-motion';
import { FaComments } from 'react-icons/fa';

export default function CtaCoachBar() {
  return (
    <section className="relative z-10 mt-16 px-4 sm:px-8 md:px-16">
      {/* Soft glowing background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-[#07B9CE]/20 via-[#3969E7]/30 to-[#7D2AE7]/20 blur-3xl animate-pulse-slow rounded-[3rem]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative text-white text-center max-w-3xl mx-auto px-6 py-16 rounded-3xl border border-white/15 bg-gradient-to-br from-[#090e1a]/90 via-[#090e1a]/95 to-[#090e1a] shadow-2xl backdrop-blur-md"
      >
        {/* Floating Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-br from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] p-4 rounded-full shadow-xl border-4 border-[#090e1a]">
            <FaComments className="text-white w-8 h-8" />
          </div>
        </div>

        {/* Heading */}
        <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] text-transparent bg-clip-text">
          Need Personalized Support?
        </h3>

        {/* Subtext */}
        <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8">
          Connect with one of our certified wellness coaches and get tailored advice on how to optimize your health data and lifestyle, one step at a time.
        </p>

        {/* CTA Button */}
        <a
          href="mailto:support@lifelytix.ai"
          className="inline-block bg-gradient-to-br from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition"
        >
          Book a Free 1-on-1 Session
        </a>
      </motion.div>
    </section>
  );
}
