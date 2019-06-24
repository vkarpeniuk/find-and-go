import { Component, OnInit, Input } from '@angular/core';

import { Venue } from '@models';

@Component({
  selector: 'app-venues-list',
  templateUrl: './venues-list.component.html',
  styleUrls: ['./venues-list.component.scss']
})
export class VenuesListComponent implements OnInit {
  @Input() venues: Venue[];
  @Input() isLoading: boolean;

  constructor() {}

  ngOnInit() {}

  trackVenues(index: number, item: Venue) {
    return item.id;
  }
}
