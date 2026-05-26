import type { ComponentType } from 'react';
import { Car, CircleGauge, Disc3, Gauge, ShieldCheck, Wrench, Zap } from 'lucide-react';

export type InspectionSpotId =
  | 'motore'
  | 'freni'
  | 'sospensioni'
  | 'elettronica'
  | 'carrozzeria'
  | 'interni'
  | 'sicurezza';

type InspectionSpot = {
  id: InspectionSpotId;
  title: string;
  x: string;
  y: string;
  icon: ComponentType<{ className?: string }>;
};

const spots: InspectionSpot[] = [
  { id: 'motore', title: 'Motore e trasmissione', x: '28%', y: '49%', icon: Wrench },
  { id: 'freni', title: 'Impianto frenante', x: '29%', y: '76%', icon: Disc3 },
  { id: 'sospensioni', title: 'Sospensioni e sterzo', x: '70%', y: '77%', icon: CircleGauge },
  { id: 'elettronica', title: 'Elettronica e centraline', x: '64%', y: '54%', icon: Zap },
  { id: 'carrozzeria', title: 'Carrozzeria e vernice', x: '49%', y: '34%', icon: ShieldCheck },
  { id: 'interni', title: 'Interni e dotazioni', x: '57%', y: '43%', icon: Car },
  { id: 'sicurezza', title: 'Sicurezza e airbag', x: '79%', y: '50%', icon: Gauge },
];

type Props = {
  activeSpot?: InspectionSpotId;
  onSpotChange?: (spot: InspectionSpotId | undefined) => void;
};

export function CarInspectionDiagram({ activeSpot, onSpotChange }: Props) {
  const hasActive = Boolean(activeSpot);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-cyan/20 bg-[#061827] p-4 shadow-glow sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(18,207,244,.20),transparent_28%),radial-gradient(circle_at_75%_55%,rgba(18,207,244,.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(18,207,244,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(18,207,244,.65)_1px,transparent_1px)] [background-size:36px_36px]" />

      <svg
        viewBox="0 0 1100 520"
        className="relative z-10 h-auto w-full overflow-visible"
        role="img"
        aria-label="Schema tecnico dell’auto con punti di controllo interattivi"
      >
        <defs>
          <linearGradient id="golfBodyFill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0D2438" stopOpacity="0.98" />
            <stop offset="55%" stopColor="#132D42" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#081522" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="golfStroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#F2FBFF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#9EEFFF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#12CFF4" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="activeGlow" x1="0" x2="1">
            <stop stopColor="#12CFF4" stopOpacity="0.2" />
            <stop offset="1" stopColor="#12CFF4" stopOpacity="0" />
          </linearGradient>
          <filter id="carGlow" x="-20%" y="-30%" width="140%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="560" cy="404" rx="405" ry="54" fill="#01070D" opacity="0.68" />
        <ellipse cx="560" cy="398" rx="330" ry="32" fill="#12CFF4" opacity="0.06" />

        {/* Golf-like compact hatchback body, no logo */}
        <g
          className={`origin-center transition-transform duration-500 ease-out ${hasActive ? 'scale-[1.018]' : 'scale-100'}`}
          filter="url(#carGlow)"
        >
          <path
            d="M117 333 C133 292 177 268 253 257 L331 195 C383 154 447 133 535 135 L679 139 C750 143 804 170 858 215 L945 237 C1007 253 1038 286 1048 331 L1018 356 L946 356 C934 300 896 268 840 268 C783 268 741 305 731 358 L372 358 C360 304 320 270 264 270 C209 270 166 306 157 358 L101 355 C79 350 84 342 117 333 Z"
            fill="url(#golfBodyFill)"
            stroke="url(#golfStroke)"
            strokeWidth="3.4"
            strokeLinejoin="round"
          />

          {/* hatchback roof and windows */}
          <path
            d="M304 257 L370 201 C414 166 464 151 535 152 L661 155 C723 158 769 181 818 222 L304 257 Z"
            fill="#06111F"
            opacity="0.82"
            stroke="#DDF8FF"
            strokeOpacity="0.5"
            strokeWidth="2"
          />
          <path d="M392 199 L386 255" stroke="#12CFF4" strokeOpacity="0.34" strokeWidth="2" />
          <path d="M529 153 L522 250" stroke="#12CFF4" strokeOpacity="0.34" strokeWidth="2" />
          <path d="M661 158 L681 247" stroke="#12CFF4" strokeOpacity="0.34" strokeWidth="2" />

          {/* doors, hood, front and rear details */}
          <g fill="none" stroke="#DDF8FF" strokeLinecap="round" strokeLinejoin="round">
            <path d="M145 323 C185 296 232 281 310 267" strokeOpacity="0.46" strokeWidth="2" />
            <path d="M174 307 L303 304" strokeOpacity="0.35" strokeWidth="1.8" />
            <path d="M333 283 L698 281" strokeOpacity="0.31" strokeWidth="1.8" />
            <path d="M718 280 L942 295" strokeOpacity="0.42" strokeWidth="1.8" />
            <path d="M150 333 L214 333" strokeOpacity="0.45" strokeWidth="2" />
            <path d="M368 333 L736 333" strokeOpacity="0.45" strokeWidth="2" />
            <path d="M925 333 L1025 333" strokeOpacity="0.45" strokeWidth="2" />
            <path d="M801 221 C846 232 889 236 935 243" strokeOpacity="0.4" strokeWidth="2" />
            <path d="M930 263 L1018 284" strokeOpacity="0.35" strokeWidth="2" />
            <path d="M146 339 L198 345" strokeOpacity="0.3" strokeWidth="1.5" />
            <path d="M307 256 L310 333" strokeOpacity="0.25" strokeWidth="1.5" />
            <path d="M518 253 L514 334" strokeOpacity="0.25" strokeWidth="1.5" />
            <path d="M704 258 L724 334" strokeOpacity="0.25" strokeWidth="1.5" />
          </g>

          {/* wireframe mesh */}
          <g opacity="0.16" stroke="#12CFF4" strokeWidth="1">
            {Array.from({ length: 10 }).map((_, i) => (
              <path key={`mesh-h-${i}`} d={`M150 ${245 + i * 13} C310 ${225 + i * 8} 720 ${225 + i * 8} 1012 ${268 + i * 8}`} fill="none" />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={`mesh-v-${i}`} d={`M${190 + i * 58} 237 L${160 + i * 61} 356`} fill="none" />
            ))}
          </g>

          {/* wheels */}
          <g fill="#06111F" stroke="#E8FBFF" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="264" cy="358" r="68" strokeOpacity="0.86" strokeWidth="3.2" />
            <circle cx="264" cy="358" r="43" strokeOpacity="0.42" strokeWidth="2" />
            <circle cx="840" cy="358" r="68" strokeOpacity="0.86" strokeWidth="3.2" />
            <circle cx="840" cy="358" r="43" strokeOpacity="0.42" strokeWidth="2" />
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i * Math.PI) / 5;
              return (
                <g key={i} opacity="0.34">
                  <line x1={264} y1={358} x2={264 + Math.cos(a) * 57} y2={358 + Math.sin(a) * 57} strokeWidth="1.2" />
                  <line x1={840} y1={358} x2={840 + Math.cos(a) * 57} y2={358 + Math.sin(a) * 57} strokeWidth="1.2" />
                </g>
              );
            })}
          </g>
        </g>

        {/* active highlight beams */}
        {activeSpot && (
          <g className="pointer-events-none opacity-80 transition-opacity duration-300">
            <circle
              cx={spots.find((s) => s.id === activeSpot)?.x.replace('%', '')}
              cy={spots.find((s) => s.id === activeSpot)?.y.replace('%', '')}
              r="0"
              fill="transparent"
            />
          </g>
        )}
      </svg>

      {spots.map((spot) => {
        const Icon = spot.icon;
        const active = activeSpot === spot.id;
        return (
          <button
            key={spot.id}
            type="button"
            aria-label={spot.title}
            onMouseEnter={() => onSpotChange?.(spot.id)}
            onMouseLeave={() => onSpotChange?.(undefined)}
            onFocus={() => onSpotChange?.(spot.id)}
            onBlur={() => onSpotChange?.(undefined)}
            className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
            style={{ left: spot.x, top: spot.y }}
          >
            <span
              className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-xl transition duration-300 ${
                active ? 'scale-150 opacity-100' : 'scale-100 opacity-60 group-hover:scale-125 group-hover:opacity-100'
              }`}
            />
            <span
              className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-cyan shadow-glow transition duration-300 ${
                active ? 'scale-150 ring-8 ring-cyan/20' : 'scale-100 group-hover:scale-125 group-hover:ring-8 group-hover:ring-cyan/20'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <span
              className={`pointer-events-none absolute left-1/2 top-8 min-w-max -translate-x-1/2 rounded-xl border border-cyan/25 bg-navy/95 px-3 py-2 text-xs font-semibold text-white shadow-glow backdrop-blur transition duration-200 ${
                active ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 md:opacity-90'
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-cyan" />
                {spot.title}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
