'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap-init';

const QUICK_REPLIES = [
  'I want to buy a home',
  'Schedule a site visit',
  'Tell me about Koregaon Park',
  'What is your price range?',
];

const BOT_RESPONSES: Record<string, string> = {
  'I want to buy a home': "That's wonderful! Could you share your preferred location in Pune and your budget range? Our advisors specialize in matching lifestyles with the perfect home.",
  'Schedule a site visit': "We'd love to show you around! Please share your preferred date, time, and the property or area you're interested in. We'll confirm within 2 hours.",
  'Tell me about Koregaon Park': 'Koregaon Park is one of Pune\'s most premium neighbourhoods — leafy lanes, boutique cafes, and proximity to MG Road. Prices range from ₹1.5 Cr to ₹6 Cr. We have 24 active listings there.',
  'What is your price range?': 'We cover properties from ₹70 Lakhs to ₹12 Crore across Pune. Our sweet spot is the ₹1.5–4 Cr luxury segment in Koregaon Park, Kalyani Nagar, and Baner.',
};

interface Message {
  text: string;
  sender: 'bot' | 'user';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm Nestara's assistant. How can I help you find your dream home?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      gsap.fromTo(panelRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = BOT_RESPONSES[text] || "Thanks for reaching out! One of our advisors will get back to you shortly. You can also call us at +91 20 6789 0123.";
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      setTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div ref={chatRef} className="fixed bottom-6 right-6 z-[9990]">
      {/* Chat Panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.3)] border border-[var(--border-subtle)]"
        >
          {/* Header */}
          <div className="bg-[var(--surface-dark)] px-5 py-4 flex items-center gap-3 border-b border-white/[0.06]">
            <div className="w-9 h-9 rounded-full bg-[var(--brand)] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-white text-[14px] font-medium font-body block">Nestara Assistant</span>
              <span className="text-white/40 text-[11px] font-body flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online now
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/[0.06] flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-50">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[var(--surface)]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 text-[13px] leading-relaxed font-body rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-[var(--brand)] text-white rounded-br-md'
                    : 'bg-[var(--surface-alt)] text-[var(--ink)] border border-[var(--border-subtle)] rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[var(--surface-alt)] border border-[var(--border-subtle)] px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--ink-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[var(--ink-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[var(--ink-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && !typing && (
            <div className="px-4 py-3 bg-[var(--surface)] border-t border-[var(--border-subtle)] flex flex-wrap gap-2">
              {QUICK_REPLIES.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(reply)}
                  className="text-[11px] font-body px-3 py-1.5 rounded-full border border-[var(--brand)]/30 text-[var(--brand)] hover:bg-[var(--brand)]/10 transition-all duration-300"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-4 py-3 bg-[var(--surface-alt)] border-t border-[var(--border-subtle)] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[var(--surface)] border border-[var(--border-default)] rounded-full px-4 py-2.5 text-[13px] font-body text-[var(--ink)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--brand)]/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-[var(--brand)] flex items-center justify-center hover:bg-[var(--brand-light)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="m22 2-11 11" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(196,164,78,0.4)] transition-all duration-500 hover:scale-110 hover:shadow-[0_12px_40px_rgba(196,164,78,0.5)] ${
          open ? 'bg-[var(--ink)] rotate-0' : 'bg-[var(--brand)]'
        }`}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Pulse ring when closed */}
      {!open && (
        <div className="absolute inset-0 rounded-full border-2 border-[var(--brand)] animate-ping opacity-30 pointer-events-none" />
      )}
    </div>
  );
}
