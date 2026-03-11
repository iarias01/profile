import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';

interface PortfolioProject {
  id: number;
  slug: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  image: string;
  tags: string[];
  link: string;
  category: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('content') ionContent!: IonContent;

  currentLang = 'es';
  menuOpen = false;
  activeFilter = 'all';
  navScrolled = false;

  projects: PortfolioProject[] = [];
  filteredProjects: PortfolioProject[] = [];

  private langSub!: Subscription;

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

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
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
          this.projects = data;
          this.filteredProjects = [...data];
        },
        error: () => {
          this.projects = [];
          this.filteredProjects = [];
        },
      });
  }
}
