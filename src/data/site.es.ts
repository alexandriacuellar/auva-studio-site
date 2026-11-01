// Spanish copy for the shared site data in site.ts. Keep prices and lists in step with the English file.
// Spanish speaks to the visitor as "usted", in the same plain, first-person voice as the English site.
import { site as siteEn } from './site';
export { serviceSchema } from './site';

export const site = {
  ...siteEn,
  tagline: 'Ayudo a negocios y equipos a que la tecnología trabaje para ellos.',
  location: 'Mid-Hudson Valley, Nueva York',
  regions: [
    ['Lower Hudson Valley', 'Westchester, Rockland'],
    ['Mid-Hudson Valley', 'Dutchess, Orange, Putnam, Sullivan, Ulster'],
    ['Upper Hudson Valley', 'Albany, Columbia, Greene, Rensselaer'],
  ],
};

export const nav = [
  { href: '/es/websites/', label: 'Sitios web' },
  { href: '/es/technology-consulting/', label: 'Tecnología e IA' },
  { href: '/es/production-emerging-tech/', label: 'Producción y Tecnología Emergente' },
  { href: '/es/about/', label: 'Sobre mí' },
];

export const categories = [
  {
    icon: 'globe',
    title: 'Servicios de sitios web',
    text: 'Sitios web que ayudan a sus clientes a encontrarle, confiar en usted y comunicarse.',
    items: ['Paquetes de sitios web desde $1,500', 'Diagnóstico Web y configuración de su Perfil de Negocio de Google', 'Edición de contenido, tiendas e integraciones', 'Ayuda después del lanzamiento: cambios, arreglos y páginas nuevas'],
    href: '/es/websites/',
    cta: 'Ver servicios de sitios web',
  },
  {
    icon: 'bulb',
    title: 'Tecnología, Automatización e IA',
    text: 'Configure las herramientas adecuadas, automatice el trabajo repetitivo, ponga la IA a trabajar y mantenga sus proyectos en marcha.',
    items: ['Revisión Tecnológica de $250', 'Configuración de automatizaciones', 'Configuración de espacios de proyectos', 'Talleres de IA para equipos', 'Gestión de proyectos'],
    href: '/es/technology-consulting/',
    cta: 'Ver Tecnología, Automatización e IA',
  },
  {
    icon: 'bolt',
    title: 'Producción y Tecnología Emergente',
    text: 'Una productora para proyectos de videojuegos, realidad extendida (XR) e interactivos, además de proyectos pequeños de AR para negocios.',
    items: ['Apoyo de producción para equipos de videojuegos y XR', 'Revisión del Plan de Producción', 'Proyectos AR iniciales', 'AR y VR para teléfonos, Meta Quest y lentes de Meta'],
    href: '/es/production-emerging-tech/',
    cta: 'Ver Producción y Tecnología Emergente',
  },
];

export const consulting = [
  { id: 'planning', price: '$250, se acredita a una configuración en 90 días', icon: 'search', title: 'Revisión Tecnológica', text: 'Una llamada de 60 minutos sobre sus herramientas y cómo se hace el trabajo, y luego un informe por escrito en 5 días hábiles con sus arreglos prioritarios, costos aproximados y dónde ayudaría la automatización o la IA.', items: ['Revisión de herramientas y suscripciones', 'Revisión de flujos de trabajo', 'Informe por escrito con prioridades'] },
  { id: 'automation', price: 'Desde $500', icon: 'gear', title: 'Configuración de automatización', text: 'Conecto las herramientas que ya usa para que el trabajo de rutina se haga solo, como correos de seguimiento, la bienvenida a clientes nuevos y reportes mensuales. Un flujo de trabajo, configurado en sus propias cuentas, con una guía breve.', items: ['Automatización de flujos de trabajo', 'Conexión de las aplicaciones que ya usa', 'Guía para su equipo'] },
  { id: 'workspace', price: 'Desde $1,500', icon: 'layers', title: 'Configuración de espacio de proyectos', text: 'Configuro la herramienta donde su equipo planifica el trabajo, como Asana, ClickUp, Jira, monday.com, Notion o Trello, con tableros, plantillas y responsables claros, y luego capacito a su equipo.', items: ['Configuración del espacio y las plantillas', 'Capacitación para su equipo', '30 días de preguntas después de la configuración'] },
  { id: 'delivery', price: '$65/hora, o mensual desde $650', icon: 'check', title: 'Gestión de Proyectos', text: 'Alguien que planifique, organice y mantenga en marcha su proyecto de tecnología, sin contratar a un gerente de tiempo completo.', items: ['Gestión de proyectos técnicos', 'Coordinación con proveedores y partes interesadas', 'Gestión de riesgos, plazos y entregas', 'Liderazgo de proyectos a tiempo parcial'] },
];

export const whyAuva = [
  { title: 'Profundidad técnica', text: 'Recomendaciones basadas en cómo los sistemas realmente funcionan, se conectan y se mantienen.' },
  { title: 'Visión de negocio', text: 'Sus metas, su presupuesto, su equipo y sus clientes van antes que cualquier plataforma nueva.' },
  { title: 'De la estrategia a la entrega', text: 'Una sola persona de confianza desde la primera revisión hasta la configuración y la capacitación.' },
  { title: 'Experiencia amplia', text: 'Sitios web, APIs, productos digitales, gestión de proyectos, videojuegos, XR y experiencias interactivas.' },
];

export const journey = [
  { title: 'Hablemos', text: 'Una llamada gratis de 30 minutos sobre sus metas, lo que usa hoy y lo que le está estorbando.' },
  { title: 'Un plan claro', text: 'Un alcance y un precio por escrito antes de empezar cualquier trabajo, sin sorpresas.' },
  { title: 'Hecho, y suyo', text: 'Hago el trabajo con usted y luego le entrego documentación y capacitación para que su equipo pueda seguir adelante.' },
];

export const samples = [
  { package: 'Presencia Esencial', slug: 'skytop-floor-co', name: 'Skytop Floor Co.', text: 'Un sitio de una sola página para una empresa de pisos de madera, con servicios, fotos de antes y después, y un formulario para pedir un presupuesto gratis.', goodFor: 'Ideal para oficios y servicios para el hogar, como contratistas, limpieza, jardinería y talleres de reparación.' },
  { package: 'Presencia Ampliada', slug: 'enea-hudson-cattle-farm', name: 'Enea Hudson Cattle Farm', text: 'Un sitio de 10 páginas para una granja familiar de ganado, con animales a la venta, una guía de compra y un formulario de consultas.', goodFor: 'Ideal para granjas, posadas, viñedos y negocios con varios servicios o experiencias que mostrar.' },
  { package: 'Presencia Completa', slug: 'rondout-mercantile', name: 'Rondout Mercantile', text: 'Un sitio más grande para una tienda en Kingston, con un CMS, talleres, citas para pruebas de ropa (como servicio adicional) y una lista para apartar productos nuevos.', goodFor: 'Ideal para tiendas, estudios y organizaciones que publican productos, eventos o noticias con frecuencia.' },
];

export const packages = [
  {
    id: 'essential',
    short: 'Esencial',
    eyebrow: 'Para empezar',
    name: 'Presencia Esencial',
    price: '$1,500',
    blurb: 'Una presencia profesional en internet que ayuda a sus clientes a encontrarle, confiar en usted y contactarle.',
    groups: [
      { label: 'Planificación y contenido', items: ['Una llamada de planificación y un plan de contenido', 'Pulo sus textos y completo lo que falte'] },
      { label: 'Diseño y desarrollo', items: ['Una sola página con desplazamiento o hasta 5 páginas, lo que mejor le funcione a su negocio. Le ayudo a decidir.', '2 diseños de página: uno para su página principal y otro para las demás', 'Diseño a la medida de su negocio, pensado primero para el celular', 'Un formulario de contacto y un mapa para encontrarle', '2 rondas de cambios'] },
      { label: 'Visibilidad en internet', items: ['Preparado para Google y las búsquedas con IA: títulos de página, datos de su negocio y un mapa del sitio', 'Orientación sobre su Perfil de Negocio de Google, cuando aplique', 'Estadísticas sencillas de visitas'] },
    ],
    timeline: '2–3 semanas',
  },
  {
    id: 'expanded',
    short: 'Ampliada',
    eyebrow: 'Para crecer',
    name: 'Presencia Ampliada',
    price: '$2,950',
    featured: true,
    blurb: 'Espacio para cada servicio que ofrece, para que sus clientes y Google puedan encontrar cada uno.',
    includes: 'Todo lo de Esencial, más:',
    groups: [
      { label: 'Diseño y desarrollo', items: ['Hasta 10 páginas', 'Hasta 3 diseños de página', '3 rondas de cambios'] },
      { label: 'Visibilidad en internet', items: ['Estadísticas que muestran qué páginas le traen llamadas y mensajes'] },
    ],
    extra: 'Agregue un CMS desde $1,750',
    timeline: '3–5 semanas',
  },
  {
    id: 'complete',
    short: 'Completa',
    eyebrow: 'Para ir más lejos',
    name: 'Presencia Completa',
    price: '$5,500',
    blurb: 'Para negocios en crecimiento que quieren actualizar su sitio por su cuenta.',
    includes: 'Todo lo de Ampliada, más:',
    groups: [
      { label: 'Diseño y desarrollo', items: ['Hasta 20 páginas', 'Hasta 6 diseños de página', '4 rondas de cambios'] },
      { label: 'Actualícelo usted', items: ['Un CMS para actualizar sus textos, fotos, noticias o eventos por su cuenta'] },
      { label: 'Visibilidad en internet', items: ['Una revisión de búsqueda 30 días después del lanzamiento'] },
    ],
    timeline: '6+ semanas',
  },
];

export const comparison = {
  benefits: [
    { icon: 'bolt', title: 'Carga casi al instante', text: 'Sus páginas se abren en un abrir y cerrar de ojos en cualquier celular, para que sus visitantes no se cansen de esperar y se vayan. Le muestro la puntuación de velocidad de Google de su sitio actual, y la del nuevo al lanzarlo.' },
    { icon: 'search', title: 'Hecho para que le encuentren, desde el primer día', text: 'La velocidad, una estructura clara y los datos que buscan Google y las herramientas de búsqueda con IA vienen en cada sitio, no son un extra que se paga después.' },
    { icon: 'cloud', title: 'Hosting gratis o de bajo costo', text: 'Servicios como Cloudflare y Netlify alojan sitios como estos gratis, o por unos pocos dólares al mes si el sitio tiene mucho tráfico. Su dominio cuesta unos $20 al año.' },
    { icon: 'check', title: 'Fácil de usar para todos', text: 'Cada sitio pasa una prueba de accesibilidad antes del lanzamiento, para que funcione con lectores de pantalla, con teclado o con letra más grande.' },
    { icon: 'key', title: 'Es suyo', text: 'Su código, su contenido, su dominio y su cuenta de hosting están a su nombre. Sin ataduras, y sin una plataforma de la que no pueda salir.' },
  ],
};

export const addons = [
  { icon: 'gear', title: 'CMS (sistema de gestión de contenidos)', text: 'Un panel sencillo para actualizar usted mismo los textos, las fotos, las noticias y los eventos de sus páginas. Sin programar.', price: 'Desde $1,750' },
  { icon: 'layers', title: 'Tiendas en línea y botones de compra', text: 'Desde unos cuantos botones de compra en un sitio pequeño hasta una tienda en línea completa. Cuénteme qué quiere vender y le doy un presupuesto.', price: 'Presupuesto según su proyecto' },
  { icon: 'clock', title: 'Citas, donaciones y otras herramientas', text: 'Agrego las herramientas de citas, donaciones o foros que ya usa, o le ayudo a configurar unas nuevas.', price: 'Presupuesto según las herramientas que use' },
  { icon: 'chat', title: 'Chatbots de IA y aplicaciones web', text: 'Un asistente de chat que responde las preguntas de sus visitantes con sus propias preguntas frecuentes, servicios y precios, o una herramienta a la medida, como un portal para clientes o una app de citas.', price: 'Presupuesto según su proyecto' },
];

export const brandEssentials = [
  ['Logotipo o logotipo de texto a la medida', 'Dos propuestas, y luego dos rondas de cambios sobre la que elija.'],
  ['Variaciones del logotipo', 'Versiones principal, clara y de un solo color.'],
  ['Favicon a la medida', 'Un pequeño ícono de su marca para la pestaña del navegador.'],
  ['Paleta de colores de marca', 'Cinco colores coordinados para un estilo uniforme.'],
  ['Tipografía de marca', 'Fuentes para títulos y textos que van con su negocio.'],
  ['Hoja de referencia de marca', 'Una página con su logotipo, sus colores (códigos para web e impresión) y sus fuentes.'],
  ['Archivos del logotipo para web e impresión', 'Archivos finales en SVG, PNG y PDF listo para imprimir.'],
];

export const process = [
  { title: 'Descubrimiento', text: 'Conozco su negocio y confirmamos sus metas y el mapa del sitio.', you: 'Comparta sus metas y materiales.', link: { href: '/es/websites/get-ready/', text: 'Cómo prepararse' }, terms: ['Depósito del 50% para empezar.', 'Todas las cuentas quedan a su nombre. Si necesito acceso, usted me agrega como usuaria y me quita cuando termine el trabajo.'] },
  { title: 'Contenido y revisión', text: 'Compártame lo que tenga. Lo pulo, redacto lo que falte y le explico la estructura de las páginas.', you: 'Apruebe sus textos y envíe sus comentarios en un plazo de 2 días hábiles.', terms: ['Usted aprueba el plan de páginas.'] },
  { title: 'Desarrollo y vista previa', text: 'Construyo su sitio y le comparto una vista previa en vivo que puede abrir en su celular; luego lo ajusto con sus comentarios.', you: 'Envíe cada ronda de cambios junta, en un plazo de 2 días hábiles.', terms: ['Una ronda de cambios es un solo grupo de cambios, enviados juntos.', 'Usted aprueba el sitio final antes de que se publique.'] },
  { title: 'Lanzamiento', text: 'Hago las pruebas, conecto sus herramientas, le capacito y publico su sitio.', you: 'Apruebe la publicación de su sitio.', terms: ['El saldo se paga al lanzar. Después, todo es suyo.', 'Un recorrido por el sitio, una guía práctica y 30 días de arreglos y pequeños ajustes.'] },
];

export const care = [
  { name: 'Cambios y arreglos', price: '$50 cada uno', text: 'Cada cambio incluye hasta unos 30 minutos de ediciones, enviadas juntas en una sola solicitud. Listo en 2 días hábiles.' },
  { name: 'Páginas y funciones nuevas', price: '$125/hora, con presupuesto previo', text: 'Páginas nuevas, funciones nuevas o más colecciones para su CMS.' },
];

export const monthly = {
  name: 'Productora web mensual',
  price: 'Desde $650 al mes por 5 horas',
  text: 'Su propia productora web, sin tener que contratar a nadie. Su persona de marketing o de SEO marca el rumbo, y yo lo hago realidad en su sitio.',
  outcomes: ['Se mantiene rápido, seguro y funcionando', 'Recibe páginas nuevas para sus campañas, eventos y productos', 'Se mantiene al día con lo que la gente busca', 'Viene con un informe breve: qué cambió, qué logró y qué sigue'],
};

// Client quotes stay in their own words, in English.
export { testimonials } from './site';

export const aiOffers = [
  { id: 'workshop', group: 'consulting', icon: 'chat', title: 'Taller de IA para Equipos', price: '$750', text: 'Una sesión práctica de 90 minutos para hasta 10 personas. Su equipo practica ChatGPT, Claude o Gemini con trabajo real y se lleva una guía de una página.' },
  { id: 'review', group: 'prototype', icon: 'search', title: 'Revisión del Plan de Producción', price: '$650', text: 'Para proyectos de videojuegos, XR e interactivos. Reviso su alcance, sus hitos y sus riesgos, y le entrego un plan que su equipo pueda seguir, con sus herramientas de proyecto configuradas si las necesita. Unas 2 semanas.' },
  { id: 'ar-starter', group: 'prototype', icon: 'star', title: 'Proyecto AR Inicial', price: 'Desde $1,500', text: 'Una pieza pequeña de AR que se abre en el navegador del teléfono, sin descargar ninguna app: una tarjeta de presentación, un volante, un póster o un producto que cobra vida. Construida con un desarrollador colaborador cuando hace falta. 2–4 semanas.' },
  { id: 'production', group: 'production', icon: 'star', title: 'Apoyo de Producción', price: '$65/hora, o mensual desde $650', text: 'Ayuda de producción y gestión de proyectos para equipos de videojuegos, XR y experiencias inmersivas: planes, calendarios, documentos de diseño, pruebas de juego y mantener a todos alineados.' },
];
