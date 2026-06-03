"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Module } from "@/lib/modules";

interface ModuleViewProps {
  module: Module;
}

function renderMarkdown(text: string): string {
  if (!text) return "";

  const lines = text.split("\n");
  const result: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headers
    if (line.startsWith("### ")) {
      result.push(
        `<h3 style="color:#a78bfa;font-size:0.95rem;font-weight:700;margin:1.1rem 0 0.4rem;line-height:1.4">${formatInline(line.slice(4))}</h3>`
      );
      continue;
    }
    if (line.startsWith("## ")) {
      result.push(
        `<h2 style="color:#8b5cf6;font-size:1.1rem;font-weight:700;margin:1.4rem 0 0.5rem;line-height:1.4">${formatInline(line.slice(3))}</h2>`
      );
      continue;
    }
    if (line.startsWith("# ")) {
      result.push(
        `<h1 style="color:#c4b5fd;font-size:1.2rem;font-weight:800;margin:1.5rem 0 0.6rem;line-height:1.3">${formatInline(line.slice(2))}</h1>`
      );
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\. (.+)$/);
    if (numMatch) {
      result.push(
        `<div style="display:flex;gap:0.6rem;margin-bottom:0.35rem;align-items:flex-start"><span style="color:#8b5cf6;font-weight:700;min-width:1.5rem;flex-shrink:0;margin-top:0.05rem">${numMatch[1]}.</span><span>${formatInline(numMatch[2])}</span></div>`
      );
      continue;
    }

    // Bullet list
    const bulletMatch = line.match(/^[-•*] (.+)$/);
    if (bulletMatch) {
      result.push(
        `<div style="display:flex;gap:0.6rem;margin-bottom:0.35rem;align-items:flex-start"><span style="color:#7c3aed;flex-shrink:0;margin-top:0.1rem">▸</span><span>${formatInline(bulletMatch[1])}</span></div>`
      );
      continue;
    }

    // Horizontal rule
    if (line === "---" || line === "***" || line === "___") {
      result.push(
        `<hr style="border:none;border-top:1px solid rgba(139,92,246,0.2);margin:1.25rem 0"/>`
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      result.push(`<div style="height:0.6rem"></div>`);
      continue;
    }

    // Regular paragraph
    result.push(`<p style="margin-bottom:0.3rem;line-height:1.7">${formatInline(line)}</p>`);
  }

  return result.join("");
}

function formatInline(text: string): string {
  return text
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong style="color:#e2e8f0;font-weight:600">$1</strong>'
    )
    .replace(
      /\*(.+?)\*/g,
      '<em style="color:#c4b5fd;font-style:italic">$1</em>'
    )
    .replace(
      /`(.+?)`/g,
      '<code style="background:#1c1c29;color:#a78bfa;padding:0.1rem 0.35rem;border-radius:4px;font-family:ui-monospace,monospace;font-size:0.85em">$1</code>'
    );
}

export default function ModuleView({ module }: ModuleViewProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setValues({});
    setOutput("");
    setError("");
    setIsLoading(false);
    if (abortRef.current) {
      abortRef.current.abort();
    }
  }, [module.id]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleChange = useCallback((id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleGenerate = async () => {
    const missing = module.fields
      .filter((f) => f.required && !values[f.id]?.trim())
      .map((f) => f.label);

    if (missing.length > 0) {
      setError(`Completa los campos requeridos: ${missing.join(", ")}`);
      return;
    }

    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setIsLoading(true);
    setOutput("");
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: module.systemPrompt,
          userPrompt: module.buildUserPrompt(values),
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: "Error del servidor" }));
        throw new Error(errData.error || `Error ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setOutput((prev) => prev + text);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setOutput("");
    setError("");
    if (abortRef.current) abortRef.current.abort();
    setIsLoading(false);
  };

  const isValid = module.fields
    .filter((f) => f.required)
    .every((f) => values[f.id]?.trim());

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#0f0f13",
    border: "1px solid rgba(139,92,246,0.2)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#e2e8f0",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        paddingTop: "76px",
        paddingBottom: "48px",
        minHeight: "100vh",
        backgroundColor: "#0f0f13",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Module header */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#f1f5f9",
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: module.accentColor,
                marginRight: "12px",
                verticalAlign: "middle",
                boxShadow: `0 0 10px ${module.accentColor}80`,
              }}
            />
            {module.name}
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", paddingLeft: "22px" }}>
            {module.description}
          </p>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)",
            gap: "20px",
            alignItems: "start",
          }}
          className="module-grid"
        >
          {/* Form panel */}
          <div
            style={{
              backgroundColor: "#13131a",
              border: "1px solid rgba(139,92,246,0.12)",
              borderRadius: "14px",
              padding: "24px",
              position: "sticky",
              top: "76px",
            }}
          >
            <h2
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4b5563",
                marginBottom: "20px",
              }}
            >
              Parámetros
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {module.fields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#94a3b8",
                      marginBottom: "6px",
                    }}
                  >
                    {field.label}
                    {field.required && (
                      <span style={{ color: module.accentColor, marginLeft: "4px" }}>*</span>
                    )}
                  </label>

                  {field.type === "select" ? (
                    <select
                      id={field.id}
                      value={values[field.id] ?? ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        backgroundSize: "20px",
                        paddingRight: "36px",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = module.accentColor;
                        e.target.style.boxShadow = `0 0 0 3px ${module.accentColor}18`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(139,92,246,0.2)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="" disabled>
                        Selecciona una opción...
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      value={values[field.id] ?? ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={4}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "90px",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = module.accentColor;
                        e.target.style.boxShadow = `0 0 0 3px ${module.accentColor}18`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(139,92,246,0.2)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  ) : (
                    <input
                      id={field.id}
                      type="text"
                      value={values[field.id] ?? ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = module.accentColor;
                        e.target.style.boxShadow = `0 0 0 3px ${module.accentColor}18`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(139,92,246,0.2)";
                        e.target.style.boxShadow = "none";
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && isValid && !isLoading) {
                          handleGenerate();
                        }
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Error message */}
            {error && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "10px 14px",
                  backgroundColor: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: "8px",
                  color: "#fca5a5",
                  fontSize: "13px",
                }}
              >
                {error}
              </div>
            )}

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={!isValid || isLoading}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: isValid && !isLoading ? "pointer" : "not-allowed",
                border: "none",
                background:
                  isValid && !isLoading
                    ? `linear-gradient(135deg, ${module.accentColor}cc 0%, ${module.accentColor} 100%)`
                    : "rgba(255,255,255,0.06)",
                color: isValid && !isLoading ? "#fff" : "#374151",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (isValid && !isLoading) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = `0 4px 20px ${module.accentColor}40`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {isLoading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  Generando...
                </span>
              ) : (
                "Generar con IA"
              )}
            </button>
          </div>

          {/* Output panel */}
          <div
            style={{
              backgroundColor: "#13131a",
              border: "1px solid rgba(139,92,246,0.12)",
              borderRadius: "14px",
              overflow: "hidden",
              minHeight: "500px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Output header */}
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid rgba(139,92,246,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#4b5563",
                }}
              >
                Resultado
                {isLoading && (
                  <span
                    style={{
                      marginLeft: "8px",
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: module.accentColor,
                      animation: "pulse 1s ease-in-out infinite",
                    }}
                  />
                )}
              </span>

              <div style={{ display: "flex", gap: "8px" }}>
                {output && (
                  <>
                    <button
                      onClick={handleCopy}
                      style={{
                        padding: "5px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        border: "1px solid rgba(139,92,246,0.25)",
                        backgroundColor: "transparent",
                        color: copied ? "#a78bfa" : "#6b7280",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#a78bfa";
                        e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        if (!copied) {
                          e.currentTarget.style.color = "#6b7280";
                          e.currentTarget.style.borderColor = "rgba(139,92,246,0.25)";
                        }
                      }}
                    >
                      {copied ? "Copiado" : "Copiar"}
                    </button>
                    <button
                      onClick={handleClear}
                      style={{
                        padding: "5px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backgroundColor: "transparent",
                        color: "#6b7280",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#e2e8f0";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#6b7280";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      }}
                    >
                      Limpiar
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Output content */}
            <div
              ref={outputRef}
              style={{
                flex: 1,
                padding: "24px",
                overflowY: "auto",
                fontSize: "14px",
                lineHeight: "1.7",
                color: "#cbd5e1",
                minHeight: "460px",
                maxHeight: "calc(100vh - 220px)",
              }}
            >
              {!output && !isLoading && (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    color: "#374151",
                    userSelect: "none",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      border: "1px solid rgba(139,92,246,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.727 12.727.707.707M3 12h1m16 0h1M4.22 19.78l.707-.707M18.95 5.05l-.707.707"
                        stroke="rgba(139,92,246,0.4)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="12" r="4" stroke="rgba(139,92,246,0.4)" strokeWidth="2" />
                    </svg>
                  </div>
                  <p style={{ fontSize: "13px" }}>
                    Completa los parámetros y haz clic en <strong style={{ color: "#4b5563" }}>Generar con IA</strong>
                  </p>
                </div>
              )}

              {(output || isLoading) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(output) + (isLoading ? '<span style="display:inline-block;width:2px;height:1em;background:#8b5cf6;border-radius:1px;animation:blink 1s step-end infinite;vertical-align:middle;margin-left:2px"></span>' : ""),
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        select option {
          background-color: #1c1c29;
          color: #e2e8f0;
        }
        @media (max-width: 768px) {
          .module-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
