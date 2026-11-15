import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-math',
  templateUrl: './math.page.html',
  styleUrls: ['./math.page.scss'],
  standalone: false,
})
export class MathPage implements AfterViewInit, OnDestroy {
  readonly hourlyRate = 15000;
  readonly maxHours = 40;
  readonly examples = [1, 2, 4, 8];
  hours = 1;

  private observer?: IntersectionObserver;
  private readonly whatsappNumber = '5491167997544';
  private readonly currency = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  });

  get total(): string {
    return this.formatPrice(this.hourlyRate * this.hours);
  }

  get rateLabel(): string {
    return this.formatPrice(this.hourlyRate);
  }

  get hoursLabel(): string {
    return `${this.hours} ${this.hours === 1 ? 'hora' : 'horas'}`;
  }

  get whatsappUrl(): string {
    const message = [
      '¡Hola! Quiero consultar por clases de matemática:',
      `Horas: ${this.hours}`,
      `Valor por hora: ${this.rateLabel}`,
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

  changeHours(amount: number): void {
    this.hours = this.normalizeHours(this.hours + amount);
  }

  normalizeInput(): void {
    this.hours = this.normalizeHours(this.hours);
  }

  formatPrice(value: number): string {
    return this.currency.format(value);
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  private normalizeHours(value: number): number {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue)
      ? Math.min(this.maxHours, Math.max(1, Math.trunc(parsedValue)))
      : 1;
  }

  private setupRevealAnimations(): void {
    const elements = document.querySelectorAll<HTMLElement>(
      '.math-page .reveal',
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
