'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import animationData from '../animations/lifelytix-preview.json';
import { HandHeart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sparkles, Users, HeartHandshake } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import FAQ from '../components/FAQ';
import FeatureHighlights from '../components/FeatureHighlights';
import Testimonials from '../components/Testimonials';
import CtaCoachBar from '../components/CtaCoachBar';
import ScrollToTopButton from '../components/ScrollToTopButton';
import StatCounter from '../components/StatCounter';
import HowItWorks from '../components/howitworks';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const rotatingContent = [
  {
    headline: 'Unlock Deeper Sleep Insights',
    subline: 'Track, understand, and improve your nightly rest with AI-powered guidance.'
  },
  {
    headline: 'Stay One Step Ahead of Stress',
    subline: 'Catch early signs, balance your mood, and feel supported every day.'
  },
  {
    headline: 'See Your Health in a Whole New Light',
    subline: 'Transform complex data into simple, actionable insights you can trust.'
  },
  {
    headline: 'Recover Smarter, Live Better',
    subline: 'Let Lifelytix guide your heart, mind, and body to a stronger you.'
  }
];

export default function LandingPage() {
  const [langOpen, setLangOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [typedLetters, setTypedLetters] = useState('');
  const [matchedLang, setMatchedLang] = useState<string | null>(null);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const languages = [
    'English', 'Urdu', 'Spanish', 'German', 'French', 'Arabic', 'Hindi',
    'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean',
    'Turkish', 'Dutch', 'Swedish', 'Norwegian', 'Polish', 'Hebrew', 'Thai', 'Vietnamese'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % rotatingContent.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!langOpen) return;
    const key = e.key.toLowerCase();
    if (/^[a-z]$/.test(key)) {
      setTypedLetters((prev) => prev + key);
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => {
        setTypedLetters('');
        setMatchedLang(null);
      }, 800);
    }
  };

  useEffect(() => {
    if (typedLetters === '') return;
    const match = languages.find((lang) => lang.toLowerCase().startsWith(typedLetters));
    if (match) {
      setMatchedLang(match);
      const element = document.getElementById(`lang-${match}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [typedLetters]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [langOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen font-poppins relative overflow-y-scroll bg-blue-200 scrollbar-thin scrollbar-thumb-gradient">
      <style jsx global>{`
        ::-webkit-scrollbar { width: 7px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #7D2AE7, #3969E7, #07B9CE);
          border-radius: 6px;
          min-height: 150px;
        }
        ::-webkit-scrollbar:horizontal { height: 6px; }
      `}</style>

      {/* Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[98%] md:w-[95%] max-w-[1600px] bg-gradient-to-r from-[#7D2AE7]/85 via-[#3969E7]/85 to-[#07B9CE]/85 rounded-2xl px-6 py-5 shadow-2xl backdrop-blur-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <HandHeart className="w-7 h-7 text-white" />
            <span className="text-white font-bold text-2xl tracking-tight">LifeLytix</span>
          </div>

          <nav className="hidden md:flex space-x-6 text-white font-medium">
            <a href="#how-it-works" className="hover:text-gray-200">How it works</a>
            <a href="#features" className="hover:text-gray-200">Features</a>
            <a href="#faq" className="hover:text-gray-200">FAQs</a>
            <a href="#about" className="hover:text-gray-200">About</a>
            <a href="#contact" className="hover:text-gray-200">Contact us</a>
          </nav>

          <div className="flex items-center space-x-3 relative z-20">
            <button
              ref={buttonRef}
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-purple-600 font-semibold bg-white/50 border border-purple-600 px-4 py-1.5 rounded-full text-sm hover:bg-white/30 hover:shadow shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <span>Language</span>
              <span>▾</span>
            </button>

        <button
          type="button"
          onClick={() => setShowComingSoon(true)}
          className="text-purple-600 font-semibold bg-white/50 border border-purple-600 px-4 py-1.5 rounded-full text-sm hover:bg-white/30 hover:shadow-lg shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          Download App
        </button>

          </div>
        </div>

        {langOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-[108px] top-[64px] w-[140px] max-h-64 overflow-y-auto bg-[#7D2AE7]/60 backdrop-blur-md text-white font-semibold rounded-xl shadow-lg z-50 ring-1 ring-purple-300 lang-scrollbar"
          >
            {languages.map((lang) => (
              <div
                key={lang}
                id={`lang-${lang}`}
                className={`px-4 py-2 cursor-pointer text-sm hover:bg-purple-500 rounded transition-all ${matchedLang === lang ? 'bg-purple-400' : ''}`}
              >
                {lang}
              </div>
            ))}
          </div>
        )}
      </header>

      <section id="hero" className="mt-24 h-[75vh] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 gap-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.10 }}
          viewport={{ once: true }}
          className="text-white max-w-md text-center md:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.13 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold leading-snug mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#1f57e5]"
          >
            {rotatingContent[headlineIndex].headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.21 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-[#3969E7] mt-4"
          >
            {rotatingContent[headlineIndex].subline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 mt-14 justify-center md:justify-start"
          >
          <Link href="/signup" passHref legacyBehavior>
            <a className="min-w-[140px] px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-br from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] hover:shadow-lg shadow-lg hover:scale-105 active:scale-95 transition-transform flex justify-center items-center text-center">
              Sign Up
            </a>
          </Link>

          <Link href="/login" passHref legacyBehavior>
            <a className="min-w-[140px] px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-br from-[#07B9CE] via-[#3969E7] to-[#7D2AE7] hover:shadow-lg shadow-lg hover:scale-105 active:scale-95 transition-transform flex justify-center items-center text-center">
              Log In
            </a>
          </Link>

          </motion.div>
        </motion.div>
                {/* Lottie Animation replacing phone */}
        <div className="">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
      </section>
    {showComingSoon && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[1100]">
        <div className="bg-gradient-to-br from-[#090e1a]/90 via-[#090e1a]/95 to-[#090e1a] backdrop-blur-md rounded-2xl px-7 py-6 shadow-2xl max-w-xs w-full text-center">
          <div className="text-2xl font-bold text-[#7D2AE7] mb-2">Coming Soon!</div>
          <div className="text-gray-400 text-base mb-5">
            The LifeLytix app is still in progress.<br />Please check back soon.
          </div>
          <button
            className="mt-1 px-4 py-2 rounded-full bg-gradient-to-r from-[#7D2AE7] to-[#07B9CE] text-white font-semibold shadow hover:scale-105 active:scale-95 transition"
            onClick={() => setShowComingSoon(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}

      <div id="how-it-works"><HowItWorks /></div>
      <div id="features"><FeatureHighlights /></div>
      <Testimonials />
      
      <CtaCoachBar />
      <FAQ />
      <StatCounter />

<section
  id="about"
  className="relative z-20 py-16 md:py-24 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto flex flex-col items-center"
>
  {/* Radial background aura */}
  <div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full pointer-events-none z-0"
    style={{
      background: 'radial-gradient(circle at 60% 30%, #07B9CE44 0%, #3969E777 60%, transparent 100%)',
      filter: 'blur(36px)'
    }}
  />
  {/* Main Card */}
  <div className="relative z-10 bg-gradient-to-br from-[#090e1a]/90 via-[#090e1a]/95 to-[#090e1a] backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl px-7 md:px-16 py-12 max-w-3xl w-full flex flex-col items-center">
    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7D2AE7] via-[#5248e3] to-[#1f57e5] text-center mb-5 tracking-tight">
      About LifeLytix
    </h2>
    <p className="text-lg text-gray-400 leading-relaxed text-center font-medium drop-shadow-md">
      LifeLytix isn’t just another health app, it’s your daily companion for living, feeling, and thriving with intention.
      <br /><br />
      I started LifeLytix because I was tired of being told our health was just a number, a chart, or a step count.
      Real life is unpredictable, some days you’re on top of your game, some days you just need support and a little perspective.
      <br /><br />
      Lifelytix uses advanced AI & a human touch to connect the dots between your mind, body, and habits, helping you make sense of it all.
      Whether you’re a data-driven athlete or someone just trying to get through a tough week, LifeLytix adapts to you, not the other way around.
      <br /><br />
      We believe in gentle, real progress. We’re here to help you understand your rhythms, recover from setbacks, & celebrate small wins.
      Because health is a journey, not a competition & you deserve to feel seen every step of the way.
    </p>
    {/* Brand Values */}
    <div className="mt-8 flex gap-6 flex-wrap justify-center">
      <span className="flex items-center gap-2 text-sm font-semibold bg-[#3969E7]/20 text-[#3969E7] rounded-full px-4 py-2 shadow">
        <Sparkles className="w-5 h-5" /> AI-Powered
      </span>
      <span className="flex items-center gap-2 text-sm font-semibold bg-[#3969E7]/20 text-[#3969E7] rounded-full px-4 py-2 shadow">
        <HeartHandshake className="w-5 h-5" /> Human-Centric
      </span>
      <span className="flex items-center gap-2 text-sm font-semibold bg-[#3969E7]/20 text-[#3969E7] rounded-full px-4 py-2 shadow">
        <Users className="w-5 h-5" /> For Everyone
      </span>
    </div>
    {/* Divider */}
    <div className="my-8 w-30 h-1 rounded bg-gradient-to-r from-[#7D2AE7] via-[#3969E7] to-[#07B9CE]"></div>
  </div>
</section>


<footer id="contact" className="w-full bg-gradient-to-br from-[#7D2AE7]/70 via-[#3969E7]/70 to-[#07B9CE]/70 text-white pt-16 pb-10 px-6 md:px-20 shadow-inner backdrop-blur-md">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
    
    {/* Brand Column */}
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <HandHeart className="w-7 h-7 text-white drop-shadow-md" />
        <span className="text-2xl font-bold drop-shadow-sm">LifeLytix</span>
      </div>
      <p className="text-sm leading-relaxed text-white/90">
        The AI-powered health platform helping you visualize, optimize, and take control of your wellness journey.
      </p>
    </div>

    {/* Links Column */}
    <div className="space-y-3">
      <h4 className="text-lg font-semibold mb-1.5 drop-shadow-sm">Quick Links</h4>
      <ul className="text-sm space-y-2">
        {["How It Works","Features", "Testimonials", "FAQs", "About"].map((text) => (
          <li key={text}>
            <a href={`#${text.toLowerCase().replace(/\s/g, "-")}`} className="font-semibold hover:decoration-2 hover:text-purple-700 transition-all">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Contact Column */}
    <div className="space-y-4">
      <h4 className="text-lg font-semibold mb-1 drop-shadow-sm">Contact Us</h4>
      <p className="text-sm">Email: <a href="mailto:support@lifelytix.ai" className="hover:text-purple-700">support@lifelytix.ai</a></p>
      <p className="text-sm">Phone: <a href="tel:+1234567890" className="hover:text-purple-700">+1 (234) 567-890</a></p>
      <p className="text-sm">Location: 123 Health Lane, Wellness City, US</p>

      <div className="flex gap-4 items-center mt-8">
        {[
          { href: 'https://facebook.com', Icon: FaFacebookF, label: 'Facebook' },
          { href: 'https://instagram.com', Icon: FaInstagram, label: 'Instagram' },
          { href: 'https://linkedin.com', Icon: FaLinkedinIn, label: 'LinkedIn' },
          { href: 'https://twitter.com', Icon: FaTwitter, label: 'Twitter' }
        ].map(({ href, Icon, label }, i) => (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="relative group">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/10 transition-transform hover:rotate-2 hover:scale-110 hover:shadow-[0_0_12px_rgba(125,42,231,0.6)]">
              <Icon className="w-5 h-5 text-white group-hover:text-purple-600" />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-[10px] text-white">
              {label}
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
  <div className="mt-10 border-t border-white/30 pt-6 text-center text-sm text-white/80">
    © 2025 LifeLytix. All rights reserved.
  </div>
</footer>
      <ScrollToTopButton />
      <ChatWidget />
    </div>
  );
}
