import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GabyRestobarPageRoutingModule } from './gabyrestobar-routing.module';
import { GabyRestobarPage } from './gabyrestobar.page';
import { ProposalComponentsModule } from './proposal-components.module';

@NgModule({
  imports: [
    CommonModule,
    ProposalComponentsModule,
    GabyRestobarPageRoutingModule,
  ],
  declarations: [GabyRestobarPage],
})
export class GabyRestobarPageModule {}
