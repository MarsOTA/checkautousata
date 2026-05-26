import { Car, CircleGauge, Disc3, Wrench, Zap } from 'lucide-react';

export type InspectionArea = {
  id: string;
  title: string;
  description: string;
  color: string;
  softColor: string;
  x: string;
  y: string;
  icon: 'engine' | 'brakes' | 'suspension' | 'electronics' | 'body';
};

const iconMap = {
  engine: Wrench,
  brakes: Disc3,
  suspension: CircleGauge,
  electronics: Zap,
  body: Car,
};

type CarInspectionDiagramProps = {
  areas: InspectionArea[];
  activeId: string;
  onActiveChange: (id: string) => void;
};

export function CarInspectionDiagram({
  areas,
  activeId,
  onActiveChange,
}: CarInspectionDiagramProps) {
  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="pointer-events-none absolute inset-x-[8%] bottom-[2%] h-20 rounded-[50%] bg-cyan-300/10 blur-2xl" />

      <div className="relative mx-auto w-full px-2 sm:px-6">
        <img
          src="/assets/carinspect.svg"
          alt="Schema tecnico di un'auto con punti di controllo"
          className="relative z-10 mx-auto w-full max-w-5xl select-none drop-shadow-[0_0_38px_rgba(18,207,244,0.18)]"
          draggable={false}
        />

        {areas.map((area) => {
          const Icon = iconMap[area.icon];
          const active = activeId === area.id;

          return (
            <button
              key={area.id}
              type="button"
              aria-label={area.title}
              onMouseEnter={() => onActiveChange(area.id)}
              onFocus={() => onActiveChange(area.id)}
              onClick={() => onActiveChange(area.id)}
              className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{ left: area.x, top: area.y }}
            >
              <span
                className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-20"
                style={{ backgroundColor: area.color }}
              />
              <span
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-all duration-300 ${
                  active
                    ? 'h-20 w-20 opacity-80'
                    : 'h-12 w-12 opacity-45 group-hover:h-16 group-hover:w-16 group-hover:opacity-70'
                }`}
                style={{ backgroundColor: area.color }}
              />
              <span
                className={`relative flex items-center justify-center rounded-full border-2 border-white bg-slate-950 shadow-2xl transition-all duration-300 ${
                  active
                    ? 'h-8 w-8 scale-110 ring-8 ring-white/10'
                    : 'h-6 w-6 group-hover:scale-125 group-hover:ring-8 group-hover:ring-white/10'
                }`}
                style={{ boxShadow: `0 0 28px ${area.color}` }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: area.color }}
                />
              </span>

              <span
                className={`pointer-events-none absolute left-1/2 top-9 min-w-max -translate-x-1/2 rounded-full border border-white/10 bg-[#06111F]/90 px-3 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur transition-all duration-200 ${
                  active
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" style={{ color: area.color }} />
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
