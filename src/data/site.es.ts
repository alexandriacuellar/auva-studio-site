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
  {
    href: '/es/websites/', label: 'Sitios web', menuLabel: 'Páginas de sitios web',
    children: [
      { href: '/es/websites/', label: 'Paquetes de sitios web' },
      { href: '/es/websites/diagnostic/', label: 'Diagnóstico Web' },
      { href: '/es/websites/google-business-profile/', label: 'Perfil de Negocio de Google' },
      { href: '/es/websites/help-after-launch/', label: 'Ayuda después del lanzamiento' },
      { href: '/es/websites/brand-essentials/', label: 'Identidad de Marca' },
    ],
  },
  {
    href: '/es/automation-ai-projects/',
    label: 'Automatización e IA',
    // Full name for search data; the menu shows the short label so the header stays on one row.
    title: 'Automatización, IA y Proyectos',
    menuLabel: 'Páginas de automatización, IA y proyectos',
    children: [
      { href: '/es/automation-ai-projects/', label: 'Resumen y Revisión Tecnológica' },
      { href: '/es/automation-ai-projects/automation/', label: 'Automatización' },
      { href: '/es/automation-ai-projects/ai/', label: 'IA para usted y su equipo' },
      { href: '/es/automation-ai-projects/project-management/', label: 'Gestión de proyectos' },
    ],
  },
  {
    href: '/es/ar-vr-production/',
    label: 'AR, VR y Producción',
    menuLabel: 'Páginas de producción y tecnología emergente',
    children: [
      { href: '/es/ar-vr-production/', label: 'Resumen' },
      { href: '/es/ar-vr-production/ar/', label: 'Paquetes de AR' },
      { href: '/es/ar-vr-production/studios/', label: 'Producción de videojuegos y XR' },
    ],
  },
  { href: '/es/about/', label: 'Sobre mí' },
];

export const categories = [
  {
    icon: 'globe',
    title: 'Servicios de sitios web',
    text: 'Sitios web que ayudan a sus clientes a encontrarle, confiar en usted y comunicarse.',
    offers: [['Paquetes de sitios web', 'Desde $1,500'], ['Diagnóstico Web', '$199'], ['Configuración del Perfil de Negocio de Google', '$500'], ['Ayuda después del lanzamiento', 'Desde $59']],
    note: 'Además, edición de contenido, tiendas e integraciones.',
    href: '/es/websites/',
    cta: 'Ver servicios de sitios web',
  },
  {
    icon: 'bulb',
    title: 'Automatización, IA y Proyectos',
    text: 'Automatice el trabajo repetitivo, ponga la IA a trabajar de forma segura y mantenga sus proyectos en marcha.',
    offers: [['Automatización', '$500 por flujo de trabajo'], ['IA para usted y su equipo', 'Desde $150'], ['Gestión de proyectos', 'Desde $400']],
    href: '/es/automation-ai-projects/',
    cta: 'Ver Automatización, IA y Proyectos',
  },
  {
    icon: 'bolt',
    title: 'AR, VR y Producción',
    text: 'Realidad aumentada (AR) que da vida a sus productos, menús y volantes en el celular, además de una productora para equipos de videojuegos y XR.',
    offers: [['Paquetes de AR', 'Desde $750'], ['Producción de videojuegos y XR', 'Desde $650']],
    note: 'AR y VR para teléfonos, Meta Quest y lentes de Meta.',
    href: '/es/ar-vr-production/',
    cta: 'Ver AR, VR y Producción',
  },
];




export const samples = [
  { package: 'Presencia Esencial', slug: 'skytop-floor-co', name: 'Skytop Floor Co.', text: 'Un sitio de una sola página para una empresa de pisos de madera, con servicios, fotos de antes y después, y un formulario para pedir un presupuesto gratis.', goodFor: 'Ideal para oficios y servicios para el hogar, como contratistas, limpieza, jardinería y talleres de reparación.' },
  { package: 'Presencia Ampliada', slug: 'enea-hudson-cattle-farm', name: 'Enea Hudson Cattle Farm', text: 'Un sitio de 10 páginas para una granja familiar de ganado, con animales a la venta, una guía de compra y un formulario de consultas.', goodFor: 'Ideal para granjas, posadas, viñedos y negocios con varios servicios o experiencias que mostrar.' },
  { package: 'Presencia Completa', slug: 'rondout-mercantile', name: 'Rondout Mercantile', text: 'Un sitio más grande para una tienda en Kingston, con un CMS, talleres, citas para pruebas de ropa (como servicio adicional) y una lista para apartar productos nuevos.', goodFor: 'Ideal para tiendas, estudios y organizaciones que publican productos, eventos o noticias con frecuencia.' },
];

// Lo que incluyen todos los paquetes; se muestra una vez sobre las tarjetas.
export const packageBasics = [
  'Una llamada de planificación y un plan de contenido',
  'Pulo sus textos y completo lo que falte',
  'Diseño a la medida de su negocio, pensado primero para el celular',
  'Un formulario de contacto y un mapa para encontrarle',
  'Preparado para Google y las búsquedas con IA: títulos de página, datos de su negocio y un mapa del sitio',
  'Orientación sobre su Perfil de Negocio de Google, cuando aplique',
];

export const packages = [
  {
    id: 'essential',
    short: 'Esencial',
    eyebrow: 'Para empezar',
    name: 'Presencia Esencial',
    price: '$1,500',
    blurb: 'Una presencia profesional en internet que ayuda a sus clientes a encontrarle, confiar en usted y contactarle.',
    specs: [['Páginas', 'De 1 a 5'], ['Diseños de página', '2'], ['Rondas de cambios', '2'], ['Estadísticas', 'Básicas'], ['CMS', 'Desde $1,750'], ['Revisión a los 30 días', null]],
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
    specs: [['Páginas', 'Hasta 10'], ['Diseños de página', 'Hasta 3'], ['Rondas de cambios', '3'], ['Estadísticas', 'Llamadas por página'], ['CMS', 'Desde $1,750'], ['Revisión a los 30 días', null]],
    timeline: '3–5 semanas',
  },
  {
    id: 'complete',
    short: 'Completa',
    eyebrow: 'Para ir más lejos',
    name: 'Presencia Completa',
    price: '$5,500',
    blurb: 'Para negocios en crecimiento que quieren actualizar su sitio por su cuenta.',
    specs: [['Páginas', 'Hasta 20'], ['Diseños de página', 'Hasta 6'], ['Rondas de cambios', '4'], ['Estadísticas', 'Llamadas por página'], ['CMS', 'Incluido'], ['Revisión a los 30 días', 'Incluida']],
    timeline: '6+ semanas',
  },
];

export const comparison = {
  benefits: [
    { icon: 'bolt', title: 'Carga casi al instante', text: 'Sus páginas se abren al instante en cualquier celular, y sus visitantes se quedan. Le muestro su puntuación de velocidad de Google antes y después.' },
    { icon: 'search', title: 'Hecho para aparecer en Google y en búsquedas con IA', text: 'Los datos que buscan Google y las herramientas de búsqueda con IA, incluidos. No son un extra que se paga después.' },
    { icon: 'cloud', title: 'Hosting gratis o de bajo costo', text: 'Gratis, o unos pocos dólares al mes si su sitio tiene mucho tráfico. Su dominio cuesta unos $20 al año.' },
    { icon: 'check', title: 'Fácil de usar para todos', text: 'Una prueba de accesibilidad antes de cada lanzamiento, para lectores de pantalla, teclado y letra más grande.' },
    { icon: 'key', title: 'Es suyo, sin ataduras', text: 'Código, contenido, dominio y hosting a su nombre. Sin ataduras.' },
  ],
};

export const addons = [
  { id: 'cms', icon: 'gear', title: 'CMS (sistema de gestión de contenidos)', text: 'Un panel sencillo para actualizar usted mismo los textos, las fotos, las noticias y los eventos de sus páginas. Sin programar.', price: 'Desde $1,750' },
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
  { name: 'Cambios y arreglos', price: '$59 cada uno', text: 'Cada cambio incluye hasta unos 30 minutos de ediciones, enviadas juntas en una sola solicitud. Listo en 2 días hábiles. O compre 5 por adelantado por $249, válidos por 12 meses.' },
  { name: 'Páginas y funciones nuevas', price: '$125/hora, con presupuesto previo', text: 'Páginas nuevas, funciones nuevas o más colecciones para su CMS.' },
];

export const hourPacks = [
  { name: 'Paquete de 5 horas', price: '$575', hours: '5 horas', text: '5 horas para cambios, secciones nuevas, páginas nuevas sencillas con sus diseños de página actuales, agregar formularios, mapas, videos o enlaces de reservas, y ayuda con su CMS. Válidas por 12 meses. Listo en 2 días hábiles.' },
  { name: 'Paquete de 10 horas', price: '$1,100', hours: '10 horas', text: '10 horas para cambios, secciones nuevas, páginas nuevas sencillas con sus diseños de página actuales, agregar formularios, mapas, videos o enlaces de reservas, y ayuda con su CMS. Válidas por 12 meses. Listo en 2 días hábiles.' },
];

export const monthly = {
  name: 'Retainer mensual para su sitio web',
  price: 'Desde $125 al mes por 1 hora, o $575 por 5 horas',
  text: 'Su propia desarrolladora web, sin tener que contratar a nadie. ¿Trabaja con alguien de marketing o de SEO? Esa persona marca el rumbo, y yo lo hago realidad en su sitio.',
  outcomes: ['Una llamada mensual para planear', 'Páginas nuevas para sus campañas, eventos y productos', 'Una revisión mensual del sitio y de su salud en Google', 'Un informe breve: qué cambió, qué logró y qué sigue'],
};

// Client quotes stay in their own words, in English.
export { testimonials } from './site';

export const aiOffers = [
  { id: 'review', group: 'prototype', icon: 'search', title: 'Revisión del Plan de Producción', price: '$650', text: 'Para proyectos de videojuegos, XR e interactivos. Reviso su alcance, sus hitos y sus riesgos, y le entrego un plan que su equipo pueda seguir, con sus herramientas de proyecto configuradas si las necesita. Unas 2 semanas.' },
  { id: 'ar-card', group: 'ar', icon: 'star', title: 'Tarjeta o Volante con AR', price: 'Desde $750', text: 'Una tarjeta, un volante o un letrero que cobra vida cuando alguien lo apunta con el teléfono.', items: ['Una pieza impresa', 'Un video corto o un objeto 3D', 'Botones para reservar, llamar o visitar su sitio'] },
  { id: 'ar-menu', group: 'ar', icon: 'book', title: 'Menú o Empaque con AR', price: 'Desde $1,000', text: 'Un menú, una etiqueta o una caja que muestra un plato en 3D, cómo se hace algo o un saludo del dueño.', items: ['Un menú, una etiqueta o una caja', 'Hasta 3 artículos en 3D o video', 'Un código impreso que lo abre'] },
  { id: 'ar-product', group: 'ar', icon: 'layers', title: 'Vista de Producto con AR', price: 'Desde $1,500', text: 'Sus clientes colocan sus productos en su sala, o se los prueban, directo desde su sitio web.', items: ['Hasta 5 productos en 3D', 'Véalo en su espacio o pruébeselo', 'Agregado a las páginas de producto de su sitio'] },
  { id: 'ar-project', group: 'ar', icon: 'compass', title: 'Visor de Proyectos con AR', price: 'Desde $1,500', text: 'Para arquitectos y constructores: su modelo 3D en el teléfono, sobre la mesa de reuniones o a tamaño real en el terreno.', items: ['Usa el modelo que ya tiene', 'Vista sobre la mesa o a tamaño real', 'Un enlace que puede enviar a sus clientes'] },
  { id: 'production', group: 'production', icon: 'star', title: 'Apoyo de Producción', price: '$65/hora, o mensual desde $650', text: 'Ayuda de producción y gestión de proyectos para equipos de videojuegos, XR y experiencias inmersivas: planes, calendarios, documentos de diseño, pruebas de juego y mantener a todos alineados.' },
];
