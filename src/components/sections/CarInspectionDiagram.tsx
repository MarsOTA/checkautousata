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
  { id: 'motore', title: 'Motore e trasmissione', x: '25%', y: '55%', icon: Wrench },
  { id: 'freni', title: 'Impianto frenante', x: '31%', y: '73%', icon: Disc3 },
  { id: 'sospensioni', title: 'Sospensioni e sterzo', x: '76%', y: '73%', icon: CircleGauge },
  { id: 'elettronica', title: 'Elettronica e centraline', x: '59%', y: '58%', icon: Zap },
  { id: 'carrozzeria', title: 'Carrozzeria e vernice', x: '48%', y: '31%', icon: ShieldCheck },
  { id: 'interni', title: 'Interni e dotazioni', x: '56%', y: '43%', icon: Car },
  { id: 'sicurezza', title: 'Sicurezza e airbag', x: '72%', y: '49%', icon: Gauge },
];

type Props = {
  activeSpot?: InspectionSpotId;
  onSpotChange?: (spot: InspectionSpotId | undefined) => void;
};

export function CarInspectionDiagram({ activeSpot, onSpotChange }: Props) {
  const hasActive = Boolean(activeSpot);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-cyan/20 bg-[#061827] p-4 shadow-glow sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(18,207,244,.20),transparent_28%),radial-gradient(circle_at_75%_55%,rgba(18,207,244,.14),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(18,207,244,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(18,207,244,.65)_1px,transparent_1px)] [background-size:36px_36px]" />

      <svg
        viewBox="0 0 1100 520"
        className="relative z-10 h-auto w-full overflow-visible"
        role="img"
        aria-label="Schema tecnico stile hatchback compatta con punti di controllo interattivi"
      >
        <defs>
          <linearGradient id="bodyFillGolfMk" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0B2234" stopOpacity="0.98" />
            <stop offset="55%" stopColor="#122E44" stopOpacity="0.86" />
            <stop offset="100%" stopColor="#06111F" stopOpacity="0.96" />
          </linearGradient>
          <linearGradient id="bodyStrokeGolfMk" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#F4FCFF" stopOpacity="0.95" />
            <stop offset="52%" stopColor="#A8F3FF" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#12CFF4" stopOpacity="0.62" />
          </linearGradient>
          <linearGradient id="glassGolfMk" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#07111F" stopOpacity="0.96" />
            <stop offset="1" stopColor="#0E3349" stopOpacity="0.78" />
          </linearGradient>
          <filter id="carNeonGlow" x="-20%" y="-30%" width="140%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softSpotGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="560" cy="411" rx="420" ry="58" fill="#01070D" opacity="0.72" />
        <ellipse cx="560" cy="404" rx="350" ry="34" fill="#12CFF4" opacity="0.065" />

        {/* Compact hatchback silhouette: proportions inspired by a VW Golf, no logos or brand marks */}
        <g
          className={`origin-center transition-transform duration-500 ease-out ${hasActive ? 'scale-[1.022]' : 'scale-100'}`}
          filter="url(#carNeonGlow)"
        >
          {/* main body: short hood, five-door cabin, vertical rear hatch */}
          <path
            d="M108 338
               C126 305 159 286 223 276
               C252 250 285 223 329 195
               C389 156 460 141 548 143
               L676 147
               C733 151 783 171 829 207
               L879 246
               C940 253 997 273 1025 317
               L1046 352
               L1004 364
               L936 364
               C927 306 886 271 828 271
               C769 271 728 309 720 366
               L374 366
               C366 309 324 272 266 272
               C207 272 165 309 156 365
               L115 364
               C84 361 78 350 108 338 Z"
            fill="url(#bodyFillGolfMk)"
            stroke="url(#bodyStrokeGolfMk)"
            strokeWidth="3.4"
            strokeLinejoin="round"
          />

          {/* glasshouse with Golf-like thick C pillar and short rear */}
          <path
            d="M304 273
               L365 206
               C414 166 475 153 555 155
               L655 158
               C716 160 761 180 804 216
               L836 244
               L756 254
               L304 273 Z"
            fill="url(#glassGolfMk)"
            stroke="#DDF8FF"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* window divisions and B/C pillars */}
          <path d="M385 203 L374 267" stroke="#12CFF4" strokeOpacity="0.42" strokeWidth="2" />
          <path d="M515 156 L506 260" stroke="#12CFF4" strokeOpacity="0.38" strokeWidth="2" />
          <path d="M642 158 L669 257" stroke="#12CFF4" strokeOpacity="0.38" strokeWidth="2" />
          <path d="M742 186 L754 255" stroke="#12CFF4" strokeOpacity="0.34" strokeWidth="2" />

          {/* belt line, doors, hood, hatch and lamps */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M138 335 C201 307 288 289 374 281 L735 279 C821 282 924 295 1018 324" stroke="#EFFBFF" strokeOpacity="0.48" strokeWidth="2.2" />
            <path d="M176 321 L329 318" stroke="#12CFF4" strokeOpacity="0.34" strokeWidth="2" />
            <path d="M352 319 L712 319" stroke="#12CFF4" strokeOpacity="0.28" strokeWidth="2" />
            <path d="M762 318 L1014 326" stroke="#12CFF4" strokeOpacity="0.36" strokeWidth="2" />
            <path d="M325 274 L315 356" stroke="#DDF8FF" strokeOpacity="0.28" strokeWidth="1.8" />
            <path d="M500 265 L495 356" stroke="#DDF8FF" strokeOpacity="0.28" strokeWidth="1.8" />
            <path d="M684 265 L704 356" stroke="#DDF8FF" strokeOpacity="0.28" strokeWidth="1.8" />
            <path d="M811 244 L823 354" stroke="#DDF8FF" strokeOpacity="0.24" strokeWidth="1.6" />
            <path d="M140 345 L200 351" stroke="#DDF8FF" strokeOpacity="0.46" strokeWidth="3" />
            <path d="M963 337 L1031 339" stroke="#DDF8FF" strokeOpacity="0.44" strokeWidth="3" />
            <path d="M889 251 C938 262 982 279 1014 311" stroke="#DDF8FF" strokeOpacity="0.33" strokeWidth="1.8" />
            <path d="M231 276 C283 253 313 230 358 205" stroke="#DDF8FF" strokeOpacity="0.25" strokeWidth="1.5" />
          </g>

          {/* handles and hatch details */}
          <g fill="#12CFF4" opacity="0.38">
            <rect x="430" y="303" width="24" height="4" rx="2" />
            <rect x="601" y="303" width="24" height="4" rx="2" />
          </g>

          {/* wireframe mesh contours */}
          <g opacity="0.18" stroke="#12CFF4" strokeWidth="1">
            {Array.from({ length: 11 }).map((_, i) => (
              <path key={`mesh-h-${i}`} d={`M135 ${244 + i * 12} C330 ${220 + i * 8} 740 ${226 + i * 8} 1030 ${276 + i * 8}`} fill="none" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <path key={`mesh-v-${i}`} d={`M${178 + i * 57} 238 L${145 + i * 61} 365`} fill="none" />
            ))}
          </g>

          {/* wheels */}
          <g fill="#06111F" stroke="#E8FBFF" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="266" cy="365" r="70" strokeOpacity="0.88" strokeWidth="3.3" />
            <circle cx="266" cy="365" r="46" strokeOpacity="0.45" strokeWidth="2" />
            <circle cx="266" cy="365" r="9" strokeOpacity="0.5" strokeWidth="2" />
            <circle cx="828" cy="365" r="70" strokeOpacity="0.88" strokeWidth="3.3" />
            <circle cx="828" cy="365" r="46" strokeOpacity="0.45" strokeWidth="2" />
            <circle cx="828" cy="365" r="9" strokeOpacity="0.5" strokeWidth="2" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * Math.PI) / 6;
              return (
                <g key={i} opacity="0.36">
                  <line x1={266} y1={365} x2={266 + Math.cos(a) * 60} y2={365 + Math.sin(a) * 60} strokeWidth="1.2" />
                  <line x1={828} y1={365} x2={828 + Math.cos(a) * 60} y2={365 + Math.sin(a) * 60} strokeWidth="1.2" />
                </g>
              );
            })}
          </g>
        </g>

        {/* default luminous scan line */}
        <path d="M148 333 C332 301 733 304 1025 331" stroke="#12CFF4" strokeOpacity="0.22" strokeWidth="4" fill="none" />
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
              className={`absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-xl transition duration-300 ${
                active ? 'scale-175 opacity-100' : 'scale-100 opacity-60 group-hover:scale-150 group-hover:opacity-100'
              }`}
            />
            <span
              className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-cyan shadow-glow transition duration-300 ${
                active ? 'scale-[1.65] ring-8 ring-cyan/20' : 'scale-100 group-hover:scale-125 group-hover:ring-8 group-hover:ring-cyan/20'
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
