import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocalCms, saveLocalCms, type CmsItem } from '../lib/localStorageDb';

const tabs = [
  { key: 'services', label: 'Servizi' },
  { key: 'faqs', label: 'FAQ' },
  { key: 'seoPages', label: 'Pagine SEO' },
];

export function AdminCmsPage() {
  const [cms, setCms] = useState<Record<string, CmsItem[]>>({});
  const [activeTab, setActiveTab] = useState('services');

  useEffect(() => {
    setCms(getLocalCms());
  }, []);

  function addItem() {
    const next = {
      ...cms,
      [activeTab]: [
        {
          id: crypto.randomUUID(),
          title: 'Nuovo contenuto',
          content: '',
          status: 'draft' as const,
        },
        ...(cms[activeTab] || []),
      ],
    };
    setCms(next);
    saveLocalCms(next);
  }

  function updateItem(id: string, updates: Partial<CmsItem>) {
    const next = {
      ...cms,
      [activeTab]: (cms[activeTab] || []).map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    };
    setCms(next);
    saveLocalCms(next);
  }

  function removeItem(id: string) {
    const next = {
      ...cms,
      [activeTab]: (cms[activeTab] || []).filter((item) => item.id !== id),
    };
    setCms(next);
    saveLocalCms(next);
  }

  return (
    <main className="min-h-screen bg-[#F6F8FB] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <div>
            <div className="text-xl font-black">CMS AutoInspect</div>
            <div className="text-sm text-slate-500">Gestione contenuti base</div>
          </div>
          <nav className="flex gap-4 text-sm font-semibold">
            <Link to="/">Home</Link>
            <Link to="/admin/dashboard">Richieste</Link>
            <Link to="/admin/cms">CMS</Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-xl px-4 py-2 text-sm font-bold ${
                  activeTab === tab.key ? 'bg-slate-950 text-white' : 'bg-white text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={addItem}
            className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
          >
            Aggiungi contenuto
          </button>
        </div>

        <div className="grid gap-5">
          {(cms[activeTab] || []).map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-[1fr_160px_100px]">
                <input
                  value={item.title}
                  onChange={(event) => updateItem(item.id, { title: event.target.value })}
                  className="rounded-xl border border-slate-200 px-4 py-3 font-bold outline-none"
                />
                <select
                  value={item.status}
                  onChange={(event) => updateItem(item.id, { status: event.target.value as CmsItem['status'] })}
                  className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
                >
                  <option value="active">active</option>
                  <option value="draft">draft</option>
                </select>
                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-600"
                >
                  Elimina
                </button>
              </div>
              <textarea
                value={item.content}
                onChange={(event) => updateItem(item.id, { content: event.target.value })}
                rows={4}
                className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
