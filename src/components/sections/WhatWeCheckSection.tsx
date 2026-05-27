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
  mobileX: string;
  mobileY: string;
  icon: 'engine' | 'brakes' | 'suspension' | 'electronics' | 'body';
};

const inspectionAreas: InspectionArea[] = [
  {
    id: 'motore',
    title: 'Motore e trasmissione',
    description:
      'Controllo visivo di perdite, livelli, rumorosità, fumosità e funzionamento generale.',
    color: '#B8FF2C',
    softColor: 'rgba(184,255,44,0.20)',
    x: '75%',
    y: '43%',
    mobileX: '72%',
    mobileY: '43%',
    icon: 'engine',
  },
  {
    id: 'freni',
    title: 'Impianto frenante',
    description:
      'Verifica di dischi, pastiglie, tubi freno, liquido e principali segnali di usura.',
    color: '#FFB547',
    softColor: 'rgba(255,181,71,0.20)',
    x: '20%',
    y: '68%',
    mobileX: '8%',
    mobileY: '66%',
    icon: 'brakes',
  },
  {
    id: 'sospensioni',
    title: 'Sospensioni e sterzo',
    description:
      'Controllo di giochi, rumorosità, ammortizzatori, bracci, sterzo e componenti soggetti a usura.',
    color: '#22D3EE',
    softColor: 'rgba(34,211,238,0.20)',
    x: '56%',
    y: '68%',
    mobileX: '66%',
    mobileY: '66%',
    icon: 'suspension',
  },
  {
    id: 'elettronica',
    title: 'Elettronica e centraline',
    description:
      'Diagnosi OBD-II, spie, errori memorizzati e controlli elettronici principali.',
    color: '#A78BFA',
    softColor: 'rgba(167,139,250,0.20)',
    x: '53%',
    y: '49%',
    mobileX: '53%',
    mobileY: '50%',
    icon: 'electronics',
  },
  {
    id: 'carrozzeria',
    title: 'Carrozzeria e interni',
    description:
      'Analisi di urti, riverniciature, allineamenti, usura abitacolo, comandi e dotazioni.',
    color: '#FB7185',
    softColor: 'rgba(251,113,133,0.20)',
    x: '34%',
    y: '60%',
    mobileX: '35%',
    mobileY: '23%',
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
    transform: `translateX(${clamped * 295}px) scale(${
      abs === 0 ? 1 : abs === 1 ? 0.84 : 0.70
    }) rotateY(${clamped * -12}deg)`,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.38 : 0.12,
    zIndex: 30 - abs,
    pointerEvents: abs > 2 ? 'none' : 'auto',
  } as const;
}

function Hotspot({
  area,
  activeId,
  onActiveChange,
  mobile = false,
}: {
  area: InspectionArea;
  activeId: string;
  onActiveChange: (id: string) => void;
  mobile?: boolean;
}) {
  const Icon = iconMap[area.icon];
  const active = activeId === area.id;

  return (
    <button
      type="button"
      aria-label={area.title}
      onClick={() => onActiveChange(area.id)}
      onFocus={() => onActiveChange(area.id)}
      onMouseEnter={() => onActiveChange(area.id)}
      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{
        left: mobile ? area.mobileX : area.x,
        top: mobile ? area.mobileY : area.y,
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-20"
        style={{ backgroundColor: area.color }}
      />
      <span
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-all duration-300 ${
          active
            ? 'h-16 w-16 opacity-80'
            : 'h-12 w-12 opacity-50 group-hover:h-16 group-hover:w-16'
        }`}
        style={{ backgroundColor: area.color }}
      />
      <span
        className={`relative flex items-center justify-center rounded-full border-2 border-white bg-[#06111F] transition-all duration-300 ${
          active
            ? 'h-8 w-8 scale-110 ring-8 ring-white/10'
            : 'h-7 w-7 group-hover:scale-125 md:h-6 md:w-6'
        }`}
        style={{ boxShadow: `0 0 26px ${area.color}` }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: area.color }} />
      </span>

      <span
        className={`pointer-events-none absolute left-1/2 top-8 hidden min-w-max -translate-x-1/2 rounded-full border px-3 py-1.5 text-[11px] font-bold text-white shadow-xl backdrop-blur transition-all duration-200 md:block ${
          active
            ? 'translate-y-0 opacity-100'
            : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
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
}

function InspectionImage({
  activeId,
  onActiveChange,
}: {
  activeId: string;
  onActiveChange: (id: string) => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-6xl overflow-visible">
      {/* Sfondo libero: nessun riquadro pieno dietro la macchina */}
      <div className="pointer-events-none absolute left-1/2 top-[48%] h-[420px] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[999px] bg-cyan-300/6 blur-3xl" />

      {/* Pavimento/strada simulato, sfumato sui bordi, non rettangolare */}
      <div className="pointer-events-none absolute bottom-[2%] left-1/2 h-[190px] w-[86%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(11,24,38,0.70)_0%,rgba(8,18,30,0.32)_42%,transparent_72%)]" />
      <div className="pointer-events-none absolute bottom-[11%] left-1/2 h-[76px] w-[58%] -translate-x-1/2 rounded-[999px] bg-cyan-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-[34px] w-[54%] -translate-x-1/2 rounded-[999px] bg-black/55 blur-xl" />

      <div className="relative mx-auto min-h-[285px] overflow-visible md:min-h-[390px] lg:min-h-[455px]">
        <img
          src="/assets/cars/inspection-car-open-hood.png"
          alt="Auto con cofano aperto pronta per il controllo tecnico"
          className="relative z-10 mx-auto hidden w-[96%] max-w-[1120px] select-none pt-8 md:block md:w-[88%] md:pt-10 lg:w-[86%] lg:pt-12"
          draggable={false}
        />

        <img
          src="/assets/cars/inspection-car-open-hood.png"
          alt="Auto con cofano aperto pronta per il controllo tecnico"
          className="relative z-10 mx-auto block w-[118%] max-w-none -translate-x-[7%] select-none pt-12 md:hidden"
          draggable={false}
        />

        <div className="hidden md:block">
          {inspectionAreas.map((area) => (
            <Hotspot
              key={area.id}
              area={area}
              activeId={activeId}
              onActiveChange={onActiveChange}
            />
          ))}
        </div>

        <div className="block md:hidden">
          {inspectionAreas.map((area) => (
            <Hotspot
              key={area.id}
              area={area}
              activeId={activeId}
              onActiveChange={onActiveChange}
              mobile
            />
          ))}
        </div>
      </div>
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
    <section id="controlli" className="relative overflow-hidden bg-[#07111F] pb-12 pt-18 text-white md:pb-14 md:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(18,207,244,0.12),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.98)_0%,rgba(7,17,31,0.72)_45%,rgba(7,17,31,0.98)_100%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-4 max-w-5xl text-center md:mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-cyan-300">
            Cosa controlliamo
          </p>

          <h2 className="mt-2 text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[56px]">
            Ogni dettaglio, <span className="text-cyan-300">sotto controllo.</span>
          </h2>
        </div>

        <div className="relative z-10">
          <InspectionImage activeId={activeId} onActiveChange={setActiveId} />
        </div>

        <div className="mt-3 text-center text-sm text-white/68 md:hidden">
          <span
            className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
            style={{ backgroundColor: activeArea.color }}
          />
          <strong className="text-white">{activeArea.title}</strong>
        </div>

        <div className="relative z-30 mt-5 md:mt-8">
          <div className="relative mx-auto hidden h-[215px] max-w-7xl items-center justify-center overflow-visible [perspective:1200px] lg:flex">
            {inspectionAreas.map((item, index) => {
              const Icon = iconMap[item.icon];
              const active = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  className={`absolute h-[178px] w-[470px] rounded-[1.5rem] border p-5 text-left transition-all duration-500 ${
                    active
                      ? 'border-white/25 bg-[#102033]/96 shadow-2xl backdrop-blur-xl'
                      : 'border-white/10 bg-[#07111F]/88 backdrop-blur-md hover:border-white/20 hover:bg-[#0D1C2D]/92'
                  }`}
                  style={{
                    ...getCoverFlowStyle(index, activeIndex, inspectionAreas.length),
                    boxShadow: active
                      ? `0 0 42px ${item.softColor}, 0 18px 50px rgba(0,0,0,0.38)`
                      : '0 14px 30px rgba(0,0,0,0.28)',
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

          <div className="-mx-4 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 lg:hidden">
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
                    active
                      ? 'border-white/25 bg-[#102033]/95 shadow-[0_0_28px_rgba(18,207,244,0.12)]'
                      : 'border-white/10 bg-white/[0.04]'
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
                className={`h-2.5 rounded-full transition-all ${
                  item.id === activeId ? 'w-8' : 'w-2.5 opacity-45'
                }`}
                style={{ backgroundColor: item.id === activeId ? item.color : '#8DA4B8' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
