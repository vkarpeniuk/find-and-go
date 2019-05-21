import { Venue } from './../../../../core/models/venue.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/reducers';
import { selectAllVenues } from '../../store/selectors/venues';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
  venues$: Observable<Venue[]>;

  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.venues$ = this.store$.pipe(select(selectAllVenues));
  }
}
