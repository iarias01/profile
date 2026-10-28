import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvPage } from './cv.page';

const routes: Routes = [
  {
    path: '',
    component: CvPage,
    title: 'Ignacio Arias | CV',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvPageRoutingModule {}
