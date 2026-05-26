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
  { id: 'motore', title: 'Motore e trasmissione', x: '25%', y: '53%', icon: Wrench },
  { id: 'freni', title: 'Impianto frenante', x: '27%', y: '73%', icon: Disc3 },
  { id: 'sospensioni', title: 'Sospensioni e sterzo', x: '70%', y: '73%', icon: CircleGauge },
  { id: 'elettronica', title: 'Elettronica e centraline', x: '52%', y: '50%', icon: Zap },
  { id: 'carrozzeria', title: 'Carrozzeria e vernice', x: '50%', y: '27%', icon: ShieldCheck },
  { id: 'interni', title: 'Interni e dotazioni', x: '57%', y: '39%', icon: Car },
  { id: 'sicurezza', title: 'Sicurezza e airbag', x: '65%', y: '45%', icon: Gauge },
];

type Props = {
  activeSpot?: InspectionSpotId;
  onSpotChange?: (spot: InspectionSpotId | undefined) => void;
};

export function CarInspectionDiagram({ activeSpot, onSpotChange }: Props) {
  const activeTitle = spots.find((spot) => spot.id === activeSpot)?.title;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-cyan/20 bg-[#061827] p-4 shadow-glow sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(18,207,244,.20),transparent_30%),radial-gradient(circle_at_75%_55%,rgba(18,207,244,.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(18,207,244,.65)_1px,transparent_1px),linear-gradient(90deg,rgba(18,207,244,.65)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative z-10 mx-auto aspect-[1620/636] w-full max-w-5xl">
        <img
          src="/assets/carinspect.svg"
          alt="Schema tecnico laterale dell’auto con punti di controllo"
          className={`h-full w-full object-contain drop-shadow-[0_0_28px_rgba(18,207,244,0.28)] transition duration-500 ${
            activeSpot ? 'scale-[1.018]' : 'scale-100'
          }`}
          draggable={false}
        />

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
                  active ? 'scale-175 opacity-100' : 'scale-100 opacity-55 group-hover:scale-150 group-hover:opacity-100'
                }`}
              />
              <span
                className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-cyan shadow-[0_0_26px_rgba(18,207,244,.8)] transition duration-300 ${
                  active ? 'scale-[1.7] ring-8 ring-cyan/20' : 'scale-100 group-hover:scale-125 group-hover:ring-8 group-hover:ring-cyan/20'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span
                className={`pointer-events-none absolute left-1/2 top-8 min-w-max -translate-x-1/2 rounded-xl border border-cyan/25 bg-[#07111F]/95 px-3 py-2 text-xs font-semibold text-white shadow-glow backdrop-blur transition duration-200 ${
                  active ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
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

      <div className="absolute bottom-5 left-5 z-20 hidden rounded-2xl border border-cyan/20 bg-[#07111F]/80 px-4 py-3 text-xs text-white/70 backdrop-blur sm:block">
        Area attiva: <span className="font-bold text-cyan">{activeTitle || 'passa sopra un controllo'}</span>
      </div>
    </div>
  );
}
