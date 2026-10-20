'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
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
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.15 }}
    >
        
      <motion.h2
        className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        Kontak
      </motion.h2>
      <motion.div
        className={`w-20 h-1.5 bg-blue-500 rounded mb-8`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Contact Info & Testimonial Card */}
        <motion.div
          className={`backdrop-blur-xl p-6 sm:p-8 rounded-2xl border flex flex-col justify-between h-full transition-[border-color,box-shadow,background-color] duration-300 hover:border-blue-500/20 ${
            isDarkMode 
              ? 'bg-gray-900/40 border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
              : 'bg-white/60 border-black/[0.05] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]'
          }`}
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Mari Terhubung
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Tertarik untuk bekerja sama? Jangan ragu untuk menghubungi saya melalui form pesan atau melalui kanal kontak di bawah ini.
            </p>
            
            {/* Minimal Contact List */}
            <div className="space-y-4 mb-8">
              <a href="https://wa.me/62895320695308" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl hover:bg-emerald-500/10 transition-colors duration-200 group">
                <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-200">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-[10px] font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>WhatsApp</div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>+62 895-3206-95308</div>
                </div>
              </a>

              <a href="mailto:alwanwildan942@gmail.com" className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-500/10 transition-colors duration-200 group">
                <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-[10px] font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>Email</div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>alwanwildan942@gmail.com</div>
                </div>
              </a>
              
              <a href="https://linkedin.com/in/alwan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-500/10 transition-colors duration-200 group">
                <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-[10px] font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>LinkedIn</div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>linkedin.com/in/alwan</div>
                </div>
              </a>

              <a href="https://github.com/AlwanWZ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-500/10 transition-colors duration-200 group">
                <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200">
                  <FaGithub className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-[10px] font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>GitHub</div>
                  <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>github.com/AlwanWZ</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Testimonial Section inside the same card, aligned to bottom */}
          <div className={`border-t pt-6 ${isDarkMode ? 'border-gray-800/80' : 'border-gray-200/50'}`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Testimonials
            </h4>
            <div className="relative h-32 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  className="absolute inset-0 flex flex-col justify-between"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className={`text-sm italic line-clamp-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div className="flex items-center mt-3">
                    <div className="w-9 h-9 rounded-full bg-gray-300 mr-3 relative overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{testimonials[currentTestimonial].name}</p>
                      <p className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center mt-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`h-1.5 rounded-full mx-1 transition-all duration-300 cursor-pointer ${currentTestimonial === i ? 'bg-blue-500 w-4' : isDarkMode ? 'bg-gray-700 w-1.5' : 'bg-gray-300 w-1.5'}`}
                  onClick={() => setCurrentTestimonial(i)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Message Form Card */}
        <motion.div
          className={`backdrop-blur-xl p-6 sm:p-8 rounded-2xl border flex flex-col justify-between h-full transition-[border-color,box-shadow,background-color] duration-300 hover:border-blue-500/20 ${
            isDarkMode 
              ? 'bg-gray-900/40 border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
              : 'bg-white/60 border-black/[0.05] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]'
          }`}
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="w-full">
            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Kirim Pesan</h3>
            <form className="space-y-3 sm:space-y-4">
              <div>
                <label className={`hidden sm:block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nama</label>
                <input
                  type="text"
                  className={`w-full p-3 sm:p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all border ${
                    isDarkMode
                      ? 'bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600'
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 shadow-inner'
                  }`}
                  placeholder="Nama Lengkap"
                />
              </div>
              
              <div>
                <label className={`hidden sm:block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</label>
                <input
                  type="email"
                  className={`w-full p-3 sm:p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all border ${
                    isDarkMode
                      ? 'bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600'
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 shadow-inner'
                  }`}
                  placeholder="Email Anda"
                />
              </div>

              <div>
                <label className={`hidden sm:block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Subjek</label>
                <input
                  type="text"
                  className={`w-full p-3 sm:p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all border ${
                    isDarkMode
                      ? 'bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600'
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 shadow-inner'
                  }`}
                  placeholder="Subjek Pesan"
                />
              </div>

              <div>
                <label className={`hidden sm:block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pesan</label>
                <textarea
                  className={`w-full p-3 sm:p-3.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all border ${
                    isDarkMode
                      ? 'bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600'
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 shadow-inner'
                  }`}
                  rows={3}
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <motion.button
                type="button"
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_4px_15px_rgba(59,130,246,0.2)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.35)] transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Kirim Pesan
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}