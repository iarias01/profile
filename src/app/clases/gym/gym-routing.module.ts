import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymPage } from './gym.page';

const routes: Routes = [
  {
    path: '',
    component: GymPage,
    title: 'Fuerza Pro | Entrenamiento personalizado',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymPageRoutingModule {}
