'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, RefreshCcw } from 'lucide-react';

export default function ChatWidget() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { from: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      setMessages([
        ...updatedMessages,
        { from: 'bot', text: data.reply || 'Sorry, no reply received.' }
      ]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { from: 'bot', text: "Sorry, I couldn’t reply right now." }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // FIXED: type-safe, no `as any`
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      const el = chatRef.current.querySelector('.chat-messages') as HTMLDivElement;
      if (el) el.scrollTop = el.scrollHeight;
    }
  }, [messages, loading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setMessages([{ from: 'bot', text: 'Hi! How can I help?' }]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-[#7D2AE7] via-[#3969E7] to-[#07B9CE] text-white p-4 rounded-full shadow-lg hover:scale-110 transition z-50"
        aria-label="Open Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {open && (
        <div
          ref={chatRef}
          className="fixed bottom-20 right-6 w-[320px] rounded-2xl shadow-2xl p-4 z-50 border bg-gradient-to-br from-[#090e1a]/90 via-[#090e1a]/95 to-[#090e1a] flex flex-col"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold bg-clip-text text-[#f5f9f5]">
              Lifey
            </h4>
            <div className="flex gap-2">
              <button onClick={startNewChat} aria-label="New Chat">
                <RefreshCcw className="w-5 h-5 text-[#3969E7] hover:text-blue-600" />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close Chat">
                <X className="w-5 h-5 text-red-600 hover:text-red-600" />
              </button>
            </div>
          </div>

          <div
            className="chat-messages flex-1 space-y-3 mb-4 pr-1 max-h-[260px] overflow-y-auto scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-xl max-w-[85%] text-sm whitespace-pre-line ${
                  msg.from === 'user'
                    ? 'text-[#f5f9f5] bg-[#3969E7] text-left self-end ml-auto'
                    : 'text-[#f5f9f5] bg-[#7D2AE7] text-left self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="px-3 py-2 rounded-xl max-w-[85%] text-sm text-[#f5f9f5] bg-[#7D2AE7] self-start animate-pulse flex items-center gap-1">
                Lifey is typing
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.16s]">.</span>
                <span className="animate-bounce [animation-delay:0.32s]">.</span>
              </div>
            )}
          </div>

          <textarea
            rows={2}
            className="w-full bg-[#0f111b]/80 text-white placeholder:text-white/50 border border-white/10 rounded-md resize-none p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3969E7] focus:border-[#3969E7] transition duration-200"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button
            onClick={handleSend}
            className="mt-3 w-full bg-[#3969E7] text-white px-4 py-2 rounded-lg hover:opacity-90"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      )}
    </>
  );
}
