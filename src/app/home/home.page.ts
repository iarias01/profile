import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
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

  currentLang = 'es';
  menuOpen = false;
  activeFilter = 'all';
  navScrolled = false;

  projects: PortfolioProject[] = [];
  filteredProjects: PortfolioProject[] = [];

  private langSub!: Subscription;
  private scrollObserver?: IntersectionObserver;

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
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.scrollObserver?.disconnect();
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
    this.filteredProjects =
      filter === 'all'
        ? [...this.projects]
        : this.projects.filter((p) => p.category === filter);
    this.queueObserveElements();
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
          const visibleProjects = data.filter(
            (project) => project.view !== false,
          );
          this.projects = visibleProjects;
          this.filteredProjects = [...visibleProjects];
          this.queueObserveElements();
        },
        error: () => {
          this.projects = [];
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
