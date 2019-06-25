import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { Venue } from '@models';

@Component({
  selector: 'app-venues-list',
  templateUrl: './venues-list.component.html',
  styleUrls: ['./venues-list.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class VenuesListComponent implements OnInit {
  @Input() venues: Venue[];
  @Input() isLoading: boolean;
  @Output() venueFocused: EventEmitter<string> = new EventEmitter<string>();
  @Output() venuesUnfocused: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  trackVenues(index: number, item: Venue) {
    return item.id;
  }

  onVenueFocus(id: string): void {
    this.venueFocused.emit(id);
  }

  onVenuesUnfocus(): void {
    this.venuesUnfocused.emit();
  }
}
