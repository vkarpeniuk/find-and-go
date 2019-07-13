import {
  Component,
  Inject,
  HostListener,
  EventEmitter,
  Output
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {
  windowScrolled: boolean;
  @Output() scrollToTop = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window) {
      if (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop > 101
      ) {
        this.windowScrolled = true;
      } else if (
        (this.windowScrolled && window.pageYOffset) ||
        document.documentElement.scrollTop ||
        document.body.scrollTop < 10
      ) {
        this.windowScrolled = false;
      }
    }
  }

  onScrollToTop() {
    this.scrollToTop.emit();
  }
}
