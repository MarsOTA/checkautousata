import { Car, CircleGauge, Disc3, Wrench, Zap } from 'lucide-react';

export type InspectionArea = {
  id: string;
  title: string;
  description: string;
  color: string;
  softColor: string;
  x: string;
  y: string;
  labelY?: string;
  icon: 'engine' | 'brakes' | 'suspension' | 'electronics' | 'body';
};

const iconMap = { engine: Wrench, brakes: Disc3, suspension: CircleGauge, electronics: Zap, body: Car };

type CarInspectionDiagramProps = { areas: InspectionArea[]; activeId: string; onActiveChange: (id: string) => void };

export function CarInspectionDiagram({ areas, activeId, onActiveChange }: CarInspectionDiagramProps) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="pointer-events-none absolute inset-x-[16%] bottom-[4%] h-14 rounded-[50%] bg-cyan-300/10 blur-2xl md:h-16" />
      <div className="relative mx-auto w-full px-1 sm:px-8">
        <img src="/assets/carinspect.svg" alt="Schema tecnico di un'auto con punti di controllo" className="relative z-10 mx-auto w-[92%] max-w-4xl select-none drop-shadow-[0_0_34px_rgba(18,207,244,0.18)] sm:w-[90%] md:w-[88%]" draggable={false} />
        {areas.map((area) => {
          const Icon = iconMap[area.icon];
          const active = activeId === area.id;
          return (
            <button key={area.id} type="button" aria-label={area.title} onMouseEnter={() => onActiveChange(area.id)} onFocus={() => onActiveChange(area.id)} onClick={() => onActiveChange(area.id)} className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none" style={{ left: area.x, top: area.y }}>
              <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-20 md:h-10 md:w-10" style={{ backgroundColor: area.color }} />
              <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-all duration-300 ${active ? 'h-14 w-14 opacity-80 md:h-16 md:w-16' : 'h-10 w-10 opacity-45 group-hover:h-14 group-hover:w-14 group-hover:opacity-70'}`} style={{ backgroundColor: area.color }} />
              <span className={`relative flex items-center justify-center rounded-full border-2 border-white bg-slate-950 shadow-2xl transition-all duration-300 ${active ? 'h-8 w-8 scale-110 ring-8 ring-white/10 md:h-7 md:w-7' : 'h-7 w-7 group-hover:scale-125 group-hover:ring-8 group-hover:ring-white/10 md:h-5 md:w-5'}`} style={{ boxShadow: `0 0 26px ${area.color}` }}><span className="h-2 w-2 rounded-full" style={{ backgroundColor: area.color }} /></span>
              <span className={`pointer-events-none absolute left-1/2 hidden -translate-x-1/2 rounded-full border px-3 py-1.5 text-[11px] font-bold text-white shadow-xl backdrop-blur transition-all duration-200 md:block ${active ? 'scale-100 opacity-100' : 'scale-95 opacity-78 group-hover:scale-100 group-hover:opacity-100'}`} style={{ top: area.labelY ?? '-42px', backgroundColor: active ? 'rgba(6,17,31,0.96)' : 'rgba(6,17,31,0.82)', borderColor: active ? area.color : 'rgba(255,255,255,0.12)', boxShadow: active ? `0 0 22px ${area.softColor}` : undefined }}>
                <span className="inline-flex items-center gap-2 whitespace-nowrap"><Icon className="h-3.5 w-3.5" style={{ color: area.color }} />{area.title}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
