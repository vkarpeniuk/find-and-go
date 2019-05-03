import { Component, OnInit } from '@angular/core';
import { State } from '../../root-store/root-state';
import { Store } from '@ngrx/store';
import { LoadRequestAction } from '../../root-store/venues-store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {
    //this.store.dispatch(new LoadRequestAction());
  }
}
