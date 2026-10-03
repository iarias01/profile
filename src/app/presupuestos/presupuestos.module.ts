import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'estudiogabysalsa',
    loadChildren: () =>
      import('./estudiogabysalsa/estudiogabysalsa.module').then(
        (module) => module.EstudioGabySalsaPageModule,
      ),
  },
  {
    path: 'gabyrestobar',
    loadChildren: () =>
      import('./gabyrestobar/gabyrestobar.module').then(
        (module) => module.GabyRestobarPageModule,
      ),
  },
  {
    path: 'cursosonline',
    loadChildren: () =>
      import('./cursosonline/cursosonline.module').then(
        (module) => module.CursosOnlinePageModule,
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
