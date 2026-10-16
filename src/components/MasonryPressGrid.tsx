import React from 'react';
import { motion } from 'motion/react';
import { Tv, Mic, Radio, Award, Play, ExternalLink } from 'lucide-react';
import { PressItem } from '../types/portfolio';

export const PRESS_ITEMS: PressItem[] = [
  {
    id: 'bbc-hardtalk',
    title: 'Truth, Power, and the Editorial Mandate in Grey Zones',
    outlet: 'BBC World News / HARDtalk',
    format: 'TV Interview',
    date: 'OCTOBER 2025',
    location: 'Broadcasting House, London',
    duration: '28 MINS',
    imageUrl:
      'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1200&auto=format&fit=crop',
    summary:
      'An unsparing dialogue on press freedom, state pressure, and the courage required to publish when state institutions demand editorial silence.',
  },
  {
    id: 'nyt-daily-audio',
    title: 'The Algorithmic Consolidation of Public Discourse',
    outlet: 'The Daily & NYT Audio',
    format: 'Podcast',
    date: 'SEPTEMBER 2025',
    location: 'New York City',
    duration: '42 MINS',
    imageUrl:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop',
    summary:
      'Elena Rostova breaks down how syndicated news distribution became financialized, and what independent editors are doing to resist.',
  },
  {
    id: 'bloomberg-markets',
    title: 'Narrative Sovereignty: Financializing Attention',
    outlet: 'Bloomberg Surveillance',
    format: 'TV Interview',
    date: 'JULY 2025',
    location: 'New York Bureau',
    duration: '18 MINS',
    imageUrl:
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200&auto=format&fit=crop',
    summary:
      'Analyzing market movements through the lens of strategic communication, geopolitical leak cycles, and boardroom narratives.',
  },
  {
    id: 'oxford-union',
    title: 'Freedom of Expression in the Post-Print Century',
    outlet: 'The Oxford Union',
    format: 'Keynote',
    date: 'MAY 2025',
    location: 'Oxford, United Kingdom',
    duration: '55 MINS',
    imageUrl:
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200&auto=format&fit=crop',
    summary:
      'A distinguished address examining historical censorship precedents and modern algorithmic content throttles in democratic societies.',
  },
  {
    id: 'monocle-radio',
    title: 'The Art of the Long-Form Profile in Fast-Paced News',
    outlet: 'Monocle 24 Radio',
    format: 'Podcast',
    date: 'MARCH 2025',
    location: 'Midori House, London',
    duration: '35 MINS',
    imageUrl:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
    summary:
      'Discussing character study methodologies, interviewing elusive power figures, and maintaining prose elegance under tight deadlines.',
  },
  {
    id: 'france24-roundtable',
    title: 'Transatlantic Investigative Coalitions & Press Safety',
    outlet: 'France 24 International',
    format: 'Roundtable',
    date: 'NOVEMBER 2024',
    location: 'Paris, France',
    duration: '45 MINS',
    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
    summary:
      'Convening European and American editors to construct secure cross-border whistleblower conduits and joint release agreements.',
  },
];

interface MasonryPressGridProps {
  onCursorChange: (type: 'default' | 'hover' | 'read' | 'drag', text?: string) => void;
  onSelectPress: (item: PressItem) => void;
}

export const MasonryPressGrid: React.FC<MasonryPressGridProps> = ({
  onCursorChange,
  onSelectPress,
}) => {
  const getFormatIcon = (format: PressItem['format']) => {
    switch (format) {
      case 'TV Interview':
        return <Tv className="w-3.5 h-3.5 text-[#C86A53]" />;
      case 'Podcast':
        return <Mic className="w-3.5 h-3.5 text-[#C86A53]" />;
      case 'Keynote':
        return <Award className="w-3.5 h-3.5 text-[#C86A53]" />;
      case 'Roundtable':
        return <Radio className="w-3.5 h-3.5 text-[#C86A53]" />;
    }
  };

  return (
    <section id="press" className="relative w-full py-20 md:py-32 bg-[#F4F3EF] border-b border-[#1C1C1C]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-[#1C1C1C]/15 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#C86A53] font-bold">
                03 &bull; THE BROADCAST ARCHIVE
              </span>
              <div className="h-[1px] w-12 bg-[#C86A53]/50" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#1C1C1C]">
              Broadcast &amp; Keynotes
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-1">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C86A53] font-semibold">
              06 Curated Recordings
            </span>
            <p className="font-sans text-xs md:text-sm text-[#1C1C1C]/70 max-w-md leading-relaxed">
              Interviews, television debates, and institutional addresses exploring the ethical, economic, and political mechanics of global media.
            </p>
          </div>
        </div>

        {/* Uniform Grid - ALL cards have identical dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {PRESS_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: (index % 3) * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              onClick={() => onSelectPress(item)}
              onMouseEnter={() => onCursorChange('read', item.format === 'Podcast' ? 'LISTEN' : 'WATCH')}
              onMouseLeave={() => onCursorChange('default')}
              className="group relative bg-[#F4F3EF] rounded-2xl overflow-hidden border border-[#1C1C1C]/15 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between h-[510px] md:h-[530px]"
            >
              {/* Card Image - Strict Equal Height across ALL cards */}
              <div className="relative w-full h-56 sm:h-60 overflow-hidden bg-[#1C1C1C]/10 flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Overlay Play Icon badge */}
                <div className="absolute inset-0 bg-[#1C1C1C]/25 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#1C1C1C]/80 backdrop-blur-md text-[#F4F3EF] flex items-center justify-center border border-[#F4F3EF]/20 group-hover:scale-110 group-hover:bg-[#C86A53] transition-all duration-300 shadow-lg">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1C1C]/85 backdrop-blur-md text-[#F4F3EF] font-sans text-[10px] tracking-wider uppercase font-medium border border-[#F4F3EF]/15">
                    {getFormatIcon(item.format)}
                    <span>{item.format}</span>
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="font-sans text-[10px] tracking-widest text-[#F4F3EF] bg-[#1C1C1C]/75 backdrop-blur-md px-2.5 py-1 rounded-full">
                    {item.duration}
                  </span>
                </div>
              </div>

              {/* Card Content - Structured with uniform heights */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#C86A53] font-sans font-semibold mb-2.5">
                    <span className="truncate pr-2">{item.outlet}</span>
                    <span className="text-[#1C1C1C]/50 flex-shrink-0">{item.date}</span>
                  </div>

                  {/* Title with fixed height */}
                  <h3 className="font-serif text-xl font-bold text-[#1C1C1C] leading-snug group-hover:text-[#C86A53] transition-colors mb-3 line-clamp-2 h-[3.25rem]">
                    {item.title}
                  </h3>

                  {/* Summary with fixed height */}
                  <p className="font-sans text-xs md:text-sm text-[#1C1C1C]/70 leading-relaxed line-clamp-3 h-[4rem]">
                    {item.summary}
                  </p>
                </div>

                {/* Card Footer - Uniform across all cards */}
                <div className="pt-4 border-t border-[#1C1C1C]/10 flex items-center justify-between text-[11px] font-sans uppercase tracking-wider text-[#1C1C1C]/60 mt-2">
                  <span className="truncate max-w-[160px]">{item.location}</span>
                  <span className="flex items-center gap-1 text-[#C86A53] font-medium group-hover:translate-x-1 transition-transform flex-shrink-0">
                    <span>Access Media</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
