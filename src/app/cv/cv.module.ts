import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CvPageRoutingModule } from './cv-routing.module';
import { CvPage } from './cv.page';

@NgModule({
  imports: [CommonModule, IonicModule, CvPageRoutingModule],
  declarations: [CvPage],
})
export class CvPageModule {}
