export type LocalInspectionRequest = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  car_brand: string;
  car_model: string;
  car_year: string;
  seller_city: string;
  seller_address: string;
  preferred_date?: string;
  preferred_time?: string;
  service_type: string;
  message?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled' | 'archived';
  admin_notes?: string;
  privacy_accepted: boolean;
  marketing_accepted: boolean;
};

const REQUESTS_KEY = 'autoinspect_requests';

export function getLocalRequests(): LocalInspectionRequest[] {
  try {
    return JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveLocalRequest(payload: Omit<LocalInspectionRequest, 'id' | 'created_at' | 'status'>) {
  const requests = getLocalRequests();
  const request: LocalInspectionRequest = {
    ...payload,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    status: 'new',
  };
  localStorage.setItem(REQUESTS_KEY, JSON.stringify([request, ...requests]));
  return request;
}

export function updateLocalRequest(id: string, updates: Partial<LocalInspectionRequest>) {
  const requests = getLocalRequests();
  const next = requests.map((item) => (item.id === id ? { ...item, ...updates } : item));
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(next));
  return next.find((item) => item.id === id);
}

export type CmsItem = {
  id: string;
  title: string;
  content: string;
  status: 'active' | 'draft';
};

const CMS_KEY = 'autoinspect_cms';

const defaultCms: Record<string, CmsItem[]> = {
  services: [
    {
      id: 'service-1',
      title: 'Controllo Base',
      content: 'Controllo visivo essenziale prima dell’acquisto.',
      status: 'active',
    },
    {
      id: 'service-2',
      title: 'Controllo Completo',
      content: 'Ispezione completa con report digitale e foto.',
      status: 'active',
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      title: 'Dove viene effettuato il controllo?',
      content: 'Il controllo viene effettuato presso il venditore o nel luogo concordato.',
      status: 'active',
    },
    {
      id: 'faq-2',
      title: 'Ricevo un report scritto?',
      content: 'Sì, ricevi un report digitale con foto e note tecniche.',
      status: 'active',
    },
  ],
  seoPages: [
    {
      id: 'seo-1',
      title: 'Controllo auto usata Milano',
      content: 'Pagina SEO dedicata al controllo auto usata a Milano.',
      status: 'draft',
    },
  ],
};

export function getLocalCms() {
  try {
    return JSON.parse(localStorage.getItem(CMS_KEY) || JSON.stringify(defaultCms));
  } catch {
    return defaultCms;
  }
}

export function saveLocalCms(data: Record<string, CmsItem[]>) {
  localStorage.setItem(CMS_KEY, JSON.stringify(data));
}
