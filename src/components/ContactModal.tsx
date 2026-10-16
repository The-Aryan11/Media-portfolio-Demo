import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCursorChange: (type: 'default' | 'hover' | 'read' | 'drag') => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onCursorChange,
}) => {
  const [topic, setTopic] = useState('Keynote & Speaking');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      onCursorChange('default');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onCursorChange]);

  if (!isOpen) return null;

  const topics = [
    'Keynote & Speaking',
    'Editorial Advisory',
    'Long-form Commission',
    'Media Strategy',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setOrg('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-[#1C1C1C]/80 backdrop-blur-md overflow-hidden modal-surface"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#F4F3EF] text-[#1C1C1C] rounded-2xl shadow-2xl overflow-hidden border border-[#1C1C1C]/25 z-10 max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#1C1C1C]/15 bg-[#F4F3EF] z-20">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C86A53] font-bold">
                COMMISSION &bull; DIALOGUE
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1C1C1C]">
                Initiate Engagement
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#1C1C1C]/5 hover:bg-[#1C1C1C] hover:text-[#F4F3EF] text-[#1C1C1C] transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-8 editorial-scrollbar"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C86A53]/15 text-[#C86A53] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#1C1C1C]">
                  Dispatch Transmitted
                </h4>
                <p className="font-sans text-sm text-[#1C1C1C]/75 max-w-md mx-auto leading-relaxed">
                  Thank you, {name || 'esteemed colleague'}. Your dispatch regarding &ldquo;{topic}&rdquo; has been forwarded to Elena Rostova and the executive bureau. You will receive an initial response within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-[#1C1C1C] text-[#F4F3EF] text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#C86A53] transition-colors"
                  >
                    Return to Portfolio
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Topic Selector */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest text-[#1C1C1C]/70 mb-2 font-semibold">
                    Nature of Inquiry
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {topics.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTopic(t)}
                        className={`py-2 px-3 rounded-lg text-xs font-sans tracking-wider border transition-all text-left ${
                          topic === t
                            ? 'bg-[#1C1C1C] text-[#F4F3EF] border-[#1C1C1C]'
                            : 'bg-white/60 text-[#1C1C1C] border-[#1C1C1C]/20 hover:border-[#1C1C1C]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Org */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-[#1C1C1C]/70 mb-1 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alistair Vance"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#1C1C1C]/20 bg-white/70 text-sm focus:outline-none focus:border-[#C86A53]"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-[#1C1C1C]/70 mb-1 font-semibold">
                      Organization / Publication
                    </label>
                    <input
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="e.g. Oxford University / The Times"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#1C1C1C]/20 bg-white/70 text-sm focus:outline-none focus:border-[#C86A53]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-sans text-[11px] uppercase tracking-widest text-[#1C1C1C]/70 mb-1 font-semibold">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@institution.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#1C1C1C]/20 bg-white/70 text-sm focus:outline-none focus:border-[#C86A53]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-sans text-[11px] uppercase tracking-widest text-[#1C1C1C]/70 mb-1 font-semibold">
                    Dispatch Summary
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Outline your proposal, date range, or editorial requirements..."
                    className="w-full px-4 py-2.5 rounded-lg border border-[#1C1C1C]/20 bg-white/70 text-sm focus:outline-none focus:border-[#C86A53]"
                  />
                </div>

                {/* Submit button & Direct channels */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1C1C1C] text-[#F4F3EF] text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[#C86A53] transition-colors flex items-center justify-center gap-2 group"
                  >
                    <span>Transmit Dispatch</span>
                    <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-4 text-xs font-sans text-[#1C1C1C]/60">
                    <span>Or direct via</span>
                    <a
                      href="mailto:elena@elenarostova.com"
                      className="text-[#C86A53] hover:underline flex items-center gap-1 font-medium"
                    >
                      <Mail className="w-3 h-3" />
                      Email
                    </a>
                    <span>&bull;</span>
                    <a
                      href="https://wa.me/12128904421"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C86A53] hover:underline flex items-center gap-1 font-medium"
                    >
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
