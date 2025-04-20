import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero({ isDarkMode, handleSectionClick }: { isDarkMode: boolean; handleSectionClick: (section: string) => void }) {
  return (
    <motion.div
      className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Bagian Beranda */}
      <motion.div
        className="flex-1 text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.span
          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
            isDarkMode ? 'bg-blue-600 bg-opacity-20 text-blue-300' : 'bg-blue-100 text-blue-800'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, delay: 0.5 }}
        >
          Halo, Saya
        </motion.span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide mb-4">
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Alwan</span>
          <span className="text-blue-500 ml-4">Portfolio</span>
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Mahasiswa Sistem Informasi A - Semester 4
          </p>
          <p className={`text-lg max-w-xl mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Saya seorang pengembang web yang bersemangat dan fokus pada membuat aplikasi modern dengan UI/UX yang cantik dan fungsionalitas yang kuat.
          </p>
        </motion.div>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button
            className={`px-6 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSectionClick('Portfolio')}
          >
            Lihat Portfolio
          </motion.button>
          <motion.button
            className={`px-6 py-3 rounded-lg border ${
              isDarkMode
                ? 'border-gray-500 text-gray-300 hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            } font-medium transition-all`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSectionClick('Kontak')}
          >
            Hubungi Saya
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bagian Gambar */}
      <motion.div
        className="flex-1 flex justify-center items-center relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-blue-500 shadow-xl shadow-blue-600/20 z-10"
          whileHover={{ scale: 1.05 }}
          animate={{
            y: [0, -10, 0],
            boxShadow: [
              '0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1)',
              '0 25px 50px -12px rgba(59, 130, 246, 0.4)',
              '0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1)',
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
        >
          <Image
            src="/profile.jpg"
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-3xl z-0"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
        />
        {/* Floating skill badges around profile */}
        {['React', 'HTML', 'PHP', 'UI/UX'].map((skill, i) => (
          <motion.div
            key={skill}
            className={`absolute ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-full py-2 px-4 shadow-lg text-sm font-medium ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            } z-20`}
            initial={{
              x: (i % 2 === 0 ? -120 : 120) * Math.sin(i * 0.5),
              y: (i % 2 === 0 ? -120 : 120) * Math.cos(i * 0.5),
              opacity: 0,
            }}
            animate={{
              x: [
                (i % 2 === 0 ? -120 : 120) * Math.sin(i * 0.5 + 1),
                (i % 2 === 0 ? -130 : 130) * Math.sin(i * 0.5),
              ],
              y: [
                (i % 2 === 0 ? -120 : 120) * Math.cos(i * 0.5 + 1),
                (i % 2 === 0 ? -130 : 130) * Math.cos(i * 0.5),
              ],
              opacity: 1,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 3 + i,
              delay: i * 0.3,
            }}
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}