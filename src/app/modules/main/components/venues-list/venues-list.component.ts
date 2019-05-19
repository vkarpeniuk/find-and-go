import { Venue } from './../../../../core/models/venue.model';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers/state';
import { selectAllVenues } from '../../selectors/venues';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-venues-list',
  templateUrl: './venues-list.component.html',
  styleUrls: ['./venues-list.component.scss']
})
export class VenuesListComponent implements OnInit {
  venues$: Observable<Venue[]>;

  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.venues$ = this.store$.pipe(select(selectAllVenues));
  }
}
