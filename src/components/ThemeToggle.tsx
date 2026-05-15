"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("xpreme-theme");
    const isDark = stored !== "light";
    apply(isDark);
    setDark(isDark);
  }, []);

  function apply(isDark: boolean) {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
  }

  const toggle = () => {
    const next = !dark;
    setDark(next);
    apply(next);
    localStorage.setItem("xpreme-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Modo claro" : "Modo oscuro"}
      title={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
      style={{
        background: "hsla(263,80%,62%,0.15)",
        border: "1px solid hsla(263,80%,62%,0.35)",
        color: "hsl(var(--primary))",
      }}
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
