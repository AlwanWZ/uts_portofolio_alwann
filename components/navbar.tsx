'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NavbarProps {
  sections: string[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  isDarkMode: boolean;
}

export default function Navbar({ sections, activeSection, setActiveSection, isDarkMode }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 p-4 z-50 flex justify-center space-x-6 transition-all duration-300 ${
        isScrolled ? 'bg-gray-800/80 backdrop-blur-md shadow-md' : 'bg-gray-800'
      }`}
      animate={{ scale: isScrolled ? 0.95 : 1, opacity: isScrolled ? 0.9 : 1 }}
    >
      {sections.map((section) => (
        <motion.button
          key={section}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeSection === section ? 'bg-blue-500 scale-105' : 'hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleScrollToSection(section)}
        >
          {section}
        </motion.button>
      ))}
    </motion.nav>
  );
}