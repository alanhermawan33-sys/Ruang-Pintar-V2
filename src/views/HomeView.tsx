import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Gem, Layers, Award, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { ScrollVelocityMarquee } from '../components/ScrollVelocityMarquee';
import { Logo } from '../components/Logo';

interface HomeViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: 'home' | 'catalog' | 'profile' | 'contact') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onSelectProduct,
  onNavigate,
}) => {
  const flagshipProducts = products.filter((p) => p.featured).slice(0, 4);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#171818] text-[#FAF9F7]">
        {/* Background HD Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Interior Architecture"
            className="w-full h-full object-cover opacity-30 scale-105 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171818] via-[#171818]/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 my-auto">
          {/* Emblem Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF9F7]/10 backdrop-blur-md border border-[#6A5D43]/40 text-[#C5A880] text-xs font-heading font-bold tracking-[0.25em] uppercase shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            AGUNG PROJECT
          </motion.div>

          {/* Grand Emblem Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center"
          >
            <Logo variant="emblem-only" size="xl" className="text-[#FAF9F7] drop-shadow-2xl" />
          </motion.div>

          {/* Interactive Tagline Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-[#FAF9F7] leading-[1.1]">
              DESIGN & BUILD <br />
              <span className="gold-gradient-text italic font-serif">YOUR IMAGINATION</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#FAF9F7]/80 font-body max-w-2xl mx-auto leading-relaxed">
              Mewujudkan kemewahan hunian dan karya furniture bespoke dengan sentuhan presisi arsitektural, material premium, dan keahlian kerajinan warisan Indonesia.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => onNavigate('catalog')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#6A5D43] hover:bg-[#8C7853] text-[#FAF9F7] text-xs font-heading font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl group"
            >
              Jelajahi Galeri & Catalog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FAF9F7]/10 hover:bg-[#FAF9F7]/20 border border-[#FAF9F7]/30 text-[#FAF9F7] text-xs font-heading font-bold uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm"
            >
              Konsultasi Desain Proyek
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. INFINITE SCROLL VELOCITY MARQUEE */}
      <ScrollVelocityMarquee />

      {/* 3. CORE VALUES & STUDIO EXCELLENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-[#6A5D43]">
            NILAI UNGGUL STUDIO
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#171818]">
            Prinsip Desain & Garansi Mutu
          </h2>
          <p className="text-xs sm:text-sm text-[#171818]/70">
            Setiap karya arsitektur dan furniture diproses dengan standar mutu tertinggi tanpa kompromi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 bg-[#F2EFE9] rounded-2xl border border-[#6A5D43]/20 space-y-4 hover:border-[#6A5D43] transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#171818] text-[#C5A880] flex items-center justify-center group-hover:bg-[#6A5D43] group-hover:text-white transition-colors">
              <Gem className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#171818]">
              Material Autentik
            </h3>
            <p className="text-xs text-[#171818]/80 leading-relaxed">
              Kayu Jati Perhutani Grade A, Marmer Carrara Italia, dan Kulit Asli Top-Grain yang dipilih secara teliti untuk ketahanan seumur hidup.
            </p>
          </div>

          <div className="p-8 bg-[#F2EFE9] rounded-2xl border border-[#6A5D43]/20 space-y-4 hover:border-[#6A5D43] transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#171818] text-[#C5A880] flex items-center justify-center group-hover:bg-[#6A5D43] group-hover:text-white transition-colors">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#171818]">
              Presisi Arsitektural
            </h3>
            <p className="text-xs text-[#171818]/80 leading-relaxed">
              Setiap sudut, sambungan mortise & tenon, serta pencahayaan diukur secara matematis demi ergonomi dan keindahan maksimal.
            </p>
          </div>

          <div className="p-8 bg-[#F2EFE9] rounded-2xl border border-[#6A5D43]/20 space-y-4 hover:border-[#6A5D43] transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#171818] text-[#C5A880] flex items-center justify-center group-hover:bg-[#6A5D43] group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#171818]">
              Garansi Konstruksi
            </h3>
            <p className="text-xs text-[#171818]/80 leading-relaxed">
              Jaminan garansi rangka dan struktur hingga 10 tahun sebagai bukti kepercayaan atas kualitas bahan & fabrikasi kami.
            </p>
          </div>

          <div className="p-8 bg-[#F2EFE9] rounded-2xl border border-[#6A5D43]/20 space-y-4 hover:border-[#6A5D43] transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#171818] text-[#C5A880] flex items-center justify-center group-hover:bg-[#6A5D43] group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#171818]">
              Bespoke Custom Tailored
            </h3>
            <p className="text-xs text-[#171818]/80 leading-relaxed">
              Ukuran, jenis finishing, warna kain, dan konfigurasi dapat dipesan secara custom sesuai ukuran tepat ruangan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FLAGSHIP WORKS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#6A5D43]/20 pb-6">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-[#6A5D43]">
              KOLEKSI EKSKLUSIF
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#171818] mt-1">
              Karya Flagship & Produk Bespoke
            </h2>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#6A5D43] hover:text-[#171818] transition-colors"
          >
            Lihat Semua Produk Katalog ({products.length})
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {flagshipProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer bg-[#F2EFE9] rounded-2xl overflow-hidden border border-[#6A5D43]/20 hover:border-[#6A5D43] transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#171818]/10">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-[#171818]/85 backdrop-blur-md text-[#C5A880] px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider">
                  {product.category}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#171818] group-hover:text-[#6A5D43] transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-xs text-[#171818]/70 line-clamp-2 mt-2 font-body">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#6A5D43]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6A5D43] block font-bold">
                      Harga Resmi
                    </span>
                    <span className="text-sm font-heading font-extrabold text-[#171818]">
                      {formatRupiah(product.price)}
                    </span>
                  </div>

                  <span className="w-9 h-9 rounded-full bg-[#171818] text-[#FAF9F7] flex items-center justify-center group-hover:bg-[#6A5D43] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROCESS TIMELINE */}
      <section className="bg-[#171818] text-[#FAF9F7] py-20 border-y border-[#6A5D43]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-[#C5A880]">
              TAHAPAN KERJA
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#FAF9F7]">
              Alur Eksekusi Proyek Studio
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF9F7]/70">
              Proses transparan dan terstruktur dari konsep ide awal hingga serah terima kunci.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-[#262727] rounded-2xl border border-[#6A5D43]/30 space-y-3 relative">
              <span className="text-3xl font-heading font-extrabold text-[#C5A880]">01</span>
              <h4 className="font-heading font-bold text-base text-[#FAF9F7]">Konsultasi & Layout 3D</h4>
              <p className="text-xs text-[#FAF9F7]/70 leading-relaxed">
                Diskusi kebutuhan ruang, pengukuran tapak presisi, dan pembuatan visualisasi 3D rendering ultra realistis.
              </p>
            </div>

            <div className="p-6 bg-[#262727] rounded-2xl border border-[#6A5D43]/30 space-y-3 relative">
              <span className="text-3xl font-heading font-extrabold text-[#C5A880]">02</span>
              <h4 className="font-heading font-bold text-base text-[#FAF9F7]">Kurasi Material</h4>
              <p className="text-xs text-[#FAF9F7]/70 leading-relaxed">
                Pemilihan sampel slab marmer, serat kayu jati, warna fabrik kulit, serta aksen logam bersama klien.
              </p>
            </div>

            <div className="p-6 bg-[#262727] rounded-2xl border border-[#6A5D43]/30 space-y-3 relative">
              <span className="text-3xl font-heading font-extrabold text-[#C5A880]">03</span>
              <h4 className="font-heading font-bold text-base text-[#FAF9F7]">Fabrikasi Craftsman</h4>
              <p className="text-xs text-[#FAF9F7]/70 leading-relaxed">
                Pengerjaan di bengkel kustom oleh tukang kayu senior berkeahlian tinggi dengan supervisi ketat.
              </p>
            </div>

            <div className="p-6 bg-[#262727] rounded-2xl border border-[#6A5D43]/30 space-y-3 relative">
              <span className="text-3xl font-heading font-extrabold text-[#C5A880]">04</span>
              <h4 className="font-heading font-bold text-base text-[#FAF9F7]">Instalasi & Handover</h4>
              <p className="text-xs text-[#FAF9F7]/70 leading-relaxed">
                Pengiriman terproteksi, pemasangan di lokasi proyek, serta sertifikat garansi resmi studio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
