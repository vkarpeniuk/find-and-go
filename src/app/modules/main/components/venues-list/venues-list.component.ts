import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';

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
    ]),
    trigger('image', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(700)]),
      transition(':leave', animate(700, style({ opacity: 0 })))
    ])
  ]
})
export class VenuesListComponent implements OnInit, OnChanges {
  @Input() venues: Venue[];
  @Input() isLoading: boolean;
  @Input() scrolledVenueIdx: number;
  @Output() venueFocused = new EventEmitter<string>();
  @Output() venuesUnfocused = new EventEmitter();
  @Output() renavigated = new EventEmitter();
  @Output() scrolledToVenue = new EventEmitter();

  @ViewChildren('venues', { read: ViewContainerRef }) venuesRef;

  selectedVenueIdx: number;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.scrolledVenueIdx && !changes.scrolledVenueIdx.firstChange) {
      if (changes.scrolledVenueIdx.currentValue !== -1) {
        this.selectedVenueIdx = changes.scrolledVenueIdx.currentValue;
        this.scrollToVenue();
      }
    }
  }

  trackVenues(index: number, item: Venue) {
    return item.id;
  }

  onVenueFocus(id: string): void {
    this.venueFocused.emit(id);
  }

  onVenuesUnfocus(): void {
    this.venuesUnfocused.emit();
  }

  renavigate(): void {
    this.renavigated.emit();
  }

  scrollToVenue(): void {
    const element = this.venuesRef.toArray()[this.selectedVenueIdx].element
      .nativeElement;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });

    this.scrolledToVenue.emit();
  }
}
