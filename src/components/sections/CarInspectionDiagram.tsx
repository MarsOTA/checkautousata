import { Car, CircleGauge, Disc3, Gauge, ShieldCheck, Wrench, Zap } from 'lucide-react';
import type { ComponentType } from 'react';

export type CheckAreaId =
  | 'motore'
  | 'freni'
  | 'sospensioni'
  | 'elettronica'
  | 'carrozzeria'
  | 'interni'
  | 'sicurezza';

export type CheckArea = {
  id: CheckAreaId;
  title: string;
  description: string;
  x: string;
  y: string;
  icon: ComponentType<{ className?: string }>;
};

export const checkAreas: CheckArea[] = [
  {
    id: 'motore',
    title: 'Motore e trasmissione',
    description: 'Controllo visivo di motore, cambio, perdite, livelli e rumorosità anomale.',
    x: '23%',
    y: '57%',
    icon: Wrench,
  },
  {
    id: 'freni',
    title: 'Impianto frenante',
    description: 'Verifica di dischi, pastiglie, tubi freno, liquido e usura visibile.',
    x: '31%',
    y: '75%',
    icon: Disc3,
  },
  {
    id: 'sospensioni',
    title: 'Sospensioni e sterzo',
    description: 'Controllo di assetto, giochi, braccetti, rumorosità e componenti soggetti a usura.',
    x: '73%',
    y: '75%',
    icon: CircleGauge,
  },
  {
    id: 'elettronica',
    title: 'Elettronica e centraline',
    description: 'Lettura OBD-II, spie, errori memorizzati e principali anomalie elettroniche.',
    x: '55%',
    y: '58%',
    icon: Zap,
  },
  {
    id: 'carrozzeria',
    title: 'Carrozzeria e vernice',
    description: 'Segni di urti, riverniciature, difetti estetici, allineamenti e parti sostituite.',
    x: '67%',
    y: '50%',
    icon: ShieldCheck,
  },
  {
    id: 'interni',
    title: 'Interni e dotazioni',
    description: 'Usura abitacolo, comandi, climatizzazione, accessori e funzionamento dotazioni.',
    x: '51%',
    y: '38%',
    icon: Car,
  },
  {
    id: 'sicurezza',
    title: 'Sicurezza e airbag',
    description: 'Controlli visivi sugli elementi di sicurezza, cinture, airbag e dispositivi principali.',
    x: '82%',
    y: '52%',
    icon: Gauge,
  },
];

type Props = {
  activeId: CheckAreaId;
  onActiveChange: (id: CheckAreaId) => void;
};

export function CarInspectionDiagram({ activeId, onActiveChange }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-6xl select-none px-2 py-8 sm:px-6 lg:py-12">
      <div className="pointer-events-none absolute inset-x-[8%] bottom-[8%] h-24 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-[14%] bottom-[14%] h-8 rounded-full bg-black/50 blur-xl" />

      <div className="relative z-10 mx-auto w-full">
        <img
          src="/assets/carinspect.svg"
          alt="Schema tecnico auto con punti di controllo"
          className="mx-auto block w-full max-w-5xl opacity-95 drop-shadow-[0_0_38px_rgba(18,207,244,0.22)]"
          draggable={false}
        />

        {checkAreas.map((area) => {
          const Icon = area.icon;
          const isActive = activeId === area.id;

          return (
            <button
              key={area.id}
              type="button"
              aria-label={area.title}
              onMouseEnter={() => onActiveChange(area.id)}
              onFocus={() => onActiveChange(area.id)}
              onClick={() => onActiveChange(area.id)}
              className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{ left: area.x, top: area.y }}
            >
              <span
                className={`absolute left-1/2 top-1/2 rounded-full bg-cyan-300/30 blur-xl transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
                  isActive ? 'h-20 w-20 opacity-100' : 'h-11 w-11 opacity-60 group-hover:h-16 group-hover:w-16 group-hover:opacity-100'
                }`}
              />
              <span
                className={`relative flex items-center justify-center rounded-full border-2 border-white bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,.9)] transition-all duration-300 ${
                  isActive ? 'h-7 w-7 scale-125 ring-8 ring-cyan-300/20' : 'h-5 w-5 group-hover:scale-125 group-hover:ring-8 group-hover:ring-cyan-300/20'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
              <span
                className={`pointer-events-none absolute left-1/2 top-9 z-20 min-w-max -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/90 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur transition-all duration-200 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-cyan-300" />
                  {area.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
