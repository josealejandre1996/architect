"use client";

import { useState } from "react";

const TIPOS_ANALISIS = [
  { id: "negocio", label: "Negocio", icon: "🏢", desc: "Analiza un cliente potencial" },
  { id: "competencia", label: "Competencia", icon: "🔍", desc: "Analiza a un competidor" },
  { id: "propuesta", label: "Propuesta", icon: "📊", desc: "Evalúa tu propuesta actual" },
  { id: "mercado", label: "Mercado", icon: "📈", desc: "Analiza el mercado de un nicho" },
];

export default function AnalizadorView() {
  const [tipoAnalisis, setTipoAnalisis] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const canGenerate = tipoAnalisis && descripcion && objetivo;

  const getPrompt = () => {
    const prompts: Record<string, string> = {
      Negocio: `Eres un consultor estratégico de IA. Analiza este negocio potencial como cliente para una agencia de IA:

Descripción: ${descripcion}
Objetivo del análisis: ${objetivo}

Proporciona:
1. 🎯 Puntuación de oportunidad (1-10) con justificación
2. 💡 3 problemas que la IA puede resolver YA en este negocio
3. 💰 Potencial de inversión estimado (qué pueden pagar)
4. ⚠️ 2 objeciones principales que pondrá
5. 🚀 Ángulo de entrada recomendado (cómo presentarte)
6. ✅ Veredicto: ¿Vale la pena perseguir este lead?

Sé directo y accionable. Máximo 400 palabras.`,
      Competencia: `Eres un analista estratégico. Analiza a este competidor en el espacio de agencias IA:

Descripción: ${descripcion}
Lo que quiero entender: ${objetivo}

Proporciona:
1. 🔍 Qué está haciendo bien (aprende de ello)
2. 💥 Sus debilidades y puntos ciegos
3. 🎯 Cómo diferenciarte de ellos
4. 💡 Oportunidades que ellos no están aprovechando
5. ⚡ Estrategia para ganarles clientes

Máximo 400 palabras.`,
      Propuesta: `Eres un coach de ventas de alto rendimiento. Evalúa esta propuesta comercial de agencia IA:

Propuesta / contexto: ${descripcion}
Objetivo: ${objetivo}

Evalúa:
1. 📊 Puntuación general (1-10)
2. ✅ Lo que está bien (no cambies esto)
3. ❌ Los 3 errores que están matando la conversión
4. 🔧 Cómo arreglar cada error (específico)
5. 💬 El mensaje que más resuena con el cliente
6. 🚀 Versión mejorada del CTA

Sé brutal pero constructivo. Máximo 400 palabras.`,
      Mercado: `Eres un analista de mercado especializado en IA aplicada a negocios. Analiza este mercado:

Nicho / mercado: ${descripcion}
Ángulo: ${objetivo}

Proporciona:
1. 📊 Tamaño y estado del mercado para IA
2. 🔥 Los 3 dolores más urgentes que la IA resuelve en este nicho
3. 💰 Rango de precios que acepta el mercado
4. ⚡ Nivel de madurez digital (qué tan fácil es vender IA aquí)
5. 🏆 Casos de uso de IA con mayor ROI en este nicho
6. ✅ Estrategia de entrada recomendada

Máximo 400 palabras.`,
    };
    return prompts[tipoAnalisis] || "";
  };

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
          messages: [{ role: "user", content: getPrompt() }],
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
          Analizador
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          Analiza negocios, competencia, propuestas y mercados con IA
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {/* Left */}
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem" }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
            PARÁMETROS
          </p>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.5rem" }}>
              Tipo de análisis <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {TIPOS_ANALISIS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTipoAnalisis(t.label)}
                  style={{
                    background: tipoAnalisis === t.label ? "#1e3a5f" : "#0f1117",
                    border: `1px solid ${tipoAnalisis === t.label ? "#3b82f6" : "#1e2535"}`,
                    borderRadius: "8px",
                    padding: "0.6rem 0.5rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: "0.85rem" }}>
                    {t.icon} <span style={{ color: tipoAnalisis === t.label ? "#93c5fd" : "#d1d5db", fontWeight: 600 }}>{t.label}</span>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.7rem" }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              Descripción / Contexto <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder={
                tipoAnalisis === "Negocio"
                  ? "Describe el negocio: sector, tamaño, cómo funciona, qué vende..."
                  : tipoAnalisis === "Competencia"
                  ? "Describe al competidor: nombre, qué ofrece, precios, clientes..."
                  : tipoAnalisis === "Propuesta"
                  ? "Pega tu propuesta o describe qué estás ofreciendo y a quién..."
                  : "Describe el mercado o nicho que quieres analizar..."
              }
              rows={5}
              style={{
                width: "100%",
                background: "#0f1117",
                border: "1px solid #1e2535",
                borderRadius: "8px",
                color: "#e5e7eb",
                fontSize: "0.82rem",
                padding: "0.6rem 0.75rem",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
                lineHeight: 1.6,
              }}
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              ¿Qué quieres saber específicamente? <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <input
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              placeholder="Ej: Si vale la pena contactarlos, qué IA necesitan más..."
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
            {loading ? "Analizando..." : "Generar con IA"}
          </button>
        </div>

        {/* Right */}
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1rem" }}>
            ANÁLISIS
          </p>
          {!result && !loading && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <div style={{ fontSize: "2rem" }}>🔬</div>
              <p style={{ color: "#4b5563", fontSize: "0.85rem", textAlign: "center" }}>
                Completa los parámetros y haz clic en{" "}
                <span style={{ color: "#6b7280" }}>Generar con IA</span>
              </p>
            </div>
          )}
          {loading && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>🔍 Procesando análisis...</div>
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
                  minHeight: "300px",
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
                {copied ? "✓ Copiado" : "Copiar análisis"}
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "10px", padding: "1rem", marginTop: "1rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
          💡 <strong style={{ color: "#d1d5db" }}>Tip:</strong> Analiza cada lead antes de llamar. 5 minutos de análisis previo duplican tu tasa de cierre.
        </p>
      </div>
    </div>
  );
}
