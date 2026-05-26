import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Car, CircleGauge, Disc3, Wrench, Zap } from 'lucide-react';
import { CarInspectionDiagram, type InspectionArea } from './CarInspectionDiagram';

const inspectionAreas: InspectionArea[] = [
  { id: 'motore', title: 'Motore e trasmissione', description: 'Controllo visivo di perdite, livelli, rumorosità, fumosità e funzionamento generale del gruppo motore.', color: '#B8FF2C', softColor: 'rgba(184,255,44,0.14)', x: '25%', y: '57%', icon: 'engine' },
  { id: 'freni', title: 'Impianto frenante', description: 'Verifica di dischi, pastiglie, tubi freno, liquido e principali segnali di usura o manutenzione trascurata.', color: '#FFB547', softColor: 'rgba(255,181,71,0.15)', x: '31%', y: '74%', icon: 'brakes' },
  { id: 'sospensioni', title: 'Sospensioni e sterzo', description: 'Controllo di giochi, rumorosità, ammortizzatori, bracci, sterzo e componenti soggetti a usura.', color: '#22D3EE', softColor: 'rgba(34,211,238,0.14)', x: '75%', y: '74%', icon: 'suspension' },
  { id: 'elettronica', title: 'Elettronica e centraline', description: 'Diagnosi OBD-II, spie, errori memorizzati e controlli elettronici principali prima dell’acquisto.', color: '#A78BFA', softColor: 'rgba(167,139,250,0.14)', x: '58%', y: '60%', icon: 'electronics' },
  { id: 'carrozzeria', title: 'Carrozzeria e interni', description: 'Analisi di urti, riverniciature, allineamenti, usura abitacolo, comandi, clima e dotazioni principali.', color: '#FB7185', softColor: 'rgba(251,113,133,0.14)', x: '51%', y: '31%', icon: 'body' },
];

const iconMap = { engine: Wrench, brakes: Disc3, suspension: CircleGauge, electronics: Zap, body: Car };

function getCoverFlowStyle(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  const abs = Math.abs(diff);
  const clamped = Math.max(-2, Math.min(2, diff));
  const translateX = clamped * 260;
  const rotateY = clamped * -18;
  const scale = abs === 0 ? 1 : abs === 1 ? 0.86 : 0.74;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.62 : 0.25;
  const zIndex = 20 - abs;
  return { transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`, opacity, zIndex, pointerEvents: abs > 2 ? 'none' : 'auto' } as const;
}

export function WhatWeCheckSection() {
  const [activeId, setActiveId] = useState(inspectionAreas[0].id);
  const activeIndex = inspectionAreas.findIndex((item) => item.id === activeId);
  const activeArea = useMemo(() => inspectionAreas.find((item) => item.id === activeId) ?? inspectionAreas[0], [activeId]);

  const goPrev = () => setActiveId(inspectionAreas[(activeIndex - 1 + inspectionAreas.length) % inspectionAreas.length].id);
  const goNext = () => setActiveId(inspectionAreas[(activeIndex + 1) % inspectionAreas.length].id);

  return (
    <section id="controlli" className="relative overflow-hidden bg-[#07111F] py-24 text-white">
      <div className="absolute inset-0 bg-[url('/assets/inspection-section-bg.svg')] bg-cover bg-center opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07111F]/80 via-[#07111F]/35 to-[#07111F]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(18,207,244,0.15),transparent_34%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Cosa controlliamo</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Ogni dettaglio, <span className="text-cyan-300">sotto controllo.</span></h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/70">Passa sui punti dell’auto o sulle card per scoprire le principali aree ispezionate prima dell’acquisto.</p>
        </div>

        <CarInspectionDiagram areas={inspectionAreas} activeId={activeId} onActiveChange={setActiveId} />

        <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-3 text-sm text-white/65"><span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: activeArea.color }} /><span>Area attiva: <strong className="text-white">{activeArea.title}</strong></span></div>

        <div className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-5">
            <div><p className="text-sm font-bold uppercase tracking-[0.24em] text-white/55">Aree ispezionate</p><h3 className="mt-2 text-3xl font-black text-white md:text-4xl">{activeArea.title}</h3></div>
            <div className="flex items-center gap-3"><button type="button" onClick={goPrev} aria-label="Card precedente" className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"><ArrowLeft className="h-5 w-5" /></button><button type="button" onClick={goNext} aria-label="Card successiva" className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"><ArrowRight className="h-5 w-5" /></button></div>
          </div>

          <div className="relative mx-auto hidden h-[330px] max-w-6xl items-center justify-center overflow-hidden [perspective:1200px] lg:flex">
            {inspectionAreas.map((item, index) => {
              const Icon = iconMap[item.icon];
              const active = item.id === activeId;
              return (
                <button key={item.id} type="button" onMouseEnter={() => setActiveId(item.id)} onFocus={() => setActiveId(item.id)} onClick={() => setActiveId(item.id)} className={`absolute w-[330px] rounded-[1.7rem] border p-6 text-left transition-all duration-500 ${active ? 'border-white/20 bg-white/[0.095] shadow-2xl' : 'border-white/10 bg-white/[0.045] hover:border-white/20'}`} style={{ ...getCoverFlowStyle(index, activeIndex, inspectionAreas.length), boxShadow: active ? `0 0 34px ${item.softColor}` : undefined }}>
                  <span className="absolute right-5 top-5 h-4 w-4 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 22px ${item.color}` }}><span className="absolute inset-0 animate-ping rounded-full" style={{ backgroundColor: item.color }} /></span>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border" style={{ borderColor: active ? item.color : 'rgba(255,255,255,0.12)', backgroundColor: active ? item.softColor : 'rgba(255,255,255,0.04)' }}><Icon className="h-8 w-8" style={{ color: active ? item.color : 'rgba(255,255,255,0.75)' }} /></div>
                  <h4 className="text-2xl font-black text-white">{item.title}</h4>
                  <p className="mt-4 min-h-[96px] text-base leading-relaxed text-white/66">{item.description}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold" style={{ color: item.color }}>Scopri il controllo <ArrowRight className="ml-2 h-4 w-4" /></span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 lg:hidden">
            {inspectionAreas.map((item) => { const Icon = iconMap[item.icon]; const active = item.id === activeId; return <button key={item.id} type="button" onClick={() => setActiveId(item.id)} className={`relative rounded-[1.5rem] border p-5 text-left transition ${active ? 'border-white/20 bg-white/[0.09]' : 'border-white/10 bg-white/[0.04]'}`}><span className="absolute right-5 top-5 h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 18px ${item.color}` }} /><div className="flex items-start gap-4"><Icon className="mt-1 h-7 w-7" style={{ color: item.color }} /><div><h4 className="text-xl font-black">{item.title}</h4><p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p></div></div></button>; })}
          </div>

          <div className="mt-6 flex justify-center gap-2">{inspectionAreas.map((item) => <button key={item.id} type="button" aria-label={`Vai a ${item.title}`} onClick={() => setActiveId(item.id)} className={`h-2.5 rounded-full transition-all ${item.id === activeId ? 'w-8' : 'w-2.5 opacity-45'}`} style={{ backgroundColor: item.id === activeId ? item.color : '#8DA4B8' }} />)}</div>
        </div>
      </div>
    </section>
  );
}
