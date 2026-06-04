"use client";

import { useState, useRef } from "react";
import { Module } from "@/lib/modules";

interface SolucionesViewProps {
  module: Module;
  problemasSeleccionados: string[];
}

const SOLUCIONES_MAP: Record<string, {
  icono: string;
  iconoBg: string;
  nombre: string;
  sub: string;
  bullets: string[];
  transformacion: string;
  transformacionBg: string;
}> = {
  landing: {
    icono: "🌐",
    iconoBg: "linear-gradient(135deg, #3b82f6, #6366f1)",
    nombre: "Agente Web Inteligente",
    sub: "Tu web convierte sola",
    bullets: ["Diseño optimizado para conversión", "Chat IA 24/7 integrado", "CTAs automáticos inteligentes", "Test A/B continuo"],
    transformacion: 'De "web estática" a "máquina de conversión"',
    transformacionBg: "rgba(99,102,241,0.12)",
  },
  captacion: {
    icono: "🎯",
    iconoBg: "linear-gradient(135deg, #8b5cf6, #a855f7)",
    nombre: "Sistema de Captación IA",
    sub: "Atrae clientes mientras duermes",
    bullets: ["Anuncios optimizados con IA", "Clonación de audiencias", "Email marketing automático", "Lead scoring inteligente"],
    transformacion: 'De "esperar clientes" a "atraerlos en automático"',
    transformacionBg: "rgba(139,92,246,0.12)",
  },
  atencion: {
    icono: "🤖",
    iconoBg: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    nombre: "Agente de Atención 24/7",
    sub: "Responde sin intervención humana",
    bullets: ["Chatbot con IA entrenado", "WhatsApp automático", "Calificación de leads", "Respuesta instantánea"],
    transformacion: 'De "responder en horas" a "respuesta en segundos"',
    transformacionBg: "rgba(6,182,212,0.12)",
  },
  seguimiento: {
    icono: "🔄",
    iconoBg: "linear-gradient(135deg, #10b981, #06b6d4)",
    nombre: "Sistema de Seguimiento IA",
    sub: "El dinero está en el seguimiento",
    bullets: ["Recordatorios automáticos", "CRM inteligente integrado", "Secuencias de email", "Alertas en tiempo real"],
    transformacion: 'De "olvidar leads" a "seguimiento perfecto siempre"',
    transformacionBg: "rgba(16,185,129,0.12)",
  },
  propuestas: {
    icono: "📄",
    iconoBg: "linear-gradient(135deg, #f59e0b, #ef4444)",
    nombre: "Generador de Propuestas IA",
    sub: "Cierra más rápido con menos fricción",
    bullets: ["Propuestas automáticas personalizadas", "Personalización por cliente", "Firma digital integrada", "Seguimiento post-envío"],
    transformacion: 'De "horas haciendo propuestas" a "propuesta en 2 minutos"',
    transformacionBg: "rgba(245,158,11,0.12)",
  },
  fidelizacion: {
    icono: "❤️",
    iconoBg: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    nombre: "Sistema de Fidelización IA",
    sub: "Cliente feliz = cliente que vuelve",
    bullets: ["Felicitaciones automáticas", "Encuestas de satisfacción", "Programa de referidos IA", "Seguimiento post-compra"],
    transformacion: 'De "clientes que se van" a "clientes que recomiendan"',
    transformacionBg: "rgba(236,72,153,0.12)",
  },
  contenido: {
    icono: "📱",
    iconoBg: "linear-gradient(135deg, #f97316, #f59e0b)",
    nombre: "Agente de Contenido IA",
    sub: "Presencia digital en piloto automático",
    bullets: ["Contenido generado con IA", "Publicación multicanal", "Calendario editorial automático", "Análisis de rendimiento"],
    transformacion: 'De "sin tiempo para contenido" a "presencia constante"',
    transformacionBg: "rgba(249,115,22,0.12)",
  },
  upsells: {
    icono: "📈",
    iconoBg: "linear-gradient(135deg, #22c55e, #10b981)",
    nombre: "Motor de Upsell IA",
    sub: "Más valor por cliente = más rentabilidad",
    bullets: ["Ofertas personalizadas por IA", "Timing perfecto de oferta", "Recomendaciones inteligentes", "Análisis de comportamiento"],
    transformacion: 'De "vender una vez" a "cada cliente compra más"',
    transformacionBg: "rgba(34,197,94,0.12)",
  },
};

function renderMarkdown(text: string): string {
  if (!text) return "";
  const lines = text.split("\n");
  const result: string[] = [];
  for (const rawLine of lines) {
    const line = rawLine.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (line.startsWith("### ")) { result.push(`<h3 style="color:#a78bfa;font-size:0.95rem;font-weight:700;margin:1.1rem 0 0.4rem">${formatInline(line.slice(4))}</h3>`); continue; }
    if (line.startsWith("## ")) { result.push(`<h2 style="color:#8b5cf6;font-size:1.1rem;font-weight:700;margin:1.4rem 0 0.5rem">${formatInline(line.slice(3))}</h2>`); continue; }
    if (line.startsWith("# ")) { result.push(`<h1 style="color:#c4b5fd;font-size:1.2rem;font-weight:800;margin:1.5rem 0 0.6rem">${formatInline(line.slice(2))}</h1>`); continue; }
    const numMatch = line.match(/^(\d+)\. (.+)$/);
    if (numMatch) { result.push(`<div style="display:flex;gap:0.6rem;margin-bottom:0.35rem"><span style="color:#22c55e;font-weight:700;min-width:1.5rem">${numMatch[1]}.</span><span>${formatInline(numMatch[2])}</span></div>`); continue; }
    const bulletMatch = line.match(/^[-•*] (.+)$/);
    if (bulletMatch) { result.push(`<div style="display:flex;gap:0.6rem;margin-bottom:0.35rem"><span style="color:#22c55e">▸</span><span>${formatInline(bulletMatch[1])}</span></div>`); continue; }
    if (line === "---") { result.push(`<hr style="border:none;border-top:1px solid rgba(34,197,94,0.2);margin:1.25rem 0"/>`); continue; }
    if (line.trim() === "") { result.push(`<div style="height:0.6rem"></div>`); continue; }
    result.push(`<p style="margin-bottom:0.3rem;line-height:1.7">${formatInline(line)}</p>`);
  }
  return result.join("");
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e2e8f0;font-weight:600">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:#86efac;font-style:italic">$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#1c1c29;color:#4ade80;padding:0.1rem 0.35rem;border-radius:4px;font-size:0.85em">$1</code>');
}

export default function SolucionesView({ module, problemasSeleccionados }: SolucionesViewProps) {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showIA, setShowIA] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const solucionesActivas = problemasSeleccionados
    .map((id) => SOLUCIONES_MAP[id])
    .filter(Boolean);

  const handleGenerarIA = async () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setIsLoading(true);
    setOutput("");
    setError("");
    setShowIA(true);

    const problemasTexto = problemasSeleccionados
      .map((id) => SOLUCIONES_MAP[id]?.nombre)
      .filter(Boolean)
      .join(", ");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: module.systemPrompt,
          userPrompt: `Diseña soluciones de IA concretas para estos problemas: ${problemasTexto}. Para cada uno detalla el stack tecnológico, proceso de implementación, ROI esperado y precio sugerido.`,
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) throw new Error("Error del servidor");
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
        if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
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

  return (
    <div style={{ paddingTop: "76px", paddingBottom: "48px", minHeight: "100vh", backgroundColor: "#0f0f13" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#22c55e", marginRight: "12px", verticalAlign: "middle", boxShadow: "0 0 10px #22c55e80" }} />
            Solucionar el Problema
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", paddingLeft: "22px" }}>
            {solucionesActivas.length > 0
              ? `${solucionesActivas.length} soluciones basadas en los problemas seleccionados`
              : "Selecciona problemas primero para ver las soluciones"}
          </p>
        </div>

        {/* Si no hay problemas seleccionados */}
        {solucionesActivas.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 24px", color: "#374151" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
            <p style={{ fontSize: "14px" }}>Ve a <strong style={{ color: "#4b5563" }}>Problemas</strong> y selecciona hasta 4 para ver las soluciones</p>
          </div>
        )}

        {/* Tarjetas de soluciones */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {solucionesActivas.map((sol, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#13131a",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "24px 28px",
              }}
            >
              {/* Header tarjeta */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: sol.iconoBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px", flexShrink: 0,
                }}>
                  {sol.icono}
                </div>
                <div>
                  <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#f1f5f9", marginBottom: "2px" }}>{sol.nombre}</h2>
                  <p style={{ fontSize: "13px", color: "#64748b" }}>{sol.sub}</p>
                </div>
              </div>

              {/* Bullets en 2 columnas */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px", marginBottom: "16px" }}>
                {sol.bullets.map((b, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "#22c55e", fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>●</span>
                    <span style={{ fontSize: "13px", color: "#94a3b8" }}>{b}</span>
                  </div>
                ))}
              </div>

              {/* Frase de transformación */}
              <div style={{
                backgroundColor: sol.transformacionBg,
                borderRadius: "8px",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span style={{ fontSize: "14px" }}>⚡</span>
                <span style={{ fontSize: "13px", color: "#cbd5e1", fontStyle: "italic" }}>{sol.transformacion}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Botón generar análisis IA */}
        {solucionesActivas.length > 0 && !showIA && (
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <button
              onClick={handleGenerarIA}
              style={{
                padding: "14px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
                border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #22c55ecc 0%, #22c55e 100%)",
                color: "#fff", letterSpacing: "0.04em",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 20px #22c55e40"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Generar análisis detallado con IA →
            </button>
          </div>
        )}

        {/* Output IA */}
        {showIA && (
          <div style={{ marginTop: "32px", backgroundColor: "#13131a", border: "1px solid rgba(34,197,94,0.12)", borderRadius: "14px", overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4b5563" }}>
                Análisis Detallado
                {isLoading && <span style={{ marginLeft: "8px", display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e", animation: "pulse 1s ease-in-out infinite" }} />}
              </span>
              {output && (
                <button onClick={handleCopy} style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, cursor: "pointer", border: "1px solid rgba(34,197,94,0.25)", backgroundColor: "transparent", color: copied ? "#22c55e" : "#6b7280", transition: "all 0.15s" }}>
                  {copied ? "✓ Copiado" : "Copiar"}
                </button>
              )}
            </div>
            <div ref={outputRef} style={{ padding: "24px", overflowY: "auto", fontSize: "14px", lineHeight: "1.7", color: "#cbd5e1", maxHeight: "500px" }}>
              {error && <div style={{ color: "#fca5a5", fontSize: "13px" }}>{error}</div>}
              {(output || isLoading) && (
                <div dangerouslySetInnerHTML={{
                  __html: renderMarkdown(output) + (isLoading ? '<span style="display:inline-block;width:2px;height:1em;background:#22c55e;border-radius:1px;animation:blink 1s step-end infinite;vertical-align:middle;margin-left:2px"></span>' : ""),
                }} />
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 640px) { .bullets-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
