import { Badge } from "@/components/ui/badge";
import { Clock, ShieldCheck, Users, Headphones, Wrench, Star } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Respuesta en 2 horas",
    desc: "Sabemos que cada minuto sin sistema es dinero perdido. Garantizamos respuesta inmediata.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía en todos los trabajos",
    desc: "Todos nuestros servicios incluyen garantía. Si algo falla, volvemos sin costo.",
  },
  {
    icon: Users,
    title: "Equipo certificado",
    desc: "Técnicos con certificaciones vigentes en redes, hardware y desarrollo de software.",
  },
  {
    icon: Headphones,
    title: "Soporte continuo",
    desc: "Canal directo con tu técnico asignado. Sin call centers, sin esperas, atención personalizada.",
  },
  {
    icon: Wrench,
    title: "Soluciones integrales",
    desc: "Un solo proveedor para todo: hardware, software, redes y desarrollo. Sin intermediarios.",
  },
  {
    icon: Star,
    title: "Relación a largo plazo",
    desc: "Nos convertimos en tu departamento IT externo. Crecemos junto con tu empresa.",
  },
];

export default function WhyUs() {
  return (
    <section id="porqueelegirnos" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 text-xs">
            Por qué elegirnos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            La diferencia Xpreme PC
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No somos un servicio técnico más. Somos el socio tecnológico que tu empresa necesita.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5 text-sm">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div className="mt-16 rounded-2xl bg-primary/10 border border-primary/20 p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            ¿Listo para mejorar tu infraestructura IT?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Primera consulta sin cargo. Analizamos tu situación y te damos un presupuesto claro y detallado.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Solicitar consulta gratuita
          </a>
        </div>
      </div>
    </section>
  );
}
