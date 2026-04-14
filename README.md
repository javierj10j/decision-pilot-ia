# Decision Pilot IA

> Herramienta web educativa para estructurar decisiones complejas con inteligencia artificial razonada.

---

## Objetivo

**Decision Pilot IA** ayuda a formular decisiones complejas de forma estructurada, generando prompts detallados listos para usar en cualquier IA de acceso libre (Claude, ChatGPT, Gemini, etc.).

La app **no decide por ti**. Su propósito es obligarte a articular el contexto, los datos, las restricciones y la decisión real antes de pedir ayuda a la IA, evitando respuestas superficiales y promoviendo el razonamiento comparativo y el control humano donde es necesario.

---

## Qué problema resuelve

La mayoría de los equipos que usan IA para tomar decisiones cometen el mismo error: hacen preguntas vagas y obtienen respuestas genéricas. Esta app estructura el proceso de forma que la IA reciba toda la información relevante y deba responder siguiendo un esquema riguroso: resumen del problema, alternativas, comparación, recomendación razonada, KPIs y decisión final con justificación.

---

## Casos incluidos

| # | Caso | Descripción |
|---|------|-------------|
| 1 | **Admisión y Becas Universitarias** | Evaluar si implantar IA para prevalidar expedientes sin perder equidad ni trazabilidad |
| 2 | **Tickets de Soporte TI Interno** | Automatizar clasificación y escalado de tickets diferenciando incidentes críticos |
| 3 | **Devoluciones y Fraude en E-commerce** | Automatizar devoluciones estándar y reservar revisión humana para fraude y excepciones |
| 4 | **Asistente de Documentación Corporativa** | Elegir arquitectura y política de uso para un asistente de documentación interna |

---

## Estructura de archivos

```
decision-pilot-ia/
├── index.html          → Interfaz principal de la aplicación
├── style.css           → Estilos visuales (tema oscuro editorial)
├── app.js              → Lógica: selección de caso, validación, generación y copia
├── prompts.js          → Motor de prompts: prompt maestro + variaciones por caso
├── data/
│   └── ejemplos.json   → Datos precargados para los cuatro casos
└── README.md           → Este archivo
```

---

## Instrucciones de uso

1. **Selecciona un caso** de los cuatro disponibles.
2. Haz clic en **"Cargar datos de ejemplo"** para ver un caso precargado, o rellena los campos con tu propio contexto.
3. Haz clic en **"Generar prompt estructurado"**.
4. Copia el prompt con el botón **"Copiar al portapapeles"**.
5. Pega el prompt en la IA de tu elección y evalúa la respuesta.

> ⚠️ No introduzcas datos personales reales, contraseñas ni información confidencial. Esta app genera prompts para usar en servicios externos.

---

## Cómo desplegarlo en GitHub Pages

1. Sube todos los archivos a un repositorio **público** en GitHub.
2. Ve a **Settings → Pages**.
3. En *Source*, selecciona la rama `main` y la carpeta `/ (root)`.
4. Haz clic en **Save**.
5. En unos segundos tendrás una URL pública del tipo:
   `https://tu-usuario.github.io/decision-pilot-ia`
6. Comprueba que los cuatro casos cargan correctamente.
7. Añade la URL a este README.

**URL de despliegue:** _(añadir tras publicar)_

---

## Limitaciones

- La app **no llama a ninguna API de IA**: genera el prompt y el usuario lo pega manualmente en la IA elegida.
- Los datos de ejemplo son ficticios y con fines educativos.
- No almacena ningún dato: todo se procesa localmente en el navegador.
- La calidad de la respuesta depende del modelo de IA utilizado y de la completitud de los campos.

---

## Autores

| Nombre | Rol en el proyecto |
|--------|-------------------|
| _(Miembro 1)_ | _(tarea)_ |
| _(Miembro 2)_ | _(tarea)_ |
| _(Miembro 3)_ | _(tarea)_ |
| _(Miembro 4)_ | _(tarea)_ |

---

## Licencia

Proyecto educativo de acceso libre. Desarrollado en el marco del laboratorio de toma de decisiones razonadas con IA.
