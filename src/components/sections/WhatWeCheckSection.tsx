import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Car, CircleGauge, Disc3, Wrench, Zap } from 'lucide-react';

type InspectionArea = {
  id: string;
  title: string;
  description: string;
  color: string;
  softColor: string;
  x: string;
  y: string;
  icon: 'engine' | 'brakes' | 'suspension' | 'electronics' | 'body';
};

const inspectionAreas: InspectionArea[] = [
  {
    id: 'motore',
    title: 'Motore e trasmissione',
    description:
      'Controllo visivo di perdite, livelli, rumorosità, fumosità e funzionamento generale.',
    color: '#B8FF2C',
    softColor: 'rgba(184,255,44,0.18)',
    x: '76%',
    y: '44%',
    icon: 'engine',
  },
  {
    id: 'freni',
    title: 'Impianto frenante',
    description:
      'Verifica di dischi, pastiglie, tubi freno, liquido e principali segnali di usura.',
    color: '#FFB547',
    softColor: 'rgba(255,181,71,0.18)',
    x: '23%',
    y: '68%',
    icon: 'brakes',
  },
  {
    id: 'sospensioni',
    title: 'Sospensioni e sterzo',
    description:
      'Controllo di giochi, rumorosità, ammortizzatori, bracci, sterzo e componenti soggetti a usura.',
    color: '#22D3EE',
    softColor: 'rgba(34,211,238,0.18)',
    x: '67%',
    y: '69%',
    icon: 'suspension',
  },
  {
    id: 'elettronica',
    title: 'Elettronica e centraline',
    description:
      'Diagnosi OBD-II, spie, errori memorizzati e controlli elettronici principali.',
    color: '#A78BFA',
    softColor: 'rgba(167,139,250,0.18)',
    x: '51%',
    y: '49%',
    icon: 'electronics',
  },
  {
    id: 'carrozzeria',
    title: 'Carrozzeria e interni',
    description:
      'Analisi di urti, riverniciature, allineamenti, usura abitacolo, comandi e dotazioni.',
    color: '#FB7185',
    softColor: 'rgba(251,113,133,0.18)',
    x: '43%',
    y: '33%',
    icon: 'body',
  },
];

const iconMap = {
  engine: Wrench,
  brakes: Disc3,
  suspension: CircleGauge,
  electronics: Zap,
  body: Car,
};

function getCoverFlowStyle(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  const abs = Math.abs(diff);
  const clamped = Math.max(-2, Math.min(2, diff));

  return {
    transform: `translateX(${clamped * 315}px) scale(${abs === 0 ? 1 : abs === 1 ? 0.82 : 0.68}) rotateY(${clamped * -12}deg)`,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.35 : 0.11,
    zIndex: 30 - abs,
    pointerEvents: abs > 2 ? 'none' : 'auto',
  } as const;
}

function InspectionImage({
  activeId,
  onActiveChange,
}: {
  activeId: string;
  onActiveChange: (id: string) => void;
}) {
  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-[#081827] shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
      <img
        src="/assets/inspection-car-open-hood.png"
        alt="Auto con cofano aperto pronta per il controllo tecnico"
        className="block h-auto w-full select-none"
        draggable={false}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07111F]/20" />

      {inspectionAreas.map((area) => {
        const Icon = iconMap[area.icon];
        const active = activeId === area.id;

        return (
          <button
            key={area.id}
            type="button"
            aria-label={area.title}
            onClick={() => onActiveChange(area.id)}
            onFocus={() => onActiveChange(area.id)}
            onMouseEnter={() => onActiveChange(area.id)}
            className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
            style={{ left: area.x, top: area.y }}
          >
            <span
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-20"
              style={{ backgroundColor: area.color }}
            />
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-all duration-300 ${
                active ? 'h-18 w-18 opacity-80' : 'h-12 w-12 opacity-50 group-hover:h-16 group-hover:w-16'
              }`}
              style={{ backgroundColor: area.color }}
            />
            <span
              className={`relative flex items-center justify-center rounded-full border-2 border-white bg-[#06111F] transition-all duration-300 ${
                active ? 'h-8 w-8 scale-110 ring-8 ring-white/10' : 'h-6 w-6 group-hover:scale-125'
              }`}
              style={{ boxShadow: `0 0 26px ${area.color}` }}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: area.color }} />
            </span>

            <span
              className={`pointer-events-none absolute left-1/2 top-8 hidden min-w-max -translate-x-1/2 rounded-full border px-3 py-1.5 text-[11px] font-bold text-white shadow-xl backdrop-blur transition-all duration-200 md:block ${
                active ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
              }`}
              style={{
                backgroundColor: 'rgba(6,17,31,0.92)',
                borderColor: active ? area.color : 'rgba(255,255,255,0.12)',
                boxShadow: active ? `0 0 22px ${area.softColor}` : undefined,
              }}
            >
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <Icon className="h-3.5 w-3.5" style={{ color: area.color }} />
                {area.title}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function WhatWeCheckSection() {
  const [activeId, setActiveId] = useState(inspectionAreas[0].id);
  const mobileCardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeIndex = inspectionAreas.findIndex((item) => item.id === activeId);
  const activeArea = useMemo(
    () => inspectionAreas.find((item) => item.id === activeId) ?? inspectionAreas[0],
    [activeId]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) return;

    const el = mobileCardRefs.current[activeId];
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [activeId]);

  return (
    <section id="controlli" className="relative overflow-hidden bg-[#07111F] py-12 text-white md:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(18,207,244,0.16),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.96)_0%,rgba(7,17,31,0.60)_45%,rgba(7,17,31,0.98)_100%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-8 max-w-4xl text-center md:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Cosa controlliamo</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Ogni dettaglio, <span className="text-cyan-300">sotto controllo.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-white/68 sm:text-base">
            Dalla meccanica all’elettronica: seleziona uno spot o una card per esplorare le aree controllate.
          </p>
        </div>

        <InspectionImage activeId={activeId} onActiveChange={setActiveId} />

        <div className="mt-4 text-center text-sm text-white/68 md:hidden">
          <span
            className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
            style={{ backgroundColor: activeArea.color }}
          />
          <strong className="text-white">{activeArea.title}</strong>
        </div>

        <div className="mt-8 md:mt-7">
          <div className="relative mx-auto hidden h-[205px] max-w-7xl items-center justify-center overflow-hidden [perspective:1200px] lg:flex">
            {inspectionAreas.map((item, index) => {
              const Icon = iconMap[item.icon];
              const active = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  className={`absolute h-[176px] w-[470px] rounded-[1.4rem] border p-5 text-left transition-all duration-500 ${
                    active
                      ? 'border-white/25 bg-[#102033]/95 shadow-2xl backdrop-blur-xl'
                      : 'border-white/10 bg-[#07111F]/82 backdrop-blur-md hover:border-white/20 hover:bg-[#0D1C2D]/90'
                  }`}
                  style={{
                    ...getCoverFlowStyle(index, activeIndex, inspectionAreas.length),
                    boxShadow: active ? `0 0 42px ${item.softColor}` : undefined,
                  }}
                >
                  <span
                    className="absolute right-5 top-5 h-4 w-4 rounded-full"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 22px ${item.color}` }}
                  >
                    <span className="absolute inset-0 animate-ping rounded-full" style={{ backgroundColor: item.color }} />
                  </span>

                  <div className="flex h-full items-center gap-5">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border"
                      style={{
                        borderColor: active ? item.color : 'rgba(255,255,255,0.12)',
                        backgroundColor: active ? item.softColor : 'rgba(255,255,255,0.04)',
                      }}
                    >
                      <Icon className="h-8 w-8" style={{ color: active ? item.color : 'rgba(255,255,255,0.72)' }} />
                    </div>

                    <div className="pr-6">
                      <h4 className="text-2xl font-black text-white">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/66">{item.description}</p>
                      <span className="mt-3 inline-flex items-center text-sm font-semibold" style={{ color: item.color }}>
                        Scopri il controllo <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 lg:hidden">
            {inspectionAreas.map((item) => {
              const Icon = iconMap[item.icon];
              const active = item.id === activeId;

              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    mobileCardRefs.current[item.id] = node;
                  }}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  className={`relative min-w-[82vw] snap-center rounded-[1.5rem] border p-5 text-left transition sm:min-w-[420px] ${
                    active ? 'border-white/25 bg-[#102033]/95 shadow-[0_0_28px_rgba(18,207,244,0.12)]' : 'border-white/10 bg-white/[0.04]'
                  }`}
                >
                  <span
                    className="absolute right-5 top-5 h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 18px ${item.color}` }}
                  />
                  <div className="flex items-start gap-4">
                    <Icon className="mt-1 h-7 w-7 shrink-0" style={{ color: item.color }} />
                    <div>
                      <h4 className="pr-8 text-xl font-black">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex justify-center gap-2 md:mt-3">
            {inspectionAreas.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Vai a ${item.title}`}
                onClick={() => setActiveId(item.id)}
                className={`h-2.5 rounded-full transition-all ${item.id === activeId ? 'w-8' : 'w-2.5 opacity-45'}`}
                style={{ backgroundColor: item.id === activeId ? item.color : '#8DA4B8' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
