import {
  ProposalCard,
  ProposalConcept,
  ProposalPageConfig,
  ProposalSection,
} from '../gabyrestobar/gabyrestobar.models';

const concepts: ProposalConcept[] = [
  {
    id: 'stage-1',
    type: 'stage',
    number: 1,
    title: 'Web pública, usuarios y catálogo de cursos',
    description:
      'Registro y login de usuarios, Panel de administracion de usuarios y cursos.',
    amount: 200,
    paid: 0,
    currency: 'USD',
    status: 'pending',
    optional: false,
  },
  {
    id: 'stage-2',
    type: 'stage',
    number: 2,
    title: 'Catálogo de cursos y Perfil de usuario',
    description:
      'Página de "Mi Perfil" donde podrá editar sus datos y llevar un registro de sus pagos',
    amount: 200,
    paid: 0,
    currency: 'USD',
    status: 'pending',
    optional: false,
  },
  {
    id: 'stage-3',
    type: 'stage',
    number: 3,
    title: 'Pasarela de pagos y Registro de Ventas',
    description:
      'Implementación de un sistema de compra de cursos individuales, integración transparente con Mercado Pago, acreditación automática de pagos y registro de ventas para el administrador de la web.',
    amount: 115,
    paid: 0,
    currency: 'USD',
    status: 'pending',
    optional: false,
  },
  {
    id: 'opt-progress',
    type: 'stage',
    number: 4,
    title: 'Progreso de cursos',
    description:
      'Registro de clases vistas, porcentaje de avance, última clase visualizada, indicador de progreso y botón "Continuar curso".',
    amount: 80,
    paid: 0,
    currency: 'USD',
    status: 'optional',
    optional: true,
  },
  {
    id: 'opt-stats',
    type: 'stage',
    number: 5,
    title: 'Estadísticas avanzadas',
    description:
      'Ventas por período, cursos más vendidos, cantidad de alumnos activos, visualizaciones/progreso y analítica general de la plataforma.',
    amount: 200,
    paid: 0,
    currency: 'USD',
    status: 'optional',
    optional: true,
  },
  {
    id: 'opt-cart',
    type: 'stage',
    number: 6,
    title: 'Carrito de compras',
    description:
      'Selección de múltiples cursos simultáneos, vista de carrito con subtotal y compra combinada en un único pago por Mercado Pago.',
    amount: 35,
    paid: 0,
    currency: 'USD',
    status: 'optional',
    optional: true,
  },
  {
    id: 'domain',
    type: 'service',
    title: 'Dominio anual (.com / .com.ar)',
    description:
      'Registro o renovación anual de nombre personalizado. Aprox. USD 11 al año.',
    amount: 11,
    paid: 0,
    currency: 'USD',
    status: 'optional',
    optional: true,
  },
  {
    id: 'server',
    type: 'service',
    title: 'Hosting y Servidor anual',
    description:
      'Alojamiento en la nube para aplicación y base de datos (entre USD 80 y USD 140 al año).',
    amount: 80,
    paid: 0,
    currency: 'USD',
    status: 'optional',
    optional: false,
  },
];

const summaryCards: ProposalCard[] = [
  {
    icon: 'layers-outline',
    title: '3 etapas entregables',
    description: 'Web pública, perfil del alumno y pasarela de cobros Mercado Pago',
    badges: [{ label: 'USD 515 total', status: 'pending' }],
  },
  {
    icon: 'rocket-outline',
    title: 'Módulos opcionales',
    description: 'Progreso de cursos, Estadísticas y Carrito de compras',
    badges: [{ label: 'USD 315 total (3 opcionales)', status: 'optional' }],
  },
  {
    icon: 'globe-outline',
    title: 'Dominio propio',
    description: 'Registro anual de nombre personalizado (.com / .com.ar)',
    badges: [{ label: 'USD 11 aprox. / año', status: 'optional' }],
  },
  {
    icon: 'server-outline',
    title: 'Hosting anual',
    description: 'Servidor de alojamiento web y base de datos',
    badges: [{ label: 'USD 80 a 140 / año', status: 'optional' }],
  },
];

const sections: ProposalSection[] = [
  {
    eyebrow: 'Plan de entregas escalonado',
    title: 'Las 3 etapas para la plataforma 100% funcional',
    columns: 3,
    cards: [
      {
        icon: 'globe-outline',
        title: 'Etapa 1 · Web pública, usuarios y cursos',
        description:
          'Primera entrega: Sitio web público, registro e inicio de sesión de usuarios, y panel de administración para gestionar usuarios y cursos.',
        badges: [
          { label: 'USD 200', status: 'pending' },
          { label: 'Entrega 1', status: 'paid' },
        ],
      },
      {
        icon: 'person-outline',
        title: 'Etapa 2 · Catálogo y Perfil de usuario',
        description:
          'Segunda entrega: Catálogo interactivo de cursos y página de "Mi Perfil" donde el alumno podrá editar sus datos personales y llevar un registro de sus pagos.',
        badges: [
          { label: 'USD 200', status: 'pending' },
          { label: 'Entrega 2', status: 'paid' },
        ],
      },
      {
        icon: 'card-outline',
        title: 'Etapa 3 · Pagos y Registro de Ventas',
        description:
          'Tercera entrega: Sistema de compra de cursos individuales, integración con Mercado Pago, acreditación automática de pagos y registro de ventas para el administrador.',
        badges: [
          { label: 'USD 115', status: 'pending' },
          { label: '100% Funcional', status: 'paid' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Objetivo y flujo del sistema',
    title: 'Circuito operativo de la plataforma',
    columns: 2,
    cards: [
      {
        icon: 'storefront-outline',
        title: 'Catálogo y compra directa',
        description:
          'El alumno explora los cursos disponibles con su información y precios, y realiza el pago de manera ágil y segura a través de Mercado Pago.',
      },
      {
        icon: 'person-circle-outline',
        title: 'Perfil y registro de pagos',
        description:
          'Espacio personal donde el alumno gestiona sus datos de cuenta y consulta el comprobante e historial de sus compras realizadas.',
      },
      {
        icon: 'options-outline',
        title: 'Administración de cursos y usuarios',
        description:
          'Panel intuitivo para que el administrador cree, organice y actualice los cursos, y supervise la base de usuarios registrados.',
      },
      {
        icon: 'shield-checkmark-outline',
        title: 'Control de ventas acreditadas',
        description:
          'Registro contable centralizado de transacciones con acreditación automática, montos, fechas y estados para el administrador.',
      },
    ],
  },
  {
    eyebrow: 'Estructura funcional',
    title: 'Módulos incluidos en la plataforma base (USD 515)',
    columns: 3,
    cards: [
      {
        icon: 'globe-outline',
        title: '1. Web pública',
        description:
          'Página principal institucional y comercial, presentación de la marca y diseño responsive adaptado a celulares, tablets y PC.',
        badges: [{ label: 'Etapa 1', status: 'pending' }],
      },
      {
        icon: 'person-add-outline',
        title: '2. Usuarios y autenticación',
        description:
          'Registro de alumnos, inicio de sesión seguro, gestión de cuentas y control de accesos privados.',
        badges: [{ label: 'Etapa 1', status: 'pending' }],
      },
      {
        icon: 'albums-outline',
        title: '3. Panel de gestión de cursos',
        description:
          'Administración de cursos: creación, edición, descripciones, portadas, precios y activación o pausa de cursos.',
        badges: [{ label: 'Etapa 1', status: 'pending' }],
      },
      {
        icon: 'book-outline',
        title: '4. Catálogo de cursos',
        description:
          'Visualización estructurada de los cursos ofrecidos con temarios, detalles y precios para los visitantes y alumnos.',
        badges: [{ label: 'Etapa 2', status: 'pending' }],
      },
      {
        icon: 'id-card-outline',
        title: '5. Mi Perfil y registro de pagos',
        description:
          'Área de usuario donde cada alumno puede editar sus datos personales y llevar un registro detallado de sus pagos.',
        badges: [{ label: 'Etapa 2', status: 'pending' }],
      },
      {
        icon: 'card-outline',
        title: '6. Pasarela Mercado Pago',
        description:
          'Integración para la compra de cursos individuales con acreditación automática del cobro mediante Webhooks.',
        badges: [{ label: 'Etapa 3', status: 'pending' }],
      },
      {
        icon: 'receipt-outline',
        title: '7. Registro de ventas',
        description:
          'Panel con el historial de compras realizadas, importes, fechas y estados de cobro para el administrador.',
        badges: [{ label: 'Etapa 3', status: 'pending' }],
      },
    ],
  },
  {
    eyebrow: 'Funcionalidades adicionales',
    title: 'Módulos opcionales bajo demanda (USD 315)',
    columns: 3,
    cards: [
      {
        icon: 'trending-up-outline',
        title: 'Progreso de cursos',
        description:
          'Registro de clases vistas, porcentaje de avance, última clase visualizada, indicador de progreso y botón "Continuar curso".',
        badges: [{ label: 'USD 80', status: 'optional' }],
      },
      {
        icon: 'bar-chart-outline',
        title: 'Estadísticas avanzadas',
        description:
          'Reportes de ventas por período, cursos más vendidos, cantidad de alumnos activos, visualizaciones/progreso y analítica general de la plataforma.',
        badges: [{ label: 'USD 200', status: 'optional' }],
      },
      {
        icon: 'cart-outline',
        title: 'Carrito de compras',
        description:
          'Selección de múltiples cursos simultáneos, vista de carrito con subtotal y compra combinada en un único pago por Mercado Pago.',
        badges: [{ label: 'USD 35', status: 'optional' }],
      },
    ],
  },
  {
    eyebrow: 'Infraestructura y servicios externos',
    title: 'Servicios de terceros y mantenimiento anual',
    columns: 3,
    cards: [
      {
        icon: 'globe-outline',
        title: 'Dominio propio',
        description:
          'Registro o renovación anual del dominio personalizado (.com o .com.ar). Costo de referencia: USD 11 aproximadamente al año, abonado directamente por la clienta.',
        badges: [{ label: 'USD 11 / año aprox.', status: 'optional' }],
      },
      {
        icon: 'server-outline',
        title: 'Hosting y Servidor',
        description:
          'Alojamiento en la nube para la aplicación web y base de datos. Costo estimado según proveedor y consumo: entre USD 80 y USD 140 al año (a cargo de la clienta).',
        badges: [{ label: 'USD 80 a 140 / año', status: 'optional' }],
      },
      {
        icon: 'card-outline',
        title: 'Mercado Pago',
        description:
          'Comisiones por cobro electrónico de Mercado Pago según las tarifas vigentes y los plazos de acreditación elegidos por la clienta.',
        badges: [{ label: 'Comisión por cobro', status: 'optional' }],
      },
    ],
  },
];

export const CURSOS_ONLINE_CONFIG: ProposalPageConfig = {
  browserTitle: 'Plataforma de Cursos Online | Propuesta de desarrollo',
  eyebrow: 'E-learning · Venta de cursos · Mercado Pago',
  title: 'Cursos',
  highlightedTitle: 'Online',
  lead: 'Propuesta integral dividida en 3 etapas entregables (USD 515) para el diseño, desarrollo y puesta en marcha de una plataforma propia de cursos online.',
  heroImage:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85',
  progress: 0,
  progressDescription:
    'Propuesta presentada. Dividida en 3 entregables sucesivos (USD 515) hasta alcanzar el 100% funcional.',
  progressMeta: [
    { icon: 'layers-outline', label: '3 etapas (USD 515)' },
    { icon: 'globe-outline', label: 'Dominio ~USD 11/año' },
    { icon: 'server-outline', label: 'Hosting USD 80-140/año' },
  ],
  summaryCards,
  concepts,
  timelineConcepts: concepts,
  sections,
  footerTitle: 'Plataforma de Cursos Online',
  footerDescription: 'Propuesta de arquitectura y desarrollo web',
};
