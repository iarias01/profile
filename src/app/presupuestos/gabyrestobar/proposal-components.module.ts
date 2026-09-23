import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardSectionComponent } from './components/card-section/card-section.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { PaymentTableComponent } from './components/payment-table/payment-table.component';
import { ProposalCardComponent } from './components/proposal-card/proposal-card.component';
import { ProposalLayoutComponent } from './components/proposal-layout/proposal-layout.component';
import { ProposalTimelineComponent } from './components/proposal-timeline/proposal-timeline.component';
import { SectionHeadingComponent } from './components/section-heading/section-heading.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    CardSectionComponent,
    PaymentModalComponent,
    PaymentTableComponent,
    ProposalCardComponent,
    ProposalLayoutComponent,
    ProposalTimelineComponent,
    SectionHeadingComponent,
    StatusBadgeComponent,
  ],
  exports: [ProposalLayoutComponent],
})
export class ProposalComponentsModule {}
