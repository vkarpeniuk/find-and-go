import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import * as redux from './redux';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search = new FormControl();
  where = new FormControl();
  constructor(private store$: Store<redux.State>) {}

  ngOnInit() {
    this.subscribeToChanges();
  }

  getCurrentLocation(event): void {
    event.stopPropagation();
    this.store$.dispatch(new redux.GetCurrentLocationAction());
  }

  private subscribeToChanges(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store$.dispatch(new redux.ChangeSearchAction({ search: value }));
      });

    this.where.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store$.dispatch(new redux.ChangeWhereAction({ where: value }));
      });
  }
}
