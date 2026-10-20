'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiHtml5, SiCss3, SiJavascript, SiPhp, SiNextdotjs, SiFigma, 
  SiGit, SiTailwindcss, SiFirebase, SiNodedotjs, SiMysql, SiTypescript, 
  SiVite, SiLaravel, SiSupabase, SiMongodb, SiCloudinary, SiMapbox, SiGoogle 
} from 'react-icons/si';

interface SkillItem {
  skill: string;
  projects: string;
  level: number;
  icon: any;
  color: string;
  description: string;
}

interface SkillCategory {
  name: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Front-End & Bahasa",
    skills: [
      { 
        skill: 'Tailwind CSS', 
        projects: '11 Proyek', 
        level: 95, 
        icon: SiTailwindcss, 
        color: "#06B6D4",
        description: 'Digunakan di Skalasi.id, Sewain, Kasku, Sugihmukti, Bilas.in, CelebesTrace, HuniKita, dll.'
      },
      { 
        skill: 'React (v18 & v19)', 
        projects: '10 Proyek', 
        level: 92, 
        icon: SiReact, 
        color: "#61DAFB",
        description: 'Library UI utama di Skalasi.id, Sewain, Kasku-ID, KKN HPP, GIS, Bilas.in, Barokah Tani, dll.'
      },
      { 
        skill: 'TypeScript', 
        projects: '10 Proyek', 
        level: 90, 
        icon: SiTypescript, 
        color: "#3178C6",
        description: 'Type-safe di Skalasi, Sewain, Kasku-ID, Pinfades, PDF Converter, GIS, CelebesTrace, HuniKita.'
      },
      { 
        skill: 'Next.js (v14 & v15)', 
        projects: '7 Proyek', 
        level: 88, 
        icon: SiNextdotjs, 
        color: "#000000",
        description: 'Fullstack App Router & Server Actions di Sewain, Kasku, Pinfades, CelebesTrace, HuniKita, Lobi.'
      },
      { 
        skill: 'Vite (v6 & v8)', 
        projects: '5 Proyek', 
        level: 86, 
        icon: SiVite, 
        color: "#646CFF",
        description: 'Build tool kilat di Skalasi.id SuperApp, KKN HPP Pro, Sugihmukti GIS, Bilas.in, Barokah Tani.'
      },
      { 
        skill: 'JavaScript (ES6+)', 
        projects: '15 Proyek', 
        level: 92, 
        icon: SiJavascript, 
        color: "#F7DF1E",
        description: 'Fondasi utama interaktivitas di seluruh aplikasi web, SPA, dan backend automation.'
      },
      { 
        skill: 'HTML5 & CSS3 Vanilla', 
        projects: '15 Proyek', 
        level: 95, 
        icon: SiHtml5, 
        color: "#E34F26",
        description: 'Struktur semantik web dan Custom CSS Variables (Light/Dark) di Celebit & Barokah Tani.'
      },
    ]
  },
  {
    name: "Back-End & Database",
    skills: [
      { 
        skill: 'Supabase (PostgreSQL)', 
        projects: '6 Proyek', 
        level: 88, 
        icon: SiSupabase, 
        color: "#3ECF8E",
        description: 'Database cloud real-time di Kasku-ID, Presensi SMP, Bilas.in, Barokah Tani, kasku_Wa, Lobi.'
      },
      { 
        skill: 'Node.js (Runtime & APIs)', 
        projects: '5 Proyek', 
        level: 85, 
        icon: SiNodedotjs, 
        color: "#339933",
        description: 'WhatsApp Bot Baileys, Cron Scheduler otomatis, PDFKit exporter, dan data converter.'
      },
      { 
        skill: 'PHP Native (OOP & PDO)', 
        projects: '3 Proyek', 
        level: 84, 
        icon: SiPhp, 
        color: "#777BB4",
        description: 'Arsitektur model OOP & transaksi PDO aman di Inventaris Celebit & SMPN 2 Pasirjambu.'
      },
      { 
        skill: 'MySQL / MariaDB', 
        projects: '3 Proyek', 
        level: 82, 
        icon: SiMysql, 
        color: "#4479A1",
        description: 'Database relasional ketat di Inventaris Celebit, Presensi SMP, dan CelebesTrace audit trails.'
      },
      { 
        skill: 'Firebase (Firestore & Auth)', 
        projects: '3 Proyek', 
        level: 80, 
        icon: SiFirebase, 
        color: "#FFCA28",
        description: 'BaaS NoSQL & autentikasi sesi di Skalasi.id SuperApp, Sewain, dan Pinfades.'
      },
      { 
        skill: 'MongoDB (Mongoose)', 
        projects: '2 Proyek', 
        level: 78, 
        icon: SiMongodb, 
        color: "#47A248",
        description: 'Database dokumen NoSQL cloud untuk sistem Pinfades desa dan HuniKita kontrakan.'
      },
      { 
        skill: 'Laravel (v12 REST API)', 
        projects: '1 Proyek', 
        level: 75, 
        icon: SiLaravel, 
        color: "#FF2D20",
        description: 'Backend API decoupled & autentikasi token Sanctum di sistem ERP CelebesTrace.'
      },
    ]
  },
  {
    name: "Tools, Cloud & AI",
    skills: [
      { 
        skill: 'Cloudinary API', 
        projects: '6 Proyek', 
        level: 88, 
        icon: SiCloudinary, 
        color: "#3448C5",
        description: 'Penyimpanan & kompresi cloud media di Skalasi, Sewain, Pinfades, SMP, Barokah Tani, HuniKita.'
      },
      { 
        skill: 'Figma (UI/UX Design)', 
        projects: '6+ Proyek Desain', 
        level: 88, 
        icon: SiFigma, 
        color: "#F24E1E",
        description: 'Wireframing, UI Design System, dan prototype Skalasi, Creator ID, Pinfades, Dashboard, dll.'
      },
      { 
        skill: 'Git & GitHub', 
        projects: '15 Proyek', 
        level: 90, 
        icon: SiGit, 
        color: "#F05032",
        description: 'Manajemen versi kode, branching, dan kolaborasi repositori di seluruh proyek web.'
      },
      { 
        skill: 'Google Gemini AI API', 
        projects: '2 Proyek', 
        level: 82, 
        icon: SiGoogle, 
        color: "#4285F4",
        description: 'Integrasi LLM intelijen pasar di Skalasi.id SuperApp dan asisten interaktif portofolio.'
      },
      { 
        skill: 'Mapbox GL JS (WebGIS)', 
        projects: '1 Proyek Unggulan', 
        level: 80, 
        icon: SiMapbox, 
        color: "#000000",
        description: 'Engine pemetaan geospasial WebGL 2D/3D interaktif pada Sugihmukti Tourism GIS.'
      },
    ]
  }
];

export default function Skill({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeSkillTab, setActiveSkillTab] = useState("Front-End & Bahasa");

  return (
    <motion.div
      className="w-full max-w-6xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Skills & Kemampuan
      </motion.h2>
      <motion.div
        className={`w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded mb-4 sm:mb-6`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      />
      <motion.p
        className={`text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Tingkat kemahiran dan frekuensi teknologi yang diukur secara nyata berdasarkan portofolio 15+ aplikasi web, sistem enterprise, dan proyek desain yang telah saya bangun.
      </motion.p>

      <motion.div
        className={`backdrop-blur-xl p-5 sm:p-8 rounded-2xl border shadow-xl mb-8 transition-all duration-300 hover:border-blue-500/20 ${
          isDarkMode 
            ? 'bg-gray-900/40 border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' 
            : 'bg-white/60 border-black/[0.05] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]'
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Skill category tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                activeSkillTab === category.name
                  ? `bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20`
                  : `${isDarkMode ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
              }`}
              onClick={() => setActiveSkillTab(category.name)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills progress bars with real project count */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkillTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-5"
          >
            {skillCategories
              .find((cat) => cat.name === activeSkillTab)
              ?.skills.map((item, index) => (
                <motion.div
                  key={item.skill}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-[border-color,box-shadow,background-color] duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-950/40 border-white/[0.05] hover:border-blue-500/30' 
                      : 'bg-white/80 border-gray-200 hover:border-blue-500/30 shadow-xs'
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.icon && <item.icon size={18} className="sm:w-5 sm:h-5 flex-shrink-0" color={item.color} />}
                      <span className={`text-sm sm:text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.skill}
                      </span>
                      <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        isDarkMode 
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                          : 'bg-blue-50 border-blue-200 text-blue-700'
                      }`}>
                        {item.projects}
                      </span>
                    </div>
                    <span className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div
                    className={`h-2 sm:h-2.5 rounded-full overflow-hidden relative ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                    }`}
                  >
                    <motion.div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ backgroundColor: item.color || '#3B82F6' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1.1, delay: 0.08 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                    />
                  </div>

                  {/* Ringkasan Proyek yang Menggunakan */}
                  <p className={`text-[11px] sm:text-xs mt-2 line-clamp-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-medium">{item.description}</span>
                  </p>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}