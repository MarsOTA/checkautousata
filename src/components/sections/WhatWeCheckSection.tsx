import { Container } from '../layout/Container';
import { CarInspectionDiagram } from './CarInspectionDiagram';

const items = [
  'Motore e trasmissione',
  'Impianto frenante',
  'Sospensioni e sterzo',
  'Elettronica e centraline',
  'Carrozzeria e vernice',
  'Interni e dotazioni',
  'Sicurezza e airbag',
];

export function WhatWeCheckSection() {
  return (
    <section id="servizi" className="grid-bg bg-deep py-24 text-white">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.35fr_.65fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan">Checklist tecnica</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">COSA CONTROLLIAMO</h2>
          <div className="mt-4 h-1 w-20 bg-cyan" />
          <p className="mt-5 max-w-2xl text-white/70">
            Ogni punto evidenziato rappresenta una macro-area verificata durante l’ispezione pre-acquisto.
          </p>
          <div className="mt-10">
            <CarInspectionDiagram />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-navy/50 p-8 shadow-glow backdrop-blur">
          <h3 className="text-xl font-bold">Aree principali</h3>
          <ul className="mt-7 space-y-5 text-lg text-white/85">
            {items.map((item) => (
              <li className="flex items-center gap-4" key={item}>
                <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-glow" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
