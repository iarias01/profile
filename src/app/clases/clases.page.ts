import { AfterViewInit, Component, OnDestroy } from '@angular/core';

type RhythmMode = 'single' | 'both';
type GroupSize = 'small' | 'large';

interface Rate {
  minutes: number;
  price: number;
}

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
  standalone: false,
})
export class ClasesPage implements AfterViewInit, OnDestroy {
  people = 1;
  rhythm: RhythmMode = 'single';
  rhythmName = 'Salsa';

  private observer?: IntersectionObserver;
  private readonly whatsappNumber = '5491167997544';
  private readonly currency = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  });
  private readonly pricing: Record<RhythmMode, Record<GroupSize, Rate>> = {
    single: {
      small: { minutes: 45, price: 8000 },
      large: { minutes: 60, price: 6000 },
    },
    both: {
      small: { minutes: 90, price: 12000 },
      large: { minutes: 110, price: 10000 },
    },
  };

  get rate(): Rate {
    return this.pricing[this.rhythm][this.people <= 6 ? 'small' : 'large'];
  }

  get total(): string {
    return this.formatPrice(this.rate.price * this.people);
  }

  get pricePerPerson(): string {
    return this.formatPrice(this.rate.price);
  }

  get summary(): string {
    return `${this.rhythmName} · ${this.people} ${this.people === 1 ? 'persona' : 'personas'}`;
  }

  get whatsappUrl(): string {
    const message = [
      '¡Hola! Quiero consultar por este presupuesto de clases de baile:',
      `Ritmo: ${this.rhythmName}`,
      `Personas: ${this.people}`,
      `Duración: ${this.rate.minutes} minutos`,
      `Valor por persona: ${this.pricePerPerson}`,
      `Total estimado: ${this.total}`,
    ].join('\n');

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  ngAfterViewInit(): void {
    this.setupRevealAnimations();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  selectRhythm(mode: RhythmMode, name: string): void {
    this.rhythm = mode;
    this.rhythmName = name;
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
    const elements = document.querySelectorAll<HTMLElement>(
      '.clases-page .reveal',
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
