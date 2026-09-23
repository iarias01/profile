import { Component, Input } from '@angular/core';
import { ProposalSection } from '../../gabyrestobar.models';

@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss'],
  standalone: false,
})
export class CardSectionComponent {
  @Input({ required: true }) section!: ProposalSection;
}
