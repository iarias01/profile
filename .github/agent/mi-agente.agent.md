---
description: >
  Agente para el portfolio personal de Ignacio Arias.
  Aplica automáticamente estas reglas a todos los archivos del proyecto.
applyTo: "**"
---

# Portfolio de Ignacio Arias — Reglas del Proyecto

## Propósito

Página de portfolio personal para presentar a **Ignacio Arias** como desarrollador web y de aplicaciones móviles. El objetivo es **vender servicios profesionales** con una estética formal, sobria y moderna.

---

## Información Personal

- **Nombre:** Ignacio Arias
- **Profesión:** Desarrollador Web & Mobile
- **Experiencia:** +10 años
- **WhatsApp:** +54 11 6799-7544 → `https://wa.me/541167997544`
- **LinkedIn:** `https://www.linkedin.com/in/iarias89/`
- **Email:** `iariasdev1@gmail.com`

---

## Stack Tecnológico

- **Frontend:** Angular, Ionic, Capacitor
- **Estilos:** SCSS con metodología **BEM** obligatoria
- **Mobile:** Capacitor (iOS / Android)
- **Animaciones:** animate.css (incluida vía CDN en `index.html`)
- **Tipografía:** Inter (Google Fonts, incluida en `index.html`)

---

## Arquitectura del Proyecto

```
src/
├── app/
│   ├── home/
│   │   ├── home.page.html    ← Toda la UI (una sola página)
│   │   ├── home.page.scss    ← Estilos BEM
│   │   ├── home.page.ts      ← Lógica: idioma, portfolio, scroll
│   │   └── home.module.ts    ← Declara TranslatePipe
│   ├── services/
│   │   └── translation.service.ts  ← Carga i18n, detecta idioma del browser
│   └── pipes/
│       └── translate.pipe.ts       ← Pipe | translate (pure: false)
├── assets/
│   ├── header.png            ← Banner del hero (background)
│   ├── yo.PNG                ← Foto de perfil circular
│   ├── linkedin.png          ← Ícono de LinkedIn
│   ├── i18n/
│   │   ├── es.json           ← Textos en español
│   │   └── en.json           ← Textos en inglés
│   └── portafolio/
│       └── portfolio.json    ← Datos de proyectos (editable)
├── theme/
│   └── variables.scss        ← Variables Ionic + tokens de diseño
└── index.html                ← Incluye Inter Font + animate.css CDN
```

---

## Reglas de Estilo (SCSS / BEM)

- **Metodología BEM obligatoria:** `.bloque__elemento--modificador`
- No usar IDs como selectores CSS (sólo para scroll targets en JS)
- Variables SCSS definidas en `home.page.scss`:
  - `$bg-primary: #090909` — fondo principal
  - `$bg-secondary: #111111` — fondo alternado entre secciones
  - `$bg-card: #141414` — tarjetas
  - `$blue: #1976D2`, `$blue-light: #2196F3`, `$blue-lighter: #64B5F6`
  - `$text: #eeeeee`, `$text-muted: #888888`
- Predominan **negro y azul** en todo el diseño
- Breakpoints responsive: `768px` (mobile), `820px` (navbar), `900px` (grids)
- Usar `clamp()` para tipografía fluida

---

## Reglas de Internacionalización (i18n)

- Idiomas soportados: **español (es)** e **inglés (en)**
- El idioma se detecta automáticamente desde `navigator.language` al cargar
- El usuario puede cambiarlo con el botón de idioma en la navbar
- Los textos se cargan desde `assets/i18n/es.json` y `assets/i18n/en.json`
- Usar siempre el pipe `| translate` en plantillas: `{{ 'clave.sub' | translate }}`
- El portafolio tiene campos bilingües: `title_es`, `title_en`, `description_es`, `description_en`

---

## Secciones de la Página

1. **Navbar** — Fija, transparente al inicio, opaca al hacer scroll. Incluye botón de idioma y menú hamburguesa en mobile.
2. **Hero** — Full viewport. Background: `assets/header.png`. Foto circular: `assets/yo.PNG`. Animaciones con animate.css.
3. **About (Sobre Mí)** — Texto bilingüe, stats (10+ años, 50+ proyectos, 30+ clientes).
4. **Skills** — Barras de progreso para Angular, Ionic, Capacitor, TypeScript, JS, SCSS/BEM, Node.js, Git, REST APIs, Firebase, PWA.
5. **Services** — 6 tarjetas: Web Dev, Mobile Apps, PWA, Landing Pages, Consultoría, API/Backend.
6. **Portfolio** — Grid filtrable (Todos / Web / Mobile / PWA). Datos desde `assets/portafolio/portfolio.json`. Imágenes en `assets/portafolio/`.
7. **Contact** — 3 tarjetas: WhatsApp, LinkedIn, Email (con los datos reales del dueño).
8. **Footer** — Branding "IA.", copyright, "Made with ♥ Angular & Ionic".

---

## Portfolio JSON Schema

Editar `src/assets/portafolio/portfolio.json` para agregar proyectos reales:

```json
{
  "id": 1,
  "slug": "nombre-unico",
  "title_es": "Título en español",
  "title_en": "Title in English",
  "description_es": "Descripción corta en español.",
  "description_en": "Short description in English.",
  "image": "assets/portafolio/nombre-imagen.jpg",
  "tags": ["Angular", "Ionic"],
  "link": "https://url-del-proyecto.com",
  "category": "web | mobile | pwa"
}
```

Las imágenes van en `src/assets/portafolio/` (recomendado: 800×500px, JPG/WebP).

---

## Links de Contacto

Siempre usar estos valores exactos. No hardcodear en otros lugares:

| Canal    | URL / Valor                             |
| -------- | --------------------------------------- |
| WhatsApp | `https://wa.me/541167997544`            |
| LinkedIn | `https://www.linkedin.com/in/iarias89/` |
| Email    | `mailto:iariasdev1@gmail.com`           |

---

## Reglas Generales de Desarrollo

- **No usar** todos los componentes de Ionic. Preferir HTML semántico + CSS propio.
- Mantener la **paleta negra/azul**; no introducir colores cálidos (naranja, rojo, etc.)
- Todas las imágenes deben tener atributo `alt` descriptivo.
- Los links externos deben tener `target="_blank" rel="noopener noreferrer"`.
- El email en HTML debe escaparse como `iariasdev1&#64;gmail.com` para evitar scrapers.
- La página debe verse bien en **desktop (1440px)**, **tablet (768px)** y **mobile (375px)**.
- No agregar `ion-header` nativo; la navbar es un `<nav>` propio dentro de `ion-content`.
