'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Footer from '../components/footer';

// Lazy load below-the-fold heavy components to drastically reduce initial JS bundle size
const About = dynamic(() => import('../components/about'), {
  loading: () => <div className="min-h-[400px]" />,
});
const Skill = dynamic(() => import('../components/skill'), {
  loading: () => <div className="min-h-[400px]" />,
});
const Portfolio = dynamic(() => import('../components/portofolio'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center text-sm opacity-50">Memuat Portfolio...</div>,
});
const Kontak = dynamic(() => import('../components/kontak'), {
  loading: () => <div className="min-h-[400px]" />,
});
const StarRating = dynamic(() => import('../components/rating'), {
  loading: () => <div className="min-h-[250px]" />,
});
const Gemini = dynamic(() => import('../components/gemini'), {
  ssr: false,
});
const GeminiButton = dynamic(() => import('../components/gemini').then(mod => mod.GeminiButton), {
  ssr: false,
});

const sections = ['Beranda', 'Tentang', 'Skills', 'Portfolio', 'Kontak'];

function LazySection({
  children,
  id,
  className,
  minHeight = '650px',
  forceMount = false,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
  minHeight?: string;
  forceMount?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(forceMount);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isVisible || forceMount) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, forceMount]);

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={!isVisible && !forceMount ? { minHeight } : undefined}
    >
      {isVisible || forceMount ? children : null}
    </section>
  );
}

export default function Page() {
  const [activeSection, setActiveSection] = useState<string>('Beranda');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);
  const [mountedAll, setMountedAll] = useState(false);

  const handleSectionClick = (section: string) => {
    setMountedAll(true);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(section); 
      }
    }, 10);
  };

  const toggleGemini = () => {
    setIsGeminiOpen(!isGeminiOpen);
  };

  return (
    <>
      <div
        className={`min-h-screen ${
          isDarkMode ? 'bg-gray-950 text-white' : 'bg-slate-50 text-gray-900'
        } relative overflow-hidden transition-colors duration-300`}
      >
        {/* Zero-Cost Background Glowing Orbs (CSS Radial Gradients without GPU Blur-3xl lag) */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className={`absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full pointer-events-none transition-colors duration-500 ${
            isDarkMode 
              ? 'bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_70%)]' 
              : 'bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_70%)]'
          }`} />
          <div className={`absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none transition-colors duration-500 ${
            isDarkMode 
              ? 'bg-[radial-gradient(circle,rgba(79,70,229,0.13)_0%,transparent_70%)]' 
              : 'bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)]'
          }`} />
          <div className={`absolute -bottom-32 right-12 w-[450px] h-[450px] rounded-full pointer-events-none transition-colors duration-500 ${
            isDarkMode 
              ? 'bg-[radial-gradient(circle,rgba(147,51,234,0.1)_0%,transparent_70%)]' 
              : 'bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)]'
          }`} />
          {/* Subtle Dot Pattern Overlay */}
          <div className={`absolute inset-0 opacity-25 pointer-events-none ${
            isDarkMode 
              ? 'bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]' 
              : 'bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:24px_24px]'
          }`} />
        </div>
        {/* Navbar */}
        <Navbar
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Immediate Above-the-fold Section */}
        <section
          id="Beranda"
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-20"
        >
          <Hero isDarkMode={isDarkMode} handleSectionClick={handleSectionClick} />
        </section>

        {/* Below-the-fold Lazy Mounted Sections */}
        <LazySection
          id="Tentang"
          forceMount={mountedAll}
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-20 pt-20 sm:pt-28"
        >
          <About isDarkMode={isDarkMode} />
        </LazySection>

        <LazySection
          id="Skills"
          forceMount={mountedAll}
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-20 pt-20 sm:pt-28"
        >
          <Skill isDarkMode={isDarkMode} />
        </LazySection>

        <LazySection
          id="Portfolio"
          forceMount={mountedAll}
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-20 pt-20 sm:pt-28"
        >
          <Portfolio isDarkMode={isDarkMode} />
        </LazySection>

        <LazySection
          id="Kontak"
          forceMount={mountedAll}
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-20 pt-20 sm:pt-28"
        >
          <Kontak isDarkMode={isDarkMode} />
        </LazySection>

        {/* Rating Section */}
        <LazySection
          id="rating"
          forceMount={mountedAll}
          minHeight="350px"
          className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-20 flex flex-col items-start justify-center"
        >
          <h2 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Rating System
          </h2>
          <div className="w-20 h-1.5 bg-blue-500 rounded mb-8" />
          <StarRating productName="Portofolio Alwan" isDarkMode={isDarkMode} />
        </LazySection>

        {/* Footer */}
        <footer
          className={`w-full py-8 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          } border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <Footer isDarkMode={isDarkMode} />
        </footer>
      </div>

      {/* Gemini Button */}
      <GeminiButton toggleGemini={toggleGemini} isOpen={isGeminiOpen} />

      {/* Gemini Modal */}
      <Gemini isOpen={isGeminiOpen} toggleGemini={toggleGemini} />
    </>
  );
}
