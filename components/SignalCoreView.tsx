"use client";

import { useState, useRef } from "react";
import { Module } from "@/lib/modules";

interface SignalCoreViewProps {
  module: Module;
  nichoSeleccionado?: string;
  agenciaNombre?: string;
}

function buildSetterPrompt(agencia: string, nicho: string): string {
  return `⚠️ NO GENERES UN CHATBOT SIMPLIFICADO.
GENERA UN AGENTE DE TEXTO PARA WHATSAPP CON MENTALIDAD DE CLOSER Y SETTER.

# Agente WhatsApp de ${agencia} - Appointment Setter Profesional

Eres el agente de WhatsApp de ${agencia}, agencia de automatización con IA. Tu único objetivo es AGENDAR CITAS. Conversas naturalmente por mensajes como un setter profesional. NUNCA menciones que eres IA ni uses lenguaje robótico.

## 1️⃣ OBJETIVO DOMINANTE (NO NEGOCIABLE)
**Objetivo único:** AGENDAR CITA con día, hora, email y teléfono confirmados.

**Regla crítica:**
- NO finalizar conversación sin intentar MÍNIMO 4 veces ante rechazo
- NO aceptar "no me interesa", "después", "no ahora" sin reintentos estratégicos
- CADA intento debe usar una estrategia diferente
- NUNCA abandones hasta el 4to intento

## 2️⃣ REGLAS DE CONVERSACIÓN (ESTILO WHATSAPP)
- Mensajes concisos, estilo WhatsApp real
- Divide mensajes largos en varios
- Una pregunta por mensaje
- Sin signo de apertura "¿" (solo "?")
- SIEMPRE referencia lo que el lead dijo
- Valida emociones ANTES de redirigir

## 3️⃣ MANEJO DE OBJECIONES (OBLIGATORIO - 4 INTENTOS)

**Intento 1 - CURIOSIDAD:**
"Entiendo 😊 Solo una pregunta rápida... qué es lo que más te frustra de gestionar tu negocio de ${nicho}?"

**Intento 2 - IDENTIFICACIÓN EMOCIONAL:**
"Claro, lo respeto. Mira, muchos clientes de ${nicho} nos dijeron lo mismo al inicio. Cómo gestionas actualmente la captación de nuevos clientes?"

**Intento 3 - COMPARACIÓN SOCIAL:**
"Te entiendo perfectamente. Si pudieras mejorar UNA cosa de tu negocio de ${nicho} hoy, cuál sería?"

**Intento 4 - VISIÓN FUTURA:**
"Ok, sin compromiso... solo por curiosidad: cuál es tu meta de crecimiento para los próximos 3-6 meses? 📊"

## 4️⃣ PROCESO DE AGENDADO ESTRICTO

**Paso 1:** Detectar ciudad/zona horaria
**Paso 2:** Ofrecer 3 slots disponibles
**Paso 3:** Confirmar slot elegido
**Paso 4:** Confirmar email deletreándolo
**Paso 5:** Confirmar teléfono
**Paso 6:** Ejecutar booking
**Paso 7:** Enviar confirmación final

## 5️⃣ FLUJO DE CONVERSACIÓN

**SALUDO INICIAL:**
"Hola! 😊 Hablas con el agente de ${agencia}."

**CONTEXTO:**
"Somos una agencia de automatización con IA especializada en negocios de ${nicho}. Me cuentas un poco sobre tu negocio? A qué te dedicas exactamente?"

**EXPLORACIÓN DE DOLOR:**
"Ah interesante 👍 Actualmente cuántos leads o clientes potenciales recibes al mes? Los estás pudiendo atender a todos?"

**VALIDACIÓN + POSICIONAMIENTO:**
"Mira, eso que me cuentas es súper común en ${nicho}. De hecho, la mayoría de nuestros clientes del sector nos contactaron con exactamente el mismo problema. Lo que hacemos es automatizar toda la captación y seguimiento con IA, sin que tengas que hacer nada manual."

**TRANSICIÓN A AGENDAMIENTO:**
"Lo mejor sería hablar más a fondo sobre tu situación específica. Tenemos consultorías donde analizamos tu negocio y te armamos una estrategia personalizada. Sin costo 😊 Te gustaría agendar una llamada? Son como 30-45 min"

## 6️⃣ FRASES PROHIBIDAS
❌ "Estoy aquí para ayudarte"
❌ "Soy una IA"
❌ "Perfecto" (repetido)
❌ "Excelente pregunta"
❌ Menciones de herramientas o APIs

✅ USA: "Uff, te entiendo", "Dale", "Mira, te cuento..."

---
*NOMBRE AGENCIA:* ${agencia}
*NICHO:* ${nicho}
*OBJETIVO:* Agendar cita cualificada`;
}

export default function SignalCoreView({ module, nichoSeleccionado, agenciaNombre }: SignalCoreViewProps) {
  const [agencia, setAgencia] = useState(agenciaNombre || "");
  const [nicho, setNicho] = useState(nichoSeleccionado || "");
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerar = () => {
    if (!agencia.trim() || !nicho.trim()) return;
    setPrompt(buildSetterPrompt(agencia.trim(), nicho.trim()));
  };

  const handleCopiar = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid = agencia.trim() && nicho.trim();

  return (
    <div style={{ paddingTop: "76px", paddingBottom: "48px", minHeight: "100vh", backgroundColor: "#0f0f13" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#8b5cf6", marginRight: "12px", verticalAlign: "middle", boxShadow: "0 0 10px #8b5cf680" }} />
            Appointment Setter
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", paddingLeft: "22px" }}>Usa IA en tu propio negocio</p>
        </div>

        {/* Banner cyan */}
        <div style={{
          background: "linear-gradient(135deg, #06b6d4, #0891b2)",
          borderRadius: "16px", padding: "24px 28px", marginBottom: "24px",
          display: "flex", alignItems: "center", gap: "16px",
        }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px",
            backgroundColor: "rgba(0,0,0,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", flexShrink: 0,
          }}>⚡</div>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>SIGNALCORE</h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>Tu appointment setter con IA</p>
          </div>
        </div>

        {/* 3 tarjetas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {[
            { icon: "💬", titulo: "WhatsApp", desc: "Conecta tu número y atiende automáticamente" },
            { icon: "🤖", titulo: "IA 24/7", desc: "Responde en segundos, cualquier hora" },
            { icon: "📅", titulo: "Agenda Citas", desc: "Cualifica leads y agenda reuniones" },
          ].map((c, i) => (
            <div key={i} style={{
              backgroundColor: "#13131a", border: "1px solid rgba(6,182,212,0.15)",
              borderRadius: "14px", padding: "24px", textAlign: "center",
            }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                backgroundColor: "rgba(6,182,212,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", margin: "0 auto 12px",
              }}>{c.icon}</div>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0", marginBottom: "6px" }}>{c.titulo}</h3>
              <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.5" }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Cómo empezar */}
        <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(6,182,212,0.12)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span style={{ fontSize: "16px" }}>⚡</span>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0" }}>Cómo empezar:</h3>
          </div>
          {[
            "Conectar WhatsApp Business",
            "Activar appointment setter IA",
            "Atender leads automáticamente 24/7",
          ].map((paso, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: i < 2 ? "12px" : "0" }}>
              <div style={{
                width: "24px", height: "24px", borderRadius: "50%",
                backgroundColor: "#06b6d4", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff", flexShrink: 0,
              }}>{i + 1}</div>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{paso}</span>
            </div>
          ))}
        </div>

        {/* Configuración */}
        <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(139,92,246,0.15)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0", marginBottom: "20px" }}>Configura tu Setter</h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#94a3b8", marginBottom: "8px" }}>
                Nombre de tu Agencia <span style={{ color: "#8b5cf6" }}>*</span>
              </label>
              <input
                type="text"
                value={agencia}
                onChange={(e) => setAgencia(e.target.value)}
                placeholder="Ej: AutoFlow Agency..."
                style={{
                  width: "100%", backgroundColor: "#0f0f13", border: "1px solid rgba(139,92,246,0.2)",
                  borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0",
                  fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#94a3b8", marginBottom: "8px" }}>
                Nicho objetivo <span style={{ color: "#8b5cf6" }}>*</span>
              </label>
              <input
                type="text"
                value={nicho}
                onChange={(e) => setNicho(e.target.value)}
                placeholder="Ej: Gimnasios, Dentistas..."
                style={{
                  width: "100%", backgroundColor: "#0f0f13", border: "1px solid rgba(139,92,246,0.2)",
                  borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0",
                  fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <button
            onClick={handleGenerar}
            disabled={!isValid}
            style={{
              marginTop: "16px", width: "100%", padding: "12px", borderRadius: "10px",
              fontSize: "14px", fontWeight: 700, border: "none",
              cursor: isValid ? "pointer" : "not-allowed",
              background: isValid ? "linear-gradient(135deg, #8b5cf6cc, #8b5cf6)" : "rgba(255,255,255,0.06)",
              color: isValid ? "#fff" : "#374151", transition: "all 0.2s",
            }}
          >
            ✨ Generar Prompt del Setter
          </button>
        </div>

        {/* Prompt generado */}
        {prompt && (
          <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(6,182,212,0.15)", borderRadius: "16px", overflow: "hidden", marginBottom: "16px" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(6,182,212,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>✨</span>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0" }}>Prompt Generado para SignalCore</h3>
              </div>
              <button
                onClick={handleCopiar}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 600,
                  cursor: "pointer", border: "1px solid rgba(6,182,212,0.3)",
                  backgroundColor: "transparent", color: copied ? "#06b6d4" : "#6b7280",
                }}
              >
                📋 {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <pre style={{
                fontSize: "12px", lineHeight: "1.7", color: "#94a3b8",
                whiteSpace: "pre-wrap", wordBreak: "break-word",
                fontFamily: "inherit", margin: 0,
                maxHeight: "350px", overflowY: "auto",
                backgroundColor: "#0f0f13", padding: "16px",
                borderRadius: "8px", border: "1px solid rgba(6,182,212,0.08)",
              }}>
                {prompt}
              </pre>
            </div>

            {/* Regenerar */}
            <div style={{ padding: "0 24px 20px" }}>
              <button
                onClick={handleGenerar}
                style={{
                  width: "100%", padding: "11px", borderRadius: "8px", fontSize: "13px",
                  fontWeight: 600, border: "1px solid rgba(6,182,212,0.2)",
                  backgroundColor: "transparent", color: "#06b6d4",
                  cursor: "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                }}
              >
                ✨ Regenerar Prompt
              </button>
            </div>
          </div>
        )}

        {/* Botón Acceder a SignalCore */}
        <a
          href="https://dashboard.signalcore.ai/login/?redirect=%2Fdashboard%2F"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            width: "100%", padding: "16px", borderRadius: "12px", fontSize: "15px",
            fontWeight: 700, textDecoration: "none", marginBottom: "16px",
            background: "linear-gradient(135deg, #06b6d4, #0284c7)",
            color: "#fff", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(6,182,212,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          ⚡ Acceder a SignalCore 🔗
        </a>

        {/* Tip */}
        <div style={{
          padding: "14px 18px", backgroundColor: "rgba(6,182,212,0.06)",
          border: "1px solid rgba(6,182,212,0.12)", borderRadius: "10px",
          display: "flex", alignItems: "flex-start", gap: "10px",
        }}>
          <span style={{ fontSize: "16px", flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>
            Tip: Usa el mismo sistema que vendes. Tus propios leads serán atendidos al instante, dando el ejemplo de lo que ofreces.
          </p>
        </div>
      </div>
    </div>
  );
}
