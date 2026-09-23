import { Component } from '@angular/core';
import { CONCEPTS, CONTENT_SECTIONS, SUMMARY_CARDS } from './gabyrestobar.data';
import { ProposalPageConfig } from './gabyrestobar.models';

@Component({
  selector: 'app-gabyrestobar',
  templateUrl: './gabyrestobar.page.html',
  standalone: false,
})
export class GabyRestobarPage {
  readonly config: ProposalPageConfig = {
    browserTitle: 'Gaby Restobar | Propuesta de desarrollo',
    eyebrow: 'Propuesta de desarrollo · 2026',
    title: 'Gaby',
    highlightedTitle: 'Restobar',
    lead: 'Una plataforma integral para ordenar la operación, recibir pedidos y convertir los datos del negocio en decisiones concretas.',
    heroImage:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=85',
    progress: 0,
    progressDescription: '3 conceptos base pendientes de aprobación.',
    progressMeta: [
      { icon: 'layers-outline', label: '7 etapas' },
      { icon: 'qr-code-outline', label: 'Carta QR' },
    ],
    summaryCards: SUMMARY_CARDS,
    concepts: CONCEPTS,
    timelineConcepts: CONCEPTS,
    sections: CONTENT_SECTIONS,
    footerTitle: 'Gaby Restobar',
    footerDescription: 'Propuesta de plataforma integral',
  };
}
