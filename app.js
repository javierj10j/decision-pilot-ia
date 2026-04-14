// ============================================================
// DECISION PILOT IA — Lógica principal (app.js)
// Flujo: selección de caso → carga de datos → generación
//        del prompt → validación → copia al portapapeles
// ============================================================

// ── Referencias al DOM ──────────────────────────────────────
const casoCards      = document.querySelectorAll('.caso-card');
const casoDescript   = document.getElementById('caso-descripcion');
const btnCargar      = document.getElementById('btn-cargar-ejemplo');
const campoContexto  = document.getElementById('campo-contexto');
const campoDecision  = document.getElementById('campo-decision');
const campoDatos     = document.getElementById('campo-datos');
const campoRestricc  = document.getElementById('campo-restricciones');
const btnGenerar     = document.getElementById('btn-generar');
const btnCopiar      = document.getElementById('btn-copiar');
const btnLimpiar     = document.getElementById('btn-limpiar');
const resultadoWrap  = document.getElementById('resultado-wrap');
const resultadoTexto = document.getElementById('resultado-texto');
const resultadoTag   = document.getElementById('resultado-caso-tag');
const errorMsg       = document.getElementById('error-msg');

// ── Estado ──────────────────────────────────────────────────
let casoActivo = 'admision';
let ejemplos   = {};

// Textos descriptivos de cada caso
const DESCRIPCIONES = {
  admision:      'Decidir si implantar un asistente con IA que prevalide solicitudes y resuma expedientes, sin comprometer equidad ni trazabilidad.',
  tickets:       'Decidir si automatizar la clasificación y el escalado inicial de tickets internos de soporte, diferenciando incidentes estándar de críticos.',
  ecommerce:     'Decidir si automatizar devoluciones estándar y reservar revisión humana para posibles casos de fraude y excepciones de alto valor.',
  documentacion: 'Decidir qué arquitectura y política de uso convienen para un asistente que consulta documentación interna con control de coste, privacidad y latencia.'
};

const NOMBRES_TAG = {
  admision:      'Admisión · Becas',
  tickets:       'Soporte TI',
  ecommerce:     'E-commerce',
  documentacion: 'Documentación'
};

// ── Carga de ejemplos ────────────────────────────────────────
async function cargarEjemplos() {
  try {
    const res  = await fetch('data/ejemplos.json');
    ejemplos   = await res.json();
  } catch {
    ejemplos = {};
  }
}
cargarEjemplos();

// ── Selección de caso ────────────────────────────────────────
casoCards.forEach(card => {
  card.addEventListener('click', () => {
    casoCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    casoActivo = card.dataset.caso;
    casoDescript.textContent = DESCRIPCIONES[casoActivo] || '';
    ocultarResultado();
  });
});

// Inicializar descripción del caso por defecto
casoDescript.textContent = DESCRIPCIONES[casoActivo];

// ── Cargar datos de ejemplo ──────────────────────────────────
btnCargar.addEventListener('click', () => {
  const ej = ejemplos[casoActivo];
  if (!ej) {
    mostrarError('No se pudieron cargar los datos de ejemplo. Comprueba que data/ejemplos.json existe.');
    return;
  }
  campoContexto.value  = ej.contexto     || '';
  campoDecision.value  = ej.decision     || '';
  campoDatos.value     = ej.datos        || '';
  campoRestricc.value  = ej.restricciones || '';
  ocultarError();
  ocultarResultado();
});

// ── Generar prompt ───────────────────────────────────────────
btnGenerar.addEventListener('click', () => {
  ocultarError();

  // Paso 1: Validar campos
  const camposVacios = [];
  if (!campoContexto.value.trim())  camposVacios.push('Contexto de la situación');
  if (!campoDecision.value.trim())  camposVacios.push('Decisión a tomar');
  if (!campoDatos.value.trim())     camposVacios.push('Datos disponibles');
  if (!campoRestricc.value.trim())  camposVacios.push('Restricciones y condiciones');

  if (camposVacios.length > 0) {
    mostrarError(`Completa los siguientes campos antes de generar:\n• ${camposVacios.join('\n• ')}`);
    return;
  }

  // Paso 2: Generar prompt usando prompts.js
  const prompt = generarPrompt({
    caso:          casoActivo,
    contexto:      campoContexto.value,
    decision:      campoDecision.value,
    datos:         campoDatos.value,
    restricciones: campoRestricc.value
  });

  // Paso 3: Mostrar resultado
  resultadoTexto.textContent = prompt;
  resultadoTag.textContent   = NOMBRES_TAG[casoActivo] || casoActivo;
  resultadoWrap.classList.remove('hidden');
  btnCopiar.disabled = false;

  // Paso 4: Scroll suave al resultado
  setTimeout(() => resultadoWrap.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
});

// ── Copiar al portapapeles ───────────────────────────────────
btnCopiar.addEventListener('click', async () => {
  const texto = resultadoTexto.textContent;
  if (!texto) return;

  try {
    await navigator.clipboard.writeText(texto);
    const original = btnCopiar.textContent;
    btnCopiar.textContent = '✓ Copiado';
    btnCopiar.style.background = 'rgba(52, 211, 153, 0.12)';
    btnCopiar.style.borderColor = '#34d399';
    btnCopiar.style.color = '#34d399';
    setTimeout(() => {
      btnCopiar.textContent = original;
      btnCopiar.style.cssText = '';
    }, 2000);
  } catch {
    mostrarError('No se pudo copiar automáticamente. Selecciona el texto manualmente con Ctrl+A / Cmd+A.');
  }
});

// ── Limpiar campos ───────────────────────────────────────────
btnLimpiar.addEventListener('click', () => {
  campoContexto.value = '';
  campoDecision.value = '';
  campoDatos.value    = '';
  campoRestricc.value = '';
  ocultarResultado();
  ocultarError();
  btnCopiar.disabled  = true;
});

// ── Helpers ──────────────────────────────────────────────────
function mostrarError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}
function ocultarError() {
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}
function ocultarResultado() {
  resultadoWrap.classList.add('hidden');
  resultadoTexto.textContent = '';
  btnCopiar.disabled = true;
}
