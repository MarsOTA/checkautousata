import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listInspectionRequests, updateInspectionRequest } from '../lib/api/requests';
import type { LocalInspectionRequest } from '../lib/localStorageDb';

const statuses = ['new', 'contacted', 'scheduled', 'completed', 'cancelled', 'archived'];

export function AdminDashboardPage() {
  const [requests, setRequests] = useState<LocalInspectionRequest[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  async function load() {
    const data = await listInspectionRequests();
    setRequests(data as LocalInspectionRequest[]);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = requests.filter((item) => {
    const haystack = `${item.customer_name} ${item.customer_phone} ${item.seller_city} ${item.car_brand} ${item.car_model}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (!status || item.status === status);
  });

  async function changeStatus(id: string, nextStatus: string) {
    await updateInspectionRequest(id, { status: nextStatus as LocalInspectionRequest['status'] });
    await load();
  }

  return (
    <main className="min-h-screen bg-[#F6F8FB] text-slate-950">
      <AdminHeader />

      <section className="container mx-auto px-4 py-10">
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Stat title="Totali" value={requests.length} />
          <Stat title="Nuove" value={requests.filter((r) => r.status === 'new').length} />
          <Stat title="Contattate" value={requests.filter((r) => r.status === 'contacted').length} />
          <Stat title="Completate" value={requests.filter((r) => r.status === 'completed').length} />
        </div>

        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cerca nome, telefono, città, auto..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none"
          />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
          >
            <option value="">Tutti gli status</option>
            {statuses.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4">Cliente</th>
                <th className="p-4">Contatto</th>
                <th className="p-4">Auto</th>
                <th className="p-4">Città</th>
                <th className="p-4">Servizio</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="p-4 font-semibold">{item.customer_name}</td>
                  <td className="p-4">
                    <div>{item.customer_phone}</div>
                    <div className="text-slate-500">{item.customer_email}</div>
                  </td>
                  <td className="p-4">{item.car_brand} {item.car_model} {item.car_year}</td>
                  <td className="p-4">{item.seller_city}</td>
                  <td className="p-4">{item.service_type}</td>
                  <td className="p-4">
                    <select
                      value={item.status}
                      onChange={(event) => changeStatus(item.id, event.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-2"
                    >
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td className="p-8 text-center text-slate-500" colSpan={6}>
                    Nessuna richiesta trovata.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function AdminHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-5">
        <div>
          <div className="text-xl font-black">Admin AutoInspect</div>
          <div className="text-sm text-slate-500">Richieste e CMS</div>
        </div>
        <nav className="flex gap-4 text-sm font-semibold">
          <Link to="/">Home</Link>
          <Link to="/admin/dashboard">Richieste</Link>
          <Link to="/admin/cms">CMS</Link>
        </nav>
      </div>
    </header>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-black">{value}</div>
    </div>
  );
}
