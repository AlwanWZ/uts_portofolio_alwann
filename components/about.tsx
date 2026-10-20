'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function About({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <motion.div
      className="w-full max-w-6xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Tentang Saya
      </motion.h2>
      <motion.div
        className={`w-20 h-1.5 bg-blue-500 rounded mb-8`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div
          className={`backdrop-blur-xl p-5 sm:p-8 rounded-2xl border shadow-xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-blue-500/20 ${
            isDarkMode 
              ? 'bg-gray-900/40 border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
              : 'bg-white/60 border-black/[0.05] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]'
          }`}
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <motion.p
            className={`text-sm sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-6`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nama saya Alwan, lahir di Lampung pada 11 Juni 2005. Saat ini, saya adalah mahasiswa tingkat akhir (semester 7) di Program Studi Sistem Informasi, Universitas Masoem.
          </motion.p>
          <motion.p
            className={`text-sm sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-6`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Saya memiliki passion yang mendalam dalam pengembangan web full-stack dan desain UI/UX. Saya sangat menikmati proses menciptakan interface yang intuitif, estetis, dan fungsional yang memberikan pengalaman terbaik bagi pengguna.
          </motion.p>
          <motion.p
            className={`text-sm sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Fokus utama saya saat ini adalah mengembangkan aplikasi web modern berskala produksi menggunakan ekosistem React (Next.js), integrasi backend (Node.js, PHP, Firebase), serta pengelolaan database. Sebagai mahasiswa semester akhir, saya juga aktif mempersiapkan penelitian tugas akhir dan terbuka untuk kesempatan magang maupun kolaborasi profesional.
          </motion.p>
        </motion.div>
        <motion.div
          className={`backdrop-blur-xl p-5 sm:p-8 rounded-2xl border shadow-xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-blue-500/20 ${
            isDarkMode 
              ? 'bg-gray-900/40 border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
              : 'bg-white/60 border-black/[0.05] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]'
          }`}
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <motion.h3
            className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Hobi & Minat
          </motion.h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Bermain Basket',
              'Membaca Komik & Manga',
              'Creating & DIY Projects',
              'Menggambar & Sketsa',
              'UI/UX & Web Design',
              'Desain Grafis (Poster, Banner, Logo)',
              '3D Maps & Desain Geospasial',
              'Mendengarkan Musik',
            ].map((hobby, i) => (
              <motion.span
                key={hobby}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors duration-200 cursor-default ${
                  isDarkMode 
                    ? 'bg-gray-900/40 border-gray-800 text-gray-300 hover:border-blue-500/40 hover:text-blue-300' 
                    : 'bg-white/80 border-gray-200 text-gray-700 hover:border-blue-500/40 hover:text-blue-600 shadow-sm'
                }`}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  scale: { type: 'spring', stiffness: 400, damping: 20 },
                  opacity: { duration: 0.4, delay: 0.04 + i * 0.025, ease: [0.16, 1, 0.3, 1] }
                }}
                viewport={{ once: true }}
              >
                {hobby}
              </motion.span>
            ))}
          </div>
          <motion.h3
            className={`text-xl font-bold mt-6 sm:mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Pendidikan
          </motion.h3>
          <motion.div
            className={`mb-4 pb-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sistem Informasi</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Universitas Masoem</div>
            <div className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>2023 - Sekarang</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SMK Bakti Ilham</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jurusan TKJ</div>
            <div className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>2020 - 2023</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}