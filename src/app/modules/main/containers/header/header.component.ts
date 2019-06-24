import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { State } from './redux/reducers';
import {
  ChangeSearchAction,
  ChangeWhereAction,
  GetCurrentLocationAction
} from './redux/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search = new FormControl();
  where = new FormControl();
  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store$.dispatch(new ChangeSearchAction({ search: value }));
      });

    this.where.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store$.dispatch(new ChangeWhereAction({ where: value }));
      });
  }

  getCurrentLocation(event): void {
    event.stopPropagation();
    this.store$.dispatch(new GetCurrentLocationAction());
  }
}
