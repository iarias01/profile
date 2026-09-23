import { Component, Input } from '@angular/core';
import {
  Currency,
  ProposalConcept,
  ProposalStatus,
} from '../../gabyrestobar.models';

@Component({
  selector: 'app-proposal-timeline',
  templateUrl: './proposal-timeline.component.html',
  styleUrls: ['./proposal-timeline.component.scss'],
  standalone: false,
})
export class ProposalTimelineComponent {
  @Input({ required: true }) concepts: ProposalConcept[] = [];

  label(concept: ProposalConcept): string {
    return concept.type === 'stage'
      ? `Etapa ${concept.number} · ${concept.title}`
      : concept.title;
  }

  statusLabel(concept: ProposalConcept): string {
    if (concept.status === 'paid') {
      return 'Pagado 100%';
    }
    if (concept.status === 'pending' && concept.paid > 0) {
      return `Pendiente ${this.format(concept.amount - concept.paid, concept.currency)}`;
    }
    return concept.status === 'optional' ? 'Opcional' : 'Pendiente';
  }

  format(amount: number, currency: Currency): string {
    if (currency === 'USD') {
      return `USD ${amount.toLocaleString('es-AR')}`;
    }
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  status(concept: ProposalConcept): ProposalStatus {
    return concept.status;
  }
}
