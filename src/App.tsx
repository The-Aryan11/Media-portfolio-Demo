/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { StickyNarrative } from './components/StickyNarrative';
import { HorizontalScroll, PUBLICATIONS_DATA } from './components/HorizontalScroll';
import { MasonryPressGrid, PRESS_ITEMS } from './components/MasonryPressGrid';
import { FooterSection } from './components/FooterSection';
import { ArticleModal } from './components/ArticleModal';
import { PressDetailModal } from './components/PressDetailModal';
import { ContactModal } from './components/ContactModal';
import { Publication, PressItem } from './types/portfolio';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'read' | 'drag'>('default');
  const [cursorText, setCursorText] = useState('READ');
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [selectedPressItem, setSelectedPressItem] = useState<PressItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  const isAnyModalOpen = Boolean(selectedPublication || selectedPressItem || isContactOpen);

  // Initialize ultra-smooth Lenis scrolling and sync with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const handleTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(handleTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // When a modal opens, pause Lenis and lock body scroll so only the modal scrolls effortlessly
  useEffect(() => {
    if (isAnyModalOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
      setCursorVariant('default');
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isAnyModalOpen]);

  const handleCursorChange = (type: 'default' | 'hover' | 'read' | 'drag', text: string = 'READ') => {
    setCursorVariant(type);
    setCursorText(text);
  };

  const handleOpenManifesto = () => {
    setCursorVariant('default');
    setSelectedPublication(PUBLICATIONS_DATA[0]);
  };

  const handleSelectPublication = (pub: Publication) => {
    setCursorVariant('default');
    setSelectedPublication(pub);
  };

  const handleSelectPress = (item: PressItem) => {
    setCursorVariant('default');
    setSelectedPressItem(item);
  };

  const handleOpenContact = () => {
    setCursorVariant('default');
    setIsContactOpen(true);
  };

  return (
    <div
      className={`relative min-h-screen bg-[#F4F3EF] text-[#1C1C1C] selection:bg-[#C86A53] selection:text-[#F4F3EF] has-custom-cursor ${
        isAnyModalOpen ? 'modal-active' : ''
      }`}
    >
      {/* Global Editorial Navigation */}
      <Navigation
        onOpenContact={handleOpenContact}
        onCursorChange={handleCursorChange}
      />

      <main className="relative w-full">
        {/* Section 1: The Hero (Scaling Text Parallax Mask) */}
        <HeroSection onCursorChange={handleCursorChange} />

        {/* Section 2: The Sticky Narrative (Biography Split-Screen) */}
        <StickyNarrative
          onCursorChange={handleCursorChange}
          onOpenArticle={handleOpenManifesto}
        />

        {/* Section 3: The Horizontal Scroll (Featured Publications) */}
        <HorizontalScroll
          onCursorChange={handleCursorChange}
          onSelectPublication={handleSelectPublication}
        />

        {/* Section 4: The Masonry Press Grid (Uniform Balanced Dimensions) */}
        <MasonryPressGrid
          onCursorChange={handleCursorChange}
          onSelectPress={handleSelectPress}
        />

        {/* Section 5: The Footer (Infinite Marquee & CTA) */}
        <FooterSection
          onCursorChange={handleCursorChange}
          onOpenContact={handleOpenContact}
        />
      </main>

      {/* Interactive Modals */}
      <ArticleModal
        publication={selectedPublication}
        onClose={() => {
          setSelectedPublication(null);
          handleCursorChange('default');
        }}
        onCursorChange={handleCursorChange}
      />

      <PressDetailModal
        item={selectedPressItem}
        onClose={() => {
          setSelectedPressItem(null);
          handleCursorChange('default');
        }}
        onCursorChange={handleCursorChange}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => {
          setIsContactOpen(false);
          handleCursorChange('default');
        }}
        onCursorChange={handleCursorChange}
      />

      {/* Custom Spring Cursor rendered at top layer with z-[99999] */}
      <CustomCursor
        cursorVariant={cursorVariant}
        cursorText={cursorText}
        isModalOpen={isAnyModalOpen}
      />
    </div>
  );
}
