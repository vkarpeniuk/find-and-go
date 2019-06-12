import { Component, OnInit } from '@angular/core';
import * as fromRoot from '@reducers*';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectParams } from 'app/redux/selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id$: Observable<string>;
  constructor(private store$: Store<fromRoot.State>) {}

  ngOnInit() {
    this.id$ = this.store$.pipe(
      select(selectParams),
      map(params => params.id)
    );
  }
}
