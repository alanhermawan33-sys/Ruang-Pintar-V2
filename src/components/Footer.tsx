import React, { useState } from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Instagram, ArrowUp, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'catalog' | 'profile' | 'contact') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const [clickCount, setClickCount] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Secret trigger: Clicking copyright 3 times opens admin login
  const handleCopyrightClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 3) {
      onOpenAdmin();
      setClickCount(0);
    } else {
      setClickCount(newCount);
    }
  };

  return (
    <footer className="bg-[#171818] text-[#FAF9F7] pt-16 pb-12 border-t border-[#6A5D43]/40 relative overflow-hidden">
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#6A5D43]/20">
          {/* Col 1: Brand Emblem & Manifesto (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Logo variant="full" size="md" className="text-[#FAF9F7]" />
            <p className="text-xs sm:text-sm text-[#FAF9F7]/70 leading-relaxed max-w-md font-body">
              RUANG PINTAR adalah studio arsitektur dan interior mewah yang mendedikasikan presisi teknik modern, warisan kerajinan kayu jati asli, serta keanggunan estetika tanpa waktu untuk hunian dan karya komersial berkelas.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com/ruang_pintar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF9F7]/5 hover:bg-[#6A5D43] text-[#C5A880] hover:text-[#FAF9F7] border border-[#6A5D43]/40 flex items-center justify-center transition-all duration-300"
                title="Instagram @RUANG_PINTAR"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF9F7]/5 hover:bg-[#6A5D43] text-[#C5A880] hover:text-[#FAF9F7] border border-[#6A5D43]/40 flex items-center justify-center transition-all duration-300"
                title="WhatsApp Advisory"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-[#C5A880]">
              Struktur Navigasi
            </h4>
            <ul className="space-y-2.5 text-xs font-body text-[#FAF9F7]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Dashboard / Home Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Galeri Katalog & Furniture Bespoke
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Profil Studio & Tim Arsitek
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Kontak Studio & Peta Monas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Contact (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-[#C5A880]">
              Pusat Galeri & Studio
            </h4>
            <div className="space-y-3 text-xs text-[#FAF9F7]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>
                  Monumen Nasional (Monas) Area, Jl. Medan Merdeka Barat No. 10, Jakarta Pusat, DKI Jakarta 10110
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+62 812-3456-7890 (Direct Studio Line)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>inquiry@ruangpintar.co.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Secret Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF9F7]/50">
          <div
            onClick={handleCopyrightClick}
            className="cursor-pointer select-none hover:text-[#FAF9F7]/80 transition-colors"
            title="RUANG PINTAR Architectural Studio"
          >
            © {new Date().getFullYear()} RUANG PINTAR Studio. Hak Cipta Dilindungi. Design & Build Your Imagination.
          </div>

          <div className="flex items-center gap-6">
            {/* Secret URL hint icon for user access */}
            <span
              onClick={onOpenAdmin}
              className="text-[10px] opacity-20 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1"
              title="Akses Administrator Control Center (?admin)"
            >
              <Shield className="w-3 h-3 text-[#C5A880]" />
              Portal Studio
            </span>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#FAF9F7]/10 hover:bg-[#6A5D43] text-[#FAF9F7] transition-all duration-300"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
