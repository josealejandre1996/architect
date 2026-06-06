"use client";

const HERRAMIENTAS = [
  {
    id: "apollo",
    nombre: "Apollo.io",
    subtitulo: "Base de datos de contactos B2B",
    descripcion: "Encuentra emails, teléfonos y datos de empresas. Automatiza secuencias de prospección por email y LinkedIn.",
    features: ["+275M de contactos", "Secuencias automatizadas", "Integración con CRM"],
    url: "https://apollo.io",
    cta: "Ir a Apollo.io",
  },
  {
    id: "apify",
    nombre: "Apify",
    subtitulo: "Web scraping y automatización",
    descripcion: "Extrae datos de LinkedIn, Google Maps, redes sociales y cualquier web. Automatiza tareas repetitivas.",
    features: ["Scraping de LinkedIn", "Extracción de Google Maps", "Miles de actores disponibles"],
    url: "https://apify.com",
    cta: "Ir a Apify",
  },
];

export default function ProspeccionView() {
  return (
    <div style={{ paddingTop: "5rem", padding: "2rem", maxWidth: "960px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#06b6d4", display: "inline-block" }} />
          Prospección
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.92rem" }}>Herramientas para encontrar y contactar leads de manera efectiva</p>
      </div>

      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
        <h2 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>2 Maneras de hacer prospección</h2>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem", lineHeight: 1.6 }}>Encuentra leads cualificados y contacta con ellos de manera automática usando las mejores herramientas del mercado.</p>
      </div>

      <p style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600, textAlign: "center", marginBottom: "1.25rem" }}>Cold Calling &amp; Prospección de Leads</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
        {HERRAMIENTAS.map((h) => (
          <div key={h.id} style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div>
              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.2rem" }}>{h.nombre}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.82rem" }}>{h.subtitulo}</p>
            </div>
            <p style={{ color: "#9ca3af", fontSize: "0.87rem", lineHeight: 1.6 }}>{h.descripcion}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {h.features.map((f) => (
                <li key={f} style={{ color: "#9ca3af", fontSize: "0.84rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#06b6d4", flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <a href={h.url} target="_blank" rel="noopener noreferrer"
              style={{ marginTop: "0.25rem", display: "block", textAlign: "center", background: "#06b6d4", color: "#000", fontWeight: 700, fontSize: "0.9rem", padding: "0.65rem 1rem", borderRadius: "8px", textDecoration: "none" }}>
              {h.cta}
            </a>
          </div>
        ))}
      </div>

      <div style={{ background: "#161b27", border: "1px solid #1e2535", borderRadius: "10px", padding: "1rem 1.25rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.87rem", lineHeight: 1.6 }}>
          💡 <strong style={{ color: "#d1d5db" }}>Tip:</strong> Combina Apollo para encontrar contactos y Apify para extraer datos específicos de LinkedIn o Google Maps de tu nicho objetivo.
        </p>
      </div>
    </div>
  );
}
