import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeroSectionProps {
  onCursorChange: (type: 'default' | 'hover' | 'read' | 'drag', text?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCursorChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const overlayBadgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current || !textRef.current || !bgImageRef.current) return;

      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobile ? '+=120%' : '+=160%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Fade out subtitle and scroll prompt early
      tl.to(
        [subtitleRef.current, scrollIndicatorRef.current],
        {
          opacity: 0,
          y: -25,
          duration: 0.35,
          ease: 'power1.out',
        },
        0
      )
        // 2. Scale the massive text infinitely until it blows out of the viewport
        .to(
          textRef.current,
          {
            scale: isMobile ? 22 : 32,
            opacity: 0,
            transformOrigin: '50% 50%',
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        )
        // 3. Simultaneously reveal the full-screen portrait behind it
        .fromTo(
          bgImageRef.current,
          {
            opacity: 0.1,
            scale: 1.12,
            filter: 'brightness(0.65) contrast(1.1)',
          },
          {
            opacity: 1,
            scale: 1.0,
            filter: 'brightness(1) contrast(1)',
            duration: 1,
            ease: 'power2.out',
          },
          0.08
        )
        // 4. Reveal subtle editorial badge over the revealed image
        .fromTo(
          overlayBadgeRef.current,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          0.65
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#F4F3EF] flex items-center justify-center select-none pt-20 md:pt-24"
    >
      {/* Background Revealed Image Layer */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-10 will-change-transform z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2400&auto=format&fit=crop"
          alt="Elena Rostova — Editorial Portrait"
          className="w-full h-full object-cover object-center filter grayscale contrast-[1.08] brightness-[0.95]"
        />
        {/* Soft editorial gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/85 via-transparent to-[#1C1C1C]/25" />
      </div>

      {/* Editorial Frame Borders - Placed carefully so it NEVER overlaps with top fixed navigation */}
      <div className="absolute inset-x-6 md:inset-x-12 bottom-6 md:bottom-10 pointer-events-none z-20 flex justify-between items-center text-[10px] uppercase tracking-[0.22em] text-[#1C1C1C]/60 font-sans border-t border-[#1C1C1C]/10 pt-3">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C86A53]"></span>
          PORTFOLIO &bull; ESSAYS &bull; DIRECTION
        </span>
        <span className="hidden sm:inline">40.7128&deg; N, 74.0060&deg; W &bull; NEW YORK / LONDON</span>
      </div>

      {/* Center Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pb-12">
        {/* Massive Text (Scales smoothly on scroll) */}
        <h1
          ref={textRef}
          className="font-serif text-[clamp(2.5rem,7.8vw,8.5rem)] leading-[0.92] font-black tracking-tighter text-[#1C1C1C] uppercase will-change-transform max-w-5xl mx-auto"
          style={{ willChange: 'transform, opacity' }}
        >
          SHAPING THE <span className="italic font-normal font-serif text-[#C86A53]">NARRATIVE.</span>
        </h1>

        {/* Subtitle below */}
        <div
          ref={subtitleRef}
          className="mt-6 md:mt-8 flex flex-col items-center gap-3 will-change-transform max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1C1C1C]/5 border border-[#1C1C1C]/10 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86A53]"></span>
            <p className="font-sans text-[11px] md:text-xs font-semibold tracking-[0.2em] text-[#1C1C1C] uppercase">
              Elena Rostova &bull; Senior Editor &amp; Media Strategist
            </p>
          </div>
          <p className="font-serif italic text-sm md:text-base text-[#1C1C1C]/75 leading-relaxed px-4">
            Directing long-form investigative prose, cultural commentary, and editorial policy for global publications.
          </p>
        </div>

        {/* Revealed Image Caption Badge (Appears when zoomed in) */}
        <div
          ref={overlayBadgeRef}
          className="absolute bottom-20 md:bottom-24 z-20 opacity-0 pointer-events-auto max-w-md w-full px-4"
        >
          <div className="bg-[#1C1C1C]/90 backdrop-blur-md text-[#F4F3EF] p-5 md:p-6 rounded-2xl border border-[#F4F3EF]/20 shadow-2xl text-left">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#C86A53] mb-2 font-sans font-semibold">
              <span>Portrait Monograph</span>
              <span>Autumn 2026</span>
            </div>
            <p className="font-serif text-base md:text-lg text-[#F4F3EF] leading-snug">
              &ldquo;The journalist is not a mirror, but an architect of historical clarity.&rdquo;
            </p>
            <p className="font-sans text-[11px] text-[#F4F3EF]/60 mt-2 uppercase tracking-wider">
              Elena Rostova &bull; London Bureau Archives
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-16 md:bottom-18 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#1C1C1C]/50">
          Scroll to explore
        </span>
        <div className="w-4 h-7 rounded-full border border-[#1C1C1C]/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#C86A53] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
