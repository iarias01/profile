import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  data: { name: string; icon?: string }[];
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
  color?: string;
  icono?: string;
}

interface CvStudy {
  institucion: string;
  titulo: string;
  desde: string;
  hasta: string;
  nivel: string;
  color?: string;
  icono?: string;
}

interface CvData {
  titles: CvTitles;
  skills: CvSkill[];
  personality: CvNamedList;
  languages: CvLanguage[];
  trainings?: CvNamedList;
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
  // 'general' y 'escolar': CVs no relacionados al IT, solo en español.
  // Comparten estilos; cada uno lee los datos de su propia carpeta.
  @HostBinding('class.is-general') readonly isGeneral: boolean;
  private readonly folder: string;
  extrasOpen = false;

  readonly levels = [1, 2, 3, 4, 5];

  private cache: { [folder: string]: CvData } = {};
  private langSub?: Subscription;
  private pageStyle?: HTMLStyleElement;

  constructor(
    private http: HttpClient,
    private translationService: TranslationService,
    private el: ElementRef<HTMLElement>,
    route: ActivatedRoute,
  ) {
    const variant = route.snapshot.data['variant'];
    this.isGeneral = variant === 'general' || variant === 'escolar';
    this.folder = this.isGeneral ? variant : '';
  }

  ngOnInit(): void {
    document.body.classList.add('cv-print');

    if (this.isGeneral) {
      document.documentElement.lang = 'es';
      this.langSub = this.loadCv(this.folder).subscribe((cv) => this.setCv(cv));
      return;
    }

    this.langSub = this.translationService.currentLang$
      .pipe(
        tap((lang) => {
          this.currentLang = lang;
          document.documentElement.lang = lang;
        }),
        switchMap((lang) => this.loadCv(lang)),
      )
      .subscribe((cv) => this.setCv(cv));
  }

  ngOnDestroy(): void {
    document.body.classList.remove('cv-print');
    this.langSub?.unsubscribe();
    this.pageStyle?.remove();
  }

  /**
   * Ajusta la página de impresión al alto del CV para que el PDF salga en una
   * sola hoja larga (ancho A4) en vez de cortarse en varias hojas.
   * Mide con la clase .cv-measure, que aplica el mismo layout que @media print.
   */
  @HostListener('window:beforeprint')
  fitPageToContent(): void {
    const host = this.el.nativeElement;
    const cv = host.querySelector<HTMLElement>('main.cv');
    if (!cv) {
      return;
    }

    host.classList.add('cv-measure');
    const height = Math.ceil(cv.getBoundingClientRect().height) + 2;
    host.classList.remove('cv-measure');

    if (!this.pageStyle) {
      this.pageStyle = document.createElement('style');
      document.head.appendChild(this.pageStyle);
    }
    this.pageStyle.textContent = `@page { size: 210mm ${height}px; margin: 0; }`;
  }

  private setCv(cv: CvData): void {
    this.cv = cv;
    // Se recalcula ya renderizado y con las fuentes cargadas, para que también
    // funcione al generar el PDF sin abrir el diálogo de impresión
    setTimeout(() => this.fitPageToContent());
    document.fonts?.ready.then(() => this.fitPageToContent());
  }

  get pdfUrl(): string {
    const suffix = this.isGeneral ? this.folder : this.currentLang;
    return `assets/cv/pdf/cv-ignacio-arias-${suffix}.pdf`;
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

  private loadCv(folder: string): Observable<CvData> {
    if (this.cache[folder]) {
      return of(this.cache[folder]);
    }

    const base = `assets/cv/${folder}/`;
    return forkJoin({
      titles: this.http.get<CvTitles>(base + 'titulos.json'),
      skills: this.isGeneral
        ? of<CvSkill[]>([])
        : this.http.get<CvSkill[]>(base + 'skill.json'),
      personality: this.http.get<CvNamedList>(base + 'personalidad.json'),
      languages: this.http.get<CvLanguage[]>(base + 'idiomas.json'),
      trainings: this.isGeneral
        ? of(undefined)
        : this.http.get<CvNamedList>(base + 'capacitaciones.json'),
      activities: this.http.get<CvNamedList>(base + 'actividades.json'),
      experiences: this.http.get<CvExperience[]>(base + 'experiencias.json'),
      studies: this.http.get<CvStudy[]>(base + 'estudios.json'),
    }).pipe(tap((cv) => (this.cache[folder] = cv)));
  }
}
