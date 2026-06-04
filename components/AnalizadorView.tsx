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
    const prompt = "Crea una demo profesional de tipo " + tipoDemo + " para:\n\nEMPRESA: " + empresa + "\nSERVICIOS: " + servicios + (descripcion ? "\nDESCRIPCIÓN: " + descripcion : "") + (transformacion ? "\nTRANSFORMACIÓN: " + transformacion : "") + (problemas ? "\nPROBLEMAS QUE RESUELVEN: " + problemas : "") + (beneficios ? "\nBENEFICIOS: " + beneficios : "") + (propuestaValor ? "\nPROPUESTA DE VALOR: " + propuestaValor : "") + (proceso ? "\nPROCESO: " + proceso : "") + (diferenciadores ? "\nDIFERENCIADORES: " + diferenciadores : "") + (horarios ? "\nHORARIOS: " + horarios : "") + (localidad ? "\nLOCALIDAD: " + localidad : "") + (precio ? "\nPRECIOS: " + precio : "") + (telefono ? "\nTELÉFONO: " + telefono : "") + (email ? "\nEMAIL: " + email : "") + "\n\nOBJETIVO: " + objetivo + "\n\nEl resultado debe estar listo para implementar directamente usando el contexto específico de la empresa.";
    setResultado(prompt);
  };

  const copiar = () => {
    navigator.clipboard.writeText(resultado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const inp = { width: "100%", background: "#0f1117", border: "1px solid #1e2535", borderRadius: "8px", color: "#e5e7eb", fontSize: "0.85rem", padding: "0.6rem 0.75rem", outline: "none", boxSizing: "border-box" as const };
  const lbl = { color: "#9ca3af", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" };

  return (
    <div style={{ padding: "2rem", maxWidth: "960px" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#a855f7", display: "inline-block" }} />
          Crea una Demo en Minutos
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.92rem" }}>Genera prompts personalizados para mostrar demos a tus clientes potenciales</p>
      </div>

      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={lbl}>Nombre de la empresa <span style={{ color: "#a855f7" }}>*</span></label>
            <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Ej: Gimnasio FitLife" style={inp} />
          </div>
          <div>
            <label style={lbl}>Servicios que ofrece <span style={{ color: "#a855f7" }}>*</span></label>
            <input value={servicios} onChange={(e) => setServicios(e.target.value)} placeholder="Ej: Clases grupales, entrenamiento personal" style={inp} />
          </div>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={lbl}>Descripción detallada de servicios</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción completa de cada servicio..." rows={3} style={{ ...inp, resize: "none" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={lbl}>Transformación que ofrecen</label>
            <textarea value={transformacion} onChange={(e) => setTransformacion(e.target.value)} placeholder="Ej: De sedentario a en forma en 3 meses" rows={2} style={{ ...inp, resize: "none" }} />
          </div>
          <div>
            <label style={lbl}>Problemas que resuelven</label>
            <textarea value={problemas} onChange={(e) => setProblemas(e.target.value)} placeholder="Ej: Falta de tiempo, motivación..." rows={2} style={{ ...inp, resize: "none" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={lbl}>Beneficios clave</label>
            <textarea value={beneficios} onChange={(e) => setBeneficios(e.target.value)} placeholder="Ej: Resultados garantizados..." rows={2} style={{ ...inp, resize: "none" }} />
          </div>
          <div>
            <label style={lbl}>Propuesta de valor única</label>
            <textarea value={propuestaValor} onChange={(e) => setPropuestaValor(e.target.value)} placeholder="Ej: El único gimnasio 24/7..." rows={2} style={{ ...inp, resize: "none" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={lbl}>Proceso/Metodología</label>
            <textarea value={proceso} onChange={(e) => setProceso(e.target.value)} placeholder="Ej: 1. Evaluación inicial..." rows={2} style={{ ...inp, resize: "none" }} />
          </div>
          <div>
            <label style={lbl}>Diferenciadores</label>
            <textarea value={diferenciadores} onChange={(e) => setDiferenciadores(e.target.value)} placeholder="Ej: App móvil incluida..." rows={2} style={{ ...inp, resize: "none" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={lbl}>Horarios</label>
            <input value={horarios} onChange={(e) => setHorarios(e.target.value)} placeholder="Ej: L-V 7:00-22:00" style={inp} />
          </div>
          <div>
            <label style={lbl}>Localidad</label>
            <input value={localidad} onChange={(e) => setLocalidad(e.target.value)} placeholder="Ej: Madrid, España" style={inp} />
          </div>
          <div>
            <label style={lbl}>Rango de precios</label>
            <input value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 40-80€/mes" style={inp} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
          <div>
            <label style={lbl}>Teléfono</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: +34 600 123 456" style={inp} />
          </div>
          <div>
            <label style={lbl}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ej: info@empresa.com" style={inp} />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={lbl}>Objetivo principal del agente <span style={{ color: "#a855f7" }}>*</span></label>
          <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)} style={{ ...inp, cursor: "pointer", color: objetivo ? "#e5e7eb" : "#6b7280" }}>
            <option value="">Selecciona el objetivo...</option>
            {OBJETIVOS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <label style={lbl}>Tipo de demo a crear <span style={{ color: "#a855f7" }}>*</span></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            {TIPOS_DEMO.map((t) => (
              <button key={t.id} onClick={() => setTipoDemo(t.label)}
                style={{ background: tipoDemo === t.label ? "#2d1b4e" : "#0f1117", border: "1px solid " + (tipoDemo === t.label ? "#a855f7" : "#1e2535"), borderRadius: "10px", padding: "0.75rem", cursor: "pointer", textAlign: "center" as const }}>
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
            <button onClick={copiar} style={{ background: copiado ? "#2d1b4e" : "#1e2535", border: "1px solid " + (copiado ? "#a855f7" : "#2d3748"), color: copiado ? "#a855f7" : "#9ca3af", borderRadius: "6px", padding: "0.4rem 1rem", fontSize: "0.82rem", cursor: "pointer" }}>
              {copiado ? "✓ Copiado" : "Copiar"}
            </button>
          </div>
          <div style={{ background: "#0f1117", border: "1px solid #1e2535", borderRadius: "8px", padding: "1rem", color: "#d1d5db", fontSize: "0.82rem", lineHeight: 1.8, whiteSpace: "pre-wrap", maxHeight: "300px", overflowY: "auto" }}>
            {resultado}
          </div>
        </div>
      )}

      <div style={{ marginBottom: "1.25rem" }}>
        <label style={lbl}>Próximos 3 Pasos</label>
        <textarea value={proximosPasos} onChange={(e) => setProximosPasos(e.target.value)} placeholder="Ej: 1. Crear landing page para mi nicho" rows={4} style={{ ...inp, resize: "none" }} />
      </div>

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
