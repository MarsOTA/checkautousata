import { isSupabaseConfigured, supabase } from '../supabaseClient';
import {
  getLocalRequests,
  saveLocalRequest,
  updateLocalRequest,
  type LocalInspectionRequest,
} from '../localStorageDb';

export type InspectionRequestPayload = {
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
  privacy_accepted: boolean;
  marketing_accepted: boolean;
};

export async function createInspectionRequest(payload: InspectionRequestPayload) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('inspection_requests')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  return saveLocalRequest(payload);
}

export async function listInspectionRequests() {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('inspection_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  return getLocalRequests();
}

export async function updateInspectionRequest(
  id: string,
  updates: Partial<LocalInspectionRequest>
) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('inspection_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  return updateLocalRequest(id, updates);
}
