import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiLayout, FiFigma, FiInstagram, FiExternalLink, FiEye, FiCheckCircle, FiX } from 'react-icons/fi';
import { SiFigma, SiAdobephotoshop, SiAdobeillustrator, SiCanva } from 'react-icons/si';

interface DesignProject {
  id: number;
  title: string;
  category: string;
  role: string;
  description: string;
  deliverables: string[];
  tools: { name: string; icon: any; color: string }[];
  image: string;
  figmaUrl?: string;
  liveUrl?: string;
  caseStudy: string;
  accentGradient: string;
}

const designProjects: DesignProject[] = [
  {
    id: 1,
    title: 'Creator ID - Social Media & Branding',
    category: 'Branding & Social Media',
    role: 'Admin IG & Visual Content Creator',
    description: 'Perancangan identitas visual, feed Instagram edukatif, carousel promosi, dan materi branding digital untuk Project Creator ID.',
    deliverables: ['Instagram Feed & Carousel', 'Visual Brand Guidelines', 'Story & Poster Promosi', 'Copywriting & Content Strategy'],
    tools: [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
      { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
      { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
    ],
    image: '/loopify.png',
    caseStudy: 'Merancang strategi visual akun Instagram Creator ID dengan palet warna yang dinamis dan tipografi modern untuk meningkatkan impresi & engagement audiens kreator digital.',
    accentGradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 2,
    title: 'Pinfades - UI/UX Portal & Layanan Desa',
    category: 'UI/UX Web',
    role: 'UI/UX Designer',
    description: 'Desain antarmuka sistem pelayanan digital warga dan administrasi kantor desa yang mudah digunakan oleh seluruh lapisan masyarakat.',
    deliverables: ['User Flow & Information Architecture', 'High-Fidelity Wireframes', 'Design System Khusus Web Desa', 'Interactive Prototype'],
    tools: [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
    ],
    image: '/pmb.png',
    caseStudy: 'Fokus pada penyederhanaan alur pengurusan surat pengantar dan permohonan bantuan desa agar ramah bagi pengguna awam dan lansia di perangkat mobile maupun desktop.',
    accentGradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 3,
    title: 'Skalasi.id - SuperApp Mobile & Web UI/UX',
    category: 'UI/UX Mobile',
    role: 'Lead Product UI/UX Designer',
    description: 'Konsep desain komprehensif untuk SuperApp multi-layanan (e-commerce, manajemen bisnis, integrasi dompet digital, dan transaksi).',
    deliverables: ['Mobile App Screen Kits (50+ screens)', 'Design System & Component Library', 'Micro-interactions Animation', 'Clickable Figma Prototype'],
    tools: [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
    ],
    image: '/skalasi.png',
    liveUrl: 'https://www.skalasi-id.my.id/',
    caseStudy: 'Mengintegrasikan ekosistem multi-fitur Skalasi.id ke dalam satu antarmuka yang kohesif dengan navigasi bottom-bar yang ringkas dan navigasi cepat antar modul layanan.',
    accentGradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 4,
    title: 'Admin Dashboard - Celebit & Kasku Management',
    category: 'Dashboard UI',
    role: 'UI/UX Backoffice Designer',
    description: 'Perancangan dashboard kontrol admin terpadu untuk pencatatan keuangan digital Kasku-ID dan manajemen stok inventaris Celebit.',
    deliverables: ['Data Analytics & Chart Widgets', 'Table Management & Filters UX', 'Dark/Light Theme Switcher', 'Component Tokenization'],
    tools: [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    ],
    image: '/pal.png',
    caseStudy: 'Menyusun tata letak analitik keuangan dan visualisasi data stok gudang yang informatif tanpa membebani kognitif admin saat memproses ratusan data harian.',
    accentGradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 5,
    title: 'Bilas.in & Hunikita - On-Demand Service UI',
    category: 'UI/UX Mobile',
    role: 'UI/UX Designer',
    description: 'Desain antarmuka aplikasi pemesanan jasa laundry/cuci (Bilas.in) dan eksplorasi pencarian sewa hunian/kos (Hunikita).',
    deliverables: ['User Journey Map', 'Quick Booking Checkout Flow', 'Location Pin Picker UX', 'Visual Mockups'],
    tools: [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
    ],
    image: '/loopify.png',
    caseStudy: 'Menciptakan alur checkout 3-langkah untuk jasa cuci Bilas.in dan sistem filter harga serta fasilitas hunian yang intuitif pada platform Hunikita.',
    accentGradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 6,
    title: 'Website Profil Desa & Komunitas KKN HPP',
    category: 'UI/UX Web',
    role: 'Visual & Web Designer',
    description: 'Perancangan desain landing page profil desa, peta potensi wilayah desa, dan dokumentasi program kerja komunitas KKN HPP.',
    deliverables: ['Responsive Web Mockup', 'Infografis & Aset Grafis', 'Hero Section Layout', 'Struktur Galeri Desa'],
    tools: [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
      { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
    ],
    image: '/pmb.png',
    caseStudy: 'Menonjolkan potensi keunggulan desa melalui tata letak storytelling visual, infografis statistik kependudukan, dan etalase produk UMKM binaan desa.',
    accentGradient: 'from-violet-500 to-purple-600',
  },
];

export default function DesignShowcase({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<DesignProject | null>(null);

  const categories = ['Semua', ...new Set(designProjects.map((p) => p.category))];

  const filteredProjects = selectedCategory && selectedCategory !== 'Semua'
    ? designProjects.filter((p) => p.category === selectedCategory)
    : designProjects;

  return (
    <motion.div
      className="w-full max-w-6xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <FiLayout className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Design Showcase
          </h2>
        </div>
        <motion.div
          className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded mb-4"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        />
        <p className={`text-sm sm:text-base mb-6 max-w-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
          Koleksi karya desain UI/UX, visual branding sosial media, dan perancangan antarmuka sistem digital yang berpusat pada estetika modern serta kenyamanan pengguna.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: false }}
      >
        {categories.map((cat) => {
          const isSelected = (selectedCategory === null && cat === 'Semua') || selectedCategory === cat;
          return (
            <motion.button
              key={cat}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : isDarkMode
                  ? 'bg-gray-900/40 text-gray-400 border border-white/[0.05] hover:text-white hover:border-blue-500/30'
                  : 'bg-white/70 text-gray-600 border border-black/[0.05] hover:text-gray-900 hover:border-blue-500/30 shadow-sm'
              }`}
              onClick={() => setSelectedCategory(cat === 'Semua' ? null : cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Showcase Grid (3 Columns on Mobile, 2/3 on Desktop) */}
      <motion.div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 md:gap-8" layout>
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`rounded-2xl overflow-hidden border shadow-md sm:shadow-xl group relative cursor-pointer flex flex-col justify-between transition-all duration-300 hover:border-blue-500/30 ${
                isDarkMode
                  ? 'bg-gray-900/40 border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                  : 'bg-white/60 border-black/[0.05] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              exit={{ opacity: 0, scale: 0.85 }}
              layout
              whileHover={{ y: -6 }}
              onClick={() => setActiveProject(project)}
            >
              {/* Image Preview Container */}
              <div className="relative h-20 xs:h-28 sm:h-48 md:h-52 overflow-hidden bg-gray-950/40">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-500"
                  />
                </motion.div>

                {/* Gradient Highlight Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${project.accentGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />

                {/* Hover Action Badge */}
                <motion.div
                  className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span className="bg-white/90 text-gray-900 font-bold py-1.5 px-3 sm:py-2.5 sm:px-5 rounded-xl shadow text-[10px] sm:text-xs flex items-center gap-1.5 pointer-events-none">
                    <FiEye className="w-3.5 h-3.5 text-blue-600" />
                    <span>Lihat Konsep</span>
                  </span>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-1 right-1 sm:top-2.5 sm:right-2.5 bg-gray-950/70 backdrop-blur-md text-white border border-white/10 text-[8px] sm:text-xs font-semibold py-0.5 px-1.5 sm:py-1 sm:px-2.5 rounded-lg">
                  {project.category}
                </div>
              </div>

              {/* Card Body */}
              <motion.div
                className="p-2 sm:p-5 flex-grow flex flex-col justify-between"
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
              >
                <div>
                  <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-1">
                    {project.role}
                  </span>
                  <h3 className={`text-[10px] xs:text-xs sm:text-base md:text-lg font-bold line-clamp-1 sm:line-clamp-2 mb-1 leading-tight ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`hidden sm:block text-xs mb-3 line-clamp-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  } leading-relaxed`}>
                    {project.description}
                  </p>
                </div>

                {/* Tool Badges */}
                <div className="hidden sm:flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.05]">
                  {project.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className={`text-[10px] flex items-center gap-1 rounded-md px-1.5 py-0.5 border ${
                        isDarkMode
                          ? 'bg-gray-950/40 border-gray-800 text-gray-300'
                          : 'bg-gray-100/80 border-gray-200 text-gray-700'
                      }`}
                    >
                      <tool.icon size={11} color={tool.color} />
                      <span>{tool.name}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal Detail Concept & Case Study */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className={`rounded-2xl shadow-2xl p-5 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto border relative ${
                isDarkMode
                  ? 'bg-gray-900/95 border-gray-800 text-white shadow-[0_0_50px_rgba(59,130,246,0.15)]'
                  : 'bg-white/95 border-gray-200 text-gray-900 shadow-xl'
              }`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                    {activeProject.category} • {activeProject.role}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
                      : 'bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview Banner */}
              <div className="relative w-full h-44 sm:h-64 mb-4 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${activeProject.accentGradient} opacity-20`} />
              </div>

              {/* Case Study Highlight */}
              <div className={`p-4 rounded-xl mb-4 border ${
                isDarkMode ? 'bg-gray-950/60 border-gray-800' : 'bg-slate-50 border-gray-200'
              }`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5">
                  Konsep & Solusi Desain:
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {activeProject.caseStudy}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="mb-4">
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Output & Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium border ${
                        isDarkMode
                          ? 'bg-gray-950/30 border-gray-800/80 text-gray-300'
                          : 'bg-white border-gray-200 text-gray-700'
                      }`}
                    >
                      <FiCheckCircle className="text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Used */}
              <div className="mb-6">
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Design Tools:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-800/80 border-gray-700 text-gray-200'
                          : 'bg-gray-100 border-gray-200 text-gray-800'
                      }`}
                    >
                      <tool.icon size={14} color={tool.color} />
                      <span>{tool.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.08]">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Kunjungi Website</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveProject(null)}
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
