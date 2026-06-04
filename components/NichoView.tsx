"use client";

import { useState, useRef } from "react";
import { Module } from "@/lib/modules";

interface NichoViewProps {
  module: Module;
}

function renderMarkdown(text: string): string {
  if (!text) return "";
  const lines = text.split("\n");
  const result: string[] = [];
  for (const rawLine of lines) {
    const line = rawLine.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (line.startsWith("### ")) { result.push(`<h3 style="color:#a78bfa;font-size:0.95rem;font-weight:700;margin:1.1rem 0 0.4rem">${formatInline(line.slice(4))}</h3>`); continue; }
    if (line.startsWith("## ")) { result.push(`<h2 style="color:#f59e0b;font-size:1.1rem;font-weight:700;margin:1.4rem 0 0.5rem">${formatInline(line.slice(3))}</h2>`); continue; }
    if (line.startsWith("# ")) { result.push(`<h1 style="color:#fbbf24;font-size:1.2rem;font-weight:800;margin:1.5rem 0 0.6rem">${formatInline(line.slice(2))}</h1>`); continue; }
    const numMatch = line.match(/^(\d+)\. (.+)$/);
    if (numMatch) { result.push(`<div style="display:flex;gap:0.6rem;margin-bottom:0.35rem"><span style="color:#f59e0b;font-weight:700;min-width:1.5rem">${numMatch[1]}.</span><span>${formatInline(numMatch[2])}</span></div>`); continue; }
    const bulletMatch = line.match(/^[-•*] (.+)$/);
    if (bulletMatch) { result.push(`<div style="display:flex;gap:0.6rem;margin-bottom:0.35rem"><span style="color:#f59e0b">▸</span><span>${formatInline(bulletMatch[1])}</span></div>`); continue; }
    if (line === "---") { result.push(`<hr style="border:none;border-top:1px solid rgba(245,158,11,0.2);margin:1.25rem 0"/>`); continue; }
    if (line.trim() === "") { result.push(`<div style="height:0.6rem"></div>`); continue; }
    result.push(`<p style="margin-bottom:0.3rem;line-height:1.7">${formatInline(line)}</p>`);
  }
  return result.join("");
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e2e8f0;font-weight:600">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:#fcd34d;font-style:italic">$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#1c1c29;color:#fbbf24;padding:0.1rem 0.35rem;border-radius:4px;font-size:0.85em">$1</code>');
}

interface Oferta {
  titulo: string;
  bullets: { tipo: "problema" | "solucion" | "resultado"; texto: string }[];
  precio: string;
  frase: string;
}

function parseOfertas(text: string): Oferta[] {
  // Simple parser: split by "---" or numbered sections
  const ofertas: Oferta[] = [];
  const sections = text.split(/\n---\n|\n\*\*\*\n/);
  for (const sec of sections) {
    if (sec.trim().length < 20) continue;
    const lines = sec.trim().split("\n").filter(l => l.trim());
    const titulo = lines[0]?.replace(/^#+\s*/, "").replace(/\*\*/g, "").trim() || "Oferta";
    const bullets: Oferta["bullets"] = [];
    let precio = "";
    let frase = "";
    for (const line of lines.slice(1)) {
      const clean = line.trim();
      if (clean.match(/^❌|^- ❌/)) bullets.push({ tipo: "problema", texto: clean.replace(/^-?\s*❌\s*/, "") });
      else if (clean.match(/^🤖|^- 🤖/)) bullets.push({ tipo: "solucion", texto: clean.replace(/^-?\s*🤖\s*/, "") });
      else if (clean.match(/^✅|^- ✅/)) bullets.push({ tipo: "resultado", texto: clean.replace(/^-?\s*✅\s*/, "") });
      else if (clean.match(/precio|setup|€|USD|\$/i)) precio = clean.replace(/\*\*/g, "").replace(/^[^:]+:\s*/, "");
      else if (clean.match(/^["""]|^[*_]/)) frase = clean.replace(/["""*_]/g, "").trim();
    }
    if (bullets.length > 0 || precio) {
      ofertas.push({ titulo, bullets, precio, frase });
    }
  }
  return ofertas.slice(0, 3);
}

export default function NichoView({ module }: NichoViewProps) {
  const [inputNicho, setInputNicho] = useState("");
  const [nicho, setNicho] = useState("");
  const [propuesta, setPropuesta] = useState("");
  const [ofertas, setOfertas] = useState("");
  const [isLoadingPropuesta, setIsLoadingPropuesta] = useState(false);
  const [isLoadingOfertas, setIsLoadingOfertas] = useState(false);
  const [error, setError] = useState("");
  const [copiedPropuesta, setCopiedPropuesta] = useState(false);
  const propuestaRef = useRef<HTMLDivElement>(null);
  const ofertasRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleAnadir = () => {
    if (!inputNicho.trim()) return;
    setNicho(inputNicho.trim());
    setInputNicho("");
    setPropuesta("");
    setOfertas("");
  };

  const handleAnalizar = async () => {
    if (!inputNicho.trim()) return;
    setNicho(inputNicho.trim());
    setInputNicho("");
    setPropuesta("");
    setOfertas("");
  };

  const handleGenerar = async () => {
    if (!nicho) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setIsLoadingPropuesta(true);
    setIsLoadingOfertas(false);
    setPropuesta("");
    setOfertas("");
    setError("");

    // Generar propuesta de valor
    try {
      const resp1 = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: module.systemPrompt,
          userPrompt: `Nicho seleccionado: ${nicho}\n\nGenera una Propuesta de Valor Transformacional para este nicho. Explica los problemas que enfrentan, cómo la IA los soluciona y los resultados concretos. Escríbelo en 3 párrafos como si hablaras directamente al dueño del negocio. Sé específico, emocional y orientado a resultados.`,
        }),
        signal: abortRef.current.signal,
      });
      if (!resp1.ok) throw new Error("Error del servidor");
      const reader1 = resp1.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader1.read();
        if (done) break;
        setPropuesta((prev) => prev + decoder.decode(value, { stream: true }));
        if (propuestaRef.current) propuestaRef.current.scrollTop = propuestaRef.current.scrollHeight;
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError("Error generando propuesta");
    } finally {
      setIsLoadingPropuesta(false);
    }

    // Generar ofertas
    setIsLoadingOfertas(true);
    try {
      const resp2 = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: `Eres un experto en diseño de ofertas de servicios de IA. Genera exactamente 3 ofertas de servicios para el nicho indicado. Cada oferta debe seguir EXACTAMENTE este formato:

## [Nombre de la oferta]
❌ [Problema que tiene el cliente]
🤖 [Solución con IA que ofreces]
✅ [Resultado concreto que obtiene]
Precio sugerido: [precio en €]
"[Frase de venta corta en cursiva]"

---

Separa cada oferta con ---. Sé muy específico con los precios y resultados.`,
          userPrompt: `Nicho: ${nicho}\n\nGenera 3 ofertas de servicios de IA específicas para este nicho con el formato exacto indicado.`,
        }),
        signal: abortRef.current.signal,
      });
      if (!resp2.ok) throw new Error("Error del servidor");
      const reader2 = resp2.body!.getReader();
      const decoder2 = new TextDecoder();
      while (true) {
        const { done, value } = await reader2.read();
        if (done) break;
        setOfertas((prev) => prev + decoder2.decode(value, { stream: true }));
        if (ofertasRef.current) ofertasRef.current.scrollTop = ofertasRef.current.scrollHeight;
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError("Error generando ofertas");
    } finally {
      setIsLoadingOfertas(false);
    }
  };

  const ofertasParsed = ofertas ? parseOfertas(ofertas) : [];
  const isLoading = isLoadingPropuesta || isLoadingOfertas;

  return (
    <div style={{ paddingTop: "76px", paddingBottom: "48px", minHeight: "100vh", backgroundColor: "#0f0f13" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#f59e0b", marginRight: "12px", verticalAlign: "middle", boxShadow: "0 0 10px #f59e0b80" }} />
            Seleccionar Nicho
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", paddingLeft: "22px" }}>Elige 1 nicho específico para enfocar tu oferta</p>
        </div>

        {/* Card añadir nicho */}
        <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>🎯</span>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>Añadir Nichos</h2>
            </div>
            <span style={{ fontSize: "12px", color: "#4b5563", fontWeight: 600 }}>
              {nicho ? "1/1" : "0/1"} nicho
            </span>
          </div>

          {/* Input + botones */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <input
              type="text"
              value={inputNicho}
              onChange={(e) => setInputNicho(e.target.value)}
              placeholder="Ej: Gimnasios pequeños que quieren conseguir más clientes..."
              onKeyDown={(e) => { if (e.key === "Enter") handleAnadir(); }}
              style={{
                flex: 1, backgroundColor: "#0f0f13", border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0",
                fontSize: "14px", outline: "none", fontFamily: "inherit",
              }}
            />
            <button
              onClick={handleAnalizar}
              disabled={!inputNicho.trim()}
              style={{
                padding: "10px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                border: "1px solid rgba(245,158,11,0.3)", backgroundColor: "transparent",
                color: inputNicho.trim() ? "#f59e0b" : "#374151", cursor: inputNicho.trim() ? "pointer" : "not-allowed",
                transition: "all 0.15s", whiteSpace: "nowrap",
              }}
            >
              Analizar Nicho
            </button>
            <button
              onClick={handleAnadir}
              disabled={!inputNicho.trim() || !!nicho}
              style={{
                padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 700,
                border: "none", cursor: inputNicho.trim() && !nicho ? "pointer" : "not-allowed",
                backgroundColor: inputNicho.trim() && !nicho ? "#f59e0b" : "rgba(255,255,255,0.06)",
                color: inputNicho.trim() && !nicho ? "#000" : "#374151",
                transition: "all 0.15s",
              }}
            >
              Añadir
            </button>
          </div>

          <p style={{ fontSize: "12px", color: "#f59e0b", marginBottom: nicho ? "16px" : "0" }}>
            Solo puedes elegir 1 nicho para mantener el enfoque
          </p>

          {/* Nicho añadido */}
          {nicho && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px", backgroundColor: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#f59e0b", fontSize: "13px" }}>✓</span>
                <span style={{ fontSize: "14px", color: "#e2e8f0" }}>{nicho}</span>
              </div>
              <button
                onClick={() => { setNicho(""); setPropuesta(""); setOfertas(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: "16px", padding: "0 4px" }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Botón generar */}
        {nicho && (
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <button
              onClick={handleGenerar}
              disabled={isLoading}
              style={{
                padding: "14px 40px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
                border: "none", cursor: isLoading ? "not-allowed" : "pointer",
                background: isLoading ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #f59e0bcc, #f59e0b)",
                color: isLoading ? "#374151" : "#000",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { if (!isLoading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 20px #f59e0b40"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {isLoading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "14px", height: "14px", border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  Generando...
                </span>
              ) : "Generar Ofertas y Propuesta de Valor"}
            </button>
          </div>
        )}

        {error && <div style={{ marginBottom: "16px", padding: "10px 14px", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "8px", color: "#fca5a5", fontSize: "13px" }}>{error}</div>}

        {/* Propuesta de valor */}
        {(propuesta || isLoadingPropuesta) && (
          <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(245,158,11,0.12)", borderRadius: "16px", overflow: "hidden", marginBottom: "24px" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "16px" }}>✨</span>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>
                  Propuesta de Valor Transformacional
                  {isLoadingPropuesta && <span style={{ marginLeft: "8px", display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#f59e0b", animation: "pulse 1s ease-in-out infinite" }} />}
                </h3>
              </div>
              {propuesta && !isLoadingPropuesta && (
                <button
                  onClick={async () => { await navigator.clipboard.writeText(propuesta); setCopiedPropuesta(true); setTimeout(() => setCopiedPropuesta(false), 2000); }}
                  style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, cursor: "pointer", border: "1px solid rgba(245,158,11,0.25)", backgroundColor: "transparent", color: copiedPropuesta ? "#f59e0b" : "#6b7280", transition: "all 0.15s" }}
                >
                  {copiedPropuesta ? "✓ Copiado" : "📋 Copiar"}
                </button>
              )}
            </div>
            <div ref={propuestaRef} style={{ padding: "24px", fontSize: "14px", lineHeight: "1.8", color: "#cbd5e1", maxHeight: "400px", overflowY: "auto" }}>
              <div dangerouslySetInnerHTML={{
                __html: renderMarkdown(propuesta) + (isLoadingPropuesta ? '<span style="display:inline-block;width:2px;height:1em;background:#f59e0b;border-radius:1px;animation:blink 1s step-end infinite;vertical-align:middle;margin-left:2px"></span>' : ""),
              }} />
            </div>
          </div>
        )}

        {/* Ofertas generadas */}
        {(ofertas || isLoadingOfertas) && (
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "18px" }}>🎁</span>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>
                Ofertas Generadas por Nicho
                {isLoadingOfertas && <span style={{ marginLeft: "8px", display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#f59e0b", animation: "pulse 1s ease-in-out infinite" }} />}
              </h3>
            </div>

            {/* Nombre del nicho */}
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#94a3b8", marginBottom: "16px", paddingLeft: "4px" }}>{nicho}</p>

            {isLoadingOfertas && ofertasParsed.length === 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ backgroundColor: "#13131a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ width: "20px", height: "20px", border: "2px solid rgba(245,158,11,0.3)", borderTopColor: "#f59e0b", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  </div>
                ))}
              </div>
            ) : ofertasParsed.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {ofertasParsed.map((oferta, i) => (
                  <div key={i} style={{ backgroundColor: "#13131a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0", lineHeight: "1.4" }}>{oferta.titulo}</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {oferta.bullets.map((b, j) => (
                        <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <span style={{ fontSize: "13px", flexShrink: 0 }}>
                            {b.tipo === "problema" ? "❌" : b.tipo === "solucion" ? "🤖" : "✅"}
                          </span>
                          <span style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.5" }}>{b.texto}</span>
                        </div>
                      ))}
                    </div>
                    {oferta.precio && (
                      <div style={{ marginTop: "auto" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
                          <span style={{ fontSize: "11px", color: "#4b5563" }}>Precio sugerido</span>
                          <span style={{ fontSize: "15px", fontWeight: 700, color: "#f59e0b" }}>{oferta.precio}</span>
                        </div>
                        {oferta.frase && (
                          <div style={{ padding: "8px 12px", backgroundColor: "rgba(245,158,11,0.06)", borderRadius: "6px", border: "1px solid rgba(245,158,11,0.12)" }}>
                            <p style={{ fontSize: "12px", color: "#94a3b8", fontStyle: "italic", lineHeight: "1.5" }}>"{oferta.frase}"</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div ref={ofertasRef} style={{ backgroundColor: "#13131a", border: "1px solid rgba(245,158,11,0.12)", borderRadius: "12px", padding: "24px", fontSize: "14px", lineHeight: "1.7", color: "#cbd5e1", maxHeight: "400px", overflowY: "auto" }}>
                <div dangerouslySetInnerHTML={{
                  __html: renderMarkdown(ofertas) + (isLoadingOfertas ? '<span style="display:inline-block;width:2px;height:1em;background:#f59e0b;border-radius:1px;animation:blink 1s step-end infinite;vertical-align:middle;margin-left:2px"></span>' : ""),
                }} />
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 768px) { .ofertas-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
