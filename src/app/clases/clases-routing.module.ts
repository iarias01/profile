import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasesPage } from './clases.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesPage,
    title: 'Ritmo Vivo | Presupuesto de clases',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesPageRoutingModule {}
