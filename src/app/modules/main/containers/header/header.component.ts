import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './redux/reducers';
import { FormControl } from '@angular/forms';
import {
  ChangeSearchAction,
  ChangeWhereAction,
  GetCurrentLocationAction
} from './redux/actions';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store$.dispatch(new ChangeSearchAction({ search: value }));
      });

    this.where.valueChanges
      .pipe(
        debounceTime(800),
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
