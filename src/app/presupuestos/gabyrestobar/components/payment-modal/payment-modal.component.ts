import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ProposalConcept } from '../../gabyrestobar.models';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
  standalone: false,
})
export class PaymentModalComponent {
  @Input() open = false;
  @Input({ required: true }) concepts: ProposalConcept[] = [];
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.open) {
      this.closed.emit();
    }
  }
}
