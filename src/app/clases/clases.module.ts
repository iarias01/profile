import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dance',
    loadChildren: () =>
      import('./dance/dance.module').then((module) => module.DancePageModule),
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
