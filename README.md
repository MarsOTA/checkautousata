# AutoInspect / Meccanico a Domicilio

MVP fullstack React + Vite + TypeScript + Tailwind + Supabase.

## Avvio locale
```bash
npm install
cp .env.example .env
npm run dev
```

## Supabase
1. Crea un progetto Supabase.
2. Esegui `supabase/schema.sql` nel SQL editor.
3. Esegui `supabase/policies.sql`.
4. Crea un utente admin in Supabase Auth.
5. Inserisci in `admin_users` il suo `user_id`.

## Hero image
L'immagine è in `public/hero-inspection.png`. Puoi sostituirla mantenendo lo stesso nome.

## Pagine
- `/` landing
- `/prenota` form richiesta
- `/grazie` thank you
- `/admin/login` login admin
- `/admin` dashboard
- `/admin/cms` CMS base

Nota: senza env Supabase configurato, il form usa localStorage per permettere test immediato.
