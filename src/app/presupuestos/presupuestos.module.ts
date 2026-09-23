import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gabyrestobar',
    loadChildren: () =>
      import('./gabyrestobar/gabyrestobar.module').then(
        (module) => module.GabyRestobarPageModule,
      ),
  },
  {
    path: '',
    redirectTo: 'gabyrestobar',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PresupuestosModule {}
