'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SiGithub } from 'react-icons/si';

export default function Hero({ isDarkMode, handleSectionClick }: { isDarkMode: boolean; handleSectionClick: (section: string) => void }) {
  const badgePositions = [
    { name: 'React', pos: 'top-4 -left-4 sm:-left-8' },
    { name: 'HTML', pos: 'top-8 -right-4 sm:-right-8' },
    { name: 'PHP', pos: 'bottom-8 -left-4 sm:-left-8' },
    { name: 'UI/UX', pos: 'bottom-4 -right-4 sm:-right-8' },
  ];

  return (
    <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12">
      {/* Bagian Beranda */}
      <div className="flex-1 text-left w-full max-w-full overflow-hidden">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight sm:tracking-wide mb-2 sm:mb-4 flex flex-wrap gap-x-3 gap-y-1">
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Alwan</span>
          <span className="text-blue-500">Portfolio</span>
        </h1>
        <div>
          <p className={`text-base sm:text-xl mb-4 sm:mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
            Mahasiswa Sistem Informasi - Semester 7 (Tingkat Akhir)
          </p>
          <p className={`text-sm sm:text-lg max-w-xl mb-6 sm:mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
            Saya seorang pengembang web yang bersemangat dan fokus pada membuat aplikasi modern dengan UI/UX yang cantik dan fungsionalitas yang kuat.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <motion.button
            className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-colors duration-200 text-sm sm:text-base cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => handleSectionClick('Portfolio')}
          >
            Lihat Portfolio
          </motion.button>
          <motion.button
            className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg border ${
              isDarkMode
                ? 'border-gray-500 text-gray-300 hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            } font-medium transition-colors duration-200 text-sm sm:text-base cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => handleSectionClick('Kontak')}
          >
            Hubungi Saya
          </motion.button>
          <motion.a
            href="https://github.com/AlwanWZ"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 sm:p-3 rounded-lg border transition-colors duration-200 flex items-center justify-center cursor-pointer ${
              isDarkMode
                ? 'border-gray-700 bg-gray-900/60 text-gray-300 hover:text-white hover:border-blue-500'
                : 'border-gray-300 bg-white text-gray-700 hover:text-gray-950 hover:border-blue-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            aria-label="GitHub AlwanWZ"
            title="GitHub: https://github.com/AlwanWZ"
          >
            <SiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
        </div>
      </div>

      {/* Bagian Gambar */}
      <div className="flex-grow-0 flex-shrink-0 flex justify-center items-center relative">
        <motion.div
          className="w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl shadow-blue-500/20 z-10 animate-float-gentle"
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src="/profile.jpg"
            alt="Profile Picture"
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 160px, (max-width: 768px) 256px, 320px"
            className="rounded-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl z-0 pointer-events-none" />
        {/* Floating skill badges around profile with GPU-only transforms */}
        {badgePositions.map((badge, i) => (
          <div
            key={badge.name}
            className={`absolute hidden sm:block ${badge.pos} animate-badge-${i + 1} ${
              isDarkMode ? 'bg-gray-850/90 bg-gray-900 border-gray-700' : 'bg-white/90 border-gray-200'
            } border rounded-full py-1.5 px-3.5 shadow-lg text-xs font-semibold ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            } z-20 pointer-events-none`}
          >
            {badge.name}
          </div>
        ))}
      </div>
    </div>
  );
}