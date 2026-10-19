import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'bot' | 'user'; text: string; time: string }[]>([
    {
      sender: 'bot',
      text: 'Good evening. This is the Aurelia Dining Concierge. How may we assist your table or cellar inquiry?',
      time: 'Just now',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatLog((prev) => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setMessage('');

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Thank you. Our Head Sommelier & Maître d' have logged your request: "${userMsg}". You can also reach our desk at ${RESTAURANT_INFO.phone}.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 900);
  };

  const openDirectWhatsApp = () => {
    const encoded = encodeURIComponent('Hello Aurelia Concierge, I would like to inquire about reserving a table / private salon.');
    window.open(`https://wa.me/447946092800?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Concierge Popover Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-[#13141F] light:bg-white border border-[#C5A059]/40 text-[#F3F4F6] light:text-[#191817] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0B0C10] light:bg-[#FAF8F5] border-b border-[#C5A059]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#F3F4F6] light:text-[#191817]">
                  Aurelia Concierge
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Mayfair Desk</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white light:hover:text-black p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-[#0E0F17] light:bg-[#F6F4EE] text-xs">
            {chatLog.map((chat, i) => (
              <div
                key={i}
                className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-none text-xs leading-relaxed ${
                    chat.sender === 'user'
                      ? 'bg-[#C5A059] text-[#0B0C10] font-medium'
                      : 'bg-[#181926] light:bg-white text-slate-200 light:text-slate-800 border border-[#C5A059]/20'
                  }`}
                >
                  {chat.text}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 font-mono">
                  <span>{chat.time}</span>
                  {chat.sender === 'user' && <CheckCheck className="w-3 h-3 text-[#C5A059]" />}
                </div>
              </div>
            ))}
          </div>

          {/* Direct WhatsApp Action Link */}
          <div className="px-4 py-2 bg-[#0B0C10]/70 light:bg-[#FAF8F5] border-t border-[#C5A059]/15 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Prefer direct WhatsApp?</span>
            <button
              onClick={openDirectWhatsApp}
              className="text-[#C5A059] hover:underline font-semibold"
            >
              Open in App →
            </button>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-[#13141F] light:bg-white border-t border-[#C5A059]/20 flex gap-2">
            <input
              type="text"
              placeholder="Type message to concierge..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#0B0C10] light:bg-[#FAF8F5] border border-[#C5A059]/30 text-xs text-white light:text-black focus:outline-none focus:border-[#C5A059]"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-[#C5A059] text-[#0B0C10] hover:bg-[#D4AF37] transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Pill/Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Aurelia Concierge"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-semibold tracking-wider uppercase font-sans">
          Concierge
        </span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#0B0C10]" />
      </button>
    </div>
  );
};
