import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GymPageRoutingModule } from './gym-routing.module';
import { GymPage } from './gym.page';

@NgModule({
  imports: [CommonModule, IonicModule, GymPageRoutingModule],
  declarations: [GymPage],
})
export class GymPageModule {}
