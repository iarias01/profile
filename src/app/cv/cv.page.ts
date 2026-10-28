import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, forkJoin, of, switchMap, tap } from 'rxjs';
import { TranslationService } from '../services/translation.service';

interface CvTitles {
  expe: string;
  educ: string;
  edad: string;
  portafilio: string;
  rol: string;
  skills: string;
  idiomas: string;
  referencias: string;
  volver: string;
  imprimir: string;
  descargar: string;
  extras: string;
  cerrar: string;
  ia: string;
}

interface CvNamedList {
  title: string;
  data: { name: string }[];
}

interface CvSkill {
  name: string;
  icon: string;
}

interface CvLanguage {
  title: string;
  data: { hablado: string; escrito: string };
  niveles: { hablado: number; escrito: number };
}

interface CvExperience {
  empresa: string;
  desde: string;
  hasta: string;
  ubicacion: string;
  modalidad_de_trabajo: string;
  puesto: string;
  referencia: string;
  industria: string;
  tareas: string;
  tecnologias: string;
  ia?: string;
}

interface CvStudy {
  institucion: string;
  titulo: string;
  desde: string;
  hasta: string;
  nivel: string;
}

interface CvData {
  titles: CvTitles;
  skills: CvSkill[];
  personality: CvNamedList;
  languages: CvLanguage[];
  trainings: CvNamedList;
  activities: CvNamedList;
  experiences: CvExperience[];
  studies: CvStudy[];
}

@Component({
  selector: 'app-cv',
  templateUrl: 'cv.page.html',
  styleUrls: ['cv.page.scss'],
  standalone: false,
})
export class CvPage implements OnInit, OnDestroy {
  currentLang = 'es';
  cv?: CvData;
  extrasOpen = false;

  readonly levels = [1, 2, 3, 4, 5];

  private cache: { [lang: string]: CvData } = {};
  private langSub?: Subscription;

  constructor(
    private http: HttpClient,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    document.body.classList.add('cv-print');
    this.langSub = this.translationService.currentLang$
      .pipe(
        tap((lang) => {
          this.currentLang = lang;
          document.documentElement.lang = lang;
        }),
        switchMap((lang) => this.loadCv(lang)),
      )
      .subscribe((cv) => (this.cv = cv));
  }

  ngOnDestroy(): void {
    document.body.classList.remove('cv-print');
    this.langSub?.unsubscribe();
  }

  get pdfUrl(): string {
    return `assets/cv/pdf/cv-ignacio-arias-${this.currentLang}.pdf`;
  }

  setLang(lang: 'es' | 'en'): void {
    this.translationService.setLang(lang);
  }

  openExtras(): void {
    this.extrasOpen = true;
  }

  @HostListener('document:keydown.escape')
  closeExtras(): void {
    this.extrasOpen = false;
  }

  print(): void {
    window.print();
  }

  techTags(experience: CvExperience): string[] {
    return (experience.tecnologias || '')
      .split(',')
      .map((tech) => tech.trim())
      .filter((tech) => tech);
  }

  private loadCv(lang: string): Observable<CvData> {
    if (this.cache[lang]) {
      return of(this.cache[lang]);
    }

    const base = `assets/cv/${lang}/`;
    return forkJoin({
      titles: this.http.get<CvTitles>(base + 'titulos.json'),
      skills: this.http.get<CvSkill[]>(base + 'skill.json'),
      personality: this.http.get<CvNamedList>(base + 'personalidad.json'),
      languages: this.http.get<CvLanguage[]>(base + 'idiomas.json'),
      trainings: this.http.get<CvNamedList>(base + 'capacitaciones.json'),
      activities: this.http.get<CvNamedList>(base + 'actividades.json'),
      experiences: this.http.get<CvExperience[]>(base + 'experiencias.json'),
      studies: this.http.get<CvStudy[]>(base + 'estudios.json'),
    }).pipe(tap((cv) => (this.cache[lang] = cv)));
  }
}
