import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MathPageRoutingModule } from './math-routing.module';
import { MathPage } from './math.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MathPageRoutingModule],
  declarations: [MathPage],
})
export class MathPageModule {}
