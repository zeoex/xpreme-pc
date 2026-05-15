"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, User, ChevronDown } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
}

let msgId = 0;
const nextId = () => ++msgId;

function genSessionId() {
  return "sess_" + Math.random().toString(36).slice(2, 11);
}

/* ── Robot avatar: imagen del mascot con fallback ── */
function BotAvatar({ size = 32 }: { size?: number }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-card border border-primary/40 flex items-center justify-center flex-shrink-0"
      >
        <span style={{ fontSize: size * 0.45 }}>🤖</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/bot-avatar.png"
      alt="Asistente"
      onError={() => setErr(true)}
      style={{ width: size, height: size, objectFit: "contain", objectPosition: "center bottom" }}
      className="rounded-full bg-white flex-shrink-0"
    />
  );
}

/* ── Typing indicator ── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-primary/60"
          style={{
            animation: "chatBounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Bubble ── */
function Bubble({ msg, onSuggestion }: { msg: Message; onSuggestion: (s: string) => void }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
      style={{
        animation: isUser ? "chatSlideRight 0.3s ease-out both" : "chatSlideLeft 0.3s ease-out both",
      }}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center self-end bg-primary/20 border border-primary/30">
          <User className="w-4 h-4 text-primary" />
        </div>
      ) : (
        <div className="self-end flex-shrink-0">
          <BotAvatar size={32} />
        </div>
      )}

      <div className={`flex flex-col gap-2 max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "bg-primary text-white rounded-2xl rounded-br-sm shadow-md shadow-primary/20"
              : "bg-secondary text-foreground rounded-2xl rounded-bl-sm border border-border/60"
          }`}
        >
          {msg.content}
        </div>

        {/* Suggestion chips */}
        {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5"
            style={{ animation: "chatFadeIn 0.4s ease-out 0.25s both" }}
          >
            {msg.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => onSuggestion(s)}
                className="text-xs px-3 py-1 rounded-full border border-primary/40 text-primary bg-primary/8 hover:bg-primary/20 hover:border-primary/60 transition-all duration-200 active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      role: "assistant",
      content: "¡Hola! Soy el asistente de Xpreme PC 👋 ¿En qué te puedo ayudar hoy?",
      suggestions: ["¿Qué servicios ofrecen?", "¿Cuánto cuesta el soporte?", "Necesito ayuda urgente"],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(genSessionId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages, loading]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { id: nextId(), role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: trimmed }),
      });
      const data = await res.json();
      const reply: Message = {
        id: nextId(),
        role: "assistant",
        content: data.reply || "No pude procesar tu consulta. Intentá de nuevo.",
        suggestions: data.suggestions?.slice(0, 3) || [],
      };
      setMessages((prev) => [...prev, reply]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", content: "Hubo un error de conexión. Por favor, intentá de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, sessionId, open]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <>
      <style>{`
        @keyframes chatBounce {
          0%,80%,100% { transform: translateY(0); }
          40%          { transform: translateY(-6px); }
        }
        @keyframes chatSlideLeft {
          from { opacity:0; transform: translateX(-12px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes chatSlideRight {
          from { opacity:0; transform: translateX(12px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes chatFadeIn {
          from { opacity:0; transform: translateY(6px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes chatPanelIn {
          from { opacity:0; transform: translateY(16px) scale(0.97); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes chatBotFloat {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          25%      { transform: translateY(-10px) rotate(1deg); }
          75%      { transform: translateY(-5px) rotate(-0.5deg); }
        }
        @keyframes chatBtnIn {
          from { opacity:0; transform: scale(0.3) translateY(24px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes chatBadgePop {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        @keyframes chatGlow {
          0%,100% { box-shadow: 0 6px 24px 4px hsla(199,89%,48%,0.35), 0 0 0 0 hsla(199,89%,48%,0); }
          50%      { box-shadow: 0 8px 40px 12px hsla(199,89%,48%,0.65), 0 0 60px 20px hsla(199,89%,48%,0.2); }
        }
      `}</style>

      {/* ── Floating button — robot mascot ── */}
      <div
        className="fixed bottom-0 right-0 z-50 w-[220px] h-[220px] pointer-events-none"
        style={mounted ? { animation: "chatBtnIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both" } : { opacity: 0 }}
      >
        {/* Unread badge */}
        {unread > 0 && !open && (
          <span
            className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center shadow pointer-events-none"
            style={{ animation: "chatBadgePop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
          >
            {unread}
          </span>
        )}

        {/* Robot (visible when closed) — fuera del clip del botón para mostrarse completo */}
        {!open && (
          <div
            className="absolute bottom-0 right-0 w-[200px] h-[200px] cursor-pointer select-none pointer-events-auto"
            onClick={() => setOpen(true)}
            style={{
              animation: "chatBotFloat 3.2s ease-in-out infinite, chatGlow 2.5s ease-in-out infinite",
              borderRadius: "50%",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bot-avatar.png"
              alt="Abrir chat"
              className="w-full h-full object-contain drop-shadow-xl"
              style={{ filter: "drop-shadow(0 4px 16px hsla(199,89%,48%,0.5))" }}
            />
          </div>
        )}

        {/* Botón cerrar (visible cuando está abierto) */}
        {open && (
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar chat"
            className="absolute bottom-4 right-4 z-10 w-14 h-14 rounded-full bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 pointer-events-auto"
            style={{ boxShadow: "0 4px 20px hsla(199,89%,48%,0.5)" }}
          >
            <ChevronDown className="w-7 h-7 text-white" />
          </button>
        )}
      </div>

      {/* ── Chat panel ── */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl border border-border/70 bg-card flex flex-col overflow-hidden"
          style={{
            maxHeight: "540px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px hsla(199,89%,48%,0.08)",
            animation: "chatPanelIn 0.35s cubic-bezier(0.34,1.2,0.64,1) both",
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b border-border/60 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, hsl(222,47%,8%), hsl(220,40%,10%))" }}
          >
            {/* Bot avatar */}
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                <BotAvatar size={42} />
              </div>
              <span
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-card"
                style={{ boxShadow: "0 0 6px #4ade80" }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-none">Asistente Xpreme PC</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                En línea · responde en segundos
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ── Messages ── */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0, scrollbarWidth: "thin" }}>
            {messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} onSuggestion={send} />
            ))}

            {/* Typing indicator */}
            {loading && (
              <div
                className="flex gap-2.5 items-end"
                style={{ animation: "chatSlideLeft 0.3s ease-out both" }}
              >
                <BotAvatar size={32} />
                <div className="bg-secondary rounded-2xl rounded-bl-sm border border-border/60 px-4 py-3">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* ── Input ── */}
          <div
            className="flex items-center gap-2 p-3 border-t border-border/60 flex-shrink-0"
            style={{ background: "hsl(222,47%,5%)" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribí tu consulta..."
              disabled={loading}
              className="flex-1 bg-secondary/60 border border-border/60 rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 active:scale-90"
              style={{
                background: input.trim() && !loading ? "hsl(199,89%,48%)" : "hsl(217,32%,18%)",
                boxShadow: input.trim() && !loading ? "0 4px 16px hsla(199,89%,48%,0.4)" : "none",
                color: "white",
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
