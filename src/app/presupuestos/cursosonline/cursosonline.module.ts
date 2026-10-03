import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProposalComponentsModule } from '../gabyrestobar/proposal-components.module';
import { CursosOnlinePageRoutingModule } from './cursosonline-routing.module';
import { CursosOnlinePage } from './cursosonline.page';

@NgModule({
  imports: [
    CommonModule,
    ProposalComponentsModule,
    CursosOnlinePageRoutingModule,
  ],
  declarations: [CursosOnlinePage],
})
export class CursosOnlinePageModule {}
