import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const portfolioProjects = [
  {
    id: 1,
    title: 'E-Commerce Website',
    description: 'Website e-commerce dengan fitur keranjang dan pembayaran. Platform untuk berbagai jenis produk dengan sistem pembayaran terintegrasi.',
    image: '/anzz.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: '#',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Loopify Media Social',
    description: 'Web media sosial yang baru dan lebih menarik dengan fitur sharing konten, messaging, dan personalisasi profil yang unik.',
    image: '/loopify.png',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    link: '#',
    category: 'UI/UX Design',
  },
  {
    id: 3,
    title: 'PMB UGM',
    description: 'Web untuk penerimaan mahasiswa baru di UGM dengan sistem pendaftaran, pembayaran, dan pengumuman terintegrasi.',
    image: '/pmb.png',
    technologies: ['React', 'Chart.js', 'Firebase', 'Material UI'],
    link: '#',
    category: 'Web Development',
  },
  {
    id: 4,
    title: 'Task Manager App',
    description: 'Aplikasi manajemen tugas dengan fitur pengingat, kategori, dan kolaborasi tim.',
    image: '/pal.png',
    technologies: ['React Native', 'Redux', 'Firebase'],
    link: '#',
    category: 'Mobile App',
  },
];

export default function Portfolio({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const filteredProjects = selectedCategory
    ? portfolioProjects.filter((project) => project.category === selectedCategory)
    : portfolioProjects;

  const categories = [...new Set(portfolioProjects.map((project) => project.category))];

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
        Portfolio
      </motion.h2>
      <motion.div
        className={`w-20 h-1.5 bg-blue-500 rounded mb-8`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      />
      <motion.p
        className={`text-lg mb-8 max-w-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: false }}
      >
        Beberapa proyek yang telah saya kerjakan selama perjalanan karir saya. Setiap proyek menunjukkan keterampilan dan keahlian saya dalam pengembangan web.
      </motion.p>
      <motion.div
        className="flex flex-wrap gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: false }}
      >
        <motion.button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === null
              ? `bg-blue-600 text-white`
              : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
          }`}
          onClick={() => setSelectedCategory(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Semua
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category
                ? `bg-blue-600 text-white`
                : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
            }`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-xl group relative`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
              whileHover={{ y: -10 }}
            >
              <div className="relative h-56 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.15 }}
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
                <motion.div
                  className="absolute inset-0 bg-blue-600/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.button
                    className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    Lihat Detail
                  </motion.button>
                </motion.div>
                <motion.div
                  className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded-full"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {project.category}
                </motion.div>
              </div>
              <motion.div
                className="p-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              >
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="text-xs bg-blue-600/15 text-blue-400 rounded-full px-2 py-1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal untuk Detail Proyek */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              } rounded-lg shadow-lg p-6 max-w-lg w-full`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="text-sm mb-4">{selectedProject.description}</p>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-600/15 text-blue-400 rounded-full px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                  onClick={() => setSelectedProject(null)}
                >
                  Tutup
                </button>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Kunjungi Proyek
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}