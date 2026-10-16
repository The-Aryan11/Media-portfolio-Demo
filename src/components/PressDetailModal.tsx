import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Calendar, MapPin } from 'lucide-react';
import { PressItem } from '../types/portfolio';

interface PressDetailModalProps {
  item: PressItem | null;
  onClose: () => void;
  onCursorChange: (type: 'default' | 'hover' | 'read' | 'drag') => void;
}

export const PressDetailModal: React.FC<PressDetailModalProps> = ({
  item,
  onClose,
  onCursorChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      onCursorChange('default');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onCursorChange]);

  if (!item) return null;

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
          className="relative w-full max-w-3xl bg-[#F4F3EF] text-[#1C1C1C] rounded-2xl shadow-2xl overflow-hidden border border-[#1C1C1C]/25 z-10 max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-[#1C1C1C]/15 bg-[#F4F3EF] z-20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C86A53] animate-pulse"></span>
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1C1C]">
                {item.outlet} &bull; Broadcast Record
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#1C1C1C]/5 hover:bg-[#1C1C1C] hover:text-[#F4F3EF] text-[#1C1C1C] transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-8 space-y-6 editorial-scrollbar"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {/* Visual Media Preview Container */}
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-[#1C1C1C] border border-[#1C1C1C]/20 group">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/40 to-transparent" />

              {/* Center Play Button & Sound Bars */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#F4F3EF]">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-[#C86A53] hover:bg-[#A94E38] text-[#F4F3EF] flex items-center justify-center shadow-xl transition-all hover:scale-105"
                  aria-label={isPlaying ? 'Pause broadcast' : 'Play broadcast'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>

                {/* Animated Audio Equalizer Bars */}
                {isPlaying && (
                  <div className="flex items-end gap-1.5 h-6">
                    <span className="w-1 bg-[#F4F3EF] rounded-full animate-bounce [animation-delay:0.1s] h-4"></span>
                    <span className="w-1 bg-[#C86A53] rounded-full animate-bounce [animation-delay:0.3s] h-6"></span>
                    <span className="w-1 bg-[#F4F3EF] rounded-full animate-bounce [animation-delay:0.2s] h-3"></span>
                    <span className="w-1 bg-[#C86A53] rounded-full animate-bounce [animation-delay:0.4s] h-5"></span>
                    <span className="w-1 bg-[#F4F3EF] rounded-full animate-bounce [animation-delay:0.15s] h-4"></span>
                  </div>
                )}
              </div>

              {/* Progress Scrub Bar */}
              <div className="absolute bottom-4 inset-x-6">
                <div className="flex justify-between text-[11px] font-sans text-[#F4F3EF]/80 mb-1">
                  <span>{isPlaying ? '14:22' : '00:00'}</span>
                  <span>{item.duration}</span>
                </div>
                <div
                  className="w-full h-1.5 bg-[#F4F3EF]/30 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress(Math.round((clickX / rect.width) * 100));
                  }}
                >
                  <div
                    className="h-full bg-[#C86A53] rounded-full transition-all"
                    style={{ width: `${isPlaying ? 45 : progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Media Metadata */}
            <div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans uppercase tracking-[0.2em] text-[#C86A53] font-semibold mb-2">
                <span>{item.format}</span>
                <span className="text-[#1C1C1C]/40">&bull;</span>
                <span className="text-[#1C1C1C]/60 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
                <span className="text-[#1C1C1C]/40">&bull;</span>
                <span className="text-[#1C1C1C]/60 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.location}
                </span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1C1C1C] leading-snug">
                {item.title}
              </h2>

              <p className="font-sans text-sm md:text-base text-[#1C1C1C]/80 mt-4 leading-relaxed">
                {item.summary}
              </p>
            </div>

            {/* Key Audio Transcript Excerpt */}
            <div className="p-5 rounded-xl bg-[#1C1C1C]/5 border border-[#1C1C1C]/10 space-y-2 select-text">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#C86A53] font-bold">
                Selected Transcript Excerpt
              </span>
              <p className="font-serif italic text-sm md:text-base text-[#1C1C1C]/80 leading-relaxed">
                &ldquo;When platforms optimize for velocity over verification, the silence between events disappears. And it is in that silence that contemplation, inquiry, and civil discourse have always existed.&rdquo;
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-[#1C1C1C]/15 flex items-center justify-between">
              <span className="font-sans text-xs text-[#1C1C1C]/60">
                Official Media Archive Reference #BRD-2026
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#1C1C1C] text-[#F4F3EF] text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#C86A53] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
