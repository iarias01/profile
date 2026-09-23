import { Component, Input } from '@angular/core';
import { ProposalCard } from '../../gabyrestobar.models';

@Component({
  selector: 'app-proposal-card',
  templateUrl: './proposal-card.component.html',
  styleUrls: ['./proposal-card.component.scss'],
  standalone: false,
})
export class ProposalCardComponent {
  @Input({ required: true }) card!: ProposalCard;
  @Input() compact = false;
}
