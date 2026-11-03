// Automatización, IA y Proyectos: página principal + 3 subpáginas (versión en español de tech.ts).
export const sectionName = 'Automatización, IA y Proyectos';
export const base = '/es/automation-ai-projects';

export const services = [
  { id: 'automation', icon: 'gear', title: 'Automatización', price: '$500 por flujo de trabajo', text: 'Trabajo de rutina que se hace solo, como seguimientos, solicitudes de reseñas y bienvenida a clientes.', href: `${base}/automation/`, link: 'Vea automatización' },
  { id: 'ai', icon: 'bulb', title: 'IA para usted y su equipo', price: 'Desde $150', text: 'Ayuda práctica para usar ChatGPT, Claude o Gemini en su trabajo real, de forma segura.', href: `${base}/ai/`, link: 'Vea ayuda con IA' },
  { id: 'pm', icon: 'compass', title: 'Gestión de proyectos', price: 'Desde $400', text: 'Saque sus proyectos del correo y las hojas de cálculo, con alguien que los mantenga en marcha.', href: `${base}/project-management/`, link: 'Vea gestión de proyectos' },
];

export const audiences = [
  { icon: 'globe', title: 'Tiendas, restaurantes y servicios locales', text: 'Se pierden consultas, nunca se piden reseñas y hay que perseguir las facturas.', to: 'automation' },
  { icon: 'book', title: 'Organizaciones sin fines de lucro', text: 'Un equipo pequeño que hace las mismas tareas dos veces, con un presupuesto ajustado.', to: 'automation' },
  { icon: 'key', title: 'Startups', text: 'Un primer producto, sistemas nuevos y un proyecto que necesita a alguien que lo mantenga en marcha.', to: 'pm' },
  { icon: 'chart', title: 'Oficinas y equipos en crecimiento', text: 'Más personas y más proyectos, con el trabajo repartido entre correo, chats y hojas de cálculo.', to: 'pm' },
  { icon: 'bulb', title: 'Equipos con curiosidad por la IA', text: 'Sabe que la IA podría ayudar, pero no por dónde empezar ni qué es seguro compartir.', to: 'ai' },
];

export const safety = [
  { icon: 'key', title: 'Sus cuentas, sus datos', text: 'Todo se crea en cuentas suyas. Usted me agrega como usuaria y me quita cuando termina el trabajo.' },
  { icon: 'shield', title: 'Usted aprueba cada mensaje', text: 'Nada le llega a un cliente hasta que usted lee y aprueba el texto.' },
  { icon: 'book', title: 'Una guía para cada una', text: 'Pasos sencillos para pausarla, cambiarla o apagarla, para que nunca se quede atascado.' },
  { icon: 'wrench', title: '30 días de arreglos', text: 'Si algo falla en los primeros 30 días, lo arreglo sin costo.' },
];

export const automationExamples = [
  { icon: 'mail', title: 'Seguimiento de consultas', text: 'Cada consulta de su sitio web recibe una respuesta inmediata y queda en una sola lista, con un aviso para usted si nadie responde en 2 días.' },
  { icon: 'star', title: 'Solicitudes de reseñas', text: 'Después de un trabajo o una visita, un agradecimiento con el enlace a sus reseñas de Google y un recordatorio amable.' },
  { icon: 'gear', title: 'La suya', text: 'Bienvenida a clientes, un informe mensual u otra tarea que su equipo hace a mano.' },
];

export const aiPackages = [
  { icon: 'bulb', title: 'Sesión de IA 1 a 1', price: '$150', text: 'Para dueños y profesionales independientes. 90 minutos, solo usted y yo, trabajando en sus propias tareas con la herramienta de IA que elija.', items: ['Configurada de forma segura en su cuenta', 'Práctica con su trabajo real', 'Sus instrucciones guardadas para quedarse'], link: 'Pregunte por esto', topic: 'ai-session' },
  { icon: 'chat', title: 'Taller de IA para Equipos', price: 'Muy pronto', text: 'El mismo enfoque práctico para hasta 10 personas, con cuentas configuradas de forma segura, instrucciones guardadas y reglas de IA de una página para su equipo.', items: ['Práctica con tareas reales en grupo', 'Qué es seguro compartir y qué no', 'Una guía de una página para quedarse'], link: 'Apúntese primero en la lista', topic: 'workshop' },
];

export const aiTasks = [
  { icon: 'mail', title: 'Responder correos de clientes más rápido', text: 'Borradores de respuestas a preguntas comunes, que usted revisa y envía.' },
  { icon: 'book', title: 'Escribir anuncios de empleo y descripciones', text: 'Convierta unas notas en un primer borrador claro.' },
  { icon: 'clock', title: 'Convertir reuniones en tareas', text: 'Resúmenes y próximos pasos, sin volver a escribir sus notas.' },
  { icon: 'chat', title: 'Redactar publicaciones y boletines', text: 'Una semana de ideas y borradores con su propia voz.' },
  { icon: 'search', title: 'Encontrar respuestas en sus documentos', text: 'Pregúntele algo a su manual, sus políticas o su lista de precios.' },
  { icon: 'layers', title: 'Primeros borradores de cotizaciones y propuestas', text: 'Empiece con un borrador en vez de una página en blanco.' },
];

export const pmPackages = [
  { icon: 'layers', title: 'Configuración de espacio de proyectos', price: 'Desde $400', topic: 'workspace', text: 'Saque el trabajo del correo y las hojas de cálculo y póngalo en una sola herramienta, como Asana, ClickUp, monday.com, Notion o Trello. Usted elige la herramienta, o yo le recomiendo una. Más tableros o más proyectos por pasar se cotizan, normalmente de $750 a $1,500.', items: ['1 tablero con sus etapas', 'Hasta 3 plantillas para el trabajo que se repite', 'Hasta 5 proyectos actuales pasados a la herramienta', 'Una capacitación de 1 hora para su equipo y 30 días de preguntas'] },
  { icon: 'check', title: 'Plan de Arranque de Proyecto', price: '$650', topic: 'kickoff', text: 'Antes de empezar un proyecto: alcance, calendario, responsables y riesgos claros, listos para llevar a su herramienta.', items: ['Hasta 2 sesiones de planificación con su equipo', 'Alcance e hitos por escrito', 'Quién hace qué, y cuándo', 'Plan escrito en 5 días hábiles', 'Una lista de tareas que se importa en Asana, ClickUp, monday.com, Notion y la mayoría de las herramientas', 'Se abona a su primer mes de gestión de proyectos'] },
  { icon: 'compass', title: 'Gestión de proyectos mensual', price: 'Desde $650 al mes', topic: 'delivery', text: 'Alguien que mantenga su proyecto en marcha, dirija las reuniones de seguimiento y coordine a los proveedores, sin contratar a tiempo completo.', items: ['10 h $650, 20 h $1,200, 40 h $2,200', 'Un breve informe escrito cada semana', 'Mínimo de 3 meses'] },
];

export const faq = {
  review: { q: '¿Qué incluye la Revisión Tecnológica?', a: 'Una llamada de 60 minutos y luego un informe escrito en 5 días hábiles con sus principales arreglos en orden y costos aproximados. Los $250 se abonan a cualquier paquete conmigo que empiece dentro de 90 días.' },
  inPerson: { q: '¿Trabaja en persona?', a: 'Sí, desde la ciudad de Nueva York y Westchester hasta Albany, aunque la mayor parte del trabajo es a distancia. El tiempo en sus instalaciones cuesta $65 por hora, y cualquier viaje fuera del Mid-Hudson Valley se acuerda por escrito antes de reservar.' },
  vendors: { q: '¿Puede trabajar con nuestros proveedores actuales o nuestro soporte de TI?', a: 'Sí. Muchas veces trabajo junto a equipos y proveedores existentes, y puedo ayudarle a revisar sus propuestas.' },
  needAi: { q: '¿Toda automatización usa IA?', a: 'No. La mayoría no la necesita. Uso IA solo donde ayuda, como para ordenar mensajes o redactar una respuesta que usted aprueba.' },
  appChanges: { q: '¿Qué pasa si una aplicación cambia y una automatización deja de funcionar?', a: 'Los arreglos son gratis durante 30 días. Después, un arreglo suele tomar menos de una hora a mi tarifa de $125 por hora, con cotización previa.' },
  tools: { q: '¿Qué herramientas usa?', a: 'Zapier o Make, conectadas a las aplicaciones que ya tiene, como Gmail, Google Sheets, el formulario de su sitio web y su herramienta de citas o facturación.' },
  skills: { q: '¿Necesito conocimientos técnicos?', a: 'No. Las sesiones están pensadas para personas sin perfil técnico, con herramientas como ChatGPT, Claude y Gemini en su trabajo real.' },
  aiSafe: { q: '¿Es seguro usar la IA con los datos de nuestro negocio?', a: 'Puede serlo, con cuentas de empresa y la configuración adecuada. Cada sesión de IA cubre qué es seguro compartir.' },
  chatbot: { q: '¿Puede poner un chatbot de IA en mi sitio web?', a: 'Sí. Es un complemento del sitio web, que se cotiza para su sitio.' },
  whichPm: { q: '¿Con cuál empiezo?', a: 'Si su equipo todavía no tiene una herramienta compartida, empiece con la configuración del espacio de proyectos. Si un proyecto grande está por empezar, empiece con el Plan de Arranque. Si el proyecto ya está en marcha y necesita a alguien que lo dirija, elija la gestión mensual.' },
};
