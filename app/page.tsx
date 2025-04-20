'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import About from '../components/about';
import Portfolio from '../components/portofolio';
import Skill from '../components/skill';
import Kontak from '../components/kontak';
import StarRating from '../components/rating';
import Footer from '../components/footer';
import Gemini, { GeminiButton } from '../components/gemini';

const sections = ['Beranda', 'Tentang', 'Skills', 'Portfolio', 'Kontak'];

export default function Page() {
  const [activeSection, setActiveSection] = useState<string>('Beranda');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isGeminiOpen, setIsGeminiOpen] = useState(false);

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleGemini = () => {
    setIsGeminiOpen(!isGeminiOpen);
  };

  return (
    <>
      <motion.div
        className={`min-h-screen ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900'
            : 'bg-gradient-to-br from-white via-gray-50 to-blue-50'
        } text-white`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Navbar */}
        <Navbar
          sections={sections}
          activeSection={activeSection}
          setActiveSection={handleSectionClick}
          isDarkMode={isDarkMode}
        />

        {/* Theme Toggle Button */}
        <motion.button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg backdrop-blur-md ${
            isDarkMode ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          } transition-all duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </motion.button>

        {/* Sections */}
        {sections.map((section) => (
          <section
            key={section}
            id={section}
            className={`min-h-screen flex flex-col items-center justify-center px-6 py-20 ${
              section !== 'Beranda' ? 'pt-28' : ''
            }`}
          >
            {section === 'Beranda' && <Hero isDarkMode={isDarkMode} handleSectionClick={handleSectionClick} />}
            {section === 'Tentang' && <About isDarkMode={isDarkMode} />}
            {section === 'Skills' && <Skill isDarkMode={isDarkMode} />}
            {section === 'Portfolio' && <Portfolio isDarkMode={isDarkMode} />}
            {section === 'Kontak' && <Kontak isDarkMode={isDarkMode} />}
          </section>
        ))}

        {/* Rating Section */}
        <section id="rating" className="py-20">
          <h2 className="text-3xl font-bold mb-6 text-center">Rating System</h2>
          <StarRating productName="Awesome Product" />
        </section>

        {/* Footer */}
        <motion.footer
          className={`w-full py-8 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          } border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        >
          <Footer isDarkMode={isDarkMode} />
        </motion.footer>
      </motion.div>

      {/* Gemini Button */}
      <GeminiButton toggleGemini={toggleGemini} isOpen={isGeminiOpen} />

      {/* Gemini Modal */}
      <Gemini isOpen={isGeminiOpen} toggleGemini={toggleGemini} />
    </>
  );
}