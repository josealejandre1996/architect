"use client";

import { useState } from "react";

const OBJETIVOS = [
  "Captar más leads",
  "Automatizar atención al cliente",
  "Agendar citas automáticamente",
  "Hacer seguimiento de prospectos",
  "Responder preguntas frecuentes 24/7",
  "Calificar leads automáticamente",
];

const TIPOS_DEMO = [
  { id: "texto", label: "Agente de Texto", desc: "WhatsApp / Chat" },
  { id: "voz", label: "Agente de Voz", desc: "Llamadas telefónicas" },
  { id: "landing", label: "Landing Page", desc: "Página web" },
];

export default function AnalizadorView() {
  const [modo, setModo] = useState("manual");
  const [url, setUrl] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [servicios, setServicios] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [transformacion, setTransformacion] = useState("");
  const [problemas, setProblemas] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [propuestaValor, setPropuestaValor] = useState("");
  const [proceso, setProceso] = useState("");
  const [diferenciadores, setDiferenciadores] = useState("");
  const [horarios, setHorarios] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [tipoDemo, setTipoDemo] = useState("");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [proximosPasos, setProximosPasos] = useState("");

  const canGenerate = empresa && servicios && objetivo && tipoDemo;

  const generarPrompt = () => {
    const prompt = `Crea una demo profesional de tipo "${tipoDemo}" para la siguiente empresa:

EMPRESA: ${empresa}
SERVICIOS: ${servicios}
${descripcion ? `DESCRIPCIÓN: ${descripcion}` : ""}
${transformacion ? `TRANSFORMACIÓN QUE OFRECEN: ${transformacion}` : ""}
${problemas ? `PROBLEMAS QUE RESUELVEN: ${problemas}` : ""}
${beneficios ? `BENEFICIOS CLAVE: ${beneficios}` : ""}
${propuestaValor ? `PROPUESTA DE VALOR: ${propuestaValor}` : ""}
${proceso ? `PROCESO/METODOLOGÍA: ${proceso}` : ""}
${diferenciadores ? `DIFERENCIADORES: ${diferenciadores}` : ""}
${horarios ? `HORARIOS: ${horarios}` : ""}
${localidad ? `LOCALIDAD: ${localidad}` : ""}
${precio ? `RANGO DE PRECIOS: ${precio}` : ""}
${telefono ? `TELÉFONO: ${telefono}` : ""}
${email ? `EMAIL: ${email}` : ""}

OBJETIVO PRINCIPAL DEL AGENTE: ${objetivo}

INSTRUCCIONES SEGÚN TIPO DE DEMO:
${tipoDemo === "Agente de Texto" ? `Crea un agente de WhatsApp/Chat que:
- Responda automáticamente consultas de clientes
- Califica leads con 3-5 preguntas clave
- Agenda citas o redirige al equipo humano
- Usa el tono y la voz de la marca
- Incluye respuestas para las 10 preguntas más frecuentes del negocio` : ""}
${tipoDemo === "Agente de Voz" ? `Crea un script para agente de voz que:
- Apertura profesional con nombre de empresa
- Flujo de calificación en máximo 3 minutos
- Manejo de objeciones principales
- Cierre con siguiente paso claro (cita, transferencia, callback)
- Tono natural y conversacional` : ""}
${tipoDemo === "Landing Page" ? `Crea el copy completo para una landing page que:
- Hero con headline de alto impacto orientado al problema principal
- Sección de dolor (3 puntos de dolor específicos del nicho)
- Solución presentada en lenguaje del cliente
- 3 beneficios clave con iconos sugeridos
- Proceso en 3 pasos simples
- Prueba social / testimonios (puedes usar ejemplos ilustrativos)
- CTA principal y secundario claros
- FAQ con 5 preguntas frecuentes` : ""}

El resultado debe estar listo para implementar directamente. Usa el lenguaje y contexto específico de la empresa.`;

    setResultado(prompt);
  };

  const copiar = () => {
    navigator.clipboard.writeText(resultado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const inputStyle = {
    width: "100%",
    background: "#0f1117",
    border: "1px solid #1e2535",
    borderRadius: "8px",
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "0.6rem 0.75rem",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    color: "#9ca3af",
    fontSize: "0.82rem",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "960px" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#a855f7", display: "inline-block" }} />
          Crea una Demo en Minutos
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.92rem" }}>Genera prompts personalizados para mostrar demos a tus clientes potenciales</p>
      </div>

      {/* Modo tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {["Desde URL", "Manual"].map((m) => (
          <button key={m} onClick={() => setModo(m === "Desde URL" ? "url" : "manual")}
            style={{ background: modo === (m === "Desde URL" ? "url" : "manual") ? "#fff" : "#1e2535", color: modo === (m === "Desde URL" ? "url" : "manual") ? "#000" : "#9ca3af", border: "none", borderRadius: "8px", padding: "0.5rem 1.25rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
            {m}
          </button>
        ))}
      </div>

      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem" }}>
        {modo === "url" && (
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://ejemplo.com"
                style={{ ...inputStyle, flex: 1 }} />
              <button style={{ background: "#1e2535", border: "1px solid #2d3748", color: "#9ca3af", borderRadius: "8px", padding: "0.6rem 1rem", fontSize: "0.85rem", cursor: "pointer", whiteSpace: "nowrap" }}>
                Extraer Contenido
              </button>
            </div>
            <p style={{ color: "#6b7280", fontSize: "0.78rem", marginTop: "0.4rem" }}>Paso 1: Extraer contenido. Paso 2: Revisar y analizar.</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Nombre de la empresa <span style={{ color: "#a855f7" }}>*</span></label>
            <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Ej: Gimnasio FitLife" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Servicios que ofrece <span style={{ color: "#a855f7" }}>*</span></label>
            <input value={servicios} onChange={(e) => setServicios(e.target.value)} placeholder="Ej: Clases grupales, entrenamiento personal" style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={labelStyle}>Descripción detallada de servicios</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción completa de cada servicio, qué incluyen, características..." rows={3}
            style={{ ...inputStyle, resize: "none" as const }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Transformación que ofrecen</label>
            <textarea value={transformacion} onChange={(e) => setTransformacion(e.target.value)} placeholder="Ej: De sedentario a estar en forma en 3 meses" rows={2} style={{ ...inputStyle, resize: "none" as const }} />
          </div>
          <div>
            <label style={labelStyle}>Problemas que resuelven</label>
            <textarea value={problemas} onChange={(e) => setProblemas(e.target.value)} placeholder="Ej: Falta de tiempo, motivación, no saber entrenar correctamente" rows={2} style={{ ...inputStyle, resize: "none" as const }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Beneficios clave</label>
            <textarea value={beneficios} onChange={(e) => setBeneficios(e.target.value)} placeholder="Ej: Resultados garantizados, seguimiento personalizado" rows={2} style={{ ...inputStyle, resize: "none" as const }} />
          </div>
          <div>
            <label style={labelStyle}>Propuesta de valor única</label>
            <textarea value={propuestaValor} onChange={(e) => setPropuestaValor(e.target.value)} placeholder="Ej: El único gimnasio con entrenadores disponibles 24/7" rows={2} style={{ ...inputStyle, resize: "none" as const }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Proceso/Metodología</label>
            <textarea value={proceso} onChange={(e) => setProceso(e.target.value)} placeholder="Ej: 1. Evaluación inicial, 2. Plan personalizado" rows={2} style={{ ...inputStyle, resize: "none" as const }} />
          </div>
          <div>
            <label style={labelStyle}>Diferenciadores</label>
            <textarea value={diferenciadores} onChange={(e) => setDiferenciadores(e.target.value)} placeholder="Ej: Tecnología de última generación, app móvil incluida" rows={2} style={{ ...inputStyle, resize: "none" as const }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Horarios</label>
            <input value={horarios} onChange={(e) => setHorarios(e.target.value)} placeholder="Ej: L-V 7:00-22:00" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Localidad</label>
            <input value={localidad} onChange={(e) => setLocalidad(e.target.value)} placeholder="Ej: Madrid, España" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Rango de precios</label>
            <input value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 40-80€/mes" style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
          <div>
            <label style={labelStyle}>Teléfono</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: +34 600 123 456" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ej: info@empresa.com" style={inputStyle} />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Objetivo principal del agente <span style={{ color: "#a855f7" }}>*</span></label>
          <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer", color: objetivo ? "#e5e7eb" : "#6b7280" }}>
            <option value="">Selecciona el objetivo...</option>
            {OBJETIVOS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Tipo de demo a crear <span style={{ color: "#a855f7" }}>*</span></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            {TIPOS_DEMO.map((t) => (
              <button key={t.id} onClick={() => setTipoDemo(t.label)}
                style={{ background: tipoDemo === t.label ? "#2d1b4e" : "#0f1117", border: `1px solid ${tipoDemo === t.label ? "#a855f7" : "#1e2535"}`, borderRadius: "10px", padding: "0.75rem", cursor: "pointer", textAlign: "center" as const }}>
                <div style={{ color: tipoDemo === t.label ? "#c084fc" : "#e5e7eb", fontWeight: 600, fontSize: "0.88rem", marginBottom: "0.2rem" }}>{t.label}</div>
                <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={generarPrompt} disabled={!canGenerate}
          style={{ width: "100%", background: canGenerate ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#1e2535", color: canGenerate ? "#fff" : "#4b5563", border: "none", borderRadius: "8px", padding: "0.75rem", fontSize: "0.95rem", fontWeight: 700, cursor: canGenerate ? "pointer" : "not-allowed" }}>
          {canGenerate ? "Generar Prompt de Demo" : "Completa los campos obligatorios (*)"}
        </button>
      </div>

      {resultado && (
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ color: "#a855f7", fontSize: "0.95rem", fontWeight: 600 }}>Prompt Generado</h2>
            <button onClick={copiar}
              style={{ background: copiado ? "#2d1b4e" : "#1e2535", border: `1px solid ${copiado ? "#a855f7" : "#2d3748"}`, color: copiado ? "#a855f7" : "#9ca3af", borderRadius: "6px", padding: "0.4rem 1rem", fontSize: "0.82rem", cursor: "pointer" }}>
              {copiado ? "✓ Copiado" : "Copiar"}
            </button>
          </div>
          <div style={{ background: "#0f1117", border: "1px solid #1e2535", borderRadius: "8px", padding: "1rem", color: "#d1d5db", fontSize: "0.82rem", lineHeight: 1.8, whiteSpace: "pre-wrap", maxHeight: "350px", overflowY: "auto" }}>
            {resultado}
          </div>
        </div>
      )}

      {/* Próximos pasos */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ ...labelStyle, marginBottom: "0.5rem" }}>Próximos 3 Pasos</label>
            placeholder="Ej: 1. Crear landing page para mi nicho"
          style={{ ...inputStyle, resize: "none" as const, lineHeight: 1.7 }} />
      </div>

      {/* Botones externos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <a href="https://dashboard.signalcore.ai/login/?redirect=%2Fdashboard%2F" target="_blank" rel="noopener noreferrer"
          style={{ display: "block", textAlign: "center", background: "#06b6d4", color: "#000", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 1rem", borderRadius: "10px", textDecoration: "none" }}>
          SignalCore - Agentes de Texto y Voz
        </a>
        <a href="https://base44.com" target="_blank" rel="noopener noreferrer"
          style={{ display: "block", textAlign: "center", background: "#06b6d4", color: "#000", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 1rem", borderRadius: "10px", textDecoration: "none" }}>
          Constructor de Landings
        </a>
      </div>
    </div>
  );
}
