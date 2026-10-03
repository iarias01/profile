import { Component } from '@angular/core';
import { CURSOS_ONLINE_CONFIG } from './cursosonline.data';

@Component({
  selector: 'app-cursos-online',
  template: `<app-proposal-layout [config]="config"></app-proposal-layout>`,
  standalone: false,
})
export class CursosOnlinePage {
  readonly config = CURSOS_ONLINE_CONFIG;
}
