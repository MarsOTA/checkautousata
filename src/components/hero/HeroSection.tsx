import { Link } from 'react-router-dom';
import { Clock, FileCheck2, ShieldCheck, UserCheck } from 'lucide-react';

const proofCards = [
  {
    icon: ShieldCheck,
    title: '150+ punti di controllo',
  },
  {
    icon: Clock,
    title: 'Report in 24h dal servizio',
  },
  {
    icon: UserCheck,
    title: 'Meccanici certificati',
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07111F] pt-20 text-white">
      <div className="absolute inset-0">
        <img
          src="/assets/hero-inspection.jpg"
          alt="Meccanico che controlla un'auto usata con tablet"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07111F] via-[#07111F]/82 to-[#07111F]/42" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07111F]/20 via-transparent to-[#07111F]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(18,207,244,0.14),transparent_28%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl items-center px-4 py-14 lg:px-6">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
              Ispezione auto usate
            </p>

            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[82px]">
              Fai controllare l’auto prima di comprarla
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/76 sm:text-lg md:text-xl">
              Un meccanico esperto ispeziona ogni dettaglio, individua i problemi nascosti e ti dice se vale la pena. Acquista con sicurezza e risparmia.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/prenota"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-7 py-4 text-sm font-black text-slate-950 shadow-[0_0_32px_rgba(18,207,244,.24)] transition hover:bg-cyan-300"
              >
                Prenota un controllo
              </Link>

              <a
                href="#come-funziona"
                className="inline-flex items-center justify-center rounded-xl border border-white/18 bg-white/[0.04] px-7 py-4 text-sm font-black text-white transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Scopri il processo
              </a>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="grid w-full max-w-sm gap-4">
              {proofCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-cyan-300/16 bg-[#06111F]/78 p-5 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-base font-black">{card.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:hidden">
            {proofCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <div className="mt-2 text-sm font-bold">{card.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan-300/10" />
    </section>
  );
}
