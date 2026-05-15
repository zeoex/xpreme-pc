import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wrench, Code2, Globe, Network, Monitor, Building2, ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Soporte Técnico",
    badge: "Presencial & Remoto",
    desc: "Diagnóstico, reparación y mantenimiento de equipos. Atención rápida en sitio o a distancia para que tu negocio no se detenga.",
    features: ["Diagnóstico y reparación", "Mantenimiento preventivo", "Soporte remoto inmediato", "Servicio en domicilio"],
  },
  {
    icon: Code2,
    title: "Desarrollo de Software",
    badge: "A medida",
    desc: "Creamos sistemas personalizados que se adaptan exactamente a los procesos de tu empresa: ERP, CRM, gestión de stock, facturación y más.",
    features: ["Sistemas de gestión (ERP/CRM)", "Facturación electrónica AFIP", "Automatizaciones", "Integraciones API"],
  },
  {
    icon: Globe,
    title: "Desarrollo Web",
    badge: "Sitios & E-commerce",
    desc: "Sitios web profesionales, tiendas online y aplicaciones web modernas con las últimas tecnologías y diseño responsive.",
    features: ["Sitios institucionales", "Tiendas online", "Aplicaciones web", "SEO y performance"],
  },
  {
    icon: Network,
    title: "Redes & Infraestructura",
    badge: "LAN / WiFi / VPN",
    desc: "Diseño, instalación y administración de redes. Desde la red local de tu oficina hasta soluciones cloud y servidores.",
    features: ["Instalación de redes LAN/WiFi", "Configuración de routers", "VPN y seguridad", "Servidores NAS"],
  },
  {
    icon: Monitor,
    title: "Mantenimiento de PCs",
    badge: "Gaming & Oficina",
    desc: "Armado, upgrade y mantenimiento de PCs de escritorio, notebooks y equipos gaming. Máximo rendimiento para tu equipo.",
    features: ["Armado de PCs personalizadas", "Upgrade de componentes", "Limpieza interna", "Optimización de SO"],
  },
  {
    icon: Building2,
    title: "Sistemas Empresariales",
    badge: "Cloud & On-premise",
    desc: "Implementación de soluciones empresariales: servidores, dominio, Office 365, Google Workspace y aplicaciones de gestión.",
    features: ["Office 365 / Google Workspace", "Servidor de dominio", "Backup corporativo", "Soporte IT continuo"],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-background/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 text-xs">
            Qué hacemos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Servicios IT completos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Todo lo que tu empresa necesita en tecnología, en un solo lugar.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <Card
                key={svc.title}
                className="bg-card border-border hover:border-primary/40 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge className="text-xs bg-secondary text-muted-foreground border-0">
                      {svc.badge}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{svc.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{svc.desc}</p>
                  <ul className="space-y-1.5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
