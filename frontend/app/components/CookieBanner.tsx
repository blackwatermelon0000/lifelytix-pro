'use client';

import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookieAccepted');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setDismissed(true);
  };

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-10 md:right-10 z-50 max-w-3xl mx-auto
        transition-opacity duration-700 ease-in-out
        ${visible && !dismissed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-purple-800">
          We use cookies to enhance your experience, personalize content, and analyze traffic.
        </p>
        <button
          onClick={handleAccept}
          className="bg-purple-800 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
}
