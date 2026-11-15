import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type SubjectKey = 'computacion' | 'programacion' | 'ambas';
type GroupSize = 'small' | 'large';

interface Rate {
  minutes: number;
  price: number;
}

interface SubjectOption {
  key: SubjectKey;
  name: string;
  command: string;
  icon: string;
  detail: string;
}

@Component({
  selector: 'app-it',
  templateUrl: './it.page.html',
  styleUrls: ['./it.page.scss'],
  standalone: false,
})
export class ItPage implements OnInit, AfterViewInit, OnDestroy {
  people = 1;
  subject: SubjectKey = 'computacion';

  readonly options: SubjectOption[] = [
    {
      key: 'computacion',
      name: 'Computación',
      command: 'run computacion',
      icon: 'desktop-outline',
      detail: 'Office, internet, archivos y uso de la PC',
    },
    {
      key: 'programacion',
      name: 'Programación',
      command: 'run programacion',
      icon: 'code-slash-outline',
      detail: 'Lógica, algoritmos y tu primer código',
    },
    {
      key: 'ambas',
      name: 'Ambas',
      command: 'run --all',
      icon: 'layers-outline',
      detail: 'Computación + programación en una clase',
    },
  ];

  private observer?: IntersectionObserver;
  private readonly whatsappNumber = '5491167997544';
  private readonly currency = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  });
  private readonly pricing: Record<'single' | 'both', Record<GroupSize, Rate>> =
    {
      single: {
        small: { minutes: 45, price: 8000 },
        large: { minutes: 60, price: 6000 },
      },
      both: {
        small: { minutes: 90, price: 12000 },
        large: { minutes: 110, price: 10000 },
      },
    };

  constructor(private readonly route: ActivatedRoute) {}

  get selected(): SubjectOption {
    return this.options.find((option) => option.key === this.subject)!;
  }

  get rate(): Rate {
    const mode = this.subject === 'ambas' ? 'both' : 'single';
    return this.pricing[mode][this.people <= 6 ? 'small' : 'large'];
  }

  get total(): string {
    return this.formatPrice(this.rate.price * this.people);
  }

  get pricePerPerson(): string {
    return this.formatPrice(this.rate.price);
  }

  get subjectLabel(): string {
    return this.subject === 'ambas'
      ? 'Computación + Programación'
      : this.selected.name;
  }

  get summary(): string {
    return `${this.subjectLabel} · ${this.people} ${this.people === 1 ? 'persona' : 'personas'}`;
  }

  get whatsappUrl(): string {
    const message = [
      '¡Hola! Quiero consultar por este presupuesto de clases de informática:',
      `Materia: ${this.subjectLabel}`,
      `Personas: ${this.people}`,
      `Duración: ${this.rate.minutes} minutos`,
      `Valor por persona: ${this.pricePerPerson}`,
      `Total estimado: ${this.total}`,
    ].join('\n');

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  ngOnInit(): void {
    const requested = this.route.snapshot.queryParamMap.get('materia');
    if (this.options.some((option) => option.key === requested)) {
      this.subject = requested as SubjectKey;
    }
  }

  ngAfterViewInit(): void {
    this.setupRevealAnimations();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  selectSubject(key: SubjectKey): void {
    this.subject = key;
  }

  changePeople(amount: number): void {
    this.people = this.normalizePeople(this.people + amount);
  }

  normalizeInput(): void {
    this.people = this.normalizePeople(this.people);
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  private normalizePeople(value: number): number {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue)
      ? Math.min(99, Math.max(1, Math.trunc(parsedValue)))
      : 1;
  }

  private formatPrice(value: number): string {
    return this.currency.format(value);
  }

  private setupRevealAnimations(): void {
    const elements = document.querySelectorAll<HTMLElement>('.it-page .reveal');

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
