import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Mail, MessageCircle, ArrowUpRight, Globe, Compass } from 'lucide-react';

interface FooterSectionProps {
  onCursorChange: (type: 'default' | 'hover' | 'read' | 'drag', text?: string) => void;
  onOpenContact: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onCursorChange,
  onOpenContact,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeText =
    'AVAILABLE FOR INTERVIEWS • CONSULTING • KEYNOTES • EDITORIAL DIRECTION • MEDIA STRATEGY • SYMPOSIUMS • ';

  return (
    <footer id="footer" className="relative w-full bg-[#1C1C1C] text-[#F4F3EF] overflow-hidden pt-16 pb-12">
      {/* 1. Infinite Scrolling Marquee using Framer Motion */}
      <div className="w-full overflow-hidden border-y border-[#F4F3EF]/15 py-4 mb-16 md:mb-24 bg-[#1C1C1C]">
        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex items-center text-xs md:text-sm font-sans tracking-[0.3em] uppercase text-[#F4F3EF]/80 font-semibold"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 25,
            }}
          >
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between">
        {/* Editorial Subheader */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#F4F3EF]/15">
          <div className="space-y-2">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#C86A53] font-bold">
              04 &bull; INITIATE ENGAGEMENT
            </span>
            <p className="font-serif italic text-lg md:text-xl text-[#F4F3EF]/80 max-w-lg">
              For editorial inquiries, keynote lectures, sovereign media advisory, or strategic commissions.
            </p>
          </div>

          {/* Quick Contact Links with Animated Underline */}
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {/* Email Link */}
            <a
              href="mailto:elena@elenarostova.com"
              onMouseEnter={() => onCursorChange('hover')}
              onMouseLeave={() => onCursorChange('default')}
              className="group relative inline-flex items-center gap-2 font-sans text-sm md:text-base tracking-widest text-[#F4F3EF] py-1"
            >
              <Mail className="w-4 h-4 text-[#C86A53]" />
              <span>elena@elenarostova.com</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C86A53] transition-all duration-300 ease-out group-hover:w-full" />
            </a>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/12128904421"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => onCursorChange('hover')}
              onMouseLeave={() => onCursorChange('default')}
              className="group relative inline-flex items-center gap-2 font-sans text-sm md:text-base tracking-widest text-[#F4F3EF] py-1"
            >
              <MessageCircle className="w-4 h-4 text-[#C86A53]" />
              <span>WhatsApp Direct</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C86A53] transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          </div>
        </div>

        {/* 2. Massive "LET'S TALK." Text */}
        <div className="py-12 md:py-20 text-center relative">
          <motion.button
            onClick={onOpenContact}
            onMouseEnter={() => onCursorChange('read', 'CONTACT')}
            onMouseLeave={() => onCursorChange('default')}
            className="w-full text-center group cursor-pointer focus:outline-none"
          >
            <h2 className="font-serif text-[clamp(3.5rem,15vw,14rem)] leading-[0.88] font-black tracking-tighter text-[#F4F3EF] group-hover:text-[#C86A53] transition-colors duration-500 uppercase select-none">
              LET&apos;S TALK<span className="text-[#C86A53]">.</span>
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C86A53] group-hover:scale-150 transition-transform"></span>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#F4F3EF]/60 group-hover:text-[#F4F3EF] transition-colors">
                Click to open direct commission dispatch
              </span>
            </div>
          </motion.button>
        </div>

        {/* Bureaus & Local Clocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-t border-[#F4F3EF]/15 text-xs font-sans">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C86A53] font-bold mb-1">
              NEW YORK BUREAU
            </p>
            <p className="text-[#F4F3EF]/70">Madison Avenue &bull; Manhattan</p>
            <p className="text-[#F4F3EF]/40 mt-1">UTC -5 &bull; Eastern Time</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C86A53] font-bold mb-1">
              LONDON OFFICE
            </p>
            <p className="text-[#F4F3EF]/70">Fleet Street &bull; City of London</p>
            <p className="text-[#F4F3EF]/40 mt-1">UTC +0 &bull; GMT</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C86A53] font-bold mb-1">
              PARIS SALON
            </p>
            <p className="text-[#F4F3EF]/70">Rue Saint-Honor&eacute; &bull; 1er</p>
            <p className="text-[#F4F3EF]/40 mt-1">UTC +1 &bull; CET</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C86A53] font-bold mb-1">
              REPRESENTATION
            </p>
            <p className="text-[#F4F3EF]/70">Literary &amp; Speakers Guild</p>
            <p className="text-[#F4F3EF]/40 mt-1">Global Press Syndicate</p>
          </div>
        </div>

        {/* Colophon & Back to top */}
        <div className="pt-8 border-t border-[#F4F3EF]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-sans text-[#F4F3EF]/50 tracking-wider">
          <div className="flex items-center gap-6">
            <p>&copy; 2026 Bespoke Portfolios. All editorial rights reserved.</p>
            <span className="hidden sm:inline">&bull;</span>
            <p className="hidden sm:inline">Set in Playfair Display &amp; Inter</p>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => onCursorChange('hover')}
            onMouseLeave={() => onCursorChange('default')}
            className="group flex items-center gap-2 uppercase tracking-[0.2em] text-[#F4F3EF]/80 hover:text-[#C86A53] transition-colors"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-[#F4F3EF]/20 flex items-center justify-center group-hover:border-[#C86A53] group-hover:bg-[#C86A53] group-hover:text-[#F4F3EF] transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
