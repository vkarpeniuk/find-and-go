import { VenueDetails } from '@models*';
import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnChanges {
  @Input() venue: VenueDetails;
  address: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.venue) {
      const currentVenue = changes.venue.currentValue;
      this.address = [
        currentVenue.address,
        currentVenue.city,
        currentVenue.country
      ].join(', ');
    }
  }
}
