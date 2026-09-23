import { Component, Input } from '@angular/core';
import { ProposalStatus } from '../../gabyrestobar.models';

@Component({
  selector: 'app-status-badge',
  template: `<span
    class="status-badge"
    [class]="'status-badge status-badge--' + status"
    ><ng-content></ng-content
  ></span>`,
  styleUrls: ['./status-badge.component.scss'],
  standalone: false,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: ProposalStatus;
}
