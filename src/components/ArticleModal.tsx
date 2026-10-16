import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Publication } from '../types/portfolio';

interface ArticleModalProps {
  publication: Publication | null;
  onClose: () => void;
  onCursorChange: (type: 'default' | 'hover' | 'read' | 'drag') => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  publication,
  onClose,
  onCursorChange,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [readProgress, setReadProgress] = useState(0);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (publication) {
      window.addEventListener('keydown', handleKeyDown);
      onCursorChange('default');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [publication, onClose, onCursorChange]);

  // Track reading progress inside modal
  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      setReadProgress(Math.min(100, Math.round((scrollTop / total) * 100)));
    }
  };

  if (!publication) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-[#1C1C1C]/80 backdrop-blur-md overflow-hidden modal-surface"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
      >
        {/* Backdrop click dismiss */}
        <div
          className="fixed inset-0 z-0 cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Window Container - Strict Single Scroll Structure */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#F4F3EF] text-[#1C1C1C] rounded-2xl shadow-2xl overflow-hidden border border-[#1C1C1C]/25 z-10 h-[92vh] max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Sticky Header */}
          <div className="flex-shrink-0 px-6 md:px-8 py-4 border-b border-[#1C1C1C]/15 bg-[#F4F3EF] flex items-center justify-between z-20 relative">
            <div className="flex items-center gap-3">
              <span className="font-serif text-sm md:text-base font-bold text-[#C86A53] tracking-widest uppercase">
                {publication.publication}
              </span>
              <span className="text-[#1C1C1C]/30">&bull;</span>
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#1C1C1C]/60 font-medium">
                {publication.category}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-sans text-[#1C1C1C]/60 uppercase tracking-wider">
                <span>Reading: {readProgress}%</span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#1C1C1C]/5 hover:bg-[#1C1C1C] hover:text-[#F4F3EF] text-[#1C1C1C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C86A53]"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reading progress bar line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C1C1C]/10">
              <div
                className="h-full bg-[#C86A53] transition-all duration-100 ease-out"
                style={{ width: `${readProgress}%` }}
              />
            </div>
          </div>

          {/* Smooth Scrollable Reader Body - ONLY scrollbar in the modal */}
          <div
            ref={contentRef}
            onScroll={handleScroll}
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 md:p-12 space-y-8 editorial-scrollbar"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {/* Header info */}
            <div>
              <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-[0.2em] text-[#1C1C1C]/60 mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C86A53]" />
                  {publication.date}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C86A53]" />
                  {publication.readTime}
                </span>
              </div>

              <h1
                id="article-modal-title"
                className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#1C1C1C]"
              >
                {publication.title}
              </h1>

              <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#1C1C1C]/75 mt-4 leading-relaxed border-l-2 border-[#C86A53] pl-4">
                {publication.excerpt}
              </p>
            </div>

            {/* Featured Hero Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-[#1C1C1C]/15 bg-[#1C1C1C]/10">
              <img
                src={publication.imageUrl}
                alt={publication.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#1C1C1C]/80 to-transparent text-[#F4F3EF] text-[11px] font-sans">
                Archival documentary photographic plate &bull; Courtesy of {publication.publication}
              </div>
            </div>

            {/* Editorial Essay Text with Drop Cap */}
            <div className="prose prose-lg max-w-none text-[#1C1C1C] space-y-6 font-serif leading-relaxed text-base sm:text-lg select-text">
              {publication.fullText.split('\n\n').map((paragraph, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#C86A53]'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))}

              {/* Editorial Pull Quote */}
              <div className="my-10 p-8 rounded-xl bg-[#1C1C1C]/5 border-y-2 border-[#C86A53] text-center select-text">
                <p className="font-serif italic text-xl md:text-2xl text-[#1C1C1C] leading-snug">
                  &ldquo;A society that forfeits its long-form inquiry surrenders its ability to govern its own historical direction.&rdquo;
                </p>
                <span className="block font-sans text-[11px] uppercase tracking-[0.25em] text-[#C86A53] font-semibold mt-3">
                  Elena Rostova &bull; London Dispatches
                </span>
              </div>

              <p className="font-sans text-sm text-[#1C1C1C]/70">
                This full monograph was originally commissioned for print distribution. To request citation permissions, reproduction rights, or speaking engagements regarding this inquiry, please contact the New York Bureau.
              </p>
            </div>

            {/* Author Byline Box */}
            <div className="pt-8 border-t border-[#1C1C1C]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#1C1C1C]/20 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    alt="Elena Rostova"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1C1C1C]">
                    Elena Rostova
                  </h4>
                  <p className="font-sans text-xs text-[#1C1C1C]/60">
                    Senior Editor &bull; Media Strategist
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1C1C1C] text-[#F4F3EF] text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#C86A53] transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
