import { Component } from '@angular/core';
import { ESTUDIO_GABY_SALSA_CONFIG } from './estudiogabysalsa.data';

@Component({
  selector: 'app-estudio-gaby-salsa',
  template: `<app-proposal-layout [config]="config"></app-proposal-layout>`,
  standalone: false,
})
export class EstudioGabySalsaPage {
  readonly config = ESTUDIO_GABY_SALSA_CONFIG;
}
