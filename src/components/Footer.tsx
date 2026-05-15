import { Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Servicios: ["Soporte Técnico", "Desarrollo de Software", "Desarrollo Web", "Redes & Infraestructura", "Mantenimiento PCs"],
  Empresa: ["Nosotros", "Por qué elegirnos", "Contacto"],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                Xpreme<span className="text-primary">PC</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Soporte técnico y desarrollo de software para empresas y personas. Tu socio tecnológico de confianza.
            </p>
            <p className="text-muted-foreground text-xs mt-4">
              📍 Buenos Aires, Argentina
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-border mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Xpreme PC. Todos los derechos reservados.</span>
          <span>Desarrollado con ❤️ para hacer tu tecnología más simple</span>
        </div>
      </div>
    </footer>
  );
}
