"use client";

import { useState } from "react";

const SERVICIOS = [
  {
    id: "landing",
    icon: "🌐",
    nombre: "Landing Page IA",
    desc: "Página de alta conversión con chat IA",
    baseSetup: 800,
    baseMensual: 150,
  },
  {
    id: "setter",
    icon: "🤖",
    nombre: "Setter IA",
    desc: "Atención automática 24/7",
    baseSetup: 600,
    baseMensual: 250,
  },
  {
    id: "seguimiento",
    icon: "🔄",
    nombre: "Sistema de Seguimiento",
    desc: "Follow-up y recordatorios automáticos",
    baseSetup: 500,
    baseMensual: 200,
  },
  {
    id: "pack",
    icon: "📦",
    nombre: "Pack Completo IA",
    desc: "Todo integrado y automatizado",
    baseSetup: 2000,
    baseMensual: 500,
  },
];

const TAMANO_MULT = { Pequeño: 0.7, Mediano: 1.0, Grande: 1.5 };
const EXPERIENCIA_MULT = { Júnior: 0.7, Mid: 1.0, Senior: 1.4 };
const MODO_MULT = { Principiante: 0.75, Experimentado: 1.25 };

const TICKET_RANGES = [200, 500, 800, 1200, 1800, 2500, 3500, 5000];

type Tamano = "Pequeño" | "Mediano" | "Grande";
type Experiencia = "Júnior" | "Mid" | "Senior";
type Modo = "Principiante" | "Experimentado";

function calcPrecio(base: number, tamano: Tamano, ticket: number, exp: Experiencia, modo: Modo) {
  const tm = TAMANO_MULT[tamano];
  const em = EXPERIENCIA_MULT[exp];
  const mm = MODO_MULT[modo];
  const ticketMult = 0.7 + (ticket / 5000) * 0.6;
  return Math.round(base * tm * em * mm * ticketMult / 50) * 50;
}

function calcROI(tamano: Tamano, ticket: number) {
  const leads = tamano === "Pequeño" ? 50 : tamano === "Mediano" ? 150 : 400;
  const convSin = 0.05;
  const convCon = tamano === "Pequeño" ? 0.09 : tamano === "Mediano" ? 0.10 : 0.11;
  const sinIA = Math.round(leads * convSin * ticket);
  const conIA = Math.round(leads * convCon * ticket);
  const extra = conIA - sinIA;
  return { leads, sinIA, conIA, extra };
}

export default function PricingView() {
  const [modo, setModo] = useState<Modo>("Principiante");
  const [tamano, setTamano] = useState<Tamano>("Mediano");
  const [ticketIdx, setTicketIdx] = useState(4);
  const [experiencia, setExperiencia] = useState<Experiencia>("Mid");

  const ticket = TICKET_RANGES[ticketIdx];
  const roi = calcROI(tamano, ticket);

  const roi3 = Math.round((roi.extra * 3 - 2000) / 2000 * 100);
  const roi6 = Math.round((roi.extra * 6 - 2000) / 2000 * 100);
  const roi12 = Math.round((roi.extra * 12 - 2000) / 2000 * 100);

  return (
    <div style={{ paddingTop: "76px", paddingBottom: "48px", minHeight: "100vh", backgroundColor: "#0f0f13" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10b981", marginRight: "12px", verticalAlign: "middle", boxShadow: "0 0 10px #10b98180" }} />
            Pricing y Ofertas
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", paddingLeft: "22px" }}>¿Cuánto cobrar por tus servicios de IA?</p>
        </div>

        {/* Toggle Principiante / Experimentado */}
        <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "16px", padding: "20px 24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#e2e8f0", marginBottom: "4px" }}>
                {modo === "Principiante" ? "💡 Modo Principiante" : "🚀 Modo Experimentado"}
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                {modo === "Principiante"
                  ? "Precios conservadores para ganar tus primeros clientes"
                  : "Precios competitivos para maximizar tu rentabilidad"}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "13px", color: modo === "Principiante" ? "#10b981" : "#4b5563", fontWeight: 600 }}>Principiante</span>
              <div
                onClick={() => setModo(modo === "Principiante" ? "Experimentado" : "Principiante")}
                style={{
                  width: "48px", height: "26px", borderRadius: "13px", cursor: "pointer",
                  backgroundColor: modo === "Experimentado" ? "#10b981" : "rgba(255,255,255,0.1)",
                  position: "relative", transition: "all 0.2s ease",
                }}
              >
                <div style={{
                  position: "absolute", top: "3px",
                  left: modo === "Experimentado" ? "25px" : "3px",
                  width: "20px", height: "20px", borderRadius: "50%",
                  backgroundColor: "#fff", transition: "left 0.2s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }} />
              </div>
              <span style={{ fontSize: "13px", color: modo === "Experimentado" ? "#10b981" : "#4b5563", fontWeight: 600 }}>Experimentado</span>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }} className="sliders-grid">

          {/* Tamaño negocio */}
          <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "14px", padding: "20px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4b5563", marginBottom: "8px" }}>Tamaño del negocio</p>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#10b981", marginBottom: "16px" }}>{tamano}</p>
            <div style={{ display: "flex", gap: "6px" }}>
              {(["Pequeño", "Mediano", "Grande"] as Tamano[]).map((t) => (
                <button key={t} onClick={() => setTamano(t)} style={{
                  flex: 1, padding: "8px 4px", borderRadius: "8px", fontSize: "11px", fontWeight: 600,
                  border: tamano === t ? "1.5px solid #10b981" : "1px solid rgba(255,255,255,0.08)",
                  backgroundColor: tamano === t ? "rgba(16,185,129,0.1)" : "transparent",
                  color: tamano === t ? "#10b981" : "#4b5563", cursor: "pointer", transition: "all 0.15s",
                }}>{t}</button>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#374151", marginTop: "10px" }}>
              {tamano === "Pequeño" ? "~50 leads/mes" : tamano === "Mediano" ? "~150 leads/mes" : "~400 leads/mes"}
            </p>
          </div>

          {/* Ticket medio */}
          <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "14px", padding: "20px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4b5563", marginBottom: "8px" }}>Ticket medio cliente</p>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#10b981", marginBottom: "16px" }}>{ticket}€</p>
            <input
              type="range" min={0} max={TICKET_RANGES.length - 1} step={1}
              value={ticketIdx} onChange={(e) => setTicketIdx(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#10b981", cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
              <span style={{ fontSize: "11px", color: "#374151" }}>200€</span>
              <span style={{ fontSize: "11px", color: "#374151" }}>5.000€</span>
            </div>
          </div>

          {/* Experiencia */}
          <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "14px", padding: "20px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4b5563", marginBottom: "8px" }}>Tu nivel</p>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#10b981", marginBottom: "16px" }}>{experiencia}</p>
            <div style={{ display: "flex", gap: "6px" }}>
              {(["Júnior", "Mid", "Senior"] as Experiencia[]).map((e) => (
                <button key={e} onClick={() => setExperiencia(e)} style={{
                  flex: 1, padding: "8px 4px", borderRadius: "8px", fontSize: "11px", fontWeight: 600,
                  border: experiencia === e ? "1.5px solid #10b981" : "1px solid rgba(255,255,255,0.08)",
                  backgroundColor: experiencia === e ? "rgba(16,185,129,0.1)" : "transparent",
                  color: experiencia === e ? "#10b981" : "#4b5563", cursor: "pointer", transition: "all 0.15s",
                }}>{e}</button>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#374151", marginTop: "10px" }}>
              {experiencia === "Júnior" ? "0-6 meses experiencia" : experiencia === "Mid" ? "6-18 meses experiencia" : "18+ meses experiencia"}
            </p>
          </div>
        </div>

        {/* Tarjetas de servicios */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "24px" }} className="servicios-grid">
          {SERVICIOS.map((s) => {
            const setup = calcPrecio(s.baseSetup, tamano, ticket, experiencia, modo);
            const mensual = calcPrecio(s.baseMensual, tamano, ticket, experiencia, modo);
            return (
              <div key={s.id} style={{ backgroundColor: "#13131a", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "14px", overflow: "hidden" }}>
                <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "20px" }}>{s.icon}</span>
                    <div>
                      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0" }}>{s.nombre}</h3>
                      <p style={{ fontSize: "12px", color: "#4b5563" }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px" }}>
                    <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>Fee inicial</p>
                    <p style={{ fontSize: "20px", fontWeight: 800, color: "#e2e8f0" }}>{setup}€</p>
                    <p style={{ fontSize: "10px", color: "#374151", marginTop: "2px" }}>setup único</p>
                  </div>
                  <div style={{ backgroundColor: "rgba(16,185,129,0.06)", borderRadius: "8px", padding: "12px", border: "1px solid rgba(16,185,129,0.1)" }}>
                    <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>Mensual</p>
                    <p style={{ fontSize: "20px", fontWeight: 800, color: "#10b981" }}>{mensual}€</p>
                    <p style={{ fontSize: "10px", color: "#374151", marginTop: "2px" }}>cada mes</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculadora ROI */}
        <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(16,185,129,0.12)", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>📊</span>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>Calculadora ROI para tu cliente</h3>
              <p style={{ fontSize: "12px", color: "#4b5563" }}>Cuánto gana tu cliente contigo vs sin ti</p>
            </div>
          </div>

          <div style={{ padding: "24px" }}>
            {/* Sin IA vs Con IA */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div style={{ backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4b5563", marginBottom: "12px" }}>Sin automatización IA</p>
                <p style={{ fontSize: "28px", fontWeight: 800, color: "#94a3b8", marginBottom: "4px" }}>{roi.sinIA.toLocaleString()}€</p>
                <p style={{ fontSize: "12px", color: "#374151" }}>{roi.leads} leads · {(5 * 100).toFixed(0)}% conv.</p>
              </div>
              <div style={{ backgroundColor: "rgba(16,185,129,0.06)", borderRadius: "12px", padding: "20px", textAlign: "center", border: "1px solid rgba(16,185,129,0.15)" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#10b981", marginBottom: "12px" }}>Con automatización IA</p>
                <p style={{ fontSize: "28px", fontWeight: 800, color: "#10b981", marginBottom: "4px" }}>{roi.conIA.toLocaleString()}€</p>
                <p style={{ fontSize: "12px", color: "#374151" }}>{roi.leads} leads · +{tamano === "Pequeño" ? "80" : tamano === "Mediano" ? "100" : "120"}% eficiencia</p>
              </div>
            </div>

            {/* Ingresos extra */}
            <div style={{ backgroundColor: "rgba(16,185,129,0.08)", borderRadius: "12px", padding: "20px", textAlign: "center", marginBottom: "20px", border: "1px solid rgba(16,185,129,0.15)" }}>
              <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>Ingresos extra mensuales para tu cliente</p>
              <p style={{ fontSize: "36px", fontWeight: 900, color: "#10b981", letterSpacing: "-0.02em" }}>+{roi.extra.toLocaleString()}€</p>
              <p style={{ fontSize: "11px", color: "#374151", marginTop: "4px" }}>Resultados a partir del mes 2-3</p>
            </div>

            {/* ROI 3/6/12 meses */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { label: "ROI 3 meses", val: roi3 },
                { label: "ROI 6 meses", val: roi6 },
                { label: "ROI 12 meses", val: roi12 },
              ].map((r) => (
                <div key={r.label} style={{ backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                  <p style={{ fontSize: "11px", color: "#4b5563", marginBottom: "8px" }}>{r.label}</p>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: r.val > 0 ? "#10b981" : "#ef4444" }}>
                    {r.val > 0 ? "+" : ""}{r.val.toLocaleString()}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sliders-grid { grid-template-columns: 1fr !important; }
          .servicios-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
