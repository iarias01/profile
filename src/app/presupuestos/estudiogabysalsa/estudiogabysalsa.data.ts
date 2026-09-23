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
    title: 'Gestión de comunidad',
    description:
      'Registro de alumnos, profesores, empleados, proveedores, clases y eventos.',
    amount: 420000,
    paid: 420000,
    currency: 'ARS',
    status: 'paid',
    optional: false,
  },
  {
    id: 'stage-2',
    type: 'stage',
    number: 2,
    title: 'Control del estudio',
    description:
      'Consumibles, promociones, stock, ingresos, egresos, alquileres de salones y carta.',
    amount: 580000,
    paid: 580000,
    currency: 'ARS',
    status: 'paid',
    optional: false,
  },
  {
    id: 'stage-3',
    type: 'stage',
    number: 3,
    title: 'Packs y finanzas',
    description:
      'Packs de clases, clase gratis, balances, asistencias y alertas del sistema.',
    amount: 400000,
    paid: 400000,
    currency: 'ARS',
    status: 'paid',
    optional: false,
  },
  {
    id: 'stage-4',
    type: 'stage',
    number: 4,
    title: 'Calendario de clases',
    description:
      'Calendario visual para organizar clases, horarios y espacios.',
    amount: 60000,
    paid: 0,
    currency: 'ARS',
    status: 'optional',
    optional: true,
  },
  {
    id: 'stage-5',
    type: 'stage',
    number: 5,
    title: 'Sistema de pedidos',
    description: 'Sistema de pedidos para barra y cocina.',
    amount: 250000,
    paid: 0,
    currency: 'ARS',
    status: 'optional',
    optional: true,
  },
  {
    id: 'stage-6',
    type: 'stage',
    number: 6,
    title: 'Web pública',
    description: 'Sitio público para alumnos, eventos y visitantes.',
    amount: 50000,
    paid: 0,
    currency: 'ARS',
    status: 'optional',
    optional: true,
  },
  {
    id: 'domain',
    type: 'service',
    title: 'Dominio',
    description: 'gabysalsaclub.com',
    amount: 11,
    paid: 0,
    currency: 'USD',
    status: 'paid',
    optional: false,
  },
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
];

const summaryCards: ProposalCard[] = [
  {
    icon: 'checkmark-circle-outline',
    title: 'Etapas 1 y 2 entregadas',
    description: 'Gestión de comunidad y control del estudio',
    badges: [{ label: 'Pagado 100%', status: 'paid' }],
  },
  {
    icon: 'construct-outline',
    title: 'Etapa 3 en desarrollo',
    description: 'Packs de clases y finanzas',
    badges: [{ label: 'Pagado 100%', status: 'paid' }],
  },
  {
    icon: 'server-outline',
    title: 'Servidor',
    description: 'Configuración y primer año',
    badges: [{ label: 'Pendiente de pago', status: 'pending' }],
  },
  {
    icon: 'rocket-outline',
    title: '3 módulos opcionales',
    description: 'Calendario, pedidos para barra y cocina, y web pública',
  },
];

const sections: ProposalSection[] = [
  {
    eyebrow: 'Dos experiencias',
    title: 'Cómo vas a usar el sistema',
    columns: 2,
    cards: [
      {
        icon: 'speedometer-outline',
        title: 'Panel de administración',
        description:
          'Panel privado para reportes, clases, profesores, configuración de precios y cierres de caja.',
      },
      {
        icon: 'desktop-outline',
        title: 'Pantalla operativa',
        description:
          'Recepción y barra para registrar asistencias, ventas, pedidos y cobros.',
      },
    ],
  },
  {
    eyebrow: 'Arquitectura funcional',
    title: 'Los pilares del sistema',
    columns: 3,
    cards: [
      {
        icon: 'people-outline',
        title: 'Gestión de comunidad',
        description: 'Registro de alumnos, profesores, empleados y contactos.',
      },
      {
        icon: 'school-outline',
        title: 'Gestión del estudio',
        description: 'Clases, cuotas, packs, horarios y asistencia.',
      },
      {
        icon: 'sparkles-outline',
        title: 'Eventos y talleres',
        description: 'Entradas, invitados y control de acceso.',
      },
      {
        icon: 'calendar-outline',
        title: 'Agenda de espacios',
        description: 'Calendario visual y reservas de salones.',
      },
      {
        icon: 'cafe-outline',
        title: 'Gestión del resto bar',
        description: 'Stock, consumibles, ventas y alertas.',
      },
      {
        icon: 'wallet-outline',
        title: 'Tesorería y finanzas',
        description: 'Ingresos, egresos, proveedores y balances.',
      },
    ],
  },
  {
    eyebrow: 'Información accionable',
    title: 'Estadísticas y reportes',
    columns: 3,
    cards: [
      {
        icon: 'pulse-outline',
        title: 'Termómetro de alumnos',
        description: 'Seguimiento de alumnos, edades promedio y actividad.',
      },
      {
        icon: 'trophy-outline',
        title: 'Rendimiento',
        description: 'Ranking de clases, eventos y talleres.',
      },
      {
        icon: 'bar-chart-outline',
        title: 'Balance real',
        description: 'Análisis financiero completo del estudio.',
      },
    ],
  },
  {
    eyebrow: 'Infraestructura',
    title: 'Mantenimiento anual',
    columns: 2,
    cards: [
      {
        icon: 'globe-outline',
        title: 'Dominio',
        description:
          'gabysalsaclub.com · renovación aproximada de USD 11 al año.',
        badges: [{ label: 'Pagado 100%', status: 'paid' }],
      },
      {
        icon: 'server-outline',
        title: 'Servidor',
        description:
          'Configuración inicial y primer año de alojamiento: $80.000.',
        badges: [{ label: 'Pendiente de pago', status: 'pending' }],
      },
    ],
  },
];

export const ESTUDIO_GABY_SALSA_CONFIG: ProposalPageConfig = {
  browserTitle: 'Gaby Salsa Club | Propuesta de desarrollo',
  eyebrow: 'Academia · eventos · administración · resto bar',
  title: 'Gaby Salsa',
  highlightedTitle: 'Club',
  lead: 'Una plataforma integral para gestionar la comunidad, las clases, los eventos, la administración y la operación del resto bar.',
  heroImage:
    'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1800&q=85',
  progress: 60,
  progressDescription: 'Etapas 1 y 2 entregadas. Etapa 3 en desarrollo.',
  progressMeta: [
    { icon: 'layers-outline', label: '6 etapas' },
    { icon: 'people-outline', label: 'Comunidad activa' },
  ],
  summaryCards,
  concepts,
  timelineConcepts: concepts.filter((concept) => concept.type === 'stage'),
  sections,
  footerTitle: 'Gaby Salsa Club',
  footerDescription: 'Propuesta de plataforma integral',
};
