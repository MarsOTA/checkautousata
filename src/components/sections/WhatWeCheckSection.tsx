import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, MousePointer2 } from 'lucide-react';
import {
  CarInspectionDiagram,
  checkAreas,
  type CheckAreaId,
} from './CarInspectionDiagram';

export function WhatWeCheckSection() {
  const [activeId, setActiveId] = useState<CheckAreaId>('motore');
  const activeIndex = checkAreas.findIndex((item) => item.id === activeId);
  const activeArea = useMemo(
    () => checkAreas.find((item) => item.id === activeId) ?? checkAreas[0],
    [activeId]
  );

  const goToPrevious = () => {
    const nextIndex = (activeIndex - 1 + checkAreas.length) % checkAreas.length;
    setActiveId(checkAreas[nextIndex].id);
  };

  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % checkAreas.length;
    setActiveId(checkAreas[nextIndex].id);
  };

  return (
    <section
      id="cosa-controlliamo"
      className="relative overflow-hidden bg-[#06111F] py-24 text-white sm:py-28"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: "url('/assets/inspection-section-bg.svg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(18,207,244,.18),transparent_32%),linear-gradient(to_bottom,rgba(6,17,31,.80),rgba(6,17,31,.72)_45%,rgba(6,17,31,.92))]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-cyan-300">
            Cosa controlliamo
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Ogni dettaglio, <span className="text-cyan-300">sotto controllo.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/72 sm:text-lg">
            Passa sui punti dell’auto o sulle card per scoprire le aree che ispezioniamo durante il controllo pre-acquisto.
          </p>
        </div>

        <CarInspectionDiagram activeId={activeId} onActiveChange={setActiveId} />

        <div className="mx-auto mt-2 flex max-w-4xl items-center justify-center gap-3 text-sm text-white/70">
          <MousePointer2 className="h-5 w-5 text-cyan-300" />
          <span>Interagisci con gli spot o scorri le card</span>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Aree ispezionate</p>
            <h3 className="mt-1 text-2xl font-bold">{activeArea.title}</h3>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Area precedente"
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Area successiva"
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-4 xl:grid xl:min-w-0 xl:grid-cols-7">
            {checkAreas.map((area) => {
              const Icon = area.icon;
              const isActive = activeId === area.id;

              return (
                <button
                  key={area.id}
                  type="button"
                  onMouseEnter={() => setActiveId(area.id)}
                  onFocus={() => setActiveId(area.id)}
                  onClick={() => setActiveId(area.id)}
                  className={`w-[260px] rounded-[1.6rem] border p-5 text-left transition-all duration-300 xl:w-auto ${
                    isActive
                      ? 'scale-[1.015] border-cyan-300/70 bg-cyan-300/10 shadow-[0_0_34px_rgba(34,211,238,.18)]'
                      : 'border-white/10 bg-slate-950/35 hover:border-cyan-300/35 hover:bg-cyan-300/5'
                  }`}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10">
                    <Icon className={`h-7 w-7 ${isActive ? 'text-cyan-200' : 'text-cyan-300/80'}`} />
                  </div>
                  <h4 className="text-base font-bold text-white">{area.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/62">{area.description}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-300">
                    Scopri di più <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {checkAreas.map((area) => (
            <button
              key={area.id}
              type="button"
              aria-label={`Vai a ${area.title}`}
              onClick={() => setActiveId(area.id)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeId === area.id ? 'w-8 bg-cyan-300' : 'w-2.5 bg-white/20 hover:bg-cyan-300/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
