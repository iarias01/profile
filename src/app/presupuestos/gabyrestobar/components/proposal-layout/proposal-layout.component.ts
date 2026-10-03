import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonContent } from '@ionic/angular';
import { ProposalPageConfig } from '../../gabyrestobar.models';

@Component({
  selector: 'app-proposal-layout',
  templateUrl: './proposal-layout.component.html',
  styleUrls: ['../../gabyrestobar.page.scss'],
  standalone: false,
})
export class ProposalLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) ionContent?: IonContent;

  @Input({ required: true }) set config(value: ProposalPageConfig) {
    this.pageConfig = value;
    this.titleService.setTitle(value.browserTitle);
  }

  pageConfig!: ProposalPageConfig;
  paymentModalOpen = false;

  private observer?: IntersectionObserver;
  private scrollListener?: () => void;
  private scrollContainer?: HTMLElement;

  constructor(
    private readonly titleService: Title,
    private readonly elRef: ElementRef<HTMLElement>,
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initViewportAnimations();
    }, 60);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.scrollContainer && this.scrollListener) {
      this.scrollContainer.removeEventListener('scroll', this.scrollListener);
    }
  }

  openPayments(): void {
    this.paymentModalOpen = true;
  }

  closePayments(): void {
    this.paymentModalOpen = false;
  }

  scrollToDetails(): void {
    document.getElementById('etapas')?.scrollIntoView({ behavior: 'smooth' });
  }

  private async initViewportAnimations(): Promise<void> {
    const host = this.elRef.nativeElement;
    const elements = Array.from(host.querySelectorAll<HTMLElement>('.reveal'));

    if (!elements.length) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    try {
      if (this.ionContent) {
        this.scrollContainer = await this.ionContent.getScrollElement();
      }
    } catch {
      this.scrollContainer = undefined;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        root: this.scrollContainer ?? null,
        rootMargin: '0px 0px -20px 0px',
        threshold: 0.08,
      },
    );

    elements.forEach((el) => this.observer?.observe(el));

    const checkVisibility = () => {
      const windowHeight = window.innerHeight;
      elements.forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight - 20 && rect.bottom >= 0) {
            el.classList.add('is-visible');
            this.observer?.unobserve(el);
          }
        }
      });
    };

    checkVisibility();
    setTimeout(checkVisibility, 200);

    if (this.scrollContainer) {
      this.scrollListener = checkVisibility;
      this.scrollContainer.addEventListener('scroll', checkVisibility, {
        passive: true,
      });
    }
  }
}
