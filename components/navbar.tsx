'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NavbarProps {
  sections: string[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ sections, activeSection, setActiveSection, isDarkMode, toggleDarkMode }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);


  const handleScrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId); 
    }
  };


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) observer.observe(sectionElement);
    });

    return () => {
      sections.forEach((section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) observer.unobserve(sectionElement);
      });
    };
  }, [sections, setActiveSection]);

  return (
    <div className="fixed top-3 sm:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.nav
        className={`flex items-center gap-0.5 sm:gap-2 p-1 sm:p-1.5 rounded-full pointer-events-auto transition-all duration-300 max-w-full overflow-x-auto scrollbar-none ${
          isScrolled 
            ? isDarkMode
              ? 'bg-gray-950/40 backdrop-blur-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-gray-800/80' 
              : 'bg-white/60 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200/80'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <style>{`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        {sections.map((section) => {
          const isActive = activeSection === section;
          return (
            <button
              key={section}
              onClick={() => handleScrollToSection(section)}
              className={`relative px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                isActive 
                  ? isDarkMode ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold' 
                  : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="relative z-10 transition-transform duration-200 block hover:scale-105 active:scale-95">
                {section}
              </span>
              
              {/* Morphing Neon Underline Indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-line"
                  className={`absolute bottom-1 left-3.5 right-3.5 sm:bottom-1.5 sm:left-5 sm:right-5 h-[3px] bg-gradient-to-r ${
                    isDarkMode 
                      ? 'from-blue-400 to-indigo-500 shadow-[0_0_10px_rgba(96,165,250,0.8),_0_0_20px_rgba(96,165,250,0.4)]' 
                      : 'from-blue-500 to-indigo-600'
                  } rounded-full`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
        
        {/* Integrated Light Mode Button */}
        <div className={`h-4 w-px mx-1 flex-shrink-0 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
        } ${isScrolled ? 'block' : 'hidden sm:block'}`} />
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0 ${
            isDarkMode 
              ? 'text-yellow-400 hover:text-yellow-300' 
              : 'text-indigo-600 hover:text-indigo-500'
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </motion.nav>
    </div>
  );
}
