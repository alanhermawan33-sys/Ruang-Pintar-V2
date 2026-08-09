import React from 'react';

interface LogoProps {
  variant?: 'full' | 'emblem-only' | 'compact' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-20',
    xl: 'h-32'
  };

  const emblemSizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36'
  };

  // Re-creating the emblem with SVG path & circular typography
  const Emblem = () => (
    <svg 
      viewBox="0 0 300 300" 
      className={`select-none ${emblemSizes[size]} ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle */}
      <circle cx="150" cy="150" r="142" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="150" cy="150" r="136" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      
      {/* Path for Top Text "RUANG" */}
      <path id="textPathTop" d="M 40,150 A 110,110 0 0,1 260,150" fill="none" />
      <text fill="currentColor" className="font-heading font-black tracking-[0.28em] text-[28px]">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          RUANG
        </textPath>
      </text>

      {/* Path for Subtop Text "DESIGN & BUILD YOUR IMAGINATION" */}
      <path id="textPathSub" d="M 58,150 A 92,92 0 0,1 242,150" fill="none" />
      <text fill="currentColor" className="font-heading font-bold tracking-[0.14em] text-[10px]">
        <textPath href="#textPathSub" startOffset="50%" textAnchor="middle">
          DESIGN & BUILD YOUR IMAGINATION
        </textPath>
      </text>

      {/* Path for Bottom Text "PINTAR" */}
      <path id="textPathBottom" d="M 260,150 A 110,110 0 0,1 40,150" fill="none" />
      <text fill="currentColor" className="font-heading font-black tracking-[0.28em] text-[28px]">
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          PINTAR
        </textPath>
      </text>

      {/* Center Artisan Craftsman Illustration Vector */}
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Worktable / Box with "Doa Ibu" */}
        <rect x="155" y="145" width="45" height="42" strokeWidth="2.2" />
        <line x1="155" y1="155" x2="200" y2="155" strokeWidth="1.5" />
        
        {/* Doa Ibu Text */}
        <text x="177" y="170" fill="currentColor" stroke="none" className="font-serif italic text-[9px]" textAnchor="middle">
          Doa
        </text>
        <text x="177" y="180" fill="currentColor" stroke="none" className="font-serif italic text-[9px]" textAnchor="middle">
          Ibu
        </text>

        {/* Craftsman Figure */}
        {/* Head */}
        <circle cx="152" cy="100" r="8" fill="currentColor" />
        {/* Torso & Vest */}
        <path d="M 140,112 L 160,112 L 158,142 L 138,142 Z" fill="currentColor" />
        {/* Arm with Hammer */}
        <path d="M 152,118 L 172,126 L 168,136" strokeWidth="2.5" />
        <rect x="166" y="136" width="7" height="10" fill="currentColor" />
        {/* Legs */}
        <path d="M 142,142 L 135,182 M 154,142 L 152,182" strokeWidth="3" />
        {/* Feet */}
        <path d="M 128,182 L 140,182 M 145,182 L 158,182" strokeWidth="3" />

        {/* Left Ornament */}
        <g strokeWidth="1.5">
          <path d="M 25,150 Q 15,140 25,130 Q 35,130 35,150 Q 35,170 25,170 Q 15,160 25,150" />
          <line x1="35" y1="150" x2="70" y2="150" />
          <circle cx="52" cy="150" r="10" />
          <path d="M 52,140 L 52,160 M 42,150 L 62,150" />
        </g>

        {/* Right Ornament */}
        <g strokeWidth="1.5">
          <path d="M 275,150 Q 285,140 275,130 Q 265,130 265,150 Q 265,170 275,170 Q 285,160 275,150" />
          <line x1="265" y1="150" x2="230" y2="150" />
          <circle cx="248" cy="150" r="10" />
          {/* Deer / Symbol icon */}
          <circle cx="248" cy="150" r="4" fill="currentColor" stroke="none" />
        </g>
      </g>

      {/* Subtext @RUANG_PINTAR */}
      <text x="150" y="222" fill="currentColor" className="font-heading font-semibold text-[11px] tracking-[0.2em]" textAnchor="middle">
        @RUANG_PINTAR
      </text>
    </svg>
  );

  if (variant === 'emblem-only') {
    return <Emblem />;
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Emblem />
        <div className="flex flex-col">
          <span className="font-heading font-extrabold tracking-[0.2em] text-lg leading-tight uppercase">
            RUANG PINTAR
          </span>
          <span className="text-[9px] font-semibold tracking-[0.25em] text-[#6A5D43] uppercase">
            ARCHITECTURE & INTERIOR
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Emblem />
      <div className="flex flex-col">
        <span className="font-heading font-extrabold tracking-[0.25em] text-xl sm:text-2xl leading-none uppercase">
          RUANG PINTAR
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-[#6A5D43] uppercase mt-1">
          DESIGN & BUILD YOUR IMAGINATION
        </span>
      </div>
    </div>
  );
};
