import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavigationProps {
  onOpenContact: () => void;
  onCursorChange: (type: 'default' | 'hover' | 'read' | 'drag') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenContact,
  onCursorChange,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '01. Narrative', href: '#narrative' },
    { label: '02. Publications', href: '#publications' },
    { label: '03. Press & Media', href: '#press' },
    { label: '04. Colophon', href: '#footer' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F4F3EF]/90 backdrop-blur-md border-b border-[#1C1C1C]/10 py-3.5 shadow-xs'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left Metadata / Brand */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              onMouseEnter={() => onCursorChange('hover')}
              onMouseLeave={() => onCursorChange('default')}
              className="group flex flex-col"
            >
              <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#1C1C1C] transition-colors group-hover:text-[#C86A53]">
                ELENA ROSTOVA
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#1C1C1C]/60 font-medium">
                Senior Editor &bull; Media Strategist
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-2 pl-6 border-l border-[#1C1C1C]/15 text-[11px] font-sans tracking-widest text-[#1C1C1C]/60 uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C86A53] animate-pulse"></span>
              <span>Vol. XXIV &bull; Autumn Issue</span>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => onCursorChange('hover')}
                onMouseLeave={() => onCursorChange('default')}
                className="relative font-sans text-xs uppercase tracking-[0.18em] text-[#1C1C1C]/80 hover:text-[#1C1C1C] transition-colors py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C86A53] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenContact}
              onMouseEnter={() => onCursorChange('hover')}
              onMouseLeave={() => onCursorChange('default')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#F4F3EF] transition-all duration-300 text-xs font-sans uppercase tracking-[0.18em] font-medium group"
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1C1C1C] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#F4F3EF] pt-24 px-8 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="space-y-6 pt-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C86A53] font-semibold">
                Table of Contents
              </p>
              <div className="space-y-4">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-3xl text-[#1C1C1C] block hover:text-[#C86A53] transition-colors"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-[#1C1C1C]/10 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-4 rounded-full bg-[#1C1C1C] text-[#F4F3EF] font-sans text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2"
              >
                <span>Initiate Dialogue</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="font-sans text-xs text-center text-[#1C1C1C]/50">
                New York &bull; Paris &bull; London
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
