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

export interface ProposalPageConfig {
  browserTitle: string;
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  lead: string;
  heroImage: string;
  progress: number;
  progressDescription: string;
  progressMeta: Array<{ icon: string; label: string }>;
  summaryCards: ProposalCard[];
  concepts: ProposalConcept[];
  timelineConcepts: ProposalConcept[];
  sections: ProposalSection[];
  footerTitle: string;
  footerDescription: string;
}
