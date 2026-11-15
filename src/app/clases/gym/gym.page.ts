import { AfterViewInit, Component, OnDestroy } from '@angular/core';

interface GymService {
  key: string;
  name: string;
  detail: string;
  icon: string;
}

interface Choice {
  key: string;
  name: string;
}

@Component({
  selector: 'app-gym',
  templateUrl: './gym.page.html',
  styleUrls: ['./gym.page.scss'],
  standalone: false,
})
export class GymPage implements AfterViewInit, OnDestroy {
  readonly services: GymService[] = [
    {
      key: 'presencial',
      name: 'Asesoramiento presencial',
      detail: 'Entrenamos juntos, corrijo técnica y ajusto cargas en el momento.',
      icon: 'body-outline',
    },
    {
      key: 'distancia',
      name: 'Asesoramiento a distancia',
      detail: 'Plan online con videollamadas, revisión de videos y chat.',
      icon: 'videocam-outline',
    },
    {
      key: 'rutinas',
      name: 'Rutinas personalizadas',
      detail: 'Planificación según tu objetivo, nivel y días disponibles.',
      icon: 'clipboard-outline',
    },
    {
      key: 'grupal',
      name: 'Entrenamiento grupal',
      detail: 'Funcional en grupo: más energía, mejor precio, mismos objetivos.',
      icon: 'people-outline',
    },
    {
      key: 'nutricion',
      name: 'Orientación nutricional',
      detail: 'Pautas de alimentación deportiva para acompañar tu entrenamiento.',
      icon: 'nutrition-outline',
    },
    {
      key: 'deportiva',
      name: 'Preparación física deportiva',
      detail: 'Fuerza, potencia y resistencia para rendir en tu deporte.',
      icon: 'stopwatch-outline',
    },
    {
      key: 'seguimiento',
      name: 'Evaluación y seguimiento',
      detail: 'Mediciones periódicas y ajustes del plan según tu progreso.',
      icon: 'trending-up-outline',
    },
    {
      key: 'domicilio',
      name: 'A domicilio o al aire libre',
      detail: 'Entrenamos en tu casa, en una plaza o donde te quede cómodo.',
      icon: 'home-outline',
    },
  ];

  readonly goals: Choice[] = [
    { key: 'peso', name: 'Bajar de peso' },
    { key: 'masa', name: 'Ganar masa muscular' },
    { key: 'tonificar', name: 'Tonificar' },
    { key: 'fuerza', name: 'Ganar fuerza' },
    { key: 'rendimiento', name: 'Rendimiento deportivo' },
    { key: 'salud', name: 'Salud y movilidad' },
  ];

  readonly levels: Choice[] = [
    { key: 'inicial', name: 'Recién empiezo' },
    { key: 'intermedio', name: 'Entreno hace un tiempo' },
    { key: 'avanzado', name: 'Avanzado' },
  ];

  readonly frequencies = [1, 2, 3, 4, 5, 6];

  // Texto repetido un número par de veces para que la cinta haga loop sin cortes.
  readonly tapeText = Array(16)
    .fill('FUERZA · TÉCNICA · CONSTANCIA ·')
    .join(' ');

  readonly steps = [
    {
      title: 'Evaluación inicial',
      detail: 'Charlamos sobre tus objetivos, historial y disponibilidad.',
    },
    {
      title: 'Plan a medida',
      detail: 'Armo tu rutina según tu nivel, tiempos y modalidad.',
    },
    {
      title: 'Entrenamiento',
      detail: 'Entrenamos presencial, online o en grupo, con técnica cuidada.',
    },
    {
      title: 'Seguimiento',
      detail: 'Medimos el progreso y ajustamos el plan para seguir avanzando.',
    },
  ];

  readonly credentials = [
    'Personal Trainer y Musculación',
    'Preparación Física Deportiva',
    'Instructor de Fitness Grupal / Máster en Funcional',
    'Nutrición Deportiva',
  ];

  selectedServices = new Set<string>(['rutinas']);
  goal = 'masa';
  level = 'inicial';
  daysPerWeek = 3;

  private observer?: IntersectionObserver;
  private readonly whatsappNumber = '5491167997544';

  get selectedServiceNames(): string[] {
    return this.services
      .filter((service) => this.selectedServices.has(service.key))
      .map((service) => service.name);
  }

  get goalName(): string {
    return this.goals.find((goal) => goal.key === this.goal)?.name ?? '';
  }

  get levelName(): string {
    return this.levels.find((level) => level.key === this.level)?.name ?? '';
  }

  get daysLabel(): string {
    return `${this.daysPerWeek} ${this.daysPerWeek === 1 ? 'día' : 'días'} por semana`;
  }

  get whatsappUrl(): string {
    const services = this.selectedServiceNames;
    const message = [
      '¡Hola! Quiero consultar por entrenamiento personalizado:',
      `Servicios: ${services.length ? services.join(', ') : 'A definir'}`,
      `Objetivo: ${this.goalName}`,
      `Nivel: ${this.levelName}`,
      `Frecuencia: ${this.daysLabel}`,
    ].join('\n');

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  ngAfterViewInit(): void {
    this.setupRevealAnimations();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleService(key: string): void {
    if (this.selectedServices.has(key)) {
      this.selectedServices.delete(key);
    } else {
      this.selectedServices.add(key);
    }
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  private setupRevealAnimations(): void {
    const elements = document.querySelectorAll<HTMLElement>(
      '.gym-page .reveal',
    );

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => this.observer?.observe(element));
  }
}
