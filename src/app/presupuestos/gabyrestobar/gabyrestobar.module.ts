import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardSectionComponent } from './components/card-section/card-section.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { PaymentTableComponent } from './components/payment-table/payment-table.component';
import { ProposalCardComponent } from './components/proposal-card/proposal-card.component';
import { ProposalTimelineComponent } from './components/proposal-timeline/proposal-timeline.component';
import { SectionHeadingComponent } from './components/section-heading/section-heading.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { GabyRestobarPageRoutingModule } from './gabyrestobar-routing.module';
import { GabyRestobarPage } from './gabyrestobar.page';

@NgModule({
  imports: [CommonModule, IonicModule, GabyRestobarPageRoutingModule],
  declarations: [
    GabyRestobarPage,
    CardSectionComponent,
    PaymentModalComponent,
    PaymentTableComponent,
    ProposalCardComponent,
    ProposalTimelineComponent,
    SectionHeadingComponent,
    StatusBadgeComponent,
  ],
})
export class GabyRestobarPageModule {}
