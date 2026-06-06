"use client";

import { useState } from "react";

const CRM_PROMPT = `PROMPT — CRM AGENCIA DE INTELIGENCIA ARTIFICIAL (AIRTABLE)

Quiero crear una base de datos en Airtable para una agencia de IA, orientada a captación y seguimiento comercial, compatible con importación CSV.

TABLA PRINCIPAL: Leads

Campos obligatorios:

Nombre del cliente
Tipo: Single line text
(mapear desde: name / business_name)

Email
Tipo: Email
(mapear desde: email)

Teléfono
Tipo: Single line text
(mapear desde: phone / phone_number)
⚠️ No usar tipo "Phone"

Localización
Tipo: Single line text
(mapear desde: city / address / location)

Nicho
Tipo: Single select
Opciones: Gimnasios, Clínicas, Inmobiliarias, Abogados, Estética, Otros

Notas
Tipo: Long text

Estado de seguimiento
Tipo: Single select
Opciones (en este orden):
- Nuevo lead
- Llamada
- Seguimiento
- Agendado
- Cierre
- No cerrado
Valor por defecto: Nuevo lead

Fecha última interacción
Tipo: Date

Responsable / Setter
Tipo: Single select
Ejemplos: Carlos, Miriam, Setter IA, Sin asignar

VISTAS NECESARIAS

Vista 1 — Tabla General
Tipo: Grid view
Campos visibles: Nombre del cliente, Email, Teléfono, Localización, Nicho, Estado de seguimiento, Responsable, Fecha última interacción

Vista 2 — Pipeline
Tipo: Kanban
Agrupar por: Estado de seguimiento

IMPORTACIÓN CSV (IMPORTANTE)
- Permitir importar CSV desde Google Maps, Apify y Apollo
- No crear campos nuevos automáticamente
- Ignorar columnas no mapeadas
- No hacer campos obligatorios
- Leads importados entran como "Nuevo lead"

OBJETIVO
Un CRM simple, limpio y escalable para gestionar leads, visualizar el pipeline y permitir automatizaciones futuras sin romper importaciones.`;

export default function CRMView() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CRM_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ paddingTop: "5rem", padding: "2rem", maxWidth: "860px" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
          CRM
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          Diseña el pipeline y secuencias de seguimiento para cerrar más clientes
        </p>
      </div>

      {/* Airtable Card */}
      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>Airtable</h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem" }}>
          Base de datos que puedes moldear a tu gusto
        </p>

        <p style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
          Tu prompt para Airtable:
        </p>

        <textarea
          readOnly
          value={CRM_PROMPT}
          style={{
            width: "100%",
            height: "220px",
            background: "#0f1117",
            border: "1px solid #1e2535",
            borderRadius: "8px",
            color: "#c9d1d9",
            fontSize: "0.78rem",
            fontFamily: "monospace",
            padding: "0.75rem",
            resize: "none",
            outline: "none",
            boxSizing: "border-box",
            lineHeight: 1.6,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? "#1a3a2a" : "#1e2535",
              border: `1px solid ${copied ? "#22c55e" : "#2d3748"}`,
              color: copied ? "#22c55e" : "#9ca3af",
              borderRadius: "6px",
              padding: "0.4rem 1rem",
              fontSize: "0.82rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {copied ? "✓ Copiado" : "Copiar Prompt"}
          </button>

          <a
            href="https://airtable.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              color: "#fff",
              borderRadius: "8px",
              padding: "0.6rem 1.5rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Acceder a Airtable
          </a>
        </div>
        <p style={{ color: "#4b5563", fontSize: "0.78rem", textAlign: "center", marginTop: "0.75rem" }}>
          Una vez en Airtable, pega el prompt en su asistente de IA para crear tu CRM automáticamente
        </p>
      </div>

      {/* Pipeline visual */}
      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem", letterSpacing: "0.05em" }}>
          PIPELINE DE VENTAS
        </p>
        <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {[
            { label: "Nuevo lead", color: "#3b82f6", count: "—" },
            { label: "Llamada", color: "#8b5cf6", count: "—" },
            { label: "Seguimiento", color: "#f59e0b", count: "—" },
            { label: "Agendado", color: "#06b6d4", count: "—" },
            { label: "Cierre", color: "#22c55e", count: "—" },
            { label: "No cerrado", color: "#6b7280", count: "—" },
          ].map((stage) => (
            <div
              key={stage.label}
              style={{
                flex: "0 0 auto",
                background: "#0f1117",
                border: `1px solid ${stage.color}33`,
                borderTop: `3px solid ${stage.color}`,
                borderRadius: "8px",
                padding: "0.75rem",
                minWidth: "110px",
                textAlign: "center",
              }}
            >
              <div style={{ color: stage.color, fontSize: "1.1rem", fontWeight: 700 }}>{stage.count}</div>
              <div style={{ color: "#9ca3af", fontSize: "0.72rem", marginTop: "0.25rem" }}>{stage.label}</div>
            </div>
          ))}
        </div>
        <p style={{ color: "#4b5563", fontSize: "0.75rem", marginTop: "0.75rem" }}>
          El pipeline se llena automáticamente desde Airtable cuando importas leads
        </p>
      </div>

      {/* Tip */}
      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "10px", padding: "1rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
          💡 <strong style={{ color: "#d1d5db" }}>Tip:</strong> Utiliza el CRM para dar seguimiento a todos los leads generados desde tus landings y campañas.
        </p>
      </div>
    </div>
  );
}
