import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  template: `
    <header class="section-heading">
      <p>{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
    </header>
  `,
  styleUrls: ['./section-heading.component.scss'],
  standalone: false,
})
export class SectionHeadingComponent {
  @Input({ required: true }) eyebrow!: string;
  @Input({ required: true }) title!: string;
}
