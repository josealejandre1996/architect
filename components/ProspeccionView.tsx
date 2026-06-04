"use client";

import { useState } from "react";

const FUENTES = [
  { id: "google_maps", label: "Google Maps", icon: "🗺️", desc: "Negocios locales geolocalizados" },
  { id: "apollo", label: "Apollo.io", icon: "🚀", desc: "Leads B2B con email verificado" },
  { id: "apify", label: "Apify", icon: "🤖", desc: "Scraping avanzado y automatizado" },
  { id: "linkedin", label: "LinkedIn", icon: "💼", desc: "Contactos profesionales" },
];

export default function ProspeccionView() {
  const [nicho, setNicho] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [fuente, setFuente] = useState("");
  const [volumen, setVolumen] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const canGenerate = nicho && ciudad && fuente && volumen;

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Eres un experto en prospección B2B para agencias de IA. Genera una guía paso a paso detallada para conseguir ${volumen} leads del nicho "${nicho}" en "${ciudad}" usando ${fuente}.

Incluye:
1. Configuración exacta de búsqueda/filtros en ${fuente}
2. Palabras clave específicas para ese nicho
3. Criterios de calificación del lead
4. Cómo exportar a CSV listo para importar al CRM
5. Truco avanzado específico para ese nicho+fuente

Formato: usa emojis, sé muy específico y accionable. Máximo 400 palabras.`,
            },
          ],
        }),
      });
      const data = await response.json();
      const text = data.content?.map((c: { type: string; text?: string }) => c.text || "").join("") || "Error al generar";
      setResult(text);
    } catch {
      setResult("Error al conectar con la IA. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "960px" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
          Prospección
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          Encuentra y califica leads de alta calidad para tu nicho
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {/* Left: params */}
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem" }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
            PARÁMETROS
          </p>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              Nicho objetivo <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <input
              value={nicho}
              onChange={(e) => setNicho(e.target.value)}
              placeholder="Ej: Clínicas dentales con 3-10 empleados..."
              style={{
                width: "100%",
                background: "#0f1117",
                border: "1px solid #1e2535",
                borderRadius: "8px",
                color: "#e5e7eb",
                fontSize: "0.85rem",
                padding: "0.6rem 0.75rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              Ciudad / Región <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <input
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="Ej: Ciudad de México, Madrid..."
              style={{
                width: "100%",
                background: "#0f1117",
                border: "1px solid #1e2535",
                borderRadius: "8px",
                color: "#e5e7eb",
                fontSize: "0.85rem",
                padding: "0.6rem 0.75rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.5rem" }}>
              Fuente de prospección <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {FUENTES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFuente(f.label)}
                  style={{
                    background: fuente === f.label ? "#1e3a5f" : "#0f1117",
                    border: `1px solid ${fuente === f.label ? "#3b82f6" : "#1e2535"}`,
                    borderRadius: "8px",
                    padding: "0.6rem 0.5rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: "0.9rem" }}>{f.icon} <span style={{ color: fuente === f.label ? "#93c5fd" : "#d1d5db", fontSize: "0.8rem", fontWeight: 600 }}>{f.label}</span></div>
                  <div style={{ color: "#6b7280", fontSize: "0.7rem", marginTop: "0.1rem" }}>{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              Volumen objetivo <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <select
              value={volumen}
              onChange={(e) => setVolumen(e.target.value)}
              style={{
                width: "100%",
                background: "#0f1117",
                border: "1px solid #1e2535",
                borderRadius: "8px",
                color: volumen ? "#e5e7eb" : "#6b7280",
                fontSize: "0.85rem",
                padding: "0.6rem 0.75rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="">Selecciona una opción...</option>
              <option value="50 leads">50 leads (prueba rápida)</option>
              <option value="200 leads">200 leads (campaña inicial)</option>
              <option value="500 leads">500 leads (campaña media)</option>
              <option value="1000+ leads">1000+ leads (campaña masiva)</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || loading}
            style={{
              width: "100%",
              background: canGenerate && !loading ? "linear-gradient(135deg, #1d4ed8, #7c3aed)" : "#1e2535",
              color: canGenerate && !loading ? "#fff" : "#4b5563",
              border: "none",
              borderRadius: "8px",
              padding: "0.7rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: canGenerate && !loading ? "pointer" : "not-allowed",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Generando estrategia..." : "Generar con IA"}
          </button>
        </div>

        {/* Right: result */}
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1rem" }}>
            ESTRATEGIA DE PROSPECCIÓN
          </p>
          {!result && !loading && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <div style={{ fontSize: "2rem" }}>🎯</div>
              <p style={{ color: "#4b5563", fontSize: "0.85rem", textAlign: "center" }}>
                Completa los parámetros y haz clic en{" "}
                <span style={{ color: "#6b7280" }}>Generar con IA</span>
              </p>
            </div>
          )}
          {loading && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>⏳ Construyendo tu estrategia...</div>
            </div>
          )}
          {result && !loading && (
            <>
              <div
                style={{
                  flex: 1,
                  background: "#0f1117",
                  border: "1px solid #1e2535",
                  borderRadius: "8px",
                  padding: "1rem",
                  color: "#d1d5db",
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  minHeight: "280px",
                }}
              >
                {result}
              </div>
              <button
                onClick={handleCopy}
                style={{
                  marginTop: "0.75rem",
                  background: copied ? "#1a3a2a" : "#1e2535",
                  border: `1px solid ${copied ? "#22c55e" : "#2d3748"}`,
                  color: copied ? "#22c55e" : "#9ca3af",
                  borderRadius: "6px",
                  padding: "0.4rem 1rem",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                {copied ? "✓ Copiado" : "Copiar estrategia"}
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "10px", padding: "1rem", marginTop: "1rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
          💡 <strong style={{ color: "#d1d5db" }}>Tip:</strong> Exporta siempre en CSV e importa directo a tu CRM de Airtable. Los leads entran automáticamente como "Nuevo lead".
        </p>
      </div>
    </div>
  );
}
