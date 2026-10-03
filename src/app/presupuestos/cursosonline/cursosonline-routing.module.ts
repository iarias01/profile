import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosOnlinePage } from './cursosonline.page';

const routes: Routes = [
  {
    path: '',
    component: CursosOnlinePage,
    title: 'Plataforma de Cursos Online | Propuesta de desarrollo',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosOnlinePageRoutingModule {}
