import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChevronDown } from 'react-icons/hi';

export default function About({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <motion.div
      className="w-full max-w-6xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <motion.h2
        className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Tentang Saya
      </motion.h2>
      <motion.div
        className={`w-20 h-1.5 bg-blue-500 rounded mb-8`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-70'} backdrop-blur-lg p-8 rounded-2xl shadow-xl`}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <motion.p
            className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-6`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Nama saya Alwan, lahir di Lampung pada 11 Juni 2005. Saya seorang mahasiswa semester 4 di Program Studi Sistem Informasi A.
          </motion.p>
          <motion.p
            className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-6`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false }}
          >
            Saya memiliki passion dalam pengembangan web dan desain UI/UX. Menciptakan interface yang intuitif dan mudah digunakan adalah hal yang saya sukai.
          </motion.p>
          <motion.p
            className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: false }}
          >
            Saat ini saya fokus mengembangkan kemampuan di bidang front-end development dengan React dan Next.js, serta mempelajari teknologi back-end seperti Node.js dan PHP.
          </motion.p>
        </motion.div>
        <motion.div
          className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-70'} backdrop-blur-lg p-8 rounded-2xl shadow-xl`}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <motion.h3
            className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Hobi & Minat
          </motion.h3>
          <div className="grid grid-cols-2 gap-4">
            {['Bermain Basket', 'Membaca Komik', 'Mengambar', 'Riding', 'Bermain Game', 'UI/UX Design'].map((hobby, i) => (
              <motion.div
                key={hobby}
                className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                viewport={{ once: false }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{hobby}</span>
              </motion.div>
            ))}
          </div>
          <motion.h3
            className={`text-xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Pendidikan
          </motion.h3>
          <motion.div
            className={`mb-4 pb-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <div className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sistem Informasi</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Universitas Masoem</div>
            <div className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>2023 - Sekarang</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            viewport={{ once: false }}
          >
            <div className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SMK Bakti Ilham</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jurusan TKJ</div>
            <div className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>2020 - 2023</div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Scroll Down</p>
        <HiOutlineChevronDown className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      </motion.div>
    </motion.div>
  );
}