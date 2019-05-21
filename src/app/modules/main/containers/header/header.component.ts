import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/reducers/filters';
import { FormControl } from '@angular/forms';
import {
  ChangeSearchAction,
  ChangeWhereAction
} from '../../store/actions/filters';
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
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store$.dispatch(new ChangeSearchAction({ newSearch: value }));
      });

    this.where.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store$.dispatch(new ChangeWhereAction({ newWhere: value }));
      });
  }
}
