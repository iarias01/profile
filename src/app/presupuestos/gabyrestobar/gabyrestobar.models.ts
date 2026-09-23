export type ProposalStatus = 'paid' | 'pending' | 'optional';
export type Currency = 'ARS' | 'USD';

export interface ProposalConcept {
  id: string;
  type: 'stage' | 'service';
  number?: number;
  title: string;
  description: string;
  amount: number;
  paid: number;
  currency: Currency;
  status: ProposalStatus;
  optional: boolean;
}

export interface ProposalCard {
  icon: string;
  title: string;
  description?: string;
  badges?: CardBadge[];
}

export interface CardBadge {
  label: string;
  status: ProposalStatus;
}

export interface ProposalSection {
  eyebrow: string;
  title: string;
  cards: ProposalCard[];
  columns?: 2 | 3;
}
