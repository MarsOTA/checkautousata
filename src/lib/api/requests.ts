import { supabase, isSupabaseConfigured } from '../supabaseClient';
import type { InspectionRequest, RequestStatus } from '../../types/request';
const localKey='autoinspect_requests';
const readLocal=():InspectionRequest[]=>JSON.parse(localStorage.getItem(localKey)||'[]');
const writeLocal=(rows:InspectionRequest[])=>localStorage.setItem(localKey,JSON.stringify(rows));
export async function createInspectionRequest(payload: InspectionRequest){
 if(!isSupabaseConfigured){ const rows=readLocal(); const row={...payload,id:crypto.randomUUID(),created_at:new Date().toISOString(),status:'new' as RequestStatus}; writeLocal([row,...rows]); return row; }
 const {data,error}=await supabase.from('inspection_requests').insert(payload).select().single(); if(error) throw error; return data;
}
export async function listInspectionRequests(){
 if(!isSupabaseConfigured) return readLocal();
 const {data,error}=await supabase.from('inspection_requests').select('*').order('created_at',{ascending:false}); if(error) throw error; return data as InspectionRequest[];
}
export async function updateInspectionRequest(id:string, patch:Partial<InspectionRequest>){
 if(!isSupabaseConfigured){ const rows=readLocal().map(r=>r.id===id?{...r,...patch,updated_at:new Date().toISOString()}:r); writeLocal(rows); return rows.find(r=>r.id===id); }
 const {data,error}=await supabase.from('inspection_requests').update(patch).eq('id',id).select().single(); if(error) throw error; return data;
}
