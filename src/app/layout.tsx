import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xpreme PC — Soporte Técnico & Desarrollo de Software",
  description:
    "Soporte técnico presencial y remoto, desarrollo de software a medida, redes y sistemas empresariales. Soluciones IT para tu empresa.",
  keywords: ["soporte técnico", "desarrollo de software", "sistemas", "redes", "IT", "Xpreme PC"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Aplica el tema antes de que React hidrate — evita flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t = localStorage.getItem('xpreme-theme');
            var isDark = t !== 'light';
            document.documentElement.classList.toggle('dark', isDark);
            document.documentElement.classList.toggle('light', !isDark);
          })();
        `}} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
