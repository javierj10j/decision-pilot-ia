// ============================================================
// DECISION PILOT IA — Motor de Prompts (prompts.js)
// ============================================================

const PROMPT_MAESTRO = `Actúa como consultor experto en sistemas de información y toma de decisiones asistida por IA.
Tu objetivo es analizar el caso que te presento y producir una recomendación razonada, estructurada y accionable.

REGLAS OBLIGATORIAS:
- No tomes decisiones automáticas sin justificarlas.
- Señala explícitamente qué partes del proceso pueden automatizarse y cuáles deben quedar bajo control humano.
- Si faltan datos clave, indícalos antes de recomendar.
- No generes respuestas superficiales: cada sección debe aportar valor concreto.

ESTRUCTURA DE RESPUESTA OBLIGATORIA:

1. RESUMEN DEL PROBLEMA
   Describe el problema central en 3-5 líneas. Identifica el origen y el impacto actual.

2. DECISIÓN REAL A TOMAR
   Formula con precisión qué hay que decidir, su alcance y su plazo.

3. DATOS FALTANTES
   Lista qué información adicional sería necesaria para una decisión más robusta.

4. TRES ALTERNATIVAS
   Propón tres opciones diferenciadas (no variaciones del mismo enfoque).

5. COMPARACIÓN DE ALTERNATIVAS
   Analiza cada alternativa en: viabilidad, coste estimado, riesgos, beneficios y tiempo de implantación.

6. RECOMENDACIÓN RAZONADA
   Indica cuál alternativa recomiendas y por qué, con argumentos concretos.

7. AUTOMATIZACIÓN VS. CONTROL HUMANO
   Especifica qué tareas puede asumir la IA y cuáles deben quedar bajo supervisión humana. Justifica cada elección.

8. KPIs DE ÉXITO
   Define 3-5 indicadores medibles para evaluar si la decisión fue correcta.

9. DECISIÓN FINAL
   Concluye con exactamente una de estas opciones y explica las condiciones:
   ✅ GO — Proceder
   ❌ NO-GO — No proceder en este momento
   ⚠️ GO CON CONDICIONES — Proceder solo si se cumplen estas condiciones: [lista]`;

// Variaciones específicas por caso
const VARIACIONES = {
  admision: `
CONTEXTO ESPECÍFICO — ADMISIÓN Y BECAS UNIVERSITARIAS:
Este caso involucra decisiones que afectan a personas de forma directa y potencialmente sensible.
La equidad, la trazabilidad y la ausencia de sesgo son requisitos no negociables.
Añade al final de tu respuesta un apartado adicional:

10. RIESGO DE SESGO Y MEDIDAS DE EQUIDAD
    - Identifica los vectores de sesgo más probables en este proceso.
    - Propón al menos 3 medidas concretas para garantizar equidad y trazabilidad.
    - Indica qué decisiones NUNCA deben ser automatizadas en este contexto.`,

  tickets: `
CONTEXTO ESPECÍFICO — SOPORTE TI INTERNO:
Este caso debe separar con claridad los tickets estándar de los incidentes críticos.
En tu análisis, incluye una sección adicional:

10. CLASIFICACIÓN Y ESCALADO
    - Define qué criterios determinan si un ticket es estándar o crítico.
    - Propón qué subproceso conviene rediseñar primero (en 5 líneas).
    - Señala en qué casos la IA solo puede asistir al técnico, nunca sustituirle.
    - Incluye una propuesta de SLA diferenciado por nivel de criticidad.`,

  ecommerce: `
CONTEXTO ESPECÍFICO — DEVOLUCIONES Y FRAUDE E-COMMERCE:
Este caso debe equilibrar la experiencia del cliente con el control del fraude.
Incluye al final un bloque adicional:

10. SEPARACIÓN ENTRE CASOS ESTÁNDAR Y EXCEPCIONALES
    - Qué tipos de devolución se pueden automatizar completamente.
    - Qué casos requieren revisión humana obligatoria.
    - Qué regla de negocio conviene definir primero.
    - Qué indicador demostraría que el proceso ha mejorado realmente.`,

  documentacion: `
CONTEXTO ESPECÍFICO — ASISTENTE DE DOCUMENTACIÓN CORPORATIVA:
Este caso requiere comparar arquitecturas técnicas con criterios de coste, privacidad y rendimiento.
Añade al final de tu respuesta:

10. COMPARACIÓN DE ARQUITECTURAS
    Analiza estas tres opciones con los criterios indicados:
    | Criterio           | SaaS / API externa | Despliegue privado | Opción híbrida |
    |--------------------|--------------------|--------------------|----------------|
    | Cuándo elegirla    |                    |                    |                |
    | Riesgo principal   |                    |                    |                |
    | Coste relativo     |                    |                    |                |
    | Efecto en latencia |                    |                    |                |
    | Efecto en privacidad|                   |                    |                |
    
    Termina con una recomendación de arquitectura y justifícala.`
};

const NOMBRES_CASOS = {
  admision:      'Admisión y Becas Universitarias',
  tickets:       'Soporte TI Interno',
  ecommerce:     'Devoluciones y Fraude E-commerce',
  documentacion: 'Documentación Corporativa'
};

/**
 * Genera el prompt completo combinando el caso seleccionado
 * con el contexto introducido por el usuario.
 */
function generarPrompt({ caso, contexto, decision, datos, restricciones }) {
  const nombreCaso = NOMBRES_CASOS[caso] || caso;
  const variacion  = VARIACIONES[caso] || '';

  return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DECISION PILOT IA · Caso: ${nombreCaso}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${PROMPT_MAESTRO}
${variacion}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATOS DEL CASO PROPORCIONADOS POR EL USUARIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CASO: ${nombreCaso}

CONTEXTO:
${contexto.trim()}

DECISIÓN A TOMAR:
${decision.trim()}

DATOS DISPONIBLES:
${datos.trim()}

RESTRICCIONES Y CONDICIONES:
${restricciones.trim()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Responde siguiendo la estructura obligatoria definida arriba.
Sé concreto, accionable y diferencia siempre automatización de control humano.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}
