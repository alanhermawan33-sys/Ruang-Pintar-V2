import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { GoogleMapsView } from '../components/GoogleMapsView';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Desain Interior Rumah');
  const [budget, setBudget] = useState('Rp 50 Juta - Rp 150 Juta');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Build direct WhatsApp message
    const studioPhone = "6281234567890";
    let text = `*KONSULTASI DESAIN - RUANG PINTAR STUDIO*\n`;
    text += `------------------------------------\n`;
    text += `• *Nama:* ${name}\n`;
    text += `• *Email:* ${email || '-'}\n`;
    text += `• *No. HP:* ${phone}\n`;
    text += `• *Jenis Proyek:* ${projectType}\n`;
    text += `• *Estimasi Budget:* ${budget}\n`;
    text += `• *Pesan Detail:* ${message || '-'}\n\n`;
    text += `Halo Admin RUANG PINTAR, saya bermaksud mengajukan pertanyaan/konsultasi mengenai proyek di atas. Mohon dapat dihubungi kembali. Terima kasih.`;

    const waUrl = `https://wa.me/${studioPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-[#6A5D43]">
          HUBUNGI STUDIO
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#171818]">
          Konsultasi & Kontak Studio
        </h1>
        <p className="text-xs sm:text-sm text-[#171818]/70">
          Tim arsitek kami siap membantu mewujudkan impian hunian dan furniture kustom Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Info & Operational Hours (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#171818] text-[#FAF9F7] p-8 rounded-3xl border border-[#6A5D43]/40 shadow-2xl space-y-6">
            <h3 className="font-heading font-bold text-xl text-[#FAF9F7]">
              RUANG PINTAR Headquarters
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#FAF9F7] text-sm">Lokasi Studio:</strong>
                  <span className="text-[#FAF9F7]/70 leading-relaxed block mt-0.5">
                    Area Monumen Nasional (Monas), Jl. Medan Merdeka Barat No. 10, Jakarta Pusat 10110
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#6A5D43]/20">
                <Phone className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#FAF9F7] text-sm">Telepon & WhatsApp:</strong>
                  <span className="text-[#FAF9F7]/70 block mt-0.5">+62 812-3456-7890</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#6A5D43]/20">
                <Mail className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#FAF9F7] text-sm">Email Inquiry:</strong>
                  <span className="text-[#FAF9F7]/70 block mt-0.5">inquiry@ruangpintar.co.id</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#6A5D43]/20">
                <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#FAF9F7] text-sm">Jam Operasional:</strong>
                  <span className="text-[#FAF9F7]/70 block mt-0.5">Senin - Sabtu: 09.00 - 18.00 WIB</span>
                  <span className="text-[#C5A880] text-[10px] block italic mt-0.5">
                    *Kunjungan galeri disarankan membuat janji temu terlebih dahulu.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#F2EFE9] p-8 sm:p-10 rounded-3xl border border-[#6A5D43]/30 shadow-lg space-y-6">
          <div>
            <h3 className="font-heading font-bold text-2xl text-[#171818]">
              Formulir Janji Temu & Konsultasi
            </h3>
            <p className="text-xs text-[#171818]/70 mt-1">
              Isi data berikut untuk terhubung langsung dengan Tim Advisor Arsitek kami.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-900 text-white rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-heading font-bold text-lg">Pesan Terkirim Ke WhatsApp!</h4>
              <p className="text-xs text-emerald-100">
                Terima kasih telah menghubungi RUANG PINTAR Studio. Kami akan segera merespon konsultasi Anda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#171818] mb-1">
                    Nama Lengkap <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bapak / Ibu..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#171818] mb-1">
                    Nomor WhatsApp / HP <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#171818] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none focus:border-[#6A5D43]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#171818] mb-1">Jenis Proyek</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none"
                  >
                    <option value="Pembuatan Furniture Bespoke">Pembuatan Furniture Bespoke</option>
                    <option value="Desain Interior Rumah / Villa">Desain Interior Rumah / Villa</option>
                    <option value="Desain & Pembangunan Arsitektur">Desain & Pembangunan Arsitektur</option>
                    <option value="Executive Office / Commercial">Executive Office / Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#171818] mb-1">Pesan / Detail Kebutuhan</label>
                <textarea
                  rows={4}
                  placeholder="Jelaskan kebutuhan lokasi, ukuran ruangan, atau inspirasi desain Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-[#6A5D43]/30 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#6A5D43] hover:bg-[#8C7853] text-[#FAF9F7] font-heading font-bold uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                <Send className="w-4 h-4 text-[#C5A880]" />
                Kirim Konsultasi via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Google Maps Section (Monas Jakarta) */}
      <div className="space-y-4 pt-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-[#6A5D43]">
            INTERAKTIF GOOGLE MAPS
          </span>
          <h2 className="text-2xl font-heading font-bold text-[#171818]">
            Peta Lokasi Galeri & Studio (Area Monas Jakarta)
          </h2>
        </div>
        <GoogleMapsView />
      </div>
    </div>
  );
};
