"use client";

import { useState } from "react";

const TIPOS_SCRIPT = [
  { id: "cold_call", label: "Cold Call", icon: "📞", desc: "Primera llamada en frío" },
  { id: "follow_up", label: "Follow-up", icon: "🔄", desc: "Seguimiento tras contacto" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", desc: "Mensaje de apertura" },
  { id: "email", label: "Email", icon: "✉️", desc: "Secuencia de correos" },
  { id: "cierre", label: "Cierre", icon: "🤝", desc: "Script de cierre final" },
  { id: "objeciones", label: "Objeciones", icon: "🛡️", desc: "Manejo de objeciones" },
];

export default function ScriptsView() {
  const [nicho, setNicho] = useState("");
  const [tipoScript, setTipoScript] = useState("");
  const [propuestaValor, setPropuestaValor] = useState("");
  const [tono, setTono] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const canGenerate = nicho && tipoScript && propuestaValor && tono;

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
              content: `Eres un experto en ventas consultivas para agencias de IA. Crea un script de ${tipoScript} para vender servicios de IA a "${nicho}".

Propuesta de valor del agente/servicio: ${propuestaValor}
Tono: ${tono}

El script debe:
- Ser natural, no robótico
- Incluir manejo de las 2 objeciones más comunes del nicho
- Tener un CTA claro al final
- Duración estimada si es llamada
- Usar el contexto específico del nicho (menciona dolores reales de "${nicho}")

Formato con secciones claras usando emojis. Máximo 450 palabras.`,
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
          Scripts de Venta
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          Genera scripts persuasivos adaptados a tu nicho y canal
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {/* Left */}
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem" }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
            PARÁMETROS
          </p>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              Tipo de script <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {TIPOS_SCRIPT.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTipoScript(t.label)}
                  style={{
                    background: tipoScript === t.label ? "#1e3a5f" : "#0f1117",
                    border: `1px solid ${tipoScript === t.label ? "#3b82f6" : "#1e2535"}`,
                    borderRadius: "8px",
                    padding: "0.5rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: "0.85rem" }}>
                    {t.icon} <span style={{ color: tipoScript === t.label ? "#93c5fd" : "#d1d5db", fontWeight: 600 }}>{t.label}</span>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.7rem" }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              Nicho del cliente <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <input
              value={nicho}
              onChange={(e) => setNicho(e.target.value)}
              placeholder="Ej: Clínicas dentales, gimnasios, inmobiliarias..."
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
              Propuesta de valor / Agente IA <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <textarea
              value={propuestaValor}
              onChange={(e) => setPropuestaValor(e.target.value)}
              placeholder="Ej: Agente IA que responde WhatsApp 24/7 y agenda citas automáticamente..."
              rows={3}
              style={{
                width: "100%",
                background: "#0f1117",
                border: "1px solid #1e2535",
                borderRadius: "8px",
                color: "#e5e7eb",
                fontSize: "0.85rem",
                padding: "0.6rem 0.75rem",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              Tono del script <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <select
              value={tono}
              onChange={(e) => setTono(e.target.value)}
              style={{
                width: "100%",
                background: "#0f1117",
                border: "1px solid #1e2535",
                borderRadius: "8px",
                color: tono ? "#e5e7eb" : "#6b7280",
                fontSize: "0.85rem",
                padding: "0.6rem 0.75rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="">Selecciona una opción...</option>
              <option value="profesional y directo">Profesional y directo</option>
              <option value="consultivo y empático">Consultivo y empático</option>
              <option value="cercano y conversacional">Cercano y conversacional</option>
              <option value="urgente y orientado a resultados">Urgente y orientado a resultados</option>
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
            {loading ? "Escribiendo script..." : "Generar con IA"}
          </button>
        </div>

        {/* Right */}
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1rem" }}>
            SCRIPT GENERADO
          </p>
          {!result && !loading && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <div style={{ fontSize: "2rem" }}>📝</div>
              <p style={{ color: "#4b5563", fontSize: "0.85rem", textAlign: "center" }}>
                Completa los parámetros y haz clic en{" "}
                <span style={{ color: "#6b7280" }}>Generar con IA</span>
              </p>
            </div>
          )}
          {loading && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>✍️ Redactando tu script...</div>
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
                {copied ? "✓ Copiado" : "Copiar script"}
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "10px", padding: "1rem", marginTop: "1rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
          💡 <strong style={{ color: "#d1d5db" }}>Tip:</strong> Practica el script 3 veces en voz alta antes de usarlo. La fluidez convierte el 40% más que el contenido.
        </p>
      </div>
    </div>
  );
}
