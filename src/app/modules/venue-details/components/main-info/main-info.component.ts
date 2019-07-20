import { Component, Input } from '@angular/core';

import { VenueDetails } from '@models*';
import { foursquarePossibleRatings } from 'app/core/common/constants';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent {
  @Input() venue: VenueDetails;

  starNumbers = foursquarePossibleRatings;
}
