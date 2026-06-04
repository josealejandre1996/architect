"use client";

import { useState } from "react";
import { Module } from "@/lib/modules";

interface LandingViewProps {
  module: Module;
  nichoSeleccionado?: string;
}

const MODALIDADES = [
  { id: "tradicional", label: "Tradicional", desc: "Con formulario de contacto", icon: "📋" },
  { id: "minimalista", label: "Minimalista", desc: "Con modal centrado y panel admin", icon: "✨" },
  { id: "whatsapp", label: "WhatsApp", desc: "Con botón directo a WhatsApp", icon: "💬" },
];

const IDIOMAS = [
  { id: "español", label: "🇪🇸 Español" },
  { id: "inglés", label: "🇬🇧 Inglés" },
  { id: "portugués", label: "🇧🇷 Portugués" },
];

function buildPrompt(agencia: string, nicho: string, modalidad: string, idioma: string): string {
  const modalidadDesc = modalidad === "tradicional"
    ? "Landing con formulario de contacto integrado para capturar leads"
    : modalidad === "minimalista"
    ? "Landing minimalista con modal centrado y panel de administración"
    : "Landing con botón directo a WhatsApp para contacto inmediato";

  return `### PROMPT PARA LANDING PAGE: ${agencia}

**NICHO OBJETIVO:** ${nicho}

**MODALIDAD:** ${modalidadDesc}

**NOMBRE AGENCIA:** ${agencia}

**IDIOMA:** ${idioma.charAt(0).toUpperCase() + idioma.slice(1)}

---

### ESTRUCTURA DE LA LANDING PAGE

1. **HERO**
   - Título impactante dirigido al empresario del nicho
   - Subtítulo con resultado específico y medible
   - CTA claro: "Agendar demo gratuita"

2. **PROBLEMAS**
   - 4 problemas principales que enfrenta el empresario del nicho
   - Cada problema debe resonar emocionalmente
   - CTA: "Resolver estos problemas"

3. **SOLUCIONES DE IA**
   - 4 soluciones de IA específicas para el nicho
   - Cómo cada solución resuelve un problema concreto
   - Beneficios medibles (porcentajes, horas ahorradas, etc.)
   - CTA: "Quiero estas soluciones"

4. **PROCESO**
   - Paso 1: Consultoría gratuita para analizar necesidades
   - Paso 2: Implementación de la solución de IA
   - Paso 3: Resultados visibles en 4 semanas
   - CTA: "Agendar consultoría"

5. **TESTIMONIOS**
   - 2 testimonios de empresarios del nicho que usan IA
   - Con nombre, cargo y resultado específico
   - CTA: "Quiero resultados así"

6. **BENEFICIOS**
   - Grid de 4 beneficios principales con iconos
   - Enfocados en resultados del negocio
   - CTA: "Comenzar ahora"

7. **FAQ**
   - 5 preguntas frecuentes sobre implementación
   - Respuestas claras y tranquilizadoras
   - CTA: "Resolver mis dudas"

8. **FORMULARIO DE CONTACTO**
   - Campos: Nombre, Teléfono, Email, Nombre del negocio, Mensaje
   - CTA submit: "Quiero automatizar mi negocio"
   ${modalidad === "whatsapp" ? "- Reemplazar formulario por botón de WhatsApp directo" : ""}

9. **CTA FINAL**
   - Headline potente con urgencia
   - CTA gigante: "Agendar mi demo gratuita"

---

### INSTRUCCIONES ADICIONALES
- Todo el contenido habla directamente al EMPRESARIO del nicho "${nicho}"
- Diseño moderno, profesional y orientado a conversión
- CTAs en todas las secciones llevando al formulario${modalidad === "whatsapp" ? " / WhatsApp" : ""}
- Variar los CTAs manteniendo la misma acción
- Idioma: ${idioma.charAt(0).toUpperCase() + idioma.slice(1)}
- Nombre de agencia "${agencia}" visible en hero y footer`;
}

export default function LandingView({ module, nichoSeleccionado }: LandingViewProps) {
  const [agencia, setAgencia] = useState("");
  const [agenciaGuardada, setAgenciaGuardada] = useState("");
  const [nicho, setNicho] = useState(nichoSeleccionado || "");
  const [modalidad, setModalidad] = useState("tradicional");
  const [idioma, setIdioma] = useState("español");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGuardar = () => {
    if (!agencia.trim()) return;
    setAgenciaGuardada(agencia.trim());
  };

  const handleGenerar = () => {
    if (!agenciaGuardada && !agencia.trim()) return;
    if (!nicho.trim()) return;
    const nombreAgencia = agenciaGuardada || agencia.trim();
    const resultado = buildPrompt(nombreAgencia, nicho, modalidad, idioma);
    setPrompt(resultado);
  };

  const handleCopiar = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid = (agenciaGuardada || agencia.trim()) && nicho.trim();

  return (
    <div style={{ paddingTop: "76px", paddingBottom: "48px", minHeight: "100vh", backgroundColor: "#0f0f13" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#3b82f6", marginRight: "12px", verticalAlign: "middle", boxShadow: "0 0 10px #3b82f680" }} />
            Landing Pages
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", paddingLeft: "22px" }}>Genera prompts para crear landing pages de alta conversión</p>
        </div>

        {/* Card configuración */}
        <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <span style={{ fontSize: "18px" }}>🌐</span>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>Configuración de Landing Pages</h2>
          </div>

          {/* Nombre agencia */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#94a3b8", marginBottom: "8px" }}>
              Nombre de tu Agencia
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={agencia}
                onChange={(e) => setAgencia(e.target.value)}
                placeholder="Ej: AutoFlow Agency, NexusAI..."
                onKeyDown={(e) => { if (e.key === "Enter") handleGuardar(); }}
                style={{
                  flex: 1, backgroundColor: "#0f0f13", border: `1px solid ${agenciaGuardada ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.2)"}`,
                  borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0",
                  fontSize: "14px", outline: "none", fontFamily: "inherit",
                }}
              />
              <button
                onClick={handleGuardar}
                disabled={!agencia.trim()}
                style={{
                  width: "40px", height: "40px", borderRadius: "8px", border: "none",
                  backgroundColor: agencia.trim() ? "#3b82f6" : "rgba(255,255,255,0.06)",
                  color: agencia.trim() ? "#fff" : "#374151",
                  cursor: agencia.trim() ? "pointer" : "not-allowed",
                  fontSize: "16px", transition: "all 0.15s",
                }}
              >
                ✓
              </button>
            </div>
            {agenciaGuardada && (
              <p style={{ fontSize: "12px", color: "#3b82f6", marginTop: "6px" }}>
                ✓ Guardado: <strong>{agenciaGuardada}</strong>
              </p>
            )}
            <p style={{ fontSize: "12px", color: "#374151", marginTop: "4px" }}>
              Guarda el nombre para usarlo en landing pages y setter IA
            </p>
          </div>

          {/* Nicho */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#94a3b8", marginBottom: "8px" }}>
              Nicho objetivo <span style={{ color: "#3b82f6" }}>*</span>
            </label>
            <input
              type="text"
              value={nicho}
              onChange={(e) => setNicho(e.target.value)}
              placeholder="Ej: Gimnasios, Clínicas dentales, Restaurantes..."
              style={{
                width: "100%", backgroundColor: "#0f0f13", border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0",
                fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
            {nichoSeleccionado && (
              <p style={{ fontSize: "12px", color: "#3b82f6", marginTop: "6px" }}>
                ✓ Desde módulo Nicho: <strong>{nichoSeleccionado}</strong>
              </p>
            )}
          </div>

          {/* Modalidad + Idioma */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#94a3b8", marginBottom: "10px" }}>
                Modalidad de Landing
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {MODALIDADES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModalidad(m.id)}
                    style={{
                      padding: "10px 14px", borderRadius: "8px", textAlign: "left",
                      border: modalidad === m.id ? "1.5px solid #3b82f6" : "1px solid rgba(255,255,255,0.07)",
                      backgroundColor: modalidad === m.id ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)",
                      cursor: "pointer", transition: "all 0.15s",
                      display: "flex", alignItems: "center", gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{m.icon}</span>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: modalidad === m.id ? "#3b82f6" : "#e2e8f0" }}>{m.label}</p>
                      <p style={{ fontSize: "11px", color: "#4b5563" }}>{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#94a3b8", marginBottom: "10px" }}>
                Idioma de la Landing
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {IDIOMAS.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => setIdioma(i.id)}
                    style={{
                      padding: "10px 14px", borderRadius: "8px", textAlign: "left",
                      border: idioma === i.id ? "1.5px solid #3b82f6" : "1px solid rgba(255,255,255,0.07)",
                      backgroundColor: idioma === i.id ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)",
                      cursor: "pointer", transition: "all 0.15s",
                      fontSize: "13px", fontWeight: 600,
                      color: idioma === i.id ? "#3b82f6" : "#e2e8f0",
                    }}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Botón generar */}
          <button
            onClick={handleGenerar}
            disabled={!isValid}
            style={{
              width: "100%", padding: "13px", borderRadius: "10px", fontSize: "14px",
              fontWeight: 700, border: "none",
              cursor: isValid ? "pointer" : "not-allowed",
              background: isValid ? "linear-gradient(135deg, #3b82f6cc, #3b82f6)" : "rgba(255,255,255,0.06)",
              color: isValid ? "#fff" : "#374151", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { if (isValid) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 20px #3b82f640"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Generar Prompt de Landing
          </button>
        </div>

        {/* Resultado */}
        {prompt && (
          <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(59,130,246,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "16px" }}>✨</span>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>Prompts Generados</h3>
              </div>
              <button
                onClick={handleCopiar}
                style={{
                  padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 600,
                  cursor: "pointer", border: "1px solid rgba(59,130,246,0.3)",
                  backgroundColor: "transparent", color: copied ? "#3b82f6" : "#6b7280",
                  transition: "all 0.15s",
                }}
              >
                {copied ? "✓ Copiado" : "📋 Copiar"}
              </button>
            </div>

            {/* Tag nicho */}
            <div style={{ padding: "16px 24px 0" }}>
              <span style={{
                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                backgroundColor: "#3b82f6", color: "#fff", fontSize: "12px", fontWeight: 600,
              }}>
                {nicho}
              </span>
            </div>

            {/* Prompt */}
            <div style={{ padding: "16px 24px" }}>
              <div style={{
                backgroundColor: "#0f0f13", border: "1px solid rgba(59,130,246,0.1)",
                borderRadius: "10px", padding: "20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>Prompt para {nicho}</p>
                  <button
                    onClick={handleCopiar}
                    style={{
                      padding: "4px 10px", borderRadius: "6px", fontSize: "11px",
                      cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)",
                      backgroundColor: "transparent", color: "#6b7280", transition: "all 0.15s",
                    }}
                  >
                    Copiar
                  </button>
                </div>
                <pre style={{
                  fontSize: "13px", lineHeight: "1.7", color: "#94a3b8",
                  whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "inherit",
                  margin: 0, maxHeight: "400px", overflowY: "auto",
                }}>
                  {prompt}
                </pre>
              </div>
            </div>

            {/* Info + botón Base44 */}
            <div style={{ padding: "0 24px 24px" }}>
              <div style={{
                padding: "12px 16px", backgroundColor: "rgba(59,130,246,0.06)",
                borderRadius: "8px", border: "1px solid rgba(59,130,246,0.12)",
                display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px",
              }}>
                <span style={{ fontSize: "14px" }}>🔗</span>
                <p style={{ fontSize: "12px", color: "#64748b" }}>
                  Copia el prompt y pégalo en Base44 para crear automáticamente tu landing page de alta conversión.
                </p>
              </div>
              <a
                href="https://base44.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  width: "100%", padding: "14px", borderRadius: "10px", fontSize: "14px",
                  fontWeight: 700, textDecoration: "none",
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  color: "#fff", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,130,246,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                🚀 Ir al Constructor de Landing (Base44)
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
