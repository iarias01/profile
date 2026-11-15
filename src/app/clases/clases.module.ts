import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dance',
    loadChildren: () =>
      import('./dance/dance.module').then((module) => module.DancePageModule),
  },
  {
    path: 'it',
    loadChildren: () =>
      import('./it/it.module').then((module) => module.ItPageModule),
  },
  {
    path: 'math',
    loadChildren: () =>
      import('./math/math.module').then((module) => module.MathPageModule),
  },
  {
    path: 'gym',
    loadChildren: () =>
      import('./gym/gym.module').then((module) => module.GymPageModule),
  },
  {
    path: '',
    redirectTo: 'dance',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ClasesModule {}
