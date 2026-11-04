import {
  AfterViewInit,
  Component,
  OnDestroy,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { IonContent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';

interface PortfolioProject {
  id: number;
  view?: boolean;
  slug: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  image: string;
  tags: string[];
  link: string | null;
  category: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') ionContent!: IonContent;
  @ViewChild('featuredTrack') featuredTrack?: ElementRef<HTMLElement>;

  currentLang = 'es';
  menuOpen = false;
  cvMenuOpen = false;
  activeFilter = 'all';
  navScrolled = false;

  /** Proyectos destacados (view: true), sin filtros. */
  featuredProjects: PortfolioProject[] = [];
  /** Todos los proyectos, se muestran en el modal con filtros. */
  allProjects: PortfolioProject[] = [];
  filteredProjects: PortfolioProject[] = [];
  allProjectsOpen = false;

  private langSub!: Subscription;
  private scrollObserver?: IntersectionObserver;

  // Slider de destacados: avanza solo mientras el usuario no interactúa
  private readonly sliderIntervalMs = 4500;
  private readonly sliderIdleMs = 6000;
  private sliderTimer?: ReturnType<typeof setInterval>;
  private sliderResumeTimer?: ReturnType<typeof setTimeout>;
  private sliderPaused = false;

  skills = [
    { name: 'Angular', level: 95 },
    { name: 'Ionic', level: 95 },
    { name: 'Capacitor', level: 88 },
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript', level: 92 },
    { name: 'HTML5 / CSS3', level: 95 },
    { name: 'SCSS / BEM', level: 90 },
    { name: 'Node.js', level: 75 },
    { name: 'PHP', level: 88 },
    { name: 'REST APIs', level: 85 },
    { name: 'Firebase', level: 78 },
    { name: 'PWA', level: 85 },
    { name: 'AI Agent Orchestration', level: 85 },
  ];

  filters = [
    { key: 'all', labelKey: 'portfolio.filter_all' },
    { key: 'web', labelKey: 'portfolio.filter_web' },
    { key: 'mobile', labelKey: 'portfolio.filter_mobile' },
    { key: 'pwa', labelKey: 'portfolio.filter_pwa' },
  ];

  constructor(
    private http: HttpClient,
    public translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.langSub = this.translationService.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.loadPortfolio();
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.scrollObserver?.disconnect();
    this.stopSlider();
  }

  /** Avanza (dir=1) o retrocede (dir=-1) una tarjeta; vuelve al inicio/fin en los extremos. */
  slide(dir: 1 | -1, byUser = false): void {
    const track = this.featuredTrack?.nativeElement;
    const card = track?.querySelector<HTMLElement>('.portfolio__slide');
    if (!track || !card) {
      return;
    }
    if (byUser) {
      this.onSliderInteract();
    }

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card.offsetWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - 4;
    const atStart = track.scrollLeft <= 4;

    let target = track.scrollLeft + dir * step;
    if (dir === 1 && atEnd) {
      target = 0;
    } else if (dir === -1 && atStart) {
      target = maxScroll;
    }
    track.scrollTo({ left: target, behavior: 'smooth' });
  }

  pauseSlider(): void {
    this.sliderPaused = true;
    clearTimeout(this.sliderResumeTimer);
  }

  resumeSlider(): void {
    clearTimeout(this.sliderResumeTimer);
    this.sliderResumeTimer = setTimeout(() => {
      this.sliderPaused = false;
    }, this.sliderIdleMs);
  }

  /** Interacción puntual (click en flechas, scroll con rueda): pausa y reanuda tras un rato quieto. */
  onSliderInteract(): void {
    this.pauseSlider();
    this.resumeSlider();
  }

  private startSlider(): void {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    this.sliderTimer = setInterval(() => {
      if (!this.sliderPaused && !document.hidden && !this.allProjectsOpen) {
        this.slide(1);
      }
    }, this.sliderIntervalMs);
  }

  private stopSlider(): void {
    clearInterval(this.sliderTimer);
    clearTimeout(this.sliderResumeTimer);
  }

  toggleLang(): void {
    this.translationService.toggleLang();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    // category puede ser compuesta, ej: "mobile / web"
    this.filteredProjects =
      filter === 'all'
        ? [...this.allProjects]
        : this.allProjects.filter((p) =>
            p.category
              .split('/')
              .map((c) => c.trim().toLowerCase())
              .includes(filter),
          );
  }

  openAllProjects(): void {
    this.setFilter('all');
    this.allProjectsOpen = true;
  }

  closeAllProjects(): void {
    this.allProjectsOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.allProjectsOpen) {
      this.closeAllProjects();
    }
  }

  getProjectTitle(project: PortfolioProject): string {
    return this.currentLang === 'es' ? project.title_es : project.title_en;
  }

  getProjectDesc(project: PortfolioProject): string {
    return this.currentLang === 'es'
      ? project.description_es
      : project.description_en;
  }

  async scrollTo(id: string): Promise<void> {
    this.closeMenu();
    const el = document.getElementById(id);
    if (el && this.ionContent) {
      const offset = el.offsetTop - 60;
      await this.ionContent.scrollToPoint(0, offset, 500);
    }
  }

  onScroll(event: CustomEvent): void {
    this.navScrolled = (event as any).detail.scrollTop > 50;
  }

  private loadPortfolio(): void {
    this.http
      .get<PortfolioProject[]>('assets/portafolio/portfolio.json')
      .subscribe({
        next: (data) => {
          this.allProjects = data;
          this.featuredProjects = data.filter(
            (project) => project.view !== false,
          );
          this.filteredProjects = [...data];
          this.queueObserveElements();
        },
        error: () => {
          this.allProjects = [];
          this.featuredProjects = [];
          this.filteredProjects = [];
        },
      });
  }

  private setupScrollAnimations(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      this.markAllAsVisible();
      return;
    }

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.scrollObserver?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    this.observeScrollElements();
  }

  private observeScrollElements(): void {
    if (!this.scrollObserver) {
      return;
    }

    const elements =
      document.querySelectorAll<HTMLElement>('.reveal-on-scroll');

    elements.forEach((el, index) => {
      if (el.classList.contains('is-visible')) {
        return;
      }

      const staggerDelay = (index % 6) * 65;
      el.style.setProperty('--reveal-delay', `${staggerDelay}ms`);
      this.scrollObserver?.observe(el);
    });
  }

  private queueObserveElements(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.setTimeout(() => this.observeScrollElements(), 0);
  }

  private markAllAsVisible(): void {
    const elements =
      document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    elements.forEach((el) => el.classList.add('is-visible'));
  }
}
