export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea" | "select";
  options?: string[];
  required: boolean;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  fields: FormField[];
  systemPrompt: string;
  buildUserPrompt: (values: Record<string, string>) => string;
}

export const modules: Module[] = [
  {
    id: "problemas",
    name: "Problemas",
    description: "Identifica los problemas más costosos de un sector que la IA puede resolver",
    accentColor: "#ef4444",
    fields: [
      {
        id: "sector",
        label: "Sector / Industria",
        placeholder: "Ej: Restaurantes, Clínicas dentales, E-commerce, Agencias de marketing...",
        type: "text",
        required: true,
      },
      {
        id: "tamano",
        label: "Tamaño de empresa objetivo",
        placeholder: "",
        type: "select",
        options: [
          "Microempresa (1-9 empleados)",
          "Pequeña empresa (10-49 empleados)",
          "Mediana empresa (50-249 empleados)",
          "Grande empresa (250+ empleados)",
        ],
        required: true,
      },
      {
        id: "region",
        label: "País / Región (opcional)",
        placeholder: "Ej: México, España, Colombia, LATAM en general...",
        type: "text",
        required: false,
      },
    ],
    systemPrompt: `Eres un consultor experto en transformación digital e IA aplicada a negocios hispanohablantes. Tu misión es ayudar a emprendedores de agencias de IA a identificar y documentar los problemas reales de negocio en sectores específicos que pueden ser resueltos con inteligencia artificial y automatización.

Al analizar un sector, proporciona un análisis estructurado que incluya:

1. Los 5-7 problemas más comunes, costosos y urgentes del sector
2. El impacto económico estimado de cada problema (tiempo perdido, dinero, recursos)
3. Cómo la IA puede abordar específicamente cada problema
4. El nivel de urgencia y prioridad (Alta/Media/Baja) con justificación
5. Señales detectables en prospección que indican que una empresa tiene ese problema
6. Una puntuación de "facilidad de venta" para cada problema (1-10)

Sé muy específico y usa ejemplos del mundo real. Evita generalidades. El objetivo es que un emprendedor pueda usar esta información directamente en conversaciones de venta y prospección.

Formatea tu respuesta de forma clara con secciones bien definidas.`,
    buildUserPrompt: (v) =>
      `Analiza el sector: **${v.sector}**\nTamaño de empresa objetivo: ${v.tamano}${v.region ? `\nRegión geográfica: ${v.region}` : ""}\n\nIdentifica los principales problemas de negocio que la IA puede resolver en este contexto. Sé muy específico y práctico.`,
  },

  {
    id: "soluciones",
    name: "Soluciones",
    description: "Diseña soluciones de IA concretas, implementables y rentables",
    accentColor: "#22c55e",
    fields: [
      {
        id: "problema",
        label: "Problema a resolver",
        placeholder: "Describe el problema de negocio específico que quieres resolver con IA...",
        type: "textarea",
        required: true,
      },
      {
        id: "presupuesto",
        label: "Presupuesto estimado del cliente",
        placeholder: "",
        type: "select",
        options: [
          "Bajo (< $500 USD/mes)",
          "Medio ($500 - $2,000 USD/mes)",
          "Alto ($2,000 - $5,000 USD/mes)",
          "Enterprise ($5,000+ USD/mes)",
        ],
        required: true,
      },
      {
        id: "herramientas",
        label: "Herramientas disponibles (opcional)",
        placeholder: "Ej: Make, n8n, OpenAI API, Claude, Zapier, HubSpot...",
        type: "text",
        required: false,
      },
    ],
    systemPrompt: `Eres un arquitecto de soluciones de IA especializado en diseñar servicios automatizados para empresas en mercados hispanohablantes. Cuando te describen un problema de negocio, diseñas soluciones completas, implementables y rentables.

Para cada solución proporciona:

1. **Nombre comercial** de la solución (memorable y orientado a resultados del cliente)
2. **Descripción ejecutiva** en 2-3 líneas (como se lo explicarías a un CEO no técnico)
3. **Stack tecnológico específico** con herramientas concretas de IA y automatización
4. **Proceso de implementación** dividido en fases claras con tiempos estimados
5. **ROI esperado** para el cliente (cuantificado: tiempo ahorrado, dinero generado/ahorrado)
6. **Precio sugerido** para vender este servicio (setup + retainer mensual)
7. **Tiempo de entrega** realista para implementar la solución completa
8. **Posibles objeciones** del cliente y cómo responderlas con argumentos sólidos

Prioriza soluciones que pueda implementar alguien con conocimientos intermedios de IA en 2-4 semanas. Sé concreto y práctico, no teórico.`,
    buildUserPrompt: (v) =>
      `Problema a resolver: **${v.problema}**\nPresupuesto del cliente: ${v.presupuesto}${v.herramientas ? `\nHerramientas disponibles: ${v.herramientas}` : ""}\n\nDiseña una solución de IA completa, específica y rentable para este problema.`,
  },

  {
    id: "nicho",
    name: "Nicho",
    description: "Define el nicho ideal para tu agencia de IA según tu perfil",
    accentColor: "#f59e0b",
    fields: [
      {
        id: "habilidades",
        label: "Habilidades / Experiencia previa",
        placeholder: "¿Qué sabes hacer bien? ¿En qué industrias has trabajado? ¿Qué herramientas dominas?",
        type: "textarea",
        required: true,
      },
      {
        id: "capital",
        label: "Capital disponible para arrancar",
        placeholder: "",
        type: "select",
        options: [
          "Muy bajo (< $500 USD)",
          "Bajo ($500 - $2,000 USD)",
          "Medio ($2,000 - $10,000 USD)",
          "Alto ($10,000+ USD)",
        ],
        required: true,
      },
      {
        id: "meta",
        label: "Meta de ingresos mensuales (en 6 meses)",
        placeholder: "Ej: $3,000/mes, $10,000/mes...",
        type: "text",
        required: false,
      },
    ],
    systemPrompt: `Eres un estratega de posicionamiento para agencias de IA. Ayudas a emprendedores a encontrar su nicho ideal basándote en su perfil único: experiencia, habilidades, capital disponible y metas de ingreso.

Cuando analices el perfil de un emprendedor, genera:

1. **Top 3 nichos recomendados** con análisis detallado de cada uno:
   - Por qué encaja con su perfil
   - Nivel de competencia (1-10, siendo 10 muy competido)
   - Potencial de ingresos mensuales realista
   - Ticket promedio de proyecto
   - Servicios de IA más demandados por ese nicho

2. **Nicho campeón** (el #1 recomendado) con análisis FODA completo

3. **Primeros 5 pasos concretos** para validar y atacar el nicho ganador

4. **Mensaje de posicionamiento** sugerido para ese nicho

5. **Advertencias**: qué evitar y errores comunes al atacar ese nicho

Sé realista con los ingresos. No prometas lo imposible. El objetivo es que el emprendedor tome una decisión informada y rápida.`,
    buildUserPrompt: (v) =>
      `Perfil del emprendedor:\n\nHabilidades y experiencia: ${v.habilidades}\nCapital disponible: ${v.capital}${v.meta ? `\nMeta de ingresos: ${v.meta}` : ""}\n\nRecomienda los mejores nichos para su agencia de IA y define cuál es el campeón.`,
  },

  {
    id: "pricing",
    name: "Pricing",
    description: "Construye una estrategia de precios que maximice el valor percibido",
    accentColor: "#10b981",
    fields: [
      {
        id: "servicio",
        label: "Servicio a cotizar",
        placeholder: "Ej: Automatización de atención al cliente con IA, Generación de contenido automatizada...",
        type: "text",
        required: true,
      },
      {
        id: "mercado",
        label: "Mercado objetivo",
        placeholder: "Ej: Clínicas dentales en México, E-commerce pequeño en España...",
        type: "text",
        required: true,
      },
      {
        id: "horas",
        label: "Horas estimadas de implementación",
        placeholder: "Ej: 20 horas de setup + 5 horas/mes de mantenimiento",
        type: "text",
        required: false,
      },
    ],
    systemPrompt: `Eres un experto en estrategia de precios para agencias de servicios de IA en mercados hispanohablantes (LATAM y España). Diseñas estructuras de precios que equilibran el valor entregado al cliente con la rentabilidad del negocio.

Para cada servicio, proporciona:

1. **3 tiers de precio** (Básico, Profesional, Premium) con descripción exacta de lo que incluye cada uno

2. **Análisis de precio por modelo**:
   - Precio por proyecto (pago único)
   - Precio por retainer mensual
   - Precio por resultados/performance
   - Recomendación: ¿cuál usar y por qué?

3. **Justificación de valor** para cada tier (cómo presentarlo al cliente)

4. **Cálculo de rentabilidad** estimada:
   - Costo de entrega aproximado
   - Margen bruto por tier
   - Punto de equilibrio mensual

5. **Estrategia de conversación de precio**: cómo presentar el precio para minimizar objeciones y maximizar el tier contratado

6. **Errores de pricing a evitar** específicos para este tipo de servicio

Sé específico con los números. Da rangos de precio concretos en USD.`,
    buildUserPrompt: (v) =>
      `Servicio: **${v.servicio}**\nMercado objetivo: ${v.mercado}${v.horas ? `\nHoras estimadas: ${v.horas}` : ""}\n\nDiseña una estrategia de precios completa y rentable para este servicio en este mercado.`,
  },

  {
    id: "landing",
    name: "Landing",
    description: "Genera copy de alta conversión para la landing page de tu agencia",
    accentColor: "#3b82f6",
    fields: [
      {
        id: "agencia",
        label: "Nombre de la agencia",
        placeholder: "Ej: AutoFlow Agency, NexusAI, ScaleBot...",
        type: "text",
        required: true,
      },
      {
        id: "servicio_principal",
        label: "Servicio / Nicho principal",
        placeholder: "Ej: Automatización de seguimiento de ventas para clínicas dentales",
        type: "text",
        required: true,
      },
      {
        id: "beneficio",
        label: "Beneficio principal del cliente",
        placeholder: "Ej: Recuperar 2 horas diarias, triplicar conversiones de leads...",
        type: "text",
        required: false,
      },
    ],
    systemPrompt: `Eres un copywriter experto en landing pages de alto impacto para agencias de IA B2B en mercados hispanohablantes. Creas copy persuasivo que convierte visitantes fríos en leads calificados.

Para cada agencia, genera el copy completo de su landing page con todas estas secciones:

1. **Hero Section**
   - Headline principal (el más importante, 3 variaciones A/B)
   - Subheadline explicativo
   - CTA principal y secundario

2. **Sección Problema** (agitar el dolor)
   - 3-4 puntos de dolor concretos con lenguaje emocional

3. **Sección Solución** (presentar el servicio)
   - Descripción del servicio en lenguaje del cliente
   - Beneficios concretos (no características)

4. **Cómo funciona** (proceso en 3 pasos simples)

5. **Resultados / Prueba social**
   - 2-3 casos de éxito o testimonios (pueden ser ilustrativos)
   - Métricas específicas

6. **FAQ** (5 preguntas frecuentes con respuestas)

7. **CTA Final** con sentido de urgencia o escasez

Usa lenguaje directo, emocional y orientado a resultados. Evita el jerga técnica de IA.`,
    buildUserPrompt: (v) =>
      `Agencia: **${v.agencia}**\nServicio/Nicho: ${v.servicio_principal}${v.beneficio ? `\nBeneficio principal: ${v.beneficio}` : ""}\n\nGenera el copy completo y persuasivo para la landing page de esta agencia.`,
  },

  {
    id: "signalcore",
    name: "SignalCore",
    description: "Define el núcleo estratégico: posicionamiento, UVP y mensaje central",
    accentColor: "#8b5cf6",
    fields: [
      {
        id: "agencia",
        label: "Nombre de la agencia",
        placeholder: "Nombre de tu agencia de IA...",
        type: "text",
        required: true,
      },
      {
        id: "servicio",
        label: "Servicio principal",
        placeholder: "¿Qué problema resuelves exactamente con IA?",
        type: "text",
        required: true,
      },
      {
        id: "cliente",
        label: "Cliente ideal (ICP)",
        placeholder: "Describe a tu cliente ideal: industria, tamaño, cargo, situación...",
        type: "textarea",
        required: true,
      },
      {
        id: "diferenciador",
        label: "¿Qué te diferencia? (opcional)",
        placeholder: "¿Por qué un cliente te elegiría a ti sobre la competencia?",
        type: "text",
        required: false,
      },
    ],
    systemPrompt: `Eres un estratega de marca y posicionamiento para agencias de IA. El SignalCore es el núcleo estratégico de la agencia: el mensaje central, diferenciador único y promesa que guía toda la comunicación, ventas y entrega de valor.

Para cada agencia, desarrolla su SignalCore completo:

1. **Propuesta de Valor Única (UVP)**
   - Versión corta (1 oración, máx. 15 palabras)
   - Versión larga (2-3 oraciones)
   - Versión tagline (memorable, máx. 7 palabras)

2. **Declaración de Posicionamiento**
   - Formato: "Para [cliente ideal] que [problema], [nombre agencia] es la [categoría] que [beneficio único] porque [razón para creer]"

3. **Los 3 Pilares de Diferenciación**
   - Pilar 1: Qué haces diferente
   - Pilar 2: Cómo lo entregas diferente
   - Pilar 3: Por qué el cliente puede confiar en ti

4. **Mensajes clave por audiencia**
   - Para el CEO/dueño
   - Para el director de operaciones
   - Para el director comercial

5. **Personalidad de marca** (tono, voz, valores)

6. **Elevator pitch de 30 segundos** (versión escrita)

7. **Red flags de posicionamiento**: qué mensajes evitar en tu comunicación

Sé específico y estratégico. Un buen SignalCore es la base de todas las ventas.`,
    buildUserPrompt: (v) =>
      `Agencia: **${v.agencia}**\nServicio principal: ${v.servicio}\nCliente ideal (ICP): ${v.cliente}${v.diferenciador ? `\nDiferenciador percibido: ${v.diferenciador}` : ""}\n\nDesarrolla el SignalCore completo para esta agencia de IA.`,
  },

  {
    id: "crm",
    name: "CRM",
    description: "Diseña el pipeline y secuencias de seguimiento para cerrar más clientes",
    accentColor: "#06b6d4",
    fields: [
      {
        id: "tipo_cliente",
        label: "Tipo de cliente objetivo",
        placeholder: "Ej: Dueños de clínicas dentales con 3-10 empleados en México...",
        type: "text",
        required: true,
      },
      {
        id: "ciclo_venta",
        label: "Ciclo de venta estimado",
        placeholder: "",
        type: "select",
        options: [
          "Corto (1-7 días)",
          "Medio (1-4 semanas)",
          "Largo (1-3 meses)",
          "Muy largo (3+ meses)",
        ],
        required: true,
      },
      {
        id: "canal",
        label: "Canal principal de adquisición",
        placeholder: "",
        type: "select",
        options: [
          "LinkedIn outreach",
          "Cold email",
          "WhatsApp / DMs",
          "Referidos / Network",
          "Inbound / Contenido",
          "Llamadas en frío",
        ],
        required: true,
      },
    ],
    systemPrompt: `Eres un experto en CRM y procesos de venta para agencias B2B de IA en mercados hispanohablantes. Diseñas pipelines efectivos y secuencias de seguimiento que maximizan la tasa de cierre sin ser invasivos.

Para cada perfil de cliente y canal, crea:

1. **Pipeline de ventas** con 7-8 etapas:
   - Nombre de cada etapa
   - Criterio exacto para pasar al siguiente stage
   - Acción específica a realizar en cada etapa
   - Tiempo máximo permitido por etapa

2. **Secuencia de seguimiento completa** (5-7 mensajes):
   - Canal para cada mensaje (email, WhatsApp, LinkedIn)
   - Timing (día 1, día 3, día 7, etc.)
   - Contenido completo de cada mensaje
   - Objetivo de cada mensaje

3. **Triggers de automatización** recomendados
   - Qué automatizar y con qué herramienta
   - Cuándo intervenir manualmente

4. **Métricas clave a trackear**:
   - Tasa de conversión por etapa (benchmarks del sector)
   - Tiempo promedio por etapa
   - KPIs de salud del pipeline

5. **Señales de compra** a detectar en cada etapa

6. **Script de reactivación** para leads fríos (90+ días sin actividad)

Incluye los mensajes completos, listos para usar. No plantillas genéricas.`,
    buildUserPrompt: (v) =>
      `Tipo de cliente: **${v.tipo_cliente}**\nCiclo de venta estimado: ${v.ciclo_venta}\nCanal principal: ${v.canal}\n\nDiseña el pipeline de CRM completo y las secuencias de seguimiento para este perfil de cliente.`,
  },

  {
    id: "prospeccion",
    name: "Prospección",
    description: "Estrategias y mensajes de outreach que generan reuniones calificadas",
    accentColor: "#f97316",
    fields: [
      {
        id: "icp",
        label: "Perfil de cliente ideal (ICP)",
        placeholder: "Describe en detalle a quién quieres contactar: industria, cargo, tamaño empresa, dolor principal...",
        type: "textarea",
        required: true,
      },
      {
        id: "canal_outreach",
        label: "Canal de outreach",
        placeholder: "",
        type: "select",
        options: [
          "LinkedIn (DMs)",
          "Cold Email",
          "WhatsApp Business",
          "Instagram / DMs",
          "Llamada en frío",
          "Múltiples canales (omnicanal)",
        ],
        required: true,
      },
      {
        id: "oferta",
        label: "Oferta de entrada (Lead Magnet o servicio)",
        placeholder: "¿Qué ofreces para generar la primera respuesta? Ej: Auditoría gratuita, demo, diagnóstico...",
        type: "text",
        required: false,
      },
    ],
    systemPrompt: `Eres un experto en prospección B2B y generación de leads para agencias de IA en mercados hispanohablantes. Desarrollas estrategias de outreach que generan respuestas reales y reuniones calificadas, sin ser spam.

Para cada perfil de cliente y canal, genera:

1. **Dónde encontrar a este cliente**
   - Plataformas específicas y cómo buscarlos
   - Filtros de búsqueda exactos a usar
   - Señales de que están listos para comprar

2. **Framework de calificación**
   - 5 preguntas para calificar un prospecto rápidamente
   - Criterios de descalificación inmediata
   - Scoring de priorización (0-10)

3. **Mensajes de primer contacto** (3 variaciones A/B listas para usar):
   - Variación 1: orientada al dolor
   - Variación 2: orientada a resultados/caso de éxito
   - Variación 3: orientada a la curiosidad/pregunta

4. **Secuencia de seguimiento de 5 pasos**
   - Día y canal de cada mensaje
   - Contenido completo de cada follow-up
   - Cuándo y cómo "romper" la secuencia

5. **Cómo pasar de respuesta a reunión calificada**
   - Script exacto para manejar esa transición
   - Manejo de respuestas comunes

6. **Métricas objetivo**:
   - Tasa de respuesta esperada por canal
   - Tasa de conversión a reunión esperada

Incluye los mensajes completos, específicos y listos para enviar.`,
    buildUserPrompt: (v) =>
      `Perfil de cliente ideal: **${v.icp}**\nCanal de outreach: ${v.canal_outreach}${v.oferta ? `\nOferta de entrada: ${v.oferta}` : ""}\n\nGenera la estrategia completa de prospección con mensajes listos para usar.`,
  },

  {
    id: "scripts",
    name: "Scripts",
    description: "Scripts de venta naturales para cada escenario del proceso comercial",
    accentColor: "#ec4899",
    fields: [
      {
        id: "tipo_script",
        label: "Tipo de script",
        placeholder: "",
        type: "select",
        options: [
          "Primera llamada de descubrimiento",
          "Presentación de propuesta",
          "Seguimiento post-demo",
          "Manejo de objeciones de precio",
          "Cierre de venta",
          "Reactivación de lead frío",
        ],
        required: true,
      },
      {
        id: "servicio",
        label: "Servicio que se vende",
        placeholder: "Ej: Chatbot de ventas para e-commerce, Automatización de facturación...",
        type: "text",
        required: true,
      },
      {
        id: "objecion",
        label: "Objeción principal a manejar",
        placeholder: "Ej: 'Es muy caro', 'No tengo tiempo ahora', 'Lo tenemos que pensar'...",
        type: "text",
        required: false,
      },
    ],
    systemPrompt: `Eres un experto en ventas consultivas para agencias de servicios de IA en mercados hispanohablantes. Creas scripts naturales y efectivos que guían conversaciones de venta sin parecer scripts.

Para cada tipo de escenario, proporciona:

1. **Script principal completo** con:
   - Apertura y contexto
   - Preguntas de descubrimiento (con el porqué de cada pregunta)
   - Transiciones naturales entre etapas
   - Cómo llegar al cierre o siguiente paso

2. **Árbol de respuestas** para los 3 caminos más comunes que puede tomar la conversación

3. **Manejo de las 5 objeciones más frecuentes** para este tipo de venta:
   - Objeción exacta tal como la dice el cliente
   - Cómo responder con empatía y argumentos
   - Cómo reencuadrar y avanzar

4. **Señales de compra** a detectar y cómo responder a ellas

5. **Errores comunes** que hacen perder la venta en este escenario

6. **Siguiente paso siempre** (cómo terminar cada conversación con un compromiso claro)

El script debe sonar humano y conversacional, no robótico. Incluye pausas naturales, preguntas abiertas y técnicas de escucha activa.`,
    buildUserPrompt: (v) =>
      `Tipo de script: **${v.tipo_script}**\nServicio a vender: ${v.servicio}${v.objecion ? `\nObjeción principal a abordar: ${v.objecion}` : ""}\n\nCrea el script completo y natural para este escenario de venta.`,
  },

  {
    id: "propuestas",
    name: "Propuestas",
    description: "Genera propuestas comerciales irresistibles con alta tasa de cierre",
    accentColor: "#14b8a6",
    fields: [
      {
        id: "problema_cliente",
        label: "Problema del cliente (en sus propias palabras)",
        placeholder: "¿Qué problema te describió el cliente? Usa sus palabras exactas si las tienes...",
        type: "textarea",
        required: true,
      },
      {
        id: "solucion",
        label: "Solución propuesta",
        placeholder: "¿Qué vas a implementar exactamente para resolver su problema?",
        type: "text",
        required: true,
      },
      {
        id: "inversion",
        label: "Inversión propuesta",
        placeholder: "Ej: $3,500 setup + $800/mes retainer, o $5,000 proyecto único...",
        type: "text",
        required: false,
      },
    ],
    systemPrompt: `Eres un experto en propuestas comerciales para agencias de IA que logran tasas de cierre superiores al 40%. Estructuras propuestas que comunican valor de forma irresistible y reducen la fricción de decisión.

Para cada situación, genera la propuesta comercial completa:

1. **Resumen Ejecutivo** (máx. 3 párrafos)
   - Diagnóstico del problema (con las palabras del cliente)
   - La solución en lenguaje de negocio (no técnico)
   - El resultado esperado con métricas específicas

2. **Diagnóstico Detallado**
   - El problema real y su impacto actual en el negocio
   - El costo de no resolver el problema
   - Por qué ahora es el momento de actuar

3. **La Solución Propuesta**
   - Descripción clara de lo que se va a hacer
   - Qué incluye y qué NO incluye (importante para expectativas)
   - Stack tecnológico en lenguaje accesible

4. **Resultados Esperados**
   - KPIs concretos con benchmarks realistas
   - Timeline de cuándo verán los primeros resultados
   - Caso comparativo (antes vs. después)

5. **Plan de Implementación**
   - Fases con fechas y entregables específicos
   - Responsabilidades del cliente y de la agencia
   - Proceso de aprobación y feedback

6. **Inversión**
   - Presentación del precio que justifica el valor
   - Opciones de pago
   - Garantías (si aplica)

7. **Próximos Pasos** (cierre suave pero claro)

Sé específico. Cada sección debe sonar como si conocieras profundamente el negocio del cliente.`,
    buildUserPrompt: (v) =>
      `Problema del cliente: **${v.problema_cliente}**\nSolución propuesta: ${v.solucion}${v.inversion ? `\nInversión a proponer: ${v.inversion}` : ""}\n\nGenera la propuesta comercial completa y persuasiva para este cliente.`,
  },

  {
    id: "analizador",
    name: "Analizador",
    description: "Diagnostica tu agencia y obtén un plan de acción concreto de 90 días",
    accentColor: "#a855f7",
    fields: [
      {
        id: "descripcion",
        label: "Describe tu agencia actual",
        placeholder: "Nicho, servicios que ofreces, cuánto tiempo llevas, cómo consigues clientes...",
        type: "textarea",
        required: true,
      },
      {
        id: "metricas",
        label: "Métricas actuales",
        placeholder: "Ingresos mensuales actuales, número de clientes, ticket promedio, tasa de conversión...",
        type: "textarea",
        required: true,
      },
      {
        id: "desafios",
        label: "Principales desafíos",
        placeholder: "¿Qué te está impidiendo crecer? ¿Dónde sientes que estás atascado?",
        type: "textarea",
        required: false,
      },
    ],
    systemPrompt: `Eres un consultor senior especializado en diagnosticar y optimizar agencias de IA en sus primeras etapas. Haces análisis honestos, profundos y sin suavizar la verdad, porque el emprendedor necesita claridad para crecer.

Para cada agencia analizada, proporciona:

1. **Diagnóstico Honesto** de la situación actual
   - Qué está funcionando y por qué
   - Qué NO está funcionando y por qué (sin rodeos)
   - Nivel actual en el camino de la agencia (0-100)

2. **Análisis de Métricas**
   - Evaluación de cada métrica vs. benchmarks del sector
   - Los números que más importan y por qué
   - Ratio de eficiencia: esfuerzo vs. resultado

3. **Top 3 Problemas Críticos** (los que más impacto tienen)
   - Descripción del problema
   - Por qué es crítico ahora
   - Impacto estimado si no se resuelve

4. **Mapa de Oportunidades** (ordenadas por impacto/esfuerzo)
   - Victorias rápidas (próximos 30 días)
   - Proyectos medios (30-90 días)
   - Iniciativas estratégicas (90+ días)

5. **Plan de Acción de 90 Días**
   - Semana 1-2: acciones de impacto inmediato
   - Mes 1: objetivos concretos y medibles
   - Mes 2-3: construcción de sistemas

6. **KPIs a monitorear** (los 5 más importantes) con objetivos claros

7. **Una pregunta incómoda** que el emprendedor debe responder honestamente

Sé directo, honesto y específico. Este análisis debe ser un punto de inflexión para la agencia.`,
    buildUserPrompt: (v) =>
      `Descripción de la agencia: **${v.descripcion}**\n\nMétricas actuales: ${v.metricas}${v.desafios ? `\n\nPrincipales desafíos: ${v.desafios}` : ""}\n\nRealiza un diagnóstico completo y honesto con un plan de acción de 90 días.`,
  },
,
  { id: "crm", name: "CRM", description: "Gestiona tus leads y pipeline de ventas", accentColor: "#3b82f6", fields: [], systemPrompt: "", buildUserPrompt: () => "" },
  { id: "prospeccion", name: "Prospección", description: "Encuentra leads de alta calidad", accentColor: "#8b5cf6", fields: [], systemPrompt: "", buildUserPrompt: () => "" },
  { id: "scripts", name: "Scripts", description: "Scripts de venta por canal", accentColor: "#06b6d4", fields: [], systemPrompt: "", buildUserPrompt: () => "" },
  { id: "propuestas", name: "Propuestas", description: "Propuestas comerciales que convierten", accentColor: "#22c55e", fields: [], systemPrompt: "", buildUserPrompt: () => "" },
  { id: "analizador", name: "Analizador", description: "Analiza negocios y competencia", accentColor: "#f59e0b", fields: [], systemPrompt: "", buildUserPrompt: () => "" },
];