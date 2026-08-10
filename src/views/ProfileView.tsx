import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, ShieldCheck, Users, CheckCircle2, HeartHandshake } from 'lucide-react';
import { Logo } from '../components/Logo';

export const ProfileView: React.FC = () => {
  const teamMembers = [
    {
      name: 'Aditya Pratama, S.Ars., IAI',
      role: 'Principal Architect & Founder',
      image: 'https://raw.githubusercontent.com/alanhermawan33-sys/Ruang-Pintar-V2/main/src/asset/temanagung.jpeg',
      description: 'Lulusan Arsitektur ITB dengan pengalaman 15+ tahun merancang villa mewah dan panggung eksibisi di Jakarta & Bali.'
    },
    {
      name: 'Clarissa Natalia, M.Des',
      role: 'Head of Interior & Bespoke Design',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
      description: 'Spesialis kurasi tekstil mewah dan integrasi material alam marmer Italia dengan fungsionalitas ruang modern.'
    },
    {
      name: 'Bapak Sugeng Utomo',
      role: 'Master Craftsman & Workshop Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      description: 'Ahli ukir kayu jati perhutani berpengalaman 28 tahun yang memimpin langsung para pengrajin di bengkel kustom studio.'
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Hero Studio Banner */}
      <div className="relative p-8 sm:p-14 bg-[#171818] text-[#FAF9F7] rounded-3xl overflow-hidden border border-[#6A5D43]/40 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F7]/10 text-[#C5A880] text-xs font-heading font-bold tracking-[0.2em] uppercase border border-[#6A5D43]/40">
            PROFIL STUDIO
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-bold leading-tight">
            Warisan Kerajinan & Presisi Arsitektur Modern
          </h1>

          <p className="text-xs sm:text-sm text-[#FAF9F7]/80 leading-relaxed font-body">
            RUANG PINTAR berdiri atas komitmen menghadirkan karya arsitektur dan interior berseni tinggi. Kami memadukan tradisi bertukang kayu jati pilihan dengan filosofi arsitektur kontemporer yang abadi.
          </p>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none hidden lg:block">
          <Logo variant="emblem-only" size="xl" className="text-[#FAF9F7]" />
        </div>
      </div>

      {/* Story & Philosophy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-[#6A5D43]">
            CERITA & FILOSOFI
          </span>
          <h2 className="text-3xl font-heading font-bold text-[#171818]">
            Penghormatan Pada Proses & Kualitas
          </h2>
          <p className="text-xs sm:text-sm text-[#171818]/80 leading-relaxed font-body">
            Logo kami menampilkan sosok pengrajin senior bertumpu pada peti berstempel <em className="font-serif font-bold text-[#6A5D43]">"Doa Ibu"</em>. Ini merupakan simbol rasa hormat kami pada dedikasi, kejujuran karya, dan doa tulus yang menyertai setiap proses pembuatan.
          </p>
          <p className="text-xs sm:text-sm text-[#171818]/80 leading-relaxed font-body">
            Kami percaya bahwa rumah dan furnitur bukan sekadar ruang fisik, melainkan tempat berlindung tempat memori berharga diukir. Oleh karena itu, setiap detail sambungan kayu, pilihan permukaan marmer, hingga tata cahaya dirancang secara cermat demi memberikan kebahagiaan sejati.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#6A5D43]/20">
            <div>
              <span className="block text-2xl font-heading font-bold text-[#6A5D43]">15+ Tahun</span>
              <span className="text-xs text-[#171818]/70">Pengalaman Karya Studio</span>
            </div>
            <div>
              <span className="block text-2xl font-heading font-bold text-[#6A5D43]">200+ Proyek</span>
              <span className="text-xs text-[#171818]/70">Villa & Penthouse Selesai</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#6A5D43]/30 aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
            alt="Craftsman Studio Workshop"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Lead Professional Team */}
      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-[#6A5D43]">
            TIM PROFESIONAL
          </span>
          <h2 className="text-3xl font-heading font-bold text-[#171818]">
            Principal Architect & Lead Craftsmen
          </h2>
          <p className="text-xs sm:text-sm text-[#171818]/70">
            Para pakar di balik perancangan dan fabrikasi karya RUANG PINTAR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-[#F2EFE9] rounded-2xl overflow-hidden border border-[#6A5D43]/20 space-y-4 p-6 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-[#171818]/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-[#171818]">
                  {member.name}
                </h3>
                <span className="text-xs font-bold text-[#6A5D43] block mt-0.5 uppercase tracking-wider">
                  {member.role}
                </span>
                <p className="text-xs text-[#171818]/70 mt-3 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
