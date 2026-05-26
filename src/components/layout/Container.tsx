import type { PropsWithChildren } from 'react';
export function Container({children,className=''}:PropsWithChildren<{className?:string}>){return <div className={`mx-auto w-full max-w-7xl px-5 md:px-8 ${className}`}>{children}</div>}
