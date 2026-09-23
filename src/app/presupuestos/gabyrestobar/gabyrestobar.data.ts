import {
  ProposalCard,
  ProposalConcept,
  ProposalSection,
} from './gabyrestobar.models';

export const CONCEPTS: ProposalConcept[] = [
  {
    id: 'server',
    type: 'service',
    title: 'Servidor',
    description: 'Primer año de alojamiento y configuración.',
    amount: 80000,
    paid: 0,
    currency: 'ARS',
    status: 'pending',
    optional: false,
  },
  {
    id: 'stage-1',
    type: 'stage',
    number: 1,
    title: 'Módulo base',
    description: 'ABM de carta y carta online accesible mediante código QR.',
    amount: 170000,
    paid: 0,
    currency: 'ARS',
    status: 'pending',
    optional: false,
  },
  {
    id: 'stage-2',
    type: 'stage',
    number: 2,
    title: 'Pedidos',
    description: 'Pedidos desde el celular y recepción en tiempo real.',
    amount: 100000,
    paid: 0,
    currency: 'ARS',
    status: 'pending',
    optional: false,
  },
  {
    id: 'stage-3',
    type: 'stage',
    number: 3,
    title: 'Pagos',
    description: 'Integración con Mercado Pago.',
    amount: 30000,
    paid: 0,
    currency: 'ARS',
    status: 'optional',
    optional: true,
  },
  {
    id: 'stage-4',
    type: 'stage',
    number: 4,
    title: 'Finanzas',
    description: 'Balances diarios, mensuales y anuales.',
    amount: 100000,
    paid: 0,
    currency: 'ARS',
    status: 'optional',
    optional: true,
  },
  {
    id: 'stage-5',
    type: 'stage',
    number: 5,
    title: 'Mercadería',
    description: 'Control de stock de productos e ingredientes.',
    amount: 50000,
    paid: 0,
    currency: 'ARS',
    status: 'optional',
    optional: true,
  },
  {
    id: 'stage-6',
    type: 'stage',
    number: 6,
    title: 'Proveedores',
    description: 'ABM de proveedores, compras y contactos.',
    amount: 30000,
    paid: 0,
    currency: 'ARS',
    status: 'optional',
    optional: true,
  },
  {
    id: 'stage-7',
    type: 'stage',
    number: 7,
    title: 'Pedidos en pantalla',
    description: 'Vista para cocina o barra con estados operativos del pedido.',
    amount: 100000,
    paid: 0,
    currency: 'ARS',
    status: 'optional',
    optional: true,
  },
  {
    id: 'domain',
    type: 'service',
    title: 'Dominio',
    description: 'Nombre personalizado, con alternativa gratuita disponible.',
    amount: 11,
    paid: 0,
    currency: 'USD',
    status: 'optional',
    optional: true,
  },
];

export const SUMMARY_CARDS: ProposalCard[] = [
  {
    icon: 'cash-outline',
    title: 'Costos de desarrollo',
    badges: [
      { label: 'Base $350.000', status: 'paid' },
      { label: 'Opcionales $310.000', status: 'optional' },
    ],
  },
  {
    icon: 'hourglass-outline',
    title: 'Etapas 1 y 2 en espera',
    description: 'Módulo base y pedidos',
    badges: [{ label: 'Pendiente de aprobación', status: 'pending' }],
  },
  {
    icon: 'server-outline',
    title: 'Servidor',
    description: 'Configuración y primer año',
    badges: [{ label: 'Pendiente de aprobación', status: 'pending' }],
  },
  {
    icon: 'rocket-outline',
    title: '5 módulos opcionales',
    description: 'Pagos, finanzas, stock, proveedores y pantalla operativa',
  },
];

export const CONTENT_SECTIONS: ProposalSection[] = [
  {
    eyebrow: 'Infraestructura',
    title: 'Mantenimiento anual',
    columns: 2,
    cards: [
      {
        icon: 'globe-outline',
        title: 'Dominio',
        description:
          'Nombre personalizado · renovación aproximada de USD 11 al año.',
        badges: [{ label: 'Opcional', status: 'optional' }],
      },
      {
        icon: 'server-outline',
        title: 'Servidor',
        description:
          'Configuración inicial y primer año de alojamiento: $80.000.',
        badges: [{ label: 'Pendiente', status: 'pending' }],
      },
    ],
  },
  {
    eyebrow: 'Dos experiencias',
    title: 'Cómo vas a usar el sistema',
    columns: 2,
    cards: [
      {
        icon: 'speedometer-outline',
        title: 'Panel de administración',
        description:
          'Panel privado para gestionar carta, usuarios, stock, proveedores, finanzas y balances.',
      },
      {
        icon: 'desktop-outline',
        title: 'Pantalla operativa',
        description:
          'Recepción de pedidos en tiempo real, actualización de estados y gestión de cobros.',
      },
    ],
  },
  {
    eyebrow: 'Arquitectura funcional',
    title: 'Los pilares del sistema',
    columns: 3,
    cards: [
      {
        icon: 'restaurant-outline',
        title: 'Módulo base',
        description:
          'Login, usuarios, carta administrable y menú online accesible con QR.',
      },
      {
        icon: 'phone-portrait-outline',
        title: 'Pedidos online',
        description:
          'El cliente escanea el QR, arma su pedido y el local lo recibe al instante.',
      },
      {
        icon: 'card-outline',
        title: 'Pagos',
        description:
          'Integración con Mercado Pago para cobrar directamente desde la aplicación.',
        badges: [{ label: 'Opcional', status: 'optional' }],
      },
      {
        icon: 'cube-outline',
        title: 'Mercadería',
        description:
          'Control de stock de productos e ingredientes con una vista centralizada.',
        badges: [{ label: 'Opcional', status: 'optional' }],
      },
      {
        icon: 'trail-sign-outline',
        title: 'Proveedores',
        description:
          'Registro de proveedores, compras y contactos de abastecimiento.',
        badges: [{ label: 'Opcional', status: 'optional' }],
      },
      {
        icon: 'tv-outline',
        title: 'Pedidos en pantalla',
        description:
          'Panel para cocina o barra con pedidos pendientes, en preparación y entregados.',
        badges: [{ label: 'Opcional', status: 'optional' }],
      },
    ],
  },
  {
    eyebrow: 'Información accionable',
    title: 'Estadísticas y reportes',
    columns: 3,
    cards: [
      {
        icon: 'today-outline',
        title: 'Balance diario',
        description:
          'Resumen de ventas e ingresos para un cierre de caja claro y rápido.',
      },
      {
        icon: 'calendar-outline',
        title: 'Balance mensual',
        description:
          'Evolución mensual para detectar tendencias y tomar decisiones.',
      },
      {
        icon: 'bar-chart-outline',
        title: 'Balance anual',
        description:
          'Visión completa de ingresos, egresos y rentabilidad general.',
      },
    ],
  },
];
