import React from 'react';
import { MapPin, Navigation, Compass, Phone, Clock, ExternalLink } from 'lucide-react';

export const GoogleMapsView: React.FC = () => {
  // Monas Jakarta coordinates: -6.175392, 106.827153
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666323215886!2d106.82458427581144!3d-6.17539236051515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2db8c5617%3A0x4e44af24c15e8b4e!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid";
  const mapsDirectUrl = "https://maps.google.com/?q=-6.175392,106.827153";

  return (
    <div className="bg-[#171818] text-[#FAF9F7] rounded-2xl overflow-hidden border border-[#6A5D43]/30 shadow-2xl">
      <div className="p-6 md:p-8 border-b border-[#6A5D43]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#171818] to-[#262727]">
        <div>
          <div className="flex items-center gap-2 text-[#C5A880] text-xs font-bold tracking-[0.2em] uppercase mb-1">
            <Compass className="w-4 h-4" />
            STUDIO HQ & DESIGN GALLERY
          </div>
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-[#FAF9F7]">
            Monumen Nasional (Monas) Area, Jakarta Pusat
          </h3>
          <p className="text-sm text-[#FAF9F7]/70 mt-1">
            Jl. Medan Merdeka Barat No. 10, Gambir, Jakarta Pusat, DKI Jakarta 10110
          </p>
        </div>

        <a
          href={mapsDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#6A5D43] hover:bg-[#8C7853] text-[#FAF9F7] text-xs font-heading font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md hover:shadow-xl group"
        >
          <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          Buka Petunjuk Arah (Maps)
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      <div className="relative w-full h-[380px] md:h-[450px] bg-[#262727]">
        <iframe
          title="RUANG PINTAR Studio Map Location - Monas Jakarta"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>

        {/* Floating Custom Studio Marker Card overlay */}
        <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#171818]/95 backdrop-blur-md p-4 rounded-xl border border-[#6A5D43]/40 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6A5D43]/30 border border-[#C5A880] flex items-center justify-center text-[#C5A880] shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#FAF9F7]">
                RUANG PINTAR STUDIO
              </h4>
              <p className="text-xs text-[#C5A880] font-medium">
                Pusat Arsitektur & Interior
              </p>
              <div className="mt-2 pt-2 border-t border-[#6A5D43]/30 text-[11px] text-[#FAF9F7]/80 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#C5A880]" />
                  <span>Senin - Sabtu: 09:00 - 18:00 WIB</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#C5A880]" />
                  <span>+62 812-3456-7890 (Private Line)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
