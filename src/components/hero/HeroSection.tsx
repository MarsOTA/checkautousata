import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, UserCheck } from 'lucide-react';

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

const cyanButtonStyle = {
  backgroundColor: '#22D3EE',
  color: '#020617',
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07111F] pt-20 text-white">
      <div className="absolute inset-0">
        <img
          src="/hero-inspection.png"
          alt="Meccanico che controlla un'auto usata con tablet"
          className="h-full w-full object-cover"
        />

        {/* Overlay globale più leggero: lascia vedere la foto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111F]/72 via-[#07111F]/48 to-[#07111F]/18" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07111F]/12 via-transparent to-[#07111F]/62" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(34,211,238,0.13),transparent_30%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl items-center px-4 py-14 lg:px-6">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div className="relative max-w-3xl">
            {/* Overlay dedicato sotto H1/H2: rende il testo leggibile senza scurire tutta la hero */}
            <div className="pointer-events-none absolute -inset-x-8 -inset-y-8 rounded-[2.5rem] bg-[#06111F]/50 blur-2xl md:-inset-x-10 md:-inset-y-10" />
            <div className="pointer-events-none absolute -inset-x-5 -inset-y-5 rounded-[2rem] bg-gradient-to-r from-[#06111F]/78 via-[#06111F]/42 to-transparent" />

            <div className="relative z-10">
              <p className="inline-flex rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
                Ispezione auto usate
              </p>

              <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[82px]">
                Fai controllare l’auto prima di comprarla
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/86 sm:text-lg md:text-xl">
                Un meccanico esperto ispeziona ogni dettaglio, individua i problemi nascosti e ti dice se vale la pena. Acquista con sicurezza e risparmia.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/prenota"
                  className="inline-flex items-center justify-center rounded-xl px-7 py-4 text-sm font-black shadow-[0_0_32px_rgba(34,211,238,.24)] transition hover:brightness-110"
                  style={cyanButtonStyle}
                >
                  Prenota un controllo
                </Link>

                <a
                  href="#come-funziona"
                  className="inline-flex items-center justify-center rounded-xl border border-white/22 bg-white/[0.06] px-7 py-4 text-sm font-black text-white transition hover:border-cyan-300/40 hover:bg-white/[0.10]"
                >
                  Scopri il processo
                </a>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="grid w-full max-w-sm gap-4">
              {proofCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-cyan-300/24 bg-[#06111F]/70 p-5 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-base font-black text-white">{card.title}</div>
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
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <div className="mt-2 text-sm font-bold text-white">{card.title}</div>
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
