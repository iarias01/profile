import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translations: { [lang: string]: any } = { es: {}, en: {} };
  private lang$ = new BehaviorSubject<string>('es');

  currentLang$ = this.lang$.asObservable();

  constructor(private http: HttpClient) {
    this.init();
  }

  private init(): void {
    const browserLang = navigator.language?.toLowerCase().startsWith('es')
      ? 'es'
      : 'en';
    forkJoin({
      es: this.http.get<any>('assets/i18n/es.json'),
      en: this.http.get<any>('assets/i18n/en.json'),
    }).subscribe({
      next: (data) => {
        this.translations = data;
        this.lang$.next(browserLang);
      },
      error: () => {
        this.lang$.next(browserLang);
      },
    });
  }

  setLang(lang: 'es' | 'en'): void {
    this.lang$.next(lang);
  }

  toggleLang(): void {
    const next = this.lang$.value === 'es' ? 'en' : 'es';
    this.lang$.next(next);
  }

  translate(key: string): string {
    const lang = this.lang$.value;
    const parts = key.split('.');
    let value: any = this.translations[lang] || {};
    for (const part of parts) {
      value = value?.[part];
    }
    return typeof value === 'string' ? value : key;
  }

  get currentLang(): string {
    return this.lang$.value;
  }
}
