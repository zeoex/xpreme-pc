"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("xpreme-theme");
    const isDark = stored !== "light";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("xpreme-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Modo claro" : "Modo oscuro"}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
      style={{
        background: dark ? "hsla(271,65%,65%,0.15)" : "hsla(271,60%,52%,0.1)",
        border: "1px solid hsla(271,60%,52%,0.3)",
        color: "hsl(var(--primary))",
      }}
    >
      {dark
        ? <Sun  className="w-4 h-4" />
        : <Moon className="w-4 h-4" />}
    </button>
  );
}
