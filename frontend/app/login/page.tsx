'use client';

import { useState, useEffect, useRef } from 'react';
import { HandHeart } from 'lucide-react';

export default function LoginPage() {
  const [langOpen, setLangOpen] = useState(false);
  const [typedLetters, setTypedLetters] = useState('');
  const [matchedLang, setMatchedLang] = useState<string | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const languages = [
    'English', 'Urdu', 'Spanish', 'German', 'French', 'Arabic', 'Hindi',
    'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean',
    'Turkish', 'Dutch', 'Swedish', 'Norwegian', 'Polish', 'Hebrew', 'Thai',
    'Vietnamese'
  ];

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
    const match = languages.find((lang) =>
      lang.toLowerCase().startsWith(typedLetters)
    );
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
    <div className="min-h-screen font-poppins bg-gradient-to-b from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] px-6 py-4 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-1.5">
          <HandHeart className="w-8 h-8 text-[#f5f9f5]" />
          <span className="text-white font-bold text-2xl tracking-tight">LifeLytix</span>
        </div>

        {/* Language Dropdown */}
        <div className="relative z-20 text-white text-sm">
          <div className="flex items-center space-x-2">
            <button
              ref={buttonRef}
              onClick={() => setLangOpen(!langOpen)}
              className="text-[#f5f9f5] font-semibold bg-white/20 border border-[#f5f9f5] px-4 py-1.5 rounded-full text-sm hover:bg-white/30 hover:shadow-lg shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              Language ▾
            </button>
          </div>

          {langOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-30 max-h-54 overflow-y-auto bg-purple-600/0 text-white rounded-xl shadow-lg scrollbar-none"
              tabIndex={0}
            >
              {languages.map((lang) => (
                <div
                  key={lang}
                  id={`lang-${lang}`}
                  className={`px-4 py-2 cursor-pointer rounded-md transition ${
                    matchedLang === lang ? 'bg-[#2e58bb]' : 'hover:bg-blue-600'
                  }`}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Login Card */}
      <div className="flex items-center justify-center mt-16">
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-[26rem] text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Member Login</h2>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3 rounded-full text-sm font-bold border border-white/30 bg-white/80 text-blue-600 placeholder:font-normal placeholder:text-blue-600 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-3 rounded-full text-sm font-bold border border-white/30 bg-white/80 text-blue-600 placeholder:font-normal placeholder:text-blue-600 focus:outline-none"
            />
            <div className="text-right text-sm text-white underline hover:text-blue-600 cursor-pointer">
              Forgot Password?
            </div>
            <div className="text-sm text-white">
              Don’t have an account?{' '}
              <a href="/signup" className="font-semibold underline text-[#7D2AE7] hover:text-[#f5f9f5]">
                Sign up
              </a>
            </div>
          </form>

          <div className="mt-6 space-y-3">
            <button className="w-full bg-[#3B82F6] text-white font-semibold py-2 rounded-full hover:bg-blue-600 transition">
              Continue with Google
            </button>
            <button className="w-full bg-black text-white font-semibold py-2 rounded-full hover:bg-gray-900 transition">
              Continue with Apple
            </button>
            <button className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-[#059fb3] transition">
              Continue with Guest
            </button>
          </div>

          <p className="text-xs text-white mt-6 leading-relaxed">
            By continuing, you agree to LifeLytix’s{' '}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7D2AE7] hover:text-[#f5f9f5] underline"
            >
              Terms of Use
            </a>
            <br />
            Read our{' '}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7D2AE7] hover:text-[#f5f9f5] underline"
            >
              Privacy Policy
            </a>.
          </p>

        </div>
      </div>
    </div>
  );
}
