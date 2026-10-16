import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

interface StickyNarrativeProps {
  onCursorChange: (type: 'default' | 'hover' | 'read' | 'drag', text?: string) => void;
  onOpenArticle: (id: string) => void;
}

export const StickyNarrative: React.FC<StickyNarrativeProps> = ({
  onCursorChange,
  onOpenArticle,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const line4Ref = useRef<HTMLParagraphElement>(null);

  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (
        !sectionRef.current ||
        !line1Ref.current ||
        !line2Ref.current ||
        !line3Ref.current ||
        !line4Ref.current ||
        !img1Ref.current ||
        !img2Ref.current ||
        !img3Ref.current
      ) {
        return;
      }

      const isMobile = window.innerWidth < 768;

      // Initial state
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current], {
        opacity: 0.2,
        y: 6,
      });
      gsap.set(img1Ref.current, { opacity: 1, scale: 1 });
      gsap.set(img2Ref.current, { opacity: 0, scale: 1.04 });
      gsap.set(img3Ref.current, { opacity: 0, scale: 1.04 });

      // Run GSAP timeline on ALL devices (mobile and desktop)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? '+=150%' : '+=180%',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) {
              setActiveStep(1);
            } else if (p < 0.7) {
              setActiveStep(2);
            } else {
              setActiveStep(3);
            }
          },
        },
      });

      // Step 1: Line 1 lights up
      tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(line1Ref.current, { duration: 0.35 });

      // Step 2: Line 2 lights up + Image 2 crossfades in
      tl.to(line2Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(img1Ref.current, { opacity: 0, scale: 0.98, duration: 1 }, '<')
        .to(img2Ref.current, { opacity: 1, scale: 1, duration: 1 }, '<')
        .to(line2Ref.current, { duration: 0.35 });

      // Step 3: Line 3 lights up
      tl.to(line3Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(line3Ref.current, { duration: 0.35 });

      // Step 4: Line 4 lights up + Image 3 crossfades in
      tl.to(line4Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(img2Ref.current, { opacity: 0, scale: 0.98, duration: 1 }, '<')
        .to(img3Ref.current, { opacity: 1, scale: 1, duration: 1 }, '<')
        .to(line4Ref.current, { duration: 0.35 });

      return () => {
        tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const imageCaptions = [
    {
      num: '01 / 03',
      caption: 'The Newsroom Gallery, London Bureau',
      detail: 'Curating investigative dispatches & long-form narratives.',
      img: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=2070&auto=format&fit=crop',
    },
    {
      num: '02 / 03',
      caption: 'Editorial Direction & Manuscript Review',
      detail: 'Iterating on structural rigor, ethical framing, and prose.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2400&auto=format&fit=crop',
    },
    {
      num: '03 / 03',
      caption: 'International Symposium & Public Address',
      detail: 'Speaking on narrative sovereignty at transatlantic summits.',
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <section
      id="narrative"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#F4F3EF] border-b border-[#1C1C1C]/10 flex items-center justify-center py-4 md:py-8"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-14 py-4 md:py-8">
        {/* Left / Top: Editorial Typography Scrub */}
        <div className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-6 overflow-hidden flex-shrink-0">
          {/* Section Marker */}
          <div className="flex items-center gap-3 mb-2 md:mb-5">
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C86A53] font-bold">
              01 &bull; THE NARRATIVE MANDATE
            </span>
            <div className="h-[1px] w-12 bg-[#C86A53]/50" />
          </div>

          <h2 className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1C1C] leading-[1.15] mb-3 md:mb-6">
            Words are not simply recorded. <br />
            <span className="italic font-normal text-[#C86A53]">They construct reality.</span>
          </h2>

          {/* Line by line scrub text */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-lg lg:text-xl font-serif leading-relaxed text-[#1C1C1C]">
            <p ref={line1Ref} className="transition-colors duration-200">
              For fifteen years, I have navigated the contentious intersection of geopolitical inquiry, institutional power, and architectural prose.
            </p>

            <p ref={line2Ref} className="transition-colors duration-200">
              As Senior Editor across leading transatlantic periodicals, my focus centers on dismantling synthetic rhetoric to reveal structural reality.
            </p>

            <p ref={line3Ref} className="transition-colors duration-200">
              From front-page investigative expos&eacute;s to monograph-length cultural essays, each assignment is treated with museum-grade precision.
            </p>

            <p ref={line4Ref} className="transition-colors duration-200 text-[#1C1C1C]">
              Today, I guide editorial boards and intellectual institutions toward enduring relevance in an era of fleeting attention.
            </p>
          </div>

          {/* Signature & Details */}
          <div className="mt-3 md:mt-6 pt-3 md:pt-5 border-t border-[#1C1C1C]/15 flex items-center justify-between">
            <div>
              <p className="font-serif italic text-sm md:text-base text-[#1C1C1C]">Elena Rostova</p>
              <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#1C1C1C]/50">
                New York &bull; London &bull; Paris
              </p>
            </div>

            <button
              onClick={() => onOpenArticle('manifesto')}
              onMouseEnter={() => onCursorChange('hover')}
              onMouseLeave={() => onCursorChange('default')}
              className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-[0.18em] font-semibold text-[#C86A53] hover:text-[#1C1C1C] transition-colors group"
            >
              <span>Read Charter</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right / Bottom: Stack of 3 Editorial Images with Crossfade */}
        <div className="w-full md:w-1/2 h-[220px] sm:h-[300px] md:h-[70vh] relative flex flex-col justify-center flex-shrink-0">
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden bg-[#1C1C1C]/5 shadow-2xl border border-[#1C1C1C]/15"
            onMouseEnter={() => onCursorChange('read', 'VIEW')}
            onMouseLeave={() => onCursorChange('default')}
          >
            {/* Image 1 */}
            <div ref={img1Ref} className="absolute inset-0 w-full h-full will-change-transform">
              <img
                src={imageCaptions[0].img}
                alt="Editorial Table & Manuscripts"
                className="w-full h-full object-cover grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/85 via-transparent to-transparent" />
            </div>

            {/* Image 2 */}
            <div ref={img2Ref} className="absolute inset-0 w-full h-full will-change-transform">
              <img
                src={imageCaptions[1].img}
                alt="Elena Rostova in Editorial Studio"
                className="w-full h-full object-cover contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/85 via-transparent to-transparent" />
            </div>

            {/* Image 3 */}
            <div ref={img3Ref} className="absolute inset-0 w-full h-full will-change-transform">
              <img
                src={imageCaptions[2].img}
                alt="Auditorium Keynote Address"
                className="w-full h-full object-cover grayscale contrast-115"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/85 via-transparent to-transparent" />
            </div>

            {/* Floating Editorial Plate */}
            <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-[#1C1C1C]/80 backdrop-blur-md border border-[#F4F3EF]/20 text-[#F4F3EF] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86A53] animate-pulse"></span>
              <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase">
                {imageCaptions[activeStep - 1].num}
              </span>
            </div>

            {/* Bottom Caption Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 md:p-6 z-20 text-[#F4F3EF]">
              <p className="font-serif text-sm sm:text-base md:text-xl font-bold">
                {imageCaptions[activeStep - 1].caption}
              </p>
              <p className="font-sans text-[10px] sm:text-xs text-[#F4F3EF]/70 mt-0.5">
                {imageCaptions[activeStep - 1].detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
