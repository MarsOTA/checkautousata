import type { InputHTMLAttributes } from 'react';
export function FormInput(props:InputHTMLAttributes<HTMLInputElement>&{label:string}){const {label,...rest}=props;return <label className="block"><span className="mb-2 block text-sm font-bold text-ink">{label}</span><input {...rest} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan"/></label>}
