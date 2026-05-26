import type { RequestStatus } from '../../types/request';
export function StatusBadge({status}:{status?:RequestStatus}){return <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">{status||'new'}</span>}
