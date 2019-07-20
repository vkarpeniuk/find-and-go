import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import * as fromRoot from '@reducers*';
import { VenueDetails, Tip } from '@models*';
import { selectParamsId } from 'app/redux/selectors';
import * as redux from './redux';

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
    this.loadDataFromStore();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private loadDataFromStore(): void {
    this.store$
      .pipe(
        select(selectParamsId),
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((id: string) => {
        this.store$.dispatch(new redux.LoadRequestAction({ id }));
      });
    this.venue$ = this.store$.pipe(select(redux.selectVenue));
    this.photos$ = this.store$.pipe(select(redux.selectPhotos));
    this.tips$ = this.store$.pipe(select(redux.selectTips));
    this.isLoading$ = this.store$.pipe(select(redux.selectIsLoading));
  }
}
