'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 120); // lowered threshold
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-28 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] text-white shadow-xl hover:scale-105 active:scale-95 transition-transform"
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  ) : null;
}
