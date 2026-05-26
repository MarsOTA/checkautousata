import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShieldCheck, X } from 'lucide-react';

const navItems = [
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Servizi', href: '#servizi' },
  { label: 'Prezzi', href: '#prezzi' },
  { label: 'FAQ', href: '#faq' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111F]/88 text-white backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <Link to="/" className="flex items-center gap-3" aria-label="AutoInspect home">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-300/10 text-cyan-300">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-black tracking-tight md:text-xl">AutoInspect</div>
            <div className="hidden text-xs text-white/55 sm:block">Controlliamo, così compri sicuro.</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-white/78 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-cyan-300">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/admin" className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white/75 transition hover:border-cyan-300/40 hover:text-white">
            Admin
          </Link>
          <Link to="/prenota" className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300">
            Prenota un controllo
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#07111F] px-4 py-4 lg:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/5">
                {item.label}
              </a>
            ))}
            <Link to="/admin" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/5">
              Admin
            </Link>
            <Link to="/prenota" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-black text-slate-950">
              Prenota un controllo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
