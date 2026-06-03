"use client";

import { Module } from "@/lib/modules";

interface NavigationProps {
  modules: Module[];
  activeModule: string;
  onModuleChange: (id: string) => void;
}

export default function Navigation({ modules, activeModule, onModuleChange }: NavigationProps) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "#13131a",
        borderBottom: "1px solid rgba(139,92,246,0.15)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 24px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 900,
              letterSpacing: "0.2em",
              background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ARCHITECT
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "28px",
            backgroundColor: "rgba(139,92,246,0.25)",
            flexShrink: 0,
          }}
        />

        {/* Module tabs */}
        <nav
          style={{
            display: "flex",
            gap: "4px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            flex: 1,
            paddingBottom: "2px",
          }}
        >
          {modules.map((mod) => {
            const isActive = mod.id === activeModule;
            return (
              <button
                key={mod.id}
                onClick={() => onModuleChange(mod.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                  cursor: "pointer",
                  border: isActive
                    ? `1px solid ${mod.accentColor}40`
                    : "1px solid transparent",
                  backgroundColor: isActive
                    ? `${mod.accentColor}18`
                    : "transparent",
                  color: isActive ? mod.accentColor : "#6b7280",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#e2e8f0";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#6b7280";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {mod.name}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
