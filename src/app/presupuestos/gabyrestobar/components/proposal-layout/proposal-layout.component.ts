import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProposalPageConfig } from '../../gabyrestobar.models';

@Component({
  selector: 'app-proposal-layout',
  templateUrl: './proposal-layout.component.html',
  styleUrls: ['../../gabyrestobar.page.scss'],
  standalone: false,
})
export class ProposalLayoutComponent {
  @Input({ required: true }) set config(value: ProposalPageConfig) {
    this.pageConfig = value;
    this.titleService.setTitle(value.browserTitle);
  }

  pageConfig!: ProposalPageConfig;
  paymentModalOpen = false;

  constructor(private readonly titleService: Title) {}

  openPayments(): void {
    this.paymentModalOpen = true;
  }

  closePayments(): void {
    this.paymentModalOpen = false;
  }

  scrollToDetails(): void {
    document.getElementById('etapas')?.scrollIntoView({ behavior: 'smooth' });
  }
}
