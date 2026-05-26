import { Link } from 'react-router-dom';
import { BookingForm } from '../components/forms/BookingForm';

export function BookingPage() {
  return (
    <main className="min-h-screen bg-[#F6F8FB] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <Link to="/" className="text-xl font-black">AutoInspect</Link>
          <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
            Torna alla home
          </Link>
        </div>
      </header>

      <section className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-600">Prenotazione</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Prenota un controllo auto usata
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Inserisci i dati principali: ti ricontattiamo per confermare disponibilità, zona e modalità del controllo.
          </p>

          <div className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50 p-5 text-sm text-slate-700">
            <strong>Nota:</strong> se Supabase non è ancora configurato, le richieste vengono salvate in locale sul browser per permetterti di testare il flusso.
          </div>
        </div>

        <BookingForm />
      </section>
    </main>
  );
}
