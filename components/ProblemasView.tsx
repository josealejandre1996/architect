"use client";

import { useState, useRef } from "react";
import { Module } from "@/lib/modules";

interface ProblemasViewProps {
  module: Module;
}

const PROBLEMAS_CARDS = [
  {
    id: "landing",
    icon: "🌐",
    nombre: "Landing Page",
    sub: "Tu web es tu local digital",
  },
  {
    id: "captacion",
    icon: "🎯",
    nombre: "Captación de Leads",
    sub: "Sin leads nuevos, el negocio muere",
  },
  {
    id: "atencion",
    icon: "🤖",
    nombre: "Atención Automática",
    sub: "Responde 24/7 sin intervención humana",
  },
  {
    id: "seguimiento",
    icon: "🔄",
    nombre: "Seguimiento Automático",
    sub: "El dinero está en el seguimiento",
  },
  {
    id: "propuestas",
    icon: "📄",
    nombre: "Propuestas y Cotizaciones",
    sub: "Cierra más rápido con menos fricción",
  },
  {
    id: "fidelizacion",
    icon: "❤️",
    nombre: "Fidelización de Clientes",
    sub: "Cliente feliz = cliente que vuelve",
  },
  {
    id: "contenido",
    icon: "📱",
    nombre: "Gestión de Contenido",
    sub: "Tu presencia digital en piloto automático",
  },
  {
    id: "upsells",
    icon: "📈",
    nombre: "Upsells / Cross-sells",
    sub: "Más valor por cliente = más rentabilidad",
  },
];

const MAX_SELECCION = 4;

function renderMarkdown(text: string): string {
  if (!text) return "";
  const lines = text.split("\n");
  const result: string[] = [];
  for (const rawLine of lines) {
    const line = rawLine
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    if (line.startsWith("### ")) {
      result.push(`<h3 style="color:#a78bfa;font-size:0.95rem;font-weight:700;margin:1.1rem 0 0.4rem">${formatInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      result.push(`<h2 style="color:#8b5cf6;font-size:1.1rem;font-weight:700;margin:1.4rem 0 0.5rem">${formatInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("# ")) {
      result.push(`<h1 style="color:#c4b5fd;font-size:1.2rem;font-weight:800;margin:1.5rem 0 0.6rem">${formatInline(line.slice(2))}</h1>`);
      continue;
    }
    const numMatch = line.match(/^(\d+)\. (.+)$/);
    if (numMatch) {
      result.push(`<div style="display:flex;gap:0.6rem;margin-bottom:0.35rem;align-items:flex-start"><span style="color:#ef4444;font-weight:700;min-width:1.5rem;flex-shrink:0">${numMatch[1]}.</span><span>${formatInline(numMatch[2])}</span></div>`);
      continue;
    }
    const bulletMatch = line.match(/^[-•*] (.+)$/);
    if (bulletMatch) {
      result.push(`<div style="display:flex;gap:0.6rem;margin-bottom:0.35rem;align-items:flex-start"><span style="color:#ef4444;flex-shrink:0">▸</span><span>${formatInline(bulletMatch[1])}</span></div>`);
      continue;
    }
    if (line === "---" || line === "***" || line === "___") {
      result.push(`<hr style="border:none;border-top:1px solid rgba(239,68,68,0.2);margin:1.25rem 0"/>`);
      continue;
    }
    if (line.trim() === "") {
      result.push(`<div style="height:0.6rem"></div>`);
      continue;
    }
    result.push(`<p style="margin-bottom:0.3rem;line-height:1.7">${formatInline(line)}</p>`);
  }
  return result.join("");
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e2e8f0;font-weight:600">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:#fca5a5;font-style:italic">$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#1c1c29;color:#f87171;padding:0.1rem 0.35rem;border-radius:4px;font-size:0.85em">$1</code>');
}

export default function ProblemasView({ module }: ProblemasViewProps) {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const isValid = seleccionados.length > 0;

  const toggleCard = (id: string) => {
    if (seleccionados.includes(id)) {
      setSeleccionados((prev) => prev.filter((s) => s !== id));
    } else {
      if (seleccionados.length >= MAX_SELECCION) return;
      setSeleccionados((prev) => [...prev, id]);
    }
  };

  const handleGenerate = async () => {
    if (!isValid) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setIsLoading(true);
    setOutput("");
    setError("");

    const problemasTexto = seleccionados
      .map((id) => {
        const p = PROBLEMAS_CARDS.find((c) => c.id === id);
        return p ? `${p.nombre}: ${p.sub}` : "";
      })
      .filter(Boolean)
      .join("\n");

    const values = {
      sector: problemasTexto,
      tamano: `${seleccionados.length} problemas seleccionados`,
      region: "",
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: module.systemPrompt,
          userPrompt: `Analiza estos problemas de negocio que una agencia de IA puede resolver:\n\n${problemasTexto}\n\nPara cada problema identifica: impacto económico, cómo la IA lo resuelve, nivel de urgencia y facilidad de venta. Sé específico y práctico.`,
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: "Error del servidor" }));
        throw new Error(errData.error || `Error ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setOutput("");
    setError("");
    if (abortRef.current) abortRef.current.abort();
    setIsLoading(false);
  };

  return (
    <div style={{ paddingTop: "76px", paddingBottom: "48px", minHeight: "100vh", backgroundColor: "#0f0f13" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            <span style={{
              display: "inline-block", width: "10px", height: "10px", borderRadius: "50%",
              backgroundColor: "#ef4444", marginRight: "12px", verticalAlign: "middle",
              boxShadow: "0 0 10px #ef444480",
            }} />
            {module.name}
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", paddingLeft: "22px" }}>{module.description}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)", gap: "20px", alignItems: "start" }} className="module-grid">

          {/* LEFT PANEL */}
          <div style={{
            backgroundColor: "#13131a", border: "1px solid rgba(239,68,68,0.12)",
            borderRadius: "14px", padding: "24px", position: "sticky", top: "76px",
          }}>

            {/* Título sección */}
            <div style={{ marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0", marginBottom: "4px" }}>
                Detectar Problemas
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                ¿Qué problemas vas a resolver?{" "}
                <span style={{ color: "#ef4444", fontWeight: 600 }}>Máximo {MAX_SELECCION}</span>
              </p>
            </div>

            {/* Contador */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    border: seleccionados.length >= n ? "2px solid #ef4444" : "2px solid rgba(239,68,68,0.2)",
                    backgroundColor: seleccionados.length >= n ? "rgba(239,68,68,0.1)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 700,
                    color: seleccionados.length >= n ? "#ef4444" : "#374151",
                    transition: "all 0.2s ease",
                  }}
                >
                  {n}
                </div>
              ))}
              <span style={{ fontSize: "13px", color: "#4b5563", marginLeft: "4px" }}>
                {seleccionados.length}/{MAX_SELECCION} seleccionados
              </span>
            </div>

            {/* 8 tarjetas en grid 2x4 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
              {PROBLEMAS_CARDS.map((card) => {
                const selected = seleccionados.includes(card.id);
                const disabled = !selected && seleccionados.length >= MAX_SELECCION;
                return (
                  <button
                    key={card.id}
                    onClick={() => toggleCard(card.id)}
                    disabled={disabled}
                    style={{
                      padding: "12px 10px",
                      borderRadius: "10px",
                      border: selected
                        ? "1.5px solid #ef4444"
                        : "1px solid rgba(255,255,255,0.07)",
                      backgroundColor: selected
                        ? "rgba(239,68,68,0.08)"
                        : disabled
                        ? "rgba(255,255,255,0.01)"
                        : "rgba(255,255,255,0.02)",
                      cursor: disabled ? "not-allowed" : "pointer",
                      transition: "all 0.15s",
                      textAlign: "left",
                      opacity: disabled ? 0.4 : 1,
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (!selected && !disabled) {
                        e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
                        e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.04)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selected && !disabled) {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                      }
                    }}
                  >
                    {selected && (
                      <span style={{
                        position: "absolute", top: "6px", right: "6px",
                        width: "16px", height: "16px", borderRadius: "50%",
                        backgroundColor: "#ef4444",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", color: "#fff",
                      }}>✓</span>
                    )}
                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>{card.icon}</div>
                    <div style={{
                      fontSize: "12px", fontWeight: 700,
                      color: selected ? "#ef4444" : "#e2e8f0",
                      marginBottom: "2px", lineHeight: "1.3",
                    }}>
                      {card.nombre}
                    </div>
                    <div style={{ fontSize: "10px", color: "#4b5563", lineHeight: "1.3" }}>
                      {card.sub}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Error */}
            {error && (
              <div style={{ marginBottom: "16px", padding: "10px 14px", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px", color: "#fca5a5", fontSize: "13px" }}>
                {error}
              </div>
            )}

            {/* Botón */}
            <button
              onClick={handleGenerate}
              disabled={!isValid || isLoading}
              style={{
                width: "100%", padding: "12px 20px", borderRadius: "10px",
                fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em", border: "none",
                cursor: isValid && !isLoading ? "pointer" : "not-allowed",
                background: isValid && !isLoading
                  ? "linear-gradient(135deg, #ef4444cc 0%, #ef4444 100%)"
                  : "rgba(255,255,255,0.06)",
                color: isValid && !isLoading ? "#fff" : "#374151",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (isValid && !isLoading) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 20px #ef444440";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {isLoading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  Generando...
                </span>
              ) : "Identificar Problemas"}
            </button>
          </div>

          {/* RIGHT PANEL — Output */}
          <div style={{
            backgroundColor: "#13131a", border: "1px solid rgba(239,68,68,0.12)",
            borderRadius: "14px", overflow: "hidden", minHeight: "500px",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              padding: "14px 20px", borderBottom: "1px solid rgba(239,68,68,0.1)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4b5563" }}>
                Resultado
                {isLoading && (
                  <span style={{ marginLeft: "8px", display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#ef4444", animation: "pulse 1s ease-in-out infinite" }} />
                )}
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                {output && (
                  <>
                    <button onClick={handleCopy} style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, cursor: "pointer", border: "1px solid rgba(239,68,68,0.25)", backgroundColor: "transparent", color: copied ? "#ef4444" : "#6b7280", transition: "all 0.15s" }}>
                      {copied ? "✓ Copiado" : "Copiar"}
                    </button>
                    <button onClick={handleClear} style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "transparent", color: "#6b7280", transition: "all 0.15s" }}>
                      Limpiar
                    </button>
                  </>
                )}
              </div>
            </div>

            <div ref={outputRef} style={{ flex: 1, padding: "24px", overflowY: "auto", fontSize: "14px", lineHeight: "1.7", color: "#cbd5e1", minHeight: "460px", maxHeight: "calc(100vh - 220px)" }}>
              {!output && !isLoading && (
                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", color: "#374151", userSelect: "none" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.727 12.727.707.707M3 12h1m16 0h1M4.22 19.78l.707-.707M18.95 5.05l-.707.707" stroke="rgba(239,68,68,0.4)" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="4" stroke="rgba(239,68,68,0.4)" strokeWidth="2" />
                    </svg>
                  </div>
                  <p style={{ fontSize: "13px" }}>
                    Selecciona hasta {MAX_SELECCION} problemas y haz clic en{" "}
                    <strong style={{ color: "#4b5563" }}>Identificar Problemas</strong>
                  </p>
                </div>
              )}
              {(output || isLoading) && (
                <div dangerouslySetInnerHTML={{
                  __html: renderMarkdown(output) + (isLoading ? '<span style="display:inline-block;width:2px;height:1em;background:#ef4444;border-radius:1px;animation:blink 1s step-end infinite;vertical-align:middle;margin-left:2px"></span>' : ""),
                }} />
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 768px) { .module-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
