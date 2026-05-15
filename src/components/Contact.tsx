"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío (integrar con email service en producción)
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <section id="contacto" className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <div>
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 text-xs">
              Contacto
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Hablemos de tu proyecto
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Contanos qué necesitás y te contactamos dentro de las 2 horas hábiles con una solución y presupuesto claro.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: "Teléfono", value: "+54 9 XXX XXX XXXX" },
                { icon: Mail, label: "Email", value: "info@xpremepc.com.ar" },
                { icon: MapPin, label: "Zona de cobertura", value: "Buenos Aires y alrededores" },
                { icon: Clock, label: "Horarios", value: "Lun–Vie 9–18h · Sáb 9–13h" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                      <div className="text-sm font-medium text-foreground">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-5 rounded-xl bg-card border border-border">
              <div className="text-sm font-medium text-foreground mb-2">¿Necesitás soporte urgente?</div>
              <p className="text-xs text-muted-foreground mb-3">
                Para emergencias técnicas, también podés usar el chat IA en esta página o llamarnos directamente.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Asistente IA disponible 24/7 →
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">¡Mensaje enviado!</h3>
                <p className="text-muted-foreground text-sm">
                  Nos ponemos en contacto dentro de las próximas 2 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-6">Envianos tu consulta</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Nombre *</label>
                    <input
                      required
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Teléfono</label>
                    <input
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                      placeholder="+54 9 ..."
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Email *</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">¿En qué te podemos ayudar? *</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-none"
                    placeholder="Describí brevemente tu necesidad..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white gap-2"
                >
                  {loading ? "Enviando..." : <><Send className="w-4 h-4" /> Enviar consulta</>}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Primera consulta sin cargo · Respondemos en menos de 2 horas
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
