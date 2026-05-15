"use client";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Terminal, Cpu, Server, Shield } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";

const words = ["Software", "Sistemas", "Redes", "Soluciones"];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % words.length);
        setVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "hsl(268,75%,4%)" }}
    >
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Glow blobs encima del matrix — dan profundidad */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px]" style={{ background: "hsla(263,80%,58%,0.10)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "hsla(24,94%,53%,0.08)" }} />
        {/* Vignette lateral izquierda para que el texto sea legible */}
        <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: "linear-gradient(to right, rgba(6,8,18,0.85) 0%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,8,18,0.4) 0%, transparent 30%, transparent 70%, rgba(6,8,18,0.6) 100%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div className="animate-fade-up">
          <Badge className="mb-6 text-xs font-medium px-3 py-1" style={{ background: "hsla(263,80%,58%,0.15)", color: "hsl(263,80%,78%)", border: "1px solid hsla(263,80%,58%,0.4)" }}>
            Soluciones IT Profesionales
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-6">
            Soporte Técnico
            <br />
            &amp;{" "}
            <span
              className="transition-opacity duration-300"
              style={{ color: "hsl(263,80%,72%)", opacity: visible ? 1 : 0 }}
            >
              {words[wordIdx]}
            </span>
            <br />
            a medida
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
            En <strong className="text-foreground">Xpreme PC</strong> resolvemos
            los problemas tecnológicos de tu empresa: desde mantenimiento de
            equipos hasta sistemas de gestión y desarrollo web personalizado.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className={cn(buttonVariants({ size: "lg" }), "bg-primary text-white hover:bg-primary/90 gap-2")}
            >
              Hablar con un técnico <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#servicios"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-border text-foreground")}
            >
              Ver servicios
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border">
            {[
              { value: "500+", label: "Clientes atendidos" },
              { value: "10+", label: "Años de experiencia" },
              { value: "98%", label: "Satisfacción" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: terminal visual */}
        <div className="hidden lg:block animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            {/* Main terminal card */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">xpreme-pc ~ terminal</span>
              </div>
              {/* Terminal content */}
              <div className="p-5 font-mono text-sm space-y-2">
                <div className="text-green-400">$ diagnose --system --full</div>
                <div className="text-muted-foreground">Analizando hardware...</div>
                <div className="text-primary">✓ CPU: OK (35°C)</div>
                <div className="text-primary">✓ RAM: 16GB disponible</div>
                <div className="text-primary">✓ Disco: 98% saludable</div>
                <div className="text-primary">✓ Red: 250 Mbps estable</div>
                <div className="text-yellow-400">⚡ Optimizando servicios...</div>
                <div className="text-green-400">✓ Sistema optimizado</div>
                <div className="flex items-center gap-1 text-foreground">
                  <span>$</span>
                  <span className="cursor-blink">_</span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <Shield className="w-3 h-3" /> Soporte 24/7
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border text-xs font-mono px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <Server className="w-4 h-4 text-primary" />
              <span className="text-foreground">99.9% uptime</span>
            </div>

            {/* Icon grid */}
            <div className="absolute top-1/2 -right-16 flex flex-col gap-3 -translate-y-1/2">
              {[Terminal, Cpu, Server].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center shadow-md"
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
