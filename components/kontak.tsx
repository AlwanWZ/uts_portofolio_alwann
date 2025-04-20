import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Project Manager",
    company: "Tech Solutions",
    content: "Alwan memberikan kontribusi yang luar biasa dalam proyek kami. Kemampuan teknisnya sangat membantu tim dalam menyelesaikan project tepat waktu.",
    avatar: "/avatar1.png"
  },
  {
    id: 2,
    name: "Siti Nuraini",
    role: "UI/UX Designer",
    company: "Creative Studio",
    content: "Kolaborasi dengan Alwan sangat menyenangkan. Dia cepat memahami konsep desain dan mengimplementasikannya dengan sempurna ke dalam kode.",
    avatar: "/avatar2.png"
  },
  {
    id: 3,
    name: "Rudi Hermawan",
    role: "CTO",
    company: "StartUp Indonesia",
    content: "Alwan memiliki pemahaman yang baik tentang pengembangan web modern. Dia selalu up-to-date dengan teknologi terbaru.",
    avatar: "/avatar3.png"
  }
];

export default function Kontak({ isDarkMode }: { isDarkMode: boolean }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
        Kontak
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
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <motion.p
            className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: false }}
          >
            Tertarik untuk bekerja sama? Jangan ragu untuk menghubungi saya melalui form di bawah ini atau melalui kanal media sosial saya.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <motion.div
              className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-70'} backdrop-blur-lg p-6 rounded-xl shadow-lg`}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
            >
              <FaEnvelope className="text-blue-500 w-6 h-6 mb-3" />
              <h3 className={`text-lg font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>alwan@example.com</p>
            </motion.div>
            <motion.div
              className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-70'} backdrop-blur-lg p-6 rounded-xl shadow-lg`}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
            >
              <FaLinkedin className="text-blue-500 w-6 h-6 mb-3" />
              <h3 className={`text-lg font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LinkedIn</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>linkedin.com/in/alwan</p>
            </motion.div>
          </motion.div>
          <motion.div
            className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-70'} backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: false }}
          >
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Testimonials</h3>
            <div className="relative h-48 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  className="absolute inset-0 flex flex-col"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className={`text-sm italic mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{testimonials[currentTestimonial].content}"</p>
                  <div className="mt-auto flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 relative overflow-hidden">
                      <Image
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonials[currentTestimonial].name}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full mx-1 ${currentTestimonial === i ? 'bg-blue-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                  onClick={() => setCurrentTestimonial(i)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-70'} backdrop-blur-lg p-8 rounded-xl shadow-xl`}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Kirim Pesan</h3>
          <form className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: false }}
            >
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nama</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                    : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                } border focus:ring-2 focus:ring-blue-500/30 outline-none transition-all`}
                placeholder="Nama Lengkap"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: false }}
            >
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                    : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                } border focus:ring-2 focus:ring-blue-500/30 outline-none transition-all`}
                placeholder="email@example.com"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              viewport={{ once: false }}
            >
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subjek</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                    : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                } border focus:ring-2 focus:ring-blue-500/30 outline-none transition-all`}
                placeholder="Apa yang bisa saya bantu?"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              viewport={{ once: false }}
            >
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pesan</label>
              <textarea
                className={`w-full px-4 py-3 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500'
                    : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                } border focus:ring-2 focus:ring-blue-500/30 outline-none transition-all`}
                rows={5}
                placeholder="Tulis pesan anda disini..."
              ></textarea>
            </motion.div>
            <motion.button
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              viewport={{ once: false }}
            >
              Kirim Pesan
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}