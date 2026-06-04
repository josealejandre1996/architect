"use client";

import { useState } from "react";

// ── Import all views ──────────────────────────────────────────────────────────
// Existing views (keep your current imports here)
import ProblemasView from "./components/ProblemasView";
import SolucionesView from "./components/SolucionesView";
import NichoView from "./components/NichoView";
import PricingView from "./components/PricingView";
import LandingView from "./components/LandingView";
import SignalCoreView from "./components/SignalCoreView";

// New views
import CRMView from "./components/CRMView";
import ProspeccionView from "./components/ProspeccionView";
import ScriptsView from "./components/ScriptsView";
import PropuestasView from "./components/PropuestasView";
import AnalizadorView from "./components/AnalizadorView";

// ── Tab config ────────────────────────────────────────────────────────────────
const TABS = [
  { id: "problemas",   label: "PROBLEMAS" },
  { id: "soluciones",  label: "SOLUCIONES" },
  { id: "nicho",       label: "NICHO" },
  { id: "pricing",     label: "PRICING" },
  { id: "landing",     label: "LANDING" },
  { id: "signalcore",  label: "SIGNALCORE" },
  { id: "crm",         label: "CRM" },
  { id: "prospeccion", label: "PROSPECCIÓN" },
  { id: "scripts",     label: "SCRIPTS" },
  { id: "propuestas",  label: "PROPUESTAS" },
  { id: "analizador",  label: "ANALIZADOR" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("problemas");

  const renderView = () => {
    switch (activeTab) {
      case "problemas":   return <ProblemasView />;
      case "soluciones":  return <SolucionesView />;
      case "nicho":       return <NichoView />;
      case "pricing":     return <PricingView />;
      case "landing":     return <LandingView />;
      case "signalcore":  return <SignalCoreView />;
      case "crm":         return <CRMView />;
      case "prospeccion": return <ProspeccionView />;
      case "scripts":     return <ScriptsView />;
      case "propuestas":  return <PropuestasView />;
      case "analizador":  return <AnalizadorView />;
      default:            return <ProblemasView />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1117",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          padding: "0 1.5rem",
          borderBottom: "1px solid #1e2535",
          background: "#0f1117",
          overflowX: "auto",
          flexWrap: "nowrap",
        }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: "1rem",
            letterSpacing: "0.15em",
            color: "#fff",
            marginRight: "2rem",
            whiteSpace: "nowrap",
            padding: "1rem 0",
          }}
        >
          <span style={{ color: "#3b82f6" }}>A</span>RCHITECT
        </span>

        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid #3b82f6" : "2px solid transparent",
              color: activeTab === tab.id ? "#fff" : "#6b7280",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.07em",
              padding: "1rem 0.85rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "color 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main>{renderView()}</main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <p
        style={{
          textAlign: "center",
          color: "#374151",
          fontSize: "0.72rem",
          padding: "1.5rem",
          borderTop: "1px solid #1e2535",
        }}
      >
        Claude es IA y puede cometer errores. Por favor, verifica las respuestas.
      </p>
    </div>
  );
}
