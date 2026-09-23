import { Component } from '@angular/core';
import { CONCEPTS, CONTENT_SECTIONS, SUMMARY_CARDS } from './gabyrestobar.data';
import { ProposalConcept } from './gabyrestobar.models';

@Component({
  selector: 'app-gabyrestobar',
  templateUrl: './gabyrestobar.page.html',
  styleUrls: ['./gabyrestobar.page.scss'],
  standalone: false,
})
export class GabyRestobarPage {
  readonly concepts = CONCEPTS;
  readonly summaryCards = SUMMARY_CARDS;
  readonly sections = CONTENT_SECTIONS;
  paymentModalOpen = false;

  get projectProgress(): number {
    const required = this.concepts.filter((concept) => !concept.optional);
    const total = required.reduce((sum, concept) => sum + concept.amount, 0);
    const paid = required.reduce((sum, concept) => sum + concept.paid, 0);
    return total === 0 ? 0 : Math.round((paid / total) * 100);
  }

  get requiredConcepts(): ProposalConcept[] {
    return this.concepts.filter((concept) => !concept.optional);
  }

  openPayments(): void {
    this.paymentModalOpen = true;
  }

  closePayments(): void {
    this.paymentModalOpen = false;
  }

  scrollToDetails(): void {
    document.getElementById('etapas')?.scrollIntoView({ behavior: 'smooth' });
  }
}
