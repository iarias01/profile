import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProposalComponentsModule } from '../gabyrestobar/proposal-components.module';
import { EstudioGabySalsaPageRoutingModule } from './estudiogabysalsa-routing.module';
import { EstudioGabySalsaPage } from './estudiogabysalsa.page';

@NgModule({
  imports: [
    CommonModule,
    ProposalComponentsModule,
    EstudioGabySalsaPageRoutingModule,
  ],
  declarations: [EstudioGabySalsaPage],
})
export class EstudioGabySalsaPageModule {}
