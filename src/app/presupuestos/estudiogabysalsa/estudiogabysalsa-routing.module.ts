import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudioGabySalsaPage } from './estudiogabysalsa.page';

const routes: Routes = [
  {
    path: '',
    component: EstudioGabySalsaPage,
    title: 'Gaby Salsa Club | Propuesta de desarrollo',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudioGabySalsaPageRoutingModule {}
