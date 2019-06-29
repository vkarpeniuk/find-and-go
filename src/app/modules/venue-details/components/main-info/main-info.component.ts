import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

import { VenueDetails } from '@models*';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent {
  @Input() venue: VenueDetails;
}
