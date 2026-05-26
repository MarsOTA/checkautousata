import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        return;
      }
    } else {
      localStorage.setItem('autoinspect_demo_admin', 'true');
    }

    navigate('/admin/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111F] px-4 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl">
        <h1 className="text-3xl font-black">Admin AutoInspect</h1>
        <p className="mt-2 text-sm text-white/60">
          Login CMS. In modalità demo puoi inserire qualsiasi email/password.
        </p>

        <label className="mt-6 block">
          <span className="mb-2 block text-sm font-semibold text-white/70">Email</span>
          <input name="email" type="email" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none" />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-semibold text-white/70">Password</span>
          <input name="password" type="password" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none" />
        </label>

        {error && <div className="mt-4 rounded-xl bg-red-500/15 p-3 text-sm text-red-200">{error}</div>}

        <button className="mt-6 w-full rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950">
          Entra
        </button>
      </form>
    </main>
  );
}
