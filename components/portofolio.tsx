'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiCheckCircle, FiExternalLink, FiX } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  fullDescription: string;
  coreFeatures: string[];
  technologies: string[];
  image: string;
  screenshots?: string[];
  isMobile?: boolean;
  link: string;
}

const portfolioProjects: Project[] = [
  {
    id: 1,
    title: 'Skalasi.id (SuperApp)',
    subtitle: 'Platform Operasional & Pendamping Bisnis Terpadu Berbasis AI',
    category: 'Web App',
    description: 'Platform operasional dan pendamping bisnis terpadu berbasis AI untuk membantu pelaku usaha (UMKM hingga ritel) mengelola dan mengembangkan bisnis secara efisien.',
    fullDescription: 'Skalasi.id (Bisnisku) adalah platform operasional dan pendamping bisnis terpadu berbasis AI yang dirancang untuk membantu pelaku usaha (UMKM hingga ritel) mengelola dan mengembangkan bisnis mereka secara efisien dari hulu ke hilir.',
    coreFeatures: [
      'Mesin Kasir Digital (POS): Pencatatan penjualan harian, varian produk, stok, diskon/PPN, dan cetak nota struk printer thermal kustom.',
      'Kalkulator HPP & Simulasi Margin: Perhitungan Harga Pokok Penjualan presisi bahan baku, upah tenaga kerja, dan operasional.',
      'Analisis Keuangan & BEP: Pemantauan omzet, arus kas, alokasi modal awal, dan estimasi waktu balik modal usaha secara terukur.',
      'Asisten & Intelijen Pasar AI: Konsultan bisnis AI terintegrasi konteks lokal untuk analisis tren, harga, perilaku konsumen, dan peluang ekspansi.'
    ],
    technologies: ['React 18', 'TypeScript', 'Vite 6', 'React Router 7', 'Tailwind CSS v4', 'Radix UI', 'Framer Motion', 'Recharts', 'Firebase v12', 'Cloudinary', 'Google Gemini AI'],
    image: '/skalasi.png',
    link: 'https://www.skalasi-id.my.id/',
  },
  {
    id: 2,
    title: 'Sewain',
    subtitle: 'Platform Manajemen Penyewaan Berbasis Web (White-Label SaaS)',
    category: 'Web App',
    description: 'Platform White-Label SaaS manajemen rental alat camping, motor, handphone, hingga gedung dengan booking online dan pembukuan otomatis.',
    fullDescription: 'Sewa Aja adalah platform manajemen penyewaan berbasis web (White-Label SaaS) yang memungkinkan pemilik usaha rental—seperti alat camping, motor, handphone, hingga gedung—memiliki website katalog dan sistem operasional digital sendiri untuk mengelola inventaris, menerima booking online, memverifikasi pengembalian & denda, serta memantau laporan keuangan secara otomatis.',
    coreFeatures: [
      'Katalog & Booking Online: Etalase produk rental interaktif dengan kalender ketersediaan unit sewa.',
      'Manajemen Inventaris & Unit: Pelacakan status unit barang (tersedia, disewa, dalam servis).',
      'Verifikasi Pengembalian & Denda: Otomasi kalkulasi keterlambatan, denda, dan verifikasi kondisi fisik barang.',
      'Laporan Keuangan Otomatis: Pencatatan omzet sewa harian/bulanan, uang jaminan (deposit), dan rekapitulasi kas masuk.'
    ],
    technologies: ['Next.js 15 (App Router)', 'React 19', 'TypeScript 5', 'Tailwind CSS 3', 'Firebase Auth', 'Cloud Firestore', 'Cloudinary (next-cloudinary)'],
    image: '/sewa.png',
    link: '#',  
  },
  {
    id: 3,
    title: 'Inventaris Celebit',
    subtitle: 'Sistem Informasi Inventaris & Manajemen Pesanan Alur Terintegrasi',
    category: 'Sistem Informasi',
    description: 'Aplikasi terintegrasi berbasis web untuk mengelola alur barang dari hulu ke hilir secara real-time, menghubungkan Marketing, Produksi, dan Gudang.',
    fullDescription: 'Sistem Informasi Inventaris & Manajemen Pesanan (Inventory & Order Management System) adalah aplikasi terintegrasi berbasis web yang dirancang untuk mengelola alur barang dari hulu ke hilir secara real-time, menghubungkan divisi Marketing, Produksi, dan Gudang.',
    coreFeatures: [
      'Pemesanan (Sales Order): Mencatat pesanan customer, otomatis mem-booking stok available, dan mendukung sistem backorder.',
      'Perintah Produksi (SPK): Menerbitkan Surat Perintah Kerja ke tim produksi untuk barang yang kurang dari pesanan customer.',
      'Penerimaan Finish Good: Mencatat hasil produksi lolos verifikasi QC ke gudang dan otomatis mengupdate stok fisik secara akurat.',
      'Pengeluaran & Distribusi: Memproses pengeluaran barang, cetak Surat Jalan armada/driver, dan memotong stok tanpa risiko duplikasi.',
      'Valuasi HPP & Laporan: Laporan pesanan per periode dan laporan persediaan gudang lengkap dengan valuasi HPP dan Harga Jual.'
    ],
    technologies: ['PHP Native OOP', 'PDO Architecture', 'MySQL / MariaDB', 'Vanilla CSS3 Variables (Light/Dark)', 'Vanilla JS', 'Chart.js', 'Bootstrap Icons'],
    image: '/inventaris.png',
    link: '#',
  },
  {
    id: 4,
    title: 'Kasku-ID',
    subtitle: 'Aplikasi Budgeting & Expense Tracker Real-Time Dual-Platform',
    category: 'Web App',
    description: 'Aplikasi pengelolaan keuangan pribadi berbasis metode Envelope Budgeting dan Brankas Tabungan yang terhubung real-time ke Bot WhatsApp.',
    fullDescription: 'Kasku-ID adalah aplikasi pengelolaan keuangan pribadi (budgeting & expense tracker) berbasis web yang membantu pengguna mengontrol dan membagi uang secara disiplin agar tidak boncos. Terhubung mulus ke Bot WhatsApp dengan 1 database cloud yang sama.',
    coreFeatures: [
      'Sistem Amplop Digital: Membagi saldo ke pos-pos pengeluaran tertentu (makan, tagihan, bensin) agar uang tidak tercampur.',
      'Brankas Tabungan & Uang Dingin: Memisahkan dana yang sengaja dikunci untuk tabungan masa depan dari pengeluaran operasional harian.',
      'Dual-Platform Real-Time: Input pengeluaran via chat WhatsApp instan detik itu juga langsung tampil di dashboard Next.js.',
      'Pencatatan Mandiri & Aman: Bertindak sebagai asisten kalkulator dan kontrol otomatis tanpa menyentuh saldo rekening asli pengguna.'
    ],
    technologies: ['Next.js 14 (App Router)', 'React 18', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'Supabase (PostgreSQL)', 'Supabase Realtime SDK', 'Node.js'],
    image: '/kasku.png',
    screenshots: ['/kasku.png', '/kasku-budget.png', '/kasku-login.png'],
    isMobile: true,
    link: 'https://www.kasku-id.my.id/',
  },
  {
    id: 5,
    title: 'Pinfades',
    subtitle: 'Sistem Peminjaman & Penyewaan Alat Desa Jelegong Rancaekek',
    category: 'Sistem Informasi',
    description: 'Sistem pelayanan peminjaman dan penyewaan alat inventaris desa untuk transparansi dan kemudahan masyarakat Desa Jelegong Rancaekek.',
    fullDescription: 'Sistem informasi pelayanan dan administrasi terpadu untuk peminjaman serta penyewaan alat-alat inventaris desa di Desa Jelegong, Kecamatan Rancaekek, memudahkan warga mengajukan permohonan secara digital dan transparan.',
    coreFeatures: [
      'Katalog Inventaris Alat Desa: Daftar alat dan sarana desa yang siap dipinjam atau disewa oleh warga.',
      'Formulir Pengajuan Online: Sistem permohonan pinjam alat berbasis digital untuk mengurangi antrean di kantor desa.',
      'Otentikasi Petugas Desa: Keamanan akses pengelola data peminjaman menggunakan Firebase Authentication.',
      'Penyimpanan Terintegrasi: Pengelolaan basis data fleksibel berbasis MongoDB dan arsip foto alat melalui Cloudinary.'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase Authentication', 'MongoDB', 'Cloudinary'],
    image: '/pinfades.png',
    link: '#',
  },
  {
    id: 6,
    title: 'PDF to Excel Converter',
    subtitle: 'Automated Document Parser & Spreadsheet Data Extractor',
    category: 'Tools & Utility',
    description: 'Sistem utilitas otomatisasi untuk mengonversi data laporan dari format PDF ke spreadsheet Excel saat magang di Fakultas Komputer Universitas Ma\'soem.',
    fullDescription: 'Sistem otomatisasi untuk memproses, membedah, dan mengonversi data laporan tabular dari format PDF menjadi spreadsheet Excel (XLSX) yang rapi dan terstruktur, dikembangkan saat program magang di Fakultas Komputer Universitas Ma\'soem.',
    coreFeatures: [
      'Ekstraksi Tabel Akurat: Membedah struktur baris dan kolom tabel PDF tanpa merusak susunan data aslinya.',
      'Konversi Instan ke Excel: Output dokumen format .xlsx siap olah di Microsoft Excel maupun Google Sheets.',
      'Arsitektur Type-Safe: Kompilasi pemrosesan dokumen yang stabil dan minim error menggunakan TypeScript.',
      'Antarmuka Ringan & Cepat: Drag-and-drop file upload dengan feedback progres konversi secara instan.'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SheetJS (XLSX)', 'Node.js'],
    image: '/pdfToex.png',
    link: '#',
  },
  {
    id: 8,
    title: 'Web GIS Sugihmukti Tourism',
    subtitle: 'Sistem Informasi Geografis (WebGIS) 2D/3D Pariwisata Desa Sugihmukti',
    category: 'Sistem Informasi',
    description: 'Produk unggulan KKN: WebGIS interaktif berbasis Mapbox GL JS untuk memetakan, mengelola, dan mempromosikan seluruh potensi wisata Desa Sugihmukti.',
    fullDescription: 'Sugihmukti Tourism GIS adalah Sistem Informasi Geografis (WebGIS) interaktif berbasis web yang dirancang untuk memetakan, mengelola, dan mempromosikan potensi pariwisata Desa Sugihmukti secara modern dan informatif.',
    coreFeatures: [
      'Pemetaan Digital 2D/3D Interaktif: Menampilkan visualisasi objek wisata, villa/homestay, dan fasilitas umum dalam peta Mapbox WebGL.',
      'Panduan & Navigasi Wisatawan: Estimasi rute perjalanan, waktu tempuh, rekomendasi titik terdekat, dan panorama 360° Street View.',
      'GPS Trail Recorder: Fitur perekaman jalur penjelajahan alam baru untuk jalur petualangan dan hiking desa.',
      'Panel Admin Geospasial: Memudahkan aparatur desa memperbarui titik koordinat wisata, galeri foto, dan paket wisata.'
    ],
    technologies: ['React 19', 'Vite 6', 'TypeScript 5', 'Tailwind CSS v4', 'Mapbox GL JS (react-map-gl)', 'WebGL Engine', 'Lucide React'],
    image: '/gis.jpg',
    link: 'https://kknsugihmukti.my.id/',
  },
  {
    id: 9,
    title: 'Sistem Presensi Siswa SMP',
    subtitle: 'Sistem Informasi Presensi Digital Terintegrasi SMPN 2 Pasirjambu',
    category: 'Sistem Informasi',
    description: 'Aplikasi web presensi per jam pelajaran real-time, monitoring kedisiplinan sekolah, dan portal informasi publik SMPN 2 Pasirjambu.',
    fullDescription: 'Sistem Informasi Presensi Digital SMPN 2 Pasirjambu adalah aplikasi web terintegrasi yang digunakan untuk mengelola dan merekap absensi siswa per jam pelajaran secara real-time, memonitoring kedisiplinan sekolah, serta menyajikan portal informasi publik.',
    coreFeatures: [
      '4 Peran Terintegrasi: Hak akses multi-level untuk Guru Pengajar, Guru Piket, Kepala Sekolah, dan Administrator.',
      'Presensi Per Jam Pelajaran: Pengisian absensi langsung oleh guru mapel di kelas dengan rekapitulasi kehadiran instan.',
      'Matriks Harian Guru Piket: Pemantauan keliling kelas dan verifikasi status siswa (Hadir, Sakit, Izin, Alfa).',
      'Laporan Resmi Kepala Sekolah: Statistik kehadiran real-time serta cetak dokumen laporan bulanan resmi (PDF & Excel).',
      'Integrasi Cloud Supabase: Terhubung ke database Supabase dan penyimpanan foto profil guru via Cloudinary.'
    ],
    technologies: ['PHP Native OOP', 'PDO Models', 'MySQL / MariaDB', 'Vanilla CSS3 Variables', 'Vanilla JS', 'Supabase', 'Cloudinary', 'Chart.js', 'Bootstrap Icons'],
    image: '/absensi.png',
    link: '#',
  },
  {
    id: 10,
    title: 'Bilas.in',
    subtitle: 'Mobile-First Laundry Marketplace & Omnichannel POS System',
    category: 'Web App',
    description: 'Aplikasi marketplace laundry mobile-first dengan kurir antar-jemput, kasir omnichannel POS, timbangan anti-curang, dan pembayaran escrow.',
    fullDescription: 'Bilas.in adalah aplikasi marketplace laundry berbasis mobile-first yang menghubungkan pelanggan dengan mitra laundry terdekat melalui sistem antar-jemput kurir internal toko, dilengkapi sistem kasir digital (omnichannel POS), verifikasi timbangan anti-curang, dan garansi pembayaran aman (Escrow).',
    coreFeatures: [
      'Pemesanan Antar-Jemput: Alur booking jasa laundry kiloan/satuan dengan penugasan kurir toko ke alamat pelanggan.',
      'Omnichannel POS Kasir: Sistem kasir toko laundry untuk mencatat transaksi offline dan online dalam satu pintu.',
      'Verifikasi Timbangan Anti-Curang: Sistem validasi berat timbangan pakaian sebelum proses cuci dimulai.',
      'Garansi Pembayaran Escrow: Dana diteruskan ke mitra laundry setelah cucian selesai diverifikasi dan diterima pelanggan.'
    ],
    technologies: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS v4 (@tailwindcss/vite)', 'Supabase (@supabase/supabase-js)', 'Lucide React'],
    image: '/bilas.png',
    isMobile: true,
    link: '#',
  },
  {
    id: 11,
    title: 'CelebesTrace',
    subtitle: 'Integrated Seafood Supply Chain ERP & Traceability System',
    category: 'Enterprise App',
    description: 'Sistem ERP dan ketertelusuran rantai pasok perikanan dari kapal tangkap (hulu), QC pabrik, cold chain FEFO, hingga kontainer ekspor internasional.',
    fullDescription: 'CelebesTrace adalah sistem ERP dan ketertelusuran (traceability) rantai pasok perikanan terpadu yang melacak seluruh riwayat produk makanan laut mulai dari titik tangkap kapal di laut (Hulu), proses pabrik & inspeksi mutu QC (Produksi), manajemen rantai dingin/FEFO (Gudang), hingga pemuatan kontainer bersertifikat ke negara tujuan (Ekspor) mematuhi regulasi internasional (HACCP & EU IUU).',
    coreFeatures: [
      'Ketertelusuran Hulu ke Hilir: Grafik silsilah data transparan dari nomor kapal tangkap, batch olahan, hingga nomor kontainer ekspor.',
      'Inspeksi Mutu & Standar QC: Verifikasi mutu bertahap sesuai kepatuhan regulasi internasional perikanan HACCP & EU IUU.',
      'Manajemen Cold Chain FEFO: Pengendalian suhu gudang beku dan rotasi barang First-Expired First-Out mencegah kerusakan stok.',
      'Arsitektur Decoupled Aman: Integrasi API Laravel 12 dengan autentikasi berbasis token Sanctum dan strict audit trails.'
    ],
    technologies: ['Next.js 15 (App Router)', 'Tailwind CSS v4', 'Shadcn UI', 'Laravel 12 API', 'Laravel Sanctum', 'MySQL Strict Audit Trails', 'Lucide React'],
    image: '/celebes.png',
    link: '#',
  },
  {
    id: 12,
    title: 'Barokah Tani',
    subtitle: 'Company Profile & Digital Catalog Marketplace Pupuk Organik',
    category: 'Web App',
    description: 'Platform Company Profile & Digital Catalog pupuk organik dengan direct checkout WhatsApp, database cloud, dan hidden admin panel.',
    fullDescription: 'Barokah Tani adalah sistem web berbasis Company Profile & Digital Catalog Marketplace yang dirancang untuk mempromosikan dan memasarkan produk pupuk serta nutrisi organik secara modern, mudah, dan terintegrasi.',
    coreFeatures: [
      'Direct Checkout WhatsApp: Pelanggan memilih produk di keranjang dan langsung diarahkan ke chat WhatsApp resmi toko.',
      'Katalog Produk Dinamis: Menampilkan daftar pupuk, spesifikasi, dan status ketersediaan stok terhubung real-time ke Supabase.',
      'Pusat Konsultasi & Inbox Admin: Pesan konsultasi tersimpan otomatis ke database admin (mencegah spam ke nomor pribadi).',
      'Hidden Admin Panel: Portal terproteksi bagi pemilik toko untuk manajemen stok, penambahan produk, dan upload foto via Cloudinary.'
    ],
    technologies: ['React 19', 'Vite 8', 'Vanilla CSS3 Variables (No Framework Overhead)', 'Supabase (PostgreSQL)', 'Cloudinary API', 'Lucide React'],
    image: '/barokah-tani.png',
    link: 'https://barokah-tani.vercel.app/',
  },
  {
    id: 13,
    title: 'HuniKita',
    subtitle: 'Integrated Web Platform Manajemen & Digitalisasi Sewa Hunian',
    category: 'Web App',
    description: 'Platform web terpadu otomasi pengelolaan kontrakan dan hunian: survei booking online, tiket perbaikan, dan arus kas otomatis.',
    fullDescription: 'HuniKita adalah platform web terpadu untuk digitalisasi dan otomasi pengelolaan sewa hunian/kontrakan, menghubungkan Penyewa, Pengelola (Admin), Tim Keuangan, dan Tim Maintenance dalam satu pintu.',
    coreFeatures: [
      'Multi-Peran Terpadu: Akses tersinkronisasi untuk Penyewa, Admin Pengelola, Tim Keuangan, dan Tim Maintenance.',
      'Survei & Booking Online: Pengajuan sewa unit dan upload bukti transfer terverifikasi Cloudinary.',
      'Ticketing Kerusakan Fasilitas: Pelaporan masalah unit oleh penyewa dengan pelacakan status penanganan teknisi.',
      'Pembukuan Otomatis & Ekspor Excel: Pencatatan arus kas masuk/keluar otomatis dengan opsi cetak laporan format XLSX (SheetJS).'
    ],
    technologies: ['Next.js 15 (App Router & Server Actions)', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Headless UI', 'MongoDB (Mongoose)', 'Cloudinary', 'SheetJS (XLSX)'],
    image: '/huni.png',
    link: '#',
  },  
  {
    id: 15,
    title: 'Lobi Digital',
    subtitle: 'Smart Receptionist, Visitor Management & Queue System',
    category: 'Enterprise App',
    description: 'Sistem manajemen antrean dan resepsionis digital perusahaan dengan registrasi check-in QR, notifikasi kedatangan tamu, dan buku tamu otomatis.',
    fullDescription: 'Lobi Digital adalah sistem manajemen antrean dan resepsionis buku tamu digital terpadu untuk perusahaan guna menertibkan alur kunjungan tamu, reservasi ruang tunggu, dan pencatatan riwayat tamu secara profesional.',
    coreFeatures: [
      'Check-In Tamu Cepat (QR Code): Pendaftaran tamu instan lewat scan barcode atau input identitas digital di layar resepsionis.',
      'Manajemen Antrean Real-Time: Pemanggilan antrean tamu dengan layar monitor display lobi dan estimasi waktu tunggu.',
      'Notifikasi Kedatangan Tamu: Pemberitahuan otomatis kepada staf/divisi tujuan saat tamu telah tiba di resepsionis.',
      'Buku Tamu Digital & Laporan: Rekapitulasi statistik kunjungan harian/bulanan untuk arsip keamanan perusahaan.'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Supabase / Firebase', 'Lucide React'],
    image: '/lobi.png',
    link: '#',
  },
];

export default function Portfolio({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? portfolioProjects.filter((project) => project.category === selectedCategory)
    : portfolioProjects;

  const categories = [...new Set(portfolioProjects.map((project) => project.category))];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

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
        Portfolio
      </motion.h2>
      <motion.div
        className={`w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded mb-6 sm:mb-8`}
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
        Kumpulan proyek website, sistem informasi perusahaan, enterprise app, dan tools otomatisasi yang telah saya rancang dan bangun dengan arsitektur modern.
      </motion.p>

      {/* Filter Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <motion.button
          className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
            selectedCategory === null
              ? `bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20`
              : `${isDarkMode ? 'bg-gray-900/40 text-gray-400 border border-white/[0.05] hover:text-white hover:border-blue-500/30' : 'bg-white/70 text-gray-600 border border-black/[0.05] hover:text-gray-900 hover:border-blue-500/30 shadow-sm'}`
          }`}
          onClick={() => setSelectedCategory(null)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          Semua
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              selectedCategory === category
                ? `bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20`
                : `${isDarkMode ? 'bg-gray-900/40 text-gray-400 border border-white/[0.05] hover:text-white hover:border-blue-500/30' : 'bg-white/70 text-gray-600 border border-black/[0.05] hover:text-gray-900 hover:border-blue-500/30 shadow-sm'}`
            }`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid Portfolio (3 Columns on Mobile, 3 on Desktop) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`rounded-2xl overflow-hidden border shadow-md sm:shadow-xl group relative cursor-pointer flex flex-col justify-between transition-[border-color,box-shadow,background-color] duration-300 hover:border-blue-500/40 ${
                isDarkMode 
                  ? 'bg-gray-900/60 border-white/[0.05]' 
                  : 'bg-white/80 border-black/[0.05] shadow-sm'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.03, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              whileHover={{ 
                y: -5,
                transition: { type: 'spring', stiffness: 350, damping: 25 }
              }}
              onClick={() => {
                setSelectedProject(project);
                setSelectedImage(project.screenshots?.[0] || project.image);
              }}
            >
              <div className="relative h-20 xs:h-28 sm:h-48 md:h-52 overflow-hidden bg-gray-950/40">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="lazy"
                    unoptimized
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 384px"
                    className="object-cover object-top"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Category Badge */}
                <div className="absolute top-1 right-1 sm:top-2.5 sm:right-2.5 bg-gray-950/80 text-white border border-white/10 text-[8px] sm:text-xs font-semibold py-0.5 px-1.5 sm:py-1 sm:px-2.5 rounded-lg">
                  {project.category}
                </div>
              </div>

              <motion.div
                className="p-2 sm:p-5 flex-grow flex flex-col justify-between"
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div>
                  <h3 className={`text-[10px] xs:text-xs sm:text-base md:text-lg font-bold line-clamp-1 mb-1 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`hidden sm:block text-xs mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {project.description}
                  </p>
                </div>

                <div className="hidden sm:flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.05]">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                        isDarkMode
                          ? 'bg-gray-950/40 border-gray-800 text-blue-300'
                          : 'bg-gray-100/80 border-gray-200 text-blue-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${
                      isDarkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'
                    }`}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal Detail Proyek Interaktif (Responsive: Mobile Bottom Sheet & Desktop Wide Grid) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
          >
            <style>{`
              .modal-scrollbar::-webkit-scrollbar {
                width: 5px;
                height: 5px;
              }
              .modal-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .modal-scrollbar::-webkit-scrollbar-thumb {
                background: ${isDarkMode ? 'rgba(156, 163, 175, 0.25)' : 'rgba(107, 114, 128, 0.3)'};
                border-radius: 9999px;
              }
              .modal-scrollbar::-webkit-scrollbar-thumb:hover {
                background: ${isDarkMode ? 'rgba(156, 163, 175, 0.45)' : 'rgba(107, 114, 128, 0.5)'};
              }
              .modal-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: ${isDarkMode ? 'rgba(156, 163, 175, 0.25) transparent' : 'rgba(107, 114, 128, 0.3) transparent'};
              }
            `}</style>
            
            <motion.div
              className={`w-full sm:max-w-4xl lg:max-w-5xl max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-2xl border shadow-2xl flex flex-col overflow-hidden relative ${
                isDarkMode
                  ? 'bg-gray-900/95 border-gray-800 text-white shadow-[0_0_60px_rgba(37,99,235,0.18)]'
                  : 'bg-white/95 border-gray-200 text-gray-900 shadow-2xl'
              }`}
              initial={{ y: 50, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Drawer Handle Pill */}
              <div className="pt-2.5 pb-1 flex justify-center sm:hidden flex-shrink-0">
                <div className="w-12 h-1 rounded-full bg-gray-500/40" />
              </div>

              {/* Modal Header */}
              <div className={`px-4 sm:px-7 py-3 sm:py-4 border-b flex justify-between items-center z-10 flex-shrink-0 ${
                isDarkMode ? 'border-gray-800/80 bg-gray-950/40' : 'border-gray-100 bg-gray-50/50'
              }`}>
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                      {selectedProject.category}
                    </span>
                    <span className={`text-[10px] hidden sm:inline-block font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Tekan ESC untuk tutup
                    </span>
                  </div>
                  <h3 className="text-base sm:text-2xl font-bold mt-1 line-clamp-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-400 font-medium mt-0.5 line-clamp-1">
                    {selectedProject.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex-shrink-0 ${
                    isDarkMode
                      ? 'bg-gray-800/80 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                  aria-label="Tutup modal"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Scrollable Content (Responsive 2-Column Desktop Grid / 1-Column Mobile Flow) */}
              <div className="overflow-y-auto flex-grow p-4 sm:p-7 modal-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-start">
                  
                  {/* Left Column (Desktop: 6 cols): Screenshot Preview & Gallery */}
                  <div className="md:col-span-6 flex flex-col gap-3">
                    <div className={`relative w-full ${
                      selectedProject.isMobile || selectedProject.screenshots
                        ? 'h-72 sm:h-80 md:h-[420px]'
                        : 'aspect-video sm:h-64 md:h-[340px]'
                    } rounded-xl overflow-hidden border border-white/10 bg-gray-950/90 flex items-center justify-center shadow-inner`}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedImage || selectedProject.image}
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0.3 }}
                          transition={{ duration: 0.15 }}
                          className="relative w-full h-full flex items-center justify-center p-2 sm:p-3"
                        >
                          <Image
                            key={selectedImage || selectedProject.image}
                            src={selectedImage || selectedProject.image}
                            alt={selectedProject.title}
                            fill
                            priority
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 550px"
                            className="object-contain drop-shadow-md"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Screenshot Thumbnails (if multiple available) */}
                    {selectedProject.screenshots && selectedProject.screenshots.length > 1 && (
                      <div>
                        <div className={`text-[11px] font-semibold mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Pilihan Tampilan Layar:
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 modal-scrollbar">
                          {selectedProject.screenshots.map((shot, idx) => {
                            const isCurrent = (selectedImage || selectedProject.image) === shot;
                            return (
                              <button
                                key={shot + idx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage(shot);
                                }}
                                className={`relative w-14 h-20 sm:w-16 sm:h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                                  isCurrent
                                    ? 'border-blue-500 shadow-md shadow-blue-500/40 scale-105 ring-2 ring-blue-500/40 z-10'
                                    : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                                }`}
                              >
                                <Image
                                  src={shot}
                                  alt={`Screenshot ${idx + 1}`}
                                  fill
                                  unoptimized
                                  sizes="64px"
                                  className="object-cover object-top"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Desktop Quick Link Banner */}
                    {selectedProject.link && selectedProject.link !== '#' && (
                      <div className="hidden md:flex items-center justify-between p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 mt-1">
                        <div>
                          <div className="text-xs font-bold text-blue-400">Website Live & Siap Dikunjungi</div>
                          <div className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Buka tautan proyek di tab baru</div>
                        </div>
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-md transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>Buka</span>
                          <FiExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right Column (Desktop: 6 cols): Description, Features, Technologies */}
                  <div className="md:col-span-6 flex flex-col gap-4">
                    {/* Deskripsi Lengkap Sistem */}
                    <div className={`p-4 rounded-xl border ${
                      isDarkMode ? 'bg-gray-950/50 border-gray-800' : 'bg-slate-50 border-gray-200'
                    }`}>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        Deskripsi & Alur Sistem:
                      </h4>
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    {/* Fitur & Kemampuan Inti Sistem */}
                    {selectedProject.coreFeatures && selectedProject.coreFeatures.length > 0 && (
                      <div>
                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Inti Kemampuan & Fitur:
                        </h4>
                        <div className="space-y-2">
                          {selectedProject.coreFeatures.map((feat, idx) => (
                            <div
                              key={idx}
                              className={`flex items-start gap-2.5 p-2.5 rounded-lg text-xs leading-relaxed border ${
                                isDarkMode
                                  ? 'bg-gray-950/30 border-gray-800/80 text-gray-300'
                                  : 'bg-white border-gray-200 text-gray-700'
                              }`}
                            >
                              <FiCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Arsitektur & Teknologi */}
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Teknologi & Tools:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                              isDarkMode
                                ? 'bg-gray-800/80 border-gray-700 text-gray-200'
                                : 'bg-gray-100 border-gray-200 text-gray-800'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer (Sticky at Bottom on HP & Desktop) */}
              <div className={`px-4 sm:px-7 py-3 border-t flex-shrink-0 flex items-center justify-between sm:justify-end gap-2.5 z-10 ${
                isDarkMode ? 'border-gray-800/80 bg-gray-950/60' : 'border-gray-100 bg-gray-50/80'
              }`}>
                <button
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedProject(null)}
                >
                  Tutup
                </button>

                {selectedProject.link && selectedProject.link !== '#' ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Kunjungi Website</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className={`text-[11px] font-medium px-3 py-1.5 rounded-lg border ${
                    isDarkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'
                  }`}>
                    Proyek Internal / Offline
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}