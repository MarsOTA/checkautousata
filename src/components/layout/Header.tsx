import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShieldCheck, X } from 'lucide-react';

const navItems = [
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Servizi', href: '#servizi' },
  { label: 'Prezzi', href: '#prezzi' },
  { label: 'FAQ', href: '#faq' },
];

const cyanButtonStyle = { backgroundColor: '#22D3EE', color: '#020617' };

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#06111F] text-white shadow-[0_10px_40px_rgba(0,0,0,0.36)]">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 lg:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="AutoInspect home" onClick={() => setOpen(false)}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/35 bg-cyan-300/10 text-cyan-300">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-xl font-black tracking-tight text-white">AutoInspect</div>
            <div className="hidden truncate text-xs font-medium text-white/55 sm:block">Controlliamo, così compri sicuro.</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-bold text-white/76 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-cyan-300">{item.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/admin" className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/75 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white">Admin</Link>
          <Link to="/prenota" className="rounded-xl px-6 py-3 text-sm font-black shadow-[0_0_28px_rgba(34,211,238,.24)] transition hover:brightness-110" style={cyanButtonStyle}>Prenota un controllo</Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link to="/prenota" className="rounded-xl px-4 py-2.5 text-xs font-black shadow-[0_0_22px_rgba(34,211,238,.18)]" style={cyanButtonStyle} onClick={() => setOpen(false)}>Prenota</Link>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Chiudi menu' : 'Apri menu'} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden border-t border-white/10 bg-[#06111F] transition-all duration-300 lg:hidden ${open ? 'max-h-[430px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-white/78 transition hover:bg-white/[0.06] hover:text-white">{item.label}</a>
          ))}
          <div className="my-2 h-px bg-white/10" />
          <Link to="/admin" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-white/78 transition hover:bg-white/[0.06] hover:text-white">Area admin</Link>
          <Link to="/prenota" onClick={() => setOpen(false)} className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-black" style={cyanButtonStyle}>Prenota un controllo</Link>
        </nav>
      </div>
    </header>
  );
}
