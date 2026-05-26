import type { ComponentType } from 'react';
import { Car, CircleGauge, Disc3, Gauge, ShieldCheck, Wrench, Zap } from 'lucide-react';

type InspectionSpot = {
  id: string;
  title: string;
  x: string;
  y: string;
  icon: ComponentType<{ className?: string }>;
};

const spots: InspectionSpot[] = [
  { id: 'motore', title: 'Motore', x: '27%', y: '44%', icon: Wrench },
  { id: 'freni', title: 'Freni', x: '34%', y: '68%', icon: Disc3 },
  { id: 'vernice', title: 'Carrozzeria', x: '49%', y: '33%', icon: ShieldCheck },
  { id: 'interni', title: 'Interni', x: '59%', y: '44%', icon: Car },
  { id: 'elettronica', title: 'OBD-II', x: '68%', y: '58%', icon: Zap },
  { id: 'km', title: 'Chilometraggio', x: '77%', y: '38%', icon: Gauge },
  { id: 'sospensioni', title: 'Sospensioni', x: '80%', y: '69%', icon: CircleGauge },
];

export function CarInspectionDiagram() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-cyan/15 bg-navy/70 p-6 shadow-glow lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(18,207,244,.18),transparent_34%),radial-gradient(circle_at_75%_70%,rgba(18,207,244,.1),transparent_28%)]" />

      <svg
        viewBox="0 0 960 420"
        className="relative z-10 h-auto w-full"
        role="img"
        aria-label="Schema auto con punti di controllo"
      >
        <defs>
          <linearGradient id="carStroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#DDF8FF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#12CFF4" stopOpacity="0.6" />
          </linearGradient>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* floor shadow */}
        <ellipse cx="500" cy="340" rx="345" ry="48" fill="#020B14" opacity="0.55" />

        {/* technical reference lines */}
        <g opacity="0.12" stroke="#12CFF4" strokeWidth="1">
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v-${i}`} x1={110 + i * 65} y1="40" x2={110 + i * 65} y2="360" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`h-${i}`} x1="70" y1={70 + i * 45} x2="890" y2={70 + i * 45} />
          ))}
        </g>

        {/* car body */}
        <g fill="none" stroke="url(#carStroke)" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M102 270 C128 226 168 204 244 193 L316 132 C349 105 395 91 460 92 L610 94 C681 97 731 124 778 169 L844 188 C886 201 909 224 920 266 L892 286 L835 287 C825 236 790 205 741 205 C691 205 655 238 646 287 L321 287 C311 238 275 206 225 205 C174 204 138 238 129 288 L94 286 C82 283 82 279 102 270 Z"
            strokeWidth="3"
            opacity="0.88"
          />
          <path d="M286 193 L348 137 C375 114 415 105 464 105 L594 107 C653 110 693 131 733 174 L286 193 Z" strokeWidth="2" opacity="0.7" />
          <path d="M359 139 L364 191" strokeWidth="2" opacity="0.45" />
          <path d="M486 108 L482 189" strokeWidth="2" opacity="0.45" />
          <path d="M612 112 L626 188" strokeWidth="2" opacity="0.45" />
          <path d="M145 238 L258 229" strokeWidth="2" opacity="0.45" />
          <path d="M328 214 L620 211" strokeWidth="2" opacity="0.35" />
          <path d="M646 214 L832 229" strokeWidth="2" opacity="0.45" />
          <path d="M120 269 L187 269" strokeWidth="2" opacity="0.55" />
          <path d="M310 269 L654 269" strokeWidth="2" opacity="0.55" />
          <path d="M823 269 L912 269" strokeWidth="2" opacity="0.55" />

          {/* hood / engine bay lines */}
          <path d="M114 261 C151 236 199 220 280 209" strokeWidth="1.6" opacity="0.5" />
          <path d="M145 250 L270 250" strokeWidth="1.6" opacity="0.4" />
          <path d="M170 235 L256 226" strokeWidth="1.6" opacity="0.35" />
        </g>

        {/* wheels */}
        <g fill="none" stroke="#DDF8FF" strokeLinecap="round" opacity="0.74">
          <circle cx="225" cy="288" r="58" strokeWidth="3" />
          <circle cx="225" cy="288" r="35" strokeWidth="2" opacity="0.45" />
          <circle cx="741" cy="288" r="58" strokeWidth="3" />
          <circle cx="741" cy="288" r="35" strokeWidth="2" opacity="0.45" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <g key={i} opacity="0.35">
                <line x1={225} y1={288} x2={225 + Math.cos(a) * 48} y2={288 + Math.sin(a) * 48} strokeWidth="1" />
                <line x1={741} y1={288} x2={741 + Math.cos(a) * 48} y2={288 + Math.sin(a) * 48} strokeWidth="1" />
              </g>
            );
          })}
        </g>

        {/* subtle scan lines */}
        <g opacity="0.18" stroke="#12CFF4" strokeDasharray="6 12">
          <path d="M190 78 H760" />
          <path d="M145 318 H825" />
        </g>
      </svg>

      {spots.map((spot) => {
        const Icon = spot.icon;
        return (
          <div
            key={spot.id}
            className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: spot.x, top: spot.y }}
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-cyan/40 blur-md" />
              <span className="relative flex h-4 w-4 rounded-full border-2 border-white bg-cyan shadow-glow" />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-6 min-w-max -translate-x-1/2 rounded-xl border border-cyan/20 bg-navy/90 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-glow backdrop-blur transition-opacity duration-200 group-hover:opacity-100 md:opacity-100">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-cyan" />
                {spot.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
