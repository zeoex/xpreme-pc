import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Users, Wrench, ShieldCheck, Headphones, Code2 } from "lucide-react";

const values = [
  "Respuesta rápida: atendemos dentro de las 2 horas",
  "Técnicos certificados con experiencia comprobada",
  "Transparencia total: presupuesto antes de empezar",
  "Soporte post-servicio sin costo adicional",
  "Trabajo con empresas, pymes y usuarios particulares",
  "Confidencialidad de tus datos garantizada",
];

const stats = [
  { value: "500+", label: "Clientes activos" },
  { value: "10+", label: "Años en el mercado" },
  { value: "3.000+", label: "Equipos reparados" },
  { value: "98%", label: "Satisfacción del cliente" },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 text-xs">
              Quiénes somos
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
              Tecnología que trabaja
              <br />
              para vos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Xpreme PC nació con la misión de simplificar la tecnología para
              empresas y personas. Más de 10 años brindando soluciones IT
              confiables, rápidas y accesibles en toda la región.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nuestro equipo de técnicos certificados combina experiencia en
              hardware, redes y desarrollo de software para ofrecer una
              solución integral. No somos solo un servicio técnico: somos el
              departamento IT de tu empresa.
            </p>

            <ul className="space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {v}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: stats grid */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Feature pills grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Clock,       label: "Respuesta en 2h",    desc: "Atención rápida" },
                { icon: Headphones,  label: "Soporte 24/7",       desc: "Siempre disponible" },
                { icon: ShieldCheck, label: "Garantía incluida",  desc: "Sin costos ocultos" },
                { icon: Code2,       label: "Software a medida",  desc: "Desarrollo propio" },
                { icon: Users,       label: "Empresas y Pymes",   desc: "Cualquier tamaño" },
                { icon: Wrench,      label: "Técnicos cert.",     desc: "10+ años exp." },
              ].map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
