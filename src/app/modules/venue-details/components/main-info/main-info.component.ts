import { VenueDetails } from '@models*';
import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnChanges {
  @Input() venue: VenueDetails;
  categories: string;
  categoryIcon: string = 'assets/images/img-placeholder.png';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.venue) {
      this.categories = changes.venue.currentValue.categories
        .map(c => c.name)
        .join(',');
      if (changes.venue.currentValue.categories[0]) {
        this.categoryIcon = changes.venue.currentValue.categories[0].icon;
      }
    }
  }
}
