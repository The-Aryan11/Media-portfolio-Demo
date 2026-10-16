import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import { Publication } from '../types/portfolio';

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: 'ft-discourse',
    publication: 'THE FINANCIAL TIMES',
    category: 'COVER INVESTIGATION',
    date: 'NOVEMBER 2025',
    readTime: '18 MIN READ',
    title: 'The Architecture of Modern Discourse: How Capital Rewrote Truth',
    excerpt:
      'An exhaustive four-part transatlantic investigation examining how venture consolidation, syndicate networks, and algorithmic distribution dismantled century-old norms of investigative independence.',
    fullText: `In the vaulted corridors of London and the glass towers of Palo Alto, an invisible transformation has completed its cycle. Over the past decade, the economics of public discourse shifted from institutional stewardship to attention-capture arbitrage.\n\nOur investigation traces three hundred discrete transaction flows, interviewing forty-two former bureau chiefs and sovereign communication advisors. The conclusion is inescapable: narrative sovereignty is no longer governed by public interest, but by capital efficiency.\n\nTo rebuild civic trust requires more than fact-checking initiatives—it demands an editorial architecture built on structural independence, verified origin lines, and long-form investigative courage.`,
    imageUrl:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    accentColor: '#C86A53',
  },
  {
    id: 'wsj-davos',
    publication: 'THE WALL STREET JOURNAL',
    category: 'GLOBAL SPECIAL REPORT',
    date: 'JANUARY 2025',
    readTime: '14 MIN READ',
    title: 'Inside the Sovereign Narratives of Davos and Beyond',
    excerpt:
      'Decoding the calibrated lexicon of multilateral summits, where sanitized communique language conceals the high-stakes realpolitik of economic decoupling.',
    fullText: `Behind the soundproof conference suites overlooking the Swiss Alps, language undergoes a rigorous purification process. Every communique, bilateral briefing, and joint declaration is engineered to project consensus while masking fundamental divergence.\n\nBy dissecting seven years of private draft revisions alongside geopolitical policy shifts, this dispatch illuminates how corporate statecraft produces an illusion of certainty in an increasingly fractured world order.`,
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    accentColor: '#1C1C1C',
  },
  {
    id: 'atlantic-neutrality',
    publication: 'THE ATLANTIC',
    category: 'ESSAY & DISPATCH',
    date: 'AUGUST 2025',
    readTime: '22 MIN READ',
    title: 'The Vanishing Neutrality of Global Media in Contested Zones',
    excerpt:
      'On modern conflict corridors where informational neutrality is weaponized, state actors monitor press metadata, and objectivity is systematically prosecuted.',
    fullText: `Neutrality was once regarded as the gold standard of field reporting. Yet across today's grey-zone conflicts, algorithmic curation and state surveillance have rendered passive observation impossible.\n\nThis essay re-examines the moral theology of war reporting. Drawing on field dispatches and interviews with frontline correspondents, Rostova argues that authentic objectivity is not sterile detachment, but unwavering fidelity to human truth under pressure.`,
    imageUrl:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop',
    accentColor: '#A94E38',
  },
  {
    id: 'vanityfair-power',
    publication: 'VANITY FAIR',
    category: 'CULTURAL CRITIQUE',
    date: 'MAY 2025',
    readTime: '16 MIN READ',
    title: 'Power, Prose, and the New Cultural Oligarchy',
    excerpt:
      'A razor-sharp cultural retrospective exploring the private literary salons, patronage networks, and media conglomerates engineering contemporary consensus.',
    fullText: `From Manhattan penthouses to Mayfair private clubs, the cultural establishment has quietly restructured its levers of influence. No longer reliant on traditional publishing gatekeepers, a new caste of patrons now orchestrates literary prestige and artistic endorsement.\n\nRostova delivers a biting, lyrical dissection of the tastes, rivalries, and editorial pacts that determine which authors are crowned and which inquiries are quietly sidelined.`,
    imageUrl:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2074&auto=format&fit=crop',
    accentColor: '#C86A53',
  },
];

interface HorizontalScrollProps {
  onCursorChange: (type: 'default' | 'hover' | 'read' | 'drag', text?: string) => void;
  onSelectPublication: (pub: Publication) => void;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  onCursorChange,
  onSelectPublication,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollDistance = () => {
        const extraPad = window.innerWidth < 768 ? 40 : 100;
        return track.scrollWidth - window.innerWidth + extraPad;
      };

      // Pinned Horizontal Translation for ALL screen sizes
      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Support direct horizontal touch swiping on mobile screens to drive the scroll position smoothly
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diffX = touchStartXRef.current - currentX;
    if (Math.abs(diffX) > 4) {
      window.scrollBy({ top: diffX * 1.35, behavior: 'auto' });
      touchStartXRef.current = currentX;
    }
  };

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#F4F3EF] border-b border-[#1C1C1C]/10 flex flex-col justify-between py-6 sm:py-8 md:py-12"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-end justify-between gap-4 flex-shrink-0 z-10">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#C86A53] font-bold">
              02 &bull; FEATURED PUBLICATIONS
            </span>
            <div className="h-[1px] w-12 bg-[#C86A53]/50" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-[#1C1C1C]">
            The Published Canon
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-xs font-sans uppercase tracking-[0.18em] text-[#1C1C1C]/60 flex-shrink-0">
          <span className="hidden sm:inline">Scroll horizontally</span>
          <span className="sm:hidden text-[10px]">Swipe or Scroll</span>
          <div className="w-20 sm:w-28 h-[2px] bg-[#1C1C1C]/15 relative overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 bottom-0 bg-[#C86A53] w-0 transition-all duration-75"
            />
          </div>
        </div>
      </div>

      {/* Horizontal Track Container - Vertically centered with ZERO blank space */}
      <div className="w-full pl-6 md:pl-16 pr-10 overflow-visible my-auto py-2">
        <div
          ref={trackRef}
          className="flex items-center gap-5 sm:gap-8 md:gap-10 w-max will-change-transform py-2"
        >
          {PUBLICATIONS_DATA.map((pub, idx) => (
            <div
              key={pub.id}
              onClick={() => onSelectPublication(pub)}
              onMouseEnter={() => onCursorChange('read', 'READ')}
              onMouseLeave={() => onCursorChange('default')}
              className="group relative w-[80vw] sm:w-[380px] md:w-[440px] h-[480px] sm:h-[510px] md:h-[540px] bg-[#F4F3EF] rounded-2xl overflow-hidden border border-[#1C1C1C]/15 shadow-xl transition-all duration-500 hover:shadow-2xl flex flex-col justify-between p-6 sm:p-7 md:p-8 cursor-pointer flex-shrink-0"
            >
              {/* Magazine Background Cover Image with Grayscale -> Full Color transition */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={pub.imageUrl}
                  alt={pub.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                {/* Luxury editorial vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/55 to-transparent opacity-90 transition-opacity group-hover:opacity-80" />
              </div>

              {/* Top Card Masthead */}
              <div className="relative z-10 flex items-center justify-between text-[#F4F3EF]">
                <div className="flex flex-col">
                  <span className="font-serif text-xs md:text-sm tracking-[0.2em] font-semibold text-[#C86A53]">
                    {pub.publication}
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#F4F3EF]/70">
                    {pub.category}
                  </span>
                </div>

                <span className="font-sans text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-[#1C1C1C]/70 backdrop-blur-md border border-[#F4F3EF]/20">
                  {pub.date}
                </span>
              </div>

              {/* Bottom Card Copy & Action */}
              <div className="relative z-10 text-[#F4F3EF]">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#F4F3EF]/60 font-sans mb-2.5">
                  <Clock className="w-3 h-3 text-[#C86A53]" />
                  <span>{pub.readTime}</span>
                </div>

                <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold leading-tight group-hover:text-[#F4F3EF] transition-colors mb-2.5 line-clamp-3">
                  {pub.title}
                </h3>

                <p className="font-sans text-xs md:text-sm text-[#F4F3EF]/80 line-clamp-3 leading-relaxed mb-4">
                  {pub.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3.5 border-t border-[#F4F3EF]/20">
                  <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#C86A53] group-hover:translate-x-1 transition-transform flex items-center gap-2">
                    <span>Examine Essay</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-serif italic text-xs text-[#F4F3EF]/50">
                    Issue 0{idx + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Ending Editorial Card / Manifesto Prompt - EXACT SAME EQUAL DIMENSIONS */}
          <div
            onClick={() => onSelectPublication(PUBLICATIONS_DATA[0])}
            onMouseEnter={() => onCursorChange('read', 'ALL')}
            onMouseLeave={() => onCursorChange('default')}
            className="w-[80vw] sm:w-[380px] md:w-[440px] h-[480px] sm:h-[510px] md:h-[540px] rounded-2xl border-2 border-dashed border-[#1C1C1C]/25 bg-[#1C1C1C]/5 p-6 sm:p-7 md:p-8 flex flex-col justify-between cursor-pointer hover:bg-[#1C1C1C]/10 transition-colors flex-shrink-0"
          >
            <div className="flex justify-between items-center text-xs font-sans uppercase tracking-widest text-[#1C1C1C]/60">
              <span>Catalogue</span>
              <span>40+ Articles</span>
            </div>
            <div className="space-y-4">
              <BookOpen className="w-8 h-8 text-[#C86A53]" />
              <h4 className="font-serif text-2xl md:text-3xl font-bold text-[#1C1C1C]">
                Syndicated Across 14 Global Outlets
              </h4>
              <p className="font-sans text-xs md:text-sm text-[#1C1C1C]/70 leading-relaxed">
                Including Foreign Affairs, The New Yorker, Le Monde diplomatique, and Die Zeit.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1C1C1C]/15">
              <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#C86A53] flex items-center gap-2">
                <span>View Full Bibliography</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Quote */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-[#1C1C1C]/50 flex-shrink-0 z-10">
        <span>&copy; All rights reserved by respective mastheads</span>
        <span className="hidden sm:inline">Archived in New York &amp; London</span>
      </div>
    </section>
  );
};
