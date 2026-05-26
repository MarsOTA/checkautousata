import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInspectionRequest } from '../../lib/api/requests';

const serviceOptions = [
  'Controllo Base',
  'Controllo Completo',
  'Controllo Premium',
];

export function BookingForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(event.currentTarget);

    const payload = {
      customer_name: String(form.get('customer_name') || ''),
      customer_email: String(form.get('customer_email') || ''),
      customer_phone: String(form.get('customer_phone') || ''),
      car_brand: String(form.get('car_brand') || ''),
      car_model: String(form.get('car_model') || ''),
      car_year: String(form.get('car_year') || ''),
      seller_city: String(form.get('seller_city') || ''),
      seller_address: String(form.get('seller_address') || ''),
      preferred_date: String(form.get('preferred_date') || ''),
      preferred_time: String(form.get('preferred_time') || ''),
      service_type: String(form.get('service_type') || 'Controllo Completo'),
      message: String(form.get('message') || ''),
      privacy_accepted: form.get('privacy_accepted') === 'on',
      marketing_accepted: form.get('marketing_accepted') === 'on',
    };

    if (!payload.customer_name || !payload.customer_phone || !payload.seller_city) {
      setError('Compila almeno nome, telefono e città del venditore.');
      setLoading(false);
      return;
    }

    if (!payload.privacy_accepted) {
      setError('Devi accettare la privacy policy per inviare la richiesta.');
      setLoading(false);
      return;
    }

    try {
      await createInspectionRequest(payload);
      navigate('/grazie');
    } catch (err) {
      console.error(err);
      setError('Errore durante l’invio. Riprova o verifica la configurazione Supabase.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nome e cognome" name="customer_name" required />
        <Field label="Telefono" name="customer_phone" required />
        <Field label="Email" name="customer_email" type="email" />
        <Field label="Città venditore" name="seller_city" required />
        <Field label="Marca auto" name="car_brand" />
        <Field label="Modello auto" name="car_model" />
        <Field label="Anno" name="car_year" />
        <Field label="Indirizzo/Zona venditore" name="seller_address" />
        <Field label="Data preferita" name="preferred_date" type="date" />
        <Field label="Fascia oraria" name="preferred_time" placeholder="Es. mattina, pomeriggio..." />

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Tipo servizio</span>
          <select
            name="service_type"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          >
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Messaggio</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Aggiungi dettagli sull’auto o sull’appuntamento..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          />
        </label>
      </div>

      <div className="mt-6 space-y-3 text-sm text-slate-600">
        <label className="flex items-start gap-3">
          <input name="privacy_accepted" type="checkbox" className="mt-1" />
          <span>Accetto la privacy policy e il trattamento dei dati per essere ricontattato.</span>
        </label>
        <label className="flex items-start gap-3">
          <input name="marketing_accepted" type="checkbox" className="mt-1" />
          <span>Accetto comunicazioni marketing opzionali.</span>
        </label>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Invio in corso...' : 'Invia richiesta'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
      />
    </label>
  );
}
