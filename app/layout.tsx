import type { ReactNode } from 'react';
import './globals.css';

// Minimal root shell. The real <html> / <body> live in app/[locale]/layout.tsx so
// that `lang` can be set from the active locale; Next only requires that one
// layout in the chain renders them.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
