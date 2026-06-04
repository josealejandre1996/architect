"use client";

import { useRef } from "react";
import { Module } from "@/lib/modules";

interface ProblemasViewProps {
  module: Module;
  seleccionados: string[];
  onSeleccionChange: (ids: string[]) => void;
}

const PROBLEMAS_CARDS = [
  { id: "landing", icon: "🌐", nombre: "Landing Page", sub: "Tu web es tu local digital" },
  { id: "captacion", icon: "🎯", nombre: "Captación de Leads", sub: "Sin leads nuevos, el negocio muere" },
  { id: "atencion", icon: "🤖", nombre: "Atención Automática", sub: "Responde 24/7 sin intervención humana" },
  { id: "seguimiento", icon: "🔄", nombre: "Seguimiento Automático", sub: "El dinero está en el seguimiento" },
  { id: "propuestas", icon: "📄", nombre: "Propuestas y Cotizaciones", sub: "Cierra más rápido con menos fricción" },
  { id: "fidelizacion", icon: "❤️", nombre: "Fidelización de Clientes", sub: "Cliente feliz = cliente que vuelve" },
  { id: "contenido", icon: "📱", nombre: "Gestión de Contenido", sub: "Tu presencia digital en piloto automático" },
  { id: "upsells", icon: "📈", nombre: "Upsells / Cross-sells", sub: "Más valor por cliente = más rentabilidad" },
];

const MAX_SELECCION = 4;

export default function ProblemasView({ module, seleccionados, onSeleccionChange }: ProblemasViewProps) {
  const toggleCard = (id: string) => {
    if (seleccionados.includes(id)) {
      onSeleccionChange(seleccionados.filter((s) => s !== id));
    } else {
      if (seleccionados.length >= MAX_SELECCION) return;
      onSeleccionChange([...seleccionados, id]);
    }
  };

  return (
    <div style={{ paddingTop: "76px", paddingBottom: "48px", minHeight: "100vh", backgroundColor: "#0f0f13" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444", marginRight: "12px", verticalAlign: "middle", boxShadow: "0 0 10px #ef444480" }} />
            {module.name}
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", paddingLeft: "22px" }}>{module.description}</p>
        </div>

        <div style={{ maxWidth: "700px" }}>
          <div style={{ backgroundColor: "#13131a", border: "1px solid rgba(239,68,68,0.12)", borderRadius: "14px", padding: "24px" }}>

            <div style={{ marginBottom: "16px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0", marginBottom: "4px" }}>Detectar Problemas</h2>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                ¿Qué problemas vas a resolver?{" "}
                <span style={{ color: "#ef4444", fontWeight: 600 }}>Máximo {MAX_SELECCION}</span>
              </p>
            </div>

            {/* Contador */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  border: seleccionados.length >= n ? "2px solid #ef4444" : "2px solid rgba(239,68,68,0.2)",
                  backgroundColor: seleccionados.length >= n ? "rgba(239,68,68,0.1)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: 700,
                  color: seleccionados.length >= n ? "#ef4444" : "#374151",
                  transition: "all 0.2s ease",
                }}>{n}</div>
              ))}
              <span style={{ fontSize: "13px", color: "#4b5563", marginLeft: "4px" }}>
                {seleccionados.length}/{MAX_SELECCION} seleccionados
              </span>
            </div>

            {/* 8 tarjetas */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
              {PROBLEMAS_CARDS.map((card) => {
                const selected = seleccionados.includes(card.id);
                const disabled = !selected && seleccionados.length >= MAX_SELECCION;
                return (
                  <button
                    key={card.id}
                    onClick={() => toggleCard(card.id)}
                    disabled={disabled}
                    style={{
                      padding: "12px 10px", borderRadius: "10px",
                      border: selected ? "1.5px solid #ef4444" : "1px solid rgba(255,255,255,0.07)",
                      backgroundColor: selected ? "rgba(239,68,68,0.08)" : disabled ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.02)",
                      cursor: disabled ? "not-allowed" : "pointer",
                      transition: "all 0.15s", textAlign: "left",
                      opacity: disabled ? 0.4 : 1, position: "relative",
                    }}
                    onMouseEnter={(e) => { if (!selected && !disabled) { e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.04)"; } }}
                    onMouseLeave={(e) => { if (!selected && !disabled) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; } }}
                  >
                    {selected && (
                      <span style={{ position: "absolute", top: "6px", right: "6px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#fff" }}>✓</span>
                    )}
                    <div style={{ fontSize: "16px", marginBottom: "5px" }}>{card.icon}</div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: selected ? "#ef4444" : "#e2e8f0", marginBottom: "2px", lineHeight: "1.3" }}>{card.nombre}</div>
                    <div style={{ fontSize: "10px", color: "#4b5563", lineHeight: "1.3" }}>{card.sub}</div>
                  </button>
                );
              })}
            </div>

            {/* Info si hay seleccionados */}
            {seleccionados.length > 0 && (
              <div style={{ padding: "10px 14px", backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "8px", fontSize: "13px", color: "#94a3b8" }}>
                ✓ Ve a <strong style={{ color: "#ef4444" }}>Soluciones</strong> para ver las soluciones de IA para cada problema
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
