import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, MessageSquare, Compass, Phone } from 'lucide-react';
// Import Logo lama dihapus karena kita sudah pakai gambar langsung

interface NavbarProps {
  activeTab: 'home' | 'catalog' | 'profile' | 'contact';
  setActiveTab: (tab: 'home' | 'catalog' | 'profile' | 'contact') => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Dashboard / Home' },
    { id: 'catalog', label: 'Galeri Catalog' },
    { id: 'profile', label: 'Profile (About Us)' },
    { id: 'contact', label: 'Kontak Studio' },
  ] as const;

  const studioWhatsApp = "https://wa.me/6281234567890?text=Halo%20Admin%20RUANG%20PINTAR%2C%20saya%20ingin%20berkonsultasi%20mengenai%20proyek%20arsitektur%20%2F%20interior.";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#171818]/90 backdrop-blur-md text-[#FAF9F7] py-3 shadow-2xl border-b border-[#6A5D43]/30'
          : 'bg-[#FAF9F7]/90 backdrop-blur-sm text-[#171818] py-5 border-b border-[#6A5D43]/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo / Brand - SUDAH MENGGUNAKAN LOGO PNG BARU */}
        <button
          onClick={() => setActiveTab('home')}
          className="text-left focus:outline-none group flex items-center gap-3"
        >
          <img 
            src="https://sumywlwhlwcczhxclijt.supabase.co/storage/v1/object/public/products/21-removebg-preview.png" 
            alt="Ruang Pintar Logo" 
            className={`w-12 h-12 object-contain transition-all duration-300 ${isScrolled ? 'brightness-0 invert' : ''}`}
          />
          <div className="hidden sm:block">
            <h1 className={`font-heading font-extrabold text-lg tracking-wider transition-colors duration-300 ${isScrolled ? 'text-[#FAF9F7]' : 'text-[#171818]'}`}>
              RUANG PINTAR
            </h1>
            <p className={`text-[10px] font-semibold tracking-widest uppercase transition-colors duration-300 ${isScrolled ? 'text-[#C5A880]' : 'text-[#6A5D43]'}`}>
              DESIGN & BUILD YOUR IMAGINATION
            </p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1 text-xs font-heading font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${
                  isActive
                    ? isScrolled
                      ? 'text-[#C5A880]'
                      : 'text-[#6A5D43]'
                    : isScrolled
                    ? 'text-[#FAF9F7]/80 hover:text-[#C5A880]'
                    : 'text-[#171818]/70 hover:text-[#6A5D43]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                      isScrolled ? 'bg-[#C5A880]' : 'bg-[#6A5D43]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Trigger Badge */}
          <button
            onClick={onOpenCart}
            className={`relative p-2.5 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-[#FAF9F7]/10 hover:bg-[#FAF9F7]/20 text-[#FAF9F7]'
                : 'bg-[#171818]/5 hover:bg-[#171818]/10 text-[#171818]'
            }`}
            title="Buka Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#6A5D43] text-[#FAF9F7] text-[10px] font-bold flex items-center justify-center animate-pulse border border-[#FAF9F7]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick WA Consultation */}
          <a
            href={studioWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#6A5D43] hover:bg-[#8C7853] text-[#FAF9F7] text-xs font-heading font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
            Konsultasi Studio
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled ? 'text-[#FAF9F7]' : 'text-[#171818]'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171818] text-[#FAF9F7] border-b border-[#6A5D43]/40 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-3 px-4 rounded-xl text-xs font-heading font-bold uppercase tracking-widest transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#6A5D43] text-[#FAF9F7]'
                    : 'text-[#FAF9F7]/80 hover:bg-[#FAF9F7]/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#6A5D43]/30">
            <a
              href={studioWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#6A5D43] text-[#FAF9F7] text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              Hubungi Studio via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
