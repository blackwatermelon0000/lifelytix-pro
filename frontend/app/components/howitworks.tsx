'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  SearchCheck,
  UserCog,
  Lightbulb,
  Activity
} from 'lucide-react';

const ribbonGradients = [
  'from-[#7D2AE7] to-[#3969E7]',
  'from-[#3969E7] to-[#07B9CE]',
  'from-[#7D2AE7] to-[#3969E7]',
  'from-[#3969E7] to-[#07B9CE]',
  'from-[#7D2AE7] to-[#3969E7]'
];

const steps = [
  {
    icon: BarChart,
    label: 'Progress',
    desc: 'Track your health journey and see your progress over time.'
  },
  {
    icon: SearchCheck,
    label: 'Analyze',
    desc: 'Let Lifelytix analyze your data for patterns and insights.'
  },
  {
    icon: UserCog,
    label: 'Personalize',
    desc: 'Enjoy recommendations tailored for your unique goals.'
  },
  {
    icon: Lightbulb,
    label: 'Recommend',
    desc: 'Receive actionable tips and plans based on your needs.'
  },
  {
    icon: Activity,
    label: 'Track',
    desc: 'Monitor and optimize your lifestyle, every single day.'
  }
];

export default function HowItWorks() {
  return (
    <section className="relative w-full py-10 px-3 md:px-6 bg-transparent">
      {/* Glow behind heading */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[-100px] -translate-x-1/2 -z-10 w-[110vw] h-[500px] blur-2xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 10%, #7D2AE7 16%, #3969E7 40%, #07B9CE 80%)',
          opacity: 0.12
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Animated Gradient Heading with underline */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#1f57e5] bg-clip-text text-transparent inline-block"
          >
            The Lifelytix Process
            <span className="block h-[4px] w-30 mx-auto mt-5 rounded-full bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#3969E7] animate-bounce" />
          </motion.h2>
        </div>

        <div className="flex flex-col gap-7">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.66,
                  delay: idx * 0.11,
                  ease: [0.32, 0.7, 0.23, 0.98]
                }}
                viewport={{ once: true, amount: 0.3 }}
                className={`flex ${isLeft ? 'justify-start' : 'justify-end'} w-full transition`}
              >
                <div
                  className={`flex items-center rounded-full pl-5 pr-0 md:pr-0 py-4 md:py-5 shadow-md bg-gradient-to-r ${ribbonGradients[idx]} transition hover:scale-[1.02] hover:shadow-lg max-w-[530px] w-full`}
                  style={{ minHeight: 50, minWidth: 260 }}
                >
                  {/* Icon on LEFT */}
                  {isLeft && (
                    <div className="flex-shrink-0 ml-0 md:ml-2 mr-2 md:mr-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-blue-200 border-4 border-[#7D2AE7] shadow transition-all duration-200">
                        <Icon size={24} className="text-[#7D2AE7]" />
                      </div>
                    </div>
                  )}

                  {/* Text */}
                  <div className={`flex-1 flex flex-col justify-center ${isLeft ? 'items-start' : 'items-end'} px-2`}>
                    <span className={`text-base md:text-lg font-semibold text-white tracking-wide ${isLeft ? 'text-left' : 'text-right'}`}>
                      {step.label}
                    </span>
                    <span className={`text-white/90 text-sm md:text-sm mt-0.5 ${isLeft ? 'text-left' : 'text-right'}`}>
                      {step.desc}
                    </span>
                  </div>

                  {/* Icon on RIGHT */}
                  {!isLeft && (
                    <div className="flex-shrink-0 mr-0 md:mr-2 ml-2 md:ml-6">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-blue-200 border-4 border-[#7D2AE7] shadow transition-all duration-200">
                        <Icon size={24} className="text-[#7D2AE7]" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
