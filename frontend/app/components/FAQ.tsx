'use client';

import {
  MessageSquareHeart,
  ShieldCheck,
  Bot,
  ActivitySquare,
  CircleUser,
  Sparkle
} from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [

  {
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#3969E7] to-[#07B9CE] text-white shadow-md mb-4">
        <ShieldCheck className="w-6 h-6" />
      </span>
    ),
    question: 'Is my personal data really safe?',
    answer:
      'Absolutely. We use end-to-end encryption, and you control what’s stored or deleted. Lifelytix follows strict privacy laws like GDPR and HIPAA.'
  },
  {
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#07B9CE] to-[#3969E7] text-white shadow-md mb-4">
        <Bot className="w-6 h-6" />
      </span>
    ),
    question: 'Do I need to wear a smartwatch or fitness tracker?',
    answer:
      'Not at all. You can connect your phone’s health app or manually enter data. Lifelytix works with or without wearables.'
  },
  {
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#7D2AE7] to-[#07B9CE] text-white shadow-md mb-4">
        <ActivitySquare className="w-6 h-6" />
      </span>
    ),
    question: 'How much does it cost?',
    answer:
      'You can use all the essential features for free. For deeper insights and AI-powered coaching, there’s an optional upgrade.'
  },
  {
    icon: (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#3969E7] to-[#7D2AE7] text-white shadow-md mb-4">
        <CircleUser className="w-6 h-6" />
      </span>
    ),
    question: 'Can Lifelytix help with stress or sleep issues?',
    answer:
      'Yes! It tracks stress signals, sleep quality, and daily habits, and offers real-time suggestions like breathing exercises or reminders to unplug before bed.'
  },

];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative z-10 py-16 md:py-20 px-6 md:px-16"
    >
      {/* Blurred radial glow background */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[-100px] -translate-x-1/2 -z-10 w-[110vw] h-[500px] blur-2xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 10%, #7D2AE7 16%, #3969E7 40%, #07B9CE 80%)',
          opacity: 0.12
        }}
      />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-3xl font-extrabold bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#1f57e5] bg-clip-text text-transparent inline-block"
        >
          Frequently Asked Questions
          <span className="block h-[4px] w-30 mx-auto mt-5 rounded-full bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#3969E7] animate-bounce" />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-lg bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#1f57e5] bg-clip-text text-transparent font-medium"
        >
          We get it, health can feel complicated. Here are quick answers to common questions.
        </motion.p>
      </div>

      {/* FAQ Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group rounded-xl p-[2px] bg-gradient-to-tr from-[#07B9CE]/60 via-[#3969E7]/70 to-[#7D2AE7]/60"
          >
            <div className="bg-white rounded-xl p-6 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
              {faq.icon}
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{faq.question}</h3>
              <p className="text-sm text-gray-700">{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
