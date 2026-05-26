import { Link } from 'react-router-dom';

export function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111F] px-4 text-white">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">Richiesta inviata</p>
        <h1 className="mt-4 text-4xl font-black">Grazie, ti ricontatteremo a breve.</h1>
        <p className="mt-4 text-white/70">
          Abbiamo ricevuto la tua richiesta di controllo. Verificheremo disponibilità e dettagli del veicolo.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/" className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950">
            Torna alla home
          </Link>
          <Link to="/admin/dashboard" className="rounded-xl border border-white/15 px-5 py-3 font-bold text-white">
            Vai admin
          </Link>
        </div>
      </div>
    </main>
  );
}
