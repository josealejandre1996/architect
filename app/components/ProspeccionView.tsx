"use client";

export default function ProspeccionView() {
  return (
    <div style={{ padding: "2rem", maxWidth: "860px" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#8b5cf6", display: "inline-block" }} />
          Prospección
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          Herramientas para encontrar y contactar leads de manera efectiva
        </p>
      </div>
      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>2 Maneras de hacer prospección</h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Encuentra leads cualificados y contáctalos de manera automática usando las mejores herramientas del mercado.</p>
      </div>
      <p style={{ color: "#9ca3af", fontSize: "0.85rem", fontWeight: 600, textAlign: "center", marginBottom: "1rem", letterSpacing: "0.05em" }}>Cold Calling & Prospección de Leads</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>Apollo.io</h3>
          <p style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "1rem" }}>Base de datos de contactos B2B</p>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>Encuentra emails, teléfonos y datos de empresas. Automatiza secuencias de prospección por email y LinkedIn.</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {["+275M de contactos", "Secuencias automatizadas", "Integración con CRM"].map((item) => (
              <li key={item} style={{ color: "#6b7280", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#06b6d4", display: "inline-block", flexShrink: 0 }} />{item}
              </li>
            ))}
          </ul>
          <a href="https://apollo.io" target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff", borderRadius: "8px", padding: "0.65rem", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", textAlign: "center", marginTop: "auto" }}>Ir a Apollo.io</a>
        </div>
        <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>Apify</h3>
          <p style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "1rem" }}>Web scraping y automatización</p>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>Extrae datos de LinkedIn, Google Maps, redes sociales y cualquier web. Automatiza tareas repetitivas.</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {["Scraping de LinkedIn", "Extracción de Google Maps", "Miles de actores disponibles"].map((item) => (
              <li key={item} style={{ color: "#6b7280", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6", display: "inline-block", flexShrink: 0 }} />{item}
              </li>
            ))}
          </ul>
          <a href="https://apify.com" target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff", borderRadius: "8px", padding: "0.65rem", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", textAlign: "center", marginTop: "auto" }}>Ir a Apify</a>
        </div>
      </div>
      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "10px", padding: "1rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>💡 <strong style={{ color: "#d1d5db" }}>Tip:</strong> Combina Apollo para encontrar contactos y Apify para extraer datos específicos de LinkedIn o Google Maps de tu nicho objetivo.</p>
      </div>
    </div>
  );
}
