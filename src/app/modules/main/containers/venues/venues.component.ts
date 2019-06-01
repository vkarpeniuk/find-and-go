import { MapOptions } from '../../../../core/models/map-options.model';
import { Venue } from './../../../../core/models/venue.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/reducers';
import { selectAllVenues } from './redux/selectors';
import { selectLocationFilter } from '../header/redux/selectors';
import { ChangeMapLocationAction } from '../header/redux/actions';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
  venues$: Observable<Venue[]>;
  mapOptions$: Observable<MapOptions>;

  constructor(private store$: Store<fromRoot.State>) {}

  ngOnInit() {
    this.venues$ = this.store$.pipe(select(selectAllVenues));
    this.mapOptions$ = this.store$.pipe(select(selectLocationFilter));
  }

  mapOptionsChanged(newOptions: MapOptions): void {
    this.store$.dispatch(
      new ChangeMapLocationAction({
        latitude: newOptions.latitude,
        longitude: newOptions.longitude,
        zoom: newOptions.zoom
      })
    );
  }
}
