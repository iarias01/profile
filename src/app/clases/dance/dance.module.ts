import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DancePageRoutingModule } from './dance-routing.module';
import { DancePage } from './dance.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DancePageRoutingModule],
  declarations: [DancePage],
})
export class DancePageModule {}
