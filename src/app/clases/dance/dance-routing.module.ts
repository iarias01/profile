import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DancePage } from './dance.page';

const routes: Routes = [
  {
    path: '',
    component: DancePage,
    title: 'Ritmo Vivo | Presupuesto de clases',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DancePageRoutingModule {}
