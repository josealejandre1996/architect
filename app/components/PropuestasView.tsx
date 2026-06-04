"use client";

import { useState } from "react";

export default function PropuestasView() {
  const [cliente, setCliente] = useState("");
  const [nicho, setNicho] = useState("");
  const [problema, setProblema] = useState("");
  const [solucion, setSolucion] = useState("");
  const [precio, setPrecio] = useState("");
  const [modelo, setModelo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const canGenerate = cliente && nicho && problema && solucion && precio && modelo;

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
              content: `Eres un experto en propuestas comerciales de alto valor para agencias de IA. Redacta una propuesta profesional y persuasiva con la siguiente información:

Cliente: ${cliente}
Nicho: ${nicho}
Problema que resuelve: ${problema}
Solución IA propuesta: ${solucion}
Precio / inversión: ${precio}
Modelo de cobro: ${modelo}

La propuesta debe incluir:
1. Apertura que conecta con el dolor del cliente
2. Por qué ahora (urgencia de mercado con IA)
3. Solución específica con entregables claros
4. ROI estimado / métricas de éxito
5. Inversión y lo que incluye
6. Garantía o condición de confianza
7. Próximo paso claro (CTA)

Tono: profesional pero accesible. Que el cliente sienta que lo entiendes. Máximo 500 palabras.`,
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
          Propuestas
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          Genera propuestas comerciales que convierten leads en clientes
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {/* Left */}
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem" }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
            DATOS DE LA PROPUESTA
          </p>

          {[
            { label: "Nombre del cliente / empresa", value: cliente, setter: setCliente, placeholder: "Ej: Clínica Dental Sonrisas" },
            { label: "Nicho / industria", value: nicho, setter: setNicho, placeholder: "Ej: Clínicas dentales en CDMX" },
            { label: "Problema principal del cliente", value: problema, setter: setProblema, placeholder: "Ej: Pierden leads porque no contestan WhatsApp fuera de horario..." },
            { label: "Solución IA propuesta", value: solucion, setter: setSolucion, placeholder: "Ej: Agente IA en WhatsApp que califica y agenda citas 24/7..." },
          ].map(({ label, value, setter, placeholder }) => (
            <div key={label} style={{ marginBottom: "0.9rem" }}>
              <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
                {label} <span style={{ color: "#3b82f6" }}>*</span>
              </label>
              <textarea
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                rows={2}
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
                }}
              />
            </div>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
                Precio <span style={{ color: "#3b82f6" }}>*</span>
              </label>
              <input
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Ej: $1,500 USD"
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
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
                Modelo de cobro <span style={{ color: "#3b82f6" }}>*</span>
              </label>
              <select
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                style={{
                  width: "100%",
                  background: "#0f1117",
                  border: "1px solid #1e2535",
                  borderRadius: "8px",
                  color: modelo ? "#e5e7eb" : "#6b7280",
                  fontSize: "0.82rem",
                  padding: "0.6rem 0.75rem",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">Modelo...</option>
                <option value="pago único + mantenimiento mensual">Pago único + mantenimiento</option>
                <option value="suscripción mensual recurrente">Suscripción mensual</option>
                <option value="setup + retainer mensual">Setup + retainer</option>
                <option value="revenue share (% de resultados)">Revenue share</option>
              </select>
            </div>
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
            {loading ? "Redactando propuesta..." : "Generar con IA"}
          </button>
        </div>

        {/* Right */}
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1rem" }}>
            PROPUESTA COMERCIAL
          </p>
          {!result && !loading && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <div style={{ fontSize: "2rem" }}>📄</div>
              <p style={{ color: "#4b5563", fontSize: "0.85rem", textAlign: "center" }}>
                Completa los datos y haz clic en{" "}
                <span style={{ color: "#6b7280" }}>Generar con IA</span>
              </p>
            </div>
          )}
          {loading && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>📋 Construyendo tu propuesta...</div>
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
                  minHeight: "320px",
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
                {copied ? "✓ Copiado" : "Copiar propuesta"}
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "10px", padding: "1rem", marginTop: "1rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
          💡 <strong style={{ color: "#d1d5db" }}>Tip:</strong> Envía la propuesta en PDF con tu logo. Una propuesta bien presentada aumenta el precio percibido un 30%.
        </p>
      </div>
    </div>
  );
}
