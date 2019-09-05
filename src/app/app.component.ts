import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { selectErrorMessage } from './redux/selectors';
import { State } from '@reducers*';
import { initLogger } from './core/utils/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private store$: Store<State>) {
    this.store$
      .pipe(
        select(selectErrorMessage),
        filter(errorMessage => errorMessage !== '')
      )
      .subscribe(errorMessage => {
        this.snackBar.open(errorMessage);
      });
  }

  ngOnInit(): void {
    initLogger();
  }
}
