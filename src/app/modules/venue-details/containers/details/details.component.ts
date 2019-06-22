import { selectPhotos, selectIsLoading, selectVenue } from './redux/selectors';
import { LoadRequestAction } from './redux/actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromRoot from '@reducers*';
import { Store, select } from '@ngrx/store';
import { selectParams } from 'app/redux/selectors';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VenueDetails } from '@models*';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  venue$: Observable<VenueDetails>;
  photos$: Observable<string[]>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store$
      .pipe(
        select(selectParams),
        takeUntil(this.destroy$)
      )
      .subscribe(params =>
        this.store$.dispatch(new LoadRequestAction({ id: params.id }))
      );
    this.venue$ = this.store$.pipe(select(selectVenue));
    this.photos$ = this.store$.pipe(select(selectPhotos));
    this.isLoading$ = this.store$.pipe(select(selectIsLoading));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
