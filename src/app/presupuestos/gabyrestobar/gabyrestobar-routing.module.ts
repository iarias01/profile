import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GabyRestobarPage } from './gabyrestobar.page';

const routes: Routes = [
  {
    path: '',
    component: GabyRestobarPage,
    title: 'Gaby Restobar | Propuesta de desarrollo',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GabyRestobarPageRoutingModule {}
