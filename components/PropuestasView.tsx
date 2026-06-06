"use client";

import { useState } from "react";

const TIPOS_CLIENTE = ["Gimnasio / Fitness", "Clínica dental", "Restaurante", "E-commerce", "Inmobiliaria", "Agencia de marketing", "Consultoría", "Otro negocio local"];
const CANALES = ["Reunión presencial/Zoom", "Envío por email", "WhatsApp", "LinkedIn", "Presentación en evento"];
const OBJETIVOS_RAPIDOS = ["Reducir cancelaciones", "Captar más leads", "Automatizar atención al cliente", "Aumentar ticket promedio", "Mejorar fidelización"];

export default function PropuestasView() {
  const [tipoCliente, setTipoCliente] = useState("");
  const [canal, setCanal] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);

  const canGenerate = tipoCliente && canal && objetivo;

  const generarPrompt = () => {
    const prompt = `Crea una presentación profesional para ${tipoCliente} que muestre cómo la IA puede transformar el negocio enfocándose en: ${objetivo}.

El tono debe ser cercano, profesional y claro, enfocado en resultados, evitando tecnicismos.
El estilo visual debe ser moderno y tecnológico, con diseño limpio, colores suaves y premium, espacio generoso y bullets claros.
Canal de presentación: ${canal}.

Estructura de la presentación:

SLIDE 1 - PORTADA
Título impactante relacionado con ${objetivo} para ${tipoCliente}
Subtítulo: "IA aplicada a resultados reales"

SLIDE 2 - EL PROBLEMA ACTUAL
3-4 dolores reales y específicos de ${tipoCliente}: falta de respuesta rápida, pérdida de clientes por falta de seguimiento, dificultad para atraer nuevos leads.

SLIDE 3 - LO QUE ESTÁ COSTANDO NO RESOLVERLO
Tiempo perdido, efectos en el equipo por sobrecarga, oportunidades comerciales que se pierden. Usa cifras estimadas cuando sea posible.

SLIDE 4 - LA OPORTUNIDAD CON IA
Automatización de la atención, inmediatez, escalabilidad, mejora de experiencia del cliente. Específico para ${tipoCliente}.

SLIDE 5 - NUESTRA SOLUCIÓN
Presentar como un "copiloto invisible del negocio", no un software. Apoya en atención al cliente, captación y fidelización.

SLIDE 6 - CÓMO ACTÚA EN EL DÍA A DÍA
3 ejemplos concretos de cómo funciona en el día a día de ${tipoCliente}.

SLIDE 7 - TRANSFORMACIÓN ESPERABLE
Antes vs Después: tabla comparativa con 4 situaciones reales de ${tipoCliente}.

SLIDE 8 - POR QUÉ ESTE ENFOQUE ES DIFERENTE
Enfoque especializado en ${tipoCliente}, soluciones personalizadas, evolutiva para adaptarse al mercado.

SLIDE 9 - RESULTADOS ESPERABLES
4 métricas concretas de mejora esperables en los primeros 90 días.

SLIDE 10 - LLAMADO A LA ACCIÓN
CTA claro y sin fricción. Ej: "Descubre cómo esto podría funcionar en tu negocio".`;

    setResultado(prompt);
  };

  const copiar = () => {
    navigator.clipboard.writeText(resultado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div style={{ paddingTop: "5rem", padding: "2rem", maxWidth: "960px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#14b8a6", display: "inline-block" }} />
          Propuesta (Presentación)
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.92rem" }}>Genera un prompt para crear tu presentación en Gamma</p>
      </div>

      {/* Info card */}
      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem" }}>
        <h2 style={{ color: "#14b8a6", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.75rem" }}>¿Qué es esto?</h2>
        <p style={{ color: "#9ca3af", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "0.5rem" }}>
          Esta herramienta genera un <span style={{ color: "#14b8a6", fontWeight: 600 }}>prompt optimizado para Gamma</span> que crea presentaciones profesionales y persuasivas.
        </p>
        <p style={{ color: "#9ca3af", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
          El prompt estructura toda la información de tu propuesta y la convierte en una presentación lista para usar con tus clientes.
        </p>
        <p style={{ color: "#6b7280", fontSize: "0.82rem", lineHeight: 1.6 }}>
          💡 Gamma es una herramienta que crea presentaciones automáticamente. Solo pegas el prompt y obtienes una presentación profesional en segundos.
        </p>
      </div>

      {/* Config card */}
      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem" }}>
        <h2 style={{ color: "#14b8a6", fontSize: "0.95rem", fontWeight: 600, marginBottom: "1.25rem" }}>Configuración de la Propuesta</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              Tipo de Cliente <span style={{ color: "#14b8a6" }}>*</span>
            </label>
            <select value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value)}
              style={{ width: "100%", background: "#0f1117", border: "1px solid #1e2535", borderRadius: "8px", color: tipoCliente ? "#e5e7eb" : "#6b7280", fontSize: "0.85rem", padding: "0.6rem 0.75rem", outline: "none", cursor: "pointer" }}>
              <option value="">Selecciona el tipo de cliente...</option>
              {TIPOS_CLIENTE.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>
              Canal de Uso <span style={{ color: "#14b8a6" }}>*</span>
            </label>
            <select value={canal} onChange={(e) => setCanal(e.target.value)}
              style={{ width: "100%", background: "#0f1117", border: "1px solid #1e2535", borderRadius: "8px", color: canal ? "#e5e7eb" : "#6b7280", fontSize: "0.85rem", padding: "0.6rem 0.75rem", outline: "none", cursor: "pointer" }}>
              <option value="">Selecciona el canal...</option>
              {CANALES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.5rem" }}>
            Objetivo Específico <span style={{ color: "#6b7280", fontSize: "0.78rem" }}>(elige uno o escribe el tuyo)</span>
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.6rem" }}>
            {OBJETIVOS_RAPIDOS.map(o => (
              <button key={o} onClick={() => setObjetivo(o)}
                style={{ background: objetivo === o ? "#134e4a" : "#0f1117", border: `1px solid ${objetivo === o ? "#14b8a6" : "#1e2535"}`, borderRadius: "20px", padding: "0.3rem 0.8rem", color: objetivo === o ? "#14b8a6" : "#9ca3af", fontSize: "0.8rem", cursor: "pointer" }}>
                {o}
              </button>
            ))}
          </div>
          <input value={objetivo} onChange={(e) => setObjetivo(e.target.value)}
            placeholder="Ej: Mostrar cómo reducir cancelaciones..."
            style={{ width: "100%", background: "#0f1117", border: "1px solid #1e2535", borderRadius: "8px", color: "#e5e7eb", fontSize: "0.85rem", padding: "0.6rem 0.75rem", outline: "none", boxSizing: "border-box" }} />
        </div>

        <button onClick={generarPrompt} disabled={!canGenerate}
          style={{ width: "100%", background: canGenerate ? "#14b8a6" : "#1e2535", color: canGenerate ? "#000" : "#4b5563", border: "none", borderRadius: "8px", padding: "0.75rem", fontSize: "0.95rem", fontWeight: 700, cursor: canGenerate ? "pointer" : "not-allowed", marginTop: "0.5rem" }}>
          Generar Prompt para Gamma
        </button>
      </div>

      {/* Result */}
      {resultado && (
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ color: "#14b8a6", fontSize: "0.95rem", fontWeight: 600 }}>Prompt Generado para Gamma</h2>
            <button onClick={copiar}
              style={{ background: copiado ? "#134e4a" : "#1e2535", border: `1px solid ${copiado ? "#14b8a6" : "#2d3748"}`, color: copiado ? "#14b8a6" : "#9ca3af", borderRadius: "6px", padding: "0.4rem 1rem", fontSize: "0.82rem", cursor: "pointer" }}>
              {copiado ? "✓ Copiado" : "Copiar"}
            </button>
          </div>
          <div style={{ background: "#0f1117", border: "1px solid #1e2535", borderRadius: "8px", padding: "1rem", color: "#d1d5db", fontSize: "0.82rem", lineHeight: 1.8, whiteSpace: "pre-wrap", maxHeight: "400px", overflowY: "auto" }}>
            {resultado}
          </div>
          <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "0.75rem" }}>
            💡 Copia este prompt y pégalo en <strong style={{ color: "#9ca3af" }}>gamma.app</strong> → "Crear con IA" para generar tu presentación automáticamente.
          </p>
        </div>
      )}
    </div>
  );
}
