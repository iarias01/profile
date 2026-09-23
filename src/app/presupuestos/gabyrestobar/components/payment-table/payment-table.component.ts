import { Component, Input } from '@angular/core';
import { Currency, ProposalConcept } from '../../gabyrestobar.models';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
  standalone: false,
})
export class PaymentTableComponent {
  @Input({ required: true }) concepts: ProposalConcept[] = [];

  conceptName(concept: ProposalConcept): string {
    return concept.type === 'stage'
      ? `Etapa ${concept.number} · ${concept.title}`
      : concept.title;
  }

  statusLabel(concept: ProposalConcept): string {
    const labels = {
      paid: 'Pagado',
      pending: 'Pendiente',
      optional: 'Opcional',
    };
    return labels[concept.status];
  }

  paidLabel(concept: ProposalConcept): string {
    if (concept.status === 'paid') {
      return 'Total';
    }
    return concept.paid > 0 ? this.format(concept.paid, concept.currency) : '—';
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
}
