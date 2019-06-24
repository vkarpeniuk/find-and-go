import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as fromRoot from '@reducers*';
import { VenueDetails, Tip } from '@models*';
import { selectParams } from 'app/redux/selectors';
import {
  selectPhotos,
  selectIsLoading,
  selectVenue,
  selectTips
} from './redux/selectors';
import { LoadRequestAction } from './redux/actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  venue$: Observable<VenueDetails>;
  photos$: Observable<string[]>;
  tips$: Observable<Tip[]>;
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
    this.tips$ = this.store$.pipe(select(selectTips));
    this.isLoading$ = this.store$.pipe(select(selectIsLoading));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
