import { useState } from 'react';
import { Container } from '../layout/Container';
import { CarInspectionDiagram, type InspectionSpotId } from './CarInspectionDiagram';

const items: { id: InspectionSpotId; title: string; description: string }[] = [
  { id: 'motore', title: 'Motore e trasmissione', description: 'Perdite, rumori, fluidi, stato generale e risposta del gruppo motore.' },
  { id: 'freni', title: 'Impianto frenante', description: 'Dischi, pastiglie, usura visibile e comportamento in sicurezza.' },
  { id: 'sospensioni', title: 'Sospensioni e sterzo', description: 'Giochi, rumorosità, assetto, braccetti e componenti soggetti a usura.' },
  { id: 'elettronica', title: 'Elettronica e centraline', description: 'Lettura OBD-II, spie, errori memorizzati e controlli principali.' },
  { id: 'carrozzeria', title: 'Carrozzeria e vernice', description: 'Segni di urti, riverniciature, difetti estetici e allineamenti.' },
  { id: 'interni', title: 'Interni e dotazioni', description: 'Usura abitacolo, comandi, accessori, climatizzazione e funzioni principali.' },
  { id: 'sicurezza', title: 'Sicurezza e airbag', description: 'Controlli visivi e funzionali sugli elementi essenziali di sicurezza.' },
];

export function WhatWeCheckSection() {
  const [activeSpot, setActiveSpot] = useState<InspectionSpotId | undefined>('motore');

  return (
    <section id="servizi" className="grid-bg bg-deep py-24 text-white">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.25fr_.75fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan">Checklist tecnica</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">COSA CONTROLLIAMO</h2>
          <div className="mt-4 h-1 w-20 bg-cyan" />
          <p className="mt-5 max-w-2xl text-white/70">
            Passa sopra l’elenco o sui punti dell’auto: ogni area evidenzia una macro-verifica dell’ispezione pre-acquisto.
          </p>
          <div className="mt-10">
            <CarInspectionDiagram activeSpot={activeSpot} onSpotChange={setActiveSpot} />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-navy/55 p-6 shadow-glow backdrop-blur lg:p-8">
          <h3 className="text-xl font-bold">Aree principali</h3>
          <p className="mt-2 text-sm text-white/55">Interazione hover: lo spot corrispondente cresce e si illumina sul veicolo.</p>

          <ul className="mt-7 space-y-3">
            {items.map((item) => {
              const active = activeSpot === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveSpot(item.id)}
                    onFocus={() => setActiveSpot(item.id)}
                    className={`group w-full rounded-2xl border p-4 text-left transition duration-300 ${
                      active
                        ? 'border-cyan/60 bg-cyan/10 shadow-glow'
                        : 'border-white/10 bg-white/[0.03] hover:border-cyan/35 hover:bg-cyan/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-1 h-3 w-3 shrink-0 rounded-full transition duration-300 ${
                          active ? 'scale-125 bg-cyan shadow-glow' : 'bg-cyan/70 group-hover:bg-cyan'
                        }`}
                      />
                      <span>
                        <span className="block text-base font-bold text-white">{item.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-white/58">{item.description}</span>
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
