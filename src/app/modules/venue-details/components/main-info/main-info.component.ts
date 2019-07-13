import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

import { VenueDetails } from '@models*';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent {
  @Input() venue: VenueDetails;

  starNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
