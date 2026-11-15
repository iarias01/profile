import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItPage } from './it.page';

const routes: Routes = [
  {
    path: '',
    component: ItPage,
    title: 'IT Lab | Presupuesto de clases',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItPageRoutingModule {}
